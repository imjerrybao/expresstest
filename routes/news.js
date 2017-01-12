'use strict'
var mysql = require('mysql');
var async = require('async');
var models = require('../models');

var news = {}

news.index = (req,res,next) => {

  var connection = mysql.createConnection({
     host     : 'localhost',
     user     : 'root',
     password : 'password',
     database : 'dbname'
  });
  connection.connect(function(err) {
    if(err) {
      console.log(err)
    } else {
      console.log('mysql connected')
    }
  })

  async.waterfall([
    function(callback) {
      connection.query('select * from paper_news limit 5', function(err,rows) {
        // connection.end();
        // console.log(JSON.stringify(rows));
        callback(err, rows);
      });
    },
    function(rows, callback) {
      var ids = [];
      for(var i=0; i<rows.length; i++) {
        ids.push(rows[i].id);
      }
      var ids_str = ids.join(',');
      console.log(ids_str);
      var sql = 'select * from paper_news_data where id in ('+ids_str+')';
      connection.query(sql, function(err, rows1) {
        console.log(JSON.stringify(rows1));
        callback(err, rows1);
      });
    }
  ], function(err, result) {
    console.log(JSON.stringify(result));
    if(err) {
      res.send('error page')
    } else {
      res.render('index', { title: 'Express', data:result });
    }
    
  });
}

news.test = (req,res,next) => {
  async.waterfall([
      function(callback) {
        // models.News.findAll({limit: 3})
        // .then(function(news) {
        //   console.log(news)
        //   callback(null, news);
        // });
         models.sequelize.query('select * from paper_news limit 20', {
            type: models.sequelize.QueryTypes.SELECT
         }).then(function(news) {
          console.log(news)
            callback(null, news);
         });
      }
    ], function(err, result) {
      if(err) {
        res.send('error page');
      } else {
        // res.send(JSON.stringify(result));
        res.render('test', { title: 'Express', data:result });
      }
    });
}

news.aaa = (req,res,next) => {
  models.sequelize.query('select * from paper_news limit 10', {
    type: models.sequelize.QueryTypes.SELECT
  }).then(function(news) {
    console.log(news)
    // res.render('test', { title: 'Express', data:news });
    res.json(news)
  });
}

news.login = (req,res,next) => {
    res.send('you need login');
}

module.exports = news;
