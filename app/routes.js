const express = require('express')
const router = express.Router()

//Controllers
const AuthController = require('./controllers/AuthController')

router.get('/', (req, res) => {
  res.json({
    message: "Welcome to this project of JWT course"
  })
})

//Dos rutas: login y registro
//api/signin & /api/signup
router.post('/api/signin', AuthController.signIn)
router.post('/api/signup', AuthController.signUp)

module.exports = router