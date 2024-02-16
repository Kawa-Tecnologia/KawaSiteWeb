import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import App from "./App";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import SearchDevelopers from "./components/SearchDevelopers";
import TrainingDetails from "./components/TrainingDetails"; // Importe o componente TrainingDetails
import Agenda from "./components/Agenda";
import ChatButton from "./components/ChatButton";
import ProjectsPage from "./components/Projects";
import Reviews from "./components/Reviews";
import MessageForForum from "./components/MessageForForum";
import FinancePage from "./components/Financial";
import CheckoutsPage from "./components/Checkouts";
import { useTheme } from "./components/ThemeProvider";
import AboutUs from "./components/AboutUs";
import AreaDevs from "./components/KawaDevs";
import UserProfile from "./components/UserProfile";
import Checkout from "./components/Checkout";
import AboutUsDevs from "./components/AboutUsDevs";
import UnderConstruction from "./components/UnderConstruction";

const RoutesApp = () => {
  const { darkMode } = useTheme();

  return (
    <div className={darkMode ? "dark-theme" : "light-theme"}>
      <Router>
        <Routes>
          <Route exact path="/" element={<App />} />
          <Route path="/devs/login" element={<Login />} />
          <Route path="/devs/dashboard" element={<Dashboard />} />
          <Route path="/search-devs" element={<SearchDevelopers />} />
          <Route path="/devs/training/:id" element={<TrainingDetails />} />
          <Route path="/devs/agenda" element={<Agenda />} />
          <Route path="/devs/projects" element={<ProjectsPage />} />
          <Route path="/devs/reviews" element={<Reviews />} />
          <Route path="/devs/message-for-forum" element={<MessageForForum />} />
          <Route path="/devs/financial" element={<FinancePage />} />
          <Route path="/devs/checkouts" element={<CheckoutsPage />} />
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/devs/about-us" element={<AboutUsDevs />} />
          <Route path="/devs" element={<AreaDevs />} />
          <Route path="/devs/profile" element={<UserProfile />} />
          <Route path="/devs/checkout/:id" element={<Checkout />} />
          <Route path="/under-construction" element={<UnderConstruction />} />

        </Routes>
        <ChatButton />
      </Router>
    </div>
  );
};

export default RoutesApp;
