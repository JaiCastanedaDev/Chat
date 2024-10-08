import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import Message from './Message';
import MessageInput from './MessageInput';

const socket = io('http://localhost:3001');

const Chat = ({ token }) => {
  const [messages, setMessages] = useState([]);
  const [username, setUsername] = useState('');
  const [owner, setOwner] = useState('');
  const [connectedUsers, setConnectedUsers] = useState(0);
  const [connectedUsersList, setConnectedUsersList] = useState([]);

  useEffect(() => {
    const decodedToken = JSON.parse(atob(token.split('.')[1]));
    setUsername(decodedToken.username);

    socket.emit('join', decodedToken.username);

    const handleMessage = (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    };

    const handleUserJoined = (message) => {
      if (message && typeof message === 'string') {
        const newUser = message.split(' ')[0];
        setMessages((prevMessages) => [...prevMessages, { user: 'Sistema', text: message }]);
        setConnectedUsers((prevCount) => {
          const newCount = prevCount + 1;
          if (newCount === 1 && !owner) {
            setOwner(newUser);
          }
          return newCount;
        });
        setConnectedUsersList((prevList) => [...prevList, newUser]);
      } else {
        console.error('Invalid message format:', message);
      }
    };

    const handleUserLeft = (message) => {
      const userLeft = message.split(' ')[0];
      setMessages((prevMessages) => [...prevMessages, { user: 'Sistema', text: message }]);
      setConnectedUsers((prevCount) => {
        const newCount = prevCount - 1;
        if (newCount === 0) {
          setOwner('');
        }
        return newCount;
      });
      setConnectedUsersList((prevList) => prevList.filter((user) => user !== userLeft));
    };

    socket.on('message', handleMessage);
    socket.on('userJoined', handleUserJoined);
    socket.on('userLeft', handleUserLeft);

    return () => {
      socket.off('message', handleMessage);
      socket.off('userJoined', handleUserJoined);
      socket.off('userLeft', handleUserLeft);
    };
  }, [token, owner]);

  const sendMessage = (message) => {
    if (message.trim()) {
      socket.emit('sendMessage', message);
    }
  };

  return (
    <div style={styles.chatContainer}>
      <div style={styles.connectedUsersContainer}>
        <h3>Usuarios conectados:</h3>
        <ul>
          {connectedUsersList.map((user, index) => (
            <li key={index}>{user}</li>
          ))}
        </ul>
      </div>
      <div style={styles.messagesContainer}>
        {messages.map((msg, index) => (
          <Message key={index} message={msg} />
        ))}
      </div>
      <MessageInput sendMessage={sendMessage} />
    </div>
  );
};

const styles = {
  chatContainer: {
    display: 'flex',
    flexDirection: 'column',
    height: '100vh',
    justifyContent: 'space-between',
    padding: '20px',
    border: '1px solid #ccc',
    borderRadius: '10px',
    width: '400px',
    margin: '0 auto',
  },
  connectedUsersContainer: {
    marginBottom: '20px',
  },
  messagesContainer: {
    flex: 1,
    overflowY: 'auto',
    marginBottom: '20px',
    padding: '10px',
    border: '1px solid #ccc',
    borderRadius: '10px',
  },
  owner: {
    textAlign: 'center',
    fontWeight: 'bold',
  },
};

export default Chat;