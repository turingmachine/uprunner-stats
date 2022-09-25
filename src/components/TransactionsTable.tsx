import { Table } from '@nextui-org/react'
import { Transactions } from '../hooks/useTransactions'

type TransactionsTableProps = {
  transactions: Transactions
}

export const TransactionsTable = ({ transactions }: TransactionsTableProps) => {
  return (
    <Table
      css={{
        height: 'auto',
        minWidth: '100%',
      }}
    >
      <Table.Header>
        <Table.Column>Date</Table.Column>
        <Table.Column>Chain</Table.Column>
        <Table.Column>Relays</Table.Column>
        <Table.Column>POKT</Table.Column>
        <Table.Column>CHF</Table.Column>
      </Table.Header>
      <Table.Body>
        {transactions.map((transaction: any) => {
          return (
            <Table.Row key={transaction.hash}>
              <Table.Cell>{transaction.time}</Table.Cell>
              <Table.Cell>{transaction.chain.name}</Table.Cell>
              <Table.Cell>{transaction.num_relays}</Table.Cell>
              <Table.Cell>{transaction.amount_pokt}</Table.Cell>
              <Table.Cell>{transaction.amount_chf}</Table.Cell>
            </Table.Row>
          )
        })}
      </Table.Body>
    </Table>
  )
}
