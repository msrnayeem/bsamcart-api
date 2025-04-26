Here is the updated **BSam API Documentation** with the addition of the **Wishlist** and **Order** routes:

---

# BSam API Documentation

## Base URL
```
http://localhost:3000/api
```

---

## 🔐 **Users Routes**

### **POST** `/api/users/register`
Register a new user.

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "yourpassword"
}
```

**Response:**
- `201 Created` on success
- `400 Bad Request` if validation fails

---

### **POST** `/api/users/login`
Log in with credentials.

**Request Body:**
```json
{
  "email": "john@example.com",
  "password": "yourpassword"
}
```

**Response:**
- `200 OK` with token on success
- `401 Unauthorized` if credentials are invalid

---

## 🛒 **Products Routes**

### **GET** `/api/products`
Fetch all products.

**Response:**
```json
[
  { "id": "p1", "name": "Product 1", "description": "A sample product", "price": 25.00 },
  { "id": "p2", "name": "Product 2", "description": "Another sample product", "price": 35.00 }
]
```

---

### **GET** `/api/products/:id`
Get a single product by ID.

**Response:**
```json
{
  "id": "p1",
  "name": "Product 1",
  "description": "A sample product",
  "price": 25.00
}
```

---

## 🗂️ **Categories Routes**

### **GET** `/api/categories`
Fetch all categories.

**Response:**
```json
[
  { "id": "c1", "title": "Category 1" },
  { "id": "c2", "title": "Category 2" }
]
```

---

### **GET** `/api/categories/:id`
Get category by ID.

**Response:**
```json
{
  "id": "c1",
  "title": "Category 1"
}
```

---

### **GET** `/api/categories/parent/:id`
Get full upward hierarchy (all parents).

**Response:**
```json
{
  "parent": {
    "id": "parent_id",
    "title": "Parent Category"
  },
  "tree": [
    {
      "id": "parent_id",
      "title": "Parent Category"
    },
    {
      "id": "current_id",
      "title": "Current Category"
    }
  ]
}
```

---

### **GET** `/api/categories/child/:id`
Get full downward hierarchy (all children).

**Response:**
```json
{
  "category": {
    "id": "current_id",
    "title": "Current Category"
  },
  "tree": [
    {
      "id": "child_id",
      "title": "Child Category",
      "children": [ ... ]
    }
  ]
}
```

---

## 🛍️ **Products by Category**

### **GET** `/api/products/category/:id`
Get products associated with a category.

**Response:**
```json
{
  "category_id": "category_id",
  "category_name": "Category Name",
  "products": [
    {
      "id": "product1",
      "title": "Product 1",
      "description": "Description of Product 1",
      "price": 25.00,
      "stock": 100,
      "image_url": "https://example.com/product1.jpg"
    },
    {
      "id": "product2",
      "title": "Product 2",
      "description": "Description of Product 2",
      "price": 35.00,
      "stock": 50,
      "image_url": "https://example.com/product2.jpg"
    }
  ]
}
```

---

## 🛒 **Order Routes**

### **POST** `/api/orders`
Create a new order.

**Request Body:**
```json
{
  "user_id": "user_123",
  "products": [
    { "product_id": "p1", "quantity": 2 },
    { "product_id": "p2", "quantity": 1 }
  ],
  "total_amount": 85.00,
  "status": "pending"
}
```

**Response:**
- `201 Created` on success
- `400 Bad Request` if validation fails

---

### **GET** `/api/orders`
Fetch all orders.

**Response:**
```json
[
  {
    "id": "order_1",
    "user_id": "user_123",
    "products": [
      { "product_id": "p1", "quantity": 2 },
      { "product_id": "p2", "quantity": 1 }
    ],
    "total_amount": 85.00,
    "status": "pending"
  }
]
```

---

### **GET** `/api/orders/:id`
Get a specific order by ID.

**Response:**
```json
{
  "id": "order_1",
  "user_id": "user_123",
  "products": [
    { "product_id": "p1", "quantity": 2 },
    { "product_id": "p2", "quantity": 1 }
  ],
  "total_amount": 85.00,
  "status": "pending"
}
```

---

## 💖 **Wishlist Routes**

### **POST** `/api/wishlist`
Add a product to the wishlist.

**Request Body:**
```json
{
  "user_id": "user_123",
  "product_id": "p1"
}
```

**Response:**
- `201 Created` on success
- `400 Bad Request` if the product is already in the wishlist

---

### **GET** `/api/wishlist`
Fetch all wishlists.

**Response:**
```json
[
  {
    "user_id": "user_123",
    "products": ["p1", "p2"]
  }
]
```

---

### **GET** `/api/wishlist/:userId`
Get a specific user's wishlist by `userId`.

**Response:**
```json
{
  "user_id": "user_123",
  "products": ["p1", "p2"]
}
```

---

## Notes

- **All routes** use **JSON** as the content type.
- **Firestore** is used as the database.
- **serviceAccountKey.json** is required for Firebase authentication. Ensure that it is available and correctly configured in your application.
- The **category**, **product**, **order**, and **wishlist** data in your database should be set up correctly for queries to work as expected.
- This API is built with **Express** and serves data from a **Firestore** database.




```markdown
# 💖 **Cart Routes**

