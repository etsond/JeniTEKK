// Purpose: Middleware for authentication and access control


module.exports = {
  ensureAuth: function (req, res, next) {
    if (req.isAuthenticated()) {
      return next();
    } else {
      res.redirect("/");
    }
  },
  ensureGuest: function (req, res, next) {
    if (!req.isAuthenticated()) {
      return next();
    } else {
      res.redirect("/playfeed");
    }
  },
  // Additional middleware for special access control
  ensureAdmin: function (req, res, next) {
    if (req.user && req.user.isAdmin) {
      return next(); // User is an admin, proceed
    } else {
      res.redirect("/"); // User does not have admin access, redirect to home page
    }
  },
  // Middleware to log requests
  logRequest: function (req, res, next) {
    console.log(`Received ${req.method} request for ${req.url}`);
    next();
  },
  
};
