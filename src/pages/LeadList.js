import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function LeadList() {
    const [leads, setLeads] = useState([]);
    const navigate = useNavigate();

    // Lead məlumatlarını çəkmək
    const fetchLeads = async () => {
        const webhookUrl = 'https://b24-szgeea.bitrix24.com/rest/1/2dxl81877341z824/crm.lead.list.json';

        const requestBody = {
            select: ['ID', 'TITLE', 'NAME', 'PHONE', 'EMAIL', 'ADDRESS', 'COMPANY_TITLE'],
        };

        try {
            const response = await fetch(webhookUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(requestBody),
            });

            const data = await response.json();
            console.log('API Response:', data);

            if (data.result) {
                setLeads(data.result);
            } else {
                alert('Error: ' + data.error_description);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    // Lead silmək
    const deleteLead = async (id) => {
        const webhookUrl = `https://b24-szgeea.bitrix24.com/rest/1/2dxl81877341z824/crm.lead.delete.json?id=${id}`;

        try {
            const response = await fetch(webhookUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
            });

            const data = await response.json();
            if (data.result) {
                alert(`Lead with ID ${id} deleted successfully.`);
                setLeads((prevLeads) => prevLeads.filter((lead) => lead.ID !== id));
            } else {
                alert('Error: ' + data.error_description);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    useEffect(() => {
        fetchLeads();
    }, []);

    const handleUpdate = (id) => {
        navigate(`/update-lead?id=${id}`);
    };

    return (
        <div>
            <h2 className='col-12 m-5 text-center'>Leads List</h2>
            <div className='container mt-5'>
                <div className='d-flex justify-content-end'>
                    <button className='btn btn-primary mb-3' onClick={() => navigate('/add-lead')}>
                        <i className='fa-solid fa-plus'></i> Add Lead
                    </button>
                </div>

                <table className='table table-bordered'>
                    <thead>
                        <tr>
                            <th scope="col">ID</th>
                            <th scope="col">Lead</th>
                            <th scope="col">Full Name</th>
                            <th scope="col">Phone Number</th>
                            <th scope="col">Email</th>
                            <th scope="col">Address</th>
                            <th scope="col">Company Name</th>
                            <th scope="col">Operations</th>
                        </tr>
                    </thead>
                    <tbody>
                        {leads.map((lead) => (
                            <tr key={lead.ID}>
                                <th scope="row">{lead.ID}</th>
                                <td>{lead.TITLE || ''}</td>
                                <td>{lead.NAME || ''}</td>
                                <td>
                                    {lead.PHONE && lead.PHONE.length > 0
                                        ? lead.PHONE.map((phone, index) => (
                                            <span key={index}>{phone.VALUE}{index < lead.PHONE.length - 1 && ', '}</span>
                                        ))
                                        : 'No Phone'}
                                </td>
                                <td>{lead.EMAIL?.[0]?.VALUE || 'No Email'}</td>
                                <td>{lead.ADDRESS || ''}</td>
                                <td>{lead.COMPANY_TITLE || ''}</td>
                                <td>
                                    <button
                                        className='btn btn-warning'
                                        onClick={() => handleUpdate(lead.ID)}
                                        style={{ marginRight: '10px' }}
                                    >
                                        Update
                                    </button>
                                    <button
                                        className='btn btn-danger'
                                        onClick={() => {
                                            if (window.confirm(`Are you sure you want to delete Lead ID ${lead.ID}?`)) {
                                                deleteLead(lead.ID);
                                            }
                                        }}
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default LeadList;
