---
title: "Liderando un equipo de desarrollo en un proyecto con impacto social"
description: "Coordinación, toma de decisiones técnicas y gestión de expectativas. Mi experiencia como líder técnico en un proyecto real con cliente en el municipio."
date: "2023-06-08"
readTime: "11 min read"
image: "/assets/images/posts/liderazgo-equipo-desarrollo.jpg"
slug: "liderazgo-equipo-desarrollo-social"
---

# Liderando un equipo de desarrollo en un proyecto con impacto social

## El Contexto: Equipo Real, Cliente Real, Presión Real

No fue un proyecto académico simulado.

Fue:
- **Cliente real:** Municipalidad de Las Lajitas
- **Necesidad urgente:** Sistema para gestionar casos sociales (papel → digital)
- **Plazo real:** 6 meses
- **Equipo:** 3 estudiantes de análisis de sistemas + yo (coordinador)
- **Expectativas altas:** Dependían de nosotros para cambiar un proceso completo

Mi rol no fue "hacer mi parte del código." Fui **líder técnico** desde el primer día.

Esto es lo que aprendí.

---

## El Equipo Inicial: Talento Diverso, Experiencia Variada

### Quiénes eran

**Mateo:** Fuerte en base de datos. Tranquilo, metódico.  
**Lucía:** Experta en frontend. Creativa, pero a veces tomaba decisiones sin validar.  
**Joaquín:** Backend sólido. Rápido, pero desorganizado en documentación.  
**Yo (Ramón):** Visión global, análisis funcional, coordinación.

### El Desafío

Tres personas con habilidades diferentes, ninguna había liderado un proyecto profesional. Yo tenía experiencia pero no era "el jefe designado" (equipo de estudiantes de igual rango académico).

**Mi primer movimiento:** Establecer claridad sin imposición.

---

## Primeros Pasos: Establecer Fundación

### Reunión 1: Definir Roles (Sin Crear Jerarquía Rígida)

No dije: "Yo comando, ustedes obedecen."

Dije:

> "Tenemos un proyecto que vale la pena. Necesitamos claridad sobre quién hace qué, pero no porque alguien sea 'jefe', sino porque necesitamos eficiencia. ¿Estamos de acuerdo?"

**Resultado:** Todos de acuerdo. Eso cambió el tono todo el proyecto.

**Luego asignamos responsabilidades:**

| Persona | Rol Principal | Responsabilidad Secundaria |
|---------|---|---|
| **Mateo** | Diseño y optimización de BD | Documentación técnica |
| **Lucía** | Frontend (UI/UX) | Testing de interfaces |
| **Joaquín** | Backend (APIs, lógica) | Deployment y devops |
| **Yo (Ramón)** | Coordinación general, análisis funcional | Code review, decisiones arquitectónicas |

**Nada era exclusivo.** Todos podían ayudar en otras áreas, pero había claridad sobre "punto de entrada."

### Reunión 2: Levantamiento de Requerimientos (Todos Presentes)

Llevé al equipo a la Secretaría de Acción Social.

No fue "Ramón se reúne con el cliente y trae info."

Fue: **Los tres fueron conmigo** a ver la realidad.

**¿Por qué?** 
- Lucía vio el caos de Excel → Entendió por qué simple es mejor
- Mateo vio los datos dispersos → Visualizó la estructura de BD
- Joaquín escuchó a trabajadoras sociales → Entendió necesidades reales

**Efecto psicológico clave:** Dejaron de trabajar en un "proyecto académico" para resolver *un problema humano*.

---

## Metodología: Metodología Flexible (Casi-Agile)

No seguimos Scrum puro (éramos estudiantes, no empresa). Pero usé principios ágiles:

### Sprints de 2 Semanas

**Día 1 de sprint: Planificación**
- Definimos 3-5 historias de usuario
- Estimación de esfuerzo (simple: fácil/medio/difícil)
- Quién trabaja en qué

**Durante el sprint:**
- Reunión diaria corta (15 min)
- "¿Qué hiciste ayer? ¿Qué haces hoy? ¿Qué te frena?"

**Fin de sprint: Review + Retrospectiva**
- Demostrábamos al cliente (aunque fuera incompleto)
- Cada uno reflexionaba: "¿Qué salió bien? ¿Qué mejoramos?"

### Ejemplo: Sprint 1

**Historia de usuario:**
```
COMO trabajadora social
QUIERO buscar un caso por DNI
PARA encontrar rápidamente el expediente de una persona
```

**Desglose técnico:**
- Mateo: Diseña tabla PERSONAS y CASOS en BD
- Joaquín: Crea endpoint GET `/casos?dni=25123456`
- Lucía: Diseña formulario de búsqueda + resultados
- Yo: Code review + validación con cliente

**Resultado al final de sprint:** Búsqueda funcional (básica, pero funcional)

---

## Decisiones Técnicas Clave (Y Cómo Las Tomé)

