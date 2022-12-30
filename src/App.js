import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { Home, Login } from './integrate'


function App(){
  return (
    <BrowserRouter>
      <Routes>
        <Route path="login" element={<Login />} />
        <Route path="/*" element={<Home />} />
      </Routes>
    </BrowserRouter>
	);
}

export default App;