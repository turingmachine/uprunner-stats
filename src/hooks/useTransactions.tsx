import { useState, useEffect } from 'react'
import { format, parseISO } from 'date-fns'
import { usePrices, Prices } from './usePrices'

type ReponseData = {
  data: { month: { transactions: [] } }[]
}
export type Transactions = {
  hash: string
  time: string
  chain: { name: string }
  num_relays: number
  pokt_per_relay: number
  amount_pokt: number
  amount_chf: number
}[]

export const useTransactions = (address: string): Transactions => {
  const prices = usePrices()
  const [responseData, setResponseData] = useState<ReponseData | null>(null)
  useEffect(() => {
    fetch(getTransactionsUrl(address))
      .then((resp) => resp.json())
      .then((data) => setResponseData(data))
  }, [address])

  if (!responseData) {
    return []
  }

  const transactions: Transactions = responseData.data
    .slice()
    .reverse()
    .flatMap((month: any) => month.transactions)

  return addPriceToTransactions(transactions, prices)
}

const getTransactionsUrl = (address: string) => {
  return `https://api.pokt.tools/node/${address}/rewards`
}

const addPriceToTransactions = (
  transactions: Transactions,
  prices: Prices
): Transactions => {
  return transactions.map((transaction) => {
    const date = parseISO(transaction.time)
    const price = prices[format(date, 'dd-MM-yyyy')] ?? 0
    return {
      ...transaction,
      time: format(date, 'dd-MM-yyy HH:mm'),
      amount_pokt: transaction.pokt_per_relay * transaction.num_relays,
      amount_chf: transaction.pokt_per_relay * transaction.num_relays * price,
      price_pokt_per_chf: price,
    }
  })
}
