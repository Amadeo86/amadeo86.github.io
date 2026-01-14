---
title: "Más que preguntas: cómo las entrevistas con usuarios definieron el alma del sistema"
description: "De escuchar a una trabajadora social frustrada, a diseñar un sistema que cambió su día a día. Mi enfoque en user research centrado en las personas."
date: "2023-08-05"
readTime: "12 min read"
image: "/assets/images/posts/entrevistas-usuarios.jpg"
slug: "entrevistas-usuarios-design-centrado"
---

# Más que preguntas: cómo las entrevistas con usuarios definieron el alma del sistema

## La Frase Que Me Guía

*"El mejor requerimiento no está en un documento. Está en la queja del usuario."*

Hace años aprendí eso. Y en la Secretaría de Acción Social, las "quejas" eran **oro puro de información.**

No llegué con un cuestionario de 20 preguntas.  
Llegué a **escuchar.**

Y eso hizo toda la diferencia.

---

## Primera Entrevista: Antonella, La Trabajadora Social

### El Escenario

Oficina pequeña, escritorio desbordado de papeles. Antonella estaba anotando algo a mano mientras atendía a una persona.

Me presenté: *"Hola, estoy diseñando un sistema para mejorar esto. ¿Tienes 20 minutos?"*

Ella levantó la vista. Cansada. Sonrió igual.

### Lo Que Dijo vs. Lo Que Necesitaba

**Antonella dijo:**
> *"Hay un montón de cosas que se hacen acá, el papel ya es obsoleto… estaría bueno poner un DNI y que ya salga todo."*

**¿Qué escuché detrás?**

No era una solicitud de "búsqueda por DNI."  
Era frustración: *"Gasto tiempo buscando en papeles cuando podría estar con las personas."*

Profundicé:
- *"¿Cuánto tiempo pasás buscando un legajo?"*
  → *"Unos 30 minutos, a veces más si está en otra carpeta."*

- *"¿Qué información necesitarías tener al alcance inmediato?"*
  → *"El historial de la persona. Qué se le dio antes, cuándo, en qué estado está cada cosa."*

- *"¿Qué pasa cuando viajás a Salta?"*
  → *"Tengo que pedirle a Claudia que busque en las carpetas y me mande fotos del DNI. Es un quilombo."*

### El "Requerimiento No Dicho"

De esa última respuesta surgió algo que ella nunca pidió explícitamente: **acceso remoto y móvil.**

No dijo: *"Quiero una app."*  
Dijo: *"Es un quilombo tener que pedirle a otro."*

Eso se traducía en: necesita acceso desde cualquier lugar, en cualquier dispositivo, con seguridad.

### La Joya: El Módulo De Seguimiento

Mientras hablábamos, Antonella sacó un Excel.

*"Acá tengo las visitas que hicimos. Pero es un desorden porque lo actualizo cuando puedo, y a veces se me olvida."*

**Mi pregunta:** *"¿Qué te gustaría que dijera ese Excel?"*

**Su respuesta:** 
> *"Que me diga: 'Visitaste a María hace 15 días, anotá la próxima.' O 'Este caso no tiene documentación completa, falta el certificado de pobreza.'"*

**Traducción técnica:** Sistema de alertas automáticas, línea de tiempo, validaciones de integridad.

### Conclusión De La Entrevista

No salí con un "spec" de 20 requerimientos.

Salí con algo mejor: una **comprensión emocional del problema.**  
Entendía su frustración, su workflow, lo que realmente la estresaba.

---

## Segunda Entrevista: Claudia, La Administradora

### El Escenario

Claudia manejaba el Excel "maestro" (la fuente de verdad, según ella).

Me mostró: 3 hojas con datos que no coincidían. Una estaba desfasada por 2 meses.

*"¿De dónde viene la desincronización?"* pregunté.

*"Cada una anota dónde puede. Después yo intento compilar, pero es imposible."*

### La Pregunta Que Abrió Todo

*"¿Qué error es el que más te duele?"*

**Claudia:**
> *"A veces alguien recibe el mismo beneficio dos veces porque no hay control. Se da el Plan Alimentario a María en marzo, se anota acá, pero Antonella no vio que ya lo teníamos anotado... y en abril le damos otra vez."*

