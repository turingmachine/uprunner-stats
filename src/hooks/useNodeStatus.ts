import { Address } from 'cluster'
import { useState, useEffect } from 'react'
import useSWR from 'swr'
import { fetcher } from '../lib/fetcher'
import transactions from '../pages/transactions'
import { Transactions } from './useTransactions'

type NodeStatus = {
  address: string
  chains: string[]
  jailed: boolean
  output_address: string
  public_key: string
  service_url: string
  status: number
  tokens: string
  unstaking_time: string
}

export const useNodeStatus = (addresses: string[]): NodeStatus[] => {
  const [nodeStatus, setNodeStatus] = useState<NodeStatus[] | null>(null)
  useEffect(() => {
    fetchNodeStatus(addresses).then((transactions) =>
      setNodeStatus(transactions)
    )
  }, [addresses])

  if (!nodeStatus) {
    return []
  }

  return nodeStatus
}

const fetchNodeStatus = async (addresses: string[]): Promise<NodeStatus[]> => {
  return Promise.all(
    addresses.map(async (address) => {
      const nodeStatus: NodeStatus = await fetcher(
        'https://mainnet.gateway.pokt.network/v1/lb/ca91e3dbb9ada6b437d3d431/v1/query/node',
        {
          method: 'POST',
          body: {
            address,
          },
        }
      )
      return nodeStatus
    })
  )
}
