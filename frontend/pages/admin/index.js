import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Admin = () => {
  const channelID = 2457414;
  const readAPIKey = 'QRRCEGWG2MY1U38R';
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [complaints, setComplaints] = useState([]);

  const getComplaints = async () => {
    try {
      const response = await axios.get('http://localhost:3000/admin/complaints');
      setComplaints(response.data);
    } catch (error) {
      console.error(`Error fetching complaints: ${error.message}`);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`https://api.thingspeak.com/channels/${channelID}/feeds.json?api_key=${readAPIKey}&results=2`);
        setData(response.data.feeds);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchData();
    getComplaints();
  }, [channelID, readAPIKey]);

  if (error) {
    return <div style={{ color: 'red' }}>Error: {error.message}</div>;
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', fontFamily: 'Arial, sans-serif' }}>
      <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem', color: 'white' }}>Admin Dashboard</h1>
      <h2 style={{ fontSize: '1.5rem', marginBottom: '0.5rem', color: 'white' }}>User Stats:</h2>
      {data && data.map((item, index) => (
        <div key={index} style={{ marginBottom: '1rem', color: 'white' }}>
          <p>Entry ID: {item.entry_id}</p>
          <p>Created At: {new Date(item.created_at).toLocaleString()}</p>
          <p>Level: {item.field1}</p>
        </div>
      ))}
      <h2 style={{ fontSize: '1.5rem', marginBottom: '0.5rem', color: 'white' }}>Complaints:</h2>
      <table style={{ borderCollapse: 'collapse', width: '100%', color: 'white' }}>
        <thead>
          <tr>
            <th style={{ textAlign: 'left', padding: '8px', color: 'white' }}>Title</th>
            <th style={{ textAlign: 'left', padding: '8px', color: 'white' }}>Description</th>
            <th style={{ textAlign: 'left', padding: '8px', color: 'white' }}>Created At</th>
            <th style={{ textAlign: 'left', padding: '8px', color: 'white' }}>Resolve</th>
          </tr>
        </thead>
        <tbody>
          {complaints && complaints.map((item, index) => (
            <tr key={index} style={{ backgroundColor: index % 2 === 0? '#f2f2f2' : 'white' }}>
              <td style={{ padding: '8px', color: 'black' }}>{item.title}</td>
              <td style={{ padding: '8px', color: 'black' }}>{item.description}</td>
              <td style={{ padding: '8px', color: 'black' }}>{item.createdAt}</td>
              <td style={{ padding: '8px', color: 'black' }}><button style={{ backgroundColor: '#4CAF50', color: 'white', padding: '5px 10px', border: 'none', cursor: 'pointer', fontSize: '1rem' }}>Resolve</button></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Admin;