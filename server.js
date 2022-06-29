const express = require("express")
const app = express()
const mysql = require("mysql")
const cr = require("./credentials.json")
app.get('/', function (req,res) {
  res.send("Parameters: query,username,password. Use POST /mysql.")
})
let connection = mysql.createConnection({
    host     : 'creation-db.ca6wphtfe434.me-south-1.rds.amazonaws.com',
    user     : 'phone',
    password : process.env.PASS,
    database : 'main'
  });
connection.connect(function(err) {
  if (err) throw err;
  console.log("Connected!"); 
})
app.post('/mysql', function (req,res) {
  let usr = req.query.username
  let pass = req.query.password
  let reqquery = req.query.query
  if (usr === cr.username) {
    if (pass === cr.password) {
      connection.query(`${reqquery}`, function (err,resu) {
      if (err) throw err;
        let s = JSON.stringify(resul)
        res.send({
  result: `${s}`
        })})
    } else {
      res.send("Wrong password")
      }
  } else {
    res.send("User couldn't be found")
  }
  })

app.listen(3000)
