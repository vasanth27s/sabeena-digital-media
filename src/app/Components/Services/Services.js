"use client";
import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import Stats from "../Stats/Stats";
import Link from "next/link";
import "./Services.css";

const Services = () => {
  const headingRef = useRef(null);
  const cardsRef = useRef([]);
  const whoWeAreRef = useRef(null);
  const scrollTextRefs = useRef([]);
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    // Scroll animation for 'Who We Are' section
    if (whoWeAreRef.current) {
      gsap.fromTo(
        whoWeAreRef.current,
        { opacity: 0, y: 100 },
        {
          opacity: 1,
          y: 0,
          scrollTrigger: {
            trigger: whoWeAreRef.current,
            start: "top 80%",
            end: "top 50%",
            scrub: true,
          },
        }
      );
    }

    // Scroll animation for heading
    if (headingRef.current) {
      gsap.fromTo(
        headingRef.current,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          scrollTrigger: {
            trigger: headingRef.current,
            start: "top 90%",
            end: "top 60%",
            scrub: true,
          },
        }
      );
    }

    // Scroll animations for service cards
    cardsRef.current.forEach((card, index) => {
      gsap.fromTo(
        card,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          scrollTrigger: {
            trigger: card,
            start: "top 90%",
            end: "top 70%",
            scrub: true,
          },
        }
      );
    });

    // Scroll animations for scroll-text elements
    scrollTextRefs.current.forEach((text) => {
      gsap.fromTo(
        text,
        { x: -100 },
        {
          x: 0,
          scrollTrigger: {
            trigger: text,
            start: "top 100%",
            end: "top 80%",
            scrub: true,
          },
        }
      );
    });

    // Mouse move event for cursor effect
    const handleMouseMove = (e) => {
      setCursorPos({
        x: e.clientX,
        y: e.clientY,
      });
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <section className="services-container" id="our-services">
      {/* Who We Are Section */}
      <div className="who-are-we" id="WhoWeAre" ref={whoWeAreRef}>
        <h2 className="who-are-we-head">who <br /> we are</h2>
        <h4 className="who-are-we-subhead scroll-text" ref={(el) => scrollTextRefs.current.push(el)}>
          As a pioneering force in the digital galaxy, SDMS® <br />
          blends creativity with
          cutting-edge technology <br />to craft your brand’s journey through the stars.
        </h4>
        <p className="who-are-we-tag scroll-text">
          We help your business launch into the digital <br />cosmos, delivering powerful
          websites and apps <br />that leave a lasting impact. Our expertise in the <br />latest
          digital trends ensures your brand orbits <br />success, expanding across the universe
          of <br />possibilities.
        </p>
      </div>

      {/* Heading */}
      <h2 className="services-heading scroll-text" ref={headingRef}>
        our <br /> services
      </h2>
      <p className="our-services-tag">
        Like a constellation, our services align to create a universe of endless
        possibilities.
      </p>

      {/* Service Cards */}
      {[ 
        {
          imgSrc: "./images/service1.jpeg",
          title: "development",
          list: [
            " Software as a Service (SaaS)",
            "Automation / API Creation",
            "Website / App Creation",
            "POS Systems",
            "UI/UX Design",
          ],
        },
        {
          imgSrc: "./images/service2.jpeg",
          title: "marketing & branding",
          list: [
            "Video Creation (from Reels to AR/VR videos)",
            "Content Writing",
            "Social Media Management",
            "Ads Management",
            "Whatsapp & Email Marketing",
          ],
        },
      ].map((service, index) => (
        <div
          key={index}
          className="services-card"
          ref={(el) => (cardsRef.current[index] = el)}
          style={{
            transform: `translateX(${(cursorPos.x * 0.05)}px)`,
          }}
        >
          {/* Image Section */}
          <img
            className="services-image"
            src={service.imgSrc}
            alt={`${service.title} Image`}
            style={{
              transform: `translateX(${(cursorPos.x * 0.05)}px)`,
            }}
          />
          {/* Text Section */}
          <div className="services-text">
            <h3 className="services-text-head">{service.title}</h3>
            <ul className="services-text-para">
              {service.list.map((item, idx) => (
                <li key={idx}>{item}</li>
              ))}
            </ul>
            <Link href="/ServicesPage">
              <button className="contact-button">More Info</button>
            </Link>
          </div>
        </div>
      ))}
      
      {/* Stats Section */}
      <Stats />
    </section>
  );
};

export default Services;
