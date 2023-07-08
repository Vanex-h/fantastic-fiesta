// import { useState } from 'react'
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Welcome from "./components/Welcome/Welcome";
import Login from "./components/Login/Login";
import Signup from "./components/Signup/Signup";
import Home from "./components/Home/Home";
import UpdateForm from "./components/Home/UpdateForm";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/login" element={<Login />}>
          </Route>
          <Route path="/home" element= {<Home />} />
          <Route path='/signup' element={<Signup />} /> 
          <Route path='/update/:id' element={<UpdateForm />} /> 
      </Routes>
    </BrowserRouter>
  );
}

export default App;
