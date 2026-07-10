import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import App from './App'
import AboutUs from './pages/AboutUs'
import UnderConstruction from './pages/UnderConstruction'
import AppSolutions from './pages/KawaSolutions/App'
import RequestDevsPage from './pages/KawaSolutions/RequestDevsPage'
import './assets/styles/Modal.css'
import SurveyPage from './pages/SurveyPage'
import Doubts from './pages/Doubts'
// import Donations from './pages/DonationsPage'
// import DonationsForm from './components/DonationsForm'
import TipsPage from './pages/TipsPage'
import TipsPageSolutions from './pages/KawaSolutions/TipsPageSolutions'
import { CSSTransition } from 'react-transition-group'
import DevelopersPage from './pages/KawaSolutions/DevelopersPage'
import ThankYouPage from './pages/KawaSolutions/ThankyouPage'

interface LocationState {
  key: string
}

const RoutesApp: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<App />} />
        <Route path='/request-devs/:id' element={<DevelopersPage />} />
        <Route path='/solutions/doubts' element={<Doubts />} />
        {/* <Route path='/donations' element={<Donations />} /> */}
        <Route path='/tips' element={<TipsPage />} />
        <Route path='/solutions/tips' element={<TipsPageSolutions />} />

        {/* <Route path='/register-donations' element={<DonationsForm />} /> */}

        <Route path='/request-devs' element={<RequestDevsPage />} />
        <Route path='/survey-devs' element={<SurveyPage />} />

        <Route path='/under-construction' element={<UnderConstruction />} />
        <Route path='/about-us' element={<AboutUs />} />
        <Route path='/solutions' element={<AppSolutions />} />
        <Route path='/solutions/thankyou' element={<ThankYouPage />} />

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
