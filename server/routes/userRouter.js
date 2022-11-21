const express = require('express');
const userRouter = express.Router();
const User = require('../models/user');

// Search for users
userRouter.get('/search', (req, res, next) => {
  // User.createIndex({ username: 'text' });
  User.find(
    { $text: { $search: req.query.q } },
    { sort: { score: { $meta: 'textScore' } } },
    (err, foundUsers) => {
      if (err) {
        res.status(500);
        return next(err);
      }

      return res.status(200).send(foundUsers);
    }
  );
});

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
