import { useMemo } from 'react'
import { Transactions, TransactionProperties } from './useTransactions'

export const useChartData = (
  transactions: Transactions,
  property: TransactionProperties
) => {
  return useMemo(
    () =>
      transactions.map((transaction) => {
        return {
          x: transaction.time,
          y: transaction[property],
        }
      }),
    [transactions, property]
  )
}
