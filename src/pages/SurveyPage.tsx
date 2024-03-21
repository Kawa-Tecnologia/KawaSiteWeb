import React from 'react'
import { useLocation } from 'react-router-dom'
import SurveyForm from '../components/Survey'

const SurveyPage: React.FC = () => {
  const location = useLocation()
  const searchParams = new URLSearchParams(location.search)
  const email = searchParams.get('email') || ''
  const name = searchParams.get('name') || ''
  const providerName = searchParams.get('providerName') || ''
  const serviceId = searchParams.get('serviceId') || ''


  return (
    <SurveyForm
      email={email}
      name={name}
      providerName={providerName}
      serviceId={serviceId}
    />
  )
}

export default SurveyPage
