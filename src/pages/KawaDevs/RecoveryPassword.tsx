import React, { useState, ChangeEvent, FormEvent } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import '../../assets/styles/Recovery.css';

const ResetPasswordPage = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { email } = useParams();

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setConfirmPassword(e.target.value);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError('As senhas não coincidem');
      return;
    }

    try {
      const token = localStorage.getItem('tokenRecovery');
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/api/user/recovery-password/${email}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ password, email }),
        }
      );

      if (response.ok) {
        navigate('/devs/login');
      } else {
        setError('Erro ao redefinir a senha');
      }
    } catch (error) {
      console.log(error);
      setError('Erro ao se conectar ao servidor');
    }
  };

  return (
    <div className='recovery-container'>
      <div className='recovery-content'>
        <h1>Redefinir Senha</h1>
        <form onSubmit={handleSubmit}>
          <div className='recovery-items'>
            <label htmlFor='password'>Nova Senha:</label>
            <input
              type='password'
              id='password'
              value={password}
              onChange={handlePasswordChange}
            />
          </div>
          <br/>
          <div className='recovery-items'>
            <label htmlFor='confirmPassword'>Confirmar Nova Senha:</label>
            <input
              type='password'
              id='confirmPassword'
              value={confirmPassword}
              onChange={handleConfirmPasswordChange}
            />
          </div>
          <br/>
          {error && <div className='error-message'>{error}</div>}
          <button type='submit'>Redefinir Senha</button>
        </form>
      </div>
    </div>
  );
};

export default ResetPasswordPage;