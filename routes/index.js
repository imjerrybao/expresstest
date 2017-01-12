'use strict'

var express = require('express');
var router = express.Router();
var news = require('./news');
var authMiddleware = require('../middlewares/auth');

/* GET home page. */
router.get('/', authMiddleware({auth:true}), news.index);
router.get('/test', authMiddleware({auth:true}),  news.test);
router.get('/aaa', authMiddleware({auth:false}),  news.aaa);
router.get('/login', news.login);

module.exports = router;
