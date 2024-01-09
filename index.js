// index.js
const express = require('express');
const rateLimiter=require("./config/rateLimit");
const expresswinston=require("express-winston");
const winston=require("winston");
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;
app.use(rateLimiter);

// Middleware
app.use(express.json());
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(expresswinston.logger({
    transports:[
        new winston.transports.File({
            level:"info",
            filename:"logs.log",
            colorize:true
        }),
        new winston.transports.Console({
            level:"warn",
            colorize:true,
            json:true
        })
    ],
    format:winston.format.prettyPrint()
}))

// Routes
const paymentRoutes = require('./src/Routes/payment.routes');
const restaurantRoutes = require('./src/Routes/restaurant.routes');
const tableRoutes = require('./src/Routes/table.routes');
const userRoutes = require('./src/Routes/user.routes');
const menuRoutes = require('./src/Routes/menu.routes');

app.use('/api/payments', paymentRoutes);
app.use('/api/restaurants', restaurantRoutes);
app.use('/api/tables', tableRoutes);
app.use('/api/users', userRoutes);
app.use('/api/menu', menuRoutes);

app.get("/",(req,res)=>{
    res.send("<h1>Restaurant Management Api</h1>")
})

// Serve static files (if needed)
app.use(express.static(path.join(__dirname, 'public')));

console.log("running")
// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
