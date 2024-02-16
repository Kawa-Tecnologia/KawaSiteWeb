import React, { useState, useEffect } from "react";
import "../assets/styles/Checkouts.css";
import UserContainer from "./UserContainer";
import Menu from "./Menu";

const CheckoutsPage = () => {
  const [checkouts, setCheckouts] = useState([]); // Estado para armazenar os projetos
  const [searchTerm, setSearchTerm] = useState(""); // Estado para armazenar o termo de busca
  const [currentPage, setCurrentPage] = useState(1); // Estado para controlar a página atual
  const [checkoutsPerPage] = useState(8); // Quantidade de projetos por página

  // Simulação de dados de projetos (substitua isso com sua lógica de obtenção de dados)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const mockCheckouts = [
    {
      id: 1,
      title: "Projeto 1",
      description: "Descrição do Projeto 1",
    },
    {
      id: 2,
      title: "Projeto 2",
      description: "Descrição do Projeto 2",
    },
    {
      id: 3,
      title: "Projeto 3",
      description: "Descrição do Projeto 3",
    },
    {
      id: 4,
      title: "Projeto 4",
      description: "Descrição do Projeto 4",
    },
    {
      id: 5,
      title: "Projeto 5",
      description: "Descrição do Projeto 5",
    },
    {
      id: 6,
      title: "Projeto 6",
      description: "Descrição do Projeto 6",
    },
    {
      id: 7,
      title: "Projeto 7",
      description: "Descrição do Projeto 7",
    },
    {
      id: 8,
      title: "Projeto 8",
      description: "Descrição do Projeto 8",
    },
    {
      id: 9,
      title: "Projeto 9",
      description: "Descrição do Projeto 9",
    },
  ];

  useEffect(() => {
    setCheckouts(mockCheckouts);
  }, [mockCheckouts]);

  const filteredCheckouts = checkouts.filter((checkout) =>
    checkout.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredCheckouts.length / checkoutsPerPage);

  const indexOfLastCheckout = currentPage * checkoutsPerPage;
  const indexOfFirstCheckout = indexOfLastCheckout - checkoutsPerPage;
  const currentCheckouts = filteredCheckouts.slice(
    indexOfFirstCheckout,
    indexOfLastCheckout
  );

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleSearchChange = (event) => setSearchTerm(event.target.value);

  return (
    <div className="dashboard">
      <div className="left-container">
        <UserContainer />
        <Menu />
      </div>
      <div className="checkouts-page">
        <h1>Checkouts</h1>
        <input
          type="text"
          placeholder="Buscar checkouts"
          value={searchTerm}
          onChange={handleSearchChange}
        />

        <div className="checkout-cards">
          {currentCheckouts.length > 0 ? (
            currentCheckouts.map((checkout) => (
              <div key={checkout.id} className="checkout-card">
                <h2>Checkout: {checkout.title}</h2>
                <p>Descrição: {checkout.description}</p>
              </div>
            ))
          ) : (
            <p>Nenhum checkout disponível.</p>
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

export default CheckoutsPage;
