import { Navbar, Nav, Container, Badge } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useState, useEffect } from "react";
// import logo2 from "../assets/blanco.png";
import logo2 from "../assets/blanco1.png";

interface Props {
  cartCount: number;        // antal produkter i cart
  onCartClick: () => void;  // öppna cart sidebar
}

export default function AppNavbar({ cartCount, onCartClick }: Props) {
  const { t, i18n } = useTranslation();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) setScrolled(true);
      else setScrolled(false);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <Navbar
      expand="lg"
      fixed="top"
      className={`navbar-custom ${scrolled ? "scrolled" : ""}`}
      variant="dark"
    >
      <Container>
        <Navbar.Brand as={Link} to="/">
          <img
            src={logo2}
            alt="Blanco logo"
            className="img-fluid"
            style={{ maxHeight: "50px" }}
          />
        </Navbar.Brand>

        <Navbar.Toggle />

        <Navbar.Collapse className="justify-content-between">
          <Nav className="mx-auto text-center">
            <Nav.Link as={Link} to="/">{t("home")}</Nav.Link>
            <Nav.Link as={Link} to="/about">{t("about")}</Nav.Link>
            <Nav.Link as={Link} to="/menu">{t("menu")}</Nav.Link>
            <Nav.Link as={Link} to="/contact">{t("contact")}</Nav.Link>
          </Nav>

          <Nav>
            <Nav.Link onClick={() => i18n.changeLanguage("sv")}>SV</Nav.Link>
            <Nav.Link onClick={() => i18n.changeLanguage("en")}>EN</Nav.Link>

            {/* Cart ikon */}
            <Nav.Link onClick={onCartClick} style={{ position: "relative" }}>
              🛒
              {cartCount > 0 && (
                <Badge
                  bg="danger"
                  pill
                  style={{
                    position: "absolute",
                    top: "-5px",
                    right: "-10px",
                    fontSize: "0.7rem",
                  }}
                >
                  {cartCount}
                </Badge>
              )}
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
