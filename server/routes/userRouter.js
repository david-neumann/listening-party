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

// Get user by id
userRouter.route('/:userId').get((req, res, next) => {
  User.find({ user: req.params.userId }, (err, userData) => {
    if (err) {
      res.status(500);
      return next(err);
    }

    return res.status(200).send(userData);
  });
});

module.exports = userRouter;
