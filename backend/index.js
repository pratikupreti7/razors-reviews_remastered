/*
 ************* Import statements **********************
 */
const express = require('express')
const mongoose = require('mongoose')
const app = express()

/*
 ************* Environment variable **********************
 */
const dotenv = require('dotenv')
dotenv.config()

/*
 ************* Import routes **********************
 */
const userRoute = require('./routes/auth')
const salonRoute = require('./routes/salon')
/*
 ************* Connection to Database **********************
 */

mongoose
  .connect(process.env.DB_CONNECT, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('Connected to database 😇 ....'))
  .catch((error) => console.error(error))

/*
 ************* Middleware **********************
 */
app.use(express.json())

app.use('/api/user', userRoute)
app.use('/api/salon', salonRoute)

/*
 ************* Server listening **********************
 */

app.listen(3000, () => {
  console.log('Server is up and running 💌  at  http://localhost:3000/')
  console.log(
    'Sugetions for nested comments https://www.youtube.com/watch?v=lyNetvEfvT0',
  )
})
