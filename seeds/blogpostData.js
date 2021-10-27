const { Blogpost } = require('../models');

const blogpostdata = [
  {
    title: 'Opening remarks',
    content: 'This is a free format tech blog.',
    user_id: 1,
  },
];

const seedBlogpost = () => Blogpost.bulkCreate(blogpostdata);

module.exports = seedBlogpost;
