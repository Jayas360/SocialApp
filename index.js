const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();
const port = 8000;

const db = require('./config/mongoose');

app.use(express.urlencoded());

app.use(cookieParser());

app.use(express.static('./assets'));

//use express router
app.use('/', require('./routes'));

//set up the view enjine
app.set('view engine', 'ejs' );
app.set('View', './views');

app.listen(port, (err) => {
    if(err){
        console.log(`error in running the server: ${error}`);
        return;
    }
    console.log(`server is ruuning on port: ${port}`);
})