import type { AppProps } from 'next/app'
import { NextUIProvider } from '@nextui-org/react'
import { Layout } from '../components/Layout'
import { useTransactions } from '../hooks/useTransactions'
import { useAdresses } from '../hooks/useAdresses'

import { parse } from 'date-fns'

const UpRunnerStats = ({ Component, pageProps }: AppProps) => {
  const { addresses } = useAdresses()
  const transactions = useTransactions(addresses)
  return (
    <NextUIProvider>
      <Layout>
        <Component {...pageProps} transactions={transactions} />
      </Layout>
    </NextUIProvider>
  )
}

export default UpRunnerStats
