'use strict';

const { User } = require('../../../libs/sequelize')
const bcrypt = require('bcrypt')
const authConfig = require('../../../config/auth')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await User.create({
      name: "alic",
      email: "alic@mail.com",
      password: bcrypt.hashSync('alic', parseInt(authConfig.rounds)),
      posts: [{
        title: 'title 1',
        body: "body 1"
      },
      {
        title: 'title 2',
        body: "body 2"
      }
    ],
    }, {
      include: "posts"
    })

    await User.create({
      name: "david",
      email: "david@mail.com",
      password: bcrypt.hashSync('david', parseInt(authConfig.rounds)),
      posts: [{
        title: 'title 3',
        body: "body 3"
      },
      {
        title: 'title 4',
        body: "body 4"
      }
    ],
    }, {
      include: "posts"
    })

    await User.create({
      name: "pepe",
      email: "pepe@mail.com",
      password: bcrypt.hashSync('pepe', parseInt(authConfig.rounds)),
      posts: [{
        title: 'title 5',
        body: "body 5"
      },
      {
        title: 'title 6',
        body: "body 6"
      }
    ],
    }, {
      include: "posts"
    })
  },

  

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('users', null, {});
    await queryInterface.bulkDelete('posts', null, {});
  }
};
