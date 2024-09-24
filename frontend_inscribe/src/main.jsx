import React from 'react'
import ReactDOM from 'react-dom/client'
// import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { UserProvider } from './components/User/UserContext';
import App from './App.jsx'
import './index.css'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <UserProvider>
    <App />
  </UserProvider>
);

// ReactDOM.render(
//   <UserProvider>
//     <App />
//   </UserProvider>,
//   document.getElementById('root')
// )
