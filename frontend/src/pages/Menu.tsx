import { useEffect, useState } from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import Cart from "./Cart";
import AppNavbar from "../components/Navbar";

export interface Product {
  id: number;
  name: string;
  image: string;
  price: number;
  description: string;
  ingredients?: string[]; 
}

export interface CartItem extends Product {
  quantity: number;
}

export default function Menu() {
  const { t } = useTranslation();
  const [products, setProducts] = useState<Product[]>([]);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [cartOpen, setCartOpen] = useState(false);

  // Hämta produkter från Flask
  useEffect(() => {
    fetch("http://127.0.0.1:5000/api/products")
      .then(res => res.json())
      .then(data => {
        console.log("Received products:", data);
        setProducts(data);})
      .catch(err => console.error(err));
  }, []);

  // Lägg till produkt i cart
  const addToCart = (product: Product, qty: number = 1) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + qty }
            : item
        );
      }
      return [...prev, { ...product, quantity: qty }];
    });
    setCartOpen(true);
  };

  // Uppdatera antal i cart
  const updateQuantity = (id: number, qty: number) => {
    setCart(prev =>
      prev
        .map(item => (item.id === id ? { ...item, quantity: Math.max(1, qty) } : item))
        .filter(item => item.quantity > 0)
    );
  };

  // Ta bort produkt från cart
  const removeFromCart = (id: number) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  return (
    <>
      <AppNavbar cartCount={cart.reduce((acc, item) => acc + item.quantity, 0)} onCartClick={() => setCartOpen(true)} />
      <Container className="py-5">
        <h1 className="text-center mb-4">{t("menuPage.title")}</h1>

        {products.length === 0 ? (
          <p className="text-center">{t("menuPage.noProducts")}</p>
        ) : (
          <Row className="g-4">
            {products.map(product => (
              <Col key={product.id} xs={12} sm={6} lg={4}>
                <Card className="h-100 shadow-sm product-card">
                  <Card.Img
                    variant="top"
                    src={product.image}
                    style={{ height: "220px", objectFit: "cover" }}
                  />
                  <Card.Body className="text-center">
                    <Card.Title>{product.name}</Card.Title>
                    <Card.Text style={{ minHeight: "60px" }}>
                      {product.description}
                    </Card.Text>
                    <h5>${product.price}</h5>
                    <Button
                      variant="dark"
                      className="w-100 mt-2"
                      onClick={() => addToCart(product)}
                    >
                      {t("menuPage.addToCart")}
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        )}
      </Container>

      {/* Cart Sidebar */}
      <Cart
        cart={cart}
        isOpen={cartOpen}
        onClose={() => setCartOpen(false)}
        updateQuantity={updateQuantity}
        removeFromCart={removeFromCart}
      />
    </>
  );
}
