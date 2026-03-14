import { Routes, Route } from "react-router-dom";
import { useState } from "react";

import AppNavbar from "./components/Navbar";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";

import Cart from "./pages/Cart";
import Home from "./pages/Home";
import About from "./pages/About";
import Menu from "./pages/Menu"; 
import type { CartItem } from "./pages/Menu";

import Contact from "./pages/Contact";

export default function App() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setCartOpen] = useState(false);

  const addToCart = (item: CartItem) => {
    setCart(prev => {
      const existing = prev.find(i => i.id === item.id);
      if (existing) {
        return prev.map(i =>
          i.id === item.id ? { ...i, quantity: i.quantity + item.quantity } : i
        );
      }
      return [...prev, item];
    });
    setCartOpen(true);
  };

  const updateQuantity = (id: number, qty: number) => {
    setCart(prev =>
      prev.map(i => (i.id === id ? { ...i, quantity: Math.max(1, qty) } : i))
    );
  };

  const removeFromCart = (id: number) => {
    setCart(prev => prev.filter(i => i.id !== id));
  };

  const cartCount = cart.reduce((acc, i) => acc + i.quantity, 0);

  return (
    <div className="d-flex flex-column min-vh-100">
      <AppNavbar cartCount={cartCount} onCartClick={() => setCartOpen(true)} />
      <ScrollToTop />

      <main className="flex-fill container-fluid p-0 pt-5">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/menu"
            element={
              <Menu
                cart={cart}
                addToCart={addToCart}
                updateQuantity={updateQuantity}
                removeFromCart={removeFromCart}
              />
            }
          />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </main>

      <Cart
        cart={cart}
        isOpen={isCartOpen}
        onClose={() => setCartOpen(false)}
        updateQuantity={updateQuantity}
        removeFromCart={removeFromCart}
      />

      <Footer />
    </div>
  );
}