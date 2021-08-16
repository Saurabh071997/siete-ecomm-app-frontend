import './Footer.css'
import twitter from "../images/twitter.svg";
import linkedin from "../images/linkedin.svg";
import github from "../images/github.svg";
import mail from "../images/mail.svg";

export function Footer() {
  return (
    <div className="footer">
      <div className="footer-content">
        <div className="footer-content-head">SIGN UP FOR NEWSLETTER</div>
        <div className="footer-content-txt">
          Sign up now and be the first to know about exclusive offers, latest
          fashion news and style tips!
        </div>
      </div>
      <div className="footer-social-link-bar">
        <a
          href="https://twitter.com/im_saurabhK"
          className="footer-social-link"
        >
          <img
            className="footer-social-link-img img25x25"
            src={twitter}
            alt="twitter"
          />
        </a>

        <a
          href="https://www.linkedin.com/in/saurabh-kamboj/"
          className="footer-social-link"
        >
          <img
            className="footer-social-link-img img25x25"
            src={linkedin}
            alt="linkedin"
          />
        </a>

        <a
          href="https://github.com/Saurabh071997"
          className="footer-social-link"
        >
          <img
            className="footer-social-link-img img25x25"
            src={github}
            alt="github"
          />
        </a>

        <a
          href="mailto:saurabhkamboj1997@gmail.com"
          className="footer-social-link"
        >
          <img
            className="footer-social-link-img img25x25"
            src={mail}
            alt="mail"
          />
        </a>
      </div>
      <div className="footer-content">
        <div className="footer-content-txt">
          The content of this site is copyright-protected and is the property of
          Arepo . Arepo's business concept is to offer fashion and quality at
          the best price
        </div>
        <div className="footer-app-name">Siete</div>
        <div className="footer-content-txt">A product by</div>
        <div className="footer-company-name">arepo</div>
      </div>
    </div>
  );
}
