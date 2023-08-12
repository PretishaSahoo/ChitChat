//Node Server which will handle socket io Connections
const httpServer = require('http').createServer();
const io = require('socket.io')(httpServer, {
  cors: {
    origin: "http://127.0.0.1:5500", // Change this to the URL of your client-side application
    methods: ["GET", "POST"]
  }
});

const users = {};

io.on('connection', socket => {
  socket.on('new-user-joined', name => {
    console.log("new user", name);
    users[socket.id] = name;
    socket.broadcast.emit('user-joined', name);
  });
  

  socket.on('send', message => {
    socket.broadcast.emit('recieve', { message: message, name: users[socket.id] });
  });

  socket.on('disconnect', ()=>{
    socket.broadcast.emit('leave',users[socket.id]);
    delete users[socket.id];
  });

});

const port = 8000;
httpServer.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

