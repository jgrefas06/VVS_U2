# Pruebas dinámicas de un módulo de compras

En esta actividad trabajé con una función en JavaScript que calcula el total de una compra a partir del precio, la cantidad y el descuento. El objetivo fue encontrar errores en el código inicial, corregirlos y comprobar los cambios mediante pruebas con Jest.

Primero revisé los requisitos y preparé 24 casos de prueba. Incluí compras normales, descuentos de 0 y 100 %, valores decimales y datos incorrectos. Después probé la versión original, registré tres defectos y corregí el cálculo. Finalmente repetí todos los casos para verificar que funcionaran correctamente.

## Cómo lo ejecuto

Abro esta carpeta en Visual Studio Code y ejecuto los comandos en la terminal de PowerShell:

```powershell
npm.cmd install
npm.cmd test
```

Para guardar las pruebas de la versión original y la corregida, y revisar el rendimiento, utilizo:

```powershell
npm.cmd run evidencias
npm.cmd run rendimiento
```

La versión original debe mostrar pruebas fallidas, porque contiene los defectos que había que identificar. En la versión corregida deben pasar los 24 casos.

## Archivos del proyecto

- `src/compras.js`: código corregido del cálculo de compras.
- `tests/`: casos y pruebas automatizadas con Jest.
- `docs/plan-pruebas.md`: cómo organicé la actividad.
- `docs/matriz-casos.md`: los casos de prueba y sus resultados esperados.
- `docs/defectos.md`: los errores que encontré y sus correcciones.
- `docs/reporte-pruebas.md`: resumen de los resultados y sus limitaciones.
- `evidencias/`: copia del código inicial y resultados de las ejecuciones.
- `scripts/`: comandos que utilicé para las evidencias y el rendimiento.

## Resultados

En la primera versión, 7 casos pasaron y 17 fallaron. Después de corregir las validaciones y el redondeo, las 24 pruebas pasaron con Jest. También ejecuté una medición sencilla del rendimiento, que no representa el funcionamiento de una tienda completa.

Esta práctica me ayudó a comprender por qué no basta con probar una compra normal. Los datos inválidos y los valores límite pueden revelar errores que no se ven a simple vista. Además, guardar las pruebas antes y después permite mostrar qué corregí y comprobar que el código sigue funcionando.
