import { Container, Row, Col } from "react-bootstrap";
import { useTranslation } from "react-i18next";

import about1 from "../assets/av.mp4";
import about2 from "../assets/a1.jpg";
import about3 from "../assets/a2.jpg";
import parallaxBg from "../assets/1.png";

type Card = {
  title: string;
  text: string;
};

export default function About() {
  const { t } = useTranslation();

  const cards: Card[] = t("aboutPage.cards", { returnObjects: true }) as Card[];

  return (
    <>
      <section className="about-hero mt-4">
        <h1 className="mb-4">{t("aboutPage.heroTitle")}</h1>
        <p>{t("aboutPage.heroSubtitle")}</p>
      </section>

      <section className="py-5 about-content-section">
        <Container>
          <Row className="align-items-center">
            <Col md={6}>
              <Row>
                <Col xs={12}>
                  {/* <img src={about1} className="large-img mb-3" alt="" /> */}
                  <video
                    src={about1}        
                    className="large-img mb-3"
                    autoPlay              
                    loop                  
                    muted                 
                    playsInline           
                />
                </Col>
                <Col xs={6}>
                  <img src={about2} className="small-img" alt="" />
                </Col>
                <Col xs={6}>
                  <img src={about3} className="small-img" alt="" />
                </Col>
              </Row>
            </Col>

            <Col md={6}>
              <h2>{t("aboutPage.section1Title")}</h2>
              <p>{t("aboutPage.section1Text1")}</p>
              <p>{t("aboutPage.section1Text2")}</p>
            </Col>
          </Row>
        </Container>
      </section>

      {/* CARDS */}
      <section className="py-5 about-cards-section">
        <Container>
          <h2 className="text-center mb-4">{t("aboutPage.cardsTitle")}</h2>
          <Row>
            {cards.map((card, index) => (
              <Col md={4} key={index}>
                <div className="about-card p-4">
                  <h5>{card.title}</h5>
                  <p>{card.text}</p>
                </div>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* PARALLAX */}
      <section
        className="parallax-section d-flex align-items-center justify-content-center"
        style={{ backgroundImage: `url(${parallaxBg})` }}
      >
        <div className="parallax-content text-center text-white">
          <h2>{t("aboutPage.parallaxTitle")}</h2>
          <p>{t("aboutPage.parallaxText")}</p>
        </div>
      </section>
    </>
  );
}
