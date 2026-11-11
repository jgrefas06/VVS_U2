# Registro de defectos confirmados

Todos los defectos se reprodujeron ejecutando los casos de la matriz contra la copia inalterada `evidencias/compras-inicial.js`. La primera evidencia se registró con `node:assert`. Después se ejecutó Jest en Windows; el código original terminó con salida 1 y la versión corregida con salida 0. El comando `npm.cmd run evidencias` permite volver a guardar ambas salidas completas.

## DEF-01 - No se rechazan rangos numéricos inválidos

- **Requisitos:** RF-04.
- **Severidad:** Alta; genera resultados económicamente imposibles o acepta cantidades sin sentido.
- **Casos:** TC-13, TC-14, TC-15, TC-16 y TC-17.
- **Pasos de reproducción:** ejecutar `node scripts/diagnostico.cjs inicial`; localizar TC-13 a TC-17. Ejemplo directo: `calcularTotal(-0.01, 1, 0)`.
- **Esperado:** lanzar `RangeError` para precio negativo, cantidad menor o igual a cero y descuento fuera de 0..100.
- **Real inicial:** devuelve `-0.01` para un precio negativo; devuelve `0` para cantidad cero; para descuento 100.01 devuelve un importe negativo.
- **Evidencia:** `evidencias/pruebas-iniciales.txt`, líneas identificadas con `FAIL TC-13` a `FAIL TC-17`.
- **Corrección:** verificar explícitamente los rangos antes del cálculo.
- **Estado:** corregido y verificado con Jest en Windows (24/24 casos finales aprobados).

## DEF-02 - Conversión implícita y datos no finitos no controlados

- **Requisitos:** RF-05.
- **Severidad:** Alta; permite datos de tipos incorrectos y resultados `NaN` o infinito.
- **Casos:** TC-18 a TC-24.
- **Pasos de reproducción:** ejecutar `node scripts/diagnostico.cjs inicial`; ejemplo `calcularTotal('10', 1, 0)`.
- **Esperado:** `TypeError` para texto, null, undefined, NaN, infinitos y booleanos.
- **Real inicial:** devuelve `10` al recibir texto numérico; valores nulos o infinitos originan `0`, `NaN` o `Infinity`.
- **Evidencia:** `evidencias/pruebas-iniciales.txt`, líneas `FAIL TC-18` a `FAIL TC-24`.
- **Corrección:** validar `typeof valor === 'number'` y `Number.isFinite(valor)` para los tres argumentos, antes de las restricciones de rango.
- **Estado:** corregido y verificado con Jest en Windows (24/24 casos finales aprobados).

## DEF-03 - El total no se redondea a centavos

- **Requisitos:** RF-02 y RF-03.
- **Severidad:** Media/alta; discrepancias entre el importe calculado y el monetario mostrado o cobrado.
- **Casos:** TC-07 a TC-11.
- **Pasos de reproducción:** ejecutar `node scripts/diagnostico.cjs inicial`; ejemplo `calcularTotal(0.1, 3, 0)`.
- **Esperado:** resultado `0.3` y otros importes a centavos exactos.
- **Real inicial:** `0.30000000000000004`, o `12.345` donde se esperaba `12.35`.
- **Evidencia:** `evidencias/pruebas-iniciales.txt`, líneas `FAIL TC-07` a `FAIL TC-11`.
- **Corrección:** redondear el total final a dos decimales usando `Math.round((total + Number.EPSILON) * 100) / 100`.
- **Estado:** corregido y verificado con Jest en Windows (24/24 casos finales aprobados).

## Reflexión sobre defectos

Los errores más importantes no estaban en una fórmula compleja, sino en la falta de controles alrededor de ella. Comparar la misma matriz antes y después permitió asociar los síntomas a causas, sin modificar los casos para hacer que las pruebas aprobaran.
