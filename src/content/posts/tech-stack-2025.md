---
title: "Mi stack tecnológico 2025: herramientas que uso en desarrollo, diseño y fabricación"
description: "Un overview completo del stack: lenguajes, frameworks, herramientas y decisiones detrás de cada una."
date: "2025-02-06"
readTime: "10 min read"
image: "/assets/images/posts/tech-stack-2025.jpg"
slug: "tech-stack-2025"
author: "Ramón Amadeo"
category: "Herramientas"
tags: ["tech stack", "herramientas", "desarrollo", "java", "flutter", "arduino", "workflow"]
---

## La evolución: cómo llegué a esta stack

En 2016, cuando construía mi CNC, usaba:
- Arduino IDE (lo único que conocía)
- Excel (para cálculos)
- YouTube (para tutorials)
- Taladro manual (herramienta principal)

Hoy, con 8 años de evolución, mi stack es diferente pero sigue el mismo principio: **elegir herramientas que resuelven problemas reales, no tendencias**.

## Backend: Java + Spring Boot

### Por qué Java

```
Alternativas consideradas:
- Python: Excelente, pero... menos tipado = menos seguridad en producción
- Go: Rápido, pero... comunidad menor en mi área
- Node.js: Flexible, pero... requiere más disciplina en arquitectura
- Java: Maduro, tipado, comunidad masiva, JobMarket fuerte
```

### Mi stack específico

```
┌─────────────────────────────────┐
│  Servidor Web: Spring Boot 3    │
│  ORM: Spring Data JPA + Hibernate
│  Base de datos: MySQL 8         │
│  Cache: Redis (cuando lo necesito)
│  API: RESTful + OpenAPI/Swagger │
│  Build: Maven (no Gradle)       │
│  Testing: JUnit 5 + Mockito     │
└─────────────────────────────────┘
```

### Las decisiones detrás

**Spring Boot (no microservicios desde el inicio)**
- Monolito modular escalable
- Decisión: "Microservicios cuando realmente los necesite, no antes"

**MySQL (no NoSQL)**
- Relaciones estructuradas son críticas en nuestros casos de uso
- Transacciones ACID garantizadas
- Backup + replicación maduros

**JUnit + Mockito (no frameworks overly complex)**
- Testing simple = testing que se escribe
- Mockito es suficiente para 90% de casos
- TestContainers cuando necesito BD real

## Frontend Web: React + Tailwind

### Stack específico

```
┌──────────────────────────────────┐
│  Framework: React 18             │
│  Language: TypeScript             │
│  Styling: Tailwind CSS           │
│  Build: Vite (no Create React App)
│  State: Context API + useReducer  │
│  HTTP: Axios + React Query        │
│  Deployment: Vercel (automático)  │
└──────────────────────────────────┘
```

### Las decisiones detrás

**React (no Vue, no Svelte)**
- Es lo que usaré profesionalmente probablemente
- Comunidad más grande = más librerías
- Actualización profesional constante

**TypeScript obligatorio**
- El 50% de bugs que debería arreglar en JavaScript son catcheados por TS en build-time

**Tailwind sobre CSS custom**
- Utility-first = consistencia visual automática
- Archivo CSS se genera solo basado en lo que usas
- Rapid prototyping sin nombrar clases

**Vite sobre Create React App**
- CRA es lento en desarrollo (rebuild de 3-5 segundos)
- Vite es instant (<100ms)

## Mobile: Flutter + Dart

### Por qué Flutter

Cuando empecé con App Ascensores, consideré:

```
- React Native: JavaScript, pero más frágil
- Swift/Kotlin: Nativo, pero... dos codebases
- Flutter: Dart, compilación eficiente, UI consistente
```

### Stack específico

```
┌──────────────────────────────┐
│  Framework: Flutter 3        │
│  Language: Dart              │
│  State: Riverpod (no Provider)
│  HTTP: Dio + Retrofit        │
│  Local DB: Hive (key-value)  │
│  Testing: Mockito + Flutter Test
│  CI/CD: GitHub Actions       │
│  Deployment: Google Play + App Store
└──────────────────────────────┘
```

### Las decisiones detrás

**Riverpod sobre Provider**
- Más moderno y type-safe
- No sufre de "dart:async hell"

**Hive sobre Sqflite**
- Key-value es suficiente para la mayoría de apps
- Más rápido que SQL local para datos simples
- Sincronización automática

**GitHub Actions para CI/CD**
- Gratis para repositorios públicos
- Build automático en cada push
- Notificación a Slack cuando falla build

## Hardware: Arduino + C++

### Mi stack físico actual

```
┌─────────────────────────────────┐
│  Microcontrolador: Arduino Uno/Nano
│  Motor steppers: NEMA 17        │
│  Drivers: DRV8825 o A4988       │
│  Control: GRBL firmware         │
│  Diseño: Vectric Aspire         │
│  Programación: C++ (Arduino lang)│
│  Testing: Multímetro + osciloscopio
└─────────────────────────────────┘
```

