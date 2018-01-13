// enviornment variables
require('dotenv').config();
const port = process.env.PORT,
mongoDB = process.env.DATABASE_URL;

// dependencies
const express = require('express'),
path = require('path'),
mongoose = require('mongoose'),
cors = require('cors'),
bodyParser = require('body-parser'),
server = express();

// config
mongoose.connect(mongoDB, { useMongoClient: true });
mongoose.Promise = global.Promise;
let db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error: '));
server.use(cors());
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({extended:true}));
server.use(express.static(path.join(__dirname, 'public')));


server.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, './views/index.html'));
});

server.get('/api', (req, res) => {
  res.json([{id: 1, name: 'dude'}, {id:2, name: 'bro'}]);
});

server.listen(port, () => console.log(`Server started on port ${port}`));
