const router = require('express').Router();

const userRoutes = require('./user-routes');
const blogpostRoutes = require('./blogpost-routes');
const commentRoutes = require('./comment-routes');

router.use('/users', userRoutes);
router.use('/blogpost', blogpostRoutes);
router.use('/comment', commentRoutes);

module.exports = router;
