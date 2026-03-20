'use client';
import { useEffect, useState } from 'react';
import { Mail, User, MessageSquare, Send, CheckCircle2, X } from 'lucide-react';
import styles from './ContactModal.module.css';

export default function ContactModal({ onClose, activeClub }) {
  const [mounted, setMounted] = useState(false);
  const [status, setStatus] = useState('idle'); // idle | sending | success

  useEffect(() => {
    setMounted(true);
    const handleEsc = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus('sending');
    // Simulate network request
    setTimeout(() => {
      setStatus('success');
    }, 1500);
  };

  const clubColor = activeClub.colors.primary;

  return (
    <div className={`${styles.overlay} ${mounted ? styles.visible : ''}`}>
      <div className={styles.backdrop} onClick={onClose}></div>
      
      <div className={styles.modal} style={{ '--club-primary': clubColor }}>
        <button className={styles.closeBtn} onClick={onClose}>
          <X size={20} />
        </button>

        {status !== 'success' ? (
          <div className={`${styles.formContainer} ${status === 'sending' ? styles.isSending : ''}`}>
            <div className={styles.header}>
              <span className={styles.label}>Concierge</span>
              <h2 className={styles.title}>Priority Contact</h2>
              <p className={styles.subtitle}>Direct line to our bespoke customer service ateliers.</p>
            </div>

            <form className={styles.form} onSubmit={handleSubmit}>
              <div className={styles.inputGroup}>
                <User size={18} className={styles.inputIcon} />
                <input type="text" placeholder="Full Name" required className={styles.input} />
              </div>
              
              <div className={styles.inputGroup}>
                <Mail size={18} className={styles.inputIcon} />
                <input type="email" placeholder="Email Address" required className={styles.input} />
              </div>

              <div className={styles.inputGroup}>
                <MessageSquare size={18} className={styles.inputIcon} style={{ top: '16px', transform: 'none' }} />
                <textarea placeholder="Your Message" required className={styles.textarea} rows={4} />
              </div>

              <button type="submit" className={styles.submitBtn} disabled={status === 'sending'}>
                {status === 'sending' ? (
                  <span className={styles.sendingText}>Transmitting...</span>
                ) : (
                  <>
                    <span>Send Message</span>
                    <Send size={16} />
                  </>
                )}
              </button>
            </form>
          </div>
        ) : (
          <div className={styles.successContainer}>
            <div className={styles.successIconWrapper}>
              <CheckCircle2 size={80} color={clubColor} className={styles.checkIcon} />
              <div className={styles.pulseRing}></div>
              <div className={styles.pulseRing} style={{ animationDelay: '0.4s' }}></div>
            </div>
            <h2 className={styles.title}>Transmission Received</h2>
            <p className={styles.subtitle}>Our Concierge will be in touch within 24 hours.</p>
            <button className={styles.doneBtn} onClick={onClose}>Return to Collection</button>
          </div>
        )}

      </div>
    </div>
  );
}
