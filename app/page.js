'use client';
import { useState, useEffect, useCallback } from 'react';
import { clubs } from './data/clubs';
import Navbar from './components/Navbar';
import CarouselSlide from './components/CarouselSlide';
import CarouselControls from './components/CarouselControls';
import OrderModal from './components/OrderModal';
import DetailsModal from './components/DetailsModal';
import ContactModal from './components/ContactModal';
import AboutModal from './components/AboutModal';
import styles from './page.module.css';

function hexToRgb(hex) {
  const r = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return r ? `${parseInt(r[1],16)},${parseInt(r[2],16)},${parseInt(r[3],16)}` : '255,255,255';
}

export default function Home() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [isAboutModalOpen, setIsAboutModalOpen] = useState(false);

  const goToSlide = useCallback((index) => {
    if (isAnimating || index === activeIndex) return;
    setIsAnimating(true);
    setActiveIndex(index);
    setTimeout(() => setIsAnimating(false), 1000); // 1s transition lock
  }, [activeIndex, isAnimating]);

  const nextSlide = useCallback(() => {
    goToSlide((activeIndex + 1) % clubs.length);
  }, [activeIndex, goToSlide]);

  const prevSlide = useCallback(() => {
    goToSlide((activeIndex - 1 + clubs.length) % clubs.length);
  }, [activeIndex, goToSlide]);

  // Handle keyboard/wheel navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') nextSlide();
      if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') prevSlide();
    };

    const handleWheel = (e) => {
      if (isAnimating || isOrderModalOpen || isDetailsModalOpen || isContactModalOpen || isAboutModalOpen) return;
      if (e.deltaY > 50) nextSlide();
      else if (e.deltaY < -50) prevSlide();
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('wheel', handleWheel, { passive: false });
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('wheel', handleWheel);
    };
  }, [nextSlide, prevSlide, isAnimating, isOrderModalOpen, isDetailsModalOpen, isContactModalOpen, isAboutModalOpen]);

  const currentClub = clubs[activeIndex];
  const glowRgb = hexToRgb(currentClub.colors.primary);

  return (
    <div
      className={styles.carouselContainer}
      style={{
        '--club-primary': currentClub.colors.primary,
        '--club-secondary': currentClub.colors.secondary,
        '--club-accent': currentClub.colors.accent,
        '--glow-rgb': glowRgb,
      }}
    >
      <Navbar 
        activeClub={activeIndex} 
        onClubClick={goToSlide} 
        onOrderClick={() => setIsOrderModalOpen(true)}
        onDetailsClick={() => setIsDetailsModalOpen(true)}
        onContactClick={() => setIsContactModalOpen(true)}
        onAboutClick={() => setIsAboutModalOpen(true)}
      />

      {/* Dynamic Background */}
      <div className={styles.ambientBg}>
        <div 
          className={styles.bgGradient}
          style={{ background: currentClub.colors.gradient, opacity: 0.15 }}
        ></div>
        <div 
          className={`${styles.patternLayer} pattern-${currentClub.visualTheme}`}
        ></div>
      </div>

      {/* Main Slides */}
      <div className={styles.slidesWrapper}>
        {clubs.map((club, index) => (
          <CarouselSlide 
            key={club.id} 
            club={club} 
            isActive={index === activeIndex} 
            isPrev={index === (activeIndex - 1 + clubs.length) % clubs.length}
            isNext={index === (activeIndex + 1) % clubs.length}
          />
        ))}
      </div>

      {/* Controls */}
      <CarouselControls 
        total={clubs.length} 
        current={activeIndex} 
        onNext={nextSlide} 
        onPrev={prevSlide} 
        onDotClick={goToSlide}
        onOrderClick={() => setIsOrderModalOpen(true)}
      />

      {/* Modals */}
      {isOrderModalOpen && <OrderModal activeClub={currentClub} onClose={() => setIsOrderModalOpen(false)} />}
      {isDetailsModalOpen && <DetailsModal activeClub={currentClub} onClose={() => setIsDetailsModalOpen(false)} />}
      {isContactModalOpen && <ContactModal activeClub={currentClub} onClose={() => setIsContactModalOpen(false)} />}
      {isAboutModalOpen && <AboutModal onClose={() => setIsAboutModalOpen(false)} />}
    </div>
  );
}
