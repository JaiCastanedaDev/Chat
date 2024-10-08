import React, { useState } from 'react';
import axios from 'axios';

const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:3001/register', { username, password });
      alert('User registered successfully');
    } catch (error) {
      console.error('Error registering user', error);
      alert('Registration failed: ' + error.response.data.message);
    }
  };

  const styles = {
    form: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: '20px',
      border: '1px solid #ccc',
      borderRadius: '10px',
      backgroundColor: '#fff',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
      width: '100%',
    },
    input: {
      margin: '10px 0',
      padding: '10px',
      fontSize: '16px',
      width: '100%',
      borderRadius: '5px',
      border: '1px solid #ccc',
    },
    button: {
      padding: '10px 20px',
      fontSize: '16px',
      borderRadius: '5px',
      border: 'none',
      backgroundColor: '#28a745',
      color: '#fff',
      cursor: 'pointer',
      width: '100%',
    },
  };

  return (
    <form onSubmit={handleSubmit} style={styles.form}>
      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        style={styles.input}
        placeholder="Username"
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        style={styles.input}
        placeholder="Password"
      />
      <button type="submit" style={styles.button}>Register</button>
    </form>
  );
};

export default Register;