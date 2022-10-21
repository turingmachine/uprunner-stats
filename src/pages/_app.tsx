import type { AppProps } from 'next/app'
import { NextUIProvider } from '@nextui-org/react'
import { Layout } from '../components/Layout'
import { useTransactions } from '../hooks/useTransactions'
import { useAdresses } from '../hooks/useAdresses'
import { SWRConfig } from 'swr'
import { fetcher } from '../lib/fetcher'

const UpRunnerStats = ({ Component, pageProps }: AppProps) => {
  const { addresses } = useAdresses()
  const transactions = useTransactions(addresses)
  return (
    <SWRConfig value={{ fetcher }}>
      <NextUIProvider>
        <Layout>
          <Component
            {...pageProps}
            transactions={transactions}
            addresses={addresses}
          />
        </Layout>
      </NextUIProvider>
    </SWRConfig>
  )
}

export default UpRunnerStats
