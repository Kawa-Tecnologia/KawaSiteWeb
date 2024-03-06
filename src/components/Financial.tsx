import React, { useState, useEffect } from 'react'
import '../assets/styles/Finance.css'
import UserContainer from './UserContainer'
import Menu from './Menu'
import axios from 'axios'
import {
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Paper,
  Button
} from '@mui/material'
import ErrorNotification from './Error'

interface Receipt {
  id: number
  status: string
  user_id: number
  project_id: number
  amount: number
  date_receive: Date
  date_pay: Date
  points: number
  rate: number
}

interface UserData {
  id: number
  fullname: string
  email: string
  points: number
  phone: number
  plan_id: number
}
const FinancePage = () => {
  const [saldoDisponivel, setSaldoDisponivel] = useState(0)
  const [saldoFuturo, setSaldoFuturo] = useState(0)
  const [receipts, setReceipts] = useState([
    {
      id: 0,
      status: '',
      user_id: 0,
      project_id: 0,
      amount: 0,
      date_receive: '',
      date_pay: '',
      points: 0,
      rate: 0
    }
  ])
  const [error, setError] = useState<string>('') // Novo estado para controlar erros
  const [success, setSuccess] = useState<string>('') // Novo estado para controlar erros

  const token = localStorage.getItem('token')
  const userId = localStorage.getItem('userId')
  const user = localStorage.getItem('user')
  const storedUser: UserData = user ? JSON.parse(user) : null

  const pointsToExchange =
    Math.ceil(saldoDisponivel + (saldoDisponivel * 10) / 100) * 100
  useEffect(() => {
    const fetchFinancial = async () => {
      try {
        const { data } = await axios.get(
          `${process.env.REACT_APP_API_URL}/api/receipts?receive_user_id=${userId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        )
        let receiptsBalance = 0
        let receiptsFuture = 0

        if (data.receipts.length) {
          receiptsBalance = data.receipts
            .filter(
              (receipt: Receipt) =>
                new Date(receipt.date_pay) <= new Date() &&
                receipt.status === 'PAID'
            )
            .reduce((acc: number, item: Receipt) => acc + item?.amount || 0, 0)
          receiptsFuture = data.receipts
            .filter(
              (receipt: Receipt) =>
                new Date(receipt.date_pay) > new Date() &&
                receipt.status === 'APPROVED'
            )
            .reduce((acc: number, item: Receipt) => acc + item?.amount || 0, 0)
          setReceipts(data.receipts)
        }

        setSaldoDisponivel(receiptsBalance)
        setSaldoFuturo(receiptsFuture)
      } catch (error) {
        if (axios.isAxiosError(error)) {
          setError(error.message)
        }
      }
    }
    fetchFinancial()
  }, []) // Atualize a lista de projetos quando o termo de busca ou a página atual mudar)

  const handleTrocarSaldoPorPontos = async () => {
    try {
      const body = {
        user_id: userId,
        date: new Date(),
        status: 'APPROVED',
        payment_id: 0,
        type: 'points_adquired'
      }
      await axios.post(`${process.env.REACT_APP_API_URL}/api/orders`, body, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      const bodyUpdated = {
        status: 'CONVERTED'
      }
      await axios.put(
        `${process.env.REACT_APP_API_URL}/api/receipts?receive_user_id=${userId}`,
        bodyUpdated,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      )

      const bodyUpdatePoints = {
        points: pointsToExchange,
        type: 'CREDIT'
      }

      await axios.put(
        `${process.env.REACT_APP_API_URL}/api/user/${userId}`,
        bodyUpdatePoints,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      )
      setSuccess('Saldo trocado por pontos')
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setError(error.message)
      }
    }
  }

  const handleExportExcel = async () => {
    try {
      const body = {
        receive_user_id: userId,
        userName: storedUser.fullname,
        userEmail: storedUser.email
      }
      await axios.post(
        `${process.env.REACT_APP_API_URL}/api/receipts/export-excel`,
        body,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      )
      setSuccess('Aguarde que em breve receberá seu arquivo por email')
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setError(error.message)
      }
    }
  }

  return (
    <div className='dashboard'>
      <div className='left-container'>
        <UserContainer />
        <Menu />
      </div>
      <div className='finance-page'>
        <h1>Financeiro</h1>
        <div className='saldo-section'>
          <div>
            <h2>Saldo Disponível: R${saldoDisponivel}</h2>
            {saldoDisponivel > 1 && (
              <Button variant='contained' onClick={handleTrocarSaldoPorPontos}>
                Trocar saldo por {pointsToExchange} pontos
              </Button>
            )}
          </div>

          <div>
            <h2>Saldo Futuro: R${saldoFuturo}</h2>
          </div>
        </div>

        <div className='orders-section'>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}
          >
            <h2>Recebimentos Detalhados</h2>
            <Button variant='contained' onClick={handleExportExcel}>
              Exportar Excel
            </Button>
          </div>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Projeto</TableCell>
                  <TableCell>Valor a Receber</TableCell>
                  <TableCell>Data a receber</TableCell>
                  <TableCell>Status</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {receipts.map(receipt => (
                  <TableRow key={receipt.id}>
                    <TableCell>{receipt.project_id}</TableCell>
                    <TableCell>R${receipt.amount}</TableCell>
                    <TableCell>{receipt.date_pay}</TableCell>
                    <TableCell>{receipt.status}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </div>
      {error && <ErrorNotification message={error} severity='error' />}
      {success && <ErrorNotification message={success} severity='success' />}
    </div>
  )
}

export default FinancePage
