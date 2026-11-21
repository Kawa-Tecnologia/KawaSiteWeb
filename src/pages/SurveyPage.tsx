import React from 'react'
import { useLocation } from 'react-router-dom'
import SurveyForm from '../components/Survey'
import Seo from '../components/Seo'

const SurveyPage: React.FC = () => {
  const location = useLocation()
  const searchParams = new URLSearchParams(location.search)
  const email = searchParams.get('email') || ''
  const name = searchParams.get('name') || ''
  const providerName = searchParams.get('providerName') || ''
  const serviceId = searchParams.get('serviceId') || ''


  return (
    <>
      <Seo
        title='Pesquisa de avaliação | Kawa Tecnologia'
        description='Formulário interno para avaliar o atendimento de um prestador da Kawa Tecnologia.'
        path='/survey-devs'
        noindex
      />
      <SurveyForm
        email={email}
        name={name}
        providerName={providerName}
        serviceId={serviceId}
      />
    </>
  )
}

export default SurveyPage
