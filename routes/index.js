var express = require('express');
var router = express.Router();
var fs = require('fs')
var multer = require('multer');

var storage = multer.diskStorage({
  destination : function (req, file, cb) {
    cb(null, 'public/uploads/');
  },
  filename : function (req, file, cb) {
    cb(null, Date.now()  + '.jpg');
  }
});
var upload = multer({
  storage : storage, limits: {
    fileSize: 200 * 1024
  }
}).single('avatar');


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Xin chao' });
});

router.get('/upload', function (req, res) {
  res.render('upload', {message: ''})
})

router.post('/upload', function (req, res) {
  upload(req, res, function (err) {
    if (err) {
      res.render('upload', {message: err.message})
    } else {
      res.render('upload', {message: 'Tải file thành công!!!'})
    }
  })
})

module.exports = router;
