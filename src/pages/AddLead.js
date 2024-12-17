import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function AddLead() {
  const [leadName, setLeadName] = useState(''); // Lead Name
  const [fullName, setFullName] = useState(''); // Full Name
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState(''); // Email
  const [address, setAddress] = useState('');
  const [companyTitle, setCompanyTitle] = useState('');
  const navigate = useNavigate();

  const addLead = async () => {
    const webhookUrl = 'https://b24-szgeea.bitrix24.com/rest/1/2dxl81877341z824/crm.lead.add.json';

    const requestBody = {
      fields: {
        TITLE: leadName, // Lead Name (Title)
        NAME: fullName, // Full Name
        PHONE: phone ? [{ VALUE: phone, VALUE_TYPE: 'WORK' }] : [], // Phone Number
        EMAIL: email ? [{ VALUE: email, VALUE_TYPE: 'WORK' }] : [], // Email Address
        ADDRESS: address, // Address
        COMPANY_TITLE: companyTitle, // Company Title
    
      },
    };

    try {
      const response = await fetch(webhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(requestBody),
      });

      const data = await response.json();
      if (data.result) {
        alert('Lead successfully added with ID: ' + data.result);
        // Clear input fields after success
        setLeadName('');
        setFullName('');
        setPhone('');
        setEmail('');
        setAddress('');
        setCompanyTitle('');
        navigate('/lead-list');
      } else {
        alert('Error: ' + data.error_description);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Add New Lead</h2>
      <div className="row justify-content-center">
        <div className="col-md-6 border p-4">
          <div className="mb-3">
            <label htmlFor="leadName" className="form-label">Lead Name (Title):</label>
            <input
              type="text"
              id="leadName"
              className="form-control"
              value={leadName}
              onChange={(e) => setLeadName(e.target.value)}
              placeholder="Enter lead name"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="fullName" className="form-label">Full Name:</label>
            <input
              type="text"
              id="fullName"
              className="form-control"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="Enter full name"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="phone" className="form-label">Phone Number:</label>
            <input
              type="text"
              id="phone"
              className="form-control"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Enter phone number"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email Address:</label>
            <input
              type="email"
              id="email"
              className="form-control"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter email address"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="address" className="form-label">Address:</label>
            <input
              type="text"
              id="address"
              className="form-control"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Enter address"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="companyTitle" className="form-label">Company Name:</label>
            <input
              type="text"
              id="companyTitle"
              className="form-control"
              value={companyTitle}
              onChange={(e) => setCompanyTitle(e.target.value)}
              placeholder="Enter company name"
            />
          </div>
          <button onClick={addLead} className="btn btn-primary w-100">
            Add Lead
          </button>
          <button className="btn btn-secondary mt-3" onClick={() => navigate('/lead-list')}>
            <i className="fa-solid fa-arrow-left"></i> Back to list
          </button>
        </div>
      </div>
    </div>
  );
}

export default AddLead;
