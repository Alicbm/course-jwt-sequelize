const { User } = require('../../libs/sequelize')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const authConfig = require('../../config/auth')

module.exports = {

  //login
  signIn(req, res) {
    let { email, password } = req.body;

    //busacr usuario
    User.findOne({
      where: {
        email: email
      }
    }).then(user => {
      if (!user) {
        res.status(404).json({ msg: 'Usuario no encontrado' })
      } else {
        //comparamos las contraseñas (la ingresada y la que tenemos en la DB)
        if (bcrypt.compareSync(password, user.password)) {

          //creamos un token
          let token = jwt.sign({ user: user }, authConfig.secret, {
            expiresIn: authConfig.expires
          })
          res.json({
            user,
            token
          })
        } else {
          res.status(401).json({ msg: 'Contaseña incorrecta' })
        }
      }

    }).catch(err => {
      res.status(500).json("Ha ocurrido un error: " + err)
    })
  },

  //registro
  signUp(req, res) {
    //Crea un usuario
    const {
      name,
      email,
      password
    } = req.body

    //encriptamos la contraseña
    let passwordHashed = bcrypt.hashSync(password, parseInt(authConfig.rounds))

    //creamos un usuario
    User.create({
      name: name,
      email: email,
      password: passwordHashed,
    }).then(user => {

      //creamos un token
      let token = jwt.sign({ user: user }, authConfig.secret, {
        expiresIn: authConfig.expires
      })

      res.json({
        user,
        token
      })
    }).catch(err => {
      res.status(500).json("Ha ocurrido un error: " + err)
    })
  }
}