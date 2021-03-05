const router = require('express').Router()

router.use('/products', (require('./product.route')))
router.use('/account', (require('./account.route')))

module.exports = router