const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const PORT = process.env.PORT || 9000;
const { resolve } = require('path');
const session = require('express-session')
const controller = require('./backend/controller');

const app = express();

const corsOptions = {
   origin: 'http://localhost:3000',
   credentials: true,
 }
 
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: false })); 
app.use(cookieParser());
app.use(express.static(resolve(__dirname, 'client', 'dist')));
app.use(session({
   name: 'session',
   resave: false,
   saveUninitialized: false,
   secret:"stuff",
   cookie: {
      maxAge: 1000 * 60 * 60 * 2,
      sameSite: true,
      secure: false,
      httpOnly: false
   }
}))

controller(app);

app.listen(PORT, () => {
   console.log('Server running on PORT: ' + PORT);
});
