'use client';
import { useRef, useEffect, useState } from 'react';
import styles from './HeritageCard.module.css';

function hexToRgb(hex) {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? `${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)}`
    : '255, 255, 255';
}

const clubStats = {
  barcelona: [
    { value: '26', label: 'La Liga' },
    { value: '5', label: 'UCL Titles' },
    { value: '6', label: 'Sextuple Year' },
  ],
  'real-madrid': [
    { value: '15', label: 'UCL Titles' },
    { value: '36', label: 'La Liga' },
    { value: '7', label: 'World Cups' },
  ],
  liverpool: [
    { value: '6', label: 'European Cups' },
    { value: '19', label: 'League Titles' },
    { value: '1', label: 'Istanbul Miracle' },
  ],
  chelsea: [
    { value: '2', label: 'UCL Titles' },
    { value: '6', label: 'PL Titles' },
    { value: '2', label: 'Europa League' },
  ],
  arsenal: [
    { value: '13', label: 'League Titles' },
    { value: '49', label: 'Unbeaten Run' },
    { value: '14', label: 'FA Cups' },
  ],
  'ac-milan': [
    { value: '7', label: 'European Cups' },
    { value: '19', label: 'Serie A' },
    { value: '5', label: 'Super Cups' },
  ],
};

const clubAbbrev = {
  barcelona: 'FCB',
  'real-madrid': 'RMA',
  liverpool: 'LFC',
  chelsea: 'CFC',
  arsenal: 'AFC',
  'ac-milan': 'ACM',
};

export default function HeritageCard({ club }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const stats = clubStats[club.id] || [];
  const glowRgb = hexToRgb(club.colors.primary);

  return (
    <div
      ref={ref}
      className={styles.heritage}
      style={{
        '--club-primary': club.colors.primary,
        '--h-glow-rgb': glowRgb,
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(30px)',
        transition: 'all 0.7s ease',
      }}
    >
      <div className={styles.heritageCard}>
        <span className={styles.heritageCrest}>
          {clubAbbrev[club.id] || ''}
        </span>
        <div className={styles.heritageLabel}>Club Heritage</div>
        <h3 className={styles.heritageTitle}>{club.history.title}</h3>
        <p className={styles.heritageText}>{club.history.paragraphs[0]}</p>
        <div className={styles.heritageStats}>
          {stats.map((stat) => (
            <div key={stat.label} className={styles.stat}>
              <span className={styles.statValue}>{stat.value}</span>
              <span className={styles.statLabel}>{stat.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
