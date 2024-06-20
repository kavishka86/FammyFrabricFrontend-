import React from "react";
import "../Homepage.css"; // Import your CSS file
import { Link } from 'react-router-dom';
import mainbanner from "./image/newbanner.png";
import clothmaking from "./image/clothmaking.jpg";
import pirikara1 from "./image/pirikara1.jpg";
import fabricnew from "./image/fabricnew.jpg";
import curtains from "./image/curtains.jpg";
import p1 from "./image/p1.png";

function Header() {
  return (
    <header className="famheader-bar">
      <div className="famwrapper">
        <div className="famnavbar">
          <div className="famlogo">
            <a href="#">Fammy </a>
            <img className="kkk" src={p1} alt="famlogo" />{" "}
            {/* Use the imported image */}
          </div>
          <ul className="links">
            <li>
              <a href="#">Home</a>
            </li>
            <li>
              <Link to="/login" >Check Fabrics</Link>
            </li>
            
            <li>
              <a href="#about-section">About</a>
            </li>
            <li>
              <a href="#contact-section">Contact</a>
            </li>

            <div className="famtoggle_btn">
            
              <Link to="/login" className="log">Login</Link>
              <Link to="/register" className="reg">SignUp</Link>
            
            </div>
          </ul>
        </div>
      </div>
    </header>
  );
}

function famWelcome() {
  return (
    <div className="famWelcome">
      <p className="famWelcome-dis">Our Services</p>
    </div>
  );
}

function Featured() {
  return (
    <section id="featured">
      <ul>
        {/* Your list items go here */}
        <li>
          <img className="" src={fabricnew} alt="famlogo" />{" "}
          {/* Use the imported image */}
          <a href="#">
            <b>Fabric Materials</b>
          </a>
          {/* <span>$30</span> */}
          <span className="rating"></span>
        </li>
        <li>
          <img className="" src={clothmaking} alt="famlogo" />{" "}
          {/* Use the imported image */}
          <a href="#">
            <b>Customized Clothes</b>
          </a>
          {/* <span>$30</span> */}
          <span className="rating"></span>
        </li>
        <li>
          <img className="" src={curtains} alt="famlogo" />{" "}
          {/* Use the imported image */}
          <a href="#">
            <b>Curtains Materials</b>
          </a>
          {/* <span>$30</span> */}
          <span className="rating"></span>
        </li>
        <li>
          <img className="" src={pirikara1} alt="famlogo" />{" "}
          {/* Use the imported image */}
          <a href="#">
            <b>Ata prikara</b>
          </a>
          {/* <span>$30</span> */}
          <span className="rating"></span>
        </li>
      </ul>
    </section>
  );
}


function HomeMenu() {
  return (
    <div className="famwrapper">
      <section id="home-menu">
        <h2>Menu</h2>
        <ul>
          <li>{/* Your menu items go here */}</li>
        </ul>
      </section>
    </div>
  );
}

function AboutSection() {
  return (
    <section id="about-section">
      <div className="famwrapper">{/* Your about section content */}</div>
    </section>
  );
}

function ContactSection() {
  return (
    <section id="contact-section">
      <div className="famwrapper">
        {/* Your contact section content */}

        <section id="home-menu">
          <h2>Menu</h2>
          <ul>
            <section id="about-section">
              <div class="famwrapper">
                {/* <h2>About Us</h2> */}
                <li>
                  <span class="famdish">About Us</span>
                  {/* <span class="price">$30</span> */}
                  <span class="description">
                    <br />
                    <br />
                    <br />
                    famWelcome to Fammy The Fabric Shop, your ultimate destination
                    for fabric and tailor management solutions. At Fammy The
                    Fabric Shop, we're passionate about revolutionizing the way
                    fabric and tailoring businesses operate. Our journey began
                    with a simple yet profound vision: to empower fabric
                    vendors, tailors, and businesses with cutting-edge
                    technology to streamline their operations, enhance
                    efficiency, and elevate customer experiences. With years of
                    experience in the fabric and fashion industry, we understand
                    the challenges faced by businesses in managing their
                    inventory, orders, and customer relationships. That's why
                    we've developed a comprehensive suite of tools and solutions
                    tailor-made to meet the unique needs of fabric and tailoring
                    businesses. Thank you for choosing Fammy The Fabric Shop.
                    Let's embark on this journey together and unlock the full
                    potential of your business.
                  </span>
                </li>
              </div>
            </section>

            <section id="contact-section">
              <div class="famwrapper">
                {/* <h2>Contact Us</h2> */}
                <li>
                  <span class="famdish">Contact Us</span>
                  {/* <span class="price">$30</span> */}
                  <span class="description_topic">
                    <br />
                    <br />
                    Address
                    <br />
                  </span>
                  <span class="description">
                    <a href="#contact-section">
                      Main street, Gampaha, Sri Lanka, 110000
                    </a>
                  </span>
                  <span class="description_topic">
                    <br />
                    Mobile
                    <br />
                  </span>
                  <span class="description">
                    <a href="tel:0332228127">0332 228 127</a>,{" "}
                    <a href="tel:0703100209">070 3100209</a>
                  </span>
                  <span class="description_topic">
                    <br />
                    Email
                    <br />
                  </span>
                  <span class="description">
                    <a href="mailto:senpurafammy@gmail.com">
                      senpurafammy@gmail.com
                    </a>
                  </span>
                  <span class="description_topic">
                    <br />
                    Service area
                    <br />
                  </span>
                  <span class="description">
                    <a href="#contact-section">Gampaha, Sri Lanka</a>
                  </span>
                </li>
              </div>
            </section>
          </ul>
        </section>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer>
      <div className="famfooter">
        {/* Your footer content */}
        <ul>
          <li>Main street,</li>
          <li>Gampaha,</li>
          <li>Sri Larka,</li>
          <li>110000.</li>
        </ul>
        {/* <ul>
          <li>France Restaurant</li>
          <li>68, rue de le Couronne</li>
          <li>75002 PARIS</li>
          <li>02.94.23.69.56</li>
        </ul> */}
        <ul>
          <li>
            <a href="#">Blog</a>
          </li>
          <li>
            <a href="#">Careers</a>
          </li>
          <li>
            <a href="#">Privacy Policy</a>
          </li>
          <li>
            <a href="#">Contact</a>
          </li>
        </ul>
        <ul>
          {/* <li><img className="famg1" src="famg1.png" alt="famlogo" /></li> */}
          <li>&copy; All Rights Reserved 2017</li>
        </ul>
      </div>
    </footer>
  );
}


function MainBanner() {
  return (
    <div id="main-banner">
      {/* Main banner content */}
      <img className="mainbanner" src={mainbanner} alt="famlogo" />{" "}
      {/* Use the imported image */}
    </div>
  );
}


function App() {
  return (
    <div>
      <Header />
      <div className="famempty-div"></div>
      <MainBanner /> {/* Include the MainBanner component */}
      <famWelcome />
      <Featured />
      <hr
        style={{
          height: "12px",
          borderWidth: "0",
          color: "#0eae4e",
          backgroundColor: "#0eae4e",
        }}
      />
      <HomeMenu />
      <AboutSection />
      <ContactSection />
      <Footer />
    </div>
  );
}

export default App;