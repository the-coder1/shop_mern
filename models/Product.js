import mongoose from 'mongoose';

const reviewSchema = mongoose.Schema({
  user: { 
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User"
  },
  name: { type: String, required: true },
  rating: { type: Number, required: true },
  comment: { type: String, required: true }
},
{
  timestamps: true
})

const productSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User"
  },
  name: { type: String, required: true },
  image: { type: String, required: true },
  ideas: [{ type: String, required: true }],
  uses: [{ type: String, required: true }],
  format: { type: Number, required: true },
  price: { type: Number, required: true },
  stock: { type: Number, required: true },
  description: { type: String, required: true },
  ingredients: [{ type: String, required: true }],
  reviews: [reviewSchema],
  rating: { type: Number, required: true, default: 0 }
},
{
  timestamps: true
})

const Product = mongoose.models.Product || mongoose.model('Product', productSchema)

export default Product
