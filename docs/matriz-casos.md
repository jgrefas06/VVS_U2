# Matriz de casos de prueba - Unidad 2

**Diseño:** caja negra mediante particiones de equivalencia, valores límite, datos inválidos y redondeo. La misma matriz se aplica sobre el código original y corregido.

| ID | Requisito | Técnica | Datos: precio, cantidad, descuento | Esperado | Prioridad | Diagnóstico Node (inicio / final) |
|---|---|---|---|---|---|---|
| TC-01 | RF-01 | Equivalencia válida | `20, 3, 0` | `60` | Alta | Pasa / Pasa |
| TC-02 | RF-01 | Equivalencia válida | `19.99, 2, 0` | `39.98` | Alta | Pasa / Pasa |
| TC-03 | RF-01 / RF-04 | Límite | `0, 3, 0` | `0` | Media | Pasa / Pasa |
| TC-04 | RF-02 | Equivalencia válida | `100, 2, 25` | `150` | Alta | Pasa / Pasa |
| TC-05 | RF-02 | Límite inferior | `100, 2, 0` | `200` | Alta | Pasa / Pasa |
| TC-06 | RF-02 / RF-03 | Límite superior | `100, 2, 100` | `0` | Alta | Pasa / Pasa |
| TC-07 | RF-02 / RF-03 | Próximo al límite | `80, 1, 99.99` | `0.01` | Alta | Falla / Pasa |
| TC-08 | RF-02 / RF-03 | Equivalencia válida | `10.01, 3, 33.33` | `20.02` | Media | Falla / Pasa |
| TC-09 | RF-03 | Redondeo | `12.345, 1, 0` | `12.35` | Alta | Falla / Pasa |
| TC-10 | RF-03 | Redondeo | `0.1, 3, 0` | `0.3` | Media | Falla / Pasa |
| TC-11 | RF-03 | Redondeo | `1.001, 1, 0` | `1` | Media | Falla / Pasa |
| TC-12 | RF-03 | Límite | `19.99, 1, 100` | `0` | Alta | Pasa / Pasa |
| TC-13 | RF-04 | Inválida / límite | `-0.01, 1, 0` | `RangeError` | Alta | Falla / Pasa |
| TC-14 | RF-04 | Inválida / límite | `10, 0, 0` | `RangeError` | Alta | Falla / Pasa |
| TC-15 | RF-04 | Equivalencia inválida | `10, -1, 0` | `RangeError` | Alta | Falla / Pasa |
| TC-16 | RF-04 | Fuera del límite | `100, 1, -0.01` | `RangeError` | Alta | Falla / Pasa |
| TC-17 | RF-04 | Fuera del límite | `100, 1, 100.01` | `RangeError` | Alta | Falla / Pasa |
| TC-18 | RF-05 | Tipo inválido | `"10", 1, 0` | `TypeError` | Alta | Falla / Pasa |
| TC-19 | RF-05 | Tipo inválido | `10, null, 0` | `TypeError` | Alta | Falla / Pasa |
| TC-20 | RF-05 | Tipo inválido | `10, 1, undefined` | `TypeError` | Alta | Falla / Pasa |
| TC-21 | RF-05 | No finito | `NaN, 1, 0` | `TypeError` | Alta | Falla / Pasa |
| TC-22 | RF-05 | No finito | `10, Infinity, 0` | `TypeError` | Alta | Falla / Pasa |
| TC-23 | RF-05 | No finito | `10, 1, -Infinity` | `TypeError` | Alta | Falla / Pasa |
| TC-24 | RF-05 | Tipo inválido | `false, 1, 0` | `TypeError` | Alta | Falla / Pasa |

**Resumen:** 24 casos; originalmente 7 aprobados y 17 fallidos; después de la corrección 24 aprobados y 0 fallidos (diagnóstico inicial con `node:assert`, confirmado en la versión final por Jest en Windows).

**RNF-01:** se mide por separado mediante `npm run rendimiento` (5 rondas, 100 000 operaciones por ronda); evidencia en `evidencias/rendimiento.txt`.

**Ejecución con Jest:** realizada en Windows el 11 de noviembre de 2026; 24 pruebas finales aprobadas. Para guardar las salidas completas en esta carpeta utilizo `npm.cmd run evidencias`.
