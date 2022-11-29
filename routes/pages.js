const express = require('express');
const passport = require('passport');
const router = express.Router();

/*
 * Get / (Home page)
 */
router.get('/', (req, res) => {

    console.log(req.isAuthenticated());
    res.render('index', {
        cart: req.session.cart,
        loggedIn: req.isAuthenticated()
    });
});

/*
 * Get /test
 */
router.get('/test', (req, res) => {

    res.render('test', {
        cart: req.session.cart,
        loggedIn: req.isAuthenticated()
    });
});

/*
 * Get login page
 */
router.get('/users/login', (req, res) => {

    // req.flash('success', "Hello from login page")
    if (res.locals.user) {
        res.redirect('/')
    } else {
        res.render('login', {
            cart: req.session.cart,
            loggedIn: req.isAuthenticated()
        });
    };

});


/*
 * Post login page
 */
router.post('/users/login', (req, res, next) => {

    let username = req.body.username;
    let password = req.body.password;
    console.log("Login post function");

    req.checkBody('username', 'Username is required').notEmpty();
    req.checkBody('password', 'Password is required').notEmpty();

    let errors = req.validationErrors();
    console.log(errors);

    if (errors) {
        res.render('login', {
            errors: errors,
            cart: req.session.cart,
            loggedIn: req.isAuthenticated()
        })
    } else {
        passport.authenticate('local', {
            successRedirect: '/',
            failureRedirect: '/users/login',
            failureFlash: true,
            failureMessage: true
        })(req, res, next);
    }
});


/*
 * Get logout
 */
router.get('/users/logout', (req, res) => {

    req.logout(function (err) {
        if (err) { return next(err); }
        delete req.session.cart;

        req.flash('success', 'You are logged out');
        res.redirect('/users/login');
    });
});

/*
 * Get /cart
 */
router.get('/cart/test', (req, res) => {

    res.render('cart', {
        cart: req.session.cart,
        loggedIn: req.isAuthenticated()
    });
});


/*
 * Get /cart
 */
router.get('/cart/checkout', (req, res) => {

    res.render('thanks', {
        cart: req.session.cart,
        loggedIn: req.isAuthenticated()
    });
});

/*
 * Post /data-provider (For providing the products to make tags card according to the ID)
 */
router.post('/data-provider', (req, res) => {

    console.log('received request');
    console.log(req.body);
    res.send(req.app.locals.products);
});

/*
 * Post /cart/add (For providing the products to make tags card according to the ID)
 */
router.post('/cart/add', (req, res) => {

    console.log('received request');
    let sendData;
    const data = req.body;
    const products = req.app.locals.products;
    let index = 0;
    let newItem = true;
    console.log(data)
    for (let i = 0; i < products.length; i++) {
        if (products[i].slug == data.slug) {
            index = i;
        }
    }
    if (typeof req.session.cart == 'undefined') {
        req.session.cart = [];
        console.log("length is zero");
        req.session.cart.push({
            name: products[index].name,
            slug: products[index].slug,
            tagSid: products[index].tagSid,
            price: products[index].price,
            total: products[index].price,
            qty: 1,
        });
        sendData = {
            newProduct: true
        }
    } else {

        const cart = req.session.cart;
        for (let i = 0; i < cart.length; i++) {
            if (cart[i].slug == data.slug) {
                console.log("existing item");
                newItem = false; // product already exists
                index = i;
                break;
            }
        }
        if (newItem) {
            console.log("new item");
            cart.push({
                name: products[index].name,
                slug: products[index].slug,
                tagSid: products[index].tagSid,
                price: products[index].price,
                qty: 1,
            });
            cart[0].total += products[index].price;
            sendData = {
                newProduct: true
            }
        } else {
            cart[index].qty++;
            cart[0].total += cart[index].price;
            sendData = {
                newProduct: false
            }
        }
    }
    console.log('**********************')
    console.log(typeof req.session.cart)
    console.log('**********************')
    res.send(sendData);
});

/*
 * Post /cart/update
 */
router.post('/cart/update', (req, res) => {

    console.log('update received request');
    const data = req.body;
    let cart = req.session.cart;
    switch (data.action) {
        case 'add':
            cart[data.index].qty++;
            cart[0].total += cart[data.index].price;
            break;
        case 'minus':
            cart[data.index].qty--;
            cart[0].total -= cart[data.index].price;
            break;
        case 'clear':
            if (data.index == 0 && cart.length > 1) {
                cart[1].total = cart[0].total - cart[data.index].price; // removing price of that product from total
            } else {
                cart[0].total -= cart[data.index].price; // removing price of that product from total
            }
            cart.splice(data.index, 1);
            console.log(cart[0]);
            if (cart.length == 0) { // don't delete cart because you need 0 as a length for html page 
                delete req.session.cart;
            }
            break;
        default:
            console.log('update problem');
            break;
    }
    res.send({
        cartLength: cart.length,
        msg: "Success",
    });
});

/*
 * Post /cart/checkout
 */
router.post('/cart/checkout', (req, res) => {

    console.log('checkout received request');
    const data = req.body;
    delete req.session.cart;
    res.send({
        msg: 'success',
    });
});

/*
 * get login status
 */
router.get('/login/status/yes', (req, res) => {

    console.log('sending login status');
    res.send({
        status: req.isAuthenticated(),
    });
});
//export
module.exports = router;