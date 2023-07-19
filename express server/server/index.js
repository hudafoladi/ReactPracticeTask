// server/index.js
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const PORT = process.env.PORT || 3002;
const mongoString = process.env.DATABASE_URL

mongoose.connect(mongoString);
const database = mongoose.connection;

database.on('error', (error) => {
  console.log(error)
})

database.once('connected', () => {
  console.log('Database Connected');
})

const app = express(); //transfering the contents of Express into new constant 
var bodyParser = require('body-parser')
const routes = require('../routes/routes');
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())




app.use('/api', routes)
app.use(express.json()); //to accept the data in JSON format
// app.get("/api", (req, res) => {
//     res.json(mydatabase.users);
//     // { message: "Express is running!" }
//   });

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
//http://localhost:3002/api





