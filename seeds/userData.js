const { User } = require('../models');

const userdata = [
  {
    username: 'admin',
    password: 'root',
  },
];

const seedUser = () => User.bulkCreate(userdata);

module.exports = seedUser;
