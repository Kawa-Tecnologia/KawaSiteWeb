import React from 'react'
import '../../assets/styles/Developers.css'
interface ProfessionalData {
  skills: string[]
  tools: string[]
  presentation: string
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
  // Verifica se a propriedade developers é uma array e se cada elemento é um DeveloperType válido
  if (!developers || !Array.isArray(developers)) {
    console.error(
      'Prop "developers" must be an array of DeveloperType objects.'
    )
    return null
  }

  return (
    <div className='developer-container'>
      {developers.map((developer, index) => (
        <div key={index} className='developer-card'>
          <h3>ID:{developer.id}</h3>

          <h3>{developer.fullname}</h3>

          <p>Avaliação Média: {developer.avaliation}</p>
          <p>Apresentação: {developer.ProfessionalInfo.presentation}</p>

          <p>Habilidades: {developer.ProfessionalInfo.skills.join(', ')}</p>
          <p>Ferramentas: {developer.ProfessionalInfo.tools.join(', ')}</p>
        </div>
      ))}
    </div>
  )
}

export default DeveloperList
