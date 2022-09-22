import Product from '../../../models/Product'
import dbConnect from '../../../utils/dbConnect'

export default async function handler(req, res) {
  await dbConnect();

  const { method } = req
  const { id } = req.query

  if (method === 'GET') {
    const product = await Product.findById(id)

    if (product) {
      res.status(200).json(product)
    } else {
      res.status(404).json({ error: "Product not found!" })
    }
  } else if (method === 'POST') {
    const { user, name, line, type, category, image, ideas, uses, formats, price, stock, description, ingredients } = req.body

    const product = await Product.create({
      user: user._id,
      name,
      line,
      type,
      category,
      image,
      ideas,
      uses,
      formats,
      price,
      stock,
      description,
      ingredients
    })

    if(product) {
      res.status(201).json({
        _id: product._id,
        name: product.name,
        line: product.line,
        type: product.type,
        category: product.category,
        image: product.image,
        ideas: product.ideas,
        uses: product.uses,
        formats: product.formats,
        price: product.price,
        stock: product.stock,
        description: product.description,
        ingredients: product.ingredients
      })
    }
  } else if (method === 'PUT') {
    const { name, line, type, category, ideas, uses, formats, price, stock, description, ingredients } = req.body

    const product = await Product.findById(query.id)

    if (product) {
      product.name = name || product.name
      product.line = line || product.line
      product.type = type || product.type
      product.category = category || product.category
      product.ideas = ideas || product.ideas
      product.uses = uses || product.uses
      product.formats = formats || product.formats
      product.price = price || product.price
      product.stock = stock || product.stock
      product.description = description || product.description
      product.ingredients = ingredients || product.ingredients

      const updatedProduct = await product.save()

      res.status(200).json(updatedProduct)
    } else {
      res.status(404).json({ error: "Product not found!" })
    }
  } else if (method === 'DELETE') {
    const product = await Product.findById(id)

    if (product) {
      await product.remove()
      res.json({ message: "Product removed!" })
    } else {
      res.status(404).json({ error: "Product not found!" })
    }
  }
  res.status(400).end();
}
