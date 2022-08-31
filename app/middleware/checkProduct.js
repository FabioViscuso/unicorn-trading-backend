const db = require("../models");
const Product = db.product;

checkIfProductExists = async (req, res, next) => {
    const product = await Product.findOne({
        where: {
            productName: req.body.productName
        }
    })
        .catch((err) => {
            res.status(500).send({ message: err.message })
        })

    if (product && req.method === 'POST') {
        res.status(409).send({ message: "Error: product already exists" });
        return;
    }
    if (!product && req.method === 'POST') {
        next();
    }
    if ((product && req.method === 'PUT')) {
        next();
    }
    if ((product && req.method === 'DELETE')) {
        next();
    }
    return;
};

const checkProduct = {
    checkIfProductExists: checkIfProductExists,
};

module.exports = checkProduct;
