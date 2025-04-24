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