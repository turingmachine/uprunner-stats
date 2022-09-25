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

  const reversed = responseData.data.reverse()

  const transactions: Transactions = reversed.flatMap(
    (month: any) => month.transactions
  )

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
    const date = format(parseISO(transaction.time), 'dd-MM-yyyy')
    return {
      ...transaction,
      amount_pokt: transaction.pokt_per_relay * transaction.num_relays,
      amount_chf:
        transaction.pokt_per_relay * transaction.num_relays * prices[date],
    }
  })
}
