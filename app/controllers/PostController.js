const { Post } = require('../../libs/sequelize')

module.exports = {
  async find(req, res, next) {
    let post = await Post.findByPk(req.params.id)
    if (!post) {
      res.status(404).json({
        msg: 'post no encontrado'
      })
    } else {
      req.post = post
      next()
    }
  },

  async index(req, res) {
    let posts = await Post.findAll()
    res.json(posts)
  },

  async show(req, res) {
    res.json(req.post)
  },

  async update(req, res) {
    const body = req.body
    req.post.update(body).then(post => {
      res.json(post)
    })
  },

  async delete(req, res) {
    req.post.destroy().then(post => {
      res.json(post)
    })
  },
}