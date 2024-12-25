"use client";

import React, { useState , useEffect } from 'react';
import { motion } from 'framer-motion';
import ScrollingText from '../ScollingText/ScrollingText';
import './Testimonials.css';

const testimonials = [
  {
    name: "Melissa Hurtado",
    text: "Excited to highlight the exceptional talents of Rukshana, an incredible professional and dear friend! Rukshana of Sabeena Digital Media Services effortlessly wears many hats, showcasing exceptional skills in social media management, storytelling, and crafting engaging content for newsletters and marketing emails. Working alongside Rukshana is an absolute delight. The positive energy she brings to every collaboration is infectious, and her dedication to excellence is truly commendable! ",
    position: "Property Manager, Self employed ",
    image: "./images/MelissaHurta.jpeg"
  },
  {
    name: "Mariel McCann",
    text: "Rukshana of Sabeena Digital Media Services is a creative and talented social media content creator and manager! Rukshana has helped our 501c3 Shooting Stars Foundation by creating gorgeous collateral with high impact. She is patient and values all requests and feedback. She is an integral part of our social media and digital design strategy. Thank you, Rukshana for your passion, dedication",
    position: "Shooting Stars (Former) Senior Program Manager",
    image: "./images/Mariel.jpeg"
  },
  {
    name: "Vidhya",
    text: "We had the pleasure of working with Rukshana as our digital marketing partner at Right Dots, and her contributions were invaluable. Rukshana was instrumental in driving the marketing efforts for our Learning Series, showcasing her expertise in reaching and engaging our target audience. Her support during the sessions was exceptional; she not only helped us craft compelling content but also ensured that everything ran smoothly. Rukshana's creativity, professionalism, and dedication truly made a difference in the success of our initiative. We look forward to collaborating with her again in the future!",
    position: "Founder, Right Dots",
    image: "./images/vidhya.jpg"
  },
  {
    name: "Shivaranjani",
    text: "Need high impact content to be written? Look no further than Rukshana of Sabeena Digital Media Services!!! Rukshana weaves magic through her words that can leave you inspired,  touched and stirred up. You can bank on Rukshana and her team to deliver high quality content within required timelines in the most professional way. Here is a young girl with unbridled enthusiasm and passion to create impact through her powerful content - all the best to you Rukshana!!!",
    position: "Volunteer, Government School",
    image: "./images/shivaranjani.jpeg"
  },
  {
    name: "Chitra Shah",
    text: "I highly recommend SDMS for their exceptional work on our annual report and brochure. Their professionalism, creativity, and attention to detail transformed complex information into clear, visually engaging content.Rukshana’s collaborative approach, innovative design, and commitment to quality delivered results that exceeded our expectations and effectively highlighted our organization’s vision and achievements.SDMS is an excellent choice for any design or communication project requiring expertise and excellence..",
    position: "Director, Satya Special School",
    image: "./images/chitra.jpg"
  },

  // Additional testimonials...
];

const Testimonials = () => {
  const [dragConstraint, setDragConstraint] = useState(-2000); // Default for desktop
  
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 768) { // Mobile screen width (adjust as needed)
        setDragConstraint(-1500);
      } else {
        setDragConstraint(-2000);
      }
    };

    handleResize(); // Initial check
    window.addEventListener("resize", handleResize); // Listen to window resize

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="testimonials-container" id = "testimonials">
      <h2 className="testimonials-heading">partner's<br/>testimony</h2>
      <motion.div className="testimonials-wrapper" drag="x" dragConstraints={{ left: dragConstraint, right: 0 }}>
        {testimonials.map((testimonial, index) => (
          <motion.div
            key={index}
            className="testimonial-card"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            
            
            <p className="testimonial-text">"{testimonial.text}"</p>
            <img src={testimonial.image} alt={testimonial.name} className="testimonial-image" />
            <h3 className="testimonial-name">{testimonial.name}</h3>
            <span className="testimonial-position">{testimonial.position}</span>
          </motion.div>
        ))}
      </motion.div>
        <ScrollingText/>
    </div>
  );
};

export default Testimonials;
