'use client';
import { ChevronLeft, ChevronRight, ShoppingBag } from 'lucide-react';
import styles from './CarouselControls.module.css';

export default function CarouselControls({ total, current, onNext, onPrev, onDotClick, onOrderClick }) {
  return (
    <>
      {/* Side Arrows */}
      <button className={`${styles.navBtn} ${styles.prevBtn}`} onClick={onPrev} aria-label="Previous slide">
        <ChevronLeft size={28} />
      </button>

      <button className={`${styles.navBtn} ${styles.nextBtn}`} onClick={onNext} aria-label="Next slide">
        <ChevronRight size={28} />
      </button>

      {/* Bottom Dock UI */}
      <div className={styles.bottomDock}>
        <div className={styles.dockInner}>
          
          {/* Pagination Info */}
          <div className={styles.counter}>
            <span key={current} className={styles.currentNum}>
              {String(current + 1).padStart(2, '0')}
            </span>
            <span className={styles.divider}>/</span>
            <span className={styles.totalNum}>0{total}</span>
          </div>

          {/* Dots */}
          <div className={styles.dots}>
            {Array.from({ length: total }).map((_, i) => (
              <button 
                key={i}
                className={`${styles.dot} ${i === current ? styles.active : ''}`}
                onClick={() => onDotClick(i)}
                aria-label={`Go to slide ${i + 1}`}
              >
                <span className={styles.dotInner}></span>
              </button>
            ))}
          </div>

          {/* CTA Action */}
          <button className={styles.orderBtn} onClick={onOrderClick}>
            <span className={styles.orderText}>Order Now</span>
            <ShoppingBag size={16} />
          </button>
          
        </div>
      </div>
    </>
  );
}
