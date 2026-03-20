'use client';
import Image from 'next/image';
import styles from './Navbar.module.css';

export default function Navbar({ activeClub, onClubClick, onOrderClick, onDetailsClick, onContactClick, onAboutClick }) {
  return (
    <nav className={styles.navbar}>
      <div className={styles.logo}>
        <Image src="/LOGO/LG1.png" alt="AURA SNEAKERS" width={150} height={50} className={styles.brandImg} priority />
      </div>

      <div className={styles.navRight}>
        <button className={styles.detailsNavBtn} onClick={onAboutClick}>
          About
        </button>
        <button className={styles.detailsNavBtn} onClick={onContactClick}>
          Contact
        </button>
        <button className={styles.detailsNavBtn} onClick={onDetailsClick}>
          Details
        </button>
        <button className={styles.orderNavBtn} onClick={onOrderClick}>
          Order
        </button>
      </div>
    </nav>
  );
}
