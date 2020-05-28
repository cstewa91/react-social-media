const mysql = require('mysql');
const bcrypt = require('bcrypt');
const {
  resolve
} = require('path');
const dbconfig = require('./config/db.json');

var connection = mysql.createConnection(dbconfig);

connection.connect(err => {
  if (err) throw err;

  console.log('MySql connected...');
});

module.exports = function (app) {
    //LOGIN
    app.post('/api/login', (req, res) => {
      if (!req.body['email'] || !req.body['password']) return res.send('Email and password required');

      const email = req.body['email'];
      const password = req.body['password'];
      const query = `SELECT id, password
                  FROM users 
                  WHERE email = ${email}`;

      connection.query(query, (err, results) => {
        if (err) {
          return res.send('Invalid username');
        } else if (results.length) {
          const hashedPassword = results[0].password;

          bcrypt.compare(password, hashedPassword, function (errObj, resultObj) {
            if (resultObj) {
              const token = createToken();
              const loginQuery = `INSERT INTO sessions 
                              SET token = '${token}', user_id ='${results[0].id}'
                              ON DUPLICATE KEY UPDATE token = '${token}'`;

              connection.query(loginQuery, (err) => {
                if (err) {
                  console.log(err);
                  return res.send('Database query error');
                }

                res.cookie('token', token, {
                  maxAge: 60 * 60 * 1000 * 1,
                  httpOnly: true
                })
                return res.send({
                  success: true
                });
              })
            } else {
              return res.send({
                success: false
              });
            }
          });
        } else {
          res.send({
            success: false
          });
        }
      });
    });

    //CREATE USER
    app.post('/api/users', (req, res) => {
      const body = req.body;
      const createQuery = `INSERT INTO users (firstname, lastname, email, password)
                            VALUES(${body['`firstname`']}, 
                                   ${body['`lastname`']}, ${body['`email`']}, ${body['`password`']})`;
  
      connection.query(createQuery, (err, results) => {
        if (err) {
          if (err.code === 'ER_DUP_ENTRY') {
            const field = err.sqlMessage.match(/(?<=key)\W*(\w+)/)[1];
            const message = `This ${field} already exists.`;
            return res.send(message);
          }
  
          console.log(err);
          return res.send('Database query error.');
        } else {
          const email = req.body['`email`'];
          const query = `SELECT id
                          FROM users
                          WHERE email = ${email}`;
  
          connection.query(query, (err, results) => {
            if (err) {
              console.log(err);
              return res.send('Database query error');
            }
  
            const token = createToken();
            const loginQuery = `INSERT INTO sessions 
                                  SET token = '${token}', user_id ='${results[0].id}'`;
  
            connection.query(loginQuery, (err) => {
              if (err) {
                console.log(err);
                return res.send('Database query error');
              }
  
              res.cookie('token', token, { maxAge: 60 * 60 * 1000 * 12, httpOnly: true })
              return res.send({ success: true });
            });
          });
        }
      });
    });


}