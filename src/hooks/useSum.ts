import { useMemo } from 'react'
import { TransactionProperties, Transactions } from './useTransactions'

export const useSum = (
  transactions: Transactions,
  property: TransactionProperties
) => {
  return useMemo(
    () => transactions.reduce((total, trx) => trx[property] + total, 0),
    [transactions, property]
  )
}
