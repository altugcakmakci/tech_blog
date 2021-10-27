const router = require('express').Router();
const { Blogpost, Comment, User } = require('../models');
const withAuth = require('../utils/auth.js')

// GET all blogposts for homepage
router.get('/', async (req, res) => {
  try {
    const dbBlogpostData = await Blogpost.findAll({
      include: [
        {
          model: User,
          attributes: [
            'username', 
          ],
        },
      ],
    });

    const blogposts = dbBlogpostData.map((blogpost) =>
      blogpost.get({ plain: true })
    );

    console.log(blogposts);
    res.render('homepage', {
      blogposts,
      loggedIn: req.session.loggedIn,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// GET one blogpost
router.get('/blogpost/:id', withAuth, async (req, res) => {
  // If the user is not logged in, redirect the user to the login page

    // If the user is logged in, allow them to view the blogpost
    try {
      const dbBlogpostData = await Blogpost.findByPk(req.params.id, {
        include: [
          {
            model: Comment,
            attributes: [
              'comment_text','created_at'
            ],
            include: [{
          model: User,
          attributes: [
            'username', 
          ],
        },],
          },
          {
          model: User,
          attributes: [
            'username', 
          ],
        },
        ],
      });
      const blogpost = dbBlogpostData.get({ plain: true });
      console.log(blogpost.comments[0].user);
      res.render('blogpost', { blogpost, loggedIn: req.session.loggedIn });
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  
});

router.get('/dashboard', withAuth, async (req, res) => {
  // If the user is not logged in, redirect the user to the login page

    // If the user is logged in, allow them to view the blogpost
    try {
      const dbBlogpostData = await Blogpost.findAll({
        where: {
          user_id: req.session.user_id
        },
        include: [
          {
            model: Comment,
            attributes: [
              'comment_text',
            ],
          },
          {
          model: User,
          attributes: [
            'username', 
          ],
        },
        ],
      });
      const blogposts = dbBlogpostData.map((blogpost) =>
      blogpost.get({ plain: true })
    );

    console.log(blogposts);
    res.render('dashboard', {
      blogposts,
      loggedIn: req.session.loggedIn,
    });
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  
});

router.get('/dashboard/new', withAuth, async (req, res) => {
  // If the user is not logged in, redirect the user to the login page

    // If the user is logged in, allow them to view the blogpost
    try {
    
    res.render('dashboard', {
      loggedIn: req.session.loggedIn,
      newPost: true,
      editPost: false
    });
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  
});

router.get('/dashboard/edit', withAuth, async (req, res) => {
  // If the user is not logged in, redirect the user to the login page

    // If the user is logged in, allow them to view the blogpost
    try {
    
    res.render('dashboard', {
      loggedIn: req.session.loggedIn,
      newPost: false,
      editPost: true
    });
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  
});

router.get('/dashpost/:id', withAuth, async (req, res) => {
  // If the user is not logged in, redirect the user to the login page

    // If the user is logged in, allow them to view the blogpost
    try {
      const dbBlogpostData = await Blogpost.findByPk(req.params.id, {
        include: [
          {
          model: User,
          attributes: [
            'username', 
          ],
        },
        ],
      });
      const blogpost = dbBlogpostData.get({ plain: true });
      console.log(blogpost);
      res.render('dashboard', { blogpost, loggedIn: req.session.loggedIn,newPost: false,
      editPost: true, id:req.params.id });
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  
});

router.get('/login', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/');
    return;
  }

  res.render('login');
});

module.exports = router;
