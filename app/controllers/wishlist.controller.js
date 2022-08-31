/*
    This file exports what the user.routes.js file should render/send
    at the end of the middleware chain. As of now those are just placeholders
*/

const db = require("../models/index")

/* Extract Cart from models (const db) for easier referencing */
const Cart = db.cart;

exports.cartHandler = async (req, res) => {
    const product = await Cart.findOne({
        where: {
            productName: req.body.productName
        }
    })
        .catch(err => res.status(500).send({ message: err.message }))

    if (product) {
        Cart.update({
            quantity: product.quantity + 1,
        }).then(res.send({ message: "Cart successfully updated" }))
    } else {
        Cart.create()
    }
}
