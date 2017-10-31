import openSocket from 'socket.io-client';
const socket = openSocket('http://webspark.herokuapp.com');

function subscribeToTimer(cb) {
    console.log(socket, "socket")
    socket.on('timer', timestamp => cb(null, timestamp));
    socket.emit('subscribeToTimer', 1000000);
}

export { subscribeToTimer };
