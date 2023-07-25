import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Home from './pages/home/Home';
import Employee from './pages/employeesList/Employees';
import Header from './components/header/Header';
import {
  BrowserRouter,
  Route,
  Routes
} from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Header/>
      <Routes>
        <Route index element={<Home/>}/>
        <Route path='employeeList' element={<Employee/>}/>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);



