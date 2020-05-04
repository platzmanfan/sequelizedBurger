
// requriring express

var express = require("express");

// requering burger.js with the mysql methods

var burger = require("../models/burger.js");


var router = express.Router();

router.get("/",function(req,res){
    burger.selectAll(function(data){
        var handlebarsObject = {
            burgers: data
        };
        // console.log(handlebarsObject);
        res.render("index", handlebarsObject);
    });
});
router.post("/api/burgers", function(req,res){
    burger.insertOne(["burger_name"],
    [req.body.burger_name], function(response){
        console.log(req.body.burger_name)
        res.json({id: response.insertId})
    });
});
router.put("/api/burgers/:id", function(req,res){
    var condition = "id = " +req.params.id;
    console.log(" + "+ condition);
    burger.updateOne({
        devoured:req.body.devoured
    },condition, function(response){
        if (response.changedRows == 0){
            return res.status(404).end();
        }
        else {
        return res.status(202).end();
        }
    });
});

module.exports = router;
