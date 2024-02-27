import React, { useState, useEffect } from 'react'
import '../assets/styles/Project.css'
import UserContainer from './UserContainer'
import Menu from './Menu'
import axios from 'axios';

interface Project {
  id: number
  title: string
  description: string
}

const ProjectsPage: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]) // Estado para armazenar os projetos
  const [searchTerm, setSearchTerm] = useState<string>('') // Estado para armazenar o termo de busca
  const [currentPage, setCurrentPage] = useState<number>(1) // Estado para controlar a página atual
  const [projectsPerPage] = useState<number>(8) // Quantidade de projetos por página

  const filteredProjects = projects.filter((project) =>
    project?.title?.toLowerCase().includes(searchTerm?.toLowerCase()),
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
    useEffect(() => {
      // Recupere o token JWT do armazenamento (por exemplo, localStorage)
      const token = localStorage.getItem('token');
      const userId = localStorage.getItem('userId');

      // Faça a requisição para buscar os projetos
      const fetchProjects = async () => {
        try {
          const response = await axios.get(`http://localhost:3001/api/projects/${userId}`, {
            headers: {
              Authorization: `Bearer ${token}`, // Inclua o token JWT no cabeçalho de autorização
            },
          });
          setProjects(response.data.projects);
        } catch (error) {
          console.error('Erro ao buscar projetos:', error);
        }
      };
  
      fetchProjects();
    }, [searchTerm, currentPage]); // Atualize a lista de projetos quando o termo de busca ou a página atual mudar
  
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
