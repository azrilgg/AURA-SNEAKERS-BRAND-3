import { useEffect, useState } from 'react';
import { X, Fingerprint, MapPin, Feather, Diamond, Palette, Rocket } from 'lucide-react';
import styles from './AboutModal.module.css';

export default function AboutModal({ onClose }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const handleEsc = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  const features = [
    {
      icon: <Fingerprint size={28} />,
      title: "The AURA Philosophy",
      desc: "AURA Sneakers was born from a singular obsession: merging the visceral passion of global football heritage with ultra-premium, cutting-edge footwear technology. We don't just make shoes; we forge wearable monuments to footballing immortality."
    },
    {
      icon: <Diamond size={28} />,
      title: "Bespoke Craftsmanship",
      desc: "Every silhouette is meticulously hand-lasted by master cobblers. We source only the rarest aerospace-grade carbon fiber and full-grain Italian leathers, ensuring our sneakers perform as flawlessly as the legends they represent."
    },
    {
      icon: <Palette size={28} />,
      title: "DNA Integration",
      desc: "Our exclusive 'Club DNA' extraction process reverse-engineers the historic colors, crests, and architectural motifs of Europe's greatest stadiums directly into the structural weave of the mid-sole."
    },
    {
      icon: <Rocket size={28} />,
      title: "AuraTech\u2122 Propulsion",
      desc: "Underneath the elegant exterior lies a kinetic energy-return system. AuraTech\u2122 absorbs impact and converts it into pure forward momentum, offering a zero-gravity sensation with every step."
    }
  ];

  return (
    <div className={`${styles.overlay} ${mounted ? styles.visible : ''}`}>
      <div className={styles.backdrop} onClick={onClose}></div>
      
      <div className={styles.modal}>
        <button className={styles.closeBtn} onClick={onClose}>
          <X size={20} />
        </button>

        <div className={styles.container}>
          
          {/* Header Section */}
          <header className={styles.header}>
            <div className={styles.labelWrapper}>
              <Feather size={14} className={styles.labelIcon} />
              <span className={styles.label}>Manifesto</span>
            </div>
            <h1 className={styles.title}>The Genesis of <span className={styles.glowText}>AURA</span></h1>
            <p className={styles.subtitle}>Where elite athletic heritage meets uncompromising luxury.</p>
          </header>

          {/* Multi-Dimensional Grid */}
          <div className={styles.grid}>
            {features.map((feature, idx) => (
              <div 
                key={idx} 
                className={styles.card} 
                style={{ animationDelay: `${0.2 + (idx * 0.1)}s` }}
              >
                <div className={styles.iconBox}>
                  {feature.icon}
                </div>
                <h3 className={styles.cardTitle}>{feature.title}</h3>
                <p className={styles.cardDesc}>{feature.desc}</p>
                <div className={styles.cardGlow}></div>
              </div>
            ))}
          </div>

          {/* Footer Story Section */}
          <div className={styles.bottomStory}>
            <div className={styles.storyIcon}>
              <MapPin size={24} />
            </div>
            <div className={styles.storyText}>
              <h4>Headquartered in the Future</h4>
              <p>Conceived in the design laboratories of Milan, engineered in Tokyo, and worn globally. AURA is completely committed to pushing the boundaries of what a luxury sneaker can be. We operate in a different dimension of reality.</p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
