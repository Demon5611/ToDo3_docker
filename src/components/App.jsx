import React from 'react';
import { Container } from 'react-bootstrap';
import { Route, Routes } from 'react-router-dom';
import LoginPage from './Pages/LoginPage';
import SignUpPage from './Pages/SignUpPage';
import ToDoList from './Pages/ToDoList';
import AppNavBar from './UI/NavBar';
import AccountPage from './Pages/AccountPage';




export default function App({user, todos})
{
  return (
  <Container>
      <AppNavBar user={user} />
      <Routes>
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/account" element={<AccountPage />} />

        <Route path="/" element={<ToDoList todos={todos}  />} />
  
      </Routes>
    </Container>)
}
