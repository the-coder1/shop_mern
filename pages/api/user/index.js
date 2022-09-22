import User from "../../../models/User"
import dbConnect from "../../../utils/dbConnect"
import bcrypt from "bcryptjs"
import { generateToken } from "../../../utils/generateToken"
import jwt from "jsonwebtoken"
import cookie from "cookie"

async function userAuth(req, res) {
  let token

  if (req.cookies.auth) {
    try {
      token = req.cookies.auth

      const decoded = jwt.verify(token, process.env.JWT_SECRET)

      req.user = await User.findById(decoded.id).select("-password")
    } catch (error) {
      res.status(401).json({ auth: "Not authorized, token failed!" })
    }
  }

  if (!token) {
    res.status(401).json({ auth: "Not authorized, no token!" })
  }
}

export default async function handler(req, res) {
  await dbConnect() 

  const { method } = req

  if (method === "GET") {
    await userAuth(req, res) 
    if (req.user) {
      const user = await User.findById(req.user._id)

      if (user) {
        res.status(200).json(user)
      }
    }
  } else if (method === "POST") {
    const { name, email, phone, password } = req.body

    const userExists = await User.findOne({ email })

    if (name) {
      if (userExists) {
        res.status(400).json({ error: "User already exists!" })
      } else {
        const hash = await bcrypt.hash(password, 10)
  
        const user = await User.create({
          name: {
            first: name.first,
            last: name.last
          },
          email,
          phone,
          password: hash
        })
    
        if(user) {
          res.setHeader('Set-Cookie', cookie.serialize("auth", generateToken(user._id), {
            httpOnly: true,
            secure: false,
            sameSite: 'strict',
            maxAge: 60 * 60 * 24 * 30,
            path: '/'
          }))
          res.status(201).json({ message: "Welcome!" })
        } else {
          res.status(400).json({ error: "Invalid user data!" })
        }
      }
    } else {
      if (userExists) {
        const validPass = await bcrypt.compare(password, userExists.password)
  
        if (validPass) {
          res.setHeader('Set-Cookie', cookie.serialize("auth", generateToken(userExists._id), {
            httpOnly: true,
            secure: false,
            sameSite: 'strict',
            maxAge: 60 * 60 * 24 * 30,
            path: '/'
          }))
          res.status(200).json({ message: "Welcome back!" })
        } else {
          res.status(401).json({ error: "Passwords don't match!" })
        }
      } else {
        res.status(404).json({ error: "User not found!" })
      }
    }
  } else if (method === "PUT") {
    await userAuth(req, res) 
    const { name, email, phone, oldPassword, newPassword } = req.body

    const user = await User.findById(req.user._id.toString())

    if (email) {
      const userExists = await User.findOne({ email })

      if (userExists) {
        if (name || phone) {
          user.name = {
            first: name.first || user.name.first,
            last: name.last || user.name.last
          }
          user.email = email || user.email
          user.phone = phone || user.phone
    
          const updatedUser = await user.save()
    
          res.setHeader('Set-Cookie', cookie.serialize("auth", generateToken(updatedUser._id), {
            httpOnly: true,
            secure: false,
            sameSite: 'strict',
            maxAge: 60 * 60 * 24 * 30,
            path: '/'
          }))
          res.status(200).json({ message: "Your account has updated!" })
        }
      } else {
        res.status(400).json({ error: "User already exists!" })
      }
    }

    if (oldPassword) {
      const validPass = await bcrypt.compare(oldPassword, user.password)

      if (validPass) {
        if (oldPassword !== newPassword) {
          const hash = await bcrypt.hash(newPassword, 10)
          user.password = hash

          const updatedPass = await user.save()

          res.setHeader('Set-Cookie', cookie.serialize("auth", generateToken(updatedPass._id), {
            httpOnly: true,
            secure: false,
            sameSite: 'strict',
            maxAge: 60 * 60 * 24 * 30,
            path: '/'
          }))
          res.status(200).json({ message: "Your password has updated!" })
        } else {
          res.status(401).json({ error: "Your new password match with your old password!" })
        }
      } else {
        res.status(401).json({ error: "Passwords don't match!" })
      }
    }
  } else if (method === "DELETE") {
    res.setHeader('Set-Cookie', cookie.serialize("auth", undefined, {
      httpOnly: true,
      secure: false,
      sameSite: 'strict',
      maxAge: -1,
      path: '/'
    }))
    res.status(200).json({ message: "You logout!" })
  }
  res.status(400).end()
}