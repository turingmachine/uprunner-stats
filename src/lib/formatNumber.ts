export const formatNumber = (number: number, precision: number = 0) => {
  return new Intl.NumberFormat('de-CH', {
    maximumFractionDigits: precision,
  }).format(number)
}
