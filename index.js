const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();
const port = 8000;
const db = require('./config/mongoose');

//used for session cookie
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');

const MongoStore = require('connect-mongo');
const sassMiddleware = require('node-sass-middleware');
const nodeSassMiddleware = require('node-sass-middleware');

app.use(nodeSassMiddleware({
    src:'./assets/scss',
    dest:'./assets/css',
    debug:true,
    outputStyle:'extended',
    prefix:'/css'
}));

app.use(express.urlencoded());

app.use(cookieParser());

app.use(express.static('./assets'));

//set up the view enjine
app.set('view engine', 'ejs' );
app.set('View', './views');

//mongo store is used to store the session cookie in db
app.use(session({
    name:'codeial',
    //TODO change the secret before deployment in production
    secret:'blahsomething',
    saveUninitialized: false,
    resave: false,
    cookie:{
        maxAge: (1000*60*100)
    },
    store:MongoStore.create({
            mongoUrl:"mongodb://localhost:27017/codeial",
            autoRemove:'disabled'
    }, function(err){
        console.log(err || 'connect-mongodb setup ok');
    }
    )
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthenticatedUser);

//use express router
app.use('/', require('./routes'));

app.listen(port, (err) => {
    if(err){
        console.log(`error in running the server: ${error}`);
        return;
    }
    console.log(`server is ruuning on port: ${port}`);
})