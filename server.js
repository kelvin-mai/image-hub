// enviornment variables
require('dotenv').config();
const port = process.env.PORT;

// dependencies
const express = require('express'),
path = require('path'),
cors = require('cors'),
bodyParser = require('body-parser'),
server = express(),
apiRoutes = require('./routes/api'),
authRoutes = require('./routes/auth');

server.use(cors());
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({extended:true}));
server.use(express.static(path.join(__dirname, 'public')));

server.use('/api', apiRoutes);
server.use('/auth', authRoutes);

server.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, './views/index.html'));
});

server.listen(port, () => console.log(`Server started on port ${port}`));
