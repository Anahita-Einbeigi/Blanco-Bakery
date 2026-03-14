import { useEffect, useState } from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { useTranslation } from "react-i18next";

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

interface Props {
  cart: CartItem[];
  addToCart: (item: CartItem) => void;
  updateQuantity: (id: number, qty: number) => void;
  removeFromCart: (id: number) => void;
}

// export default function Menu({ cart, addToCart }: Props) {
export default function Menu({ addToCart }: Props) {

  const { t } = useTranslation();
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    fetch("http://127.0.0.1:5000/api/products")
      .then(res => res.json())
      .then(data => setProducts(data))
      .catch(err => console.error(err));
  }, []);

  const handleAddToCart = (product: Product) => {
    addToCart({ ...product, quantity: 1 });
  };

  return (
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
                    onClick={() => handleAddToCart(product)}
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
  );
}