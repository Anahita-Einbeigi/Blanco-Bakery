from flask import Flask, jsonify, request
from flask_cors import CORS
import sqlite3
import os
BACKEND_URL = "http://127.0.0.1:5000" 

app = Flask(__name__)
CORS(app)

DB_FILE = "database.db"

# --- Init DB och fyll produkter ---
def init_db():
    conn = sqlite3.connect(DB_FILE)
    cursor = conn.cursor()

    cursor.execute("""
        CREATE TABLE IF NOT EXISTS products (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT,
            image TEXT,
            price REAL,
            description TEXT
        )
    """)

    # Rensa gamla produkter
    cursor.execute("DELETE FROM products")

    # Lägg till nya produkter
    products = [
        ("Macaron", f"{BACKEND_URL}/static/images/macaron.jpg", 20, "Delicate French macarons with various flavors"),
        ("Muffin", f"{BACKEND_URL}/static/images/muffins.jpg", 25, "Soft and fluffy muffins with fresh ingredients"),
        ("Chocolate Cake", f"{BACKEND_URL}/static/images/cake.jpg", 50, "Rich chocolate cake perfect for celebrations"),
        ("Cheesecake", f"{BACKEND_URL}/static/images/cheese.jpg", 55, "Creamy cheesecake with a crunchy base"),
    ]

    for p in products:
        cursor.execute(
            "INSERT INTO products (name, image, price, description) VALUES (?, ?, ?, ?)", p
        )

    conn.commit()
    conn.close()

# Kör init_db
init_db()

# --- Routes ---
@app.route("/api/products", methods=["GET"])
def get_products():
    conn = sqlite3.connect(DB_FILE)
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM products")
    rows = cursor.fetchall()
    products = []
    for row in rows:
        products.append({
            "id": row[0],
            "name": row[1],
            "image": row[2],
            "price": row[3],
            "description": row[4]
        })
    conn.close()
    return jsonify(products)

# Lägg till i cart
@app.route("/api/cart", methods=["POST"])
def add_to_cart():
    data = request.json
    product_id = data["product_id"]
    quantity = data["quantity"]

    conn = sqlite3.connect(DB_FILE)
    cursor = conn.cursor()
    cursor.execute("""
        INSERT INTO cart (product_id, quantity) VALUES (?, ?)
    """, (product_id, quantity))
    conn.commit()
    conn.close()
    return jsonify({"message": "Added to cart"})

if __name__ == "__main__":
    app.run(debug=True)
