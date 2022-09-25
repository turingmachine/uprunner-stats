import type { NextPage } from 'next'
import { Text, Spacer } from '@nextui-org/react'
import { ChartCard } from '../components/ChartCard'
import { useTransactions } from '../hooks/useTransactions'
import Head from 'next/head'

const Dashboard: NextPage = () => {
  const transactions = useTransactions(
    '700af42a002af6f957d8025e9b80820589d84d36'
  )
  return (
    <>
      <Head>
        <title>Dashboard UpRunnerStats</title>
      </Head>
      <Text h2 css={{ marginBottom: 0 }}>
        Welcome back, UpRunner
      </Text>
      <Text size="$xl">Our current reward and node growth summary</Text>
      <Spacer y={1} />
      <ChartCard
        title="Revenue"
        labels={transactions.map((trx) => trx.time)}
        data={transactions.map((trx) => trx.amount_chf)}
      />
    </>
  )
}

export default Dashboard
