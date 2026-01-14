---
title: "Por qué dejé mi CNC para programar smart contracts"
description: "De la carpintería de precisión a blockchain: Por qué el futuro del agro no será madera, sino tokens. Historia personal."
date: "2026-01-23"
readTime: "9 min read"
image: "/assets/images/posts/cnc-a-blockchain.jpg"
slug: "cnc-a-blockchain"
author: "Ramón Amadeo"
category: "Mi-Camino"
tags: ["personal", "blockchain", "smart-contracts", "emprendimiento", "agro", "transición", "carrera"]
---

## El taller de Las Lajitas (2018)

Cuando monté LAJ-IT, el objetivo era claro: **fabricar con precisión**.

Con mi CNC (construida a partir de palets y aluminio), podía:
- Cortar piezas de madera con 0,5mm de tolerancia
- Hacer 10 trabajos en paralelo
- Ganar $500-800 USD por proyecto
- Ser "el técnico" que solucionaba problemas mecánicos

Fue glorioso. Por 5 años.

Pero en 2021, algo cambió.

## El momento "ajá" (Diciembre 2021)

Estaba en Salta visitando a la familia. En una cena, alguien mencionó:
> "Mi hermano invirtió $5.000 en ganado y sacó $25.000 en 2 años."

Yo pensé: **"¿Eso es posible?"**

Lo que me molestaba no era la ganancia. Era **cómo la ganancia se distribuía**:
- El que tenía $100.000 ganaba mucho
- El que tenía $5.000 ganaba poco
- El que tenía $500 no podía entrar

**La barrera de entrada era gigante.**

Mientras, en el mundo de Bitcoin (que había estado ignorando):
- Alguien en Japón podía invertir $100 en ganado argentino
- Sin enviar dinero a través de bancos
- Sin intermediarios tomando 5% de comisión
- Sin esperar 3 días para que se transfiera dinero

"**Espera. ¿Esto es real?**"

## El antes y el después

### ANTES (LAJ-IT):

**Mi rol:** Fabricante
```
Cliente → Necesita pieza de madera
       ↓
Yo diseño (CAD) + fabrico (CNC)
       ↓
Vendo pieza por $800
       ↓
Ganancia: $500 (64%)

Problema: 
- Limitado por tiempo (1 persona = 10 proyectos/mes)
- Localizado (solo Las Lajitas/Salta)
- Dependencia física (sin máquina = sin ingresos)
```

### DESPUÉS (TuGanado.com):

**Mi rol:** Facilitador de liquidez
```
Productor → Tiene 1.000 terneros
         ↓ Necesita capital para alimentar/cuidar
         
Inversor → Tiene $50.000 USD
        ↓ Quiere exponerse a agro
        
Yo construyo: Smart contract + API + Regulación
         ↓
Ganancia: 3% por transacción
        ↓
Mientras duermen, generan ingresos

Potencial: 
- Ilimitado (100 transacciones simultáneas)
- Global (funciona 24/7 en blockchain)
- Escalable (copiar código = replicar ingresos)
```

## Por qué abandoné la carpintería (Spoiler: No la abandoné)

Aquí está el giro:

**No** dije "La carpintería está muerta". Dije **"Puedo impactar más con software".**

LAJ-IT me enseñó:
- **Precisión:** En carpintería, 1mm de error arruina todo
- **Debugging:** ¿El CNC no corta? Revisaba calibración, motor, fricción
- **Escalabilidad:** Si necesitaba más producción, compraba otra máquina
- **Documentación:** Sin manual, nadie sabía usar el CNC

Con smart contracts, **el aprendizaje es idéntico:**
- **Precisión:** 1 carácter error en código = transacción falla
- **Debugging:** ¿Por qué el smart contract no transfiere tokens? Reviso lógica, gas, permisos
- **Escalabilidad:** 1.000 usuarios al mismo tiempo, cero costo adicional
- **Documentación:** Sin interfaz clara, nadie usa la app

Fue un salto técnico, no un cambio de mindset.

## El viaje de aprendizaje (Honesto)

Cuándo empecé con blockchain, no entendía nada.

**Enero 2022:** Compré 0.1 BTC pensando que era una acción de Apple.

**Marzo 2022:** Leí "The Bitcoin Standard" y entendí: "Oh, descentralización."

**Junio 2022:** Mi primer contrato inteligente:
```solidity
pragma solidity ^0.8.0;

contract Hola {
    function saludar() public pure returns (string memory) {
        return "Hola mundo";
    }
}
```
Gasté $50 USD en gas para desplegar algo que un "Hola mundo" en JavaScript.

Pensé: **"¿Por qué alguien usaría esto?"**

**Septiembre 2022:** Leí sobre oráculos, RWA, DAO. El click.

**Diciembre 2022:** Empecé TuGanado.com con la visión clara.

**Hoy:** Ayudando a 50+ productores a tokenizar ganado.

