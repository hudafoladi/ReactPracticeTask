const mongoose = require('mongoose');

const usersSchema = new mongoose.Schema({
  _id: {
    required: true,
    type: Number
  },
  firstName: {
    required: true,
    type: String
  },
  lastName: {
    required: true,
    type: String
  },
  email: {
    required: true,
    type: String
  },
  password: {
    required: true,
    type: String
  },
  confirmPassword: {
    required: true,
    type: String
  }
})

module.exports = mongoose.model('Users', usersSchema)


/*const mydatabase = {
  users: [{
    "id": "1",
    "firstName": "Huda",
    "lastName": "Ali",
    "email": "huda@gmail.com",
    "password": "1234K%hu",
    "confirmPassword": "1234K%hu"
  },
  {
    "id": "2",
    "firstName": "Rida",
    "lastName": "Asim",
    "email": "rida@gmail.com",
    "password": "5678O#Ka",
    "confirmPassword": "5678O#Ka"
  },
  {
    "id": "3",
    "firstName": "Nida",
    "lastName": "Asim",
    "email": "nida@gmail.com",
    "password": "9012sS&o",
    "confirmPassword": "9012sS&o"
  }]
} */