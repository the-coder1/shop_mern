import Product from '../../../models/Product'
import dbConnect from '../../../utils/dbConnect'

export default async function handler(req, res) {
  await dbConnect()

  const { method } = req
  const { id } = req.query

  console.log(id)

  if (method === 'POST') {
    const { rating, comment, user } = req.body

    const product = await Product.findById(id)

    if (product) {
      const alreadyReviewed = product.reviews.find(
        (review) => review.user.toString() === user._id.toString()
      )

      if (alreadyReviewed) {
        res.status(400).json({ error: 'Product already reviewed!' })
      } else {
        const review = {
          user: user._id,
          name: user.name.first + " " + user.name.last,
          rating: Number(rating),
          comment
        }
  
        product.reviews.push(review)

        product.rating = product.reviews.reduce((acc, item) => item.rating + acc, 0) / product.reviews.length
  
        await product.save()
  
        res.status(200).json({ review: review })
      }
    } else {
      res.status(404).json({ error: "Product not found!" })
    }
  } else if (method === "DELETE") {
    const { review } = req.body
    const product = await Product.findById(id)

    if (product) {
      product.reviews = product.reviews.filter(e => e._id.toString() !== review)
      
      await product.save()

      res.status(200).json({ message: "Review removed!" })
    } else {
      res.status(404).json({ error: "Product not found!" })
    }
  }
  res.status(400).end();
}
