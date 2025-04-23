const admin = require('firebase-admin')
const db = admin.firestore()
const usersCollection = db.collection('users')

const getAllUsers = async (req, res) => {
    try {
        const snapshot = await usersCollection.get()
        const users = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
        res.send(users)
    } catch (error) {
        console.error('Error getting users:', error)
        res.status(500).send('Internal Server Error')
    }
}

const searchUsers = async (req, res) => {
    const email = req.query.email
    if (!email) {
        return res.status(400).send('Email query parameter is required.')
    }

    try {
        const snapshot = await usersCollection.where('email', '==', email).get()

        if (snapshot.empty) {
            return res.status(404).send('No matching documents.')
        }

        const users = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
        res.send(users)
    } catch (error) {
        console.error('Error searching users:', error)
        res.status(500).send('Internal Server Error')
    }
}

module.exports = { getAllUsers, searchUsers }
