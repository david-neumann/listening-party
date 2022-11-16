const express = require('express');
const userRouter = express.Router();
const User = require('../models/user');

// Update user
userRouter.route('/').put((req, res, next) => {
  User.findByIdAndUpdate(
    { _id: req.auth._id },
    req.body,
    { new: true },
    (err, updatedUser) => {
      if (err) {
        res.status(500);
        return next(err);
      }

      return res.status(201).send(updatedUser.withoutPassword());
    }
  );
});

module.exports = userRouter;
