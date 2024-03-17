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

interface Avaliation {
  content: string
  avaliation: number
}

interface DeveloperType {
  id: number
  fullname: string
  avaliation: number
  ProfessionalInfo: ProfessionalData
  Avaliation: Avaliation
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

          <h3>
            <StarRating rating={developer.avaliation} />
          </h3>
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
        
          /> <br/><strong>Apresentação:</strong> ${
            selectedDeveloper.ProfessionalInfo.presentation
          }
          <br/>
              <strong>Habilidades:</strong> ${selectedDeveloper.ProfessionalInfo.skills.join(
                ', '
              )}
              <br/>
              ${
                selectedDeveloper.Avaliation
                  ? `
                    <strong>Ultima Avaliação:</strong> 
                    ${selectedDeveloper.Avaliation?.avaliation}
                 `
                  : ''
              }
              <br/>
              ${
                selectedDeveloper.Avaliation
                  ? `
                    <strong>Ultimo Comentario:</strong> 
                    ${selectedDeveloper.Avaliation?.content}
                  `
                  : ''
              }`}
          closeModal={closeModal}
        />
      )}
    </div>
  )
}
export default DeveloperList