**El dolor detrás:** Duplicidad → presupuesto despilfarrado → gente que no recibe porque ya se agotaron los fondos.

### Requerimiento Crítico No Verbalizado

Claudia no dijo: *"Quiero validación de duplicados."*

Dijo: *"Es posible que alguien reciba dos veces."*

**Traducción:** Sistema debe validar en tiempo real:
- Si un beneficio ya fue asignado a esta persona
- Si aún está vigente
- Si fue renovado o si debe renovarse

### Lo Que Diseñé A Partir De Esta Entrevista

```
Al registrar un beneficio:
1. Sistema busca: ¿Esta persona ya tiene este beneficio?
2. Si SÍ → Alerta amarilla: "Esta persona ya recibió esto el 15/03/2024"
3. ¿Es una renovación? SÍ/NO
   - SI: Registra como renovación
   - NO: Alerta roja: "Posible duplicidad"
4. ¿Está vigente? SÍ/NO
   - SI: Bloquea la asignación (a menos que fuerces)
   - NO: Permite renovación
```

**Resultado:** Cero duplicidades. Presupuesto protegido. Control real.

---

## Tercera Entrevista: Analía, La Secretaria De Recepción

### El Escenario

Analía atendía al público. 50 personas por día pedía ayuda de todo tipo.

Su herramienta: **un papel en blanco.**

*"¿Cómo decidís qué hacer con cada persona?"* pregunté.

*"Depende. Si es comida urgente, derivo a alimentaria. Si tiene enfermedad, a Antonella. Si es emergencia, llamo al director."*

### El Problema Invisible

Analía era el **punto de entrada crítico** de todo el flujo.  
Pero no tenía herramientas. Solo su cabeza.

*"¿Qué información te gustaría tener disponible cuando llega alguien?"*

*"Saber si ya vino antes. Saber si ya recibe ayuda. Porque a veces vuelven y dicen 'Es la primera vez' cuando ya estuvieron hace 3 meses."*

### El Flujo Que Diseñé

No diseñé una "pantalla de administrativo."

Diseñé un **asistente de recepción:**

```
1. NUEVO vs EXISTENTE
   ├─ Searchbox: "Escribí un DNI o nombre"
   └─ Resultado: "María García, DNI 25.789.456"
      ├─ Si EXISTE: Ver historial (últimas visitas, beneficios)
      ├─ Si NO: Ir a registro nuevo

2. CLASIFICACIÓN RÁPIDA
   ┌─ ¿Solicitud presencial? SÍ/NO
   ├─ ¿Oficio externo (juzgado, hospital)? SÍ/NO
   ├─ ¿Derivación interna? SÍ/NO
   ├─ URGENCIA: Baja / Media / Alta
   └─ TIPO: Alimentaria / Médica / Emergencia / Otro

3. DATOS ESENCIALES
   ├─ Nombre
   ├─ DNI
   ├─ Teléfono
   └─ Motivo (área de texto)

4. GENERACIÓN AUTOMÁTICA
   └─ Sistema crea LEGAJO + asigna TURNO automáticamente
      └─ Imprime: "Tu turno es #2456, atenderemos en 2 horas"
```

**Efecto:**
- Analía no tiene que "pensar" qué hacer
- Datos consistentes desde la entrada
- Cero papeles sin procesar
- Trazabilidad desde el inicio

---

## La Técnica Que Usé: Entrevistas Contextuales

No me senté en una sala de conferencias.

Fui a **su terreno.**

### ¿Por Qué Funciona?

1. **Observas su flow real**
   - Cómo archivan documentos
   - Dónde guardan notas
   - Qué interrupciones tienen

2. **Ves el ambiente, no solo la tarea**
   - Ruido, clima, luz (¿afecta la atención?)
   - Congestión (50 papeles simultáneamente)
   - Recursos (¿tienen lo que necesitan?)

3. **Las preguntas surgen naturalmente**
   - No es interrogatorio
   - Es conversación en contexto
   - Emergen "sí pero..."

### Mis Preguntas Clave

