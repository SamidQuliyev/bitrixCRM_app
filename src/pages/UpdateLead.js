import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';

function UpdateLead() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const leadId = searchParams.get('id');

  const [leadFields, setLeadFields] = useState({
    TITLE: '',
    NAME: '',
    PHONE: '',
    ADDRESS: '',
    COMPANY_TITLE: '',
    EMAIL: '',
  });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchLead = async () => {
    const webhookUrl = `https://b24-szgeea.bitrix24.com/rest/1/2dxl81877341z824/crm.lead.get.json?id=${leadId}`;

    try {
      const response = await fetch(webhookUrl);
      const data = await response.json();
      if (data.result) {
        setLeadFields({
          TITLE: data.result.TITLE || '',
          NAME: data.result.NAME || '',
          PHONE: data.result.PHONE?.[0]?.VALUE || '',
          ADDRESS: data.result.ADDRESS || '',
          COMPANY_TITLE: data.result.COMPANY_TITLE || '',
          EMAIL: data.result.EMAIL?.[0]?.VALUE || '',
        });
      } else {
        alert('Error: ' + data.error_description);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  useEffect(() => {
    if (leadId) {
      fetchLead();
    }
  }, [leadId]);

  const validateEmail = (email) => {
    const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    return regex.test(email);
  };

  const handleFieldChange = (field, value) => {
    setLeadFields((prevFields) => ({
      ...prevFields,
      [field]: value,
    }));
  };

  const updateLead = async () => {
    if (leadFields.EMAIL && !validateEmail(leadFields.EMAIL)) {
      setError('Zəhmət olmasa düzgün bir e-mail ünvanı daxil edin.');
      return;
    }

    setError('');
    setIsLoading(true);
    const webhookUrl = 'https://b24-szgeea.bitrix24.com/rest/1/2dxl81877341z824/crm.lead.update.json';

    try {
      await fetch(webhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: leadId,
          fields: { PHONE: [null] },
        }),
      });

      const requestBody = {
        id: leadId,
        fields: {
          TITLE: leadFields.TITLE,
          NAME: leadFields.NAME,
          PHONE: leadFields.PHONE
            ? [{ VALUE: leadFields.PHONE, }]
            : [],
          EMAIL: leadFields.EMAIL
            ? [{ VALUE: leadFields.EMAIL, VALUE_TYPE: 'WORK' }]
            : [],
          ADDRESS: leadFields.ADDRESS,
          COMPANY_TITLE: leadFields.COMPANY_TITLE,
        },
      };

      const response = await fetch(webhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(requestBody),
      });

      const data = await response.json();
      if (data.result) {
        alert('Lead successfully updated.');
        navigate('/lead-list');
      } else {
        alert('Error: ' + data.error_description);
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Update Lead</h2>
      <div className="row justify-content-center">
        <div className="col-md-6 border p-4">
          <div className="mb-3">
            <label htmlFor="leadTitle" className="form-label">Lead Title:</label>
            <input
              type="text"
              id="leadTitle"
              className="form-control"
              value={leadFields.TITLE}
              onChange={(e) => handleFieldChange('TITLE', e.target.value)}
              placeholder="Enter new lead title"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="leadName" className="form-label">Full Name:</label>
            <input
              type="text"
              id="leadName"
              className="form-control"
              value={leadFields.NAME}
              onChange={(e) => handleFieldChange('NAME', e.target.value)}
              placeholder="Enter new full name"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="leadPhone" className="form-label">Phone:</label>
            <input
              type="text"
              id="leadPhone"
              className="form-control"
              value={leadFields.PHONE}
              onChange={(e) => handleFieldChange('PHONE', e.target.value)}
              placeholder="Enter new phone number"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="leadEmail" className="form-label">E-mail:</label>
            <input
              type="email"
              id="leadEmail"
              className="form-control"
              value={leadFields.EMAIL}
              onChange={(e) => handleFieldChange('EMAIL', e.target.value)}
              placeholder="Enter new email"
            />
            {error && <div className="text-danger">{error}</div>}
          </div>
          <div className="mb-3">
            <label htmlFor="leadAddress" className="form-label">Address:</label>
            <input
              type="text"
              id="leadAddress"
              className="form-control"
              value={leadFields.ADDRESS}
              onChange={(e) => handleFieldChange('ADDRESS', e.target.value)}
              placeholder="Enter address"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="leadCompanyTitle" className="form-label">Company Name:</label>
            <input
              type="text"
              id="leadCompanyTitle"
              className="form-control"
              value={leadFields.COMPANY_TITLE}
              onChange={(e) => handleFieldChange('COMPANY_TITLE', e.target.value)}
              placeholder="Enter company name"
            />
          </div>
          
          <button
            onClick={updateLead}
            className="btn btn-primary w-100"
            disabled={isLoading}
          >
            {isLoading ? 'Updating...' : 'Update Lead'}
          </button>
          <button className="btn btn-secondary mt-3" onClick={() => navigate('/lead-list')}>
            <i className="fa-solid fa-arrow-left"></i> Back to list
          </button>
        </div>
      </div>
    </div>
  );
}

export default UpdateLead;
