const {  Post } = require('../../libs/sequelize')

module.exports = {
  async index(req, res){
    let posts = await Post.findAll()
    res.json(posts)
  },

  async show(req, res){
    let post = await Post.findByPk(req.params.id)

    if(!post){
      res.status(404).json({
        msg: 'post no encontrado'
      })
    }else{
      res.json(post)
    }

  },

  async update(req, res){
    let post = await Post.findByPk(req.params.id)

    if(!post){
      res.status(404).json({
        msg: 'post no encontrado'
      })
    }else{
      
      const body = req.body

      post.update(body).then(post => {
        res.json(post)
      })
    }
  },
  async delete(req, res){
    let post = await Post.findByPk(req.params.id)

    if(!post){
      res.status(404).json({
        msg: 'post no encontrado'
      })
    }else{
      post.destroy().then(post => {
        res.json(post)
      })
    }

  },

}