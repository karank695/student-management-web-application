const express = require('express');
const app = express();
require('dotenv').config();
const path = require('path');
const port = process.env.PORT;
const ejs = require('ejs');
const db = require('./config/mongoose_conn');
const session = require('express-session');
const flash = require('connect-flash');
const cookieParser = require('cookie-parser');
const cm = require('./config/cusMiddleware');
const passport = require('passport');
const LocalStrategy = require('./config/passport-local-strategy');
const MongoStore = require('connect-mongo');
//requiring ejs module layouts
var expressLayouts = require('express-ejs-layouts');
app.use(express.static('assets'));
//body-parser
app.use(express.urlencoded({
    extended: true
}));

//setting view engine
app.set('view engine', 'ejs');
app.set('views', './views');
app.set('layout', 'layouts/layout');
app.use(expressLayouts);
app.use(session({
    secret: 'newProject',
    resave: false,
    saveUninitialized: true,
    cookie: {
        maxAge: (1000 * 60 * 100)
    },
    store: MongoStore.create({
        mongoUrl: 'mongodb://localhost:27017/employee_db'
    })
}));
app.use(flash());
app.use(cm.setFlash);
app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthenticatedUser);
app.use('/', require('./routers/router'));
app.listen(8000, () => {
    console.log(`I am listening at port ${port}`);
});