const { User } = require('../../libs/sequelize')

module.exports = {
  show(req, res, next){
    if(req.user.id == req.post.user_id || User.isAdmin(req.user.roles)){
      next()
    }else{
      res.status(401).json({ msg: 'No estas autorizado para ver esta publicacion' })
    }
  },
  update(req, res, next){
    if(req.user.id == req.post.user_id || User.isAdmin(req.user.roles)){
      next()
    }else{
      res.status(401).json({ msg: 'No estas autorizado para actualizar esta publicacion' })
    }
  },
  delete(req, res, next){
    if(req.user.id == req.post.user_id || User.isAdmin(req.user.roles)){
      next()
    }else{
      res.status(401).json({ msg: 'No estas autorizado para eliminar esta publicacion' })
    }
  }
}