## El costo personal (Las inseguridades)

**Pregunta que me hago constantemente:** ¿Soy un imposter?

Mis credenciales:
- ✅ Técnico en Sistemas (2014)
- ✅ 8 años fabricando máquinas
- ✅ 2 años en blockchain
- ❌ Ningún título en Finanzas, Ingeniería, o Derecho

TuGanado necesita:
- Solidity (✅ Puedo aprender)
- Regulación CNV (⚠️ Contrato legal ayuda)
- Confianza de inversores (❌ No tengo track record)
- Blockchain expertise (✅ Creciendo)

**La verdad:** Aprender haciéndolo es 10x más efectivo que cursos.

Cuando construí LAJ-IT sin dinero, tampoco sabía cómo:
- Diseñar máquinas CNC
- Programar Arduino
- Hacer electrónica

**Pero lo hice.**

Blockchain es lo mismo. Solo que digital.

## Lo que no cambió (Las similitudes sorprendentes)

### 1. El debugging

En carpintería:
```
Síntoma: "El CNC no corta recto"
↓
Hipótesis: ¿Broca gastada? ¿Presión baja? ¿Desalineado?
↓
Experimento: Cambio broca → Vuelvo a probar
↓
Resultado: Corta perfecto
```

En blockchain:
```
Síntoma: "La transacción falla"
↓
Hipótesis: ¿Gas bajo? ¿Permiso revocado? ¿Lógica errónea?
↓
Experimento: Aumento gas → Vuelvo a probar
↓
Resultado: Funciona
```

**El proceso mental es idéntico.**

### 2. La documentación

Sin manual del CNC, los clientes no podían usarlo.

Sin documentación de TuGanado.com, los productores no entienden.

Ahora documento TODO:
- Cómo tokenizar tu ganado (video)
- Cómo comprar tokens (paso a paso)
- Qué hacer si algo falla

### 3. La confianza

En LAJ-IT:
```
"¿Puedo confiar en este técnico?"
↓
Respuesta: Mostraba trabajos anteriores
           Daba garantía de 1 año
           Entregaba a tiempo
```

En TuGanado:
```
"¿Puedo confiar en este dev?"
↓
Respuesta: Mostrar código en GitHub
           Auditoría de smart contract
           Casos de éxito reales
```

## Las números (Por qué tiene sentido el cambio)

### LAJ-IT (modelo de servicios):
```
Ingresos/mes:    $3.000 (5 proyectos × $600)
Techo máximo:    $5.000 (10 proyectos, ya no duermo)
Horas/mes:       200
ROI personal:    $15/hora
```

### TuGanado (modelo de plataforma):
```
Ingresos/mes:    $2.000 (comisión de 50 transacciones)
Potencial:       $50.000+ (1.000 transacciones)
Horas/mes:       120 (dev + soporte)
ROI personal:    $16/hora (hoy) → $416/hora (cuando escale)
```

**La diferencia:** Uno crece con mi esfuerzo. El otro crece mientras duermo.

## Lo que llevo de LAJ-IT a TuGanado

### 1. Mentalidad de precisión
Los smart contracts son como el CNC: **1 error = fracaso total**.

### 2. Documentación obsesiva
Si no lo escribí, no lo hice.

### 3. No prometeré rentabilidad fija
En LAJ-IT: "Esta silla durará 10 años" (promesa verificable).
En TuGanado: "El ganado puede crecer 50kg/mes O puede enfermarse" (honestidad).

### 4. Validación con usuarios reales
Antes de vender una pieza, me la probaba.
Antes de lanzar TuGanado, probé tokenización con 5 productores piloto.

## La pregunta que la gente me hace

**"¿Extrañas la carpintería?"**

Sí y no.

Extraño:
- El feedback inmediato (ves la pieza lista)
- El trabajo con las manos
- La comunidad de makers

No extraño:
- El techo de ingresos ($5K/mes máximo)
- La localización (solo Las Lajitas importa)
- El agotamiento físico

Ahora hago una mezcla:
- Los fines de semana, algo con madera (hobby)
- Entre semana, smart contracts (carrera)

## Reflexión final

Este viaje de LAJ-IT → TuGanado no fue "abandonar mis raíces".

Fue **aprender que la precisión, el debugging y la documentación son habilidades universales.**

El CNC me enseñó a pensar como ingeniero. Blockchain me permite ser uno.

Y lo mejor:
- Puedo ayudar a Don Jorge (del Lerma) a tokenizar su ganado
- Puedo ayudar a un inversor en Hong Kong a participar
- Puedo hacer las dos cosas sin viajar

**Eso, en LAJ-IT, era imposible.**

---

**¿Vos también tenés una máquina/skill/pasión del pasado?**
**¿Qué te detiene de escalar?**

Escribeme. Probablemente puedas.

**Tags:** #CarreraProf #Emprendimiento #Blockchain #Transición #Agro #Aprendizaje