### Decisión 1: SQL vs NoSQL

**El debate:**

**Joaquín:** "NoSQL es más flexible, podemos cambiar estructura rápido"  
**Mateo:** "SQL es robusto, fácil optimizar, tenemos datos relacionales"  
**Lucía:** "Me importa menos, pero prefiero que sea simple"  
**Yo:** "Necesitamos decidir juntos, pero con criterio."

**Mi análisis (no fue decisión arbitraria):**

```
Nuestros datos:
- Personas (atributos fijos: DNI, nombre, edad)
- Casos (relaciones claras: 1 persona → N casos)
- Visitas (historial ordenado)
- Documentos (vinculados a casos)

Características de SQL:
✓ Relaciones 1-N naturales (personas ↔ casos)
✓ Integridad referencial (no puedo tener caso sin persona)
✓ Transacciones ACID (si algo falla, todo revierte)
✓ Consultas optimizadas

Características de NoSQL:
✓ Flexibilidad (pero nosotros SABEMOS nuestra estructura)
✗ Sin relaciones (tendría que manejarlas en código = error-prone)
```

**Decisión:** SQL (PostgreSQL).

**¿Cómo lo comuniqué?**
> "NoSQL sería overkill. Nuestros datos tienen estructura clara. SQL nos da integridad que necesitamos cuando manejamos casos sociales."

Joaquín aceptó sin resistir. Entendió el razonamiento.

### Decisión 2: Arquitectura (Monolito vs Microservicios)

**Tentación:** "Hagamos microservicios, es cool, es escalable"

**Mi pregunta:** "¿Realmente necesitamos?"

**Realidad:**
- 1 municipio pequeña
- ~5-6 módulos (no 50)
- No hay demanda de escalar a múltiples ciudades (aún)

**Decisión:** Monolito simple (1 backend, 1 BD, 1 frontend)

**Ventaja:** Fácil de deployar, monitorear, mantener.  
Si después necesitábamos escalar, podíamos refactorizar.

**Lección:** No uses arquitectura "porque es trendy." Usa la que resuelve tu problema actual.

### Decisión 3: Framework de Frontend

**Lucía quería:** React (porque "es lo que todos usan")  
**Yo pensé:** "¿La complejidad vale?"

**Análisis:**
```
Requisitos reales:
- 4-5 pantallas (búsqueda, crear caso, editar, reportes)
- Usuarios no-técnicos (UX debe ser simple)
- No hay interactividad compleja en tiempo real
- Cargas de datos pequeñas

React sería:
✓ Poderoso
✗ Overhead innecesario
✗ Curva de aprendizaje para cliente (si quiere mantener después)
✗ Node modules + bundling = lento en máquinas del municipio

Bootstrap + jQuery:
✓ Ligero
✓ Sencillo de mantener
✓ Carga rápido
✗ Menos "cool"
```

**Decisión:** Bootstrap + jQuery (simple, funcional, mantenible).

**Reacción de Lucía:** Al principio resistencia. Después, cuando vio que el sistema era *rápido* y *fácil de entender*, cambió de opinión.

**Lección:** A veces el mejor código es el código que entiende otro humano.

---

## Gestión de Conflictos y Desacuerdos

### Conflicto 1: Perfeccionismo vs Pragmatismo

**Mateo quería** optimizar índices de BD antes de lanzar.  
**Joaquín decía:** "Esperemos a tener datos reales, después optimizamos."

Tenían razón ambos.

**Mi mediación:**
> "Mateo, haces bien en pensar en performance. Pero Joaquín tiene razón: no sabemos qué lentitud real habrá. Hagamos esto: crea índices basados en predicción, pero documentamos qué métricas vamos a medir post-lanzamiento. Si algo es lento, optimizamos."

**Resultado:** Ambos felices. Mateo pudo ser riguroso, Joaquín pudo ser pragmático.

### Conflicto 2: Scope Creep (El Cliente Pide Más Cosas)

**Sucedió en semana 8:**

Cliente: "Ah, necesitamos también generar reportes de XYZ..."

Lucía: "Dale, lo agrego"  
Joaquín: "No, eso va a romper todo"  
Yo: *facepalm*

**¿Qué hice?**

1. **Validé:** ¿Es realmente prioritario?
   - Cliente: "Sí, es importante para el director"
   
2. **Prioricé:** ¿Para cuándo lo necesita?
   - Cliente: "En 2 semanas"
   
3. **Replaneé:** Agregué como sprint 4, removí otras cosas menos críticas

4. **Comunicé:** "Podemos hacerlo, pero significa que el módulo de alertas se atrasa 1 semana. ¿OK?"
   - Cliente: "Sí, las alertas pueden esperar"

**Lección:** Scope creep es inevitable. Lo importante es gestionarlo transparentemente.

---

## Cuando Todo Se Derrumbó (Casi)

Faltaban 3 semanas para lanzar. Mateo encontró un problema:

