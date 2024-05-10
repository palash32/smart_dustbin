import React, { useState, useEffect } from 'react';
import axios from 'axios';

const User = () => {
  const channelID = 2457414;
  const readAPIKey = 'QRRCEGWG2MY1U38R';
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [newComplaint, setNewComplaint] = useState({ title: '', description: '' });

  const handleSubmit = async (event) => {
    event.preventDefault();
    const complaint = { title: newComplaint.title, description: newComplaint.description };
    await postComplaint(complaint);
    setNewComplaint({ title: '', description: '' });
    alert("Your Complaint has been successfully submitted");
    window.location.reload();
  };

  const postComplaint = async (complaint) => {
    try {
      const response = await axios.post('http://localhost:3000/user/complaint', complaint);
      console.log(response.data);
    } catch (error) {
      console.error(`Error posting complaint: ${error.message}`);
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
  }, [channelID, readAPIKey]);

  if (error) {
    return <div style={{ color: 'red' }}>Error: {error.message}</div>;
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', fontFamily: 'Arial, sans-serif' }}>
      <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem', color: 'white' }}>User Dashboard</h1>
      {data && data.map((item, index) => (
        <div key={index} style={{ marginBottom: '1rem', color: 'white' }}>
          <p>Entry ID: {item.entry_id}</p>
          <p>Created At: {new Date(item.created_at).toLocaleString()}</p>
          <p>Level: {item.field1}</p>
        </div>
      ))}
      <h2 style={{ fontSize: '1.5rem', marginBottom: '0.5rem', color: 'white' }}>Complaint Box:</h2>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '50%' }}>
        <input placeholder="Enter the title" value={newComplaint.title} onChange={(e) => setNewComplaint({...newComplaint, title: e.target.value })} style={{ padding: '5px 10px', marginBottom: '10px', width: '100%', border: 'none', borderRadius: '5px', backgroundColor: '#f2f2f2' }} />
        <textarea cols="30" rows="10" placeholder="Enter the Complaint" value={newComplaint.description} onChange={(e) => setNewComplaint({...newComplaint, description: e.target.value })} style={{ padding: '5px 10px', marginBottom: '10px', width: '100%', border: 'none', borderRadius: '5px', backgroundColor: '#f2f2f2' }}></textarea>
        <button type="submit" style={{ backgroundColor: '#4CAF50', color: 'white', padding: '5px 10px', border: 'none', cursor: 'pointer', fontSize: '1rem' }}>Submit Complaint</button>
      </form>
    </div>
  );
};

export default User;