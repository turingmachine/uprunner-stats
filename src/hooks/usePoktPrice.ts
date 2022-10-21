import useSWR from 'swr'

export const usePoktPrice = (): number => {
  const { data } = useSWR(
    'https://api.coingecko.com/api/v3/simple/price?ids=pocket-network&vs_currencies=chf&precision=3'
  )
  const poktPrice = data?.['pocket-network'].chf ?? 0
  return parseFloat(poktPrice)
}
