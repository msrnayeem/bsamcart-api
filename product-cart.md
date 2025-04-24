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
