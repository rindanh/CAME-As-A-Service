const express = require('express');
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');

const config = require('./config/app');
const jwt = require('./utils/jwt');
const errorHandler = require('./utils/error-handler');

const port = config.port || 4500;

const app = express();

app.use(bodyParser.urlencoded({ limit: '5mb', extended: true }));
app.use(bodyParser.json({limit: '5mb'}));

app.use(cors());

app.use(function (req, res, next) {
	console.log('Time: ', new Date().
								toLocaleString());
	next()
})

app.use(jwt())

require('./utils/db')

// register endpoints
fs.readdirSync(path.join(__dirname, '/app/routes')).map(file => {
	console.log(file)
	require('./app/routes/' + file)(app);
});


// register error handler
app.use(errorHandler);


app.listen(port);
console.log('CAME Tools server started on: ' + port);