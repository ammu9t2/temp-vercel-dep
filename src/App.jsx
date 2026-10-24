import React, { useEffect, useMemo, useState } from 'react';

const WHATSAPP_NUMBER = '923255412233';
const PHONE_DISPLAY = '0325 5412233';
const areas = [
  'Gulberg (1, 2, 3)',
  'DHA Lahore (Phases 1–8)',
  'Johar Town & PIA Society',
  'Model Town & Garden Town',
  'Lahore Cantt & Askari',
  'Faisal Town & Township',
  'Wapda Town & Valencia',
  'Other area in Lahore'
];

function whatsappUrl(message) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

function Icon({ name, size = 20, strokeWidth = 1.8 }) {
  const common = { width: size, height: size, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth, strokeLinecap: 'round', strokeLinejoin: 'round', 'aria-hidden': true };
  const paths = {
    diamond: <><path d="M6 3h12l4 6-10 12L2 9l4-6Z"/><path d="M2 9h20M9 3l-2 6 5 12 5-12-2-6"/></>,
    wa: <><path d="M20.1 11.8a8.2 8.2 0 0 1-12.2 7.1L3 20l1.2-4.7a8.2 8.2 0 1 1 15.9-3.5Z"/><path d="M8.3 8.2c.3-.6.5-.6.8-.6h.4c.2 0 .4.1.5.4l.7 1.7c.1.2.1.4-.1.6l-.5.6c-.2.2-.2.3 0 .6.4.7 1 1.4 1.7 1.8.3.2.5.2.7-.1l.7-.8c.2-.2.4-.3.6-.2l1.6.8c.3.1.4.3.4.5 0 .3-.2 1-.7 1.4-.5.4-1 .6-1.7.4-.8-.2-1.9-.6-3.1-1.7-1-.9-1.7-2.1-1.9-2.9-.2-.7 0-1.3.2-1.7Z"/></>,
    water: <><path d="M12 2.5S5.5 10 5.5 14.4a6.5 6.5 0 0 0 13 0C18.5 10 12 2.5 12 2.5Z"/><path d="M9 15.5c.3 1.2 1.2 1.9 2.5 2"/></>,
    truck: <><path d="M3 5h11v11H3z"/><path d="M14 9h4l3 3v4h-7z"/><circle cx="7.5" cy="18" r="1.8"/><circle cx="17.5" cy="18" r="1.8"/></>,
    arrow: <><path d="M4 12h15"/><path d="m13 5 7 7-7 7"/></>,
    chevron: <path d="m6 9 6 6 6-6"/>,
    sun: <><circle cx="12" cy="12" r="4"/><path d="M12 2v2m0 16v2M4.93 4.93l1.42 1.42m11.3 11.3 1.42 1.42M2 12h2m16 0h2M4.93 19.07l1.42-1.42m11.3-11.3 1.42-1.42"/></>,
    moon: <path d="M20.5 14.2A8.8 8.8 0 0 1 9.8 3.5 8.9 8.9 0 1 0 20.5 14.2Z"/>,
    menu: <><path d="M4 7h16M4 12h16M4 17h16"/></>,
    close: <><path d="m6 6 12 12M18 6 6 18"/></>,
    check: <path d="m5 12 4 4L19 6"/>,
    calendar: <><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M16 3v4M8 3v4M3 10h18"/></>,
    sparkle: <><path d="m12 3 1.7 5.3L19 10l-5.3 1.7L12 17l-1.7-5.3L5 10l5.3-1.7L12 3Z"/><path d="m19 15 .8 2.2L22 18l-2.2.8L19 21l-.8-2.2L16 18l2.2-.8L19 15Z"/></>,
    shield: <><path d="M12 22s8-4 8-11V5l-8-3-8 3v6c0 7 8 11 8 11Z"/><path d="m9 12 2 2 4-4"/></>,
    instagram: <><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><path d="M17.5 6.5h.01"/></>,
    phone: <path d="M22 16.9v3a2 2 0 0 1-2.2 2A19.8 19.8 0 0 1 11.2 19a19.4 19.4 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7l.5 2.8a2 2 0 0 1-.6 1.9L7.7 9.7a16 16 0 0 0 6.6 6.6l1.3-1.3a2 2 0 0 1 1.9-.6l2.8.5a2 2 0 0 1 1.7 2Z"/>,
    plus: <><path d="M12 5v14M5 12h14"/></>
  };
  return <svg {...common}>{paths[name] || paths.sparkle}</svg>;
}

function Brand({ compact = false }) {
  return <a href="#home" className={`brand ${compact ? 'brand-compact' : ''}`} aria-label="Crystal Pure home">
    <span className="brand-mark"><Icon name="diamond" size={compact ? 20 : 23} strokeWidth={1.65} /></span>
    <span className="brand-copy"><strong>CRYSTAL <em>PURE</em></strong><small>PURE RO <b>•</b> PURE LIFE</small></span>
  </a>;
}