### Las decisiones detrás

**Arduino sobre PLC industrial**
- Costo 100x menor
- Comunidad enorme
- Suficiente para aplicaciones no-críticas

**GRBL como firmware**
- Estándar de facto para CNC caseras
- Documentación completa
- Compatible con 90% del software CAM

**Vectric Aspire**
- Es pago (~$600), pero... profesional
- Alternativa gratuita: Fusion 360 (OK pero overhead)

## DevOps & Deployment

```
┌──────────────────────────────┐
│  Version Control: Git + GitHub
│  CI/CD: GitHub Actions        │
│  Backend Hosting: Railway/Render
│  Frontend Hosting: Vercel/Netlify
│  Databases: PlanetScale (MySQL) │
│  Monitoring: Sentry + LogRocket │
│  Passwords: 1Password         │
│  Communication: Slack         │
└──────────────────────────────┘
```

### Las decisiones detrás

**GitHub Actions (no Jenkins/CircleCI/GitLab CI)**
- Integración nativa con GitHub
- Gratis para repositorios públicos
- Suficiente para nuestro volumen

**Vercel para frontend**
- Automático desde push a main
- Edge functions para middleware
- Analytics de performance integrado

**PlanetScale para BD**
- MySQL compatible pero serverless
- Backup automático
- Escalado automático

**Sentry para error tracking**
- Veo errores en producción antes que users
- Stack traces automáticas
- Notificaciones a Slack

## Decisiones filosóficas detrás del stack

### 1. No seguir tendencias ciegamente

```
Tendencia 2023-2024: "Microservicios en todo"
Mi decisión: Monolito modular primero
Resultado: Aplicaciones que funcionan, mantenibles, rápidas
```

### 2. Preferir lo probado sobre lo nuevo

```
Nuevo: "TypeScript 5.3 nuevo sistema de tipos"
Probado: "TypeScript 4.9 con el que trabajé 2 años"
Decisión: Actualizar cuando sea necesario, no por ser nuevo
```

### 3. Evitar "resume-driven development"

```
Resume-driven: "Voy a aprender 5 frameworks nuevos este año"
Problem-driven: "¿Qué herramienta resuelve ESTE problema?"
Mi manera: Aprender nuevas herramientas cuando un proyecto realmente las necesita
```

### 4. Mantenibilidad > Optimización prematura

```
Rápido pero complejo: "Machine learning para predecir reservas"
Simple y efectivo: "Reglas de negocio claras + reporte manual"
Mi manera: Empieza simple, optimiza cuando métricas lo justifican
```

## Stack futuro: Qué estoy considerando

### Probablemente en 2025

```
- Astro.js para sitios estáticos (ya lo uso en este portfolio!)
- Kotlin para Android (si Flutter no es suficiente)
- GraphQL para APIs complejas (solo si REST no escala)
- PostgreSQL (MySQL está bien, pero Postgres es "más moderno")
```

### No voy a adoptar (basado en análisis)

```
- Rust: Curva de aprendizaje vs ROI no justificada
- Elixir: Comunidad aún muy pequeña en mi área
- Deno: Esperar más madurez
- NestJS: Node tiene complicaciones que Rust/Go evitan
```

## Workflow día a día

```
MAÑANA:
1. GitHub Desktop (ver qué cambió overnight desde CI/CD)
2. IDE: VS Code (Spring Boot + Flutter + Astro)
3. Terminal: PowerShell (Windows) + bash (Linux via WSL)

TARDE:
4. Testing: Correr test suites locales
5. Push: Git commit + push → GitHub Actions automáticamente

NOCHE:
6. Monitoreo: Revisar logs de Sentry
7. Planning: Qué herramienta necesitaré mañana
```

## Habilidades de la stack vs el trabajo

```
Stack que domino: 70%
Stack que conozco básico: 20%
Stack que aprendo constante: 10%

Ideal:
Domino: 60% (profundidad)
Conozco: 30% (amplitud)
Aprendiendo: 10% (futuro)
```

## Reflexión: Tooling es servicio, no objetivo

**Verdad peligrosa:** Gastamos más tiempo en "elegir la herramienta perfecta" que en resolver problemas.

**Mi filosofía:**
- Elige una herramienta competente
- Úsala bien durante 6 meses
- ENTONCES considera alternativas si hay pain points reales
- Repite

**Resultado:** Profundidad. Y profundidad = expertise = demanda profesional.

---

**¿Cuál es tu stack tecnológico? ¿Tienes decisiones "contracultura" que funcionan para ti?** Comparte en los comentarios. Me interesa conocer por qué otros desarrolladores eligen lo que eligen.

**Tags:** #TechStack #Desarrollo #Java #Flutter #React #DevOps #Herramientas #DecisionesDeArquitectura
