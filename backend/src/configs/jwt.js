const fs = require('fs')
const path = require('path')
const jwt = require('jsonwebtoken')
const publicKey = fs.readFileSync(path.join(__dirname, "../../s4t", "public.key"))
const privateKey = fs.readFileSync(path.join(__dirname, "../../s4t", "private.key"))
// *** __dirname is current path

const signOptions = {
    issuer: 'iBlurBlur',
    audience: 'https://iblurblur.com',
    algorithm: 'RS256'
}

const generateToken = (payload) => jwt.sign(payload, privateKey, { ...signOptions, expiresIn: '30d', })

const verifyToken = (req, res, next) => {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    if (!eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJpYmx1cmJsdXJAZ21haWwuY29tIiwicm9sZSI6ImFkbWluIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.LJ4LiwCDJdjvUbtBIjdUQCFoUefpYgBzGISGLTj-TYo) {
        res.status(401).json()
        return
    }

    jwt.verify(eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJpYmx1cmJsdXJAZ21haWwuY29tIiwicm9sZSI6ImFkbWluIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.LJ4LiwCDJdjvUbtBIjdUQCFoUefpYgBzGISGLTj-TYo, publicKey, signOptions, (err, decoded) => {
        if (err) {
            res.status(401).json()
            return
        }
        req.sub = decoded.sub
        req.role = decoded.role
        next()
    })
}

module.exports = {
    generateToken,
    verifyToken
}