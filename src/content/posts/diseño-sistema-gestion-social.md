---
title: "Del caos al orden: diseñando un sistema de gestión social desde cero"
description: "Cómo estructuré base de datos, flujos y seguridad para un sistema municipal real. Un vistazo detrás de cámaras del proyecto más desafiante."
date: "2023-05-02"
readTime: "12 min read"
image: "/assets/images/posts/diseño-gestion-social.jpg"
slug: "diseño-sistema-gestion-municipal"
---

# Del caos al orden: diseñando un sistema de gestión social desde cero

## El Diagnóstico Inicial: Cuando Todo Es Papel

Caminé por la puerta de la Secretaría de Acción Social un lunes por la mañana.

Lo primero que vi: **caos ordenado**.

Caos, porque:
- 4 trabajadoras sociales manejaban 150+ casos activos
- Los "legajos" (expedientes) eran carpetas físicas en estantes
- Nadie sabía dónde estaba cada caso
- Los datos estaban en 3 Excel diferentes
- Si alguien se iba, se llevaba información en la cabeza

Ordenado, porque existía un *patrón*: cada persona tenía historias, necesidades, documentos. Había lógica, pero no era visible. Estaba atrapada en papel y mente.

**Mi primer pensamiento:** "Esto es un proyecto de análisis funcional de verdad. Tengo que abstraer un dominio complejo."

---

## El Enfoque Técnico: De Lo Concreto a Lo Abstracto

### Fase 1: Análisis de Procesos

**Dibujé diagramas.** Muchos diagramas.

Usé **BPMN (Business Process Model and Notation)** para documentar cada flujo:

#### Flujo 1: Recepción de una Persona

```
INICIO
  ↓
¿Persona nueva o caso existente?
  ├─ NUEVO → Crear legajo
  │          ├─ Ingreso de datos
  │          ├─ Evaluación inicial
  │          └─ Asignación a trabajadora
  │
  └─ EXISTENTE → Buscar expediente
               ├─ Revisar historial
               └─ Actualizar estado
  ↓
SEGUIMIENTO
```

#### Flujo 2: Visita Domiciliaria

```
INICIO (Trabajadora inicia sesión)
  ↓
Selecciona caso
  ↓
Llena formulario de visita
  ├─ Observaciones de la vivienda
  ├─ Entrevista con la persona
  ├─ Necesidades identificadas
  ├─ Acciones recomendadas
  └─ Fotos/documentos adjuntos
  ↓
Sistema genera ALERTA si:
  • Hay peligro (abuso, negligencia)
  • Se requiere derivación urgente
  ↓
Superviso revisa entrada
  ├─ Aprueba
  │  └─ Caso pasa a "En seguimiento"
  │
  └─ Requiere cambios
     └─ Devuelve a trabajadora
  ↓
FIN (Caso actualizado en el sistema)
```

**¿Por qué BPMN?** Porque traduce procesos humanos a lógica comprensible para máquinas (y para otros humanos).

### Fase 2: Modelado de Datos

Aquí fue donde el pensamiento abstracto fue crucial.

**Pregunta clave:** "¿Cuáles son las *entidades* reales en este dominio?"

| Entidad Real | Traducción Digital | Atributos |
|---|---|---|
| **Una persona** que pide ayuda | Tabla PERSONAS | DNI, nombre, edad, teléfono, dirección, email |
| **Un caso** (relación entre persona y situación) | Tabla CASOS | ID caso, persona_id, fecha apertura, estado, prioridad |
| **Una visita** (observación en el tiempo) | Tabla VISITAS | ID, caso_id, fecha, observaciones, acciones |
| **Un documento** (evidencia) | Tabla DOCUMENTOS | ID, caso_id, tipo, archivo, fecha |
| **Una trabajadora social** | Tabla USUARIOS | ID, nombre, rol, activo, fecha_alta |

**Pero no es así de simple.** Necesitaba pensar en relaciones:

- 1 PERSONA puede tener 1+ CASOS (la misma persona requiere ayuda múltiples veces)
- 1 CASO tiene 1+ VISITAS (seguimiento a lo largo del tiempo)
- 1 VISITA puede tener 0+ DOCUMENTOS (a veces hay fotos, a veces no)
- 1 TRABAJADORA atiende N CASOS (distribución de carga)
- 1 CASO tiene 1 SUPERVISOR (revisión de calidad)

### Fase 3: Normalización de la Base de Datos

Aquí es donde evité el peor error: datos duplicados y inconsistentes.

**Primera forma normal (1NF):** Cada celda contiene UN dato, no múltiples valores
- ❌ Mal: Campo teléfono con "5554321, 5559876"
- ✅ Bien: Tabla TELEFONOS separada

