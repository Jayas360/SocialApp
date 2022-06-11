const express = require('express');
const env = require('./config/environment');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const app = express();

require('./config/view-helpers')(app);
const port = 8000;
const db = require('./config/mongoose');

//used for session cookie
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');
const passportJWT = require('./config/passport-jwt-strategy');
const passportGoogle = require('./config/passport-google-oauth2-strategy');

const MongoStore = require('connect-mongo');
const sassMiddleware = require('node-sass-middleware');
const nodeSassMiddleware = require('node-sass-middleware');
const flash = require('connect-flash');
const customMware = require('./config/middleware');

//setup the chat server to be used with socket.io
const chatServer = require('http').createServer(app);
const chatSocket = require('./config/chat_sockets').chatSockets;
chatSocket(chatServer);
chatServer.listen(5000,() => {
    console.log('Chat server is listening on port 5000');
});

const path = require('path');


if(env.name == 'development'){
    app.use(nodeSassMiddleware({
        src: path.join(__dirname ,env.asset_path,'/scss'),
        dest: path.join(__dirname ,env.asset_path, '/css'),
        debug:true,
        outputStyle:'extended',
        prefix:'/css'
    }));
}

app.use(express.urlencoded({extended: false}));

app.use(cookieParser());

app.use(express.static(env.asset_path));

//make the uploads path available to the browser
app.use('/uploads', express.static(__dirname +'/uploads'));

app.use(morgan(env.morgan.mode, env.morgan.options));

//set up the view enjine
app.set('view engine', 'ejs' );
app.set('View', './views');

//mongo store is used to store the session cookie in db
app.use(session({
    name:'codeial',
    //TODO change the secret before deployment in production
    secret: env.session_cookie_key,
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

//it should be put after the session has been used because it uses session cookies
app.use(flash());
app.use(customMware.setFlash);

//use express router
app.use('/', require('./routes'));

app.listen(port, (err) => {
    if(err){
        console.log(`error in running the server: ${error}`);
        return;
    }
    console.log(`server is ruuning on port: ${port}`);
})