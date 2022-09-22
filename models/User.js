import mongoose from "mongoose";

// const orderSchema = mongoose.Schema({
//   items: [{
//     product: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "Product" },
//     quantity: { type: Number, required: true }
//   }],
//   shippingAddress: {
//     address: { type: String, required: true },
//     city: { type: String, required: true },
//     postalCode: { type: String, required: true },
//     country: { type: String, required: true }
//   },
//   paymentMethod: { type: String, required: true },
//   taxPrice: { type: Number, required: true, default: 0.00 },
//   shippingPrice: { type: Number, required: true, default: 0.00 },
//   totalPrice: { type: Number, required: true, default: 0.00 },
//   isPaid: { type: Boolean, required: true, default: false },
//   isDelivered: { type: Boolean, required: true, default: false }
// },
// {
//   timestamps: true
// })

const userSchema = mongoose.Schema({
  name: {
    first: { type: String, required: true },
    last: { type: String, required: true }
  },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  password: { type: String, required: true },
  isAdmin: { type: Boolean, required: true, default: false },
  desires: [{ type: mongoose.Schema.Types.ObjectId, required: true, ref: "Product" }],
  // orders: [orderSchema]
},
{
  timestamps: true
})

const User = mongoose.models.User || mongoose.model('User', userSchema)

export default User