**Segunda forma normal (2NF):** Cada atributo depende únicamente de la clave primaria
- ❌ Mal: Tabla VISITAS con "nombre_trabajadora" (duplica datos de USUARIOS)
- ✅ Bien: VISITAS contiene "usuario_id" (relación a USUARIOS)

**Tercera forma normal (3NF):** Los atributos no dependían de otros atributos
- ❌ Mal: PERSONAS con "edad" calculable desde fecha de nacimiento
- ✅ Bien: PERSONAS solo guarda "fecha_nacimiento", edad se calcula

**Resultado:** Una BD limpia, sin redundancias, sin inconsistencias.

---

## La Arquitectura: Cómo Estructuré Todo

```
┌─────────────────────────────────────────┐
│         INTERFAZ DE USUARIO             │
│     (Lo que ve la trabajadora social)   │
└────────────────┬────────────────────────┘
                 │
        (API REST - HTTPS)
                 │
┌────────────────▼────────────────────────┐
│      BACKEND (Lógica de Negocio)        │
│  - Autenticación y autorización         │
│  - Validaciones de datos                │
│  - Reglas de negocio                    │
│  - Generación de reportes               │
└────────────────┬────────────────────────┘
                 │
         (Consultas SQL)
                 │
┌────────────────▼────────────────────────┐
│       BASE DE DATOS (PostgreSQL)        │
│  - Tablas normalizadas                  │
│  - Datos encriptados donde corresponde  │
│  - Logs de auditoría                    │
└─────────────────────────────────────────┘
```

### ¿Por qué esta arquitectura?

1. **Separación de responsabilidades**
   - Frontend: solo presentación
   - Backend: lógica y validaciones
   - BD: persistencia

2. **Seguridad**
   - Backend valida TODO (no confío en cliente)
   - BD no acepta conexiones directo desde frontend
   - Encriptación en campos sensibles

3. **Escalabilidad**
   - Si hay 100 trabajadoras sociales simultáneamente, el backend balancea carga
   - BD optimizada para consultas frecuentes

---

## Aspectos Técnicos Críticos

### 1. Autenticación y Autorización

Cada usuario tiene un **rol**:

```sql
SELECT roles FROM USUARIOS WHERE email = 'ana@lasLajitas.gov.ar';
-- Resultado: ['trabajadora_social', 'usuario_activo']
```

**Regla de negocio:**
- Trabajadora social: Ve sus propios casos + puede editar
- Supervisor: Ve todos los casos + aprueba/rechaza ediciones
- Director: Acceso total + reportes

**Implementación:** JWT tokens con roles encriptados

### 2. Cifrado de Datos Sensibles

Información que NUNCA guardamos en texto plano:

```
Tabla PERSONAS:
├─ DNI → Cifrado (AES-256)
├─ Dirección → Cifrada
├─ Teléfono → Cifrado
└─ Email → Cifrado

Logs de auditoría:
├─ Quién accedió: guardado
├─ Cuándo: guardado
├─ A qué caso: guardado
└─ Qué datos vio: NO guardamos los datos, solo "accedió a caso #123"
```

**¿Por qué?** Protección de privacidad. Si alguien hackea la BD, los datos sensibles no son legibles.

### 3. Validaciones en Capas

No confío en "validar en el cliente." Las validaciones ocurren en tres niveles:

**Nivel 1: Frontend**
- Campo DNI: solo números, exactamente 8 dígitos
- Fecha de visita: no puede ser futura
- Feedback inmediato al usuario

**Nivel 2: Backend (API)**
- Valida nuevamente (el cliente podría estar modificado)
- Reglas de negocio: ¿puede esta trabajadora editar este caso?
- Retorna errores claros si algo falla

**Nivel 3: Base de Datos**
- Constraints SQL: `CHECK (edad >= 0)`
- Foreign keys: imposible tener un CASO sin PERSONA
- Triggers: si cambio el estado de un caso, registra quién y cuándo

### 4. Reportes Automatizados

En lugar de que alguien compile datos manualmente:

```sql
-- Reporte: Casos abiertos por trabajadora
SELECT 
    u.nombre AS trabajadora,
    COUNT(c.id) AS casos_abiertos,
    COUNT(CASE WHEN c.prioridad = 'alta' THEN 1 END) AS casos_prioritarios
FROM USUARIOS u
LEFT JOIN CASOS c ON u.id = c.trabajadora_id AND c.estado = 'abierto'
GROUP BY u.id, u.nombre
ORDER BY casos_abiertos DESC;
```

**Generador de reportes:**
- Click en dashboard
- Elige período (últimos 30 días, este mes, rango custom)
- PDF automático en 5 segundos
- Gráficos incluidos

---

## El Módulo del Corazón: Seguimiento de Casos

Si toda la BD era importante, **el módulo de seguimiento era el corazón.**

