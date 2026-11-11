function calcularTotal(precio, cantidad, descuento) {
  const valores = [precio, cantidad, descuento];

  if (valores.some(valor => typeof valor !== 'number' || !Number.isFinite(valor))) {
    throw new TypeError('Precio, cantidad y descuento deben ser números finitos');
  }

  if (precio < 0 || cantidad <= 0 || descuento < 0 || descuento > 100) {
    throw new RangeError('Precio, cantidad o descuento fuera del rango permitido');
  }

  const subtotal = precio * cantidad;
  const valorDescuento = subtotal * descuento / 100;
  const total = subtotal - valorDescuento;
  return Math.round((total + Number.EPSILON) * 100) / 100;
}

module.exports = { calcularTotal };
