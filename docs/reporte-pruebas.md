# Reporte de pruebas dinámicas - Unidad 2

## 1. Planificación

En este laboratorio revisé una función que calcula el total de las compras. Organicé las pruebas a partir de RF-01 a RF-05 y RNF-01. Me enfoqué en comprobar el subtotal, los descuentos, el redondeo y la respuesta ante datos inválidos. El plan completo quedó en `docs/plan-pruebas.md`.

Usé pruebas unitarias con Jest y combiné casos normales, particiones de equivalencia, valores límite y datos inválidos. No incluí interfaz, bases de datos ni pagos reales, porque la actividad se concentra en una sola función.

**Reflexión:** al planificar comprendí que una operación matemática sencilla también necesita controles claros. Las pruebas de entradas incorrectas son importantes porque pueden evitar totales sin sentido.

## 2. Diseño de casos

Preparé 24 casos en `docs/matriz-casos.md` y los automaticé en `tests/compras.test.js`. Relacioné cada prueba con el requisito correspondiente:

| Requisito | Qué comprobé | Casos |
| --- | --- | --- |
| RF-01 | Subtotal, precio decimal y precio cero | TC-01 a TC-03 |
| RF-02 | Descuentos válidos y valores extremos | TC-04 a TC-08 |
| RF-03 | Total a dos decimales y descuento completo | TC-06 a TC-12 |
| RF-04 | Rangos inválidos y excepción RangeError | TC-13 a TC-17; TC-03 |
| RF-05 | Tipos inválidos, NaN e infinitos | TC-18 a TC-24 |
| RNF-01 | Medición exploratoria del rendimiento | Script independiente |

**Reflexión:** definir los resultados esperados desde los requisitos me ayudó a no cambiar las pruebas para que coincidieran con el código incorrecto.

## 3. Ejecución inicial y defectos

Con la versión original, 7 de los 24 casos pasaron y 17 fallaron en el diagnóstico de Node.js. Al ejecutar `npm.cmd run evidencias` en Windows se confirmó que Jest terminó con código 1 para la versión original, lo esperado cuando existen defectos.

Registré tres problemas: falta de validación de rangos (DEF-01), aceptación de tipos y valores no finitos (DEF-02), y ausencia de redondeo a centavos (DEF-03). En `docs/defectos.md` detallé los casos, pasos, resultados y severidades.

**Reflexión:** guardar la ejecución inicial sirve para demostrar qué fallaba antes de modificar la función, en lugar de presentar únicamente el código final.

## 4. Corrección y regresión

Primero agregué las validaciones de tipos finitos y de rangos. En el diagnóstico intermedio pasé de 7 a 19 casos correctos. Después agregué el redondeo a dos decimales y repetí los 24 casos.

El **11 de noviembre de 2026** ejecuté Jest en Windows con Node.js **26.13.0**. El resultado final fue **1 suite aprobada y 24 pruebas aprobadas, sin fallos**, en **0.526 segundos**. Con `npm.cmd run evidencias` obtuve código 1 para la versión original y 0 para la versión corregida. Los archivos `evidencias/pruebas-iniciales.txt` y `evidencias/pruebas-finales.txt` se pueden regenerar directamente desde ese comando.

**Reflexión:** repetir toda la suite, y no solo las pruebas que fallaban, me permitió revisar que las correcciones no perjudicaran los casos que inicialmente funcionaban.

## 5. Rendimiento y conclusiones

Realicé una medición exploratoria con cinco rondas de 100.000 llamadas a `calcularTotal(19.99, 3, 15)`, además de un calentamiento de 10.000 operaciones. En la última ejecución compartida desde Windows utilicé un equipo con procesador AMD Ryzen 5 4600H, 15.42 GiB de RAM y Node.js 26.13.0. La mediana fue **1.869 ms por 100.000 llamadas**. La salida se conserva en `evidencias/rendimiento.txt`.

Esta medición es limitada: utiliza una función aislada, datos repetidos y un único proceso. Los tiempos cambian según la computadora y las optimizaciones de JavaScript, por lo que no representan la velocidad de un sistema comercial real.

Todos los requisitos funcionales tienen pruebas asociadas y el requisito de rendimiento cuenta con su exploración. Aun así, no se midió cobertura de líneas y quedan riesgos con valores monetarios extremos, cantidades fraccionarias y futuras integraciones con otros módulos.

**Conclusión personal:** aprendí que las pruebas dinámicas ayudan a identificar problemas que no siempre son visibles al leer el código. La matriz, las evidencias y la regresión hacen posible comprobar los cambios y explicar cómo llegué a una versión más confiable.
