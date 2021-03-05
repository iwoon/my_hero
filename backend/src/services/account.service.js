const Account = require('../entities/account')
const Role = require('../entities/role')
const bcrypt = require('bcryptjs')
const jwt = require('../configs/jwt')

exports.login = async (username, password) => {
    const result = await Account.findOne({ username: username }).populate('role');
    if (result) {
        if (await bcrypt.compare(password, result.password)) {
            // !!! Not Add Sensertive data
            const payload = {
                sub: result.username,
                role: result.role.name,
                addtional: 'demo',
            };
            return jwt.generateToken(payload);
        }
    }
    return '';
}

exports.register = async (account) => {
    account.password = await bcrypt.hash(account.password, 8);
    return await Account.create(account);
}

exports.roleList = async () => await Role.find({}, { created: 0 })