function BottleArt({ variant = 'pure', size = 'large' }) {
  const palettes = {
    pure: { cap: '#1589b9', label: '#e8f8fc', ink: '#17678a', accent: '#35b9cf' },
    wedding: { cap: '#de6680', label: '#fff0f1', ink: '#762a41', accent: '#d95e7c' },
    corporate: { cap: '#152d4b', label: '#f1f5f9', ink: '#183a5d', accent: '#3e9cbb' },
    small: { cap: '#1287b4', label: '#edfaff', ink: '#17678a', accent: '#4bb7cf' }
  };
  const c = palettes[variant] || palettes.pure;
  const id = `bottle-${variant}-${size}`;
  return <svg className={`bottle-art bottle-${size}`} viewBox="0 0 220 410" role="img" aria-label={`${variant === 'wedding' ? 'Custom wedding' : variant === 'corporate' ? 'Corporate logo' : 'Crystal Pure'} water bottle illustration`}>
    <defs>
      <linearGradient id={`${id}-body`} x1="0" y1="0" x2="1" y2="0">
        <stop offset="0" stopColor="#d5f2fa" stopOpacity=".65"/><stop offset=".23" stopColor="#fff" stopOpacity=".94"/><stop offset=".7" stopColor="#dcf4fb" stopOpacity=".72"/><stop offset="1" stopColor="#acdce9" stopOpacity=".65"/>
      </linearGradient>
      <linearGradient id={`${id}-water`} x1="0" y1="0" x2="1" y2="0"><stop offset="0" stopColor="#71c9e6" stopOpacity=".45"/><stop offset=".5" stopColor="#d4f8ff" stopOpacity=".2"/><stop offset="1" stopColor="#51bddf" stopOpacity=".55"/></linearGradient>
    </defs>
    <ellipse cx="110" cy="387" rx="56" ry="9" fill="currentColor" opacity=".09"/>
    <rect x="86" y="23" width="48" height="28" rx="5" fill={c.cap}/>
    {Array.from({length:7}, (_,i)=><path key={i} d={`M${91+i*6} 25v24`} stroke="#ffffff" strokeOpacity=".25" strokeWidth="1.2"/>)}
    <path d="M90 49h40v20c0 9 8 16 15 26 8 11 12 20 12 34v221c0 18-11 29-29 29H92c-18 0-29-11-29-29V129c0-14 4-23 12-34 7-10 15-17 15-26V49Z" fill={`url(#${id}-body)`} stroke="#93c8d9" strokeWidth="1.5"/>
    <path d="M74 136c14-7 31-10 36-10 10 0 25 5 45 1v210c0 12-8 20-20 20H92c-11 0-18-8-18-20V136Z" fill={`url(#${id}-water)`}/>
    <path d="M82 88c-5 9-8 18-8 33v225c0 7 2 13 6 17" stroke="#fff" strokeWidth="5" strokeLinecap="round" opacity=".75" fill="none"/>
    <path d="M140 98c6 8 10 18 10 29v208" stroke="#fff" strokeWidth="2.3" strokeLinecap="round" opacity=".5" fill="none"/>
    <rect x="67" y={variant === 'wedding' ? '163' : '157'} width="86" height="124" rx="4" fill={c.label} stroke={c.accent} strokeOpacity=".55"/>
    <rect x="67" y={variant === 'wedding' ? '163' : '157'} width="86" height="22" rx="4" fill={c.accent}/>
    <text x="110" y={variant === 'wedding' ? '178' : '172'} textAnchor="middle" fontSize="8" fontWeight="700" fill="#fff" letterSpacing="1.3">CRYSTAL PURE</text>
    {variant === 'wedding' ? <>
      <circle cx="110" cy="211" r="12" fill="#f8d9df" stroke={c.accent} strokeWidth="1"/>
      <path d="M104 211c2-5 10-5 12 0M105 216h10" stroke={c.ink} strokeWidth="1.2" fill="none" strokeLinecap="round"/>
      <text x="110" y="240" textAnchor="middle" fill={c.ink} fontSize="10" fontWeight="700">A &amp; A</text>
      <text x="110" y="253" textAnchor="middle" fill={c.ink} fontSize="6.8" letterSpacing=".8">WALIMA • 2026</text>
      <path d="M81 265h58" stroke={c.accent} strokeWidth=".8" opacity=".6"/>
    </> : variant === 'corporate' ? <>
      <rect x="91" y="197" width="38" height="29" rx="3" fill="none" stroke={c.accent} strokeWidth="1.6"/>
      <path d="m98 217 8-10 6 6 5-4 5 8" stroke={c.ink} strokeWidth="1.5" fill="none"/>
      <text x="110" y="241" textAnchor="middle" fill={c.ink} fontSize="8" fontWeight="700">YOUR COMPANY</text>
      <text x="110" y="254" textAnchor="middle" fill={c.ink} fontSize="6.7" letterSpacing=".7">BRANDED WATER</text>
      <path d="M81 265h58" stroke={c.accent} strokeWidth=".8" opacity=".6"/>
    </> : <>
      <path d="M110 196 122 208 110 220 98 208Z" fill={c.accent} opacity=".95"/>
      <path d="M110 201 117 208 110 215 103 208Z" fill="#fff" opacity=".8"/>
      <text x="110" y="239" textAnchor="middle" fill={c.ink} fontSize="10" fontWeight="800" letterSpacing="1.4">PURE RO</text>
      <text x="110" y="252" textAnchor="middle" fill={c.ink} fontSize="7" letterSpacing="1.1">PURE LIFE</text>
      <path d="M81 265h58" stroke={c.accent} strokeWidth=".8" opacity=".6"/>
    </>}
    <path d="M85 299h50" stroke="#fff" strokeWidth="1" opacity=".65"/>
    <path d="M86 318h44" stroke="#fff" strokeWidth="1" opacity=".45"/>
    <path d="M87 340h42" stroke="#fff" strokeWidth="1" opacity=".35"/>
  </svg>;
}

