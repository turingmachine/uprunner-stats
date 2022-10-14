export const formatNumber = (number: number) => {
  return new Intl.NumberFormat('de-CH', { maximumFractionDigits: 0 }).format(
    number
  )
}