No hice:
- ❌ *"¿Qué funcionalidades necesitás?"*  
- ❌ *"¿Cuál es tu workflow?"*

Hice:
- ✅ *"¿Cuál es la tarea que más te estresa?"*
- ✅ *"¿Qué información echás a faltar justo cuando la necesitás?"*
- ✅ *"¿Qué errores suceden más frecuentemente?"*
- ✅ *"Si el sistema fuera mágico, ¿qué haría automáticamente?"*

Esas preguntas **desbloquean la verdad.**

---

## El Momento De Claridad

En la segunda semana, Antonella me mostró un **bibliorato abarrotado** de documentos sin orden.

Dijo:
> *"¿Quién se pone a revisar esto?"*

No era una pregunta retórica.  
Era frustración pura. Desgaste. Tiempo perdido.

En ese momento, **dejé de ver un "requerimiento funcional"** y vi un **dolor humano real:**

Horas de vida perdidas en buscar papeles.  
Estrés innecesario.  
Oportunidad perdida de atender personas vulnerables.

### Eso Cambió Mi Diseño

No diseñé "un buscador más rápido."

Diseñé **un sistema que liberaba su tiempo de papeles para estar con personas.**

---

## Cómo Traduje Sus Palabras Al Sistema

| Lo Que Escuché | Lo Que Diseñé | Beneficio |
|---|---|---|
| *"Se pierden cosas."* | Logs y auditoría integral | Trazabilidad total |
| *"No sabemos qué se le dio antes."* | Historial único por legajo | Contexto completo |
| *"Tenemos que estar llamando."* | Módulo de notificaciones internas | Comunicación instant |
| *"Todo queda en papel."* | Digitalización con búsqueda full-text | Recuperación en segundos |
| *"Es un quilombo tener que pedir."* | Acceso remoto + móvil | Autonomía de trabajo |
| *"A veces se repiten beneficios."* | Validación en tiempo real | Presupuesto protegido |

---

## Reflexión: Las Mejores Funcionalidades Nacen De Escuchar

### 1. No Asumas

Tu idea de lo que necesita el usuario probablemente es incompleta.

### 2. Observá Más Que Preguntes

¿Dónde miran primero? ¿Qué papel sacan antes? ¿Qué tareas dejan incompletas?

### 3. El Usuario No Sabe Qué Es Posible

Tu trabajo es ofrecerle soluciones que **resuelvan su dolor**, no solo su problema declarado.

### 4. Interpreta El Dolor Detrás De La Queja

*"Los papeles se pierden"* = Necesita sistema con logs.  
*"No sé si ya vino"* = Necesita histórico searchable.  
*"Es un quilombo"* = Necesita simplificar un proceso.

### 5. Traduce Sin Perder La Esencia

Tu rol es ser un **puente lingüístico:**  
- Del mundo de usuarios al mundo de desarrolladores
- Del problema real a la solución técnica
- Manteniendo la intención original

---

## Hoy: El Sistema Que Diseñamos Con Ellas

No es "mi sistema." Es **suyo.**

Porque sus voces están en cada pantalla, en cada flujo, en cada alerta.

Antonella me dijo hace poco:
> *"Ahora tengo 2 horas extra por día para estar con la gente. Eso vale todo el esfuerzo de aprender el sistema."*

Eso es la métrica que importa.

---

## Mi Especialidad

**Escuchar lo que no se dice.  
Entender el dolor detrás de la queja.  
Traducirlo en software que realmente sirva.**

No hago sistemas "genéricos."  
Hago sistemas que hablan el idioma del negocio.

---

## ¿Tenés Un Proyecto Donde Las Necesidades Reales Están Escondidas?

En los papeles. En las quejas. En la frustración de los usuarios.

Conversemos. Mi especialidad es desenterrar esas verdades y convertirlas en soluciones.

---

## Hashtags

#EntrevistasConUsuarios #UserResearch #AnalisisFuncional #DiseñoCentradoEnPersonas #ExperienciaDeUsuario #LevantamientoDeRequerimientos #HistoriasDeUsuario #Software #ImpactoSocial #EscucharAlUsuario
