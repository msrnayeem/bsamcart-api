const express = require('express')
const admin = require('firebase-admin')
const cors = require('cors')
const app = express()
const port = 3000

const serviceAccount = require('./serviceAccountKey.json')

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://bsamcart-dd9cb-default-rtdb.firebaseio.com'
})

// Configure CORS
const corsOptions = {
  origin: ['https://bsamcart.vercel.app', 'http://localhost:3000'],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}

// Apply CORS middleware
app.use(cors(corsOptions))

// Parse JSON requests
app.use(express.json())

const usersRoutes = require('./routes/usersRoutes')
const productsRoutes = require('./routes/productsRoutes')
const categoriesRoutes = require('./routes/categoriesRoutes')
const orderRoutes = require('./routes/orderRoutes')
const wishlistRoutes = require('./routes/wishlistRoutes')
const cartRoutes = require('./routes/cartRoutes')
const menuRoutes = require('./routes/menuRoutes')

app.get('/', (req, res) => {
  res.send('Welcome to the BSam Api Project!')
})

app.use('/api/users', usersRoutes)
app.use('/api/products', productsRoutes)
app.use('/api/categories', categoriesRoutes)
app.use('/api/orders', orderRoutes)
app.use('/api/wishlist', wishlistRoutes)
app.use('/api/cart', cartRoutes)
app.use('/api/menu', menuRoutes)

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`)
})
