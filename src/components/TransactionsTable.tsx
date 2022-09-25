import { Table } from '@nextui-org/react'
import { Transactions } from '../hooks/useTransactions'

type TransactionsTableProps = {
  transactions: Transactions
}

export const TransactionsTable = ({ transactions }: TransactionsTableProps) => {
  return (
    <Table aria-label="Table of Transactions">
      <Table.Header>
        <Table.Column>Date</Table.Column>
        <Table.Column>Chain</Table.Column>
        <Table.Column>Relays</Table.Column>
        <Table.Column>Amount POKT</Table.Column>
        <Table.Column>Amount CHF</Table.Column>
        <Table.Column>POKT per Relay</Table.Column>
        <Table.Column>POKT Price in CHF</Table.Column>
      </Table.Header>
      <Table.Body>
        {transactions.map((transaction: any) => {
          return (
            <Table.Row key={transaction.hash}>
              <Table.Cell>{transaction.time}</Table.Cell>
              <Table.Cell>{transaction.chain.name}</Table.Cell>
              <Table.Cell>{transaction.num_relays}</Table.Cell>
              <Table.Cell>{transaction.amount_pokt.toFixed(2)}</Table.Cell>
              <Table.Cell>{transaction.amount_chf.toFixed(2)}</Table.Cell>
              <Table.Cell>{transaction.pokt_per_relay.toFixed(8)}</Table.Cell>
              <Table.Cell>
                {transaction.price_pokt_per_chf.toFixed(2)}
              </Table.Cell>
            </Table.Row>
          )
        })}
      </Table.Body>
    </Table>
  )
}
