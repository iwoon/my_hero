const router = require('express').Router()
const accountController = require('../controllers/account.controller')

router.get('/role', accountController.getRoles)
router.post('/login', accountController.login)
router.post('/register', accountController.register)

module.exports = router