### **POST** `/api/cart/add`
Add a product to the cart. If the product already exists, it will update the quantity. If the product is new, it will be added to the cart.

**Request Body:**
```json
{
  "user_id": "user_123",
  "product_id": "p1",
  "quantity": 2
}
```

**Response:**
- `201 Created` on success
- `400 Bad Request` if the request is invalid or required fields are missing
- `500 Internal Server Error` if there is an issue with the server

---

### **GET** `/api/cart/user/:userId`
Fetch all cart items for a specific user by `userId`.

**Response:**
```json
[
  {
    "id": "cart_item_1",
    "user_id": "user_123",
    "product_id": "p1",
    "quantity": 2,
    "created_at": "timestamp",
    "updated_at": "timestamp"
  },
  {
    "id": "cart_item_2",
    "user_id": "user_123",
    "product_id": "p2",
    "quantity": 1,
    "created_at": "timestamp",
    "updated_at": "timestamp"
  }
]
```

---

### **DELETE** `/api/cart/remove/:userId/:productId`
Remove a product from the cart or decrease its quantity by one. If the quantity reaches 1, the product will be completely removed from the cart.

**Response:**
- `200 OK` on successful removal or quantity decrease
- `400 Bad Request` if required parameters are missing
- `404 Not Found` if the product is not in the user's cart
- `500 Internal Server Error` if there is an issue with the server

---

### **Example Request for POST (Add Product to Cart)**

**Request:**
```
POST http://localhost:3000/api/cart/add
```

**Body:**
```json
{
  "user_id": "user_123",
  "product_id": "p1",
  "quantity": 2
}
```

---

### **Example Request for GET (Get User's Cart)**

**Request:**
```
GET http://localhost:3000/api/cart/user/user_123
```

**Response:**
```json
[
  {
    "id": "cart_item_1",
    "user_id": "user_123",
    "product_id": "p1",
    "quantity": 2,
    "created_at": "timestamp",
    "updated_at": "timestamp"
  }
]
```

---

### **Example Request for DELETE (Remove Product from Cart)**

**Request:**
```
DELETE http://localhost:3000/api/cart/remove/user_123/p1
```

**Response:**
```json
{
  "success": true,
  "message": "Product removed from cart",
  "data": {
    "remaining_quantity": 0
  }
}
```

---

### **Error Handling**

If any of the operations encounter an error, the server will return an error response in JSON format:

- **400 Bad Request**: For invalid inputs or missing parameters.
- **404 Not Found**: For non-existent carts or products.
- **500 Internal Server Error**: For server-side issues or unhandled exceptions.



url -> http://localhost

```markdown
# 🍽️ **Menu Items Routes**

### **GET** `/api/menu/get`
Fetch all menu items.

**Response:**
```json
[
  {
    "id": "menu_item_1",
    "name": "Burger",
    "description": "A delicious beef burger with cheese.",
    "price": 5.99
  },
  {
    "id": "menu_item_2",
    "name": "Pizza",
    "description": "A cheesy pizza with pepperoni.",
    "price": 8.99
  }
]
```

---

### **Error Response**

If an error occurs, you'll get:
```json
{
  "message": "Internal Server Error"
}
```