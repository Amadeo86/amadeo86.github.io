---
title: "Economía circular en tech: por qué reciclar código es tan importante como reciclar hardware"
description: "Cómo los principios de sostenibilidad que aplico en LAJ-IT también son críticos en desarrollo de software moderno."
date: "2025-01-30"
readTime: "7 min read"
image: "/assets/images/posts/economia-circular-tech.jpg"
slug: "economia-circular-codigo"
author: "Ramón Amadeo"
category: "Sustentabilidad"
tags: ["economía circular", "sostenibilidad", "código limpio", "reciclaje de código", "waste reduction", "tech impact"]
---

## El problema: Tech produce basura (literal y virtual)

### Hardware que termina en basurales

Según la ONU, en 2023 se generaron 62 millones de toneladas de e-waste globalmente. Solo el 23% fue reciclado. El resto:
- Incinerado (libera toxinas)
- Enterrado (contamina agua subterránea)
- Descartado en vertederos ilegales en países en desarrollo

### Software que termina en repositorios muertos

En el lado del código:
- Librerías deprecadas siguen siendo usadas (deuda técnica acumulada)
- Código legacy imposible de mantener causa mayor consumo de energía en servidores
- Microservicios redundantes replican funcionalidad innecesariamente

**El costo invisible:** Una línea de código duplicada en 50 servicios significa 50x mantenimiento y 50x consumo de energía.

## De palets a software: La mentalidad circular

### Lo que aprendí en LAJ-IT

Cuando construía mi CNC a partir de palets:

```
Problema: "Necesito estructura rígida"
Solución lineal: "Compro perfiles aluminio nuevo"
Solución circular: "Recupero palets + hierro reciclado + optimizo diseño"
```

El pensamiento circular no es solo "usar cosas viejas". Es:
1. **Reducir:** ¿Realmente necesito eso?
2. **Reutilizar:** ¿Puedo usar algo existente?
3. **Reciclar:** Si no puedo reutilizar, ¿cómo lo reciclo?
4. **Regenerar:** ¿Puedo mejorarlo en el proceso?

### Aplicando eso a código

```
Problema: "Necesito validar emails en mi API"
Solución lineal: "Escribo función de validación desde cero"
Solución circular: "Uso librería Apache Commons Validator (código probado, mantenido)"
```

**Beneficios inmediatos:**
- Menos código para mantener
- Menos bugs (código ya testeado)
- Menor consumo de CPU
- Mejor reutilización de recursos

## Las 3 R's del desarrollo sustentable

### 1. Reducir: Minimalismo en el código

**Problema:** Todo "podría ser útil", entonces lo dejamos

```java
// LINEAL (bloated):
public class UserController {
    private UserService userService;
    private NotificationService notificationService;
    private AnalyticsService analyticsService;
    private CacheService cacheService;
    private LoggingService loggingService;
    // ... 50 métodos, algunos nunca usados
}

// CIRCULAR (minimal):
public class UserController {
    private UserService userService;
    
    @GetMapping("/{id}")
    public ResponseEntity<UserDTO> getUser(@PathVariable Long id) {
        return userService.getUserById(id);
    }
}
```

**Impacto ambiental:**
- Menos código = menos memoria en servidor
- Menos dependencias = menor footprint de compilación
- Menos surface area para bugs = debugging más eficiente

### 2. Reutilizar: DRY (Don't Repeat Yourself)

**Patrón circular:** Si escribes código similar 2+ veces, es candidato a librería.

```java
// REPETIDO (lineal):
// En UserService:
List<User> active = users.stream()
    .filter(u -> u.isActive())
    .filter(u -> u.getCreatedAt().isAfter(cutoffDate))
    .collect(Collectors.toList());

// En OrderService:
List<Order> recent = orders.stream()
    .filter(o -> o.isActive())
    .filter(o -> o.getCreatedAt().isAfter(cutoffDate))
    .collect(Collectors.toList());

// REUTILIZADO (circular):
public class TemporalFilter {
    public static <T extends Entity> List<T> recentActive(List<T> items, LocalDateTime cutoff) {
        return items.stream()
            .filter(Entity::isActive)
            .filter(e -> e.getCreatedAt().isAfter(cutoff))
            .collect(Collectors.toList());
    }
}

// Uso:
List<User> activeUsers = TemporalFilter.recentActive(users, cutoff);
List<Order> recentOrders = TemporalFilter.recentActive(orders, cutoff);
```

**Impacto:**
- Una sola implementación para mantener
- Bugfixes aplican a todo el codebase
- Cambios de optimización aplican universalmente

