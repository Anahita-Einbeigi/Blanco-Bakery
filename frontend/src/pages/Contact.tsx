import {Container,Form,Button,Row,Col} from "react-bootstrap";
import { useTranslation } from "react-i18next";
import blanco from "../assets/blanco.png";

export default function Contact() {
  const { t } = useTranslation();

  return (
    <section id="contact" className="contact-section py-5">
      <Container>
        {/* CONTACT */}
        <Row className="mb-5 ">
          <Col md={6} lg={6}>
            <h2>{t("contact")}</h2>

            <Form className="bg-dark p-4 rounded text-white">
              <Form.Group className="mb-3">
                <Form.Label>{t("name")}</Form.Label>
                <Form.Control required />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>{t("email")}</Form.Label>
                <Form.Control type="email" required />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>{t("phone")}</Form.Label>
                <Form.Control />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>{t("message")}</Form.Label>
                <Form.Control as="textarea" rows={4} />
              </Form.Group>

              <Button variant="light">{t("send")}</Button>
            </Form>
          </Col>
          <Col md={5} lg={5} className="blanco-contact d-flex align-items-center justify-content-center">
            <img src={blanco} alt="Blanco logo" className="img-fluid contact-image" style={{ maxHeight: "300px" }} />
          </Col>
        </Row>
        <Row>
          <Col md={12} lg={12}>
            <h2>{t("Location")}</h2>
            <p>Svängrumsgatan 65, 421 73 Västra Frölunda</p>
            <p>Phone: 0760524646</p>
            <p>Email: info@blanco.se</p>
            {/* location */}
            <div>
                <div className="map-responsive">
                    <iframe
                    title="Blanco bakery Location"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d7719.673017461938!2d11.929093276749553!3d57.66599265419247!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x464ff2dc441c8d11%3A0xb753795ddd5a3908!2sSv%C3%A4ngrumsgatan%2065%2C%20421%2073%20V%C3%A4stra%20Fr%C3%B6lunda!5e0!3m2!1sen!2sse!4v1771580197440!5m2!1sen!2sse"
                    width="100%"
                    height="400"
                    style={{ border: "1px solid #ccc" }}
                    allowFullScreen={false}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    ></iframe>
                </div>
            </div>
            </Col>
        </Row>
      </Container>
    </section>
  );
}

