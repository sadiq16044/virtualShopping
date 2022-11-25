const express = require('express');
const router = express.Router();

/*
 * Get / (Home page)
 */
router.get('/', (req, res) => {

    res.render('index');
});

/*
 * Get /test
 */
router.get('/test', (req, res) => {

    res.render('test');
});

/*
 * Get /cart
 */
router.get('/cart/test', (req, res) => {

    res.render('cart');
});


/*
 * Get /cart
 */
router.get('/cart/checkout', (req, res) => {

    res.render('test');
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
    const cart = req.app.locals.cart;
    let index = 0;
    let newItem = true;
    for (let i = 0; i < products.length; i++) {
        if (products[i].slug == data.slug) {
            index = i;
        }
    }
    if (cart.length == 0) {
        console.log("length is zero");
        cart.push({
            name: products[index].name,
            slug: products[index].slug,
            tagSid: products[index].tagSid,
            qty: 1,
        });
        sendData = {
            newProduct: true
        }
    } else {
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
                qty: 1,
            });
            sendData = {
                newProduct: true
            }
        } else {
            cart[index].qty++;
            sendData = {
                newProduct: false
            }
        }
    }
    console.log('**********************')
    console.log(req.app.locals.cart)
    console.log('**********************')
    res.send(sendData);
});

/*
 * Post /cart/add (For providing the products to make tags card according to the ID)
 */
router.post('/cart/update', (req, res) => {

    console.log('update received request');
    const data = req.body;
    let cart = req.app.locals.cart;
    switch (data.action) {
        case 'add':
            cart[data.index].qty++;
            break;
        case 'minus':
            cart[data.index].qty--;
            break;
        case 'clear':
            cart.splice(data.index, 1);
            if (cart.length == 0) {
                cart = []
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
 * Post /cart/add (For providing the products to make tags card according to the ID)
 */
router.post('/cart/checkout', (req, res) => {

    console.log('checkout received request');
    const data = req.body;
    req.app.locals.cart = [];
    res.send({
        msg: 'success',
    });
});

//export
module.exports = router;