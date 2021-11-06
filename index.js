const express = require('express');
const port = 8002;
const cookieParser = require('cookie-parser');
const app = express();
 
const db = require('./config/mongoose');

//used for session cookie
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');
const MongoStore = require('connect-mongo');

const sassMiddleware = require('node-sass-middleware');

app.use(sassMiddleware({
    src: './assets/scss',
    dest: './assets/css',
    debug: true, 
    outputStyle: 'extended',
    prefix: '/css'
}));

//set up the view engine
app.set('view engine', 'ejs');
app.set('views','./views');

//middleware     
app.use(express.urlencoded());

//middleware -> takes the session cookie and encrypts it..
app.use(session({
    name: 'sociolo',
    secret: 'blah',
    saveUninitialized: false,
    resave: false,
    cookie: {
        maxAge: (1000 * 60 * 100)
    },
    // store: MongoStore.create(            //problem with the mongoStore because of the change in the library code..
    //     {
    //         mongoUrl: db,
    //         autoRemove: 'disabled'
    //     },
    //     function(err){
    //         console.log(err || 'connect-mongodb setup ok');
    //     }
    // )
}));


app.use(passport.initialize());
app.use(passport.session());

app.use(passport.setAuthenticatedUser);

app.use('/', require('./routes'));

app.listen(port,function(err){
    if(err){
        console.log(`error in running the server: ${error} `);
    }

    console.log(`Server is up and running on port: ${port}`);
});