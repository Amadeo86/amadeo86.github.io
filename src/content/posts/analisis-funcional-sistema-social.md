---
title: "Cómo transformé procesos sociales manuales en un sistema digital"
description: "Un caso real de análisis funcional y liderazgo técnico: del papel y Excel a un sistema centralizado para la Secretaría de Acción Social."
date: "2023-04-10"
readTime: "10 min read"
image: "/assets/images/posts/analisis-funcional-social.jpg"
slug: "analisis-funcional-sistema-social"
---

# Cómo transformé procesos sociales manuales en un sistema digital

## Introducción: El Desafío Real

A finales de 2022, me invitaron a liderar el análisis y diseño de un sistema para la **Secretaría de Acción Social de Las Lajitas**. No era un proyecto académico más. Era real: trabajadoras sociales lidiando a diario con archivos físicos, Excel sin sincronizar, y legajos dispersos en cajones.

Mi rol no fue solo "programador que escribe código." Fui **analista funcional** desde el primer día: entendiendo procesos, abstrayendo complejidad, diseñando soluciones.

Este es cómo lo hice.

---

## El Problema: Caos Ordenado

La municipalidad tenía procesos sociales completamente manuales:

**Realidad del día a día:**
- Una persona llega pidiendo ayuda social
- Se abre un "legajo" (carpeta con papeles)
- Se registra en un Excel que solo maneja una persona
- Si esa persona se va, la información se pierde
- No hay trazabilidad: ¿cuándo fue la última visita? ¿qué se documentó?
- Historiales perdidos, datos duplicados, información inconsistente

**El costo real:**
- Personas en situación vulnerable sin seguimiento continuo
- Trabajadoras sociales gastaban 50% del tiempo buscando expedientes
- Imposible generar reportes para el municipio
- Cero seguridad para datos sensibles

---

## Mi Rol: Más Que Un Desarrollador

Desde el primer día, me posicioné como **analista funcional**, no solo como codificador.

### Fase 1: Levantamiento de Requerimientos

**¿Qué hice?**

1. **Entrevistas profundas con usuarias reales**
   - Pasé 2 semanas en la oficina observando cómo trabajaban
   - Entrevista 1-on-1 con cada trabajadora social
   - Preguntas clave:
     - "¿Cuál es tu tarea más dolorosa actualmente?"
     - "¿Qué información necesitarías tener al alcance inmediato?"
     - "¿Cómo es un día típico en tu trabajo?"

2. **Documentación de procesos**
   - Dibujé diagramas de flujo para cada caso de uso:
     - Registro de persona en situación vulnerable
     - Documentación de visitas domiciliarias
     - Seguimiento de casos
     - Generación de reportes
   - Los diagramas incluían excepciones: ¿qué pasa si hay datos faltantes? ¿quién aprueba cambios?

3. **Identificación de pain points**
   - Búsqueda de legajos: **30 minutos promedio**
   - Actualización de estado de caso: **Inconsistente** (a veces olvidada)
   - Generación de reportes: **Manual en Excel** (propenso a errores)
   - Confidencialidad: **Archivos abiertos al público** (riesgo de seguridad)

### Fase 2: Abstracción del Mundo Real

Este fue el trabajo más importante. **Convertí realidad en lógica digital:**

**Legajos físicos → Entidades de Base de Datos**
```
Mundo Real              →  Mundo Digital
─────────────────────────────────────────
Legajo (carpeta)       →  tabla CASOS
Persona                →  tabla PERSONAS
Visitas domiciliarias  →  tabla VISITAS
Documentos anexados    →  tabla DOCUMENTOS
Trabajadora social     →  tabla USUARIOS + roles
```

**Procesos manuales → Casos de uso y flujos**

Por ejemplo, el proceso "Registrar visita domiciliaria" se abstractó en:

```
1. Trabajadora social inicia sesión
2. Busca caso existente (o crea uno nuevo)
3. Registra datos de la visita:
   - Fecha y hora
   - Observaciones
   - Necesidades identificadas
   - Acciones recomendadas
4. Sube fotos o documentos (si es relevante)
5. Sistema registra automáticamente:
   - Quién hizo la entrada
   - Cuándo
   - Cambios respecto a último estado
6. Caso queda listo para seguimiento
```

**Roles y permisos → Sistema de acceso controlado**
- Trabajadora social: Ver y editar sus propios casos
- Supervisor: Ver todos, editar si es necesario
- Director: Acceso total + reportes

---

## El Diseño: Pensando en Datos

Diseñé una **base de datos normalizada** que reflejaba exactamente la realidad del proceso social:

### Diagrama de Relaciones Simplificado

```
PERSONAS
├─ ID
├─ Nombre
├─ DNI
├─ Teléfono
├─ Dirección
└─ Datos sensibles (cifrados)

CASOS
├─ ID
├─ Persona_ID (FK)
├─ Trabajadora_ID (FK)
├─ Fecha apertura
├─ Estado (abierto/cerrado)
├─ Prioridad (alta/media/baja)
└─ Observaciones

VISITAS
├─ ID
├─ Caso_ID (FK)
├─ Fecha visita
├─ Trabajadora_ID (FK)
├─ Observaciones
├─ Acciones
└─ Documentos adjuntos

DOCUMENTOS
├─ ID
├─ Caso_ID (FK)
├─ Tipo (certificado, foto, informe)
├─ Archivo (almacenado encriptado)
└─ Fecha carga
```

