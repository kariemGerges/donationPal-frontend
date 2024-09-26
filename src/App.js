import React, { useContext } from 'react';
import {HashRouter as Router, Route, Routes} from 'react-router-dom';

// Components
import Header from './components/Header/Header';

// Context
import ThemeContext from './components/ThemeContext/ThemeContext';
import Footer from './components/Footer/Footer';

// Pages
import Home from './pages/Home/Home';
import AllCampaigns from './pages/AllCampaigns/AllCampaigns';
import CampaignDetails from './pages/CampaignDetails/CampaignDetails';
import Profile from './pages/Profile/Profile';
import Login from './pages/Login/Login';
import AboutUs from './pages/AboutUs/AboutUs';
import ErrLandingPage from './pages/ErrLandingPage/ErrLandingPage';
import Signup from './components/signup/signup';
import CompleteSignup from './pages/Complete-signup/Complete-signup';


function App() {

  const { theme } = useContext(ThemeContext);

  return (
    <div
      className={`relative w-hull min-h-screen
        ${theme ? 'bg-gray-800 text-white' : 'bg-white text-gray-950'}`}
    >
      <Router>
        <div >
          <Header />
            <Routes>
                <Route path="/" element={<Home />} />
                  <Route path='/AllCampaigns' element={<AllCampaigns />} />
                    <Route path='/CampaignDetails' element={<CampaignDetails />} />
                  <Route path='/Profile' element={<Profile />} />
                <Route path='/Login' element={<Login />} />
              <Route path='/AboutUs' element={<AboutUs />} />
            <Route path='/signup' element={<Signup />} />
          <Route path={`/complete-signup/:id`} element={<CompleteSignup />} />
              {/* catch all other routes */}
                <Route path='/ErrLandingPage' element={<ErrLandingPage />} />
              <Route path="*" element={<ErrLandingPage />} />
            </Routes>
          <Footer />
        </div>
      </Router>
    </div>
  );
}

export default App;
