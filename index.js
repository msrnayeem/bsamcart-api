const express = require('express')
const admin = require('firebase-admin')
const app = express()
const port = 3000

const serviceAccount = require('./serviceAccountKey.json')

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://bsamcart-dd9cb-default-rtdb.firebaseio.com'
})

const usersRoutes = require('./routes/usersRoutes')
const productsRoutes = require('./routes/productsRoutes')
const categoriesRoutes = require('./routes/categoriesRoutes')

app.use(express.json())

app.get('/', (req, res) => {
  res.send('Welcome to the BSam Api Project!')
})

app.use('/api/users', usersRoutes)
app.use('/api/products', productsRoutes)
app.use('/api/categories', categoriesRoutes)

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`)
})
