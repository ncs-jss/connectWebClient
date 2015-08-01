var express = require('express');
var router = express.Router();
var request = require('superagent');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

router.get('/dashboard', function(req, res, next) {
  res.render('dashboard');
});

router.post('/auth', function(req, res, next) {
   var user = {
        username : req.body.username,
        password : req.body.password
   }
   console.log(JSON.stringify(user));
   if(user.username === '' && user.password === ''){
        res.status(400).send({error:true,msg:"Please fill all the details"});
   }else{
    request
      .post('http://54.173.150.90:8000/token/')
      .send(user)
      .set('Accept', 'application/json')
      .end(function(error, response){
          if(response === undefined)
            res.status(500).send({error:true,msg:"Unable to connect to server"});
          else
            res.status(response.status).send(response.text);
      });
   }
});

module.exports = router;
