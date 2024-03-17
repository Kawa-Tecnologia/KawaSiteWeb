import React, { useState, useEffect } from 'react'
import axios from 'axios'
import TransactionItem from '../../components/TransactionPoints' // Componente para exibir cada transação
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
const TransactionHistoryPage = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const token = localStorage.getItem('token')
        const userId = localStorage.getItem('userId')

        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/api/history-points/${userId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        )
        if (response.data?.history) {
          setTransactions(response.data.history)
        }

        setLoading(false)
      } catch (error) {
        console.error('Error fetching transactions:', error)
      }
    }

    fetchTransactions()
  }, [])

  if (loading) {
    return <div>Loading...</div>
  }

  return (
    <div className='transaction-history'>
      <h2>Transaction History</h2>
      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Type</th>
            <th>Points</th>
          </tr>
        </thead>
        <tbody>
          {transactions.length ? (
            transactions.map(transaction => (
              <TransactionItem key={transaction.id} transaction={transaction} />
            ))
          ) : (
            <p>Nenhuma transação disponível.</p>
          )}
        </tbody>
      </table>
    </div>
  )
}

export default TransactionHistoryPage
