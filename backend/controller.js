const mysql = require('mysql');
const bcrypt = require('bcrypt');
const { resolve } = require('path');
const dbconfig = require('./config/db.json');

var connection = mysql.createConnection(dbconfig);

connection.connect(err => {
  if (err) throw err;

  console.log('MySql connected...');
});


module.exports = function (app) {
  app.use(getUserAccount)
  //LOGIN
  app.post('/api/login', (req, res) => {
    const email = req.body['email'];
    const password = req.body['password'];
    const query = `SELECT account, password, email FROM users WHERE email = '${email}'`;
    connection.query(query, (err, results) => {
      if(err) {
        return res.send({
          success: false
        })
      } else if(results.length > 0) {
        const hashedPassword = results[0].password;
        bcrypt.compare(password, hashedPassword, function (errObj, resultObj) {
          if (resultObj) {
            const account = results[0].account;
            const token = createToken();
            const query = `INSERT INTO sessions (account, token) VALUES('${account}','${token}') ON DUPLICATE KEY UPDATE token = '${token}'`;
            connection.query(query, (err, results) => {
              if(err) {
                return res.send(err)
              }
              res.cookie('token', token, {maxAge: 60 * 60 * 1000 * 1, httpOnly: false})
              return res.send({
                success: true
              })
            })
          } else {
            res.send({
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
  app.post('/api/users', encryptPassword, (req, res) => {
    const body = req.body;
    const firstName = body['firstname']
    const lastName = body['lastname']
    const email = body['email']
    const password = body['password']
    const createQuery = `INSERT INTO users (firstname, lastname, email, password)
                            VALUES('${firstName}', 
                                   '${lastName}', '${email}', '${password}')`;

    connection.query(createQuery, (err, results) => {
      if (err) {
        return res.send({
          success: false
        })
      } else {
        const query = `SELECT account
                          FROM users
                          WHERE email = '${email}'`;

        connection.query(query, (err, results) => {
          if(err) {
            return res.send({
              success: false
            })
          } else {
            const account = String(results[0].account)
            const token = createToken();
            const query = `INSERT INTO sessions (account, token) VALUES('${account}','${token}') ON DUPLICATE KEY UPDATE token = '${token}'`;
            connection.query(query, (err, results) => {
              if(err) {
                return res.send(err)
              }
              res.cookie('token', token, {maxAge: 60 * 60 * 1000 * 1, httpOnly: false})
              return res.send({
                success: true
              })
            })
          }
        });
      }
    });
  });

  // GET USER INFO
  app.get('/api/users', (req, res) => {
    const account = String(req.body.account);
    const query = `SELECT firstname, lastname, email FROM users where account = '${account}'`
    connection.query(query, (err, results) => {
      if(err) {
        return res.send({success: false})
      } else {
        return res.send(results)
      }
    })
  })

}

function encryptPassword(req, res, next) {
  const body = req.body;
  const saltRounds = 10;
  body['password'] = bcrypt.hashSync(body['password'], saltRounds);

  next();
}

function createToken() {
  return Math.random().toString(36).slice(2);
}

function getUserAccount(req, res, next) {
  const token = req.cookies.token;
  const query = `SELECT account FROM sessions WHERE token = '${token}'`;
  if(token) {
    connection.query(query, (err, results) => {
      if(err) {
        return res.send(err);
      } else {
        req.body.account = results[0].account;
        return next();
      }
    })
  }
}


