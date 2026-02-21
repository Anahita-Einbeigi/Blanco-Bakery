import { FaLinkedin, FaInstagram, FaEnvelope, FaPhone } from "react-icons/fa";

function Footer() {
  return (
    <footer className="footer text-white border-secondary">
      <div className="container p-4 ">
        <div className="row">

          {/* BRAND */}
          <div className="col-lg-4 col-md-12 mb-4">
            <h5 className="text-uppercase">Blanco Bakery</h5>
            <p>Professional bakery services</p>
          </div>

          {/* LINKS */}
          <div className="col-lg-4 col-md-12 mb-4">
            <h5 className="text-uppercase">Links</h5>
            <ul className="list-unstyled">
              <li><a href="/" className="text-white text-decoration-none">Home</a></li>
              <li><a href="/about" className="text-white text-decoration-none">About</a></li>
              <li><a href="/services" className="text-white text-decoration-none">Services</a></li>
              <li><a href="/contact" className="text-white text-decoration-none">Contact</a></li>
            </ul>
          </div>

          {/* QUICK CONTACT */}
          <div className="col-lg-4 col-md-12 mb-4">
            <h5 className="text-uppercase">Contact</h5>

            <p>
              <FaEnvelope className="me-2" />
              <a href="mailto:info@blanco.se" className="text-white text-decoration-none">
                info@blanco.se
              </a>
            </p>

            <p>
              <FaPhone className="me-2" />
              <a href="tel:+46729140576" className="text-white text-decoration-none">
                076-052 4646
              </a>
            </p>

            <p className="d-flex gap-3 mt-3">
              <a
                href="https://www.linkedin.com/in/linus-hahn-68428b123/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white fs-4"
              >
                <FaLinkedin />
              </a>

              <a
                href="https://www.instagram.com/ez_elteknik?igsh=MTQ0aHU4dzQxOXh0aw=="
                target="_blank"
                rel="noopener noreferrer"
                className="text-white fs-4"
              >
                <FaInstagram />
              </a>
            </p>
          </div>

        </div>
      </div>

      <div className="text-center p-3 border-top border-secondary">
        © {new Date().getFullYear()} EZ Elteknik. All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;
