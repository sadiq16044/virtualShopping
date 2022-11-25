const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
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
app.locals.myName = "Sadiq Rasheed";
app.locals.products = [
    {
        name: "MIE SEDAAP INSTANT CUP",
        slug: "mie sedaap instant cup",
        tagSid: "",
        qty: 0,
    },
    {
        name: "Colgate Toothbrush Twin Pack",
        slug: "colgate toothbrush twin pack",
        tagSid: "",
        qty: 0,
    },
    {
        name: "Nivea Body Lotion Express Hydration 250ML",
        slug: "nivea body lotion express hydration 250ml",
        tagSid: "",
        qty: 0,
    },
    {
        name: "OK Tissue Jumbo Roll 800 GM",
        slug: "ok tissue jumbo roll 800 gm",
        tagSid: "",
        qty: 0,
    },
    {
        name: "DASANI WATER 500ML",
        slug: "dasani water 500ml",
        tagSid: "",
        qty: 0,
    },
    {
        name: "Pepsi 1.5 LTR",
        slug: "pepsi 1.5 ltr",
        tagSid: "",
        qty: 0,
    },
    {
        name: "7UP 1.5 LTR",
        slug: "7up 1.5 ltr",
        tagSid: "",
        qty: 0,
    },
]; // contains name of the products
app.locals.cart = [];

// app.get('*', function (req, res, next) {
//     res.locals.cart = req.session.cart;
//     res.locals.user = req.user || null;
//     next();
// });

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