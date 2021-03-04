const router = require('express').Router()
const productController = require('../controllers/product.controller')

router.get('/', productController.getProducts)
router.get('/category', productController.getCategories)
router.get('/:id', productController.getProduct)
router.delete('/:id', productController.deleteProduct)
router.post('/', productController.addProduct)
router.put('/:id', productController.updateProduct)

module.exports = router