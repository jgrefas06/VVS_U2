const definiciones = require('./casos.json');

function recuperarValor(valor) {
  if (valor === '__undefined__') return undefined;
  if (valor === '__NaN__') return NaN;
  if (valor === '__Infinity__') return Infinity;
  if (valor === '__-Infinity__') return -Infinity;
  return valor;
}

module.exports = definiciones.map(caso => ({
  ...caso,
  entradas: caso.entradas.map(recuperarValor)
}));
