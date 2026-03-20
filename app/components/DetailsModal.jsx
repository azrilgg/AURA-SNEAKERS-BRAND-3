'use client';
import { useEffect, useState } from 'react';
import { Zap, ShieldCheck, X } from 'lucide-react';
import styles from './DetailsModal.module.css';

export default function DetailsModal({ onClose, activeClub }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const handleEsc = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  return (
    <div className={`${styles.overlay} ${mounted ? styles.visible : ''}`}>
      <div className={styles.backdrop} onClick={onClose}></div>
      
      <div className={styles.modal} style={{ '--club-primary': activeClub.colors.primary }}>
        <button className={styles.closeBtn} onClick={onClose}>
          <X size={20} />
        </button>

        <div className={styles.header}>
          <span className={styles.label}>Aura Sneakers</span>
          <h2 className={styles.title}>The Heritage Collection</h2>
        </div>

        <div className={styles.contentGrid}>
          {/* SECTION 1: BENEFITS */}
          <div className={styles.sectionCard}>
            <div className={styles.sectionHeader}>
              <span className={styles.sectionIcon}><Zap size={28} color={activeClub.colors.primary} /></span>
              <h3>Performance & Benefits</h3>
            </div>
            <ul className={styles.list}>
              <li>
                <strong>AuraTech Cushioning:</strong>
                <p>Proprietary energy-return foam providing god-tier comfort for 12+ hours of continuous wear.</p>
              </li>
              <li>
                <strong>Breathable FlyKnit Shell:</strong>
                <p>Advanced temperature regulation adapting to your foot's micro-climate.</p>
              </li>
              <li>
                <strong>Carbon Fiber Shank:</strong>
                <p>Explosive structural support ensuring zero torsion during lateral movements.</p>
              </li>
              <li>
                <strong>Club DNA Embedded:</strong>
                <p>Every pair integrates microscopic elements of the club's historical stadium materials.</p>
              </li>
            </ul>
          </div>

          {/* SECTION 2: WARRANTY & CARE */}
          <div className={styles.sectionCard}>
            <div className={styles.sectionHeader}>
              <span className={styles.sectionIcon}><ShieldCheck size={28} color={activeClub.colors.primary} /></span>
              <h3>Full Lifetime Warranty & Care</h3>
            </div>
            <ul className={styles.list}>
              <li>
                <strong>Lifetime Structural Guarantee:</strong>
                <p>We replace any pair exhibiting midsole collapse or carbon plate fracturing. No questions.</p>
              </li>
              <li>
                <strong>VIP Concierge Restoration:</strong>
                <p>One free premium deep-clean and scuff-restoration service per year at our partner ateliers.</p>
              </li>
              <li>
                <strong>Authenticity Certificate:</strong>
                <p>Each pair includes an engraved, serialized metal card verifying its limited edition status.</p>
              </li>
              <li>
                <strong>Care Instructions:</strong>
                <p>Wipe with provided microfiber cloth. Keep away from extreme heat to preserve color vibrancy.</p>
              </li>
            </ul>
          </div>
        </div>
        
        <div className={styles.footer}>
          <p>Exclusively crafted for the true believers. <br/><em>"Més que una sabatilla."</em></p>
        </div>

      </div>
    </div>
  );
}
