const {  Post } = require('../../libs/sequelize')

module.exports = {
  async index(req, res){
    let posts = await Post.findAll()
    res.json(posts)
  }
}