const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('./db');

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"]
  }
});

app.use(cors());
app.use(express.json());

const SECRET_KEY = 'clave_prueba';
app.post('/register', (req, res) => {
  const { username, password } = req.body;
  const hashedPassword = bcrypt.hashSync(password, 8);

  db.query('INSERT INTO users (username, password) VALUES (?, ?)', [username, hashedPassword], (err, result) => {
    if (err) return res.status(500).send('Error registering user');
    res.status(200).send('User registered successfully');
  });
});

app.post('/login', (req, res) => {
  const { username, password } = req.body;

  db.query('SELECT * FROM users WHERE username = ?', [username], (err, results) => {
    if (err) return res.status(500).send('Error on the server');
    if (results.length === 0) return res.status(404).send('No user found');

    const user = results[0];
    const passwordIsValid = bcrypt.compareSync(password, user.password);

    if (!passwordIsValid) return res.status(401).send({ auth: false, token: null });

    const token = jwt.sign({ id: user.id, username: user.username }, SECRET_KEY, { expiresIn: 86400 }); 
    res.status(200).send({ auth: true, token });
  });
});

io.on('connection', (socket) => {
  console.log('New client connected');

  socket.on('join', (username) => {
    if (!socket.username) {
      socket.username = username;
      io.emit('userJoined', `${username} has joined the chat`);
    }
  });

  socket.on('sendMessage', (message) => {
    io.emit('message', { user: socket.username, text: message });
  });

  socket.on('disconnect', () => {
    if (socket.username) {
      io.emit('userLeft', `${socket.username} has left the chat`);
      console.log('Client disconnected');
    }
  });
});

server.listen(3001, () => {
  console.log('Server is running on port 3001');
});