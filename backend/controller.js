const mysql = require('mysql');
const bcrypt = require('bcrypt');
const { resolve } = require('path');
const dbconfig = require('./config/db.json.config');

var connection = mysql.createConnection(dbconfig);

connection.connect(err => {
  if (err) throw err;

  console.log('MySql connected...');
});