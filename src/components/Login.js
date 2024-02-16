import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
//import axios from "axios";
import "../assets/styles/Login.css";
import NavigationDev from "./NavigationDevs";

const Login = ({ onLogin }) => {
  const [loginForm, setLoginForm] = useState(true);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    // const body = {
    //   username: username,
    //   password: password,
    // };
    // //const { data } = await axios.post(`http://localhost:3001/api/login`, body);

    // const user = data.user;
    // const travelPackages = data.travelPackages;

    // onLogin({ userData: user, travelPackagesData: travelPackages });

    setLoading(false);
    navigate("/under-construction");
  };

  const handleRecoverPassword = (e) => {
    e.preventDefault();
    alert(`Recuperar senha para o e-mail: ${email}`);
  };

  const showRecoveryForm = () => {
    setLoginForm(false);
  };

  const showLoginForm = () => {
    setLoginForm(true);
  };

  return (
    <div>
      <header>
        <div className="logo-container">
          <img src={require("../assets/images/kawa.jpg")} alt="Kawa Devs" />
        </div>
        <NavigationDev currentPage={"login"} />
      </header>
      <div className="login">
        <div className="login-container">
          <h1>Kawa Devs</h1>
          <form
            className="form"
            onSubmit={loginForm ? handleLogin : handleRecoverPassword}
          >
            <h2>{loginForm ? "Login" : "Recuperação de Senha"}</h2>
            {loginForm ? (
              <>
                <label htmlFor="username">Usuário:</label>
                <input
                  type="text"
                  id="username"
                  name="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
                <br />
                <label htmlFor="password">Senha:</label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </>
            ) : (
              <>
                <label htmlFor="email">E-mail:</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </>
            )}
            <button type="submit" disabled={isLoading}>
              {isLoading
                ? "Entrando..."
                : loginForm
                ? "Entrar"
                : "Recuperar Senha"}
            </button>
            {loginForm ? (
              <p>
                <button type="button" onClick={showRecoveryForm}>
                  Esqueci minha senha
                </button>
              </p>
            ) : (
              <p>
                <button type="button" onClick={showLoginForm}>
                  Voltar para o login
                </button>
              </p>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
