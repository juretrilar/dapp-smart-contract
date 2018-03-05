var express = require("express");
var app = express();
var router = express.Router();
var path = __dirname + '/views/';

app.use(express.static(__dirname + '/views/images')); /*folder public = url v css je brez folderja samo "logo.png"*/
app.use(express.static(__dirname + '/views/css')); /*folder public = url v css je brez folderja samo "logo.png"*/
app.use(express.static(__dirname + '/views/js')); /*folder public = url v css je brez folderja samo "logo.png"*/


router.use(function (req,res,next) {
  console.log("/" + req.method);
  next();
});

router.get("/",function(req,res){
  res.sendFile(path + "index.html");
});

router.get("/client",function(req,res){
  res.sendFile(path + "client.html");
});

router.get("/admin",function(req,res){
  res.sendFile(path + "admin.html");
});

app.use("/",router);

app.use("*",function(req,res){
  res.sendFile(path + "404.html");
});

app.listen(3000,function(){
  console.log("Live at Port 3000");
});