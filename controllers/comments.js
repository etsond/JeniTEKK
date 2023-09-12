const Comment = require("../models/comment");

module.exports = {
  createComment: async (req, res) => {
    try {
      await Comment.create({
        comment: req.body.comment,
        likes: 0,
        post: req.params.id,
        user: req.user.id
      });
      console.log("Comment has been added!");
      console.log(req.user.id)
      res.redirect("/post/" + req.params.id);
    } catch (err) {
      console.log(err);
    }
  }
};