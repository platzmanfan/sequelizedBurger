// importing the orm object called burger

var orm = require("../config/orm.js");


var burger = {
    selectAll: function(cb){
        orm.selectAll("burgers", function(result){
            cb(result);
        });
    },
    insertOne:function(col,val,cb){
        orm.insertOne("burgers", col,val, function(result){
            cb(result);
        });
    },
    updateOne:function(val,condition,cb){
        orm.updateOne("burgers",val,condition, function(result){
            cb(result);
        });
    }
}
module.exports = burger;


