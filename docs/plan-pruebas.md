# Plan de pruebas dinámicas - Unidad 2

## 1. Objetivo y alcance

Evaluar por ejecución la función `calcularTotal(precio, cantidad, descuento)` de una tienda digital. El alcance incluye el cálculo aritmético, descuentos porcentuales, redondeo a dos decimales, validaciones de entradas y una exploración limitada de rendimiento. Se conservó una copia exacta del código inicial en `evidencias/compras-inicial.js` para permitir replicar los fallos sin alterar las pruebas.

## 2. Requisitos y criterios de interpretación

- **RF-01:** subtotal = precio x cantidad para números positivos.
- **RF-02:** descuentos entre 0 y 100 %, ambos extremos incluidos.
- **RF-03:** total redondeado a dos posiciones decimales, 100 % de descuento = 0.
- **RF-04:** `RangeError` para precio < 0, cantidad <= 0 o descuento fuera de [0, 100].
- **RF-05:** `TypeError` para valores que no sean de tipo `number` o no sean finitos.
- **RNF-01:** medición exploratoria y acotada del rendimiento.

**Supuestos declarados:** un precio de cero se admite porque la prohibición explícita de RF-04 se refiere a precios negativos; cantidades positivas fraccionarias se admiten porque no existe requisito de enteros. La salida es un número JavaScript redondeado a centavos: `12.30` se representa como `12.3`; la visualización con ceros finales corresponde a `toFixed(2)` en una interfaz. No se define una regla de redondeo monetario avanzada para todos los casos de coma flotante.

## 3. Estrategia, nivel y técnicas

- **Nivel:** pruebas unitarias de caja negra de la función pública, ejecutadas mediante Jest.
- **Tipos:** funcionales positivas y negativas, comprobación de excepciones, regresión después de corregir y exploración de rendimiento aislada.
- **Técnicas:** partición de equivalencia (válido/inválido), análisis de valores límite (0, 100, 0.01, -0.01, 100.01), y combinaciones de cálculo con centavos.
- **Fuera de alcance:** interfaz web, integración con pagos, concurrencia, seguridad de transacciones, bases de datos y pruebas de carga reales.

## 4. Riesgos y prioridad

| Riesgo | Impacto | Respuesta |
| --- | --- | --- |
| Aceptación silenciosa de datos inválidos | Alto: totales incorrectos | Casos que comprueban `TypeError` y `RangeError` |
| Descuento fuera de rango | Alto: valores negativos o artificialmente aumentados | Valores frontera -0.01, 0, 100 y 100.01 |
| Error por decimales y redondeo | Medio/alto: importes inconsistentes | Comparación exacta a centavos |
| Comportamiento no especificado (cantidades fraccionarias) | Medio | Supuesto documentado, sin modificar RF |
| Rendimiento no representativo | Medio | Medir varias corridas; advertir límites |

## 5. Ambiente y datos

- Runtime: Node.js; las pruebas finales se ejecutaron con Node.js v26.13.0 en Windows. Módulo CommonJS.
- Framework: Jest 29; en PowerShell se utiliza `npm.cmd test` para ejecutar `jest --runInBand`.
- Equipo, sistema operativo y ejecución: detalles registrados por scripts en los archivos de evidencia.
- Datos: valores construidos para la práctica, sin información personal ni sistemas externos.

## 6. Criterios de entrada y salida

**Entrada:** requisitos RF-01..RF-05 y RNF-01 disponibles; módulo original conservado; matriz trazable; ambiente Node operativo y Jest instalado para las pruebas solicitadas.

**Salida esperada:** >=12 casos diseñados; >=10 automatizados en Jest; fallos originales registrados; >=3 defectos reproducibles con severidad y evidencia; 100 % de pruebas Jest aprobadas luego de la corrección; regresión ejecutada; tiempo exploratorio reportado con limitaciones. **En Windows se cumplió el criterio de salida: 24/24 pruebas Jest aprobadas.**

## 7. Reflexión de planificación

Elegí las pruebas unitarias porque la actividad se centra en una función sin servicios externos. No bastaba con comprobar una compra común: un cálculo puede parecer correcto y aun así aceptar entradas inválidas o manejar mal los centavos. La separación de los datos de prueba de la implementación permite repetirlos después de corregir y reduce el riesgo de mover la meta para que el programa apruebe.
