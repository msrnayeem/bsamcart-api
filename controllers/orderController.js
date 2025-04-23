const admin = require('firebase-admin');
const db = admin.firestore();
const ordersCollection = db.collection('orders');  // Firestore collection for orders

// Add new order
const addOrder = async (req, res) => {
    const { user_id, products, total_price, status, shipping_address } = req.body;

    if (!user_id || !products || !total_price || !status || !shipping_address) {
        return res.status(400).send('All fields are required');
    }

    try {
        const newOrder = {
            user_id,
            products,
            total_price,
            status,
            shipping_address,
            created_at: new Date(),
            updated_at: new Date(),
        };

        const docRef = await ordersCollection.add(newOrder);

        res.status(201).send({
            id: docRef.id,
            ...newOrder,
        });
    } catch (error) {
        console.error('Error adding order:', error);
        res.status(500).send('Internal Server Error');
    }
};

// Get all orders
const getAllOrders = async (req, res) => {
    try {
        const snapshot = await ordersCollection.get();
        const orders = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
        }));

        res.status(200).send(orders);
    } catch (error) {
        console.error('Error retrieving orders:', error);
        res.status(500).send('Internal Server Error');
    }
};

// Get order by ID
const getOrderById = async (req, res) => {
    const { id } = req.params;

    try {
        const doc = await ordersCollection.doc(id).get();

        if (!doc.exists) {
            return res.status(404).send('Order not found');
        }

        res.status(200).send({
            id: doc.id,
            ...doc.data(),
        });
    } catch (error) {
        console.error('Error retrieving order by ID:', error);
        res.status(500).send('Internal Server Error');
    }
};

module.exports = {
    addOrder,
    getAllOrders,
    getOrderById,
};
