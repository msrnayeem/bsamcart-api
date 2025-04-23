Here is the full API documentation in Markdown format for your **BSam API**.

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

## Notes

- **All routes** use **JSON** as the content type.
- **Firestore** is used as the database.
- **serviceAccountKey.json** is required for Firebase authentication. Ensure that it is available and correctly configured in your application.
- The **category** and **product** data in your database should be set up correctly for queries to work as expected when querying by category ID.
- This API is built with **Express** and serves data from a **Firestore** database.
  
---