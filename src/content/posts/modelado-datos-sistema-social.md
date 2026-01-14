---
title: "De legajos físicos a relaciones normalizadas: modelado de datos para sistemas sociales"
description: "Cómo transformé cajas de archivos y Excel en un modelo de datos robusto. Mi enfoque en el modelado como puente entre el caos real y la claridad digital."
date: "2023-07-12"
readTime: "13 min read"
image: "/assets/images/posts/modelado-datos-social.jpg"
slug: "modelado-datos-sistema-social"
---

# De legajos físicos a relaciones normalizadas: modelado de datos para sistemas sociales

## Introducción: El Problema No Eran Los Datos

Cuando llegué a la Secretaría de Acción Social de Las Lajitas, no me encontré con falta de información.

Me encontré con **demasiada información en el lugar equivocado.**

**La realidad:**
- Legajos físicos en cajas de cartón, apiladas sin orden
- Excel desincronizado (3 versiones diferentes)
- Documentos en biblioratos sin indexar
- Datos duplicados (María García aparecía 2 veces, con números de legajo distintos)
- Historiales perdidos (¿cuándo fue la última visita a Juan? Nadie lo sabía)

**Y lo más crítico:** Detrás de cada papel, una persona esperando respuesta.

Mi misión no era solo "digitalizar." Era **dar sentido a ese caos.** Y eso comenzaba con un paso fundamental: **entender el dominio antes de dibujar una sola tabla.**

---

## El Trabajo Invisible: Entender el Dominio

Antes de abrir un editor SQL, pasé **una semana observando.**

No como auditor: como estudiante de sus procesos.

### ¿Qué Preguntas Hice?

- *"¿Qué pasa cuando un beneficiario cambia de domicilio?"*  
  → Respuesta: "Se avisa, pero a veces no se anota en todos lados"

- *"¿Cómo saben si alguien ya recibió un beneficio antes?"*  
  → Respuesta: "Antonella lo recuerda... o busca en los papeles"

- *"¿Qué es un 'legajo'? ¿Es lo mismo que una persona?"*  
  → Respuesta (reveladora): "No. Una persona puede tener varios legajos. Un legajo es para *un caso específico*"

**Esa última respuesta fue oro puro.**

---

## El Salto: Del Mundo Real Al Modelo Entidad-Relación

Ahora entendía el dominio. Era hora de abstraerlo en una estructura de datos.

### Decisión 1: Legajos ≠ Personas

Podría haber creado una sola tabla `Personas` con todo. Parece lógico.

**Pero en el dominio social, esto falla:**

Una persona llega pidiendo ayuda alimentaria. Se abre un **Legajo 1** (alimentación).  
Meses después, la misma persona necesita medicamentos. Se abre un **Legajo 2** (medicinas).

Si los junto en una tabla:
- ❌ Los historiales se mezclan (difícil ver qué pasó en cada "caso")
- ❌ Un beneficio puede ser duplicado sin darme cuenta
- ❌ No puedo cerrar un legajo sin cerrar el otro

**Mi decisión:**

```
PERSONAS (tabla principal)
├─ ID
├─ DNI (único)
├─ Nombre
├─ Fecha de nacimiento
├─ Teléfono
└─ Email

LEGAJOS (tabla secundaria)
├─ ID
├─ Persona_ID (Foreign Key)
├─ Tipo_caso (alimentario, médico, emergencia)
├─ Fecha_apertura
├─ Estado (abierto, cerrado, suspendido)
└─ Prioridad
```

**Resultado:** Una persona puede tener múltiples legajos. Cada legajo tiene su propio historial, beneficios, documentos. Claridad total.

### Decisión 2: La Pesadilla De La Documentación

Cada persona tenía documentos físicos:
- DNI
- Partida de nacimiento
- Certificado de pobreza
- Recetas médicas
- Fotos de la vivienda

