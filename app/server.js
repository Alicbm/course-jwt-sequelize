const express = require('express');
const app = express();
const sequelize = require('../libs/sequelize')

const port = process.env.PORT || 3000

//Middelwares
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

//routes
app.use(require('./routes'))

app.listen(port, () => {
  console.log('Running at: ' + port);

  sequelize.sync({ force: false }).then(() => {
    console.log('Connection with the DB ready...')
  }).catch(err => {
    console.log("Problems with the DB connection: " + err);
  })
}) 