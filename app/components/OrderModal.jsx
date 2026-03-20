'use client';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import { X, Check } from 'lucide-react';
import SizeGuideModal from './SizeGuideModal';
import styles from './OrderModal.module.css';

const platforms = [
  { name: 'Shopee', color: '#EE4D2D', rgb: '238, 77, 45', icon: <path d="M12 2C9.243 2 7 4.243 7 7h2c0-1.654 1.346-3 3-3s3 1.346 3 3h2c0-2.757-2.243-5-5-5zM4 7l-1 17h18l-1-17H4zm4 2c0 1.654-1.346 3-3 3v2c2.757 0 5-2.243 5-5H8zm8 0c0 2.757 2.243 5 5 5v-2c-1.654 0-3-1.346-3-3h-2z" /> },
  { name: 'Tokopedia', color: '#42B549', rgb: '66, 181, 73', icon: <path d="M12 2a5 5 0 0 0-5 5v1H4a1 1 0 0 0-1 1v11a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V9a1 1 0 0 0-1-1h-3V7a5 5 0 0 0-5-5zm-3 5a3 3 0 1 1 6 0v1H9V7zm3 6a2 2 0 1 1 0-4 2 2 0 0 1 0 4z" /> },
  { name: 'WhatsApp', color: '#25D366', rgb: '37, 211, 102', icon: <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" /> },
  { name: 'Instagram', color: '#E4405F', rgb: '228, 64, 95', icon: <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" /> }
];

const availableSizes = [38, 39, 40, 41, 42, 43, 44, 45, 46];

export default function OrderModal({ activeClub, onClose }) {
  const [mounted, setMounted] = useState(false);
  const [selectedSize, setSelectedSize] = useState(null);
  const [showSizeGuide, setShowSizeGuide] = useState(false);

  useEffect(() => {
    setMounted(true);
    const handleEsc = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  if (!activeClub) return null;

    const getPlatformLink = (platformName, club, size) => {
      if (!size) return "#";
      
      const encodedClub = encodeURIComponent(club.name);
      const encodedText = encodeURIComponent(`Hello AURA Concierge,\n\nI would like to secure my pair of the ${club.name} Edition.\n\nConfiguration:\n- Edition: ${club.edition}\n- Size (EU): ${size}\n\nPlease let me know the next steps.`);
  
      switch(platformName) {
        case 'WhatsApp':
          return `https://wa.me/6281234567890?text=${encodedText}`;
        case 'Shopee':
          return `https://shopee.co.id/search?keyword=aura%20sneakers%20${encodedClub}`;
        case 'Tokopedia':
          return `https://www.tokopedia.com/search?q=aura%20sneakers%20${encodedClub}`;
        case 'Instagram':
          return `https://instagram.com/aurasneakers`;
        default:
          return "#";
      }
    };
  
    return (
      <div className={`${styles.overlay} ${mounted ? styles.visible : ''}`}>
        <div className={styles.backdrop} onClick={onClose}></div>
        
        <div className={styles.modal} style={{ '--club-primary': activeClub.colors.primary }}>
          <button className={styles.closeBtn} onClick={onClose}>
            <X size={20} />
          </button>
  
          <div className={styles.modalSplit}>
            
            {/* Left Column: Product & Size */}
            <div className={styles.productCol}>
              <div className={styles.shoePreview}>
                <div className={styles.shoeGlow} style={{ background: activeClub.colors.primary }}></div>
                <Image 
                  src={activeClub.shoeImage} 
                  alt={activeClub.name} 
                  width={300} 
                  height={300} 
                  className={styles.shoeImg}
                  priority
                />
              </div>
              
              <div className={styles.productMeta}>
                <span className={styles.editionLabel}>{activeClub.edition}</span>
                <h3 className={styles.shoeName}>{activeClub.name} X AURA</h3>
                <p className={styles.shoePrice}>Rp 3.500.000</p>
              </div>
  
              <div className={styles.sizeSection}>
                <div className={styles.sizeHeader}>
                  <span className={styles.sizeTitle}>Select Size (EU)</span>
                  <span className={styles.sizeGuide} onClick={() => setShowSizeGuide(true)} role="button" tabIndex={0}>Size Guide</span>
                </div>
                <div className={styles.sizeGrid}>
                  {availableSizes.map(size => (
                    <button 
                      key={size}
                      className={`${styles.sizeBtn} ${selectedSize === size ? styles.selected : ''}`}
                      onClick={() => setSelectedSize(size)}
                    >
                      {size}
                      {selectedSize === size && <Check size={14} className={styles.checkIcon} />}
                    </button>
                  ))}
                </div>
              </div>
            </div>
  
            {/* Right Column: Order Platforms */}
            <div className={styles.actionCol}>
              <div className={styles.actionHeader}>
                <h2 className={styles.title}>Secure Your Pair</h2>
                <p className={styles.subtitle}>
                  {!selectedSize 
                    ? "Select a size first to unlock the checkout portals." 
                    : "Choose your preferred platform to complete configuration."}
                </p>
              </div>
  
              <div className={`${styles.platformGrid} ${!selectedSize ? styles.locked : ''}`}>
                {platforms.map((p) => (
                  <a 
                    key={p.name} 
                    href={getPlatformLink(p.name, activeClub, selectedSize)}
                    target={selectedSize ? "_blank" : "_self"}
                    rel={selectedSize ? "noopener noreferrer" : ""}
                    className={styles.card} 
                    style={{ '--hover-color': p.color, '--hover-rgb': p.rgb }}
                    onClick={(e) => {
                      if (!selectedSize) {
                        e.preventDefault();
                      }
                    }}
                  >
                    <div className={styles.iconBox}>
                      <svg viewBox="0 0 24 24" className={styles.icon}>{p.icon}</svg>
                    </div>
                    <div className={styles.cardInfo}>
                      <span className={styles.name}>{p.name}</span>
                      <span className={styles.status}>Official Store</span>
                    </div>
                  </a>
                ))}
              </div>
  
            </div>
  
          </div>
        </div>

        {showSizeGuide && (
          <SizeGuideModal 
            onClose={() => setShowSizeGuide(false)} 
            clubPrimary={activeClub.colors.primary} 
          />
        )}
      </div>
    );
  }
