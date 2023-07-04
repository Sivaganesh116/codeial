const express = require('express');
const app = express();
const port = 8000;
const cookieParser = require('cookie-parser');
const expressLayouts = require('express-ejs-layouts');
const bodyParser = require('body-parser');
const path = require('path');

app.use(express.static(path.join(__dirname, 'assets')));
app.use(expressLayouts);
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.json());

app.use('/', require('./routes'));
app.set('view engine', 'ejs');
app.set('views', './views');

app.listen(port, function(err){
    if (err){
        console.log(`Error in running the server: ${err}`);
    }

    console.log(`Server is running on port: ${port}`);
});
