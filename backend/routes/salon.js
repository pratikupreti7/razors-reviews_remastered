/*
 *************  Imports **********************
 */
const router = require('express').Router()
const verify = require('./verifyToken')
const Salon = require('../model/Salon')
const salonSchema = require('../validation/salonSchemaValidation')
/*
 ************* GET: ALL SALONS **********************
 */
router.get('/', async (req, res) => {
  try {
    const salons = await Salon.find()
    res.json(salons)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

/*
 ************* GET: Single SALONS BY ID **********************
 */
router.get('/:id', getSalon, (req, res) => {
  res.json(res.salon)
})

/*
 ************* MIDDLEWARE  **********************
 */
async function getSalon(req, res, next) {
  let salon
  try {
    salon = await Salon.findById(req.params.id)
    if (salon == null) {
      return res.status(404).json({ message: 'Salon not found' })
    }
  } catch (error) {
    return res.status(500).json({ message: error.message })
  }
  res.salon = salon
  next()
}

/*
 ************* POST: CREATE A NEW  SALON **********************
 */
router.post('/', verify, async (req, res) => {
  try {
    const {
      name,
      description,
      address,
      city,
      state,
      zip,
      phone,
      email,
      website,
      services,
      price,
    } = req.body

    // validate salon data using Joi schema
    const { error } = salonSchema.validate({
      name,
      description,
      address,
      city,
      state,
      zip,
      phone,
      email,
      website,
      services,
      price,
    })

    // if there's an error, return 400 Bad Request response
    if (error) {
      return res.status(400).send(error.details[0].message)
    }
    // if there's an error, Email Already Exists
    const emailExists = await Salon.findOne({ email: req.body.email })

    if (emailExists) {
      return res.status(400).send('Email already exists')
    }
    // if there's an error, Website Already Exists
    const websiteExixts = await Salon.findOne({ website: req.body.website })

    if (websiteExixts) {
      return res.status(400).send('Website already exists')
    }
    // get user ID from the verified token
    const userId = req.user._id

    // create new salon object with user ID
    const salon = new Salon({
      name,
      description,
      address,
      city,
      state,
      zip,
      phone,
      email,
      website,
      services,
      price,
      user: userId,
    })

    const savedSalon = await salon.save()
    res.send(savedSalon)
  } catch (error) {
    console.log(error)
    res.status(400).send(error)
  }
})

module.exports = router
