import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// components/Layout
import Header from './components/Layout/Header';
import Navbar from './components/Layout/Navbar';
import Footer from './components/Layout/Footer';
import Sidebar from './components/Layout/Sidebar';
import MainContainer from './components/Layout/MainContainer';
// pages
import HomePage from './pages/Home/HomePage';
import AboutPage from './pages/Static/AboutPage';
import ArticlesPage from './pages/Article/ArticleListPage';
import ArticleDetail from './pages/Article/SingleArticlePage';
import LoginPage from './pages/Auth/LoginPage';
import SignupPage from './pages/Auth/SignupPage';

import NotFound from './pages/Error/NotFoundPage';

import "tailwindcss/tailwind.css"
import "./App.css"


const App = () => {
  return (
    <Router>
      <div className="flex flex-col w-full m-0 p-0">
        <Header />
        {/* <Navbar /> */}
        <div className="flex flex-1 p-4 space-x-4">
          <Sidebar />
          <MainContainer>
            {/* Define your routes inside the Routes component */}
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/articles" element={<ArticlesPage />} />
              <Route path="/article/:id" element={<ArticleDetail />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/signup" element={<SignupPage />} />

              {/* catch-all route */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </MainContainer>
        </div>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
