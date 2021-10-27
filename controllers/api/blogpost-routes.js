const router = require('express').Router();
const { Blogpost, Comment, User } = require('../../models');

// The `/api/blogpost` endpoint

router.post('/', async (req, res) => {
  // create a new blogpost
  try {
    const blogpostData = await Blogpost.create({
      title: req.body.title,
      content: req.body.content,
      user_id: req.session.user_id
    });
    res.status(200).json(blogpostData);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.put('/:id', async (req, res) => {
  // update a blogpost by its `id` value
  try {
    const blogpostData = await Blogpost.update({
      title: req.body.title,
      content: req.body.content,
      user_id: req.body.user_id
    },
      { where: { id: req.params.id } });
    res.status(200).json(blogpostData);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.delete('/:id', async (req, res) => {
  // delete a blogpost by its `id` value
  try {
    const blogpostData = await Blogpost.destroy({
      where: { id: req.params.id }
    });
    if (!blogpostData) {
      res.status(404).json({ message: 'No blogpost with this id!' });
      return;
    }
    res.status(200).json(blogpostData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
