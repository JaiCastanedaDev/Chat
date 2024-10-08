import React, { useState } from 'react';
import Chat from './components/Chat';
import Login from './components/Login';
import Register from './components/Register';

function App() {
  const [token, setToken] = useState('');

  const styles = {
    container: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
      backgroundColor: '#f0f2f5',
    },
    formContainer: {
      display: 'flex',
      justifyContent: 'space-around',
      width: '80%',
    },
    formSection: {
      width: '45%',
    },
  };

  if (!token) {
    return (
      <div style={styles.container}>
        <div style={styles.formContainer}>
          <div style={styles.formSection}>
            <h1>Login</h1>
            <Login setToken={setToken} />
          </div>
          <div style={styles.formSection}>
            <h1>Register</h1>
            <Register />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="App">
      <header className="App-header">
      </header>
      <Chat token={token} />
    </div>
  );
}

export default App;