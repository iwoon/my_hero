const accountService = require('../services/account.service')

exports.login = async (req, res) => {

}

exports.register = async (req, res) => {
    const {
        username,
        password,
        roleId: role,
    } = req.body

    const account = {
        username,
        password,
        role,
    }

    res.status(201).json(await accountService.register(account))
}

exports.getRoles = async (req, res) => {
    const result = await accountService.roleList()
    return res.json(result.map(role => {
        return { name: role.name, roleId: role._id }
    }));
}