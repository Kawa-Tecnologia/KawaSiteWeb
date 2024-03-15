import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import App from './App'
import SearchDevelopers from './pages/SearchDevelopers'
import AboutUs from './pages/AboutUs'
import AreaDevs from './pages/KawaDevs/KawaDevs'
import AboutUsDevs from './pages/KawaDevs/AboutUsDevs'
import UnderConstruction from './pages/UnderConstruction'
import ResetPasswordPage from './pages/KawaDevs/RecoveryPassword'
import AppSolutions from './pages/KawaSolutions/App'
import RequestDevsPage from './pages/KawaSolutions/RequestDevsPage'
import JoinTheTeam from './pages/KawaDevs/JoinTheTeam'
import './assets/styles/Modal.css'
import SurveyPage from './pages/SurveyPage'
import Doubts from './pages/Doubts'
import RegisterPage from './pages/KawaDevs/RegisterPage'
import CheckoutPage from './pages/KawaDevs/CheckoutPage'
import RegisterDevPage from './pages/KawaDevs/RegisterDevPage'
// import Donations from './pages/DonationsPage'
// import DonationsForm from './components/DonationsForm'
import TipsPage from './pages/TipsPage'
import TipsPageSolutions from './pages/KawaSolutions/TipsPageSolutions'
import { CSSTransition } from 'react-transition-group'
import LoginRoutes from './components/Login'

interface LocationState {
  key: string
}

const RoutesApp: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<App />} />
        <Route path="/devs/*" element={<LoginRoutes />} />

        <Route path='/devs/register' element={<RegisterPage />} />
        <Route path='/devs/register-devs' element={<RegisterDevPage />} />

        <Route
          path='/recovery-password/:email'
          element={<ResetPasswordPage />}
        />
        <Route path='/solutions/doubts' element={<Doubts />} />
        {/* <Route path='/donations' element={<Donations />} /> */}
        <Route path='/tips' element={<TipsPage />} />
        <Route path='/solutions/tips' element={<TipsPageSolutions />} />

        {/* <Route path='/register-donations' element={<DonationsForm />} /> */}
        <Route path='/checkout/:preferenceId' element={<CheckoutPage />} />

        <Route path='/request-devs' element={<RequestDevsPage />} />
        <Route path='/devs/join-the-team' element={<JoinTheTeam />} />
        <Route path='/search-devs' element={<SearchDevelopers />} />
        <Route path='/survey-devs' element={<SurveyPage />} />

        <Route path='/under-construction' element={<UnderConstruction />} />
        <Route path='/about-us' element={<AboutUs />} />
        <Route path='/devs/about-us' element={<AboutUsDevs />} />
        <Route path='/devs' element={<AreaDevs />} />
        <Route path='/solutions' element={<AppSolutions />} />
        <Route path='/*'>
          {(location: LocationState) => (
            <CSSTransition key={location.key} classNames='fade' timeout={300}>
              <Routes location={location} />
            </CSSTransition>
          )}
        </Route>
      </Routes>
    </Router>
  )
}

export default RoutesApp
