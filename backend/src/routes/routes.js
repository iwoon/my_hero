const router = require('express').Router()
const jwt = require('../configs/jwt')

router.use('/products', jwt.verifyToken , (require('./product.route')))
router.use('/account', (require('./account.route')))

module.exports = router