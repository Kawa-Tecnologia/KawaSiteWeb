import React, { useState, useEffect } from 'react'
import '../assets/styles/Project.css'
import UserContainer from './UserContainer'
import Menu from './Menu'

interface Project {
  id: number
  title: string
  description: string
  partners: { name: string }[]
}

const ProjectsPage: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]) // Estado para armazenar os projetos
  const [searchTerm, setSearchTerm] = useState<string>('') // Estado para armazenar o termo de busca
  const [currentPage, setCurrentPage] = useState<number>(1) // Estado para controlar a página atual
  const [projectsPerPage] = useState<number>(8) // Quantidade de projetos por página

  // Simulação de dados de projetos (substitua isso com sua lógica de obtenção de dados)
  const mockProjects: Project[] = [
    {
      id: 1,
      title: 'Projeto 1',
      description: 'Descrição do Projeto 1',
      partners: [{ name: 'User 2' }],
    },
    // Adicione mais projetos conforme necessário
  ]

  useEffect(() => {
    // Simulando uma busca de projetos
    setProjects(mockProjects)
  }, [mockProjects])

  // Filtrar os projetos com base no termo de busca
  const filteredProjects = projects.filter((project) =>
    project.title.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  // Lógica para calcular o número total de páginas
  const totalPages = Math.ceil(filteredProjects.length / projectsPerPage)

  // Lógica para determinar os projetos da página atual
  const indexOfLastProject = currentPage * projectsPerPage
  const indexOfFirstProject = indexOfLastProject - projectsPerPage
  const currentProjects = filteredProjects.slice(
    indexOfFirstProject,
    indexOfLastProject,
  )

  // Função para mudar de página
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber)

  // Função para lidar com a alteração do termo de busca
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    setSearchTerm(event.target.value)

  return (
    <div className="dashboard">
      <div className="left-container">
        <UserContainer />
        <Menu />
      </div>
      <div className="projects-page">
        <h1>Projetos de Treinamento</h1>
        <input
          type="text"
          placeholder="Buscar projetos"
          value={searchTerm}
          onChange={handleSearchChange}
        />

        <div className="project-cards">
          {currentProjects.length > 0 ? (
            currentProjects.map((project) => (
              <div key={project.id} className="project-card">
                <h2>Projeto: {project.title}</h2>
                <p>Descrição: {project.description}</p>
                <p>Parceiros: {project.partners[0]?.name}</p>
              </div>
            ))
          ) : (
            <p>Nenhum projeto disponível.</p>
          )}
        </div>
        <div className="pagination">
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
    </div>
  )
}

export default ProjectsPage