### 3. Reciclar: Refactoring como acto ambiental

El refactoring no es "mejorar por mejorar". Es **transformar código lineal en circular**.

```java
// LINEAL (cada feature agrega capas):
public List<User> getAdminUsers() {
    List<User> all = db.getAllUsers();
    List<User> filtered = new ArrayList<>();
    for (User u : all) {
        if (u.getRole().equals("ADMIN")) {
            filtered.add(u);
        }
    }
    return filtered;
}

public List<User> getActiveUsers() {
    List<User> all = db.getAllUsers();
    List<User> filtered = new ArrayList<>();
    for (User u : all) {
        if (u.isActive()) {
            filtered.add(u);
        }
    }
    return filtered;
}

// CIRCULAR (extraes el patrón, lo reutilizas):
public List<User> filterUsers(Predicate<User> condition) {
    return db.getAllUsers().stream()
        .filter(condition)
        .collect(Collectors.toList());
}

public List<User> getAdminUsers() {
    return filterUsers(u -> u.getRole().equals("ADMIN"));
}

public List<User> getActiveUsers() {
    return filterUsers(User::isActive);
}
```

## Microservicios: La tentación del desperdicio

Hoy vemos:
```
Microservicio: "Auth Service" (5 funciones)
Microservicio: "User Service" (3 funciones)
Microservicio: "Notification Service" (2 funciones)
...
Total: 50 microservicios para 150 funciones
Problema: Cada servicio = contenedor Docker = 150-500MB RAM
Total de memoria: 7.5-25GB (¡innecesario!)
```

**Pensamiento circular:**
- ¿De verdad necesito microservicios O es seguir tendencias?
- ¿Qué beneficio real dan los límites de servicio?
- ¿Cuál es el costo ambiental (energía) de 50 contenedores?

**Solución moderada:**
```
Monolito bien diseñado (modular):
- Auth Module (5 funciones)
- User Module (3 funciones)  
- Notification Module (2 funciones)
...
Total: 1 contenedor Docker = 300MB RAM
Facilidad de mantenimiento: mayor (sin network latency)
```

Luego, cuando realmente necesites escalar UN módulo específico, ENTONCES extraes ese microservicio.

## El caso de estudio: Futsystem

Cuando diseñé Futsystem (sistema de reservas), apliqué circulidad:

### Reduce
- Framework: Spring Boot sin configuración excesiva
- BD: MySQL (probado, estable) en lugar de experimentar con NoSQL trendy
- Frontend: Bootstrap vanilla en lugar de framework JS complejo

Resultado: Aplicación que un developer puede mantener en 10 horas/mes

### Reutiliza
- Spring Data JPA para queries
- Apache Commons para utilidades
- JWT estándar para auth (no custom)

Resultado: Poco "código propietario", mucho "código probado de terceros"

### Recicla
- Cada módulo (Reservas, Pagos, Reportes) sigue patrón idéntico
- Reducción del 40% en código duplicado después del refactor inicial

Resultado: Ahora puedo agregar nuevas features 50% más rápido

## Métricas para medir circularidad en código

```
1. Code Duplication Index
   - Ideal: < 5%
   - Medir con: SonarQube, Codacy

2. Dependency Ratio
   - Ideal: Menos dependencias externas (balance entre reutilizar y no reinventar)
   - Medir con: npm audit, mvn dependency:tree

3. Cyclomatic Complexity
   - Ideal: < 10 por función
   - Medir con: SonarQube, Code Metrics

4. Carbon Footprint de Recursos
   - Si tu aplicación usa 10GB RAM, ¿es necesario?
   - Medir con: profiling, monitoring en producción
```

## La visión: Tech sustentable

Imagina aplicaciones que:
- Usan el mínimo de recursos posible
- Reutilizan código probado
- Se mantienen fácilmente (no acumulan deuda técnica)
- Duram años sin "reescrituras totales"
- Consumen menos energía (impacto ambiental menor)

**Eso no es idealista. Es rentable y ecológico simultáneamente.**

---

**Reflexión final:** En LAJ-IT demuestro que se puede innovar con restricciones. En tech, las restricciones de recursos (energía, servidores, mantenimiento) deben ser RESTRICCIONES DE DISEÑO, no limitaciones posteriores.

*¿Cuál es el proyecto más "circular" que has visto en tech? ¿Usa algún patrón sustentable que pueda adoptar?*

Comparte en los comentarios o conecta en LinkedIn.

**Tags:** #EconomíaCircular #Sostenibilidad #CódigoLimpio #GreenTech #Desarrollo #Impacto #Reciclaje #Innovation
