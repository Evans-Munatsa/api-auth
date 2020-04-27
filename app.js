const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors')
const cookieParser = require('cookie-parser');
const expressValidator = require('express-validator');


require('dotenv').config();

// import routers
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');


// App
const app = express();

// Database
mongoose.connect(process.env.DATABASE, {
	userNewUrlParser: true,
	userCreateIndex: true
}).then(() => console.log('DB Connected'))

// middleware
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(cookieParser());
// app.use(expressValidator());
app.use(cors());


// Routes Middleware
app.use("/api", authRoutes);
app.use("/api", userRoutes);


const port = process.env.PORT || 5000


app.listen(port, () => {
	console.log('Server is running on port ${port}')
})