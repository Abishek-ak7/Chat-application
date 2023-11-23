const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const sqlite3 = require('sqlite3').verbose();

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

const db = new sqlite3.Database('database.db');

db.serialize(() => {
  db.run('CREATE TABLE IF NOT EXISTS messages (id INTEGER PRIMARY KEY, username TEXT, message TEXT)');
});

app.use(express.static('public'));

io.on('connection', (socket) => {
  console.log('A user connected');

  socket.on('join', (username) => {
    socket.username = username;
    io.emit('chat message', `<strong>${username}</strong> joined the chat.`);
  });

  socket.on('chat message', (msg) => {
    const username = socket.username;
    io.emit('chat message', `<strong>${username}</strong>: ${msg}`);
    
    // Store message in the database
    db.run('INSERT INTO messages (username, message) VALUES (?, ?)', [username, msg], (err) => {
      if (err) {
        console.error('Error inserting message:', err.message);
      } else {
        console.log('Message inserted successfully');
      }
    });
  });

  socket.on('disconnect', () => {
    if (socket.username) {
      io.emit('chat message', `<strong>${socket.username}</strong> left the chat.`);
    }
  });
});

server.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});
