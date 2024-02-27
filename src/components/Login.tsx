import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import '../assets/styles/Login.css'
import NavigationDev from './NavigationDevs'
import axios from 'axios';

interface UserData {
  name: string
  email: string
  points: number
}

interface LoginProps {
  onLogin: (userData: UserData) => Promise<void>
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [loginForm, setLoginForm] = useState<boolean>(true)
  const [email, setEmail] = useState<string>('')
  const [username, setUsername] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [isLoading, setLoading] = useState<boolean>(false)
  const navigate = useNavigate()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    const body = {
      username: username,
      password: password
    }

    try {
      const response = await axios.post('http://localhost:3001/api/login', body);
      const { token } = response.data;
      const { fullname, email, points, id} = response.data.user;

      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(response.data.user));

      localStorage.setItem('userId', id);
      localStorage.setItem('userEmail', email);
      localStorage.setItem('userName', fullname);
      localStorage.setItem('userPoints', points);

      const userData: UserData = {
        name: fullname,
        email: email,
        points: points,
      }
      onLogin(userData)

      setLoading(false)
      navigate('/devs/dashboard')
    } catch (error) {
      setLoading(false)
      console.error('Error:', error)
    }
  }

  const handleRecoverPassword = (e: React.FormEvent) => {
    e.preventDefault()
    alert(`Recuperar senha para o e-mail: ${email}`)
  }

  const showRecoveryForm = () => {
    setLoginForm(false)
  }

  const showLoginForm = () => {
    setLoginForm(true)
  }

  return (
    <div>
      <header>
        <div className="logo-container">
          <img src={require('../assets/images/kawa.jpg')} alt="Kawa Devs" />
        </div>
        <NavigationDev currentPage={'login'} />
      </header>
      <div className="login">
        <div className="login-container">
          <h1>Kawa Devs</h1>
          <form
            className="form"
            onSubmit={loginForm ? handleLogin : handleRecoverPassword}
          >
            <h2>{loginForm ? 'Login' : 'Recuperação de Senha'}</h2>
            {loginForm ? (
              <>
                <label htmlFor="username">Usuário:</label>
                <input
                  type="text"
                  id="username"
                  name="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
                <br />
                <label htmlFor="password">Senha:</label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </>
            ) : (
              <>
                <label htmlFor="email">E-mail:</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </>
            )}
            <button type="submit" disabled={isLoading}>
              {isLoading
                ? 'Entrando...'
                : loginForm
                  ? 'Entrar'
                  : 'Recuperar Senha'}
            </button>
            {loginForm ? (
              <p>
                <button type="button" onClick={showRecoveryForm}>
                  Esqueci minha senha
                </button>
              </p>
            ) : (
              <p>
                <button type="button" onClick={showLoginForm}>
                  Voltar para o login
                </button>
              </p>
            )}
          </form>
        </div>
      </div>
    </div>
  )
}

export default Login
