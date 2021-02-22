require('dotenv').config();

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');

// Getting Routes
const productRoutes = require('./src/routes/product.route');
const authRoutes = require('./src/routes/auth.route');
const reviewRoutes = require('./src/routes/review.route');

// Database
const db = require("./src/config/db.config");
db.sequelize.sync();

// Middlewares
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());
app.use('/public', express.static("public"));

// Actual Routes
app.use('/', productRoutes);
app.use('/', authRoutes);
app.use('/', reviewRoutes);


const port = process.env.PORT || 8000;
app.listen(port, () => {
    console.log(`Running on http://localhost:${port}`);
})