Por qué: Una persona vulnerable necesita continuidad. No alcanza con registrar una visita; necesita que alguien *dé seguimiento*.

**Diseño del módulo:**

```
Vista de un CASO:
│
├─ DATOS BÁSICOS
│  ├─ Persona: Juan García (DNI: 25.XXX.XXX)
│  ├─ Edad: 34 años
│  ├─ Dirección: Calle 9 de Julio 123
│  └─ Teléfono: *** (cifrado)
│
├─ ESTADO ACTUAL
│  ├─ Estado: En seguimiento
│  ├─ Prioridad: Alta
│  ├─ Asignada a: Trabajadora Ana López
│  └─ Última actualización: Hace 5 días
│
├─ HISTORIAL (línea de tiempo)
│  │
│  ├─ Hoy 15:30 (Visita)
│  │  └─ "Entrevista en vivienda. Situación de vulnerabilidad confirmada."
│  │     [VER DETALLES] [DOCUMENTOS ADJUNTOS: 3 fotos]
│  │
│  ├─ Hace 5 días 10:15 (Cambio de estado)
│  │  └─ "Caso escalado a prioridad ALTA por Supervisor Carlos"
│  │
│  └─ Hace 2 semanas 09:00 (Apertura)
│     └─ "Caso abierto por Ana López"
│
├─ ALERTAS ACTIVAS
│  ├─ ⚠️ "Última visita: hace 5 días. Agendar próxima antes de 30 días"
│  └─ ⚠️ "Documentación incompleta: falta Certificado de Pobreza"
│
└─ ACCIONES
   ├─ [REGISTRAR NUEVA VISITA]
   ├─ [AGREGAR DOCUMENTO]
   ├─ [CAMBIAR ESTADO]
   └─ [ENVIAR A REVISIÓN]
```

**¿Por qué funciona?**
- Histórico completo: sin volver a revisar papel
- Alertas automáticas: no se olvida ningún seguimiento
- Documentos vinculados: evidencia en el mismo lugar

---

## Desafíos y Cómo Los Resolví

### Desafío 1: "¿Quién maneja los datos mientras estamos en transición?"

**Problema:** No podíamos migrar de papel a digital de un día para otro.

**Solución:** Período híbrido de 2 semanas
- Trabajadoras seguían usando papel (como siempre)
- Yo digitalizaba los casos en paralelo
- Capacitación mientras pasaba (learning by doing)
- Después: solo digital

### Desafío 2: "Pero qué pasa si alguien borra un caso por error"

**Problema:** Peligroso tener datos en BD sin recuperación.

**Solución:** 
- Soft deletes (los casos nunca se borran, solo se marcan como inactivos)
- Backups automáticos diarios
- Logs de auditoría: cada cambio queda registrado
- Permisos: solo el director puede marcar algo como inactivo

### Desafío 3: "El sistema es muy complejo, ¿cómo enseño?"

**Problema:** Usuarias no-técnicas tenían miedo a "romper" el sistema.

**Solución:**
- Interfaz ultra simple (solo 3-4 botones por vista)
- Onboarding de 3 horas (en grupos pequeños)
- Usuario de prueba con casos fake para practicar
- Documentación visual (capturas, videos cortos)
- Soporte 24/7 (yo era el "IT guy" del municipio)

---

## Reflexión: Complejidad vs Simplicidad

El paradoxo del buen diseño de software:

**Cuanto más simple se ve, más complejo fue diseñarlo.**

Una trabajadora social hace click, ve su caso, lo actualiza. Fácil.

Detrás:
- 8 tablas normalizadas
- 15+ validaciones en backend
- Encriptación en 4 campos
- Logs de auditoría
- Backups automatizados
- Alertas con scheduling
- APIs RESTful versionadas

**Pero ella no necesita saber eso.**  
Ella solo necesita que *funcione*, que sea *seguro*, y que le *ahorre tiempo*.

Eso es liderazgo técnico: **resolver complejidad para crear simplicidad.**

---

## Conclusión

Este proyecto me enseñó que el mejor software no es el más tecnológicamente sofisticado.

Es el que:
1. **Entiende el problema real** (no asume, pregunta)
2. **Abstrae correctamente** (sin perder nuances importantes)
3. **Es robusto** (maneja excepciones y errores)
4. **Es simple para el usuario** (complejidad escondida en el backend)
5. **Genera impacto** (cambia cómo la gente trabaja)

Este sistema cambió cómo funciona una institución pública.  
Personas vulnerables reciben mejor atención.  
Trabajadoras sociales tienen sus vidas simplificadas.

Eso es suficiente.

---

## Hashtags

#DiseñoSoftware #BaseDatos #BPMN #Arquitectura #AnalisisisFuncional #LiderazgoTecnico #Impacto
