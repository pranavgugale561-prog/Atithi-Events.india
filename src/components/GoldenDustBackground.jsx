import { useEffect, useRef, useMemo } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

// ─── 3D Interactive Canvas Background ─────────────────────────────────────────
// Uses a pure Canvas 2D approach with depth-based perspective to simulate 3D,
// responding to mouse position for a parallax tilt effect.
function ThreeDCanvas() {
  const canvasRef = useRef(null);
  const mouse = useRef({ x: 0.5, y: 0.5 });
  const animRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const onMouseMove = (e) => {
      mouse.current.x = e.clientX / window.innerWidth;
      mouse.current.y = e.clientY / window.innerHeight;
    };
    window.addEventListener('mousemove', onMouseMove);

    // Generate particles in 3D space (x, y, z)
    const NUM = 180;
    const particles = Array.from({ length: NUM }, () => ({
      x: (Math.random() - 0.5) * 2,      // -1 to 1
      y: (Math.random() - 0.5) * 2,
      z: Math.random(),                    // 0 (far) to 1 (near)
      baseSize: Math.random() * 2 + 0.5,
      speed: Math.random() * 0.0003 + 0.0001,
      floatX: (Math.random() - 0.5) * 0.4,
      floatY: -(Math.random() * 0.3 + 0.05),
      angle: Math.random() * Math.PI * 2,
      angleSpeed: (Math.random() - 0.5) * 0.005,
      alpha: Math.random() * 0.5 + 0.15,
    }));

    // Nebula orbs (large glowing spheres)
    const orbs = [
      { cx: 0.15, cy: 0.25, r: 0.35, hue: 48, alpha: 0.025 },
      { cx: 0.8,  cy: 0.7,  r: 0.42, hue: 44, alpha: 0.018 },
      { cx: 0.5,  cy: 0.5,  r: 0.28, hue: 52, alpha: 0.012 },
    ];

    let t = 0;
    const draw = () => {
      t += 1;
      const { width, height } = canvas;

      // Deep clear
      ctx.clearRect(0, 0, width, height);

      // Rich dark gradient background
      const bg = ctx.createLinearGradient(0, 0, width, height);
      bg.addColorStop(0, '#06050a');
      bg.addColorStop(0.5, '#080610');
      bg.addColorStop(1, '#040308');
      ctx.fillStyle = bg;
      ctx.fillRect(0, 0, width, height);

      // Mouse parallax offsets
      const mx = (mouse.current.x - 0.5) * 2; // -1 to 1
      const my = (mouse.current.y - 0.5) * 2;

      // Draw nebula orbs with subtle mouse shift
      orbs.forEach(orb => {
        const ox = orb.cx * width + mx * 40;
        const oy = orb.cy * height + my * 25;
        const gr = ctx.createRadialGradient(ox, oy, 0, ox, oy, orb.r * width);
        gr.addColorStop(0, `hsla(${orb.hue}, 80%, 60%, ${orb.alpha})`);
        gr.addColorStop(1, 'transparent');
        ctx.fillStyle = gr;
        ctx.fillRect(0, 0, width, height);
      });

      // Draw grid lines (perspective "floor" feel)
      const horizon = height * 0.45 + my * 20;
      const vanishX  = width * 0.5  + mx * 60;
      ctx.save();
      ctx.globalAlpha = 0.04;
      ctx.strokeStyle = '#d4af37';
      ctx.lineWidth = 0.7;
      // Horizontal lines
      for (let i = 0; i < 12; i++) {
        const prog = i / 11;
        // Perspective: converge toward vanishing point
        const y = horizon + (height - horizon) * (prog ** 1.6);
        const xLeft  = vanishX * (1 - prog) + 0 * prog;
        const xRight = vanishX * (1 - prog) + width * prog;
        ctx.beginPath();
        ctx.moveTo(xLeft, y);
        ctx.lineTo(xRight, y);
        ctx.stroke();
      }
      // Vertical lines
      for (let i = 0; i < 14; i++) {
        const prog = i / 13;
        const startX = vanishX;
        const endX   = prog * width;
        ctx.beginPath();
        ctx.moveTo(startX, horizon);
        ctx.lineTo(endX, height + 50);
        ctx.stroke();
      }
      ctx.restore();

      // Draw particles with depth-based perspective projection
      particles.forEach(p => {
        // Animate float
        p.angle += p.angleSpeed;
        p.x += Math.sin(p.angle) * p.speed + p.floatX * 0.001;
        p.y += p.floatY * 0.0015;
        p.z += p.speed * 0.3;

        // Reset when off-screen
        if (p.y < -1.2 || p.x < -1.5 || p.x > 1.5) {
          p.x = (Math.random() - 0.5) * 2;
          p.y = 1.2;
          p.z = Math.random() * 0.5;
          p.angle = Math.random() * Math.PI * 2;
        }
        if (p.z > 1) p.z = 0;

        // Perspective projection: depth simulates near/far layering
        const depth = 0.3 + p.z * 0.7;    // 0.3=far, 1=near
        const parallaxX = mx * depth * 40;
        const parallaxY = my * depth * 25;

        const sx = (p.x * 0.5 + 0.5) * width  + parallaxX;
        const sy = (p.y * 0.5 + 0.5) * height + parallaxY;
        const sz = p.baseSize * depth * 2.5;
        const sa = p.alpha * depth;

        if (sz < 0.3) return;

        ctx.save();
        ctx.globalAlpha = Math.min(sa, 0.85);

        // Larger particles get a glow
        if (sz > 1.5) {
          const glow = ctx.createRadialGradient(sx, sy, 0, sx, sy, sz * 3.5);
          glow.addColorStop(0, `rgba(255, 215, 0, ${sa * 0.8})`);
          glow.addColorStop(0.4, `rgba(212, 175, 55, ${sa * 0.3})`);
          glow.addColorStop(1, 'transparent');
          ctx.fillStyle = glow;
          ctx.beginPath();
          ctx.arc(sx, sy, sz * 3.5, 0, Math.PI * 2);
          ctx.fill();
        }

        // Core dot
        ctx.fillStyle = `rgba(212, 175, 55, ${sa * 1.5})`;
        ctx.beginPath();
        ctx.arc(sx, sy, sz * 0.8, 0, Math.PI * 2);
        ctx.fill();

        ctx.restore();
      });

      animRef.current = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', onMouseMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 0,
        pointerEvents: 'none',
        display: 'block',
      }}
    />
  );
}

export default function GoldenDustBackground() {
  return <ThreeDCanvas />;
}
