const express = require('express'),
server = express();

port = process.env.PORT || 3000;

server.get('/', (req, res) => res.send('Testing'));

server.listen(port, () => console.log(`Server started on port ${port}`));
