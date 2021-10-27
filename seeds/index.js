const sequelize = require('../config/connection');
const seedBlogpost = require('./blogpostData');
const seedUser = require('./userData');

const seedAll = async () => {
  await sequelize.sync({ force: true });

  //await seedUser();

  //await seedBlogpost();

  process.exit(0);
};

seedAll();
