import React from "react";
import styles from "./App.module.css";

import Footer from "./Components/views/Footer/Footer";
import LandingPage from "./Components/views/LandingPage/LandingPage";
import Navbar from "./Components/views/Navbar/Navbar";

import { Route, Routes } from "react-router-dom";
import DetailPage from './Components/views/DatailPage/DetailPage';
import FavoritePage from './Components/views/FavoritePage/FavoritePage'
import Login from './Components/views/LoginPage/LoginPage';
import Register from './Components/views/Register/Register';

import Auth from './auth';

function App() {
  const NewRegisterPage = Auth(Register, false);
  const NewLandingPage = Auth(LandingPage, null);
  const NewFavoritePate = Auth(FavoritePage, true);
  const NewLoginPage = Auth(Login, false);
  const NewDetailPage = Auth(DetailPage, null);

  return (<>
    <Navbar />
    <div className={styles.app}>    
      <Routes>
        <Route path="/" element={<NewLandingPage />} />
        <Route path="/movie/:movieId" element={<NewDetailPage />} />
        <Route path="/favorite" element={<NewFavoritePate />} />
        <Route path="/register" element={<NewRegisterPage />} />
        <Route path="/login" element={<NewLoginPage />} />
      </Routes>
    </div>
    <Footer />
    </>
  );
}

export default App;
