"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Instagram, Facebook, Youtube } from "lucide-react";

/* ─────────────────────────────────────────────
   Target launch date: April 19, 2026
   ───────────────────────────────────────────── */
const LAUNCH_DATE = new Date("2026-04-19T00:00:00");

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

function getTimeLeft(): TimeLeft {
  const diff = LAUNCH_DATE.getTime() - Date.now();
  if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
}

function pad(n: number) {
  return String(n).padStart(2, "0");
}

/* ────────── Floating particle ────────── */
interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  duration: number;
  delay: number;
  opacity: number;
}

function generateParticles(count: number): Particle[] {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 4 + 2,
    duration: Math.random() * 8 + 6,
    delay: Math.random() * 5,
    opacity: Math.random() * 0.4 + 0.1,
  }));
}

export default function ComingSoon() {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>(getTimeLeft());
  const [particles] = useState<Particle[]>(() => generateParticles(18));
  const [mounted, setMounted] = useState(false);

  /* Countdown */
  useEffect(() => {
    setMounted(true);
    const id = setInterval(() => setTimeLeft(getTimeLeft()), 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <div
      style={{
        minHeight: "100dvh",
        width: "100%",
        position: "relative",
        overflow: "hidden",
        background: "linear-gradient(135deg, #0a0a0a 0%, #1a0f0f 40%, #0d0d0d 100%)",
        fontFamily: "var(--font-GeneralSans, 'General Sans', sans-serif)",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* ── Background ── */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 0,
          background: "linear-gradient(135deg, #0a0a0a 0%, #1a0f0f 50%, #0d0d0d 100%)",
        }}
      />

      {/* ── Floating ambient particles ── */}
      {particles.map((p) => (
        <div
          key={p.id}
          style={{
            position: "absolute",
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
            borderRadius: "50%",
            background: "radial-gradient(circle, #d4a574, #c17b3e)",
            opacity: p.opacity,
            zIndex: 1,
            animation: `floatParticle ${p.duration}s ${p.delay}s ease-in-out infinite alternate`,
            pointerEvents: "none",
          }}
        />
      ))}

      {/* ── Decorative top gradient bar ── */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: 2,
          background: "linear-gradient(90deg, transparent, #d4a574, #c17b3e, #d4a574, transparent)",
          zIndex: 20,
        }}
      />

      {/* ── Main content ── */}
      <div className="main-content-container">
        {/* Logo */}
        <div className="logo-wrapper">
          <Image
            src="/logo.svg"
            alt="Serena Braide"
            width={160}
            height={48}
            className="brand-logo"
          />
        </div>

        {/* Pre-title */}
        <p className="pre-title">Something beautiful is coming</p>

        {/* Headline */}
        <h1 className="headline">
          We&apos;re Almost
          <br />
          <em className="headline-italic">Ready</em>
        </h1>

        {/* ── Countdown ── */}
        <div className="countdown-container">
          {[
            { label: "Days", value: timeLeft.days },
            { label: "Hours", value: timeLeft.hours },
            { label: "Minutes", value: timeLeft.minutes },
            { label: "Seconds", value: timeLeft.seconds },
          ].map((unit) => (
            <div key={unit.label} className="countdown-unit">
              <div className="countdown-box">
                <div className="countdown-glow" />
                <span className="countdown-value">{pad(unit.value)}</span>
              </div>
              <span className="countdown-label">{unit.label}</span>
            </div>
          ))}
        </div>

        {/* ── Socials ── */}
        <div className="socials-wrapper">
          <p className="socials-title">Follow us for updates</p>
          <div className="socials-icons">
            <a
              href="https://www.instagram.com/serenabraide?igsh=MWQ1ZTB2eDk0NHVpcQ=="
              target="_blank"
              rel="noopener noreferrer"
              className="social-link"
            >
              <Instagram size={20} />
            </a>
            <a
              href="https://www.tiktok.com/@serenabraide?_r=1&_t=ZS-93jT9cDC5R6"
              target="_blank"
              rel="noopener noreferrer"
              className="social-link"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.28 6.28 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.14 8.14 0 0 0 4.78 1.53V6.79a4.85 4.85 0 0 1-1-.1z" />
              </svg>
            </a>
            <a
              href="https://www.facebook.com/share/17nFJ8EPDH/"
              target="_blank"
              rel="noopener noreferrer"
              className="social-link"
            >
              <Facebook size={20} />
            </a>
            <a
              href="https://youtube.com/@serenabraideofficial?si=-rulUJc-gy-VgBjZ"
              target="_blank"
              rel="noopener noreferrer"
              className="social-link"
            >
              <Youtube size={20} />
            </a>
          </div>
        </div>
      </div>

      {/* ── Footer ── */}
      <footer className="page-footer">
        © {new Date().getFullYear()} Serena Braide. All rights reserved.
      </footer>

      {/* ── Global keyframe styles ── */}
      <style>{`
        .main-content-container {
          position: relative;
          z-index: 10;
          flex: 1;
          display: flex;
          flex-direction: column;
          alignItems: center;
          justify-content: center;
          padding: 48px 24px;
          animation: ${mounted ? "fadeInUp 1s ease forwards" : "none"};
          opacity: ${mounted ? 1 : 0};
          text-align: center;
        }
        .logo-wrapper {
          margin-bottom: 40px;
          display: flex;
          justify-content: center;
        }
        .brand-logo {
          filter: brightness(0) invert(1);
          width: 160px;
          height: auto;
        }
        .pre-title {
          font-size: 11px;
          letter-spacing: 0.35em;
          text-transform: uppercase;
          color: #d4a574;
          margin-bottom: 20px;
          font-weight: 500;
        }
        .headline {
          font-size: clamp(2.4rem, 8vw, 5.5rem);
          font-weight: 300;
          color: #f5f0eb;
          text-align: center;
          line-height: 1.1;
          letter-spacing: -0.02em;
          margin: 0 0 56px 0;
          font-family: var(--font-PPEditorialNew, Georgia, serif);
        }
        .headline-italic {
          font-style: italic;
          color: #d4a574;
        }
        .countdown-container {
          display: flex;
          gap: clamp(12px, 4vw, 40px);
          margin-bottom: 64px;
          flex-wrap: wrap;
          justify-content: center;
        }
        .countdown-unit {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 8px;
        }
        .countdown-box {
          width: clamp(64px, 20vw, 96px);
          height: clamp(64px, 20vw, 96px);
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(212,165,116,0.25);
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          backdrop-filter: blur(12px);
          position: relative;
          overflow: hidden;
          box-shadow: 0 8px 32px rgba(0,0,0,0.3), inset 0 1px 0 rgba(212,165,116,0.1);
        }
        .countdown-glow {
          position: absolute;
          inset: 0;
          background: radial-gradient(ellipse at 50% 0%, rgba(212,165,116,0.08) 0%, transparent 70%);
        }
        .countdown-value {
          font-size: clamp(1.4rem, 5vw, 2.25rem);
          font-weight: 200;
          color: #f5f0eb;
          letter-spacing: -0.02em;
          position: relative;
          z-index: 1;
          font-variant-numeric: tabular-nums;
        }
        .countdown-label {
          font-size: 10px;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: rgba(212,165,116,0.7);
          font-weight: 500;
        }
        .socials-wrapper {
          text-align: center;
          margin-bottom: 24px;
        }
        .socials-title {
          font-size: 13px;
          color: rgba(245,240,235,0.5);
          letter-spacing: 0.1em;
          text-transform: uppercase;
          margin-bottom: 16px;
        }
        .socials-icons {
          display: flex;
          gap: 16px;
          justify-content: center;
        }
        .social-link {
          background: rgba(255,255,255,0.05);
          width: 44px;
          height: 44px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #d4a574;
          border: 1px solid rgba(212,165,116,0.2);
          transition: all 0.3s ease;
        }
        .social-link:hover {
          background: rgba(212,165,116,0.15);
          transform: scale(1.1);
        }
        .page-footer {
          position: relative;
          z-index: 10;
          text-align: center;
          padding: 24px;
          border-top: 1px solid rgba(255,255,255,0.05);
          color: rgba(245,240,235,0.25);
          font-size: 12px;
          letter-spacing: 0.05em;
        }

        @media (max-width: 640px) {
          .main-content-container {
            padding: 32px 16px;
          }
          .logo-wrapper {
            margin-bottom: 32px;
          }
          .brand-logo {
            width: 130px;
          }
          .headline {
            margin-bottom: 40px;
          }
          .countdown-container {
            gap: 12px;
            margin-bottom: 48px;
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            max-width: 240px;
            margin-left: auto;
            margin-right: auto;
          }
          .countdown-box {
            width: 80px;
            height: 80px;
          }
        }

        @keyframes floatParticle {
          0%   { transform: translateY(0px) scale(1); }
          100% { transform: translateY(-24px) scale(1.3); }
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}
