import openSocket from 'socket.io-client';
const socket = openSocket('http://localhost:3000');
console.log('above socket', socket);
function subscribeToTimer(cb) {
    console.log('socket', socket);
    socket.on('timer', timestamp => cb(null, timestamp));
    socket.emit('subscribeToTimer', 100000);
}

export { subscribeToTimer };
