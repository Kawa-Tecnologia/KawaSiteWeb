import React, { useState, useEffect } from 'react'
import '../assets/styles/Project.css'
import axios from 'axios'
import LeftContainer from './LeftContainer'

interface Project {
  id: number
  title: string
  description: string
  date: Date | null
  duration: number
  link: string
  image: string
}

const ProjectsPage: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([])
  const [searchTerm, setSearchTerm] = useState<string>('')
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [projectsPerPage] = useState<number>(8)
  const [showModal, setShowModal] = useState<boolean>(false)
  const [modalTitle, setModalTitle] = useState<string>('')

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    link: '',
    image: '',
    duration: 0,
    date: ''
  })

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value
    })
  }

  const openModal = () => {
    setShowModal(true)
    setModalTitle('Cadastrar Projeto')
  }

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault()

    const token = localStorage.getItem('token')
    const userId = localStorage.getItem('userId')
    const body = { ...formData, user_id: userId }

    try {
      await axios.post(`${process.env.REACT_APP_API_URL}/api/projects`, body, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })

      const stringMessage = `${JSON.stringify(body)}`
      await axios.post(
        `${process.env.REACT_APP_FORUM_URL}/api/webhooks/${process.env.REACT_APP_WEBHOOK_ID2}/${process.env.REACT_APP_DISCORD_TOKEN2}`,
        {
          content: stringMessage,
          embeds: [
            {
              image: {
                url: 'https://spaceplace.nasa.gov/gallery-sun/en/solar-flare.en.jpg',
                height: 100,
                width: 100
              }
            }
          ]
        }
      )
      closeModal()
    } catch (error) {
      console.log(error)
    }

    alert('Projeto Criado')
  }
  const closeModal = () => {
    setShowModal(false)
  }

  const filteredProjects = projects.filter(project =>
    project?.title?.toLowerCase().includes(searchTerm?.toLowerCase())
  )

  const totalPages = Math.ceil(
    (filteredProjects?.length || 0) / projectsPerPage
  )

  const indexOfLastProject = currentPage * projectsPerPage
  const indexOfFirstProject = indexOfLastProject - projectsPerPage
  const currentProjects = filteredProjects.slice(
    indexOfFirstProject,
    indexOfLastProject
  )

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber)

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    setSearchTerm(event.target.value)
  useEffect(() => {
    const token = localStorage.getItem('token')
    const userId = localStorage.getItem('userId')

    const fetchProjects = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/api/projects/${userId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        )
        setProjects(response.data.projects)
      } catch (error) {
        console.error('Erro ao buscar projetos:', error)
      }
    }

    fetchProjects()
  }, [searchTerm, currentPage])

  const handleCreateProject = () => {
    openModal()
  }

  const handleEditProject = (projectId: number) => {
    console.log(`Abrir formulário para editar projeto ${projectId}`)
  }
  return (
    <div className='dashboard'>
      <LeftContainer/>
      <div className='projects-page'>
        <h1>Projetos de Treinamento</h1>
        <input
          type='text'
          placeholder='Buscar projetos'
          value={searchTerm}
          onChange={handleSearchChange}
        />
        <div>
          <button onClick={handleCreateProject}>Criar Projeto</button>
        </div>
        <div className='project-cards'>
          {currentProjects.length > 0 ? (
            currentProjects.map(project => (
              <div key={project.id} className='project-card'>
                <h2>Projeto: {project.title}</h2>
                <p>Descrição: {project.description}</p>
                <button onClick={() => handleEditProject(project.id)}>
                  Editar
                </button>
              </div>
            ))
          ) : (
            <p>Nenhum projeto disponível.</p>
          )}
        </div>
        <div className='pagination'>
          <button
            onClick={() => paginate(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Anterior
          </button>
          <span>
            Página {currentPage} de {totalPages}
          </span>
          <button
            onClick={() => paginate(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            Próxima
          </button>
        </div>
      </div>

      <div id='myModal' className={`modal ${showModal ? 'show' : ''}`}>
        <div className='modal-content'>
          <span className='close' onClick={closeModal}>
            &times;
          </span>
          <h2 id='modal-title'>{modalTitle}</h2>
          <form onSubmit={handleSubmit}>
            <div>
              <label htmlFor='title'>Título:</label>
              <input
                type='text'
                id='title'
                name='title'
                value={formData.title}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor='description'>Descrição:</label>
              <textarea
                id='description'
                name='description'
                value={formData.description}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor='link'>Link:</label>
              <input
                type='text'
                id='link'
                name='link'
                value={formData.link}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor='image'>Imagem:</label>
              <input
                type='text'
                id='image'
                name='image'
                value={formData.image}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor='duration'>Duração:</label>
              <input
                type='text'
                id='duration'
                name='duration'
                value={formData.duration}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor='date'>Data:</label>
              <input
                type='date'
                id='date'
                name='date'
                value={formData.date}
                onChange={handleChange}
              />
            </div>
            <button type='submit'>Cadastrar</button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default ProjectsPage
