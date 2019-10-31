# Body Parts Ebay

## Frontend (React)

## Backend (Express)

### Dependencies

- express
- dotenv
- massive
- express-session
- bcrypt

## Server Structure

- DB
- server/
  - index.js
  - controller folder/
    - userCtrl.js
    - inventoryCtrl.js
  - middleware/
    - sessionCheck.js

## Endpoints

**User/Auth**

- userSession => get => /api/session
- register: => /auth/register
- logout: => /auth/logout
- login: => /authlogin

- addToCart => post => /api/add_to_cart
- getCart => get => /api/get_cart
- deleteFromCart => delete => /api/delete_from_cart/:id
- updateEmail => put => /api/update_email
- getPurchaseHistory => /api/purchase_history/:id

**Inventory**

- showAllInventory => get => /api/inventory

**Secrets**

```text
CONNECTION_STRING
SESSION_SECRET
PORT
```

## database (postgres)

- user table

```sql
CREATE TABLE users(
    user_id SERIAL PRIMARY KEY,
    user_name TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL
);

```

- inventory table

```sql
CREATE TABLE inventory(
    organ_id SERIAL PRIMARY KEY,
    organ_name VARCHAR(64) NOT NULL,
    price INTEGER NOT NULL,
    quality TEXT NOT NULL,
    image TEXT NOT NULL
);

```

- purchase history

```sql
CREATE TABLE purchase_history(
   purchase_id SERIAL PRIMARY KEY,
   purchase_date DATE DEFAULT NOW(),
   user_id INTEGER REFERENCES users(user_id),
   organ_id INTEGER REFERENCES inventory(organ_id)
)
```
