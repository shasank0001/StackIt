import { io } from 'socket.io-client';

const socket = io('http://localhost:3000'); // Change to your backend URL in production

export default socket; 