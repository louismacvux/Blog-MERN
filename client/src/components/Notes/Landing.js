import React, { useEffect } from "react";
import "../../styling/landing.css";
import GoogleLogin from "../GoogleLogin";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
// Header Component
const Header = () => (
  <header className="header">
    <div className="logo">NoteBinder</div>
    <nav className="nav">
      <a href="#" className="nav-item">
        Home
      </a>
      <a href="#features" className="nav-item">
        Features
      </a>
      <a href="#about" className="nav-item">
        About
      </a>
      <a href="#login" className="nav-item">
        <GoogleLogin buttonName={" Login"} />
      </a>
    </nav>
  </header>
);

// Hero Component
const Hero = () => (
  <section className="hero">
    <h1>Organize Your Notes with NoteBinder</h1>
    <p>Simple, efficient, and perfect for anyone who loves using Markdown.</p>
    <p>
      NoteBinder was created to make note-taking easier, whether for personal
      projects, work, or study. Dive into a seamless experience designed by a
      Markdown user.
    </p>
    <br/>
    <button className="cta-button primary">
      <GoogleLogin buttonName={" Get Started for free"} />
    </button>
  </section>
);

// Features Component
const Features = () => (
  <section id="features" className="features">
    <h2>Features</h2>
    <div className="feature-list">
      <div className="feature-item">
        <h3>Markdown Support</h3>
        <p>Easily format your lecture notes with Markdown syntax.</p>
      </div>
      <div className="feature-item">
        <h3>Code Snippets</h3>
        <p>Embed and highlight code snippets for quick reference.</p>
      </div>
      <div className="feature-item">
        <h3>Search and Organize</h3>
        <small>Coming Soon</small>
        <p>Use powerful search and tagging features to stay organized.</p>
      </div>
      <div className="feature-item" style={{ display: "none" }}>
        <h3>Collaborative Editing</h3>
        <p>Share notes and collaborate with classmates in real-time.</p>
      </div>
    </div>
  </section>
);

// About Component
const About = () => (
  <section id="about" className="about">
    <h2>About NoteBinder</h2>
    <p >
      NoteBinder is a hobby project I created with students in mind. Having used
      Markdown to take lecture notes during my own studies, I wanted to build my
      own tool to make note-taking more efficient and enjoyable.
    </p>
    <p >
      While NoteBinder is inspired by the needs of computer science students,
      it’s versatile enough for anyone who appreciates a powerful Markdown-based
      note-taking experience. Whether you're a student, a developer, or just
      someone who loves using Markdown, NoteBinder is designed to meet your
      needs.
    </p>
    <img
      src="students-working.jpg"
      alt="Students collaborating with laptops"
      className="about-image"
    />
  </section>
);

// CTA Component
const CallToAction = () => (
  <section className="cta-section">
    <h2>Ready to boost your study productivity?</h2>
    <button className="cta-button primary"><GoogleLogin buttonName={" Login"}/></button>
  </section>
);

// Footer Component
const Footer = () => (
  <footer className="footer">
    <div className="footer-links">
      <a href="#">Contact</a>
      <a href="#">Privacy Policy</a>
      <a href="#">Terms of Service</a>
    </div>
    <div className="social-icons">
      <a href="#">
        <img src="twitter-icon.png" alt="Twitter" />
      </a>
      <a href="#">
        <img src="linkedin-icon.png" alt="LinkedIn" />
      </a>
      <a href="https://github.com/louismacvux/Blog-MERN">
        <FontAwesomeIcon icon={faGithub} title="GitHub" />
      </a>
    </div>
    <p>© 2024 NoteBinder. All rights reserved.</p>
  </footer>
);

// Main Landing Page Component
export default function LandingPage(){
  useEffect(() => {
    document.title = `NoteBinder`;
  },[])

  return(
    <div>
      <Header />
      <Hero />
      <Features />
      <About />
      <CallToAction />
      <Footer />
    </div>
  );
};

