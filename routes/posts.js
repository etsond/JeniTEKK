
// module.exports = router

const cloudinary = require("../middleware/cloudinary");
const Post = require("../models/Post");
const User = require("../models/User");

module.exports = {
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
