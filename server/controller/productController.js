const asyncHandler = require("../middleware/asyncHandler");
const Product = require('../models/productModel');


// @desc Fetch all Products
// @route GET /api/products
// @access Public
const getProduct = asyncHandler(async (req, res) => {
    const pageSize = 3;
    const page = Number(req.query.pageNumber) || 1;
    const keyword = req.query.keyword ? {name: { $regex: req.query.keyword, $options: 'i'}} : {}
    const count = await Product.countDocuments({...keyword});
    const products = await Product.find({...keyword}).limit(pageSize).skip(pageSize * (page - 1))
    res.json({products, page, pages: Math.ceil(count / pageSize)})
})

// @desc Fetch a product
// @route GET /api/products/:id
// @access Public
const getProductById = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);
    if (product) {
        return res.json(product)
    }
    res.status(404)
    throw new Error('Product not found');
})

// @Desc Create a Product
// @route POST /api/products
// @access Private/Admin
const createProduct = asyncHandler(async (req, res) => {
    const {
        name,
        price,
        description,
        image,
        brand,
        category,
        countInStock
    } = req.body;

    const product = new Product({
        name,
        price,
        user: req.user.id,
        description,
        image,
        brand,
        category,
        countInStock,
    })

    const createdProduct = await product.save()
    if(createdProduct){
        res.status(201).json(createdProduct)
    }else{
        res.status(500);
        throw new Error("product not created")
    }
    
})

// @Desc Update a Product
// @route PUT /api/products/:id
// @access Private/Admin
const updateProduct = asyncHandler(async (req, res) => {
    const {
        name,
        price,
        description,
        image,
        brand,
        category,
        countInStock,
        featured,
        popular,
        recommended,
        subCategory
    } = req.body

    const product = await Product.findById(req.params.id)

    if(product){
        product.name = name || product.name;
        product.price = price || product.price;
        product.description = description || product.description;
        product.image = image || product.image;
        product.brand = brand || product.brand
        product.category = category || product.category;
        product.countInStock = countInStock || product.countInStock;
        product.featured = featured || product.featured;
        product.popular = popular || product.popular;
        product.recommended = recommended || product.recommended
        product.subCategory = subCategory || product.subCategory;

        const updatedProduct = await product.save()
        if(updatedProduct){
            res.status(200).json(updatedProduct);
        }else{
            res.status(500)
            throw new Error("failed to update")
        }
    }else{
        res.status(404)
        throw new Error("Product not found")
    }
})

// @Desc Delete a Product
// @route Delete /api/products/:id
// @access Private/Admin
const deleteProduct = asyncHandler(async (req, res) => {
    
    const product = await Product.findById(req.params.id)

    if(product){
        await Product.deleteOne({_id: product._id});
        res.status(200).json({message: 'Product deleted'});
    }else{
        res.status(404)
        throw new Error("Product not found")
    }
})

// @desc Create a new review
// @route POST /api/proucts/:id/reviews
// @access Private
const createProductReview = asyncHandler( async(req, res) => {
    const { rating, comment } = req.body;

    const product = await Product.findById(req.params.id);

    if(product){
        const alreadyReviewed = product.reviews.find((review) => review.user.toString() === req.user._id.toString());

        if(alreadyReviewed){
            res.status(400);
            throw new Error("Product already reviewed")
        }

        const review = {
            name: req.user.name,
            rating: Number(rating),
            comment,
            user: req.user._id
        }

        product.reviews.push(review);

        product.numReviews = product.reviews.length;

        product.rating = product.reviews.reduce((acc, review) => acc + review.rating, 0) / product.reviews.length;

        await product.save();
        res.status(201).json({message: 'Review added'});
    }else{
        res.status(404);
        throw new Error("Resource not fund")
    }
})

module.exports = {
    createProduct,
    updateProduct,
    getProduct,
    getProductById,
    deleteProduct,
    createProductReview
}