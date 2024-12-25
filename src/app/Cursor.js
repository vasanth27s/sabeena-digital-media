"use client";
import { useEffect, useRef, useState } from "react";
import '../styles/globals.css';

export default function CursorWithSmoke({ darkMode }) {
  const canvasRef = useRef(null);
  const [pointer, setPointer] = useState({ x: window.innerWidth / 2, y: window.innerHeight / 2 });
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    const smokeTrails = [];
    const maxTrails = 100;

    const params = {
      smokeOpacity: 0.05,
      smokeSpread: 25,
      smokeFade: 0.001,
      dragSmokeBoost: 100,
    };

    function addSmoke(x, y, dx, dy) {
      if (smokeTrails.length < maxTrails) {
        smokeTrails.push({
          x,
          y,
          dx,
          dy,
          opacity: 1,
          color: Math.random() > 0.5 ? "rgba(135, 206, 250," : "rgba(0, 0, 0,", 
        });
      }
    }

    // Mouse movement to track cursor
    const handleMouseMove = (e) => {
      setPointer({ x: e.pageX, y: e.pageY });
      for (let i = 0; i < 10; i++) {
        const dx = (Math.random() - 0.5) * params.smokeSpread;
        const dy = (Math.random() - 0.5) * params.smokeSpread;
        addSmoke(e.pageX, e.pageY, dx, dy);
      }
    };

    // Handling mouse drag (if needed)
    const handleMouseDown = () => {
      setIsDragging(true);
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    const handleScroll = () => {
      for (let i = 0; i < 2000; i++) {  
        const x = pointer.x + (Math.random() - 0.5) * params.smokeSpread * 100;  
        const y = pointer.y + (Math.random() - 0.5) * params.smokeSpread * 100;  
        const dx = (Math.random() - 0.5) * params.smokeSpread;
        const dy = (Math.random() - 0.5) * params.smokeSpread;
        addSmoke(x, y, dx, dy);
      }
    };

    const handleResize = () => {
      canvas.width = document.body.scrollWidth;
      canvas.height = document.body.scrollHeight;
    };

    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      smokeTrails.forEach((trail, index) => {
        trail.x += trail.dx;
        trail.y += trail.dy;
        trail.opacity -= params.smokeFade;

        if (trail.opacity <= 0) {
          smokeTrails.splice(index, 1);
        } else {
          const gradient = ctx.createRadialGradient(trail.x, trail.y, 0, trail.x, trail.y, 50);
          gradient.addColorStop(0, `${trail.color} ${trail.opacity})`);
          gradient.addColorStop(1, "rgba(0, 0, 0, 0)");

          ctx.beginPath();
          ctx.arc(trail.x, trail.y, 50, 0, Math.PI * 2);
          ctx.fillStyle = gradient;
          ctx.fill();
        }
      });

      if (isDragging) {
        for (let i = 0; i < params.dragSmokeBoost; i++) {
          const dx = (Math.random() - 0.5) * params.smokeSpread;
          const dy = (Math.random() - 0.5) * params.smokeSpread;
          addSmoke(pointer.x, pointer.y, dx, dy);
        }
      }

      requestAnimationFrame(animate);
    }

    handleResize();
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);
    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleResize);

    animate();

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
    };
  }, [pointer, darkMode, isDragging]);

  return (
    <>
      <canvas
        ref={canvasRef}
        className="cursor-canvas"
      />
      <div 
        className="custom-cursor"
        style={{
          position: "absolute",
          top: `${pointer.y}px`,
          left: `${pointer.x}px`,
          width: "20px",
          height: "20px",
          backgroundColor: "skyblue",  
          borderRadius: "50%",
          pointerEvents: "none", 
          transform: "translate(-50%, -50%)",
        }}
      />
    </>
  );
}
