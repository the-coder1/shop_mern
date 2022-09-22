import Product from "../../../models/Product"
import dbConnect from '../../../utils/dbConnect'
import User from "../../../models/User"
import jwt from "jsonwebtoken"

async function userAuth(req, res) {
  let token

  if (req.cookies.auth) {
    try {
      token = req.cookies.auth

      const decoded = jwt.verify(token, process.env.JWT_SECRET)

      return await User.findById(decoded.id).select("-password")
    } catch (error) {
      return null
    }
  }

  if (!token) {
    return null
  }
}

export default async function handler(req, res) {
  await dbConnect()

  const { method } = req
  const { id } = req.query
  const user = await userAuth(req, res)

  if (method === 'GET') {
    const wish = user?.desires.filter(elem => elem.toString() === id).length > 0

    if (wish) {
      res.status(200).json({ found: true });
    } else {
      res.status(404).json({ found: false });
    }
  } else if (method === 'PUT') {
    if (user) {
      user.desires.push(id)

      await user.save()

      res.status(200).json({ message: "Wish added!" })
    } else {
      res.status(401).json({ message: "You are not logged!" })
    }
  } else if (method === 'DELETE') {
    if (user) {
      user.desires = user.desires.filter(elem => elem.toString() !== id)

      await user.save()

      res.json({ message: "Wish removed!" })
    } else {
      res.status(404)
    }
  }
  res.status(400).end();
}
