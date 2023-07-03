const express = require('express')
const router = express.Router()

//middelwares
const auth = require('./middelwares/auth')

//Policies
const PostPollicy = require('./policies/PostPollicy')

//Controllers
const AuthController = require('./controllers/AuthController')
const PostController = require('./controllers/PostController')

router.get('/', (req, res) => {
  res.json({
    message: "Welcome to this project of JWT course"
  })
})

//Dos rutas: login y registro
//api/signin & /api/signup
router.post('/api/signin', AuthController.signIn)
router.post('/api/signup', AuthController.signUp)

//rutas posts
router.get('/api/posts', auth, PostController.index)
router.get('/api/posts/:id', auth, PostController.find, PostPollicy.show, PostController.show)
router.patch('/api/posts/:id', auth, PostController.find, PostPollicy.update, PostController.update)
router.delete('/api/posts/:id', auth, PostController.find,PostPollicy.delete,  PostController.delete)

module.exports = router