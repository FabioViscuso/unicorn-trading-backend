/*
    This file contains specification for the routes used for products CRUD ops
*/

const { checkProduct } = require("../middleware");
const controller = require("../controllers/product.controller")

module.exports = function (app) {
    app.use(function (req, res, next) {
        /* res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        ); */
        next();
    });

    app.get('/api/product', controller.allProducts);
    app.post('/api/product', [checkProduct.checkIfProductExists], controller.addProduct);
    app.put('/api/product', [checkProduct.checkIfProductExists], controller.editProduct);
    app.delete('/api/product', [checkProduct.checkIfProductExists], controller.deleteProduct);
};
