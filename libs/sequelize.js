const { Sequelize, DataTypes } = require('sequelize')
const { config } = require('../config/config')

const USER = encodeURIComponent(config.dbUser)
const PASSWORD = encodeURIComponent(config.dbPassword)
const URI = `mysql://${USER}:${PASSWORD}@${config.dbHost}:${config.dbPort}/${config.dbName}`

const sequelize = new Sequelize(URI, {
  dialect: 'mysql',
  logging: console.log
})

sequelize.User = require('../app/models/User')(sequelize, DataTypes)

module.exports = sequelize