const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const session = require('express-session');
const expressValidator = require('express-validator');
const app = express();

// set public folder as static
app.use(express.static(path.join(__dirname, '/public')))

app.use(cors());

// set the view engine to ejs
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// body parser middleware
// parse application/x www form urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

//set global variables
app.locals.errors = null;
app.locals.myName = "Sadiq Rasheed";
app.locals.user = {
    name: "Sadiq",
    username: "sadiq",
    password: "sadiq",
};
app.locals.products = [
    {
        name: "MIE SEDAAP INSTANT CUP",
        slug: "mie sedaap instant cup",
        tagSid: "",
        price: 1.00,
        qty: 0,
    },
    {
        name: "Colgate Toothbrush Twin Pack",
        slug: "colgate toothbrush twin pack",
        tagSid: "",
        price: 0.10,
        qty: 0,
    },
    {
        name: "Nivea Body Lotion Express Hydration 250ML",
        slug: "nivea body lotion express hydration 250ml",
        tagSid: "",
        price: 2.35,
        qty: 0,
    },
    {
        name: "OK Tissue Jumbo Roll 800 GM",
        slug: "ok tissue jumbo roll 800 gm",
        tagSid: "",
        price: 0.50,
        qty: 0,
    },
    {
        name: "DASANI WATER 500ML",
        slug: "dasani water 500ml",
        tagSid: "",
        price: 0.20,
        qty: 0,
    },
    {
        name: "Pepsi 1.5 LTR",
        slug: "pepsi 1.5 ltr",
        tagSid: "",
        price: 1.00,
        qty: 0,
    },
    {
        name: "7UP 1.5 LTR",
        slug: "7up 1.5 ltr",
        tagSid: "",
        price: 1.00,
        qty: 0,
    },
]; // contains name of the products
app.locals.cart = [];


// express messages middleware
app.use(require('connect-flash')());
app.use(function (req, res, next) {
    res.locals.messages = require('express-messages')(req, res);
    next();
});

//express validator middleware
app.use(expressValidator({
    errorFormatter: function (param, msg, value) {
        let namespace = param.split('.');
        let root = namespace.shift();
        let formParam = root;

        while (namespace.length) {
            formParam += `[${namespace.shift()}]`;
        }
        return {
            param: formParam,
            msg: msg,
            value: value
        };
    },
}));

//express session middleware
app.use(session({
    secret: 'keyboard cat',
    resave: true,
    saveUninitialized: true,
    //cookie: { secure: true }
}));

// passport config
require('./config/passport')(passport);

// passport middleware
app.use(passport.initialize());
app.use(passport.session());

app.get('*', function (req, res, next) {
    res.locals.cart = req.session.cart;
    res.locals.user = req.user || null;
    next();
});

//set routes
const pages = require('./routes/pages.js');

app.use('/', pages);

// app.get('/', (req, res) => {
//     res.sendFile(`${__dirname}/public/index-bundle.html`);
// });


// app.get('/index', (req, res) => {
//     let obj = {
//         name: "hero",
//         msg: "you really are a hero"
//     }
//     let name = "hello";
//     res.render('index');
// });

// app.get('/test', (req, res) => {

//     res.render('test');
// });

const port = process.env.PORT || 3003;
app.listen(port, () => {
    console.log("Application listening to port " + port);
});