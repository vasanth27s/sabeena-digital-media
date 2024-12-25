"use client";

import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import "./Footer.css";

const Footer = () => {
  const headingRef = useRef(null);
  const linkedinRef = useRef(null);
  const instagramRef = useRef(null);
  const facebookRef = useRef(null);

  useEffect(() => {
    // Register ScrollTrigger plugin
    gsap.registerPlugin(ScrollTrigger);

    // Animate the footer heading on each scroll into view
    gsap.fromTo(
      headingRef.current,
      { y: 50, opacity: 0 }, // Starting state
      {
        y: 0,
        opacity: 1,
        duration: 1.7,
        ease: "power3.out",
        scrollTrigger: {
          trigger: headingRef.current,
          start: "top 80%", // Animation starts when heading is 80% in view
          end: "bottom 20%", // Animation ends when heading is almost out of view
          toggleActions: "play none none none", // Replay animation on scroll down
          scrub: false, // Disable scrub for discrete animation
        },
      }
    );
  }, []);

  // Parallax animation for social headings
  const handleTextClick = (ref, direction) => {
    gsap.to(ref.current, {
      x: direction === "left" ? -50 : 50, // Move left or right
      duration: 0.5,
      ease: "power3.out",
      onComplete: () => {
        // Reset the position after animation
        gsap.to(ref.current, { x: 0, duration: 0.5, ease: "power3.inOut" });
      },
    });
  };

  return (
    <footer className="footer-container">
      {/* Animated Footer Heading */}
      <p ref={headingRef} className="footer-head">
        connect with us <br /> across the <br /> cosmos
      </p>

      {/* Social Media Section */}
      <div className="social-media">
        <div
          className="social-row"
          onClick={() => handleTextClick(linkedinRef, "left")}
        >
          <p ref={linkedinRef} className="social-heading">
            LinkedIn
          </p>
          <div className="social-icon">
            <img
              src="./images/linkedin.svg" // Replace with your LinkedIn icon's path
              alt="LinkedIn Icon"
              className="icon"
            />
          </div>
        </div>
        <hr className="divider" />

        <div
          className="social-row"
          onClick={() => handleTextClick(instagramRef, "right")}
        >
          <p ref={instagramRef} className="social-heading">
            Instagram
          </p>
          <div className="social-icon">
            <img
              src="./images/instagram.svg" // Replace with your Instagram icon's path
              alt="Instagram Icon"
              className="icon"
            />
          </div>
        </div>
        <hr className="divider" />

        <div
          className="social-row"
          onClick={() => handleTextClick(facebookRef, "left")}
        >
          <p ref={facebookRef} className="social-heading">
            Facebook
          </p>
          <div className="social-icon">
            <img
              src="./images/facebook.svg" // Replace with your Facebook icon's path
              alt="Facebook Icon"
              className="icon"
            />
          </div>
        </div>
        <hr className="divider" />
      </div>
    </footer>
  );
};

export default Footer;
