import type { NextPage } from 'next'
import { TransactionsTable } from '../components/TransactionsTable'
import { useTransactions } from '../hooks/useTransactions'
import { Text } from '@nextui-org/react'

const Reports: NextPage = () => {
  const transactions = useTransactions(
    '700af42a002af6f957d8025e9b80820589d84d36'
  )
  const totalPOKT = transactions.reduce(
    (total, trx) => trx.amount_pokt + total,
    0
  )
  const totalCHF = transactions.reduce(
    (total, trx) => trx.amount_chf ?? 0 + total,
    0
  )
  console.log(transactions.map((x) => x.amount_chf))
  return (
    <>
      <Text>Total: POKT {totalPOKT}</Text>
      <Text>Total: CHF {totalCHF}</Text>
      <TransactionsTable transactions={transactions} />
    </>
  )
}

export default Reports
