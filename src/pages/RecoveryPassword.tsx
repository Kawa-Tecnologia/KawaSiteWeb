import React, { useState } from 'react';
import {  useNavigate, useParams } from 'react-router-dom';

const ResetPasswordPage = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { email } = useParams();

  const handlePasswordChange = (e: { target: { value: React.SetStateAction<string>; }; }) => {
    setPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (e: { target: { value: React.SetStateAction<string>; }; }) => {
    setConfirmPassword(e.target.value);
  };

  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    
    if (password !== confirmPassword) {
      setError('As senhas não coincidem');
      return;
    }

    // Lógica para enviar a nova senha para o backend
    try {

        const token = localStorage.getItem("tokenRecovery");
        console.log(token)
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/user/recovery-password/${email}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ password, email }),
      });

      if (response.ok) {
        navigate('/devs/login');
      } else {
        setError('Erro ao redefinir a senha');
      }
    } catch (error) {
        console.log(error)
      setError('Erro ao se conectar ao servidor');
    }
  };

  return (
    <div>
      <h1>Redefinir Senha</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="password">Nova Senha:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={handlePasswordChange}
          />
        </div>
        <div>
          <label htmlFor="confirmPassword">Confirmar Nova Senha:</label>
          <input
            type="password"
            id="confirmPassword"
            value={confirmPassword}
            onChange={handleConfirmPasswordChange}
          />
        </div>
        {error && <div style={{ color: 'red' }}>{error}</div>}
        <button type="submit">Redefinir Senha</button>
      </form>
    </div>
  );
};

export default ResetPasswordPage;