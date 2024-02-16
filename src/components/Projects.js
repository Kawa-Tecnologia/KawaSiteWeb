import React, { useState, useEffect } from "react";
import "../assets/styles/Project.css";
import UserContainer from "./UserContainer";
import Menu from "./Menu";

const ProjectsPage = () => {
  const [projects, setProjects] = useState([]); // Estado para armazenar os projetos
  const [searchTerm, setSearchTerm] = useState(""); // Estado para armazenar o termo de busca
  const [currentPage, setCurrentPage] = useState(1); // Estado para controlar a página atual
  const [projectsPerPage] = useState(8); // Quantidade de projetos por página

  // Simulação de dados de projetos (substitua isso com sua lógica de obtenção de dados)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const mockProjects = [
    {
      id: 1,
      title: "Projeto 1",
      description: "Descrição do Projeto 1",
      partners: [{ name: "User 2" }],
    },
    {
      id: 2,
      title: "Projeto 2",
      description: "Descrição do Projeto 2",
      partners: [],
    },
    {
      id: 3,
      title: "Projeto 3",
      description: "Descrição do Projeto 3",
      partners: [],
    },
    {
      id: 4,
      title: "Projeto 4",
      description: "Descrição do Projeto 4",
      partners: [],
    },
    {
      id: 5,
      title: "Projeto 5",
      description: "Descrição do Projeto 5",
      partners: [],
    },
    {
      id: 6,
      title: "Projeto 6",
      description: "Descrição do Projeto 6",
      partners: [],
    },
    {
      id: 7,
      title: "Projeto 7",
      description: "Descrição do Projeto 7",
      partners: [],
    },
    {
      id: 8,
      title: "Projeto 8",
      description: "Descrição do Projeto 8",
      partners: [],
    },
    {
      id: 9,
      title: "Projeto 9",
      description: "Descrição do Projeto 9",
      partners: [],
    },

    // Adicione mais projetos conforme necessário
  ];

  useEffect(() => {
    // Simulando uma busca de projetos
    setProjects(mockProjects);
  }, [mockProjects]);

  // Filtrar os projetos com base no termo de busca
  const filteredProjects = projects.filter((project) =>
    project.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Lógica para calcular o número total de páginas
  const totalPages = Math.ceil(filteredProjects.length / projectsPerPage);

  // Lógica para determinar os projetos da página atual
  const indexOfLastProject = currentPage * projectsPerPage;
  const indexOfFirstProject = indexOfLastProject - projectsPerPage;
  const currentProjects = filteredProjects.slice(
    indexOfFirstProject,
    indexOfLastProject
  );

  // Função para mudar de página
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Função para lidar com a alteração do termo de busca
  const handleSearchChange = (event) => setSearchTerm(event.target.value);

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
  );
};

export default ProjectsPage;
