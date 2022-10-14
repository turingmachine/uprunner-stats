import type { NextPage } from 'next'
import { Text, Card, Grid } from '@nextui-org/react'
import { ChartCard } from '../components/ChartCard'
import Head from 'next/head'
import { useSum } from '../hooks/useSum'
import { useChartData } from '../hooks/useChartData'
import { formatNumber } from '../lib/formatNumber'
import { Transactions } from '../hooks/useTransactions'

const DashboardPage: NextPage<{ transactions: Transactions }> = ({
  transactions,
}) => {
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
            <Text h3>{formatNumber(useSum(transactions, 'num_relays'))}</Text>
          </Card>
        </Grid>
        <Grid xs={4}>
          <Card css={{ padding: '$7 ' }}>
            <Text h5>Total Revenue POKT</Text>
            <Text h3>{formatNumber(useSum(transactions, 'amount_pokt'))}</Text>
          </Card>
        </Grid>
        <Grid xs={4}>
          <Card css={{ padding: '$7 ' }}>
            <Text h5>Total Revenue CHF</Text>
            <Text h3>{formatNumber(useSum(transactions, 'amount_chf'))}</Text>
          </Card>
        </Grid>
        <Grid xs={12}>
          <ChartCard
            title="Relays"
            data={useChartData(transactions, 'num_relays')}
          />
        </Grid>
        <Grid xs={12}>
          <ChartCard
            title="Revenue POKT"
            data={useChartData(transactions, 'amount_pokt')}
          />
        </Grid>
        <Grid xs={12}>
          <ChartCard
            title="Revenue CHF"
            data={useChartData(transactions, 'amount_chf')}
          />
        </Grid>
      </Grid.Container>
    </>
  )
}

export default DashboardPage