function SectionEyebrow({ children, dark = false }) {
  return <div className={`eyebrow ${dark ? 'eyebrow-on-dark' : ''}`}><span className="eyebrow-dot" />{children}</div>;
}

function App() {
  const [theme, setTheme] = useState(() => {
    try { return localStorage.getItem('crystal-pure-theme') || 'light'; } catch { return 'light'; }
  });
  const [menuOpen, setMenuOpen] = useState(false);
  const [quantity, setQuantity] = useState(3);
  const [bottleType, setBottleType] = useState('refill');
  const [deliveryArea, setDeliveryArea] = useState(areas[0]);
  const [customSize, setCustomSize] = useState('1.5L');
  const [customQty, setCustomQty] = useState(250);
  const [customName, setCustomName] = useState('');
  const [eventDate, setEventDate] = useState('');
  const [eventType, setEventType] = useState('Wedding / Walima');
  const [customNote, setCustomNote] = useState('');
  const [artFile, setArtFile] = useState(null);
  const [faqOpen, setFaqOpen] = useState(0);
  const [notice, setNotice] = useState('');

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    try { localStorage.setItem('crystal-pure-theme', theme); } catch {}
  }, [theme]);

  useEffect(() => {
    const closeOnEscape = (event) => { if (event.key === 'Escape') setMenuOpen(false); };
    window.addEventListener('keydown', closeOnEscape);
    return () => window.removeEventListener('keydown', closeOnEscape);
  }, []);

  const estimatedTotal = quantity * (bottleType === 'refill' ? 150 : 1200);
  const customEstimate = useMemo(() => {
    if (customSize === '1.5L') return { low: customQty * 55, high: customQty * 65, unit: 'PKR 55–65 / bottle', text: `Estimated range: PKR ${(customQty * 55).toLocaleString('en-PK')}–${(customQty * 65).toLocaleString('en-PK')}` };
    return { low: null, high: null, unit: 'Custom quote', text: 'Price confirmed for selected bottle size' };
  }, [customQty, customSize]);

  const scrollTo = (id) => {
    setMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const sendWhatsApp = (message) => {
    window.open(whatsappUrl(message), '_blank', 'noopener,noreferrer');
  };

  const requestWaterOrder = () => {
    const typeText = bottleType === 'refill' ? '19L refill only (customer has bottles)' : 'New 19L bottle set (bottle deposit + refill included)';
    const message = `Assalam-o-Alaikum Crystal Pure! I'd like to place a 19L water order.\n\nOrder: ${typeText}\nQuantity: ${quantity} bottle${quantity === 1 ? '' : 's'}\nWater subtotal: PKR ${estimatedTotal.toLocaleString('en-PK')}\nDelivery area: ${deliveryArea}\nDelivery fee: Please confirm\n\nPlease confirm availability and final total. Thank you.`;
    sendWhatsApp(message);
  };

  const requestCustomOrder = (event) => {
    event.preventDefault();
    const message = `Assalam-o-Alaikum Crystal Pure! I'd like a custom water bottle quote.\n\nEvent: ${eventType}\nBottle size: ${customSize}\nQuantity: ${customQty} bottles\n${customName ? `Name / company: ${customName}\n` : ''}${eventDate ? `Event date / slogan: ${eventDate}\n` : ''}${customSize === '1.5L' ? `Estimated bottle rate: PKR 55–65\nEstimated range: PKR ${customEstimate.low.toLocaleString('en-PK')}–${customEstimate.high.toLocaleString('en-PK')}\n` : ''}${artFile ? `Artwork file selected: ${artFile.name} (I'll attach it in WhatsApp)\n` : ''}${customNote ? `Details: ${customNote}\n` : ''}\nPlease confirm final pricing, print options, delivery and timeline. Thank you.`;
    sendWhatsApp(message);
    setNotice('Your WhatsApp message is ready. Attach your photo or logo in the chat before sending.');
    window.setTimeout(() => setNotice(''), 7000);
  };

  const faqs = [
    { q: 'Which areas of Lahore do you deliver to?', a: 'We serve areas including Gulberg, DHA Lahore, Johar Town, Model Town, Garden Town, Lahore Cantt, Askari, Faisal Town, Township, Wapda Town and Valencia. Choose “Other area” in the calculator and confirm your address with us on WhatsApp.' },
    { q: 'Can I print a bride and groom photo or our company logo?', a: 'Yes. Custom waterproof label printing is available for weddings, Walima, corporate functions, restaurants, hotels and other events. You can request 1.5L, 500ml or 330ml bottles. Send your photo or logo in WhatsApp after opening the quote message.' },
    { q: 'What does the 19L new bottle set price include?', a: 'The displayed PKR 1,200 estimate is for a new bottle set, including the bottle deposit and refill. If you already have a 19L bottle, the displayed refill rate is PKR 150. Please confirm stock and any delivery charges before placing the order.' },
    { q: 'How much do custom event bottles cost?', a: 'The current estimate shown for 1.5L custom wedding bottles is PKR 55–65 per bottle. Other sizes and final prices depend on the order details. We confirm the final quote, print options and timing directly before you proceed.' }
  ];

  return <div className="site-shell">
    <div className="topline"><div className="container topline-inner"><span><span className="status-dot" /> Serving Lahore, Pakistan</span><span className="topline-right">7-stage RO water <b>·</b> Custom event bottling</span></div></div>
    <header className="site-header">
      <div className="container nav-wrap">
        <Brand />
        <nav className={`main-nav ${menuOpen ? 'nav-open' : ''}`} aria-label="Main navigation">
          <a href="#water" onClick={() => setMenuOpen(false)}>Water delivery</a>
          <a href="#custom" onClick={() => setMenuOpen(false)}>Custom bottles</a>
          <a href="#calculator" onClick={() => setMenuOpen(false)}>Price calculator</a>
          <a href="#about" onClick={() => setMenuOpen(false)}>Our standard</a>
          <div className="mobile-nav-actions">
            <button className="theme-toggle" onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')} aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}><Icon name={theme === 'light' ? 'moon' : 'sun'} size={18}/><span>{theme === 'light' ? 'Dark mode' : 'Light mode'}</span></button>
            <a href={whatsappUrl('Assalam-o-Alaikum Crystal Pure! I have a question about your water delivery and custom bottles.')} className="button button-primary nav-mobile-cta" target="_blank" rel="noreferrer"><Icon name="wa" size={17}/> Chat on WhatsApp</a>
          </div>
        </nav>
        <div className="nav-actions">
          <button className="theme-toggle" onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')} aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`} title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}><Icon name={theme === 'light' ? 'moon' : 'sun'} size={18}/></button>
          <a href={whatsappUrl('Assalam-o-Alaikum Crystal Pure! I have a question about your water delivery and custom bottles.')} className="button button-primary nav-cta" target="_blank" rel="noreferrer"><Icon name="wa" size={17}/> Talk to us <Icon name="arrow" size={16}/></a>
          <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)} aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'} aria-expanded={menuOpen}><Icon name={menuOpen ? 'close' : 'menu'} size={22}/></button>
        </div>
      </div>
    </header>

    <main>
      <section className="hero section-anchor" id="home">
        <div className="container hero-grid">
          <div className="hero-copy">
            <SectionEyebrow>Pure water. Thoughtful details.</SectionEyebrow>
            <h1>Good water,<br/><span>beautifully</span> delivered.</h1>
            <p className="hero-lede">Premium 7-stage RO drinking water for Lahore homes, offices and events — with custom bottles made to feel personal.</p>
            <div className="hero-actions">
              <button className="button button-primary button-large" onClick={() => scrollTo('calculator')}>Order 19L water <Icon name="arrow" size={18}/></button>
              <button className="button button-secondary button-large" onClick={() => scrollTo('custom')}><Icon name="sparkle" size={17}/> Explore custom bottles</button>
            </div>
            <div className="hero-social-proof">
              <div className="proof-icon"><Icon name="water" size={19}/></div>
              <div><strong>Made for everyday rituals</strong><span>Clean presentation, reliable service, local support.</span></div>
            </div>
          </div>
          <div className="hero-visual" aria-label="Crystal Pure bottled water illustration">
            <div className="visual-topline"><span>CRYSTAL PURE / LAHORE</span><span>01 — 03</span></div>
            <div className="visual-stage">
              <div className="stage-ring ring-one"/><div className="stage-ring ring-two"/>
              <div className="stage-label label-top"><span className="mini-dot"/> 7-STAGE RO</div>
              <div className="hero-bottle-wrap"><BottleArt variant="pure" size="large"/></div>
              <div className="sample-card">
                <span className="sample-overline">OUR PROMISE</span><strong>Pure RO.<br/>Pure life.</strong><span className="sample-bottom">A clearer everyday choice.</span>
              </div>
              <div className="visual-note"><span>30–50</span><small>TDS range<br/>as shown on site</small></div>
            </div>
            <div className="visual-caption"><span>01 / PURE WATER</span><span>Designed for daily use</span></div>
          </div>
        </div>
        <div className="container hero-bottomline"><span><Icon name="check" size={15}/> Delivered across Lahore</span><span><Icon name="check" size={15}/> Personalised event bottles</span><span><Icon name="check" size={15}/> Orders confirmed on WhatsApp</span></div>
      </section>

      <section className="quick-services" aria-label="Crystal Pure services">
        <div className="container service-strip">
          <div className="strip-item"><div className="strip-icon aqua"><Icon name="water" size={21}/></div><div><strong>19L RO refills</strong><span>For home & office</span></div><span className="strip-arrow">↗</span></div>
          <div className="strip-item"><div className="strip-icon blue"><Icon name="truck" size={21}/></div><div><strong>Lahore delivery</strong><span>Local area coverage</span></div><span className="strip-arrow">↗</span></div>
          <div className="strip-item"><div className="strip-icon rose"><Icon name="sparkle" size={21}/></div><div><strong>Custom labels</strong><span>Weddings & businesses</span></div><span className="strip-arrow">↗</span></div>
        </div>
      </section>

      <section className="section water-section section-anchor" id="water">
        <div className="container">
          <div className="section-heading split-heading">
            <div><SectionEyebrow>Everyday hydration</SectionEyebrow><h2>Simple water service.<br/><span>One less thing to think about.</span></h2></div>
            <div className="section-heading-side"><p>Refill your existing 19L bottle or start with a new bottle set. Choose your quantity and area, then confirm the final total with our team.</p><button className="text-link" onClick={() => scrollTo('calculator')}>Calculate an order <Icon name="arrow" size={17}/></button></div>
          </div>
          <div className="product-grid">
            <article className="product-card product-featured">
              <div className="product-card-top"><span className="product-number">01 / REFILL</span><span className="product-chip chip-blue">Everyday essential</span></div>
              <div className="product-art-wrap"><div className="product-art-halo"/><BottleArt variant="pure" size="medium"/></div>
              <div className="product-info"><div className="product-title-row"><h3>19L bottle refill</h3><span className="product-price">Rs 150<span> / refill</span></span></div><p>For customers who already have a 19-litre bottle and want a dependable refill.</p><div className="feature-list"><span><Icon name="check" size={15}/> 7-stage RO water</span><span><Icon name="check" size={15}/> Home & office orders</span></div><button className="button button-outline full-button" onClick={() => {setBottleType('refill'); scrollTo('calculator');}}>Order a refill <Icon name="arrow" size={16}/></button></div>
            </article>
            <article className="product-card">
              <div className="product-card-top"><span className="product-number">02 / BOTTLE SET</span><span className="product-chip chip-soft">Bottle included</span></div>
              <div className="product-art-wrap product-art-alt"><div className="product-art-halo halo-blue"/><BottleArt variant="pure" size="medium"/></div>
              <div className="product-info"><div className="product-title-row"><h3>New 19L bottle set</h3><span className="product-price">Rs 1,200<span> / set</span></span></div><p>Get started with a bottle set. Displayed price includes bottle deposit and refill.</p><div className="feature-list"><span><Icon name="check" size={15}/> Bottle + refill included</span><span><Icon name="check" size={15}/> Confirm stock on WhatsApp</span></div><button className="button button-outline full-button" onClick={() => {setBottleType('new'); scrollTo('calculator');}}>Get a bottle set <Icon name="arrow" size={16}/></button></div>
            </article>
            <article className="product-card custom-product-card">
              <div className="product-card-top"><span className="product-number">03 / YOUR LABEL</span><span className="product-chip chip-rose">Made personal</span></div>
              <div className="product-art-wrap custom-art-wrap"><div className="product-art-halo halo-rose"/><div className="mini-bottle duo-one"><BottleArt variant="wedding" size="small"/></div><div className="mini-bottle duo-two"><BottleArt variant="corporate" size="small"/></div></div>
              <div className="product-info"><div className="product-title-row"><h3>Custom event bottles</h3><span className="product-price">From <span>Rs 55*</span></span></div><p>Wedding photos, couple names or company logos, printed on bottled water for your event.</p><div className="feature-list"><span><Icon name="check" size={15}/> 1.5L, 500ml & 330ml</span><span><Icon name="check" size={15}/> Waterproof label printing</span></div><button className="button button-outline full-button" onClick={() => scrollTo('custom')}>Build a custom order <Icon name="arrow" size={16}/></button></div>
            </article>
          </div>
          <p className="fineprint">*Displayed custom bottle pricing is an estimate for 1.5L bottles. Final quote depends on size, quantity and artwork.</p>
        </div>
      </section>

      <section className="custom-section section-anchor" id="custom">
        <div className="container custom-grid">
          <div className="custom-showcase">
            <div className="showcase-label"><span className="eyebrow-dot"/> LABELS WITH A PERSONAL TOUCH</div>
            <div className="showcase-top-copy"><span>WEDDING / CORPORATE / EVENT</span><span>02 — 03</span></div>
            <div className="showcase-bottles"><div className="showcase-bottle bottle-left"><BottleArt variant="wedding" size="large"/></div><div className="showcase-bottle bottle-right"><BottleArt variant="corporate" size="large"/></div></div>
            <div className="showcase-sample wedding-sample"><span className="sample-kicker">MADE FOR YOUR DAY</span><strong>Ali <i>&</i> Ayesha</strong><span>WALIMA • 12 NOV 2026</span><div className="sample-rule"/><small>Your story, on every table.</small></div>
            <div className="showcase-bottom"><span>01 — Custom label concept</span><span>Print built around your artwork</span></div>
          </div>
          <div className="custom-copy">
            <SectionEyebrow>For the moments that matter</SectionEyebrow>
            <h2>Your event,<br/><span>your bottle.</span></h2>
            <p className="custom-intro">Make the smallest details feel considered. Add a bride and groom photo, your family names, an event date or a company logo to the water bottles on your tables.</p>
            <div className="custom-use-cases">
              <div className="use-case"><span className="use-case-index">01</span><div><strong>Wedding & Walima</strong><p>Couple photos, names and event dates on 1.5L bottles.</p></div><Icon name="arrow" size={17}/></div>
              <div className="use-case"><span className="use-case-index">02</span><div><strong>Corporate & hospitality</strong><p>Company branding for offices, hotels and restaurants.</p></div><Icon name="arrow" size={17}/></div>
              <div className="use-case"><span className="use-case-index">03</span><div><strong>Birthdays & special events</strong><p>A custom label made around your occasion.</p></div><Icon name="arrow" size={17}/></div>
            </div>
            <div className="custom-bottom-note"><div className="note-icon"><Icon name="shield" size={20}/></div><p><strong>Waterproof, high-gloss label printing</strong><span>Available for 1.5L, 500ml and 330ml purified water bottles.</span></p></div>
            <button className="button button-primary button-large" onClick={() => scrollTo('custom-order')}>Customise your bottles <Icon name="arrow" size={18}/></button>
          </div>
        </div>
      </section>

      <section className="section calculator-section section-anchor" id="calculator">
        <div className="container calculator-grid">
          <div className="calculator-intro">
            <SectionEyebrow>Quick order builder</SectionEyebrow>
            <h2>Know your water<br/><span>subtotal upfront.</span></h2>
            <p>Choose your bottle option and delivery area. Your water subtotal is calculated instantly; our team will confirm delivery charges and availability before you place the order.</p>
            <div className="calculator-contact"><div className="contact-icon"><Icon name="wa" size={20}/></div><div><span>Need a hand with your order?</span><strong>{PHONE_DISPLAY}</strong></div><a href={whatsappUrl('Assalam-o-Alaikum Crystal Pure! Please help me calculate a 19L water order.')} target="_blank" rel="noreferrer" aria-label="Ask on WhatsApp"><Icon name="arrow" size={18}/></a></div>
            <div className="calculator-disclaimer"><Icon name="shield" size={16}/><span>Delivery fee is not included in this estimate and will be confirmed on WhatsApp.</span></div>
          </div>
          <div className="calculator-card">
            <div className="calculator-card-head"><div><span className="card-eyebrow">19L WATER ORDER</span><h3>Build your order</h3></div><span className="calc-icon"><Icon name="water" size={21}/></span></div>
            <div className="calc-field">
              <div className="field-label-row"><label htmlFor="quantity">Number of bottles</label><strong className="quantity-display">{quantity} <small>{quantity === 1 ? 'bottle' : 'bottles'}</small></strong></div>
              <input className="range-input" id="quantity" type="range" min="1" max="24" value={quantity} onChange={(e) => setQuantity(Number(e.target.value))} />
              <div className="range-hints"><span>1 bottle</span><span>12 bottles</span><span>24 bottles</span></div>
            </div>
            <fieldset className="bottle-type-options">
              <legend>Choose your bottle option</legend>
              <label className={`bottle-option ${bottleType === 'refill' ? 'selected' : ''}`}><input type="radio" name="bottleType" value="refill" checked={bottleType === 'refill'} onChange={() => setBottleType('refill')}/><span className="radio-custom"/><span className="bottle-option-copy"><strong>Refill only <small>I have bottles</small></strong><span>PKR 150 per 19L refill</span></span><span className="option-price">Rs 150</span></label>
              <label className={`bottle-option ${bottleType === 'new' ? 'selected' : ''}`}><input type="radio" name="bottleType" value="new" checked={bottleType === 'new'} onChange={() => setBottleType('new')}/><span className="radio-custom"/><span className="bottle-option-copy"><strong>New bottle set</strong><span>Deposit + refill included</span></span><span className="option-price">Rs 1,200</span></label>
            </fieldset>
            <div className="calc-field area-field"><label htmlFor="delivery-area">Delivery area in Lahore</label><div className="select-wrap"><select id="delivery-area" value={deliveryArea} onChange={(e) => setDeliveryArea(e.target.value)}>{areas.map(area => <option key={area}>{area}</option>)}</select><Icon name="chevron" size={17}/></div></div>
            <div className="calc-total"><div><span>Estimated water subtotal</span><strong>PKR {estimatedTotal.toLocaleString('en-PK')}</strong><small>{quantity} × PKR {(bottleType === 'refill' ? 150 : 1200).toLocaleString('en-PK')}</small></div><div className="calc-total-tag">Delivery<br/>confirmed separately</div></div>
            <button className="button button-whatsapp button-large full-button" onClick={requestWaterOrder}><Icon name="wa" size={19}/> Continue on WhatsApp <Icon name="arrow" size={17}/></button>
            <p className="calc-terms">No online payment. Your order and final total are confirmed directly with Crystal Pure.</p>
          </div>
        </div>
      </section>

      <section className="custom-order-section section-anchor" id="custom-order">
        <div className="container custom-order-grid">
          <div className="custom-order-heading"><SectionEyebrow>Plan your print run</SectionEyebrow><h2>Start with a few details.<br/><span>We’ll take it from there.</span></h2><p>Share the bottle size, quantity and event details below. We’ll prepare a WhatsApp enquiry so our team can confirm the quote, print requirements and timeline.</p>
            <div className="custom-steps"><div><span>01</span><p><strong>Tell us the occasion</strong><small>Wedding, company, hotel or event.</small></p></div><div><span>02</span><p><strong>Share your artwork</strong><small>Attach the photo or logo in WhatsApp.</small></p></div><div><span>03</span><p><strong>Confirm the details</strong><small>We’ll reply with pricing and next steps.</small></p></div></div>
          </div>
          <form className="custom-form" onSubmit={requestCustomOrder}>
            <div className="form-heading"><div><span className="card-eyebrow">CUSTOM BOTTLING ENQUIRY</span><h3>Request a quote</h3></div><span className="form-spark"><Icon name="sparkle" size={20}/></span></div>
            <div className="form-two-cols"><div className="form-field"><label htmlFor="event-type">Occasion</label><div className="select-wrap"><select id="event-type" value={eventType} onChange={e => setEventType(e.target.value)}><option>Wedding / Walima</option><option>Corporate event</option><option>Hotel / Restaurant</option><option>Birthday / Celebration</option><option>Other event</option></select><Icon name="chevron" size={16}/></div></div><div className="form-field"><label htmlFor="custom-size">Bottle size</label><div className="select-wrap"><select id="custom-size" value={customSize} onChange={e => setCustomSize(e.target.value)}><option>1.5L</option><option>500ml</option><option>330ml</option></select><Icon name="chevron" size={16}/></div></div></div>
            <div className="form-field"><div className="field-label-row"><label htmlFor="custom-qty">Number of bottles</label><strong className="form-qty-label">{customQty.toLocaleString('en-PK')} bottles</strong></div><input className="range-input" id="custom-qty" type="range" min="100" max="2000" step="50" value={customQty} onChange={e => setCustomQty(Number(e.target.value))}/><div className="range-hints"><span>100</span><span>1,000</span><span>2,000</span></div></div>
            <div className="form-field"><label htmlFor="custom-name">Couple names / company title <span>Optional</span></label><input id="custom-name" type="text" value={customName} onChange={e => setCustomName(e.target.value)} placeholder="e.g. Ali & Ayesha or your company name" /></div>
            <div className="form-field"><label htmlFor="event-date">Event date / slogan <span>Optional</span></label><input id="event-date" type="text" value={eventDate} onChange={e => setEventDate(e.target.value)} placeholder="e.g. Walima · 12 Nov 2026" /></div>
            <div className="form-field"><label htmlFor="artwork">Photo or logo file <span>Optional</span></label><label className={`upload-field ${artFile ? 'has-file' : ''}`} htmlFor="artwork"><span className="upload-icon"><Icon name="plus" size={18}/></span><span className="upload-copy"><strong>{artFile ? artFile.name : 'Choose artwork from your device'}</strong><small>{artFile ? 'Selected locally — attach it in WhatsApp after opening' : 'JPG, PNG, PDF or other artwork file'}</small></span><span className="upload-action">Browse</span></label><input className="file-input" id="artwork" type="file" accept="image/*,.pdf,.ai,.eps,.svg" onChange={e => setArtFile(e.target.files?.[0] || null)}/></div>
            <div className="form-field"><label htmlFor="custom-note">Anything else? <span>Optional</span></label><textarea id="custom-note" value={customNote} onChange={e => setCustomNote(e.target.value)} placeholder="Bottle preferences, print idea, delivery area…" rows="3"/></div>
            <div className="custom-price-summary"><div><span>Indicative pricing</span><strong>{customSize === '1.5L' ? `PKR ${customEstimate.low.toLocaleString('en-PK')} – ${customEstimate.high.toLocaleString('en-PK')}` : 'Custom quote'}</strong><small>{customSize === '1.5L' ? 'Estimate at Rs 55–65 per bottle; final quote to be confirmed.' : `Pricing for ${customSize} bottles will be confirmed on WhatsApp.`}</small></div><span className="summary-bottle"><BottleArt variant={eventType.includes('Corporate') || eventType.includes('Hotel') ? 'corporate' : 'wedding'} size="small"/></span></div>
            <button type="submit" className="button button-whatsapp button-large full-button"><Icon name="wa" size={19}/> Request quote on WhatsApp <Icon name="arrow" size={17}/></button>
            <p className="form-privacy">Your details stay in this browser until you send the WhatsApp enquiry. Files are not uploaded by this website.</p>
            {notice && <p className="form-notice" role="status"><Icon name="check" size={16}/>{notice}</p>}
          </form>
        </div>
      </section>

      <section className="section about-section section-anchor" id="about">
        <div className="container about-grid">
          <div className="about-main"><SectionEyebrow>Our standard</SectionEyebrow><h2>Pure is the promise.<br/><span>Care is in the details.</span></h2><p>Crystal Pure brings together everyday RO water delivery and thoughtful custom bottling, with local service for homes, offices, gatherings and businesses across Lahore.</p><div className="about-signature"><span className="signature-mark"><Icon name="diamond" size={20}/></span><span><strong>CRYSTAL PURE</strong><small>PURE RO • PURE LIFE</small></span></div></div>
          <div className="about-details"><div className="about-detail"><span className="detail-index">01</span><div><h3>7-stage RO purification</h3><p>Purified drinking water, presented with a clear standard and simple ordering.</p></div></div><div className="about-detail"><span className="detail-index">02</span><div><h3>Local, direct service</h3><p>Lahore delivery enquiries and final order details are handled by our team.</p></div></div><div className="about-detail"><span className="detail-index">03</span><div><h3>Built around your event</h3><p>Custom waterproof labels for weddings, corporate events and hospitality.</p></div></div></div>
        </div>
      </section>

      <section className="faq-section section-anchor" id="faq">
        <div className="container faq-grid"><div className="faq-intro"><SectionEyebrow>Good to know</SectionEyebrow><h2>A few things,<br/><span>made clear.</span></h2><p>Still have a question about your area, bottle choice or custom print? Get in touch directly.</p><a className="text-link" href={whatsappUrl('Assalam-o-Alaikum Crystal Pure! I have a few questions about your services.')} target="_blank" rel="noreferrer">Ask on WhatsApp <Icon name="arrow" size={17}/></a></div><div className="faq-list">{faqs.map((faq, index) => <article className={`faq-item ${faqOpen === index ? 'faq-active' : ''}`} key={faq.q}><button className="faq-question" onClick={() => setFaqOpen(faqOpen === index ? -1 : index)} aria-expanded={faqOpen === index}><span className="faq-count">0{index + 1}</span><strong>{faq.q}</strong><span className="faq-plus"><Icon name={faqOpen === index ? 'close' : 'plus'} size={17}/></span></button>{faqOpen === index && <p className="faq-answer">{faq.a}</p>}</article>)}</div></div>
      </section>

      <section className="closing-section"><div className="container closing-grid"><div><SectionEyebrow dark>Let’s make it easy</SectionEyebrow><h2>Your next bottle<br/>starts with a message.</h2><p>Order a 19L refill, ask about delivery or start planning your custom event bottles.</p></div><div className="closing-actions"><a className="button button-light button-large" href={whatsappUrl('Assalam-o-Alaikum Crystal Pure! I would like to place an order / request a quote.')} target="_blank" rel="noreferrer"><Icon name="wa" size={19}/> Message Crystal Pure <Icon name="arrow" size={17}/></a><a className="closing-phone" href={`tel:+${WHATSAPP_NUMBER}`}><Icon name="phone" size={17}/>{PHONE_DISPLAY}</a></div><div className="closing-ornament"><div className="ornament-circle circle-a"/><div className="ornament-circle circle-b"/><span>PURE<br/>LIFE</span></div></div></section>
    </main>

    <footer className="site-footer"><div className="container footer-main"><div className="footer-brand-block"><Brand/><p>Pure RO water, everyday delivery and custom bottled water for the moments worth celebrating.</p><div className="footer-socials"><a href={whatsappUrl('Assalam-o-Alaikum Crystal Pure!')} target="_blank" rel="noreferrer" aria-label="WhatsApp"><Icon name="wa" size={18}/></a><a href={`tel:+${WHATSAPP_NUMBER}`} aria-label="Call Crystal Pure"><Icon name="phone" size={17}/></a></div></div><div className="footer-links"><strong>Explore</strong><a href="#water">Water delivery</a><a href="#custom">Custom bottles</a><a href="#calculator">Price calculator</a><a href="#about">Our standard</a></div><div className="footer-links"><strong>Order support</strong><a href={whatsappUrl('Assalam-o-Alaikum Crystal Pure! I need help with delivery in Lahore.')} target="_blank" rel="noreferrer">Lahore delivery</a><a href={whatsappUrl('Assalam-o-Alaikum Crystal Pure! I need a custom bottle quote.')} target="_blank" rel="noreferrer">Custom bottle quote</a><a href={`tel:+${WHATSAPP_NUMBER}`}>{PHONE_DISPLAY}</a><span>Lahore, Pakistan</span></div><div className="footer-note"><span className="footer-note-kicker">THE CRYSTAL PURE STANDARD</span><strong>Pure RO.<br/><em>Pure life.</em></strong><span>Water with thought behind every detail.</span></div></div><div className="container footer-bottom"><span>© {new Date().getFullYear()} Crystal Pure. All rights reserved.</span><span>Serving Lahore, Pakistan <b>·</b> Orders confirmed directly on WhatsApp</span><button className="back-top" onClick={() => scrollTo('home')}>Back to top ↑</button></div></footer>
    <a className="floating-whatsapp" href={whatsappUrl('Assalam-o-Alaikum Crystal Pure! I would like to ask about water delivery or custom bottles.')} target="_blank" rel="noreferrer" aria-label="Chat with Crystal Pure on WhatsApp"><Icon name="wa" size={23}/><span>Chat with us</span></a>
  </div>;
}

export default App;
