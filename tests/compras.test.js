const { calcularTotal } = require('../src/compras');
const casos = require('./casos');

describe('Unidad 2 - cálculo de compras - requisitos RF-01 a RF-05', () => {
  test.each(casos)('$id | $requisito | $descripcion', caso => {
    const ejecutar = () => calcularTotal(...caso.entradas);
    if (caso.esperado === 'RangeError') {
      expect(ejecutar).toThrow(RangeError);
    } else if (caso.esperado === 'TypeError') {
      expect(ejecutar).toThrow(TypeError);
    } else {
      const resultado = ejecutar();
      expect(typeof resultado).toBe('number');
      expect(resultado).toBe(caso.esperado);
    }
  });
});
