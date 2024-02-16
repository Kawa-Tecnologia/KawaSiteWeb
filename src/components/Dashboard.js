import React from 'react';
import UserContainer from './UserContainer';
import Menu from './Menu';
import TrainingHistory from './TrainingHistory';
import "../assets/styles/Menu.css";
import "../assets/styles/Dashboard.css";
import LastNews from './LastNews';
const Dashboard = () => {

  return (
        <div className="dashboard">
          <div className="left-container">
            <UserContainer />
            <Menu />
          </div>
          <div className="main-content">
            <div className="training-section">
              <TrainingHistory />
            </div>
            <div className="latest-news">
              <LastNews />
            </div>
          </div>
        </div>
  );
};

export default Dashboard;