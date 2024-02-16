import React, { useState } from 'react';
import UserContainer from './UserContainer';
import Menu from './Menu';
import "../assets/styles/UserProfile.css";

const UserProfile = () => {
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    phone: '',
    cpf: '',
    address: '',
  });

  const [professionalData, setProfessionalData] = useState({
    cnpj: '',
    curriculum: '',
    tags: [],
  });

  const [isEditMode, setIsEditMode] = useState(false);

  const handleUserDataChange = (e) => {
    const { name, value } = e.target;
    setUserData({
      ...userData,
      [name]: value,
    });
  };

  const handleProfessionalDataChange = (e) => {
    const { name, value } = e.target;
    setProfessionalData({
      ...professionalData,
      [name]: value,
    });
  };

  const handleEditModeToggle = () => {
    setIsEditMode(!isEditMode);
  };

  return (
    <div className="dashboard">
      <div className="left-container">
        <UserContainer />
        <Menu />
      </div>
      <div className="profile">
        <h1>User Profile</h1>
        <h2>Personal Information</h2>
        <form>
          <label>
            Name:
            <input
              type="text"
              name="name"
              value={userData.name}
              onChange={handleUserDataChange}
              disabled={!isEditMode}
            />
          </label>
          <label>
            Email:
            <input
              type="email"
              name="email"
              value={userData.email}
              onChange={handleUserDataChange}
              disabled={!isEditMode}
            />
          </label>
          <label>
            Phone:
            <input
              type="text"
              name="phone"
              value={userData.phone}
              onChange={handleUserDataChange}
              disabled={!isEditMode}
            />
          </label>
          <label>
            CPF:
            <input
              type="text"
              name="cpf"
              value={userData.cpf}
              onChange={handleUserDataChange}
              disabled={!isEditMode}
            />
          </label>
          <label>
            Address:
            <input
              type="text"
              name="address"
              value={userData.address}
              onChange={handleUserDataChange}
              disabled={!isEditMode}
            />
          </label>
        </form>
        <h2>Professional Profile</h2>
        <form>
          <label>
            CNPJ:
            <input
              type="text"
              name="cnpj"
              value={professionalData.cnpj}
              onChange={handleProfessionalDataChange}
              disabled={!isEditMode}
            />
          </label>
          <label>
            Curriculum:
            <input
              type="file"
              name="curriculum"
              onChange={handleProfessionalDataChange}
              disabled={!isEditMode}
            />
          </label>
          <label>
            Apresentação:
            <input
              type="text"
              name="cnpj"
              value={professionalData.presentation}
              onChange={handleProfessionalDataChange}
              disabled={!isEditMode}
              maxLength={255} // Definindo o máximo de 100 caracteres

            />
          </label>
          <label>
            Tags:
          </label>
          <ul>
            {professionalData.tags.map((tag, index) => (
              <li key={index}>{tag}</li>
            ))}
          </ul>
        </form>
        <button onClick={handleEditModeToggle}>
          {isEditMode ? 'Salvar' : 'Editar'}
        </button>
      </div>
    </div>
  );
};

export default UserProfile;