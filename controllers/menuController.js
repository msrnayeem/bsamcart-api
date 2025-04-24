const admin = require('firebase-admin');
const db = admin.firestore();
const menu_items = db.collection('menu_items');

// Get all products in the menu
const getMenus = async (req, res) => {
    try {
        const snapshot = await menu_items.get();
        const menus = snapshot.docs.map(doc => doc.data());
        res.send(menus);
    } catch (error) {
        res.status(500).send("Internal Server Error");
    }
};

module.exports = {
    getMenus,
};
