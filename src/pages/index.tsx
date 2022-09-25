import type { NextPage } from 'next'
import { Text, Spacer } from '@nextui-org/react'
import { ChartCard } from '../components/ChartCard'
import {
  prepareTransactionChartData,
  useTransactions,
} from '../hooks/useTransactions'
import Head from 'next/head'

const Dashboard: NextPage = () => {
  const transactions = useTransactions([
    '700af42a002af6f957d8025e9b80820589d84d36',
    'a907bf088f63f94d5419f059ee078c33f983b8f7',
    'bd5bee756231f202987ea85fb0a314294bed45be',
    '95f5f52580984ef652b530675ae3e66100a272e6',
  ])
  return (
    <>
      <Head>
        <title>Dashboard - UpRunner Stats</title>
      </Head>
      <Text h2 css={{ marginBottom: 0 }}>
        Welcome back, UpRunner
      </Text>
      <Text size="$xl">Our current relays and revenue summary</Text>
      <Spacer y={1} />
      <ChartCard
        title="Revenue"
        data={prepareTransactionChartData(transactions, 'amount_chf')}
      />
      <Spacer y={1} />
      <ChartCard
        title="Relays"
        data={prepareTransactionChartData(transactions, 'num_relays')}
      />
    </>
  )
}

export default Dashboard
