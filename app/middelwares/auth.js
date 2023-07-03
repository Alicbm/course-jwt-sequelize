const jwt = require('jsonwebtoken')
const authConfig = require('../../config/auth')
const { User } = require('../../libs/sequelize')

//middelware para proteger las rutas

module.exports = (req, res, next) => {
  // console.log(req.headers);

  //comprobar que existe el token
  if(!req.headers.authorization){
    res.status(401).json({
      msg: 'No estas autoridado'
    })
  }else{
    
    //comprobar la validez de este token
    //se aplica split porque la authorization trae dos "textos", Bearer y el token, ambos separados por un espacio
    //ej: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjksInJvbGUiOiJhZG1pbiIsImlhdCI6MTY4MTcwMDQzM30.ydY-tC9wvYwxCpoLXsZ5upgr31KNUBs14N9VtINao4w'
    let token = req.headers.authorization.split(" ")[1]
    jwt.verify(token, authConfig.secret, (err, decoded) => {
      //el decoded es el usuario en formato de objeto

      if(err){
        res.status(500).json({
          msg: err
        })
      }else{
        
        User.findByPk(decoded.user.id, { include: 'roles' }).then(user => {
          // console.log(user.roles);
          req.user = user;
          next()
        })

      }
    })
  }

}






