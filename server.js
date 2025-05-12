const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

let currentQuestion = null;

app.use(express.static('public')); // Serve static files

io.on('connection', (socket) => {
    console.log('A user connected:', socket.id);

    socket.on('host-question', (question) => {
        currentQuestion = question;
        io.emit('new-question', question);
    });

    socket.on('submit-answer', ({ username, answer }) => {
        console.log(`${username} answered: ${answer}`);
        // Logic to check correctness and score can be added here
    });

    socket.on('disconnect', () => {
        console.log('User disconnected:', socket.id);
    });
});

server.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});
