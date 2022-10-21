import type { NextPage } from 'next'
import { Text, Card, Grid } from '@nextui-org/react'
import { ChartCard } from '../components/ChartCard'
import Head from 'next/head'
import { useSum } from '../hooks/useSum'
import { useChartData } from '../hooks/useChartData'
import { formatNumber } from '../lib/formatNumber'
import { Transactions } from '../hooks/useTransactions'
import { useLivePrice } from '../hooks/useCurrentPrice'

const DashboardPage: NextPage<{ transactions: Transactions }> = ({
  transactions,
}) => {
  return (
    <>
      <Head>
        <title>Dashboard - UpRunner Stats</title>
      </Head>
      <Grid.Container gap={2} justify="space-between">
        <Grid xs={3}>
          <Card css={{ padding: '$7 ' }}>
            <Text h5>Total Relays</Text>
            <Text h3>{formatNumber(useSum(transactions, 'num_relays'))}</Text>
          </Card>
        </Grid>
        <Grid xs={3}>
          <Card css={{ padding: '$7 ' }}>
            <Text h5>Total Revenue</Text>
            <Text h3>
              {formatNumber(useSum(transactions, 'amount_pokt'))} POKT
            </Text>
            <Text h4>
              {formatNumber(useSum(transactions, 'amount_chf'))} CHF
            </Text>
          </Card>
        </Grid>
        <Grid xs={3}>
          <Card css={{ padding: '$7 ' }}>
            <Text h5>Total Stake</Text>
            <Text h3>{"75'000 POKT"}</Text>
            <Text h4>{"75'000 USD"}</Text>
          </Card>
        </Grid>
        <Grid xs={3}>
          <Card css={{ padding: '$7 ' }}>
            <Text h5>POKT Price</Text>
            <Text h3>{useLivePrice()} USD</Text>
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
