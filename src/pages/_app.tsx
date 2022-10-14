import type { AppProps } from 'next/app'
import { NextUIProvider } from '@nextui-org/react'
import { Layout } from '../components/Layout'
import { useTransactions } from '../hooks/useTransactions'
import { useAdresses } from '../hooks/useAdresses'

import { parse } from 'date-fns'

const UpRunnerStats = ({ Component, pageProps }: AppProps) => {
  const { addresses } = useAdresses()
  const transactions = useTransactions(addresses)
  console.log(
    parse('2022-01', 'YYYY-ww', new Date(), {
      weekStartsOn: 1,
      useAdditionalWeekYearTokens: true,
    })
  )
  return (
    <NextUIProvider>
      <Layout>
        <Component {...pageProps} transactions={transactions} />
      </Layout>
    </NextUIProvider>
  )
}

export default UpRunnerStats
