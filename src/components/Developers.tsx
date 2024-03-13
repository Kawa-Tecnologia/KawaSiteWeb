import React, { useState } from 'react'
import '../assets/styles/Developers.css'
import StarRating from './StarRating'
import Modal from './Modal'

interface ProfessionalData {
  skills: string[]
  tools: string[]
  presentation: string
  imageSrc: string
  job_title: string
}

interface DeveloperType {
  id: number
  fullname: string
  avaliation: number
  ProfessionalInfo: ProfessionalData
}

interface DeveloperListProps {
  developers?: DeveloperType[]
}

const DeveloperList: React.FC<DeveloperListProps> = ({ developers }) => {
  const [selectedDeveloper, setSelectedDeveloper] =
    useState<DeveloperType | null>(null)

  const openModal = (developer: DeveloperType) => {
    setSelectedDeveloper(developer)
  }

  const closeModal = () => {
    setSelectedDeveloper(null)
  }

  if (!developers || !Array.isArray(developers)) {
    console.error(
      'Prop "developers" must be an array of DeveloperType objects.'
    )
    return null
  }

  return (
    <div className='developer-container'>
      {developers.map((developer, index) => (
        <div
          key={index}
          className='developer-card'
          onClick={() => openModal(developer)}
        >
          <img
            src={
              developer.ProfessionalInfo.imageSrc ||
              require('../assets/images/2206015-icone-de-trabalho-de-desenvolvedor-vetor.jpg')
            }
            alt={developer.ProfessionalInfo.job_title}
            style={{ width: '60%', height: '40%' }}
            title='Clique aqui para mais detalhes do desenvolvedor!'
            className='developer-image'
          />

          <h3>ID: {developer.id}</h3>
          <h3>{developer.fullname}</h3>
          <p>
            Avaliação Média: <StarRating rating={developer.avaliation} />
          </p>
          <p className='presentation'>
            {developer.ProfessionalInfo.presentation}
          </p>
          <p className='skills'>
            Habilidades: {developer.ProfessionalInfo.skills.join(', ')}
          </p>
          <p className='tools'>
            Ferramentas: {developer.ProfessionalInfo.tools.join(', ')}
          </p>
        </div>
      ))}
      {selectedDeveloper && (
        <Modal
          title={selectedDeveloper.fullname}
          html={`     
          <img
          src=${
            selectedDeveloper.ProfessionalInfo.imageSrc
              ? selectedDeveloper.ProfessionalInfo.imageSrc
              : require('../assets/images/2206015-icone-de-trabalho-de-desenvolvedor-vetor.jpg')
          }
          style="width: 20%; height: 20%;"
          className='developer-image'
        
          /><p><strong>Apresentação:</strong> ${
            selectedDeveloper.ProfessionalInfo.presentation
          }</p>
              <p><strong>Habilidades:</strong> ${selectedDeveloper.ProfessionalInfo.skills.join(
                ', '
              )}</p>
              <!-- Adicionar outras avaliações, pegar as avaliações dos serviços anteriores dele -->`}
          closeModal={closeModal}
        />
      )}
    </div>
  )
}
export default DeveloperList
