import type { NextPage } from 'next'
import { TransactionsTable } from '../components/TransactionsTable'
import { Transactions } from '../hooks/useTransactions'
import Head from 'next/head'

const TransactionsPage: NextPage<{ transactions: Transactions }> = ({
  transactions,
}) => {
  return (
    <>
      <Head>
        <title>Transactions - UpRunner Stats</title>
      </Head>
      <TransactionsTable transactions={transactions} />
    </>
  )
}

export default TransactionsPage
