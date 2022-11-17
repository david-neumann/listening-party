const express = require('express');
const spotifyRouter = express.Router();
require('dotenv').config();
const axios = require('axios');
const User = require('../models/user');
const SpotifyWebApi = require('spotify-web-api-node');

// Auth credentials for Spotify
const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const REDIRECT_URI = process.env.REDIRECT_URI;

// Generate a random string for Spotify state query param
const generateRandomString = length => {
  let string = '';
  const possible =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  for (let i = 0; i < length; i++) {
    string += possible.charAt(Math.floor(Math.random() * possible.length));
  }

  return string;
};

// GET request to redirect user to login with Spotify and generate auth code
spotifyRouter.get('/auth/login', (req, res) => {
  const scope = 'user-top-read \
    user-read-recently-played';

  const state = generateRandomString(16);

  const auth_query_parameters = new URLSearchParams({
    response_type: 'code',
    client_id: CLIENT_ID,
    scope,
    state,
    redirect_uri: REDIRECT_URI,
  });

  res.redirect(
    `https://accounts.spotify.com/authorize/?${auth_query_parameters.toString()}`
  );
});

// Auth code from previous route is exchanged for access token
spotifyRouter.post('/auth/token', (req, res) => {
  const code = req.body.code;
  const spotifyApi = new SpotifyWebApi({
    redirectUri: REDIRECT_URI,
    clientId: CLIENT_ID,
    clientSecret: CLIENT_SECRET,
  });

  spotifyApi
    .authorizationCodeGrant(code)
    .then(data =>
      res.json({
        accessToken: data.body.access_token,
        refreshToken: data.body.refresh_token,
        expiresIn: data.body.expires_in,
      })
    )
    .catch(err => console.log(err));
});

// Refreshes access token so user doesn't have to reauthenticate
spotifyRouter.post('/auth/refresh', (req, res) => {
  const refreshToken = req.body.refreshToken;
  const spotifyApi = new SpotifyWebApi({
    redirectUri: REDIRECT_URI,
    clientId: CLIENT_ID,
    clientSecret: CLIENT_SECRET,
    refreshToken,
  });

  spotifyApi
    .refreshAccessToken()
    .then(data => {
      res.json({
        accessToken: data.body.access_token,
        expiresIn: data.body.expires_in,
      });
    })
    .catch(err => console.log(err));
});

module.exports = spotifyRouter;