La BD estaba **lenta**. Consultas que deberían tardar 1 segundo tardaban 15.

**Pánico colectivo:**
- Lucía: "¿Dejamos de trabajar?"
- Joaquín: "¿Empezamos de cero?"
- Mateo: "No es tan grave, necesito 1 semana para optimizar índices"

**Mi rol fue crítico aquí:**

1. **Calma** (sin sonar como "relájense")
> "Esto es normal. Mateo, necesito que me expliques exactamente dónde está el problema."

2. **Análisis** (no pánico)
> "Mateo va a optimizar. Lucía, Joaquín: sigan con features. No cambiamos nada."

3. **Comunicación con cliente**
> "Encontramos una oportunidad de optimización. Nos atrasa 5 días, pero el sistema será 10x más rápido."

Cliente: "OK, eso tiene sentido."

**Resultado:** Mateo optimizó (índices estratégicos), Lucía/Joaquín agregaron features, lanzamos a tiempo.

**Lección crítica:** Los líderes técnicos no solucionan problemas *técnicos*; crean *ambiente* donde el equipo puede solucionarlos.

---

## Documentación: El Trabajo Silencioso

Mientras el equipo codificaba, yo documentaba:

1. **Decisiones técnicas** (por qué elegimos SQL, por qué Bootstrap)
2. **Diagramas** (cómo fluye un caso, estructura de BD)
3. **API docs** (endpoint por endpoint, con ejemplos)
4. **Manual de usuario** (con capturas, paso a paso)

**¿Por qué tanto trabajo?**

Porque cuando el cliente necesite mantener esto después (sin nosotros):
- Documentación = posibilidad de que otro equipo lo continúe
- Sin documentación = código muerto

---

## Lanzamiento: El Momento de Verdad

Semana 26. Viernes.

El sistema estaba en vivo. Trabajadoras sociales lo usaban por primera vez.

Fue **terrorífico y hermoso.**

Primeras horas:
- "¿Cómo busco un caso?" → Lucía está en sitio, enseña
- "El sistema es lento" → Era un falso positivo de red local
- "¿Dónde veo el historial?" → Joaquín explica

Fin del primer día:
- 0 crashes
- 0 datos perdidos
- 5-6 pequeños bugs (cosas que no consideramos)

**Semana 1 post-lanzamiento:**
Fijamos los bugs, optimizamos interfaces basado en feedback.

**Semana 2:**
Ya no estaban pidiendo ayuda. Lo estaban *usando.*

---

## Reflexión: Qué Aprendí Sobre Liderazgo Técnico

### 1. El Liderazgo Técnico No Es "Sé Todo"

No soy mejor programador que Joaquín o Lucía. Pero mi rol fue:
- **Ver el bosque** (no solo los árboles)
- **Conectar decisiones** (por qué SQL afecta cómo Lucía diseña UI)
- **Mediar conflictos** sin autoridad, solo con claridad

### 2. La Documentación Es Amor

Documentar es decir: "Me importa que otros entiendan esto."

Sin documentación, el mejor código del mundo se vuelve inútil en 6 meses.

### 3. Los Mejores Proyectos Resuelven Problemas Reales

Nada nos motivó más que ver a una trabajadora social decir:

> "Antes pasaba 30 minutos buscando un legajo. Ahora, 5 segundos. Tengo más tiempo para las personas."

No fue por dinero. Fue por impacto.

### 4. Pragmatismo > Perfeccionismo

El sistema no es perfecto. Pero funciona, es rápido, y cambió un proceso.

A veces, "bueno y entregado" beats "perfecto pero nunca terminado."

---

## Consejo para Otros Líderes Técnicos Junior

Si alguna vez te encuentras coordinando un equipo:

1. **Escucha primero.** Entiende a cada persona, su fortaleza, su inseguridad.

2. **Decide con criterio.** No imposes por imponer. Explica el razonamiento.

3. **Protege al equipo.** Cuando hay presión externa, absorbés vos. Ellos solo focusan en resolver.

4. **Celebra logros pequeños.** Cada feature completada es una victoria.

5. **Documenta todo.** Hoy parece obvio; en 6 meses, nadie lo recordará.

6. **Admite errores.** Si cometés, decilo. Ganas más respeto que pretendiendo perfección.

---

## Conclusión

Lideré un equipo de 3 personas en un proyecto real que cambió cómo funciona una institución pública.

No fue por ser "el mejor programador."

Fue por:
- Entender el problema
- Confiar en mi equipo
- Tomar decisiones claras (aunque imperfectas)
- Documentar todo
- Preocuparme por impacto, no por ego

Eso es liderazgo técnico.

Si algún día necesitás alguien que no solo code, sino que *coordine equipos, entienda negocio y cree impacto*, ya sabés dónde encontrarme.

---

## Hashtags

#LiderazgoTecnico #DesarrolloEquipos #GestióndePoroyectos #Impacto #SoftwareDevelopment #Coordinación #AnálisisFuncional