**El problema dual:**
- El documento tenía **una vida digital** (archivo escaneado en la BD)
- Y una **vida física** (en una carpeta, en un estante)

Si alguien preguntaba: *"¿Dónde está el DNI de María?"*  
Respuesta: *"Está en la Carpeta 5, Folio 12"* (pero solo si alguien lo sabía)

**Mi solución:**

```
DOCUMENTACION
├─ ID
├─ Legajo_ID (FK)
├─ Tipo (DNI, partida, certificado, foto, etc.)
├─ Archivo_digital (ruta al PDF escaneado)
├─ Ubicacion_fisica (Carpeta X, Folio Y, Estante Z)
├─ Fecha_carga
├─ Vencimiento (si aplica: ej, certificado médico)
└─ Estado (completo, parcial, falta original)
```

**Efecto práctico:**
- Buscás por `Tipo = "DNI"` y `Legajo_ID = 123`
- Sistema dice: *"Está en Carpeta 5, Folio 12. Descargá el PDF."*
- Antes: 30 minutos revolviendo archivos
- Ahora: 5 segundos de búsqueda

### Decisión 3: Beneficios (La Relación Muchos a Muchos)

Un legajo podía tener múltiples beneficios (ayuda alimentaria + medicamentos + subsidio).
Un beneficio podía darse a múltiples legajos (100 personas reciben el "Plan Alimentario Navidad").

**Tentación:** Crear una tabla simple `Beneficios` con `legajo_id`.  
**Problema:** No podría saber cuándo se asignó, cuándo vence, si fue renovado.

**Mi solución: Tabla intermedia**

```
BENEFICIOS (catálogo)
├─ ID
├─ Nombre (ej: "Plan Alimentario")
├─ Descripción
└─ Monto_mensual

BENEFICIO_X_LEGAJO (relación con historial)
├─ ID
├─ Beneficio_ID (FK)
├─ Legajo_ID (FK)
├─ Fecha_asignacion
├─ Fecha_vencimiento
├─ Estado (activo, renovado, vencido, cancelado)
├─ Cantidad_entregas
├─ Observaciones
└─ Renovable (sí/no)
```

**Efecto:**
- Puedo ver cuándo se asignó cada beneficio
- Sé cuándo vence (alertas automáticas)
- Tengo historial completo de renovaciones
- Puedo detectar duplicados en tiempo real

### Decisión 4: El Historial Como Línea De Tiempo

Cada cambio en un legajo era importante:
- Asignación de beneficio
- Visita domiciliaria realizada
- Cambio de estado
- Documento agregado

**Mi decisión:** Tabla `HISTORIAL_NOVEDADES` que registra TODO automáticamente.

```
HISTORIAL_NOVEDADES
├─ ID
├─ Legajo_ID (FK)
├─ Tipo_novedad (visita, beneficio_asignado, estado_cambio, etc.)
├─ Descripcion
├─ Usuario_ID (quien hizo el cambio)
├─ Fecha_hora
├─ Cambio_anterior (JSON: el estado anterior)
└─ Cambio_nuevo (JSON: el estado nuevo)
```

**Implementación:** Triggers SQL que escriben en esta tabla cada vez que algo cambia.

**Beneficio:** Auditoría completa. Legal. Transparente.

---

## La Normalización Con Propósito

### Primera Forma Normal (1FN)

**Problema:**
```sql
CREATE TABLE PERSONAS (
  DNI INT,
  Nombres VARCHAR,
  Discapacidades VARCHAR  ← "Movilidad, auditiva, visual"
)
```

Esto permite datos repetidos y búsquedas complejas.

**Solución:**

```sql
CREATE TABLE PERSONAS (...)

CREATE TABLE DISCAPACIDADES (
  ID INT PRIMARY KEY,
  Persona_ID INT (FK),
  Tipo VARCHAR,
  Grado VARCHAR
)
```

Ahora cada discapacidad es una fila independiente. Búsquedas limpias.

### Segunda Forma Normal (2FN)

