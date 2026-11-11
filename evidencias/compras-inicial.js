function calcularTotal(precio, cantidad, descuento) {
  const subtotal = precio * cantidad;
  const valorDescuento = subtotal * descuento / 100;
  return subtotal - valorDescuento;
}

module.exports = { calcularTotal };
