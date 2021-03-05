const Account = require('../entities/account')
const Role = require('../entities/role')
const bcrypt = require('bcryptjs')

exports.login = async (username, password) => {
    await Account.find({})
}

exports.register = async (account) => {
    account.password = await bcrypt.hash(account.password, 8);
    return await Account.create(account);
}

exports.roleList = async () => await Role.find({}, { created: 0 })
