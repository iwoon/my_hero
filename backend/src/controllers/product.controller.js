const productService = require('../services/product.servies')

exports.getProducts = (req, res) => res.json(productService.findAll())

exports.getProduct = (req, res) => {
    return res.json(productService.findById(req.params.id)[0]);
}
