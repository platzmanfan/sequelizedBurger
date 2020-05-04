// dependencies

var express = require("express");
var exphbs = require("express-handlebars");


// creating local port and port online at server aswell
var PORT = process.env.PORT || 8080;

// getting an express function out of the express package
var app = express();

// importing the routes from burgers_controllers
app.use(express.static("public"));



// like a body parses for the application
app.use(express.urlencoded({extended:true}));
app.use(express.json());

// handlebars

app.engine("handlebars", exphbs({defaultLayout:"main"}));
app.set("view engine" , "handlebars");

var routes = require("./controllers/burgers_controllers.js");
app.use(routes);

app.listen(PORT,function(){
    console.log("BURGER APP IS LISTENING ON PORT " + PORT);
})
