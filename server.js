const express = require("express")
const app = express()
const cr = require("./credentials.json")
const ind = require("./mysql.js")
app.get('/', (req,res) => {
  res.send("Parameters: query,username,password. Use POST /mysql.")
},

app.post('/mysql', (req,res) => {
  let usr = req.query.username
  let pass = req.query.password
  let query = req.query.query
  function exe(query) {
  var mysql      = require('mysql');
  var connection = mysql.createConnection({
   host     : 'ip',
   user     : 'root',
   password : 'toor',
   database : 'main'
 });

 connection.connect(function(err) {
  if (err) throw err;
  console.log("Connected!"); 
  connection.query(`${query}`, function (err,results) {
      if (err) throw err;
      if(results.length > 0) {
             return results;
         } else {
             console.log('No data');
         }
  });
}
  if (usr === cr.username) {
    if (pass === cr.password) {
      let result = exe(query)
      res.send({
        result: `${result}`
      })
    } else {
      res.send("Wrong password")
      }
  } else {
    res.send("User couldn't be found")
  }
}))

app.listen(3000)
