import { Row, Col } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import hero from "../assets/hero.png";
import hero2 from "../assets/hero2.png";

function Home() {
    const { t } = useTranslation();
    return (
        <div className="home-section">
            <Row>
                <Col md={1} className="text-center">
                    <img src={hero2} alt="chokolat" /> 
                </Col>
                
                <Col md={6} className="mt-4 pt-4">
                    <h1 className="mt-5 pt-5">{t("homePage.heroTitle")}<br></br> <span className="hero-highlight">{t("homePage.heroTitle2")}</span></h1>
                    <p className="mt-4">{t("homePage.heroInfo")}</p>
                    <p>{t("homePage.heroInfo2")}</p>
                    <p>{t("homePage.heroInfo3")}</p>
                </Col>

                <Col md={5} className="d-flex justify-content-center align-items-end">
                    <img src={hero} alt="cake" className="img-fluid hero-img" />
                </Col>
            </Row>
        </div>
    );
}

export default Home;