**¿Por qué esta estructura?**
- **Normalización:** Evita datos duplicados
- **Trazabilidad:** Cada registro sabe quién y cuándo
- **Flexibilidad:** Fácil agregar nuevos tipos de documentos
- **Seguridad:** Campos sensibles pueden cifrarse

---

## Características Clave del Sistema

### 1. Búsqueda y Recuperación Inmediata

**Antes:** 30 minutos buscando un legajo físico  
**Ahora:** 5 segundos escribiendo un DNI

```sql
SELECT * FROM CASOS 
WHERE PERSONA_ID = (
  SELECT ID FROM PERSONAS WHERE DNI = '12345678'
) 
ORDER BY fecha_apertura DESC;
```

### 2. Seguimiento de Casos en Tiempo Real

Cada trabajadora social ve:
- Historial completo de visitas
- Documentos adjuntos
- Cambios de estado
- Alertas: "Última visita hace más de 30 días"

### 3. Reportes Automatizados

El director podía generar en segundos:
- "Casos abiertos por trabajadora"
- "Personas visitadas este mes"
- "Documentación completa vs. incompleta"
- "Seguimiento de casos prioritarios"

**Antes:** Una persona compilaba datos de Excel durante horas  
**Ahora:** Click, 30 segundos, PDF listo

### 4. Seguridad y Confidencialidad

- Autenticación por usuario/contraseña
- Datos sensibles (domicilio, DNI) cifrados en BD
- Logs de quién accedió y cuándo
- Cumple regulaciones de protección de datos

---

## Liderazgo en la Implementación

No solo diseñé: **coordiné un equipo** para convertir el diseño en realidad.

### Organización del Equipo
- **Yo:** Análisis funcional, diseño técnico, revisión de código
- **2 Desarrolladores:** Frontend (interfaces que entendan usuarios no-técnicos) y backend (APIs, BD)
- **1 Especialista en BD:** Optimización de consultas, backups

### Comunicación del Proyecto

**La clave:** Traducir tecnicismo a lenguaje de usuarios.

En lugar de decir:
> "Implementaremos un ORM con migrations y versionado de schema"

Dije:
> "La información va a quedar guardada automáticamente, segura, y podremos ver exactamente quién hizo cada cambio"

### Historias de Usuario Priorizadas

Trabajé con **user stories** que guiaron el desarrollo:

```
USUARIO: Trabajadora social
TAREA: Registrar una visita domiciliaria
BENEFICIO: No perder información importante sobre personas en situación vulnerable

Aceptación:
✓ Puedo buscar un caso por DNI
✓ Puedo agregar observaciones de la visita
✓ Puedo subir fotos (retratos de situación)
✓ El sistema registra automáticamente fecha/hora/quién
✓ Mi supervisor puede revisar lo que escribo
```

Prioricé así:
1. **Módulo 1 (Crítico):** Búsqueda y creación de casos
2. **Módulo 2:** Registro de visitas
3. **Módulo 3:** Reportes
4. **Módulo 4:** Alertas automáticas

---

## Resultados y Aprendizajes

### El Sistema Propuesto

Un sistema **centralizado, seguro y escalable:**
- Una sola fuente de verdad (base de datos)
- Acceso controlado por roles
- Historial completo de cada caso
- Reportes en tiempo real
- Escalable a otras municipalidades

### Impacto Social Real

✅ **Trabajadoras sociales:** 50% menos tiempo buscando datos, 50% más tiempo con personas  
✅ **Personas vulnerables:** Seguimiento continuo, mejor atención  
✅ **Municipalidad:** Datos confiables para decisiones de política pública  
✅ **Documentación:** Cada interacción queda registrada (protección legal)

### Habilidades que Reforcé

1. **Levantamiento de requerimientos**
   - Escuchar sin juzgar
   - Hacer preguntas inteligentes
   - Documentar ambigüedades

2. **Modelado de datos**
   - Pensar en entidades y relaciones
   - Normalización para evitar inconsistencias
   - Diseño para escalabilidad

3. **Liderazgo técnico**
   - Coordinación de equipo multidisciplinario
   - Decisiones arquitectónicas justificadas
   - Comunicación clara con stakeholders no-técnicos

4. **Pensamiento sistémico**
   - Entender un dominio complejo (proceso social)
   - Abstraer sin simplificar excesivamente
   - Considerar casos excepcionales

---

## Reflexión Final

Este proyecto me demostró algo importante:

**La mejor solución de software no es la más tecnológicamente avanzada.**

Es la que entiende profundamente el problema real y lo resuelve de forma pragmática.

No fue glamoroso (sin APIs trendy, sin cloud exótico). Fue **efectivo**: el sistema funciona, lo usan a diario, cambió cómo trabaja una institución pública.

Eso es lo que me diferencia como profesional:
- No solo escribo código
- **Entiendo problemas**
- **Lídero soluciones**
- **Creo impacto**

Si necesitás analista funcional que hable tanto de negocio como de código, hablemos.

---

## Hashtags

#AnalistaFuncional #LiderazgoTecnico #DesarrolloSoftware #SistemasDeGestion #ImpactoSocial #BaseDatos #UX #ArquitecturaSoftware
