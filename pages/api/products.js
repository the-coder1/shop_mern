import Product from '../../models/Product'
import dbConnect from '../../utils/dbConnect'

export default async function handler(req, res) {
  await dbConnect();

  const search = req.query.search ? {
    name: {
      $regex: req.query.search,
      $options: "i"
    },
  } : {}
  
  const products = await Product.find({ ...search })

  if (products) {
    res.status(200).json(products)
  } else {
    res.status(404);
  }
  res.status(400).end();
}
