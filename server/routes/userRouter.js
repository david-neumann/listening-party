const express = require('express');
const userRouter = express.Router();
const User = require('../models/user');

// Get all users
userRouter.get('/', (req, res, next) => {
  User.find((err, users) => {
    if (err) {
      res.status(500);
      return next(err);
    }
    const usersWithoutPasswords = users.map(user => user.withoutPassword());

    return res.status(200).send(usersWithoutPasswords);
  });
});

// Update user
userRouter.put('/edit', (req, res, next) => {
  User.findOneAndUpdate(
    { _id: req.auth._id },
    { $set: req.body },
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

// Update password
userRouter.put('/edit/password', async (req, res, next) => {
  const user = await User.findOne({ _id: req.auth._id });
  console.log(req.body);
  user.password = req.body.password;
  console.log(user.password);
  user.save((err, savedUser) => {
    if (err) {
      res.status(500);
      return next(err);
    }

    return res
      .status(201)
      .send(`Password for ${savedUser.username} updated successfully.`);
  });
});

// Search for users
userRouter.get('/search', (req, res, next) => {
  User.find(
    { $text: { $search: req.query.q } },
    { sort: { score: { $meta: 'textScore' } } },
    (err, foundUsers) => {
      if (err) {
        res.status(500);
        return next(err);
      }
      const foundUsersWithoutPasswords = foundUsers.map(user =>
        user.withoutPassword()
      );

      return res.status(200).send(foundUsersWithoutPasswords);
    }
  );
});

// Follow a user
userRouter.put('/follow/:followedUserId', (req, res, next) => {
  User.findOneAndUpdate(
    { _id: req.auth._id },
    { $addToSet: { following: req.params.followedUserId } },
    { new: true },
    (err, updatedUser) => {
      if (err) {
        res.status(500);
        return next(err);
      }

      User.findOneAndUpdate(
        { _id: req.params.followedUserId },
        { $addToSet: { followers: req.auth._id } },
        (err, updatedUser) => {
          if (err) {
            res.status(500);
            return next(err);
          }
        }
      );

      res.status(201).send(updatedUser);
    }
  );
});

// Unfollow a user
userRouter.put('/unfollow/:unfollowedUserId', (req, res, next) => {
  User.findOneAndUpdate(
    { _id: req.auth._id },
    { $pull: { following: req.params.unfollowedUserId } },
    { new: true },
    (err, updatedUser) => {
      if (err) {
        res.status(500);
        return next(err);
      }

      User.findOneAndUpdate(
        { _id: req.params.unfollowedUserId },
        { $pull: { followers: req.auth._id } },
        (err, updatedUser) => {
          if (err) {
            res.status(500);
            return next(err);
          }
        }
      );

      res.status(201).send(updatedUser);
    }
  );
});

module.exports = userRouter;
