const db = require("../models");

/* Extract User and Role from models (const db) for easier referencing */
const Product = db.product;

exports.addProduct = async (req, res) => {
    // Save Product to Database
    Product.create({
        productName: req.body.productName,
        description: req.body.description,
        price: req.body.price,
    })
        .then(() => {
            res.status(200).send({ message: `Product created` })
        })
        .catch(err => {
            res.status(500).send({ message: err.message });
        });
};

exports.editProduct = async (req, res) => {
    // Edit Product in Database
    const property = req.body.property;
    const propValue = req.body.propValue;
    const product = await Product.findOne({
        where: {
            productName: req.body.productName
        }
    });

    product.update({
        [property]: propValue,
    })
        .then(() => {
            res.status(200).send({ message: `Product edited` })
        })
        .catch(err => {
            res.status(500).send({ message: err.message });
        });
};

exports.deleteProduct = async (req, res) => {
    // Delete Product in Database
    Product.destroy({
        where: {
            productName: req.body.productName
        }
    })
        .then(() => {
            res.status(200).send({ message: `Product deleted` })
        })
        .catch(err => {
            res.status(500).send({ message: err.message });
        });
};

exports.allProducts = async (req, res) => {
    Product.findAll()
        .then((products) => {
            res.status(200).send(products)
        })
        .catch(err => {
            res.status(500).send({ message: err.message });
        });
}
