const User = require('./User');
const Blogpost = require('./Blogpost');
const Comment = require('./Comment');

Blogpost.hasMany(Comment, {
  foreignKey: 'blog_id',
});

Comment.belongsTo(Blogpost, {
  foreignKey: 'blog_id',
});

module.exports = { User, Blogpost, Comment };
