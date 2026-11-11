const fs = require('node:fs');
const path = require('node:path');
const os = require('node:os');
const {spawnSync} = require('node:child_process');
const base = path.join(__dirname, '..');
let jest;
try { jest = require.resolve('jest/bin/jest'); }
catch {
  console.error('Jest no está instalado. Ejecute npm install y vuelva a usar npm run evidencias.');
  process.exit(1);
}
let todoCorrecto = true;
for (const etapa of ['inicial', 'final']) {
  const argumentos = [jest, '--runInBand'];
  if (etapa === 'inicial') argumentos.push('--config', 'jest.inicial.config.cjs');
  const resultado = spawnSync(process.execPath, argumentos, {cwd:base, encoding:'utf8', env:{...process.env, FORCE_COLOR:'0'}});
  const encabezado = [
    'EJECUCIÓN REAL CON JEST',
    `Etapa: ${etapa}`,
    `Fecha: ${new Date().toISOString()}`,
    `Node: ${process.version} | SO: ${process.platform} ${os.release()} | Arquitectura: ${process.arch}`,
    `Comando: node ${argumentos.slice(1).join(' ')}`,
    `Código de salida: ${resultado.status}`,
    '---'
  ].join('\n');
  const salida = encabezado+'\n'+(resultado.stdout||'')+'\n'+(resultado.stderr||'')+'\n';
  fs.writeFileSync(path.join(base,'evidencias',`pruebas-${etapa === 'inicial' ? 'iniciales' : 'finales'}.txt`),salida,'utf8');
  console.log(`${etapa}: Jest terminó con código ${resultado.status}. Evidencia guardada.`);
  if ((etapa === 'final' && resultado.status !== 0) || (etapa === 'inicial' && resultado.status === 0)) todoCorrecto = false;
}
if (!todoCorrecto) { console.error('Revisar evidencia: resultados inesperados.'); process.exitCode=1; }
