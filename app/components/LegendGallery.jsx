'use client';
import { useRef, useEffect, useState } from 'react';
import styles from './LegendGallery.module.css';

function hexToRgb(hex) {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? `${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)}`
    : '255, 255, 255';
}

export default function LegendGallery({ club }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold: 0.2 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const glowRgb = hexToRgb(club.colors.primary);

  return (
    <section
      ref={ref}
      className={styles.gallery}
      style={{
        '--club-primary': club.colors.primary,
        '--club-accent': club.colors.accent,
      }}
    >
      <div className={styles.galleryHeader}>
        <div className={styles.galleryTag}>
          <span className={styles.galleryTagLine}></span>
          {club.name}
          <span className={styles.galleryTagLine}></span>
        </div>
        <h2 className={styles.galleryTitle}>
          <span className={styles.galleryTitleAccent}>Legendary</span> Icons
        </h2>
        <p className={styles.gallerySubtitle}>
          The players who defined an era and built a legacy that transcends football.
        </p>
      </div>

      <div className={styles.galleryGrid}>
        {club.players.map((player, i) => (
          <div
            key={player.name}
            className={styles.playerCard}
            style={{
              '--card-glow-rgb': glowRgb,
              opacity: visible ? 1 : 0,
              transform: visible ? 'translateY(0)' : 'translateY(30px)',
              transition: `all 0.6s ease ${i * 0.1}s`,
            }}
          >
            <span className={styles.playerNumber}>
              {String(i + 1).padStart(2, '0')}
            </span>
            <div className={styles.playerAvatar}>
              {player.name.split(' ').map(n => n[0]).join('')}
            </div>
            <h3 className={styles.playerName}>{player.name}</h3>
            <p className={styles.playerPosition}>{player.position}</p>
            <p className={styles.playerEra}>{player.era}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
