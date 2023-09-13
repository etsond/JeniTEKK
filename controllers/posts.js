// Import necessary modules and models
const cloudinary = require("../middleware/cloudinary");
const Post = require("../models/Post");
const User = require("../models/User");

// Define the controller functions for various routes
module.exports = {
  // Controller to get the user's profile
  getProfile: async (req, res) => {
    try {
      // Find posts by the current user
      const posts = await Post.find({ user: req.user.id });
      
      // Render the "profile.ejs" view with posts and user data
      res.render("profile.ejs", { posts: posts, user: req.user });
    } catch (err) {
      console.log(err);
    }
  },

  // Controller to get the user's recipes
  getRecipes: async (req, res) => {
    try {
      // Find posts by the current user
      const posts = await Post.find({ user: req.user.id });
      
      // Render the "my-recipes.ejs" view with posts and user data
      res.render("my-recipes.ejs", { posts: posts, user: req.user });
    } catch (err) {
      console.log(err);
    }
  },

  // Controller to get the user's bookmarks
  getBookmarks: async (req, res) => {
    try {
      // Find posts by the current user
      const posts = await Post.find({ user: req.user.id });
      
      // Render the "favorite-recipes.ejs" view with posts and user data
      res.render("favorite-recipes.ejs", { posts: posts, user: req.user });
    } catch (err) {
      console.log(err);
    }
  },

  // Controller to get the feed of all posts
  getFeed: async (req, res) => {
    try {
      // Find all posts, sorted by createdAt in descending order
      const posts = await Post.find()
        .sort({ createdAt: 'desc' })
        .lean();

      // Get the usernames of the users who created the posts
      const users = [];
      for (const post of posts) {
        const user = await User.findById(post.user);
        users.push(user.userName);
      }

      // Render the "feed.ejs" view with posts, usernames, and user data
      res.render('feed.ejs', { posts: posts, userName: users, user: req.user });
    } catch (err) {
      console.log(err);
    }
  },

  // Controller to get a specific post
  getPost: async (req, res) => {
    try {
      // Find the post by its ID
      const post = await Post.findById(req.params.id);
      
      // Render the "post.ejs" view with the post and user data
      res.render("post.ejs", { post: post, user: req.user });
    } catch (err) {
      console.log(err);
    }
  },

  // Controller to create a new post
  createPost: async (req, res) => {
    try {
      // Upload the image to Cloudinary
      const result = await cloudinary.uploader.upload(req.file.path);

      // Create a new post
      await Post.create({
        title: req.body.title,
        image: result.secure_url,
        cloudinaryId: result.public_id,
        caption: req.body.caption,
        country: req.body.country,
        dish: req.body.dish,
        ingredients: req.body.ingredients.trim().split('\n'),
        directions: req.body.directions.trim().split('\n'),
        likes: 0,
        user: req.user.id,
      });
      
      console.log("Post has been added!");
      res.redirect("/my-recipes");
    } catch (err) {
      console.log(err);
    }
  },
  
  // Controller to handle liking/unliking a post
  likePost: async (req, res) => {
    var liked = false;
    try {
      var post = await Post.findById({ _id: req.params.id });
      liked = post.likes.includes(req.user.id);
    } catch (err) {}

    // If already liked, remove the user from the likes array
    if (liked) {
      try {
        await Post.findOneAndUpdate(
          { _id: req.params.id },
          {
            $pull: { likes: req.user.id },
          }
        );
        
        console.log('Removed user from likes array');
        res.redirect('back');
      } catch (err) {
        console.log(err);
      }
    } else {
      // Else, add the user to the likes array
      try {
        await Post.findOneAndUpdate(
          { _id: req.params.id },
          {
            $addToSet: { likes: req.user.id },
          }
        );
        
        console.log('Added user to likes array');
        res.redirect(`back`);
      } catch (err) {
        console.log(err);
      }
    }
  },

  // Controller to handle bookmarking/unbookmarking a post
  bookmarkPost: async (req, res) => {
    var bookmarked = false;
    try {
      var post = await Post.findById({ _id: req.params.id });
      bookmarked = post.bookmarks.includes(req.user.id);
    } catch (err) {}

    // If already bookmarked, remove the user from the bookmarks array
    if (bookmarked) {
      try {
        await Post.findOneAndUpdate(
          { _id: req.params.id },
          {
            $pull: { bookmarks: req.user.id },
          }
        );
        
        console.log('Removed user from bookmarks array');
        res.redirect('back');
      } catch (err) {
        console.log(err);
      }
    } else {
      // Else, add the user to the bookmarks array
      try {
        await Post.findOneAndUpdate(
          { _id: req.params.id },
          {
            $addToSet: { bookmarks: req.user.id },
          }
        );
        
        console.log('Added user to bookmarks array');
        res.redirect(`back`);
      } catch (err) {
        console.log(err);
      }
    }
  },

  // Controller to delete a post
  deletePost: async (req, res) => {
    try {
      // Find the post by ID
      let post = await Post.findById({ _id: req.params.id });

      // Delete the image from Cloudinary
      await cloudinary.uploader.destroy(post.cloudinaryId);

      // Remove the post from the database
      await Post.remove({ _id: req.params.id });
      console.log("Deleted Post");
      res.redirect("/profile");
    } catch (err) {
      res.redirect("/profile");
    }
  },
};
