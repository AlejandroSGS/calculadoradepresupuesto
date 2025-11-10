/**
 * Formatea un número como moneda en formato USD
 * @param amount - Cantidad a formatear
 * @returns String formateado como moneda (ej: $1,234.56)
 */
export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
};

