'use client';
import styles from './Hero.module.css';
import Image from 'next/image';
import { clubs } from '../data/clubs';

export default function Hero() {
  const featuredClub = clubs[0];

  return (
    <section className={styles.hero} id="hero">
      <div className={styles.heroInner}>
        <div className={styles.heroLeft}>
          <div className={styles.heroTag}>
            <span className={styles.heroTagDot}></span>
            Limited Edition Collection 2025
          </div>

          <h1 className={styles.heroTitle}>
            <span className={styles.heroTitleLine}>WHERE</span>
            <span className={styles.heroTitleLine}>
              <span className={styles.heroTitleAccent}>FOOTBALL</span>
            </span>
            <span className={styles.heroTitleLine}>MEETS SOLE</span>
          </h1>

          <p className={styles.heroSubtitle}>
            Six legendary clubs. Six iconic sneakers. Each pair carries decades of
            glory, passion, and heritage — crafted for the elite, designed for the faithful.
          </p>

          <div className={styles.heroCTA}>
            <button className={`${styles.ctaButton} ${styles.ctaPrimary}`}>
              Explore Collection
            </button>
            <button className={`${styles.ctaButton} ${styles.ctaSecondary}`}>
              View Heritage
            </button>
          </div>
        </div>

        <div className={styles.heroRight}>
          <div className={styles.shoeGlow}></div>
          <div className={styles.shoeContainer}>
            <Image
              src={featuredClub.shoeImage}
              alt={`${featuredClub.name} Edition Sneaker`}
              width={600}
              height={400}
              className={styles.shoeImage}
              priority
            />
            <div className={styles.shoeShadow}></div>
          </div>
        </div>
      </div>

      <div className={styles.marqueeWrapper}>
        <div className={styles.marqueeTrack}>
          <span className={styles.marqueeText}>AURA SNEAKERS</span>
          <span className={styles.marqueeText}>AURA SNEAKERS</span>
          <span className={styles.marqueeText}>AURA SNEAKERS</span>
          <span className={styles.marqueeText}>AURA SNEAKERS</span>
        </div>
      </div>

      <div className={styles.scrollIndicator}>
        <span className={styles.scrollText}>Scroll to explore</span>
        <div className={styles.scrollLine}></div>
      </div>
    </section>
  );
}
