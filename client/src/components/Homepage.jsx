import React, { useEffect } from "react";
import { Link } from "react-router-dom"; 
import "../components/style.css";
import Logo from './logo.png'; 
import Waste from './waste.jpg';
import Waste2 from './waste2.jpg';
import Header from './header.png';

function Homepage() {
    useEffect(() => {
      const TxtType = function (el, toRotate, period) {
        this.toRotate = toRotate;
        this.el = el;
        this.loopNum = 0;
        this.period = parseInt(period, 10) || 2000;
        this.txt = "";
        this.tick();
        this.isDeleting = false;
      };

      TxtType.prototype.tick = function () {
        const i = this.loopNum % this.toRotate.length;
        const fullTxt = this.toRotate[i];

        if (this.isDeleting) {
          this.txt = fullTxt.substring(0, this.txt.length - 1);
        } else {
          this.txt = fullTxt.substring(0, this.txt.length + 1);
        }

        this.el.innerHTML = '<span class="wrap">' + this.txt + "</span>";

        const that = this;
        let delta = 200 - Math.random() * 100;

        if (this.isDeleting) {
          delta /= 2;
        }

        if (!this.isDeleting && this.txt === fullTxt) {
          delta = this.period;
          this.isDeleting = true;
        } else if (this.isDeleting && this.txt === "") {
          this.isDeleting = false;
          this.loopNum++;
          delta = 500;
        }

        setTimeout(function () {
          that.tick();
        }, delta);
      };

      window.onload = function () {
        const elements = document.getElementsByClassName("typewrite");
        for (let i = 0; i < elements.length; i++) {
          const toRotate = elements[i].getAttribute("data-type");
          const period = elements[i].getAttribute("data-period");
          if (toRotate) {
            new TxtType(elements[i], JSON.parse(toRotate), period);
          }
        }
        // INJECT CSS
        const css = document.createElement("style");
        css.type = "text/css";
        css.innerHTML = ".typewrite > .wrap { border-right: 0.08em solid #fff}";
        document.body.appendChild(css);
      };
    }, []);

  return (
    <div>
      <nav>
        <div className="flex main-nav">
          <div className="logo-class flex">
            <Link to="/" className="company-logo img">
              <img src={Logo} alt="company-logo" />
            </Link>
            <h2 className="logo-name">BinSense</h2>
          </div>
          <div className="nav-links">
            <ul className="flex">
              <li>
                <Link to="/game" className="hover-link">
                  Game
                </Link>
              </li>
              <li>
                <Link to="/login" className="hover-link secondary-button">
                  Log In
                </Link>
              </li>
              <li>
                <Link to="/signup" className="hover-link primary-button">
                  Sign Up
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <header>
        <h1>
          <a
            href=""
            className="typewrite header-txt flex"
            data-period="2000"
            data-type='[ "Welcome to BinSense", "Understand and seggregate your waste!"]'
          >
            <span className="wrap"></span>
          </a>
        </h1>
        <div className="header-section flex">
          <div className="header-left">
            <p>
              BinSense is a platform for you to understand and track your waste
              seggrgation. To learn more about waste seggregation:
            </p>

            <br />
            <Link to="/about" className="hover-link primary-button">
              Learn More
            </Link>
          </div>
          <div className="header-right">
            <img src={Header} alt="man with waste seggreagation" />
          </div>
        </div>
      </header>

      <section className="big-feature-section">
        <div className="container flex big-feature-container">
          <div className="feature-img">
            <img src={Waste} alt="" />
          </div>
          <div className="feature-desc flex">
            <h2>What is waste seggregation?</h2>
            <p>
              Waste segregation is the process of identifying, classifying,
              dividing and sorting of garbage and waste products12. Waste
              segregation can help to reduce, reuse and recycle materials, and
              to avoid sending waste to landfills. Waste can be segregated into
              dry and wet categories, where dry waste includes wood, metals and
              glass, and wet waste includes organic waste
            </p>
          </div>
        </div>
      </section>
      <section className="big-feature-section">
        <div className="container flex big-feature-container">
          <div className="feature-desc flex">
            <h2>Why to seggregate?</h2>
            <p>
              When done properly, source waste segregation may reduce volumes of
              waste to be handled which would ultimately improve the collection
              and disposal efficiency. In addition, waste segregation at source
              may ease handling and processing, enhance the potential for
              resource recovery, fosters reuse and recycling and reduce
              operational costs.
            </p>
          </div>
          <div className="feature-img">
            <img src={Waste2} alt="" />
          </div>
        </div>
      </section>
      <footer>
        <div className="container flex footer-container">
          <div className="company-info link-coloumn flex">
            <a href="#" className="company-logo">
              <img src={Logo} alt="company-logo" />
            </a>
            <p>
              BinSense is a platform for you learn and track your waste
              seggregation effectively!
            </p>
          </div>

          <div className="link-coloumn flex">
            <h4>Pages</h4>
            <ul className="flex link-coloumn">
              <li>
                <Link to="/" className="hover-link">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/" className="hover-link">
                  Game
                </Link>
              </li>
              <Link to="/" className="hover-link">
                About
              </Link>
            </ul>
          </div>

          <div className="link-coloumn flex">
            <h4>Made By</h4>
            <a href="#" className="hover-link">
              Nidhi Kadam
            </a>
            <a href="#" className="hover-link">
              Meetali Kapse
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
export default Homepage;
