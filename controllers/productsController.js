const admin = require('firebase-admin')
const db = admin.firestore()
const productsCollection = db.collection('vendor_products')

const getAllProducts = async (req, res) => {
    try {
        const snapshot = await productsCollection.get()
        const products = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
        res.send(products)
    } catch (error) {
        res.status(500).send('Internal Server Error')
    }
}

const getProductById = async (req, res) => {
    const { id } = req.params
    try {
        const doc = await productsCollection.doc(id).get()
        if (!doc.exists) {
            return res.status(404).send('Product not found')
        }
        res.send({ id: doc.id, ...doc.data() })
    } catch (error) {
        res.status(500).send('Internal Server Error')
    }
}

const getProductsByCategory = async (req, res) => {
    const { id } = req.params

    try {
        const snapshot = await productsCollection.where('category_id', '==', id).get()
        const products = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))

        res.send({ category_id: id, products })
    } catch (error) {
        console.error('Error fetching products by category:', error)
        res.status(500).send('Internal Server Error')
    }
}

module.exports = {
    getAllProducts,
    getProductById,
    getProductsByCategory
}
