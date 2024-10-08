import React, { useState } from 'react';

const UsernameInput = ({ setUsername }) => {
  const [username, setUsernameState] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (username.trim()) {
      setUsername(username);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={styles.form}>
      <input
        type="text"
        value={username}
        onChange={(e) => setUsernameState(e.target.value)}
        style={styles.input}
        placeholder="Enter your username..."
      />
      <button type="submit" style={styles.button}>Join</button>
    </form>
  );
};

const styles = {
  form: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
  },
  input: {
    padding: '10px',
    borderRadius: '10px',
    border: '1px solid #ccc',
    marginRight: '10px',
  },
  button: {
    padding: '10px 20px',
    borderRadius: '10px',
    border: 'none',
    backgroundColor: '#007bff',
    color: '#fff',
    cursor: 'pointer',
  },
};

export default UsernameInput;