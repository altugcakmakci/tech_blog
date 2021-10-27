const router = require('express').Router();
const { Blogpost, Comment, User } = require('../../models');

// The `/api/blogpost` endpoint

router.get('/', async (req, res) => {
  try {
    const commentData = await Comment.findAll({
      include: [
        {
          model: User,
          attributes: [
            'username',
            'created_at',
          ],
        },
      ],
    });
    res.status(200).json(commentData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  // find one blogpost by its `id` value
  // be sure to include its associated Products
  try {
    const commentData = await Comment.findByPk(req.params.id, {
      include: [
        {
          model: Blogpost,
          attributes: [
            'title',
          ],
        },
        {
          model: User,
          attributes: [
            'username',
            'created_at',
          ],
        },
      ],
    });

    if (!commentData) {
      res.status(404).json({ message: 'No comment found with that id!' });
      return;
    }

    res.status(200).json(commentData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/', async (req, res) => {
  // create a new blogpost
  try {
    const commentData = await Comment.create({
      comment_text: req.body.comment_text,
      blog_id: req.body.blogid,
      user_id: req.session.user_id
    });
    res.status(200).json(commentData);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.put('/:id', async (req, res) => {
  // update a blogpost by its `id` value
  try {
    const commentData = await Comment.update({
      comment_text: req.body.comment_text,
      user_id: req.body.user_id
    },
      { where: { id: req.params.id } });
    res.status(200).json(commentData);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.delete('/:id', async (req, res) => {
  // delete a blogpost by its `id` value
  try {
    const commentData = await Comment.destroy({
      where: { id: req.params.id }
    });
    if (!commentData) {
      res.status(404).json({ message: 'No comment with this id!' });
      return;
    }
    res.status(200).json(commentData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
