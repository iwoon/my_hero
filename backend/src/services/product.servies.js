const Products = require('../entities/product')
const Category = require('../entities/category')

exports.findAll = async () => await Products.aggregate([
    {
        $lookup: {
            from: Category.collection.name,
            localField: 'category', // source collection
            foreignField: '_id',  // dest colection
            as: 'category'
        }
    },
    {
        $unwind: '$category'
    },
    {
        $project: {
            productId: 1,
            name: 1,
            stock: 1,
            price: 1,
            image: 1,
            _id: 0,
            "categoryName": "$category.name"
        }
    },
    {
        $sort: { productId: -1 }
    }
])

exports.findById = async id => {
    const doc = await Products.findOne(
        { productId: id },
        { create: 0, _id: 0 }
    ).populate('category');

    if(!doc){
        return doc;
    }

    const { category, ...result } = doc.toJSON();
    return { ...result, categortName: category.name }
}


