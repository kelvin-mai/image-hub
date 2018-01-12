// enviornment variables
require('dotenv').config();
const port = process.env.PORT,
mongoDB = process.env.DATABASE_URL;

// dependencies
const express = require('express'),
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


server.get('/', (req, res) => res.json({ message: 'Welcome'}));

server.listen(port, () => console.log(`Server started on port ${port}`));
