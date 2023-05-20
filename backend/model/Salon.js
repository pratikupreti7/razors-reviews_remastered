const mongoose = require('mongoose')

const salonSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    maxlength: 255,
  },
  description: {
    type: String,
    trim: true,
    maxlength: 2000,
  },
  address: {
    type: String,
    required: true,
    trim: true,
    maxlength: 500,
  },
  city: {
    type: String,
    required: true,
    trim: true,
    maxlength: 100,
  },
  state: {
    type: String,
    required: true,
    trim: true,
    maxlength: 100,
  },
  zip: {
    type: String,
    required: true,
    trim: true,
    maxlength: 20,
  },
  phone: {
    type: String,
    required: true,
    trim: true,
    maxlength: 20,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    unique: true,
  },
  website: {
    type: String,
    trim: true,
    maxlength: 255,
  },
  services: [
    {
      type: String,
    },
  ],
  employees: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Employee',
    },
  ],
  ratings: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Rating',
    },
  ],
  covidSafety: {
    type: Number,
    default: 0,
  },
  price: {
    type: Number,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
})

const Salon = mongoose.model('Salon', salonSchema)

module.exports = Salon
