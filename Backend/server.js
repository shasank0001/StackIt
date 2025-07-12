import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import cors from 'cors';
import authRoutes from './routes/authRoutes.js';
import userRoutes from './routes/userRoutes.js';
import questionRoutes from './routes/questionRoutes.js';
import answerRoutes from './routes/answerRoutes.js';
import tagRoutes from './routes/tagRoutes.js';
import notificationRoutes from './routes/notificationRoutes.js';
import { testConnection } from './Database/connection.js';
import dotenv from 'dotenv';

dotenv.config();

testConnection();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors({
  origin: 'http://localhost:5173', // Change to your frontend URL in production
  credentials: true
}));

const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: '*', // Change to your frontend URL in production
        methods: ['GET', 'POST']
    }
});

// Make io accessible in controllers via req.app.get('io')
app.set('io', io);

// Socket.io connection logic
io.on('connection', (socket) => {
    console.log('A user connected:', socket.id);

    // Listen for the user joining their room
    socket.on('join', (userId) => {
        socket.join(userId);
        console.log(`User ${userId} joined their room`);
    });

    socket.on('disconnect', () => {
        console.log('User disconnected:', socket.id);
    });
});

// Middleware
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/questions', questionRoutes);
app.use('/api/answers', answerRoutes);
app.use('/api/tags', tagRoutes);
app.use('/api/notifications', notificationRoutes);

// Default route
app.get('/', (req, res) => {
    res.send('StackIt Q&A Forum API is running');
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ success: false, message: 'Server Error' });
});

server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
