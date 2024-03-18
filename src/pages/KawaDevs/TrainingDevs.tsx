import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react'
import LeftContainer from '../../components/LeftContainer'
import Pagination from '../../components/PaginationProps'
import '../../assets/styles/TrainingDev.css'
import axios from 'axios'
import ErrorNotification from '../../components/Error'
interface TrainingDevs {
  id: number
  title: string
  url_video: string
  url_thumbnail: string
  user_id: number
  description: string
  active: boolean
}
interface UserData {
  id: number
  name: string
  email: string
  points: number
  plan_id: number
}
const TrainingPage = () => {
  const [trainingData, setTrainingData] = useState<TrainingDevs[]>([])
  const [newTraining, setNewTraining] = useState<TrainingDevs>({
    id: 0,
    title: '',
    url_video: '',
    url_thumbnail: '',
    user_id: 0,
    description: '',
    active: true
  })
  const [searchTerm, setSearchTerm] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const videosPerPage = 2
  const [searchedVideos, setSearchedVideos] = useState<TrainingDevs[]>([])
  const [success, setSuccess] = useState<string>('')
  const [error, setError] = useState<string>('')
  const [user, setUser] = useState<UserData | null>(null)
  const [isUserTraining, setIsUserTraining] = useState<boolean>(false)

  // Dentro do useEffect, verifique se o treinamento pertence ao usuário
  useEffect(() => {
    if (user && searchedVideos.length > 0) {
      const userTraining = searchedVideos.find(
        training => training.user_id === user.id
      )
      setIsUserTraining(!!userTraining)
    }
  }, [user, searchedVideos])

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    setNewTraining({
      ...newTraining,
      [name]: value
    })
  }

  useEffect(() => {
    const storedUserString = localStorage.getItem('user')
    if (storedUserString) {
      const storedUser: UserData = JSON.parse(storedUserString)
      setUser(storedUser)
    }
  }, [])

  const toggleUserTraining = async (trainingId: number) => {
    if (!user) return

    const token = localStorage.getItem('token')
    const userId = localStorage.getItem('userId')
    if (!token || !userId) return

    try {
      const response = await axios.put(
        `${process.env.REACT_APP_API_URL}/api/training-dev/${trainingId}`,
        { active: !isUserTraining },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      )

      // Atualize os treinamentos após a alteração
      if (response.status === 200) {
        handleSearch()
      }
    } catch (error) {
      console.error('Error toggling user training:', error)
    }
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    try {
      if (
        !newTraining.title ||
        !newTraining.url_video ||
        !newTraining.url_thumbnail ||
        !newTraining.description
      ) {
        setError('Por favor, preencha todos os campos.')
        return
      }
      const token = localStorage.getItem('token')
      const userId = localStorage.getItem('userId')

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { id, ...body } = newTraining
      if (body && userId) {
        body.user_id = parseInt(userId)

        await axios.post(
          `${process.env.REACT_APP_API_URL}/api/training-dev`,
          body,
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        )
      }
      setTrainingData([...trainingData, newTraining])
      setNewTraining({
        id: 0,
        title: '',
        url_video: '',
        url_thumbnail: '',
        user_id: 0,
        description: '',
        active: true
      })
      setSuccess('Treinamento Criado com sucesso')
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setError(error.message)
      }
    }
  }

  const handleSearch = async () => {
    const token = localStorage.getItem('token')
    const userId = localStorage.getItem('userId')
    const url =
      user?.points !== undefined && user?.points > 0 && searchTerm
        ? `${process.env.REACT_APP_API_URL}/api/training-dev?description=${searchTerm}&active=true`
        : !searchTerm
        ? `${process.env.REACT_APP_API_URL}/api/training-dev?active=true`
        : `${process.env.REACT_APP_API_URL}/api/training-dev?description=${searchTerm}&user_id=${userId}&active=true`

    const { data } = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    if (data.trainingDev) {
      setSearchedVideos(data.trainingDev)
    }
  }

  const indexOfLastVideo = currentPage * videosPerPage
  const indexOfFirstVideo = indexOfLastVideo - videosPerPage
  const currentVideos = searchedVideos.length
    ? searchedVideos.slice(indexOfFirstVideo, indexOfLastVideo)
    : []

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber)

  return (
    <div className='dashboard'>
      <LeftContainer />
      <div className='training-dev'>
        <h1>Treinamentos e Cursos</h1>

        <div className='add-training-form'>
          <h2>Adicionar Novo Curso</h2>
          <form onSubmit={handleSubmit}>
            <input
              type='text'
              name='title'
              placeholder='Título do Curso'
              value={newTraining.title}
              onChange={handleInputChange}
            />
            <input
              type='text'
              name='url_video'
              placeholder='URL do Vídeo'
              value={newTraining.url_video}
              onChange={handleInputChange}
            />
            <input
              type='text'
              name='url_thumbnail'
              placeholder='URL da Miniatura'
              value={newTraining.url_thumbnail}
              onChange={handleInputChange}
            />
            <input
              type='text'
              name='description'
              placeholder='Descrição'
              value={newTraining.description}
              onChange={handleInputChange}
            />
            <button
              type='submit'
              disabled={
                !newTraining.title ||
                !newTraining.url_video ||
                !newTraining.url_thumbnail ||
                !newTraining.description ||
                user?.points === 0
              }
              style={{
                backgroundColor: user?.points === 0 ? 'gray' : '#0066CC'
              }}
            >
              Adicionar Curso
            </button>{' '}
          </form>
        </div>

        <div className='search-bar'>
          <input
            type='text'
            placeholder='Buscar vídeos...'
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
          />
          <button
            onClick={handleSearch}
            disabled={user?.points === 0}
            style={{
              backgroundColor: user?.points === 0 ? 'gray' : '#0066CC'
            }}
          >
            Buscar
          </button>
        </div>
        {user?.points !== undefined && user.points > 0 ? (
          <div>
            <div className='training-list'>
              {currentVideos.map((training, index) => (
                <div key={index} className='training-item'>
                  <a
                    href={training.url_video}
                    target='_blank'
                    rel='noopener noreferrer'
                    className='video-link'
                  >
                    <img
                      src={training.url_thumbnail}
                      alt={`Thumbnail ${index}`}
                    />
                  </a>
                  <div className='training-details'>
                    <h2>{training.title}</h2>
                    <p>{training.description}</p>
                    {isUserTraining && (
                      <button onClick={() => toggleUserTraining(training.id)}>
                        Desativar Treinamento
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
            <Pagination
              currentPage={currentPage}
              totalPages={videosPerPage}
              paginate={paginate}
            />
          </div>
        ) : (
          <div className='no-points-message'>
            <strong>
              *Adquira pontos para poder visualizar ou adicionar os treinamentos
              da comunidade.
            </strong>
          </div>
        )}
      </div>
      {error && <ErrorNotification message={error} severity='error' />}
      {success && <ErrorNotification message={success} severity='success' />}
    </div>
  )
}

export default TrainingPage
