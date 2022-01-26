const express = require('express');
const bodyParser = require('body-parser');
const connectDB = require('./config/db');
require('dotenv').config();

const app = express();

connectDB();

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api/auth/usuarios', require('./routes/authUsuarios'));
app.use('/api/auth/empleados', require('./routes/authEmpleados'));
app.use('/api/auth/admin', require('./routes/authAdmin'));
app.use('/api/vuelos', require('./routes/vuelos'));
app.use('/api/reservaciones', require('./routes/reservaciones'));
app.use('/api/boletos', require('./routes/boletos'));

app.listen(process.env.PORT || 5001, () => {
	console.log(`Server Running on ${process.env.PORT}...`);
});
