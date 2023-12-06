const express = require('express')
const { register, login, rating } = require('../handles/user')
const { isAuth } = require('../middelwares/isAuth.js')

const UserRoute = express.Router()

UserRoute.post('/register',register)
UserRoute.post('/login',login)

//user rate a food
UserRoute.put('/rate',isAuth,rating)


module.exports = UserRoute