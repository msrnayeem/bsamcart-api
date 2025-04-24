const admin = require('firebase-admin');

const db = admin.firestore();
const cartCollection = db.collection('carts');

// Add to cart
const addToCart = async (req, res) => {
  try {
    const { user_id, product_id, quantity = 1 } = req.body;

    // Basic validation
    if (!user_id || !product_id) {
      return res.status(400).json({
        success: false,
        message: 'User ID and product ID are required'
      });
    }

    const timestamp = admin.firestore.FieldValue.serverTimestamp();

    // Check if this item already exists in the cart
    const cartQuery = await cartCollection
      .where('user_id', '==', user_id)
      .where('product_id', '==', product_id)
      .get();

    if (!cartQuery.empty) {
      // Update existing item
      const existingCart = cartQuery.docs[0];
      const currentQuantity = existingCart.data().quantity || 0;

      await existingCart.ref.update({
        quantity: currentQuantity + quantity,
        updated_at: timestamp
      });

      return res.status(200).json({
        success: true,
        message: 'Product quantity updated in cart',
        data: { user_id, product_id, quantity: currentQuantity + quantity }
      });
    }

    // Add new item to cart
    const cartDoc = cartCollection.doc();
    const cartId = cartDoc.id;

    await cartDoc.set({
      id: cartId,
      user_id,
      product_id,
      quantity,
      created_at: timestamp,
      updated_at: timestamp
    });

    console.log(`Cart updated for user ${user_id}`, { product_id, quantity });

    return res.status(201).json({
      success: true,
      message: 'Product added to cart successfully',
      data: { id: cartId, user_id, product_id, quantity }
    });

  } catch (error) {
    console.error('Error adding to cart', {
      error: error.message,
      user_id: req.body?.user_id
    });

    res.status(500).json({
      success: false,
      message: 'Internal Server Error'
    });
  }
};

// Get user's cart
const getUserCart = async (req, res) => {
  try {
    const { userId } = req.params;

    if (!userId) {
      return res.status(400).json({
        success: false,
        message: 'User ID is required'
      });
    }

    const cartSnapshot = await cartCollection
      .where('user_id', '==', userId)
      .get();

    if (cartSnapshot.empty) {
      return res.status(404).json({
        success: false,
        message: 'Cart not found for this user'
      });
    }

    const userCartItems = cartSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));

    console.log(`Retrieved cart for user ${userId}`, { itemCount: userCartItems.length });

    return res.json({
      success: true,
      message: 'Cart retrieved successfully',
      data: userCartItems
    });

  } catch (error) {
    console.error('Error getting user cart', {
      error: error.message,
      userId: req.params.userId
    });

    res.status(500).json({
      success: false,
      message: 'Internal Server Error'
    });
  }
};

// Remove from cart
const removeFromCart = async (req, res) => {
  try {
    const { userId, productId } = req.params;

    if (!userId || !productId) {
      return res.status(400).json({
        success: false,
        message: 'User ID and product ID are required'
      });
    }

    const cartQuery = await cartCollection
      .where('user_id', '==', userId)
      .where('product_id', '==', productId)
      .get();

    if (cartQuery.empty) {
      return res.status(404).json({
        success: false,
        message: 'Product not found in user\'s cart'
      });
    }

    const cartItem = cartQuery.docs[0];
    const currentQuantity = cartItem.data().quantity;

    if (currentQuantity <= 1) {
      // Remove the item completely
      await cartItem.ref.delete();

      return res.status(200).json({
        success: true,
        message: 'Product removed from cart'
      });
    }

    // Decrease quantity by 1
    await cartItem.ref.update({
      quantity: currentQuantity - 1,
      updated_at: admin.firestore.FieldValue.serverTimestamp()
    });

    console.log(`Cart item modified for user ${userId}`, { productId });

    return res.status(200).json({
      success: true,
      message: 'Product quantity decreased in cart',
      data: { remaining_quantity: currentQuantity - 1 }
    });

  } catch (error) {
    console.error('Error removing from cart', {
      error: error.message,
      userId: req.params.userId,
      productId: req.params.productId
    });

    res.status(500).json({
      success: false,
      message: 'Internal Server Error'
    });
  }
};

module.exports = {
  addToCart,
  getUserCart,
  removeFromCart
};