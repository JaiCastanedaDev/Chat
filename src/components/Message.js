import React from 'react';

const Message = ({ message }) => {
  return (
    <div style={styles.message}>
      <p><strong>{message.user}:</strong> {message.text}</p>
    </div>
  );
};

const styles = {
  message: {
    padding: '10px',
    margin: '5px 0',
    borderRadius: '10px',
    backgroundColor: '#f1f1f1',
  },
};

export default Message;