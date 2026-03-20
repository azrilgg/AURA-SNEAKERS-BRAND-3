'use client';
import { useRef, useEffect, useState } from 'react';
import Image from 'next/image';
import styles from './ClubSection.module.css';

function hexToRgb(hex) {
  const r = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return r ? `${parseInt(r[1],16)},${parseInt(r[2],16)},${parseInt(r[3],16)}` : '255,255,255';
}

const clubStats = {
  barcelona: [{ v:'26', l:'La Liga' },{ v:'5', l:'UCL' },{ v:'6', l:'Trophies 2009' }],
  'real-madrid': [{ v:'15', l:'UCL Titles' },{ v:'36', l:'La Liga' },{ v:'7', l:'Club World Cup' }],
  liverpool: [{ v:'6', l:'European Cups' },{ v:'19', l:'League Titles' },{ v:'1', l:'Istanbul' }],
  chelsea: [{ v:'2', l:'UCL Titles' },{ v:'6', l:'PL Titles' },{ v:'2', l:'Europa League' }],
  arsenal: [{ v:'13', l:'League Titles' },{ v:'49', l:'Unbeaten' },{ v:'14', l:'FA Cups' }],
  'ac-milan': [{ v:'7', l:'UCL Titles' },{ v:'19', l:'Serie A' },{ v:'5', l:'Super Cups' }],
};

export default function ClubSection({ club, index, onVisible }) {
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const isLeft = index % 2 === 0; // even = shoe RIGHT, odd = shoe LEFT

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (onVisible) onVisible(index);
        }
      },
      { threshold: 0.15 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, [index, onVisible]);

  const glowRgb = hexToRgb(club.colors.primary);
  const stats = clubStats[club.id] || [];
  const v = isVisible;

  return (
    <section
      ref={sectionRef}
      className={`${styles.section} pattern-${club.visualTheme}`}
      id={`club-${club.id}`}
      style={{
        '--club-primary': club.colors.primary,
        '--club-secondary': club.colors.secondary,
        '--club-accent': club.colors.accent,
        '--glow-rgb': glowRgb,
      }}
    >
      {/* Ambient background */}
      <div className={`${styles.ambientBg} ${v ? styles.show : ''}`}>
        <div className={styles.ambientGlow} style={{ background: club.colors.gradient }}></div>
      </div>

      <div className={`${styles.inner} ${isLeft ? '' : styles.reverse}`}>
        {/* ===== CONTENT SIDE ===== */}
        <div className={styles.content}>
          {/* Edition badge */}
          <div className={`${styles.edition} ${v ? styles.animIn : ''}`}>
            <span className={styles.editionDot} style={{ background: club.colors.primary }}></span>
            {club.edition}
          </div>

          {/* Club name */}
          <h2 className={`${styles.clubName} ${v ? styles.animIn : ''}`} style={{ transitionDelay: '0.1s' }}>
            {club.name}
          </h2>

          {/* Motto */}
          <p className={`${styles.motto} ${v ? styles.animIn : ''}`} style={{ transitionDelay: '0.15s' }}>
            &ldquo;{club.motto}&rdquo;
          </p>

          {/* History */}
          <div className={`${styles.historyBlock} ${v ? styles.animIn : ''}`} style={{ transitionDelay: '0.2s' }}>
            <h3 className={styles.historyTitle}>{club.history.title}</h3>
            {club.history.paragraphs.map((p, i) => (
              <p key={i} className={styles.historyText}>{p}</p>
            ))}
          </div>

          {/* Highlights */}
          <div className={`${styles.highlights} ${v ? styles.animIn : ''}`} style={{ transitionDelay: '0.3s' }}>
            {club.history.highlights.map((h, i) => (
              <span key={i} className={styles.tag}>{h}</span>
            ))}
          </div>

          {/* Stats */}
          <div className={`${styles.stats} ${v ? styles.animIn : ''}`} style={{ transitionDelay: '0.35s' }}>
            {stats.map((s, i) => (
              <div key={i} className={styles.stat}>
                <span className={styles.statVal} style={{ color: club.colors.primary }}>{s.v}</span>
                <span className={styles.statLabel}>{s.l}</span>
              </div>
            ))}
          </div>

          {/* Players */}
          <div className={`${styles.players} ${v ? styles.animIn : ''}`} style={{ transitionDelay: '0.4s' }}>
            <span className={styles.playersLabel}>Legends</span>
            <div className={styles.playerRow}>
              {club.players.map((p, i) => (
                <div
                  key={p.name}
                  className={styles.playerChip}
                  style={{ '--chip-glow': glowRgb }}
                >
                  <div className={styles.playerAvatar}>
                    {p.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div className={styles.playerInfo}>
                    <span className={styles.playerName}>{p.name}</span>
                    <span className={styles.playerMeta}>{p.position} · {p.era}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ===== SHOE SIDE ===== */}
        <div className={styles.shoeSide}>
          <div className={`${styles.shoeWrapper} ${v ? styles.shoeIn : ''}`}>
            {/* Glow ring */}
            <div
              className={styles.glowRing}
              style={{ background: `radial-gradient(circle, ${club.colors.primary}25, transparent 70%)` }}
            ></div>

            {/* Price */}
            <div className={styles.priceTag}>
              <span className={styles.priceLabel}>Limited Edition</span>
              <span className={styles.priceValue}>{club.price}</span>
            </div>

            {/* Shoe */}
            <div className={styles.shoeFloat}>
              <Image
                src={club.shoeImage}
                alt={`${club.name} ${club.edition}`}
                width={600}
                height={400}
                className={styles.shoeImg}
                priority={index < 2}
              />
            </div>
            <div className={styles.shoeShadow}></div>

            {/* Edition label */}
            <span className={styles.shoeEdition}>{club.edition}</span>
          </div>
        </div>
      </div>

      {/* Bottom divider */}
      <div className={styles.divider}></div>
    </section>
  );
}
