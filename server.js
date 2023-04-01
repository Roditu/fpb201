//[0]
const express = require('express');
const bodyParser = require('body-parser');
const app = express ();
var routes = require('./routes');
var morgan = require('morgan');

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(morgan('dev'));

//app.use('/routes', routes)
routes(app);

//Added routes from index
app.use('/auth', require('./middleware'));//lgsg membaca index

app.listen(3000, () => {
    console.log ('server started on port');
});


/*const http = require('http');
const app = require('./app')

const port = process.env.PORT || 3000;

const server = http.createServer(app);

server.listen(port);*/