import type { NextPage } from 'next'
import { Text, Card, Grid } from '@nextui-org/react'
import { ChartCard } from '../components/ChartCard'
import Head from 'next/head'
import { useSum } from '../hooks/useSum'
import { useChartData } from '../hooks/useChartData'
import { formatNumber } from '../lib/formatNumber'
import { Transactions } from '../hooks/useTransactions'
import { useNodeStatus } from '../hooks/useNodeStatus'
import { usePoktPrice } from '../hooks/usePoktPrice'

const DashboardPage: NextPage<{
  transactions: Transactions
  addresses: string[]
}> = ({ transactions, addresses }) => {
  const poktPrice = usePoktPrice()
  const nodeStatus = useNodeStatus(addresses)
  const totalStake =
    nodeStatus.reduce(
      (totalStake, nodeStatus) => totalStake + parseInt(nodeStatus.tokens),
      0
    ) / 1000000
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
            <Text h3>{formatNumber(totalStake)} POKT</Text>
            <Text h4>{formatNumber(totalStake * poktPrice)} CHF</Text>
          </Card>
        </Grid>
        <Grid xs={3}>
          <Card css={{ padding: '$7 ' }}>
            <Text h5>POKT Price</Text>
            <Text h3>{formatNumber(poktPrice, 4)} CHF</Text>
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
