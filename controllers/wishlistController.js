const admin = require('firebase-admin');
const db = admin.firestore();
const wishlistCollection = db.collection('wishlists');

// Add a product to the wishlist
const addToWishlist = async (req, res) => {
    const { user_id, product_id } = req.body;

    try {
        const wishlistDoc = wishlistCollection.doc(user_id);
        const wishlistSnapshot = await wishlistDoc.get();

        // If no wishlist exists for the user, create a new one
        if (!wishlistSnapshot.exists) {
            await wishlistDoc.set({
                user_id,
                products: [product_id],
            });
        } else {
            const currentWishlist = wishlistSnapshot.data().products;
            if (!currentWishlist.includes(product_id)) {
                currentWishlist.push(product_id);
                await wishlistDoc.update({
                    products: currentWishlist,
                });
            } else {
                return res.status(400).send("Product is already in the wishlist");
            }
        }

        res.status(201).send({ user_id, product_id });
    } catch (error) {
        res.status(500).send("Internal Server Error");
    }
};

// Get all products in the wishlist
const getWishlist = async (req, res) => {
    try {
        const snapshot = await wishlistCollection.get();
        const wishlists = snapshot.docs.map(doc => doc.data());
        res.send(wishlists);
    } catch (error) {
        res.status(500).send("Internal Server Error");
    }
};

// Get a user's wishlist by user_id
const getUserWishlist = async (req, res) => {
    const { userId } = req.params;

    try {
        const wishlistDoc = await wishlistCollection.doc(userId).get();
        if (!wishlistDoc.exists) {
            return res.status(404).send("Wishlist not found");
        }

        res.send(wishlistDoc.data());
    } catch (error) {
        res.status(500).send("Internal Server Error");
    }
};

module.exports = {
    addToWishlist,
    getWishlist,
    getUserWishlist,
};
