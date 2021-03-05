const router = require('express').Router()
const accountController = require('../controllers/account.controller')
const jwt = require('../configs/jwt')

router.get('/role', accountController.getRoles)
router.post('/login', accountController.login)
router.post('/register', accountController.register)
router.get('/info', jwt.verifyToken, accountController.info)

module.exports = router