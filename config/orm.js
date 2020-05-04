//dependencies
var connection = require("./connection.js");

// question marks for any table properties to insert values
function quesMarks(num) {
    var arr = [];
  
    for (var i = 0; i < num; i++) {
      arr.push("?");
    }
  
    return arr.toString();
  }
  
  function objToSql(ob) {
    var arr = [];
  
    // loop through the keys and push the key/value as a string int arr
    for (var key in ob) {
      var value = ob[key];
      // check to skip hidden properties
      if (Object.hasOwnProperty.call(ob, key)) {
        // if string with spaces, add quotations (Lana Del Grey => 'Lana Del Grey')
        if (typeof value === "string" && value.indexOf(" ") >= 0) {
          value = "'" + value + "'";
        }
        // e.g. {name: 'Lana Del Grey'} => ["name='Lana Del Grey'"]
        // e.g. {sleepy: true} => ["sleepy=true"]
        arr.push(key + "=" + value);
      }
    }
  
    // translate array of strings to a single comma-separated string
    return arr.toString();
  }
var orm = {
    selectAll:function(mysqlString,cb){
        var query = "SELECT * FROM " + mysqlString + ";";
        connection.query(query, function(err,res){
            if (err){ throw err;}
            cb(res);
        })
    },
    insertOne:function(table,col,val,cb)
    {   

        var query = "INSERT INTO " + table;
        query += " (";
        query += col.toString();
        query += ") ";
        query += "VALUES (";
        query += quesMarks(val.length);
        query += ") ";
        console.log(query);
        connection.query(query,val,function(err,res){
            if (err){ throw err;}
            
            cb(res);
        });
        // with this we setting up our future insert into creating for a new table if we want! 
        // We use ? marks because we not know how many elements are gonna be in the table and how many we need to populate!
    },
    updateOne:function(table,val,condition,cb){
        var query = "UPDATE " + table + " SET ";
        
        query += objToSql(val);
        query += " WHERE ";
        query += condition;
        console.log(query)
        connection.query(query, function (err,res){
            if (err) {throw err;}
            cb(res);
        });
    }   
};
module.exports = orm;