'use client';
import Image from 'next/image';
import styles from './CarouselSlide.module.css';

export default function CarouselSlide({ club, isActive, isPrev, isNext }) {
  let stateClass = '';
  if (isActive) stateClass = styles.active;
  else if (isPrev) stateClass = styles.prev;
  else if (isNext) stateClass = styles.next;
  else stateClass = styles.hidden;

  return (
    <div className={`${styles.slide} ${stateClass}`}>
      
      {/* Dynamic Optimized Background */}
      {club.bgImage && (
        <div className={styles.bgContainer}>
          <Image
            src={club.bgImage}
            alt={`${club.name} Environment`}
            fill
            sizes="100vw"
            quality={85}
            priority={isActive}
            className={styles.bgImage}
          />
          <div className={styles.bgOverlay}></div>
        </div>
      )}

      {/* Massive Background Typography Watermark */}
      <div className={styles.bgWatermark}>
        {club.name.replace(' FC', '')}
      </div>

      <div className={styles.slideInner}>
        
        {/* Left Side: Editorial Typography */}
        <div className={styles.infoSide}>
          
          <div className={styles.metaTop}>
            <span className={styles.labelSmall}>Chapter</span>
            <span className={styles.editionText} style={{ color: club.colors.primary }}>
              — {club.edition}
            </span>
          </div>

          <h1 className={styles.clubName}>
            <div className={styles.titleLine}>
              <span 
                className={styles.titleSerif}
                style={{ color: club.colors.primary }}
              >
                {club.name.split(' ')[0]}
              </span>
            </div>
            {club.name.split(' ').length > 1 && (
              <div className={styles.titleLine}>
                <span 
                  className={styles.titleSans}
                  style={{ 
                    WebkitTextStroke: `1.5px ${club.colors.primary}`,
                    background: club.colors.gradient,
                    WebkitBackgroundClip: 'text',
                    backgroundClip: 'text',
                    color: 'transparent',
                  }}
                >
                  {club.name.split(' ').slice(1).join(' ')}
                </span>
              </div>
            )}
          </h1>

          <div className={styles.mottoWrapper}>
            <span className={styles.mottoQuote}>"</span>
            <p className={styles.motto}>{club.motto}</p>
          </div>
          
          <div className={styles.editorialGrid}>
            <div className={styles.editorialCol}>
              <span className={styles.labelSmall}>Legacy</span>
              <p className={styles.historyText}>{club.history.paragraphs[0]}</p>
            </div>
            
            <div className={styles.editorialCol}>
              <span className={styles.labelSmall}>Icons</span>
              <ul className={styles.playerList}>
                {club.players.slice(0, 3).map((p, i) => (
                  <li key={i} className={styles.playerItem}>
                    <span className={styles.playerName}>{p.name}</span>
                    <span className={styles.playerPos}>{p.position}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

        </div>

        {/* Right Side: 3D Shoe & Price */}
        <div className={styles.visualSide}>
          <div className={styles.shoeWrapper}>
            {/* Ambient Pulse */}
            <div className={styles.shoeGlow} style={{ background: `radial-gradient(circle, ${club.colors.primary}50, transparent 70%)` }}></div>
            
            <div className={styles.shoeFloat}>
              <Image 
                src={club.shoeImage}
                alt={club.name}
                width={800}
                height={600}
                className={styles.shoeImg}
                priority
              />
            </div>
            
            <div className={styles.shoeShadow}></div>

            {/* Editorial Price Tag */}
            <div className={styles.priceTag}>
              <span className={styles.priceLabel}>Reserve</span>
              <span className={styles.priceValue}>{club.price}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
