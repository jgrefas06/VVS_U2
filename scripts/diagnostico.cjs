// Verificador alternativo local con assert; NO sustituye la ejecución exigida con Jest.
const assert = require('node:assert/strict');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const { calcularTotal } = require(path.join(__dirname, '..', process.argv[2] === 'inicial' ? 'evidencias/compras-inicial.js' : 'src/compras.js'));
const casos = require('../tests/casos');
const etapa = process.argv[2] === 'inicial' ? 'inicial' : 'final';
let ok = 0; let fallos = 0;
const lineas = [
  'VALIDACIÓN LOCAL CON NODE ASSERT (NO ES JEST)',
  `Etapa: ${etapa}`,
  `Fecha: ${new Date().toISOString()}`,
  `Node: ${process.version} | SO: ${process.platform} ${os.release()} | Arquitectura: ${process.arch}`,
  `Casos evaluados: ${casos.length}`,
  '---'
];
for (const caso of casos) {
  try {
    const ejecutar = () => calcularTotal(...caso.entradas);
    if (caso.esperado === 'RangeError' || caso.esperado === 'TypeError') {
      assert.throws(ejecutar, {name: caso.esperado});
    } else {
      const resultado = ejecutar();
      assert.equal(typeof resultado, 'number');
      assert.strictEqual(resultado, caso.esperado);
    }
    ok++;
    lineas.push(`PASS ${caso.id} [${caso.requisito}] ${caso.descripcion}`);
  } catch (error) {
    fallos++;
    let obtenido;
    try { obtenido = calcularTotal(...caso.entradas); } catch(e) { obtenido = `${e.name}: ${e.message}`; }
    lineas.push(`FAIL ${caso.id} [${caso.requisito}] ${caso.descripcion} | esperado=${caso.esperado} | real=${String(obtenido)}`);
  }
}
lineas.push('---', `Resumen local: ${ok} correctos, ${fallos} fallidos, ${casos.length} totales.`);
lineas.push('Este diagnóstico utiliza node:assert. Las evidencias de Jest se generan con npm.cmd run evidencias.');
const salida = path.join(__dirname, '..', 'evidencias', `diagnostico-${etapa}-node.txt`);
fs.writeFileSync(salida, lineas.join('\n')+'\n', 'utf8');
process.stdout.write(lineas.join('\n')+'\n');
// En la etapa inicial las fallas son esperadas y se registran sin tratar de ocultarlas.
if (etapa === 'final' && fallos) process.exitCode = 1;
