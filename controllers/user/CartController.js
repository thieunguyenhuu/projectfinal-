// const { dateTimeFilter } = require("../../helpers/filterDate");
// const { filterStatus } = require("../../helpers/filterStatus");
const models = require("../../models");
express = require('express')
const Product = models.Product;
var app = express();
app.set('view engine', 'ejs');

const getAll = async (req, res) => {
    let carts = [];

    if (req.session && req.session.cart) {
        carts = req.session.cart
        result = [];
        let total = 0;
        let count = 0
        for (const e of carts) {
            count += e.qty
            const product = await Product.findByPk(e.id);
            total += e.qty * product.price

            result.push({
                id: e.id,
                qty: e.qty,
                price: product ? product.price : "",
                image: product && product.images ? "/uploads/" + product.images[0] : "",
                name: product ? product.name : ""
            });
        }
        res.render("pages/cart", { result, count,total })
    }
    res.json({
        success: true,
        data: {
            html: "",
            count: 0
        }
    });

};
const addToCart = async (req, res) => {
    const id = req.params.id;
    let product = await Product.findByPk(id);
    if (typeof req.session.cart == "undefined") {
        req.session.cart = [];
        req.session.cart.push({
            id: id,
            qty: 1,
            price: parseFloat(product ? product.price : 0).toFixed(2),
        });
    } else {
        var cart = req.session.cart;
        var newItem = true;

        for (var i = 0; i < cart.length; i++) {
            if (cart[i].id == id) {
                cart[i].qty++;
                newItem = false;
                break;
            }
        }

        if (newItem) {
            cart.push({
                id: id,
                qty: 1,
                price: parseFloat(product.price).toFixed(2),
            });
        }
    }
    try {

        res.json({
            success: true,
        });
    } catch (e) {
        res.json({
            success: false,
            message: e,
        });
    }
}
const deleteCart = async (req, res) => {
    const id = req.params.id;
    if (typeof req.session.cart == "undefined") {

    } else {
        var cart = req.session.cart;

        for (var i = 0; i < cart.length; i++) {
            if (cart[i].id == id) {
                cart = cart.splice(i, 1);
                console.log("cart", cart)
                break;
            }
        }
    }
    res.json({
        success: true,
    });
}
module.exports = { getAll, addToCart, deleteCart };
