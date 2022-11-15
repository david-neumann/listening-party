const express = require('express');
const spotifyRouter = express.Router();
require('dotenv').config();
const axios = require('axios');
const User = require('../models/user');

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

// Axios intsance for POST request to get Spotify access token
const spotifyAxios = axios.create({
  baseURL: 'https://accounts.spotify.com/',
  headers: {
    Authorization: `Basic ${Buffer.from(
      `${CLIENT_ID}:${CLIENT_SECRET}`
    ).toString('base64')}`,
    'Content-Type': 'application/x-www-form-urlencoded',
  },
});

// Global variables to store tokens in until they are saved to database
global.spotify_access_token = '';
global.spotify_refresh_token = '';
global.spotify_expires_in = '';

// Auth code from previous route is exchanged for access token
spotifyRouter.get('/auth/callback', (req, res) => {
  const code = req.query.code;

  const form = {
    code,
    redirect_uri: REDIRECT_URI,
    grant_type: 'authorization_code',
  };

  spotifyAxios
    .post('api/token', form)
    .then(res => {
      const { access_token, refresh_token, expires_in } = res.data;
      spotify_access_token = access_token;
      spotify_refresh_token = refresh_token;
      spotify_expires_in = expires_in;
    })
    .catch(err => console.log(err));

  res.redirect('http://127.0.0.1:5173');
});

spotifyRouter.get('/auth/token', (req, res) => {
  res.json({
    access_token: spotify_access_token,
    refresh_token: spotify_refresh_token,
    expires_in: spotify_expires_in,
  });
});

module.exports = spotifyRouter;
