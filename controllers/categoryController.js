const admin = require('firebase-admin')
const db = admin.firestore()
const productsCollection = db.collection('vendor_categories')

const getAllCategories = async (req, res) => {
    try {
        const snapshot = await productsCollection.get()
        const categories = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
        res.send(categories)
    } catch (error) {
        res.status(500).send('Internal Server Error')
    }
}

const getCategoryById = async (req, res) => {
    const { id } = req.params
    try {
        const doc = await productsCollection.doc(id).get()
        if (!doc.exists) {
            return res.status(404).send('Category not found')
        }
        res.send({ id: doc.id, ...doc.data() })
    } catch (error) {
        res.status(500).send('Internal Server Error')
    }
}

const getParentCategories = async (req, res) => {
    const { id } = req.params

    try {
        const tree = []
        let currentId = id

        while (currentId) {
            const doc = await productsCollection.doc(currentId).get()
            if (!doc.exists) break

            const data = { id: doc.id, ...doc.data() }
            tree.unshift(data) // insert at beginning
            currentId = data.parent_id
        }

        if (tree.length === 0) return res.status(404).send('Category not found')

        res.send({ parent: tree[0], tree })
    } catch (err) {
        res.status(500).send('Internal Server Error')
    }
}

const getChildCategories = async (req, res) => {
    const { id } = req.params

    try {
        const buildTree = async (parentId) => {
            const doc = await productsCollection.doc(parentId).get()
            if (!doc.exists) return null

            const node = { id: doc.id, ...doc.data() }
            const childrenSnapshot = await productsCollection.where('parent_id', '==', parentId).get()

            node.children = []
            for (const childDoc of childrenSnapshot.docs) {
                const childTree = await buildTree(childDoc.id)
                if (childTree) node.children.push(childTree)
            }

            return node
        }

        const root = await buildTree(id)
        if (!root) return res.status(404).send('Category not found')

        res.send({ children: root })
    } catch (err) {
        res.status(500).send('Internal Server Error')
    }
}

module.exports = {
    getAllCategories,
    getCategoryById,
    getParentCategories,
    getChildCategories,
}
