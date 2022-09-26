import type { NextPage } from 'next'
import { Text, Spacer, Card, Grid } from '@nextui-org/react'
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
  const totalRelays = transactions.reduce(
    (total, trx) => trx.num_relays + total,
    0
  )
  const totalPOKT = transactions
    .reduce((total, trx) => trx.amount_pokt + total, 0)
    .toFixed(2)
  const totalCHF = transactions
    .reduce((total, trx) => trx.amount_chf + total, 0)
    .toFixed(2)
  return (
    <>
      <Head>
        <title>Dashboard - UpRunner Stats</title>
      </Head>
      <Grid.Container gap={2} justify="space-between">
        <Grid xs={12} css={{ flexDirection: 'column' }}>
          <Text h2 css={{ marginBottom: 0 }}>
            Welcome back, UpRunner
          </Text>
          <Text size="$xl">Our current relays and revenue summary</Text>
        </Grid>
        <Grid xs={4}>
          <Card css={{ padding: '$7 ' }}>
            <Text h5>Total Relays</Text>
            <Text h3>{totalRelays}</Text>
          </Card>
        </Grid>
        <Grid xs={4}>
          <Card css={{ padding: '$7 ' }}>
            <Text h5>Total Revenue POKT</Text>
            <Text h3>{totalPOKT}</Text>
          </Card>
        </Grid>
        <Grid xs={4}>
          <Card css={{ padding: '$7 ' }}>
            <Text h5>Total Revenue CHF</Text>
            <Text h3>{totalCHF}</Text>
          </Card>
        </Grid>
        <Grid xs={12}>
          <ChartCard
            title="Relays"
            data={prepareTransactionChartData(transactions, 'num_relays')}
          />
        </Grid>
        <Grid xs={12}>
          <ChartCard
            title="Revenue POKT"
            data={prepareTransactionChartData(transactions, 'amount_pokt')}
          />
        </Grid>
        <Grid xs={12}>
          <ChartCard
            title="Revenue CHF"
            data={prepareTransactionChartData(transactions, 'amount_chf')}
          />
        </Grid>
      </Grid.Container>
    </>
  )
}

export default Dashboard
