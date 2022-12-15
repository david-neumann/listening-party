const express = require('express');
const spotifyRouter = express.Router();
require('dotenv').config();
const axios = require('axios');

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
  const scope = 'user-read-recently-played user-read-private user-read-email';

  const state = generateRandomString(16);

  const auth_query_parameters = new URLSearchParams({
    response_type: 'code',
    client_id: CLIENT_ID,
    scope,
    state,
    redirect_uri: REDIRECT_URI,
  }).toString();

  res.redirect(
    `https://accounts.spotify.com/authorize/?${auth_query_parameters}`
  );
});

// Auth code from previous route is exchanged for access token
spotifyRouter.get('/auth/callback', (req, res) => {
  const code = req.query.code || null;

  axios({
    method: 'post',
    url: 'https://accounts.spotify.com/api/token',
    data: new URLSearchParams({
      grant_type: 'authorization_code',
      code,
      redirect_uri: REDIRECT_URI,
    }).toString(),
    headers: {
      'content-type': 'application/x-www-form-urlencoded',
      Authorization: `Basic ${new Buffer.from(
        `${CLIENT_ID}:${CLIENT_SECRET}`
      ).toString('base64')}`,
    },
  })
    .then(response => {
      if (response.status === 200) {
        const { access_token, refresh_token, expires_in } = response.data;

        const queryParams = new URLSearchParams({
          accessToken: access_token,
          refreshToken: refresh_token,
          expiresIn: expires_in,
        }).toString();

        res.redirect(`https://listening-party.onrender.com/?${queryParams}`);
      } else {
        const queryParams = new URLSearchParams({
          error: 'invalid_token',
        }).toString();
        res.redirect(`https://listening-party.onrender.com/?${queryParams}`);
      }
    })
    .catch(err => console.dir(err));
});

// Refreshes access token so user doesn't have to reauthenticate
spotifyRouter.get('/auth/refresh', (req, res) => {
  const { refresh_token } = req.query;

  axios({
    method: 'post',
    url: 'https://accounts.spotify.com/api/token',
    data: new URLSearchParams({
      grant_type: 'refresh_token',
      refresh_token,
    }).toString(),
    headers: {
      'content-type': 'application/x-www-form-urlencoded',
      Authorization: `Basic ${new Buffer.from(
        `${CLIENT_ID}:${CLIENT_SECRET}`
      ).toString('base64')}`,
    },
  })
    .then(response => res.send(response.data))
    .catch(err => console.dir(err));
});

module.exports = spotifyRouter;
