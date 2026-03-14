import { Navbar, Nav, Container, Badge } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useState, useEffect } from "react";
import logo2 from "../assets/blanco1.png";

interface Props {
  cartCount: number;
  onCartClick: () => void;
}

export default function AppNavbar({ cartCount, onCartClick }: Props) {
  const { t, i18n } = useTranslation();
  const [scrolled, setScrolled] = useState(false);
  const [expanded, setExpanded] = useState(false); // styr menyens öppning

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Klick utanför navbar stänger den
  useEffect(() => {
    if (!expanded) return;

    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest(".navbar")) {
        setExpanded(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [expanded]);

  return (
    <Navbar
      expand="lg"
      fixed="top"
      expanded={expanded}
      onToggle={setExpanded}  // låt react-bootstrap toggla korrekt
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
            <Nav.Link as={Link} to="/" onClick={() => setExpanded(false)}>
              {t("home")}
            </Nav.Link>
            <Nav.Link as={Link} to="/about" onClick={() => setExpanded(false)}>
              {t("about")}
            </Nav.Link>
            <Nav.Link as={Link} to="/menu" onClick={() => setExpanded(false)}>
              {t("menu")}
            </Nav.Link>
            <Nav.Link as={Link} to="/contact" onClick={() => setExpanded(false)}>
              {t("contact")}
            </Nav.Link>
          </Nav>

          <Nav>
            <Nav.Link onClick={() => i18n.changeLanguage("sv")}>SV</Nav.Link>
            <Nav.Link onClick={() => i18n.changeLanguage("en")}>EN</Nav.Link>

            <Nav.Link
              onClick={() => { onCartClick(); setExpanded(false); }}
              style={{ position: "relative" }}
            >
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