**Problema:**

```sql
CREATE TABLE VISITAS (
  ID INT,
  Legajo_ID INT,
  Trabajadora_Nombre VARCHAR,  ← Duplica datos de la tabla USUARIOS
  Trabajadora_Email VARCHAR,
  Fecha DATE
)
```

Si la trabajadora cambia de email, debo actualizar 100 filas.

**Solución:**

```sql
CREATE TABLE VISITAS (
  ID INT,
  Legajo_ID INT,
  Usuario_ID INT (FK a USUARIOS),  ← Solo referencio, no duplico
  Fecha DATE
)
```

Ahora el email está en un único lugar.

### Tercera Forma Normal (3FN)

**Problema:**

```sql
CREATE TABLE PERSONAS (
  DNI INT,
  Nombre VARCHAR,
  Edad INT,  ← Puede calcularse desde fecha_nacimiento
  Fecha_nacimiento DATE
)
```

`Edad` depende de `Fecha_nacimiento`, no de la persona. Dato derivado, no atómico.

**Solución:**

```sql
CREATE TABLE PERSONAS (
  DNI INT,
  Nombre VARCHAR,
  Fecha_nacimiento DATE
)
-- La edad se calcula: YEAR(NOW()) - YEAR(fecha_nacimiento)
```

---

## El Resultado: Un Modelo Que Hablaba El Idioma Del Negocio

Cuando presenté el Diagrama Entidad-Relación a la trabajadora social y la administradora, no usé jerga técnica.

Dije:

> *"Esta es la ficha digital de cada familia."*  
> *"Acá ven todos los papeles que entregaron, y dónde están guardados físicamente."*  
> *"En esta línea de tiempo ven cada visita que hicimos y cada ayuda que dimos."*  
> *"Si alguien cambia de dirección, se actualiza en un lugar y automáticamente todos lo saben."*

**Sus ojos se iluminaron.**

Por primera vez, veían su trabajo reflejado en una estructura clara, no en pilas de papeles.

---

## Lo Que Aprendí (Y Me Llevo)

### 1. Un Buen Modelo De Datos Es Un Puente

Entre el **caos real** (papeles, Excel, mentes) y la **claridad digital** (búsquedas en 5 segundos, reportes automáticos).

### 2. Preguntar "¿Por Qué?" Es Más Importante Que "¿Qué Datos?"

Entender que una persona puede tener múltiples legajos cambió el diseño completo.  
Sin esa pregunta, hubiera cometido un error de diseño que arrastraría para siempre.

### 3. La Normalización No Es Un Capricho Académico

Es lo que permite que el sistema:
- Crezca sin redundancias
- Se actualice en un lugar, sin cascada de cambios
- Mantenga integridad de datos

### 4. Las Relaciones Son El Corazón

No son tablas individuales. Son cómo se conectan: 1-a-N, N-a-N, la temporalidad en relaciones intermedias.

---

## La Reflexión Final

Un modelo de datos bien diseñado no es un "lujo técnico."

Es **la diferencia entre un sistema que funciona y un sistema que falla silenciosamente.**

Es la diferencia entre encontrar un documento en 5 segundos o 30 minutos.

Es la diferencia entre un beneficio duplicado (que nadie nota) y un sistema que alerta en tiempo real.

Para mí, modelar datos es **mi forma de ordenar el mundo.** De traducir caos en estructura. De hacer que la tecnología hable el mismo idioma que el negocio.

---

## ¿Te Enfrentás a un Mar De Datos Desordenados?

Si necesitás transformar procesos manuales en un sistema estructurado, escalable y **con sentido humano**, hablemos.

Mi especialidad es escuchar el problema, abstraerlo, diseñar una solución que funcione.

---

## Hashtags

#ModeladoDeDatos #AnalistaFuncional #DiseñoDeBasesDatos #Normalización #SQL #SistemasDeGestion #ImpactoSocial #ArquitecturaSoftware #BaseDatos
