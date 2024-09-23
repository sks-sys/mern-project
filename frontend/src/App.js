import React, { useEffect, useState } from 'react';
import axios from 'axios';

const App = () => {
  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState('');
  const [healthStatus, setHealthStatus] = useState('');

  // Define the backend URL as a variable
  //const BACKEND_URL = 'http://localhost:5000/api'; //for docker-compose
  const BACKEND_URL = 'http://192.168.49.2:5000/api'; // Change this if needed for deployment

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await axios.get(`${BACKEND_URL}/items`);
        setItems(response.data);
      } catch (error) {
        console.error("Error fetching items:", error);
      }
    };
    fetchItems();
  }, []);

  const handleAddItem = async () => {
    try {
      const response = await axios.post(`${BACKEND_URL}/items`, { name: newItem });
      setItems([...items, response.data]);
      setNewItem('');
    } catch (error) {
      console.error("Error adding item:", error);
    }
  };

  const checkHealth = async () => {
    try {
      const response = await axios.get(`${BACKEND_URL}/health`);
      setHealthStatus(response.data.message);
    } catch (error) {
      setHealthStatus('Backend is down or MongoDB is unreachable');
      console.error("Health check error:", error);
    }
  };

  return (
    <div className="App">
      <h1>MERN Stack App</h1>
      <input
        type="text"
        value={newItem}
        onChange={(e) => setNewItem(e.target.value)}
        placeholder="Add new item"
      />
      <button onClick={handleAddItem}>Add Item</button>
      <button onClick={checkHealth}>Check Health</button>
      <p>{healthStatus}</p>
      <ul>
        {items.map(item => (
          <li key={item._id}>{item.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
