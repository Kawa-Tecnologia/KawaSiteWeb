import React, { useState, ChangeEvent, useEffect } from 'react'
import UserContainer from './UserContainer'
import Menu from './Menu'
import '../assets/styles/UserProfile.css'
import axios from 'axios'
import Tooltip from '@mui/material/Tooltip'

interface UserData {
  fullname: string
  email: string
  phone: string
  document_number: string
  Address: Address
  ProfessionalInfo: ProfessionalData
  [key: string]: string | number | Address | ProfessionalData
}

interface Address {
  street: string
  number: number
  complement: string
  district: string
  zip_code: string
  city: string
  state: string
  country: string
  [key: string]: string | number
}

interface ProfessionalData {
  fantasy_name: string
  user_id: number
  name: string
  job_title: string
  company: string
  document_number: string
  experience_years: number
  skills: string[]
  tools: string[]
  cv_link: string
  profile_linkedin: string
  profile_github: string
  url: string
  presentation: string
  tag_id: number
  imageSrc: string
  Tag: Tag
  [key: string]: string | number | string[] | Tag
}

interface Tag {
  tag: string
  [key: string]: string
}
const UserProfile: React.FC = () => {
  const storedUserString = localStorage.getItem('user')
  const storedUser: UserData | null = storedUserString
    ? JSON.parse(storedUserString)
    : null

  const [userData, setUserData] = useState<UserData>({
    fullname: storedUser?.fullname || '',
    email: storedUser?.email || '',
    phone: storedUser?.phone || '',
    document_number: storedUser?.document_number || '',
    Address: {
      street: storedUser?.Address?.street || '',
      number: storedUser?.Address?.number || 0,
      complement: storedUser?.Address?.complement || '',
      district: storedUser?.Address?.district || '',
      zip_code: storedUser?.Address?.zip_code || '',
      city: storedUser?.Address?.city || '',
      state: storedUser?.Address?.state || '',
      country: storedUser?.Address?.country || ''
    },
    ProfessionalInfo: {
      fantasy_name: storedUser?.ProfessionalInfo?.fantasy_name || '',
      user_id: storedUser?.ProfessionalInfo?.user_id || 0,
      name: storedUser?.ProfessionalInfo?.name || '',
      job_title: storedUser?.ProfessionalInfo?.job_title || '',
      company: storedUser?.ProfessionalInfo?.company || '',
      document_number: storedUser?.ProfessionalInfo?.document_number || '',
      experience_years: storedUser?.ProfessionalInfo?.experience_years || 0,
      skills: storedUser?.ProfessionalInfo?.skills || [''],
      tools: storedUser?.ProfessionalInfo?.tools || [''],
      cv_link: storedUser?.ProfessionalInfo?.cv_link || '',
      profile_linkedin: storedUser?.ProfessionalInfo?.profile_linkedin || '',
      profile_github: storedUser?.ProfessionalInfo?.profile_github || '',
      url: storedUser?.ProfessionalInfo?.url || '',
      presentation: storedUser?.ProfessionalInfo?.presentation || '',
      tag_id: storedUser?.ProfessionalInfo?.tag_id || 0,
      imageSrc: storedUser?.ProfessionalInfo?.imageSrc || '',
      Tag: {
        tag: storedUser?.ProfessionalInfo?.Tag?.tag || ''
      }
    }
  })

  const handleUserDataChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setUserData(prevState => ({
      ...prevState,
      [name]: value
    }))
  }

  const handleProfessionalDataChange = (
    e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>
  ) => {
    const { name, value } = e.target
    if (name === 'skills' || name === 'tools') {
      // Se o nome do campo for "skills" ou "tools", dividimos a string em um array usando a vírgula como delimitador
      const arrayValue = value.split(',')
      setUserData(prevState => ({
        ...prevState,
        ProfessionalInfo: {
          ...prevState.ProfessionalInfo,
          [name]: arrayValue // Definindo o valor do campo como o array dividido
        }
      }))
    } else {
      // Se não, atualizamos normalmente
      setUserData(prevState => ({
        ...prevState,
        ProfessionalInfo: {
          ...prevState.ProfessionalInfo,
          [name]: value
        }
      }))
    }
  }

  const [isEditMode, setIsEditMode] = useState(false)
  const [originalUserData, setOriginalUserData] = useState<UserData | null>(
    null
  )
  const [originalProfessionalData, setOriginalProfessionalData] =
    useState<ProfessionalData | null>(null)

  useEffect(() => {
    if (storedUser) {
      setOriginalUserData(storedUser)
      setOriginalProfessionalData(storedUser.ProfessionalInfo)
    }
  }, [storedUser])

  const handleEditModeToggle = () => {
    setIsEditMode(prevState => !prevState)
    if (!isEditMode && storedUser) {
      setUserData(storedUser)
    }
  }

  const handleSaveChanges = async () => {
    if (!originalUserData && !originalProfessionalData) return
    const token = localStorage.getItem('token')

    const modifiedUserData: Partial<UserData> = {}
    const modifiedProfessionalData: Partial<ProfessionalData> = {}

    for (const key in userData) {
      if (originalUserData && userData[key] !== originalUserData[key]) {
        modifiedUserData[key] = userData[key]
      }
    }

    for (const key in userData.ProfessionalInfo) {
      if (
        (originalProfessionalData &&
          userData.ProfessionalInfo[key] !== originalProfessionalData[key]) ||
        (!originalProfessionalData && userData.ProfessionalInfo[key])
      ) {
        modifiedProfessionalData[key] = userData.ProfessionalInfo[key]
      }
    }

    const body = {
      userData: modifiedUserData,
      ProfessionalInfo: modifiedProfessionalData
    }

    await axios.put(`${process.env.REACT_APP_API_URL}/api/user/${storedUser?.id}`, body, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })

    setOriginalUserData(userData)
    setOriginalProfessionalData(userData.ProfessionalInfo)
    setIsEditMode(false)
  }

  return (
    <div className='dashboard'>
      <div className='left-container'>
        <UserContainer />
        <Menu />
      </div>
      <div className='profile'>
      <h1>User Profile</h1>

        <div className="form-container-user">
          <div className="personal-info-form">
        <h2>Personal Information</h2>
        <form>
          <label>
            Name:
            <input
              type='text'
              name='fullname'
              value={userData.fullname || ''}
              onChange={handleUserDataChange}
              disabled={!isEditMode}
            />
          </label>
          <label>
            Email:
            <input
              type='email'
              name='email'
              value={userData.email}
              onChange={handleUserDataChange}
              disabled={!isEditMode}
            />
          </label>
          <label>
            Phone:
            <input
              type='text'
              name='phone'
              value={userData.phone}
              onChange={handleUserDataChange}
              disabled={!isEditMode}
            />
          </label>
          <label>
            CPF:
            <input
              type='text'
              name='cpf'
              value={userData.document_number}
              onChange={handleUserDataChange}
              disabled={!isEditMode}
            />
          </label>
          <h3>Endereço</h3>
          <label>
            Rua:
            <input
              type='text'
              name='street'
              value={userData.Address.street}
              onChange={handleUserDataChange}
              disabled={!isEditMode}
            />
          </label>
          <label>
            Numero:
            <input
              type='number'
              name='number'
              value={userData.Address.number}
              onChange={handleUserDataChange}
              disabled={!isEditMode}
            />
          </label>
          <label>
            Complemento:
            <input
              type='text'
              name='complement'
              value={userData.Address.complement}
              onChange={handleUserDataChange}
              disabled={!isEditMode}
            />
          </label>

          <label>
            Bairro:
            <input
              type='text'
              name='district'
              value={userData.Address.district}
              onChange={handleUserDataChange}
              disabled={!isEditMode}
            />
          </label>

          <label>
            CEP:
            <input
              type='text'
              name='zip_code'
              value={userData.Address.zip_code}
              onChange={handleUserDataChange}
              disabled={!isEditMode}
            />
          </label>
          <label>
            Cidade:
            <input
              type='text'
              name='city'
              value={userData.Address.city}
              onChange={handleUserDataChange}
              disabled={!isEditMode}
            />
          </label>
          <label>
            Estado:
            <input
              type='text'
              name='state'
              value={userData.Address.state}
              onChange={handleUserDataChange}
              disabled={!isEditMode}
            />
          </label>
          <label>
            País:
            <input
              type='text'
              name='country'
              value={userData.Address.country}
              onChange={handleUserDataChange}
              disabled={!isEditMode}
            />
          </label>
        </form>
          </div>
          <div className="professional-info-form">
            <h2>Professional Profile</h2>
            <form>
          <label>
            Razão Social:
            <input
              type='text'
              name='name'
              value={userData.ProfessionalInfo?.name}
              onChange={handleProfessionalDataChange}
              disabled={!isEditMode}
            />
          </label>
          <label>
            Fantasy Name:
            <input
              type='text'
              name='fantasy_name'
              value={userData.ProfessionalInfo?.fantasy_name}
              onChange={handleProfessionalDataChange}
              disabled={!isEditMode}
            />
          </label>
          <label>
            CPF/CNPJ:
            <input
              type='text'
              name='cnpj'
              value={userData.ProfessionalInfo?.document_number}
              onChange={handleProfessionalDataChange}
              disabled={!isEditMode}
            />
          </label>
          <label>
            Curriculum:
            <input
              type='text'
              name='cv_link'
              value={userData.ProfessionalInfo?.cv_link}
              onChange={handleProfessionalDataChange}
              disabled={!isEditMode}
            />
          </label>
          <label>
            Perfil do Linkedin:
            <input
              type='text'
              name='profile_linkedin'
              value={userData.ProfessionalInfo?.profile_linkedin}
              onChange={handleProfessionalDataChange}
              disabled={!isEditMode}
            />
          </label>
          <label>
            Perfil do GitHub:
            <input
              type='text'
              name='profile_github'
              value={userData.ProfessionalInfo?.profile_github}
              onChange={handleProfessionalDataChange}
              disabled={!isEditMode}
            />
          </label>
          <label>
            URL do Site:
            <input
              type='text'
              name='url'
              value={userData.ProfessionalInfo?.url}
              onChange={handleProfessionalDataChange}
              disabled={!isEditMode}
            />
          </label>
          <label>
            Apresentação:
            <Tooltip title='Escreva um texto com sua apresentação profissional (Maximo 255 caracteres).'>
              <span>(?)</span>
            </Tooltip>{' '}
            <input
              type='text'
              name='presentation'
              value={userData.ProfessionalInfo?.presentation}
              onChange={handleProfessionalDataChange}
              disabled={!isEditMode}
              maxLength={255} // Definindo o máximo de 255 caracteres
            />
          </label>
          <label>
            Titulo/Cargo:
            <input
              type='text'
              name='job_title'
              value={userData.ProfessionalInfo?.job_title}
              onChange={handleProfessionalDataChange}
              disabled={!isEditMode}
            />
          </label>
          <label>
            Habilidades:
            <Tooltip title='Informe as habilidades separadas por (,).'>
              <span>(?)</span>
            </Tooltip>{' '}
            <input
              type='text'
              name='skills'
              value={userData.ProfessionalInfo?.skills}
              onChange={handleProfessionalDataChange}
              disabled={!isEditMode}
              maxLength={255} // Definindo o máximo de 255 caracteres
            />
          </label>
          <label>
            Ferramentas:
            <Tooltip title='Informe as ferramentas separadas por (,).'>
              <span>(?)</span>
            </Tooltip>{' '}
            <input
              type='text'
              name='tools'
              value={userData.ProfessionalInfo?.tools}
              onChange={handleProfessionalDataChange}
              disabled={!isEditMode}
              maxLength={255} // Definindo o máximo de 255 caracteres
            />
          </label>
          <label>
            Anos de Experiência:
            <input
              type='text'
              name='experience_years'
              value={userData.ProfessionalInfo?.experience_years}
              onChange={handleProfessionalDataChange}
              disabled={!isEditMode}
            />
          </label>
          <label>
            Nível Técnico:
            <select
              name='tag_id'
              value={userData.ProfessionalInfo?.tag_id}
              onChange={handleProfessionalDataChange}
              disabled={!isEditMode}
            >
              <option value='1'>Principiante</option>
              <option value='2'>Junior</option>
              <option value='3'>Pleno</option>
              <option value='4'>Senior</option>
              <option value='Especialista'>Especialista</option>
            </select>
          </label>

          <label>
            Link do Cartão de Visitas:
            <input
              type='text'
              name='imageSrc'
              value={userData.ProfessionalInfo?.imageSrc}
              onChange={handleProfessionalDataChange}
              disabled={!isEditMode}
            />
          </label>
        </form>
          </div>
        </div>
        <button onClick={isEditMode ? handleSaveChanges : handleEditModeToggle}>
          {isEditMode ? 'Salvar' : 'Editar'}
        </button>
      </div>
    </div>
  )
}

export default UserProfile
