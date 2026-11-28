import React, { lazy, Suspense } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import RouteFallback from './components/RouteFallback'
import './assets/styles/Modal.css'

// Code splitting por rota: cada página vira um chunk separado,
// carregado sob demanda. Reduz o bundle inicial da home.
// webpackPrefetch: após a carga inicial, o navegador baixa os chunks
// em tempo ocioso (idle), deixando a navegação entre páginas instantânea
// e sem "tela branca".
const App = lazy(() => import(/* webpackPrefetch: true */ './App'))
const AboutUs = lazy(() => import(/* webpackPrefetch: true */ './pages/AboutUs'))
const UnderConstruction = lazy(() => import('./pages/UnderConstruction'))
const AppSolutions = lazy(() => import(/* webpackPrefetch: true */ './pages/KawaSolutions/App'))
const RequestDevsPage = lazy(() => import(/* webpackPrefetch: true */ './pages/KawaSolutions/RequestDevsPage'))
const SurveyPage = lazy(() => import('./pages/SurveyPage'))
const Doubts = lazy(() => import(/* webpackPrefetch: true */ './pages/Doubts'))
const TipsPage = lazy(() => import(/* webpackPrefetch: true */ './pages/TipsPage'))
const TipsPageSolutions = lazy(() => import(/* webpackPrefetch: true */ './pages/KawaSolutions/TipsPageSolutions'))
const DevelopersPage = lazy(() => import('./pages/KawaSolutions/DevelopersPage'))
const ThankYouPage = lazy(() => import('./pages/KawaSolutions/ThankyouPage'))
const NotFound = lazy(() => import(/* webpackPrefetch: true */ './pages/NotFound'))

const RoutesApp: React.FC = () => {
  return (
    <Router>
      <Suspense fallback={<RouteFallback />}>
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
          <Route path='*' element={<NotFound />} />
        </Routes>
      </Suspense>
    </Router>
  )
}

export default RoutesApp
