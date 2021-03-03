const productService = require('../services/product.servies')

exports.getProducts = async (req, res) => res.json(await productService.findAll())

exports.getProduct = async (req, res) => {
    const result = await productService.findById(req.params.id)
    if (!result) {
        res.status(404).json()
        return
    }
    res.json(result)
}