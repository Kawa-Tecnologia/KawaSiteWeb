import React from 'react'

interface Transaction {
  id: number
  user_id: number
  points_acquired: number
  amount_paid: number
  status: string
  type: string
  process_id: number
  created_at: Date
}

interface TransactionItemProps {
  transaction: Transaction
}

const TransactionItem: React.FC<TransactionItemProps> = ({ transaction }) => {
  return (
    <tr>
      <td>{transaction.created_at}</td>
      <td>{transaction.type}</td>
      <td>{transaction.points_acquired}</td>
      <td>{transaction.process_id}</td>
      <td>R${transaction.amount_paid}</td>
    </tr>
  )
}

export default TransactionItem
