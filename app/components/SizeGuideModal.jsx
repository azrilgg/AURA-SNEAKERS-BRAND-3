'use client';
import { useEffect, useState, useCallback } from 'react';
import { 
  X, Ruler, ArrowLeftRight, Footprints, Info, 
  Clock, Sparkles, MoveVertical, ScanLine,
  AlertCircle, ShieldCheck, RefreshCw, Heart,
  ChevronRight, Target, Zap
} from 'lucide-react';
import styles from './SizeGuideModal.module.css';


const sizeData = [
  { eu: 36, us: 4,    usW: 5.5,  uk: 3.5, cm: 22.5, inches: 8.86,  jpn: 22.5 },
  { eu: 37, us: 5,    usW: 6.5,  uk: 4,   cm: 23.0, inches: 9.06,  jpn: 23.0 },
  { eu: 38, us: 5.5,  usW: 7,    uk: 5,   cm: 24.0, inches: 9.45,  jpn: 24.0 },
  { eu: 39, us: 6.5,  usW: 8,    uk: 6,   cm: 24.5, inches: 9.65,  jpn: 24.5 },
  { eu: 40, us: 7,    usW: 8.5,  uk: 6.5, cm: 25.0, inches: 9.84,  jpn: 25.0 },
  { eu: 40.5, us: 7.5, usW: 9,   uk: 7,   cm: 25.5, inches: 10.04, jpn: 25.5 },
  { eu: 41, us: 8,    usW: 9.5,  uk: 7.5, cm: 26.0, inches: 10.24, jpn: 26.0 },
  { eu: 42, us: 8.5,  usW: 10,   uk: 8,   cm: 26.5, inches: 10.43, jpn: 26.5 },
  { eu: 42.5, us: 9,  usW: 10.5, uk: 8.5, cm: 27.0, inches: 10.63, jpn: 27.0 },
  { eu: 43, us: 9.5,  usW: 11,   uk: 9,   cm: 27.5, inches: 10.83, jpn: 27.5 },
  { eu: 44, us: 10,   usW: 11.5, uk: 9.5, cm: 28.0, inches: 11.02, jpn: 28.0 },
  { eu: 44.5, us: 10.5, usW: 12, uk: 10,  cm: 28.5, inches: 11.22, jpn: 28.5 },
  { eu: 45, us: 11,   usW: 12.5, uk: 10.5, cm: 29.0, inches: 11.42, jpn: 29.0 },
  { eu: 46, us: 12,   usW: 13,   uk: 11.5, cm: 30.0, inches: 11.81, jpn: 30.0 },
  { eu: 47, us: 13,   usW: 14,   uk: 12,  cm: 30.5, inches: 12.01, jpn: 30.5 },
];

const fitTips = [
  { 
    icon: Clock, 
    title: 'Measure in the Evening', 
    desc: 'Your feet swell up to 8% throughout the day due to gravity and activity. Measure between 4-6 PM for the most accurate reading.',
    color: '#6366f1'
  },
  { 
    icon: Target, 
    title: 'Wear Athletic Socks', 
    desc: 'Always measure while wearing the type of socks you\'ll actually pair with your AURA sneakers for true-to-life accuracy.',
    color: '#f59e0b'
  },
  { 
    icon: Zap, 
    title: 'Half Size Up Rule', 
    desc: 'If your measurement falls exactly between two sizes, always go up half a size. AURA\'s memory foam insoles will conform to your foot.',
    color: '#10b981'
  },
  { 
    icon: MoveVertical, 
    title: 'Measure Both Feet', 
    desc: 'Studies show 60% of people have one foot slightly larger. Always use the bigger measurement to determine your size.',
    color: '#ec4899'
  },
  { 
    icon: ScanLine, 
    title: 'Stand, Don\'t Sit', 
    desc: 'Your feet spread 3-5mm when bearing weight. Always stand naturally on the paper while measuring for true foot length.',
    color: '#8b5cf6'
  },
  { 
    icon: RefreshCw, 
    title: 'Re-Measure Periodically', 
    desc: 'Foot size can change every 2-3 years due to age, weight changes, or pregnancy. Re-measure before each purchase.',
    color: '#06b6d4'
  },
];

