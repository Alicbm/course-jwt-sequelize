const jwt = require('jsonwebtoken')
const authConfig = require('../../config/auth')

//middelware para proteger las rutas

module.exports = (req, res, next) => {
  console.log(req.headers);

  //comprobar que existe el token
  if(!req.headers.authorization){
    res.status(401).json({
      msg: 'No estas autoridado'
    })
  }else{
    
    //comprobar la validez de este token
    let token = req.headers.authorization.split(" ")[1]
    jwt.verify(token, authConfig.secret, (err, decoded) => {
      //el decoded es el usuario en formato de objeto

      if(err){
        res.status(500).json({
          msg: err
        })
      }else{
        req.user = decoded
        next()
      }
    })
  }

}






