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

export const useTransactions = (addresses: string[]): Transactions => {
  const prices = usePrices()
  const [transactions, setTransactions] = useState<Transactions | null>(null)
  useEffect(() => {
    fetchTransactions(addresses).then((transactions) =>
      setTransactions(transactions)
    )
  }, [])

  if (!transactions) {
    return []
  }

  return addPriceToTransactions(transactions, prices).sort((a, b) =>
    a.time.localeCompare(b.time)
  )
}

const fetchTransactions = async (
  addresses: string[]
): Promise<Transactions> => {
  const transactionsPerAddress = await Promise.all(
    addresses.map((addresses) =>
      fetch(getTransactionsUrl(addresses))
        .then((response) => response.json())
        .then((json) => {
          return json.data.flatMap((month: any) => month.transactions)
        })
    )
  )
  return transactionsPerAddress.flat()
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
      time: format(date, 'yyyy-MM-dd HH:mm'),
      amount_pokt: transaction.pokt_per_relay * transaction.num_relays,
      amount_chf: transaction.pokt_per_relay * transaction.num_relays * price,
      price_pokt_per_chf: price,
    }
  })
}
