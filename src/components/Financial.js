import React, { useState, useEffect } from 'react';
import '../assets/styles/Finance.css';
import UserContainer from './UserContainer';
import Menu from './Menu';

const FinancePage = () => {
  // Estados para armazenar os dados financeiros
  const [saldoDisponivel, setSaldoDisponivel] = useState(0);
  const [saldoFuturo, setSaldoFuturo] = useState(0);
  const [orders, setOrders] = useState([]);

  // Simulação de dados de orders (substitua isso com sua lógica de obtenção de dados)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const mockOrders = [
    { id: 1, aluno: 'João', valorReceber: 100, status: 'Pendente' },
    { id: 2, aluno: 'Maria', valorReceber: 150, status: 'Pago' },
    // Adicione mais orders conforme necessário
  ];

  useEffect(() => {
    // Simulando busca dos dados financeiros
    // Normalmente isso viria de uma API ou banco de dados
    setSaldoDisponivel(5000); // Exemplo de saldo disponível
    setSaldoFuturo(2000); // Exemplo de saldo futuro
    setOrders(mockOrders);
  }, [mockOrders]);

  return (
    <div className="dashboard">
      <div className="left-container">
        <UserContainer />
        <Menu />
      </div>
      <div className="finance-page">
        <h1>Financeiro</h1>
        <div className="saldo-section">
          <h2>Saldo Disponível: R${saldoDisponivel}</h2>
          <h2>Saldo Futuro: R${saldoFuturo}</h2>
        </div>
        <div className="orders-section">
          <h2>Orders Detalhadas</h2>
          <table>
            <thead>
              <tr>
                <th>Aluno</th>
                <th>Valor a Receber</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {orders.map(order => (
                <tr key={order.id}>
                  <td>{order.aluno}</td>
                  <td>R${order.valorReceber}</td>
                  <td>{order.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default FinancePage;