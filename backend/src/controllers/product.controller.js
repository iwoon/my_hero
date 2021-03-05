const productService = require('../services/product.service')
const multer = require('multer')
const multerConfig = require('../configs/multer')
const upload = multer(multerConfig.config).single(multerConfig.keyUpload)

exports.getProducts = async (req, res) => res.json(await productService.findAll())

exports.getProduct = async (req, res) => {
    const result = await productService.findById(req.params.id)
    if (!result) {
        res.status(404).json()
        return
    }
    res.json(result)
}

exports.addProduct = (req, res) => {
    upload(req, res, async (error) => {
        if (error) {
            console.log(`error: ${JSON.stringify(error)}`)
            res.status(400).json(error.message)
            return
        }
        const {
            name,
            stock,
            price,
            categoryId: category,
        } = req.body

        const product = {
            name,
            stock,
            price,
            category,
            image: req.file ? req.file.filename : ""
        }
        res.status(201).json(await productService.add(product))
    })
}


exports.updateProduct = (req, res) => {
    upload(req, res, async (error) => {
        if (error) {
            console.log(`error: ${JSON.stringify(error)}`)
            res.status(500).json({ message: error.message })
            return
        }

        const {
            name,
            stock,
            price,
            categoryId: category,
        } = req.body

        let product = {
            name,
            stock,
            price,
            category
        }

        if (req.file) {
            product = {
                ...product,
                image: req.file.filename
            }
        }

        const result = await productService.update(req.params.id, product)
        if (!result) {
            res.status(404).json()
            return
        }
        res.status(204).json()
    })
}


exports.deleteProduct = async (req, res) => {
    if(req.role !== 'Admin'){
        res.status(403).json();
        return;
    }
    const result = await productService.delete(req.params.id)
    if (!result) {
        res.status(404).json()
        return
    }
    res.status(204).json()
}

exports.getCategories = async (req, res) => {
    const result = await productService.categoryList()
    return res.json(result.map(category => {
        return { name: category.name, categoryId: category._id }
    }));
}