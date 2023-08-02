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
import { Provider } from 'react-redux';
import store from './redux/store';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  
  <React.StrictMode>
      <BrowserRouter>
        <Provider store={store}>
          <Header/>
          <Routes>
            <Route index element={<Home/>}/>
            <Route path='employeeList' element={<Employee/>}/>
          </Routes>
          </Provider>
      </BrowserRouter> 
  </React.StrictMode> 
);



