import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import AddLead from './pages/AddLead';
import LeadList from './pages/LeadList';
import UpdateLead from './pages/UpdateLead';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
      <Route 
  path="/" 
  element={
    <h1 style={{ textAlign: "center", marginTop: "20px" }}>
      Welcome to Bitrix APP
    </h1>
  } 
/>

        <Route path="/add-lead" element={<AddLead />} />
        <Route path="/lead-list" element={<LeadList />} />
        <Route path="/update-lead" element={<UpdateLead />} />
      </Routes>
    </Router>
  );
}

export default App;