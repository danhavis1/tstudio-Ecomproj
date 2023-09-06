import Product from '../models/product.js'
import { customError } from '../config/error.js'
import data from '../sampledata.js'

//send sampledata products to mongodb

export const sendProductsToDB = async (req, res) => {
  await Product.deleteMany({})
  const products = await Product.insertMany(data.products)
  res.status(200).json(products)
}

export const getIsFeaturedProducts = async (req, res, next) => {
  try {
    const products = await Product.find({ isFeatured: true })
    if (!products) return next(customError(404, "Can't find featured products"))
    res.status(200).json(products)
  } catch (error) {
    res.status(500).json(error)
  }
}

export const getProductsByCondition = async (req, res) => {
  try {
    const newProducts = await Product.find({ condition: 'New' })
    const preOrder = await Product.find({ condition: 'Preorder' })
    res.status(200).json(newProducts.concat(preOrder))
  } catch (error) {
    res.status(500).json(error)
  }
}

export const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find()
    res.status(200).json(products)
  } catch (error) {
    res.status(500).json(error)
  }
}

export const getProductsByCategory = async (req, res) => {
  const categoryName = req.params.categoryName
  try {
    const products = await Product.find({ category: categoryName })
    res.status(200).json(products)
  } catch (error) {
    res.status(500).json(error)
  }
}

export const getOneProduct = async (req, res) => {
  const slugTitle = req.params.slugTitle
  try {
    const product = await Product.findOne({ slug: slugTitle })
    res.status(200).json(product)
  } catch (error) {
    res.status(500).json(error)
  }
}

export const searchProducts = async (req, res) => {
  const searchQuery = req.query.q
  try {
    const products = await Product.find({
      title: { $regex: searchQuery, $options: 'i' },
    })
    res.status(200).json(products)
  } catch (error) {
    res.status(500).json(error)
  }
}

export const likeProduct = async (req, res) => {
  const id = req.user.id
  const productId = req.params.productId
  try {
    await Product.findByIdAndUpdate(productId, {
      $addToSet: { likes: id },
    })
    res.status(200).json('Product liked')
  } catch (error) {
    res.status(500).json(error)
  }
} 

export const dislikeProduct = async(req, res)=> {
    const id = req.user.id
    const productId = req.params.productId
    try {
      await Product.findByIdAndUpdate(productId, {
        $pull: { likes: id },
      })
      res.status(200).json('Product disliked')
    } catch (error) {
      res.status(500).json(error)
    }
}
