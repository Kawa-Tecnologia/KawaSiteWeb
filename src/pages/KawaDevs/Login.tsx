import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import ErrorNotification from '../../components/Error'
import '../../assets/styles/Login.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons'
import HeaderDevs from '../../components/HeaderDevs'

interface UserData {
  name: string
  email: string
  points: number
  ProfessionalInfo: {
    Tag: Tag
  }
}

interface Tag {
  tag: string
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
  const [error, setError] = useState<string>('')
  const [loginAttempts, setLoginAttempts] = useState<number>(0)
  const [showPassword, setShowPassword] = useState(false)

  const togglePasswordVisibility = () => {
    setShowPassword(prevState => !prevState)
  }
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    const body = {
      username: username,
      password: password
    }

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/login`,
        body
      )
      const { token } = response.data
      const { fullname, email, points, id, ProfessionalInfo, recommendation } =
        response.data.user
      setLoginAttempts(0)

      localStorage.setItem('token', token)
      localStorage.setItem('user', JSON.stringify(response.data.user))
      localStorage.setItem('tagName', ProfessionalInfo?.Tag?.tag)

      localStorage.setItem('userId', id)
      localStorage.setItem('userEmail', email)
      localStorage.setItem('userName', fullname)
      localStorage.setItem('userPoints', points)
      if (recommendation) {
        localStorage.setItem('recommendation', JSON.stringify(recommendation))
      }

      const userData: UserData = {
        name: fullname,
        email: email,
        points: points,
        ProfessionalInfo: {
          Tag: {
            tag: ProfessionalInfo?.Tag?.tag
          }
        }
      }
      onLogin(userData)

      setLoading(false)
      navigate('/devs/dashboard')
    } catch (error) {
      console.log(error)

      if (axios.isAxiosError(error)) {
        const errorMessage =
          error.response?.data.message ||
          error.response?.data.error ||
          error.message
        setLoginAttempts(prevAttempts => prevAttempts + 1)
        if (loginAttempts >= 2) {
          setTimeout(() => setLoginAttempts(0), 3600000)
        }

        setLoading(false)
        setError(errorMessage)
      }
    }
  }

  const handleRecoverPassword = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/user/recovery-password`,
        {
          email: email
        },
        {
          headers: {
            Authorization: `Bearer ${process.env.REACT_APP_TOKEN_DEV}`
          }
        }
      )
      alert('Email enviado')
      localStorage.setItem('tokenRecovery', data.token)
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const errorMessage =
          error.response?.data.message ||
          error.response?.data.error ||
          error.message

        setError(errorMessage)
      }
    }
  }
  const goToCadastro = () => {
    navigate('/devs/register')
  }
  const showRecoveryForm = () => {
    setLoginForm(false)
  }
  useEffect(() => {
    const timer = setTimeout(() => {
      setError('')
    }, 1000)

    return () => clearTimeout(timer)
  }, [error])
  const showLoginForm = () => {
    setLoginForm(true)
  }
  const remainingAttemptsMessage =
    loginAttempts > 0 ? `Tentativas restantes: ${3 - loginAttempts}` : ''
  return (
    <div>
      <HeaderDevs />
      <div className='login'>
        <div className='login-container' style={{ textAlign: 'center' }}>
          <h1>Kawa Devs</h1>
          <form
            className='form'
            onSubmit={loginForm ? handleLogin : handleRecoverPassword}
          >
            <h2>{loginForm ? 'Login' : 'Recuperação de Senha'}</h2>
            {loginForm ? (
              <>
                <label htmlFor='username'>Usuário:</label>
                <input
                  type='text'
                  id='username'
                  name='username'
                  value={username}
                  onChange={e => setUsername(e.target.value)}
                  required
                />
                <br />
                <label htmlFor='password'>Senha:</label>
                <div className='password-input'>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    id='password'
                    name='password'
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    required
                  />
                  <button type='button' onClick={togglePasswordVisibility}>
                    <FontAwesomeIcon
                      icon={showPassword ? faEyeSlash : faEye}
                      style={{ fontSize: '16px' }}
                    />
                  </button>
                </div>
              </>
            ) : (
              <>
                <label htmlFor='email'>E-mail:</label>
                <input
                  type='email'
                  id='email'
                  name='email'
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  required
                />
              </>
            )}
            {loginAttempts > 0 && loginAttempts <= 3 && (
              <p>{remainingAttemptsMessage}</p>
            )}
            <div className='button-container'>
              <button type='submit' disabled={isLoading}>
                {isLoading
                  ? 'Entrando...'
                  : loginForm
                  ? 'Entrar'
                  : 'Recuperar Senha'}
              </button>
            </div>
            {loginForm ? (
              <div className='button-container'>
                <p>
                  <button type='button' onClick={showRecoveryForm}>
                    Esqueci minha senha
                  </button>
                  <button id='modal-pay-button' onClick={goToCadastro}>
                    Cadastrar
                  </button>
                </p>
              </div>
            ) : (
              <div className='button-container'>
                <p>
                  <button type='button' onClick={showLoginForm}>
                    Voltar para o login
                  </button>
                </p>
              </div>
            )}
          </form>
          {error && <ErrorNotification message={error} severity='error' />}
        </div>
      </div>
    </div>
  )
}

export default Login
