const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const { calcularTotal } = require('../src/compras');
const iteraciones = 100000;
const rondas = 5;
for (let i=0;i<10000;i++) calcularTotal(19.99, 3, 15);
const medidas = [];
let comprobacion = 0;
for (let r=0; r<rondas; r++) {
  const inicio=process.hrtime.bigint();
  for (let j=0;j<iteraciones;j++) comprobacion += calcularTotal(19.99, 3, 15);
  const fin=process.hrtime.bigint();
  medidas.push(Number(fin-inicio)/1e6);
}
const ordenadas=[...medidas].sort((a,b)=>a-b);
const lineas=[
  'MEDICIÓN EXPLORATORIA (NO PRUEBA DE CARGA)',
  `Fecha: ${new Date().toISOString()}`,
  `Node: ${process.version}; SO: ${process.platform} ${os.release()}; arquitectura: ${process.arch}`,
  `CPU: ${os.cpus()[0]?.model || 'no disponible'}; RAM total: ${(os.totalmem()/1024**3).toFixed(2)} GiB`,
  `Caso repetido: calcularTotal(19.99, 3, 15)`,
  `Calentamiento: 10000; iteraciones por ronda: ${iteraciones}; rondas: ${rondas}`,
  ...medidas.map((ms,i)=>`Ronda ${i+1}: ${ms.toFixed(3)} ms (${(ms*1000/iteraciones).toFixed(4)} microsegundos/llamada)`),
  `Mediana: ${ordenadas[2].toFixed(3)} ms por ${iteraciones} llamadas`,
  `Valor de control acumulado (evita trabajo sin usar): ${comprobacion.toFixed(2)}`,
  'Limitaciones: una función aislada, un solo proceso, carga sintética, efectos de optimización de JIT, GC y del sistema operativo; no se concluye rendimiento de una tienda real.',
];
const salida=path.join(__dirname,'..','evidencias','rendimiento.txt');
fs.writeFileSync(salida,lineas.join('\n')+'\n','utf8');
console.log(lineas.join('\n'));