export default function SizeGuideModal({ onClose, clubPrimary }) {
  const [mounted, setMounted] = useState(false);
  const [activeTab, setActiveTab] = useState('table');
  const [selectedUnit, setSelectedUnit] = useState('EU');
  const [footLength, setFootLength] = useState('');
  const [measureUnit, setMeasureUnit] = useState('cm');
  const [gender, setGender] = useState('men');
  const [footWidth, setFootWidth] = useState('normal');
  const [recommendedSize, setRecommendedSize] = useState(null);
  const [altSize, setAltSize] = useState(null);
  const [highlightedRow, setHighlightedRow] = useState(null);
  const [fitConfidence, setFitConfidence] = useState(0);

  useEffect(() => {
    setMounted(true);
    const handleEsc = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose]);

 
  const findSize = useCallback(() => {
    if (!footLength || isNaN(footLength)) {
      setRecommendedSize(null);
      setAltSize(null);
      setHighlightedRow(null);
      setFitConfidence(0);
      return;
    }

    const val = parseFloat(footLength);
    const cmVal = measureUnit === 'inches' ? val * 2.54 : val;
    
    // Validate range
    if (cmVal < 21 || cmVal > 33) {
      setRecommendedSize(null);
      setAltSize(null);
      setHighlightedRow(null);
      setFitConfidence(0);
      return;
    }

    // Width adjustment: wide feet need ~0.5 size up, narrow feet ~0.5 down
    let adjustedCm = cmVal;
    if (footWidth === 'wide') adjustedCm += 0.3;
    if (footWidth === 'narrow') adjustedCm -= 0.2;

    // Find closest match
    let best = null;
    let secondBest = null;
    let minDiff = Infinity;
    let secondMinDiff = Infinity;

    for (const s of sizeData) {
      const diff = Math.abs(s.cm - adjustedCm);
      if (diff < minDiff) {
        secondMinDiff = minDiff;
        secondBest = best;
        minDiff = diff;
        best = s;
      } else if (diff < secondMinDiff) {
        secondMinDiff = diff;
        secondBest = s;
      }
    }

    if (best) {
      // If foot is slightly larger than the exact size, recommend next size up
      const exactDiff = adjustedCm - best.cm;
      if (exactDiff > 0.3 && secondBest && secondBest.cm > best.cm) {
        setAltSize(best);
        setRecommendedSize(secondBest);
        setHighlightedRow(secondBest.eu);
      } else {
        setRecommendedSize(best);
        setAltSize(secondBest);
        setHighlightedRow(best.eu);
      }

      // Calculate fit confidence (0-100)
      const confidence = Math.max(0, Math.min(100, 100 - (minDiff * 40)));
      setFitConfidence(Math.round(confidence));
    }
  }, [footLength, measureUnit, footWidth]);

  useEffect(() => {
    const timeout = setTimeout(findSize, 200);
    return () => clearTimeout(timeout);
  }, [footLength, measureUnit, footWidth, findSize]);

  const accentColor = clubPrimary || '#ffffff';

  return (
    <div className={`${styles.overlay} ${mounted ? styles.visible : ''}`}>
      <div className={styles.backdrop} onClick={onClose}></div>
      
      <div className={styles.modal} style={{ '--accent': accentColor }}>
        <button className={styles.closeBtn} onClick={onClose}>
          <X size={20} />
        </button>

        {/* Header */}
        <div className={styles.header}>
          <div className={styles.headerIcon}>
            <Ruler size={20} />
          </div>
          <span className={styles.label}>AURA SNEAKERS</span>
          <h2 className={styles.title}>Size Guide</h2>
          <p className={styles.subtitle}>Find your perfect fit with our interactive sizing tool</p>
        </div>

        {/* Tab Navigation */}
        <div className={styles.tabs}>
          <button 
            className={`${styles.tab} ${activeTab === 'table' ? styles.tabActive : ''}`}
            onClick={() => setActiveTab('table')}
          >
            <ArrowLeftRight size={16} />
            <span>Size Chart</span>
          </button>
          <button 
            className={`${styles.tab} ${activeTab === 'finder' ? styles.tabActive : ''}`}
            onClick={() => setActiveTab('finder')}
          >
            <Footprints size={16} />
            <span>Size Finder</span>
          </button>
          <button 
            className={`${styles.tab} ${activeTab === 'tips' ? styles.tabActive : ''}`}
            onClick={() => setActiveTab('tips')}
          >
            <Sparkles size={16} />
            <span>Fit Tips</span>
          </button>
        </div>

        {/* Tab Content */}
        <div className={styles.content}>
          
          {/* ======== SIZE CHART TABLE ======== */}
          {activeTab === 'table' && (
            <div className={styles.tablePanel}>
              <div className={styles.unitSelector}>
                {['EU', 'US', 'UK', 'CM', 'JPN'].map(unit => (
                  <button
                    key={unit}
                    className={`${styles.unitBtn} ${selectedUnit === unit ? styles.unitActive : ''}`}
                    onClick={() => setSelectedUnit(unit)}
                  >
                    {unit}
                  </button>
                ))}
              </div>

              <div className={styles.tableWrapper}>
                <table className={styles.sizeTable}>
                  <thead>
                    <tr>
                      <th>EU</th>
                      <th>US (M)</th>
                      <th>US (W)</th>
                      <th>UK</th>
                      <th>CM</th>
                      <th>JPN</th>
                    </tr>
                  </thead>
                  <tbody>
                    {sizeData.map((row) => (
                      <tr 
                        key={row.eu}
                        className={`
                          ${highlightedRow === row.eu ? styles.rowHighlight : ''}
                          ${styles.tableRow}
                        `}
                        onMouseEnter={() => setHighlightedRow(row.eu)}
                        onMouseLeave={() => { if (!recommendedSize) setHighlightedRow(null); }}
                      >
                        <td className={selectedUnit === 'EU' ? styles.cellActive : ''}>{row.eu}</td>
                        <td className={selectedUnit === 'US' ? styles.cellActive : ''}>{row.us}</td>
                        <td className={selectedUnit === 'US' ? styles.cellActive : ''}>{row.usW}</td>
                        <td className={selectedUnit === 'UK' ? styles.cellActive : ''}>{row.uk}</td>
                        <td className={selectedUnit === 'CM' ? styles.cellActive : ''}>{row.cm}</td>
                        <td className={selectedUnit === 'JPN' ? styles.cellActive : ''}>{row.jpn}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className={styles.tableNote}>
                <AlertCircle size={14} />
                <span>Sizes follow European standard (Mondopoint). US Women&apos;s is typically 1.5 sizes larger than US Men&apos;s.</span>
              </div>
            </div>
          )}

          {/* ======== SIZE FINDER (SUPER ACCURATE) ======== */}
          {activeTab === 'finder' && (
            <div className={styles.finderPanel}>
              <div className={styles.finderCard}>
                <div className={styles.finderIcon}>
                  <Footprints size={36} strokeWidth={1.5} />
                </div>
                <h3 className={styles.finderTitle}>Find Your Perfect Size</h3>
                <p className={styles.finderDesc}>
                  Enter your exact foot length and we&apos;ll calculate your ideal AURA sneaker size with precision matching.
                </p>

                {/* Foot Width Selection */}
                <div className={styles.widthSection}>
                  <label className={styles.inputLabel}>
                    <MoveVertical size={12} />
                    Foot Width
                  </label>
                  <div className={styles.widthSelector}>
                    {[
                      { value: 'narrow', label: 'Narrow', desc: 'Slim profile' },
                      { value: 'normal', label: 'Normal', desc: 'Standard fit' },
                      { value: 'wide', label: 'Wide', desc: 'Wider fit' },
                    ].map(w => (
                      <button
                        key={w.value}
                        className={`${styles.widthBtn} ${footWidth === w.value ? styles.widthActive : ''}`}
                        onClick={() => setFootWidth(w.value)}
                      >
                        <span className={styles.widthLabel}>{w.label}</span>
                        <span className={styles.widthDesc}>{w.desc}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Measurement Input */}
                <div className={styles.inputRow}>
                  <div className={styles.inputGroup}>
                    <label className={styles.inputLabel}>
                      <Ruler size={12} />
                      Foot Length
                    </label>
                    <input
                      type="number"
                      className={styles.input}
                      placeholder={measureUnit === 'cm' ? 'e.g. 26.5' : 'e.g. 10.4'}
                      value={footLength}
                      onChange={(e) => setFootLength(e.target.value)}
                      step="0.1"
                      min="20"
                      max="33"
                    />
                  </div>
                  <div className={styles.inputGroup}>
                    <label className={styles.inputLabel}>
                      <ArrowLeftRight size={12} />
                      Unit
                    </label>
                    <div className={styles.unitToggle}>
                      <button 
                        className={`${styles.toggleBtn} ${measureUnit === 'cm' ? styles.toggleActive : ''}`}
                        onClick={() => setMeasureUnit('cm')}
                      >
                        CM
                      </button>
                      <button 
                        className={`${styles.toggleBtn} ${measureUnit === 'inches' ? styles.toggleActive : ''}`}
                        onClick={() => setMeasureUnit('inches')}
                      >
                        IN
                      </button>
                    </div>
                  </div>
                </div>

                {/* Result */}
                {recommendedSize && (
                  <div className={styles.result}>
                    <div className={styles.resultGlow}></div>
                    
                    {/* Confidence Bar */}
                    <div className={styles.confidenceRow}>
                      <ShieldCheck size={14} />
                      <span className={styles.confidenceText}>Fit Confidence</span>
                      <div className={styles.confidenceBar}>
                        <div 
                          className={styles.confidenceFill} 
                          style={{ width: `${fitConfidence}%` }}
                        ></div>
                      </div>
                      <span className={styles.confidenceVal}>{fitConfidence}%</span>
                    </div>

                    <span className={styles.resultLabel}>
                      <Target size={14} />
                      Recommended Size
                    </span>
                    <div className={styles.resultSizes}>
                      <div className={styles.resultItem}>
                        <span className={styles.resultValue}>{recommendedSize.eu}</span>
                        <span className={styles.resultUnit}>EU</span>
                      </div>
                      <div className={styles.resultDivider}></div>
                      <div className={styles.resultItem}>
                        <span className={styles.resultValue}>{gender === 'women' ? recommendedSize.usW : recommendedSize.us}</span>
                        <span className={styles.resultUnit}>US</span>
                      </div>
                      <div className={styles.resultDivider}></div>
                      <div className={styles.resultItem}>
                        <span className={styles.resultValue}>{recommendedSize.uk}</span>
                        <span className={styles.resultUnit}>UK</span>
                      </div>
                      <div className={styles.resultDivider}></div>
                      <div className={styles.resultItem}>
                        <span className={styles.resultValue}>{recommendedSize.cm}</span>
                        <span className={styles.resultUnit}>CM</span>
                      </div>
                    </div>

                    {altSize && (
                      <div className={styles.altSize}>
                        <ChevronRight size={12} />
                        <span>Also consider: EU {altSize.eu} (US {gender === 'women' ? altSize.usW : altSize.us})</span>
                      </div>
                    )}

                    <p className={styles.resultNote}>
                      Based on {footLength} {measureUnit} • {footWidth} width • {footWidth === 'wide' ? 'Adjusted +0.3cm for wider fit' : footWidth === 'narrow' ? 'Adjusted -0.2cm for narrow fit' : 'Standard fit calculation'}
                    </p>
                  </div>
                )}

                {footLength && !recommendedSize && (
                  <div className={styles.noResult}>
                    <AlertCircle size={16} />
                    <span>Enter a valid foot length: 21–33 cm (8.3–13 inches)</span>
                  </div>
                )}
              </div>

              {/* How to Measure Steps */}
              <div className={styles.stepsCard}>
                <h4 className={styles.stepsTitle}>
                  <ScanLine size={16} />
                  How to Measure Accurately
                </h4>
                <div className={styles.steps}>
                  <div className={styles.step}>
                    <div className={styles.stepNum}>1</div>
                    <div>
                      <strong>Prepare your surface</strong>
                      <p>Place A4 paper on a hard, flat floor against a wall. Tape it down to prevent slipping.</p>
                    </div>
                  </div>
                  <div className={styles.step}>
                    <div className={styles.stepNum}>2</div>
                    <div>
                      <strong>Position your foot</strong>
                      <p>Wear your athletic socks. Place heel firmly against the wall. Stand with full body weight on both feet.</p>
                    </div>
                  </div>
                  <div className={styles.step}>
                    <div className={styles.stepNum}>3</div>
                    <div>
                      <strong>Mark the longest toe</strong>
                      <p>Have someone mark the tip of your longest toe (often the 2nd toe, not the big toe) with a pen.</p>
                    </div>
                  </div>
                  <div className={styles.step}>
                    <div className={styles.stepNum}>4</div>
                    <div>
                      <strong>Measure precisely</strong>
                      <p>Use a ruler or tape measure from the paper edge to the mark. Record in centimeters to one decimal place.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ======== FIT TIPS ======== */}
          {activeTab === 'tips' && (
            <div className={styles.tipsPanel}>
              <div className={styles.tipsGrid}>
                {fitTips.map((tip, i) => {
                  const IconComp = tip.icon;
                  return (
                    <div key={i} className={styles.tipCard} style={{ '--tip-color': tip.color }}>
                      <div className={styles.tipIcon}>
                        <IconComp size={22} />
                      </div>
                      <h4 className={styles.tipTitle}>{tip.title}</h4>
                      <p className={styles.tipDesc}>{tip.desc}</p>
                    </div>
                  );
                })}
              </div>

              <div className={styles.noteCard}>
                <div className={styles.noteHeader}>
                  <ShieldCheck size={18} />
                  <span>AURA Comfort Guarantee</span>
                </div>
                <p className={styles.noteText}>
                  AURA Sneakers are designed with a standard athletic fit using premium Italian-grade materials. 
                  Each pair features a <strong>dual-density memory foam insole</strong> that molds to your foot shape 
                  within the first 3-5 wears. If you have wider feet (E width or above), we recommend going up 
                  half a size. All purchases include our <strong>30-day perfect fit guarantee</strong> — if the size 
                  isn&apos;t right, we&apos;ll exchange for free with complimentary return shipping.
                </p>
              </div>

              <div className={styles.noteCard}>
                <div className={styles.noteHeader}>
                  <Heart size={18} />
                  <span>Break-In Period</span>
                </div>
                <p className={styles.noteText}>
                  New sneakers may feel snug at first. The premium leather and knit materials will naturally 
                  stretch 2-3mm during the first week of wear. If your sneakers feel slightly tight initially, 
                  this is normal — they&apos;re designed to relax into a perfect custom fit. Avoid going one full 
                  size up just because of initial snugness.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
