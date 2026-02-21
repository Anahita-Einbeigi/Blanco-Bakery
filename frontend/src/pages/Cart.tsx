import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import type { CartItem } from "./Menu";

interface Props {
  cart: CartItem[];
  isOpen: boolean;
  onClose: () => void;
  updateQuantity: (id: number, qty: number) => void;
  removeFromCart: (id: number) => void;
}

export default function Cart({ cart, isOpen, onClose, updateQuantity, removeFromCart }: Props) {
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const sum = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
    setTotal(sum);
  }, [cart]);

  return (
    <>
      {isOpen && <div className="overlay" onClick={onClose}></div>}

      <div className={`cart-sidebar ${isOpen ? "open" : ""}`}>
        <button className="close-btn" onClick={onClose}>
          ✕
        </button>

        <h3  className="mt-5">Your Cart</h3>

        {cart.length === 0 ? (
          <p>No items in cart</p>
        ) : (
          <div className="cart-items">
            {cart.map(item => (
              <div key={item.id} className="cart-item d-flex justify-content-between align-items-center mb-2">
                <div>
                  <strong>{item.name}</strong>
                  <p>${item.price} x {item.quantity}</p>
                </div>
                <div className="d-flex gap-1">
                  <Button size="sm" variant="outline-dark" onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</Button>
                  <Button size="sm" variant="outline-dark" onClick={() => updateQuantity(item.id, item.quantity - 1)}>-</Button>
                  <Button size="sm" variant="danger" onClick={() => removeFromCart(item.id)}>×</Button>
                </div>
              </div>
            ))}
          </div>
        )}

        <hr />
        <h5>Total: ${total}</h5>
        <Button variant="dark" className="w-100 mt-2">Checkout</Button>
      </div>
    </>
  );
}
