import useSWR from 'swr'

export const useLivePrice = () => {
  const { data: price } = useSWR(
    'https://api.coingecko.com/api/v3/simple/price?ids=pocket-network&vs_currencies=chf&precision=3'
  )
  return price?.['pocket-network'].chf
}
