const express = require('express');
const app = express();
const port = 8002;
const cookieParser = require('cookie-parser');
const db = require('./config/mongoose');

//used for session cookie
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');



//set up the view engine
app.set('view engine', 'ejs');
app.set('views','./views');

app.use(express.urlencoded());

app.use(session({
    name: 'sociolo',
    secret: 'blah',
    saveUninitialized: false,
    resave: false,
    cookie: {
        maxAge: (1000 * 60 * 100)
    }
}));


app.use(passport.initialize());
app.use(passport.session());

app.use('/', require('./routes'));

app.listen(port,function(err){
    if(err){
        console.log(`error in running the server: ${error} `);
    }

    console.log(`Server is up and running on port: ${port}`);
});