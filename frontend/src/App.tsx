import { Routes, Route } from "react-router-dom";

import AppNavbar from "./components/Navbar";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";

import Home from "./pages/Home";
import About from "./pages/About";
import Menu from "./pages/Menu";
import Contact from "./pages/Contact";

export default function App() {
  return (
    <div className="d-flex flex-column min-vh-100">
      <AppNavbar />
      <ScrollToTop />

      <main className="flex-fill container-fluid p-0 pt-5">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}
