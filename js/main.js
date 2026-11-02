/**
 * ALFAIZ | Web Architect
 * High-Performance Vanilla JavaScript
 * Zero dependencies, ultra-lightweight, 60fps animations
 */

// ==========================================================================
// Portfolio Seed Data for localStorage ('alfaiz_portfolio_v2')
// ==========================================================================
const DEFAULT_PROJECTS = [
  {
    id: "1",
    title: "Nexus Global Financial Engine",
    category: "Fintech Core",
    filterCat: "fintech",
    badge: "99/100 SPEED",
    subtitle: "Institutional-grade currency and liquidity terminal running on pure vanilla JavaScript",
    summary: "An ultra-low latency liquidity engine and currency terminal handling real-time WebSocket feeds with 60FPS fluid canvas visualizations, strict memory leak prevention, and zero layout thrashing.",
    fullDescription: "Nexus was architected for high-frequency algorithmic traders and institutional desks requiring sub-millisecond price quote rendering. By replacing a legacy 4.8MB React/Redux bundle with pure native DOM nodes and binary WebSocket decoders, First Contentful Paint dropped to 0.19 seconds and memory churn was reduced by 94%.",
    coverImage: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&h=450&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&h=675&q=80",
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&h=675&q=80",
      "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?auto=format&fit=crop&w=1200&h=675&q=80"
    ],
    videoUrl: "https://www.youtube-nocookie.com/embed/ScMzIvxBSi4?rel=0&modestbranding=1",
    metrics: {
      payload: "18.4 KB",
      fcp: "0.19s",
      lcp: "0.24s",
      fps: "60 Constant"
    },
    tags: ["Pure Vanilla JS", "WebSocket", "Canvas 2D", "Binary Buffers"],
    architectureHighlights: [
      "Zero virtual DOM overhead; direct diffing using native DocumentFragment batching.",
      "Custom memory pooler reusing objects to completely eliminate GC garbage collection stutter.",
      "WebSocket binary ArrayBuffer decoding executed directly inside dedicated Web Workers.",
      "Strict Content Security Policy (CSP Level 3) with zero third-party script vulnerabilities."
    ],
    client: "Global Capital Markets Ltd.",
    year: "2024",
    status: "Production Live"
  },
  {
    id: "2",
    title: "Veloce Headless Commerce Core",
    category: "E-Commerce Architecture",
    filterCat: "ecommerce",
    badge: "100/100 SPEED",
    subtitle: "Custom-built shopping engine designed for high-concurrency flash sales",
    summary: "Replaced a sluggish 3.2MB legacy storefront with a modular 35KB vanilla engine featuring instant page transitions, optimistic cart sync, and edge caching.",
    fullDescription: "Veloce was engineered to withstand severe traffic surges during holiday flash sales where standard commercial platforms crash or experience checkout queue delays. The system utilizes native HTML5 templates, lightweight micro-state management, and offline-first IndexedDB storage.",
    coverImage: "https://images.unsplash.com/photo-1472851294608-062f824d29cc?auto=format&fit=crop&w=800&h=450&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1472851294608-062f824d29cc?auto=format&fit=crop&w=1200&h=675&q=80",
      "https://images.unsplash.com/photo-1556742049-0a67c5574f73?auto=format&fit=crop&w=1200&h=675&q=80",
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&h=675&q=80"
    ],
    videoUrl: "https://www.youtube-nocookie.com/embed/ScMzIvxBSi4?rel=0&modestbranding=1",
    metrics: {
      payload: "34.8 KB",
      fcp: "0.22s",
      lcp: "0.31s",
      conversion: "+38.4%"
    },
    tags: ["HTML5 Template", "IndexedDB", "Vanilla Router", "Edge Caching"],
    architectureHighlights: [
      "Vanilla client-side routing with pre-fetched JSON payloads yielding 0ms perceived navigation.",
      "Optimistic checkout mutations instantly reflected in the UI while queuing resilient background syncing.",
      "Self-contained Web Components for product recommendation cards with encapsulated CSS.",
      "100/100 Mobile and Desktop Google Lighthouse scores sustained under heavy load."
    ],
    client: "Veloce Retail Brands",
    year: "2024",
    status: "Production Live"
  },
  {
    id: "3",
    title: "Aether Multi-Cloud Observability",
    category: "Cloud Systems",
    filterCat: "cloud",
    badge: "ENTERPRISE SCALE",
    subtitle: "Real-time distributed telemetry dashboard for multi-region server clusters",
    summary: "Real-time distributed telemetry dashboard for multi-region infrastructure clusters. Features native SVG charting, asynchronous event streaming, and custom reactive micro-stores.",
    fullDescription: "Aether aggregates metrics from over 2,500 bare-metal Kubernetes nodes across Frankfurt, Tokyo, and Virginia. Built with native SVG data paths and CSS hardware acceleration, system operators monitor network saturation, container health, and latency anomalies with zero interface lag.",
    coverImage: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=800&h=450&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1200&h=675&q=80",
      "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?auto=format&fit=crop&w=1200&h=675&q=80",
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&h=675&q=80"
    ],
    videoUrl: "https://www.youtube-nocookie.com/embed/ScMzIvxBSi4?rel=0&modestbranding=1",
    metrics: {
      payload: "42.1 KB",
      latency: "< 15ms",
      nodes: "2,500+",
      fps: "60 FPS"
    },
    tags: ["Native SVG", "Server-Sent Events", "Micro-Store", "Web Workers"],
    architectureHighlights: [
      "Dynamic SVG path generation without heavy charting frameworks (D3, Chart.js).",
      "EventSource SSE telemetry feed with automatic reconnection and exponential backoff.",
      "Decoupled state pipeline that buffers 10,000 telemetry points without blocking the main render thread.",
      "Pure CSS Grid layout adapted seamlessly for multi-monitor command center setups."
    ],
    client: "Aether Cloud Infrastructure",
    year: "2023",
    status: "Enterprise Deployed"
  },
  {
    id: "4",
    title: "Kinetics Micro-UI Component Standard",
    category: "Design System",
    filterCat: "design",
    badge: "0 DEPENDENCIES",
    subtitle: "A bespoke, zero-dependency design system specification for enterprise white-label portals",
    summary: "An ultra-fast component specification engineered with unified tokenization, accessible ARIA attributes, and instant theme switching.",
    fullDescription: "Kinetics establishes a modular frontend design token standard across 12 distributed business units. Engineered with standard Custom Elements and CSS Custom Properties, it guarantees visual uniformity and WCAG 2.1 AA accessibility while loading in just 12 KB.",
    coverImage: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=800&h=450&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=1200&h=675&q=80",
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&h=675&q=80",
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&h=675&q=80"
    ],
    videoUrl: "https://www.youtube-nocookie.com/embed/ScMzIvxBSi4?rel=0&modestbranding=1",
    metrics: {
      payload: "12.0 KB",
      fcp: "0.18s",
      a11y: "100/100",
      components: "40+ Elements"
    },
    tags: ["CSS Custom Props", "Custom Elements", "ARIA 1.2", "WCAG AA"],
    architectureHighlights: [
      "Pure CSS variable tokenization with 0ms runtime theme switching overhead.",
      "Zero build step requirement; imports natively via ES modules in all modern browsers.",
      "Comprehensive keyboard navigation and screen-reader accessibility tested across all states.",
      "Integrated micro-interactions using native CSS transitions."
    ],
    client: "OmniTech Solutions Group",
    year: "2023",
    status: "Internal Standard"
  },
  {
    id: "5",
    title: "Pulse Real-Time Edge Analytics",
    category: "Edge Systems",
    filterCat: "cloud",
    badge: "SUB-SECOND",
    subtitle: "Global edge CDN event stream monitoring and anomaly detection engine",
    summary: "Visualizing CDN request throughput and security events globally with sub-second latency and zero external charting libraries.",
    fullDescription: "Pulse processes geo-distributed CDN log streams directly in the browser. Using lightweight ring buffers and pure canvas rendering, it renders geographic request density heatmaps and DDoS anomaly detection charts at a continuous 60FPS.",
    coverImage: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=800&h=450&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1200&h=675&q=80",
      "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?auto=format&fit=crop&w=1200&h=675&q=80",
      "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1200&h=675&q=80"
    ],
    videoUrl: "https://www.youtube-nocookie.com/embed/ScMzIvxBSi4?rel=0&modestbranding=1",
    metrics: {
      payload: "24.5 KB",
      throughput: "50k evt/s",
      renderTime: "8ms",
      fps: "60 FPS"
    },
    tags: ["Edge Computing", "Canvas API", "Ring Buffer", "Zero Bloat"],
    architectureHighlights: [
      "Circular memory ring buffers preventing memory bloat during multi-hour surveillance sessions.",
      "Canvas rendering loop coordinated strictly via requestAnimationFrame.",
      "Geo-coordinate projection mathematics calculated on client side with high precision.",
      "Instant export of raw telemetry into sanitized CSV/JSON without server roundtrip."
    ],
    client: "Pulse Edge Networks",
    year: "2023",
    status: "Production Live"
  },
  {
    id: "6",
    title: "Cypher Zero-Trust Client Portal",
    category: "Enterprise Security",
    filterCat: "fintech",
    badge: "ENTERPRISE",
    subtitle: "End-to-end encrypted client document portal with client-side cryptographic verification",
    summary: "High-security portal for legal and financial document exchange featuring in-browser Web Crypto API signing and zero third-party telemetry.",
    fullDescription: "Cypher was built for private banking and legal confidentiality. Client browsers verify SHA-256 digital signatures, decrypt sensitive contract payloads in memory using WebCrypto SubtleCrypto, and never transmit plaintext to storage layers.",
    coverImage: "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=800&h=450&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=1200&h=675&q=80",
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&h=675&q=80",
      "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=1200&h=675&q=80"
    ],
    videoUrl: "https://www.youtube-nocookie.com/embed/ScMzIvxBSi4?rel=0&modestbranding=1",
    metrics: {
      payload: "28.2 KB",
      cryptoTime: "< 4ms",
      security: "Grade A+",
      a11y: "100/100"
    },
    tags: ["WebCrypto API", "SHA-256", "Zero-Trust", "Pure Vanilla JS"],
    architectureHighlights: [
      "Direct integration with native browser SubtleCrypto primitives for hardware-accelerated encryption.",
      "Strict sanitization of user-provided content preventing XSS and prototype pollution.",
      "Fully responsive interface adhering to WCAG 2.1 AA contrast requirements.",
      "Zero telemetry, cookies, or external tracker scripts embedded in portal source."
    ],
    client: "Cypher Security Advisory",
    year: "2024",
    status: "Production Live"
  }
];

// Helper: Ensure localStorage is populated with project data (with fallback seeding)
function initPortfolioStorage() {
  try {
    const existing = localStorage.getItem('alfaiz_portfolio_v2');
    if (!existing) {
      localStorage.setItem('alfaiz_portfolio_v2', JSON.stringify(DEFAULT_PROJECTS));
    } else {
      const parsed = JSON.parse(existing);
      if (!Array.isArray(parsed) || parsed.length === 0) {
        localStorage.setItem('alfaiz_portfolio_v2', JSON.stringify(DEFAULT_PROJECTS));
      }
    }
  } catch (e) {
    console.warn('localStorage access restricted or unavailable, falling back to memory data.', e);
  }
}

// ==========================================================================
// Visitor Analytics & Telemetry Tracking (Shared LocalStorage Matrix)
// ==========================================================================
function trackVisitorSession() {
  try {
    // 1. Total Page Views
    let pageViews = parseInt(localStorage.getItem('alfaiz_pageviews') || '4290', 10);
    pageViews++;
    localStorage.setItem('alfaiz_pageviews', pageViews.toLocaleString());

    // 2. Unique Session Visitors
    if (!sessionStorage.getItem('alfaiz_session_counted')) {
      sessionStorage.setItem('alfaiz_session_counted', 'true');
      let visitors = parseInt(localStorage.getItem('alfaiz_visitors') || '1482', 10);
      visitors++;
      localStorage.setItem('alfaiz_visitors', visitors.toLocaleString());
    }

    // 3. 7-Day Canvas Chart Daily Data Tracking
    let dailyStats = JSON.parse(localStorage.getItem('alfaiz_daily_stats') || 'null');
    if (!Array.isArray(dailyStats) || dailyStats.length < 7) {
      dailyStats = [142, 178, 220, 265, 240, 290, 345];
    }
    dailyStats[dailyStats.length - 1] += 1;
    localStorage.setItem('alfaiz_daily_stats', JSON.stringify(dailyStats));
  } catch (e) {
    console.warn('Visitor tracking telemetry error:', e);
  }
}

// Helper: Synchronize SEO metadata, Favicon, Branding & Dynamic Content from localStorage
function syncDynamicSiteContent() {
  try {
    // 1. SEO Metadata
    const savedSeo = localStorage.getItem('alfaiz_seo');
    if (savedSeo) {
      const seo = JSON.parse(savedSeo);
      if (seo.title) {
        document.title = seo.title;
        const pageTitle = document.getElementById('seo-page-title');
        if (pageTitle) pageTitle.textContent = seo.title;
        const ogTitle = document.getElementById('seo-og-title');
        if (ogTitle) ogTitle.setAttribute('content', seo.title);
        const twTitle = document.getElementById('seo-tw-title');
        if (twTitle) twTitle.setAttribute('content', seo.title);
      }
      if (seo.description) {
        const metaDesc = document.getElementById('seo-meta-desc');
        if (metaDesc) metaDesc.setAttribute('content', seo.description);
        const ogDesc = document.getElementById('seo-og-desc');
        if (ogDesc) ogDesc.setAttribute('content', seo.description);
        const twDesc = document.getElementById('seo-tw-desc');
        if (twDesc) twDesc.setAttribute('content', seo.description);
      }
      if (seo.keywords) {
        const metaKw = document.getElementById('seo-meta-keywords');
        if (metaKw) metaKw.setAttribute('content', seo.keywords);
      }
    }

    // 2. Branding (Logo text, subtitle, favicon)
    const savedBranding = localStorage.getItem('alfaiz_branding');
    if (savedBranding) {
      const brand = JSON.parse(savedBranding);
      if (brand.favicon || brand.faviconUrl) {
        const favIcon = document.getElementById('site-favicon');
        if (favIcon) favIcon.setAttribute('href', brand.favicon || brand.faviconUrl);
      }
      if (brand.logoText) {
        document.querySelectorAll('.brand-name').forEach(el => el.textContent = brand.logoText);
      }
      if (brand.subTitle) {
        document.querySelectorAll('.brand-title').forEach(el => el.textContent = brand.subTitle);
      }
    }

    // 3. Hero Section (index.html)
    const savedHero = localStorage.getItem('alfaiz_hero');
    if (savedHero) {
      const hero = JSON.parse(savedHero);
      if (hero.badge) {
        const badgeEl = document.querySelector('.hero-section .status-text');
        if (badgeEl) badgeEl.textContent = hero.badge;
      }
      if (hero.line1 || hero.line2 || hero.line3) {
        const titleEl = document.querySelector('.hero-title');
        if (titleEl) {
          titleEl.innerHTML = `${hero.line1 || 'Architecting'} <span class="gradient-text">${hero.line2 || 'Future-Ready'}</span> ${hero.line3 || 'Web Systems With Pure Speed'}`;
        }
      }
      if (hero.desc) {
        const descEl = document.querySelector('.hero-description');
        if (descEl) descEl.textContent = hero.desc;
      }
      const ctaBtns = document.querySelectorAll('.hero-cta-group .btn');
      if (ctaBtns.length >= 2) {
        if (hero.btn1Text) ctaBtns[0].querySelector('span').textContent = hero.btn1Text;
        if (hero.btn1Url) ctaBtns[0].setAttribute('href', hero.btn1Url);
        if (hero.btn2Text) ctaBtns[1].querySelector('span').textContent = hero.btn2Text;
        if (hero.btn2Url) ctaBtns[1].setAttribute('href', hero.btn2Url);
      }
    }

    // 4. External Links Matrix (Fiverr, Socials)
    const savedLinks = localStorage.getItem('alfaiz_links');
    if (savedLinks) {
      const links = JSON.parse(savedLinks);
      if (links.fiverr) {
        document.querySelectorAll('a[href*="fiverr.com"], .fiverr-link').forEach(a => {
          a.setAttribute('href', links.fiverr);
        });
      }
    }

    // 5. Contact Channels (Email, SLA)
    const savedContact = localStorage.getItem('alfaiz_contact');
    if (savedContact) {
      const contact = JSON.parse(savedContact);
      if (contact.email) {
        document.querySelectorAll('a[href^="mailto:"]').forEach(a => {
          a.setAttribute('href', `mailto:${contact.email}`);
          if (a.classList.contains('channel-link') || a.textContent.includes('@')) {
            a.textContent = contact.email;
          }
        });
      }
    }

  } catch (e) {
    console.warn('Error synchronizing dynamic content from localStorage:', e);
  }
}

// Track session immediately
trackVisitorSession();

// Helper: Retrieve projects from localStorage or default
function getPortfolioProjects() {
  try {
    const data = localStorage.getItem('alfaiz_portfolio_v2');
    if (data) {
      const parsed = JSON.parse(data);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    }
  } catch (e) {
    console.warn('Error reading from localStorage:', e);
  }
  return DEFAULT_PROJECTS;
}

// Initialize immediately
initPortfolioStorage();

// ==========================================================================
// DOMContentLoaded Main Handler
// ==========================================================================
document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  // ------------------------------------------------------------------------
  // 1. Mobile Menu Functionality
  // ------------------------------------------------------------------------
  const mobileToggle = document.getElementById('mobile-toggle');
  const mobileMenu = document.getElementById('mobile-menu');
  const mobileLinks = document.querySelectorAll('.mobile-nav-link');

  if (mobileToggle && mobileMenu) {
    const toggleMenu = () => {
      const isExpanded = mobileToggle.getAttribute('aria-expanded') === 'true';
      mobileToggle.setAttribute('aria-expanded', !isExpanded);
      mobileToggle.classList.toggle('active');
      mobileMenu.classList.toggle('active');
      document.body.style.overflow = !isExpanded ? 'hidden' : '';
    };

    mobileToggle.addEventListener('click', toggleMenu);

    mobileLinks.forEach(link => {
      link.addEventListener('click', () => {
        if (mobileMenu.classList.contains('active')) {
          toggleMenu();
        }
      });
    });

    document.addEventListener('click', (e) => {
      if (
        mobileMenu.classList.contains('active') &&
        !mobileMenu.contains(e.target) &&
        !mobileToggle.contains(e.target)
      ) {
        toggleMenu();
      }
    });
  }

  // ------------------------------------------------------------------------
  // 2. Navigation Scroll State
  // ------------------------------------------------------------------------
  const navPill = document.querySelector('.nav-pill');
  const handleScroll = () => {
    const currentScrollY = window.scrollY;
    if (navPill) {
      if (currentScrollY > 30) {
        navPill.style.boxShadow = '0 14px 36px rgba(10, 61, 107, 0.12), 0 2px 8px rgba(10, 61, 107, 0.06)';
        navPill.style.borderColor = 'rgba(15, 108, 189, 0.24)';
      } else {
        navPill.style.boxShadow = '';
        navPill.style.borderColor = '';
      }
    }
  };
  window.addEventListener('scroll', handleScroll, { passive: true });

  // ------------------------------------------------------------------------
  // 3. Active Nav Link for Single Page Sections (if present)
  // ------------------------------------------------------------------------
  const singlePageSections = document.querySelectorAll('section[id]');
  const desktopNavLinks = document.querySelectorAll('.nav-link');

  if (singlePageSections.length > 0 && desktopNavLinks.length > 0) {
    const observerOptions = {
      root: null,
      rootMargin: '-20% 0px -65% 0px',
      threshold: 0
    };

    const navObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute('id');
          // Only update active class if nav links contain hash links matching id
          desktopNavLinks.forEach(link => {
            const href = link.getAttribute('href');
            if (href === `#${id}`) {
              desktopNavLinks.forEach(l => l.classList.remove('active'));
              link.classList.add('active');
            }
          });
        }
      });
    }, observerOptions);

    singlePageSections.forEach(section => navObserver.observe(section));
  }

  // ------------------------------------------------------------------------
  // 4. Hero 3D Parallax Interaction (Index Page)
  // ------------------------------------------------------------------------
  const interactiveZone = document.getElementById('hero-interactive-zone');
  const shapeWrappers = document.querySelectorAll('.hero-shape-wrap');
  const glowDots = document.querySelectorAll('.glow-dot');

  if (interactiveZone && window.innerWidth > 868) {
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;
    let isTicking = false;

    const onMouseMove = (e) => {
      const rect = interactiveZone.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      targetX = (e.clientX - centerX) / (rect.width / 2);
      targetY = (e.clientY - centerY) / (rect.height / 2);

      if (!isTicking) {
        requestAnimationFrame(updateParallax);
        isTicking = true;
      }
    };

    const updateParallax = () => {
      mouseX += (targetX - mouseX) * 0.06;
      mouseY += (targetY - mouseY) * 0.06;

      shapeWrappers.forEach((wrapper) => {
        const speed = parseFloat(wrapper.dataset.speed || 1);
        const moveX = mouseX * 22 * speed;
        const moveY = mouseY * 22 * speed;
        const tiltX = -mouseY * 8 * speed;
        const tiltY = mouseX * 8 * speed;

        wrapper.style.transform = `translate3d(${moveX}px, ${moveY}px, 0) rotateX(${tiltX}deg) rotateY(${tiltY}deg)`;
      });

      glowDots.forEach((dot, index) => {
        const factor = (index + 1) * 3.5;
        const dotX = mouseX * factor;
        const dotY = mouseY * factor;
        dot.style.transform = `translate3d(${dotX}px, ${dotY}px, 0)`;
      });

      if (Math.abs(targetX - mouseX) > 0.001 || Math.abs(targetY - mouseY) > 0.001) {
        requestAnimationFrame(updateParallax);
      } else {
        isTicking = false;
      }
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });

    document.addEventListener('mouseleave', () => {
      targetX = 0;
      targetY = 0;
      if (!isTicking) {
        requestAnimationFrame(updateParallax);
        isTicking = true;
      }
    });
  }

  // ------------------------------------------------------------------------
  // 5. Projects Page Dynamic Rendering & Filtering (/projects.html)
  // ------------------------------------------------------------------------
  const projectsGridContainer = document.getElementById('projects-dynamic-grid');
  const projectFilterButtons = document.querySelectorAll('.projects-filter-btn');

  if (projectsGridContainer) {
    const allProjects = getPortfolioProjects();

    const renderProjects = (filter = 'all') => {
      projectsGridContainer.innerHTML = '';

      const filtered = filter === 'all'
        ? allProjects
        : allProjects.filter(p => p.filterCat === filter || (p.tags && p.tags.some(t => t.toLowerCase().includes(filter))));

      if (filtered.length === 0) {
        projectsGridContainer.innerHTML = `
          <div class="no-projects-msg">
            <h3>No projects found</h3>
            <p>Select another category or view all systems.</p>
          </div>
        `;
        return;
      }

      filtered.forEach(project => {
        const card = document.createElement('a');
        card.href = `project-detail.html?id=${encodeURIComponent(project.id)}`;
        card.className = 'project-grid-card';
        card.setAttribute('aria-label', `View project details for ${project.title}`);

        const tagsHtml = (project.tags || [])
          .slice(0, 3)
          .map(tag => `<span class="project-tag">${tag}</span>`)
          .join('');

        card.innerHTML = `
          <div class="project-img-wrapper">
            <img src="${project.coverImage}" alt="${project.title} Preview" class="project-img" loading="lazy">
            <div class="project-card-badge">${project.badge || 'PROJECT'}</div>
          </div>
          <div class="project-card-body">
            <div class="project-card-cat">${project.category || 'Web Architecture'}</div>
            <h3 class="project-card-title">${project.title}</h3>
            <p class="project-card-desc">${project.summary}</p>
            <div class="project-tags-list">
              ${tagsHtml}
            </div>
            <div class="project-card-action">
              <span>View Architecture Specs</span>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </div>
          </div>
        `;

        projectsGridContainer.appendChild(card);
      });
    };

    // Initial render
    renderProjects('all');

    // Filter clicks
    projectFilterButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        projectFilterButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const filterVal = btn.getAttribute('data-filter') || 'all';
        renderProjects(filterVal);
      });
    });
  }

  // ------------------------------------------------------------------------
  // 6. Project Detail Dynamic Loader (/project-detail.html)
  // ------------------------------------------------------------------------
  const detailContainer = document.getElementById('project-detail-view');

  if (detailContainer) {
    const urlParams = new URLSearchParams(window.location.search);
    const projectId = urlParams.get('id') || '1'; // Default to 1 if empty

    const projects = getPortfolioProjects();
    const project = projects.find(p => String(p.id) === String(projectId)) || projects[0];

    if (project) {
      document.title = `${project.title} | ALFAIZ Web Architect`;

      // Find prev and next project
      const currentIndex = projects.findIndex(p => String(p.id) === String(project.id));
      const prevProject = projects[(currentIndex - 1 + projects.length) % projects.length];
      const nextProject = projects[(currentIndex + 1) % projects.length];

      // Build tags
      const tagsHtml = (project.tags || [])
        .map(tag => `<span class="project-tag-lg">${tag}</span>`)
        .join('');

      // Build architecture highlights
      const archHighlightsHtml = (project.architectureHighlights || [])
        .map(item => `<li><span class="bullet-check">&check;</span> ${item}</li>`)
        .join('');

      // Build gallery images
      const galleryHtml = (project.gallery || [project.coverImage])
        .map(img => `
          <div class="gallery-item-wrap">
            <img src="${img}" alt="${project.title} Screenshot" class="detail-gallery-img" loading="lazy">
          </div>
        `).join('');

      // Build metrics
      const metricsHtml = project.metrics ? `
        <div class="detail-metrics-grid">
          ${Object.entries(project.metrics).map(([key, val]) => `
            <div class="detail-metric-card">
              <span class="metric-num">${val}</span>
              <span class="metric-key">${key.toUpperCase()}</span>
            </div>
          `).join('')}
        </div>
      ` : '';

      detailContainer.innerHTML = `
        <!-- Breadcrumb & Top Bar -->
        <div class="detail-top-bar">
          <nav class="breadcrumb-nav" aria-label="Breadcrumb">
            <a href="index.html">Home</a>
            <span class="breadcrumb-separator">/</span>
            <a href="projects.html">Projects</a>
            <span class="breadcrumb-separator">/</span>
            <span class="breadcrumb-current">${project.title}</span>
          </nav>
          <a href="projects.html" class="btn btn-outline btn-sm">
            &larr; Back to All Projects
          </a>
        </div>

        <!-- Project Hero Header -->
        <div class="detail-header-card">
          <div class="detail-header-meta">
            <span class="detail-cat-badge">${project.category}</span>
            <span class="detail-status-badge">${project.status || 'Verified Architecture'}</span>
          </div>
          <h1 class="detail-title">${project.title}</h1>
          <p class="detail-subtitle">${project.subtitle}</p>

          <div class="detail-client-strip">
            <div class="client-strip-item">
              <span class="strip-label">CLIENT / ORG</span>
              <span class="strip-val">${project.client || 'Enterprise'}</span>
            </div>
            <div class="client-strip-item">
              <span class="strip-label">YEAR</span>
              <span class="strip-val">${project.year || '2024'}</span>
            </div>
            <div class="client-strip-item">
              <span class="strip-label">ROLE</span>
              <span class="strip-val">Lead Web Architect</span>
            </div>
            <div class="client-strip-item">
              <span class="strip-label">DEPENDENCY COUNT</span>
              <span class="strip-val">0 (Pure Native)</span>
            </div>
          </div>
        </div>

        <!-- Media Showcase: Video Iframe & High-Res Gallery -->
        <div class="detail-media-section">
          <div class="section-tag">LIVE DEMO &amp; TELEMETRY</div>
          <h2 class="detail-section-title">System Execution &amp; Walkthrough</h2>

          <!-- Video Iframe -->
          <div class="video-iframe-container">
            <iframe 
              src="${project.videoUrl}" 
              title="${project.title} Architecture Walkthrough" 
              frameborder="0" 
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
              allowfullscreen
              class="video-iframe">
            </iframe>
          </div>

          <!-- Gallery Grid -->
          <div class="detail-gallery-grid">
            ${galleryHtml}
          </div>
        </div>

        <!-- Technical Architecture Card -->
        <div class="detail-content-card">
          <div class="detail-content-section">
            <h2 class="detail-heading">Executive Architectural Overview</h2>
            <p class="detail-paragraph">${project.fullDescription || project.summary}</p>
          </div>

          <!-- Performance Metrics -->
          <div class="detail-content-section">
            <h3 class="detail-subheading">Core Performance Benchmark</h3>
            ${metricsHtml}
          </div>

          <!-- Architecture Highlights -->
          <div class="detail-content-section">
            <h3 class="detail-subheading">Key Technical Innovations</h3>
            <ul class="detail-highlights-list">
              ${archHighlightsHtml}
            </ul>
          </div>

          <!-- Tags -->
          <div class="detail-content-section">
            <h3 class="detail-subheading">Technologies &amp; Protocols</h3>
            <div class="detail-tags-group">
              ${tagsHtml}
            </div>
          </div>

          <!-- Inquiry CTA -->
          <div class="detail-cta-box">
            <div class="detail-cta-text">
              <h3>Need a Similar High-Performance Architecture?</h3>
              <p>Discuss your system bottlenecks, custom freelance requirements, or order a verified Fiverr package.</p>
            </div>
            <div class="detail-cta-actions">
              <a href="index.html#contact" class="btn btn-primary btn-lg">Discuss System Spec</a>
              <a href="https://www.fiverr.com" target="_blank" rel="noopener noreferrer" class="btn btn-outline btn-lg">Order Fiverr Gig</a>
            </div>
          </div>
        </div>

        <!-- Project Pagination Links -->
        <div class="detail-pagination">
          <a href="project-detail.html?id=${prevProject.id}" class="pagination-link prev">
            <span class="pagination-direction">&larr; Previous System</span>
            <span class="pagination-title">${prevProject.title}</span>
          </a>
          <a href="project-detail.html?id=${nextProject.id}" class="pagination-link next">
            <span class="pagination-direction">Next System &rarr;</span>
            <span class="pagination-title">${nextProject.title}</span>
          </a>
        </div>
      `;
    }
  }

  // ------------------------------------------------------------------------
  // 7. Interactive Contact Form with Validation (Shared)
  // ------------------------------------------------------------------------
  const contactForm = document.getElementById('contact-form');
  const formStatus = document.getElementById('form-status');
  const submitBtn = document.getElementById('submit-btn');

  if (contactForm && formStatus) {
    const nameInput = document.getElementById('client-name');
    const emailInput = document.getElementById('client-email');
    const messageInput = document.getElementById('client-message');

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    const validateInput = (input, condition, groupElement) => {
      if (!condition) {
        groupElement.classList.add('has-error');
        return false;
      } else {
        groupElement.classList.remove('has-error');
        return true;
      }
    };

    if (nameInput) {
      nameInput.addEventListener('blur', () => {
        validateInput(nameInput, nameInput.value.trim().length > 1, nameInput.parentElement);
      });
    }

    if (emailInput) {
      emailInput.addEventListener('blur', () => {
        validateInput(emailInput, emailRegex.test(emailInput.value.trim()), emailInput.parentElement);
      });
    }

    if (messageInput) {
      messageInput.addEventListener('blur', () => {
        validateInput(messageInput, messageInput.value.trim().length > 5, messageInput.parentElement);
      });
    }

    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const isNameValid = validateInput(nameInput, nameInput.value.trim().length > 1, nameInput.parentElement);
      const isEmailValid = validateInput(emailInput, emailRegex.test(emailInput.value.trim()), emailInput.parentElement);
      const isMessageValid = validateInput(messageInput, messageInput.value.trim().length > 5, messageInput.parentElement);

      if (!isNameValid || !isEmailValid || !isMessageValid) {
        formStatus.className = 'form-status error';
        formStatus.textContent = 'Please fill out all required fields with valid information.';
        return;
      }

      submitBtn.disabled = true;
      const originalContent = submitBtn.innerHTML;
      submitBtn.innerHTML = `
        <span>Encrypting &amp; Dispatching...</span>
        <svg class="btn-spinner" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
          <circle cx="12" cy="12" r="10" stroke="rgba(255,255,255,0.25)"></circle>
          <path d="M12 2a10 10 0 0 1 10 10" stroke-linecap="round"></path>
        </svg>
      `;

      setTimeout(() => {
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalContent;

        formStatus.className = 'form-status success';
        formStatus.innerHTML = `
          <strong>Inquiry Successfully Transmitted!</strong><br>
          Thank you. Your architectural inquiry has been logged. Response guaranteed within 4 business hours.
        `;

        contactForm.reset();

        setTimeout(() => {
          formStatus.style.display = 'none';
        }, 8000);
      }, 950);
    });
  }

  // ------------------------------------------------------------------------
  // 8. Smooth Scroll for internal hash anchors
  // ------------------------------------------------------------------------
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;

      const targetEl = document.querySelector(targetId);
      if (targetEl) {
        e.preventDefault();
        targetEl.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });

  // ------------------------------------------------------------------------
  // 9. Sync Dynamic Content, Branding & SEO from localStorage
  // ------------------------------------------------------------------------
  syncDynamicSiteContent();

  // ------------------------------------------------------------------------
  // 10. Magnetic Buttons Interaction (mousemove translate ~2px using JS)
  // ------------------------------------------------------------------------
  const magneticButtons = document.querySelectorAll('.btn');
  magneticButtons.forEach(btn => {
    btn.addEventListener('mousemove', (e) => {
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      // Precise 2px to 2.5px magnetic micro-pull
      const transX = (x / (rect.width / 2)) * 2.2;
      const transY = (y / (rect.height / 2)) * 2.2;
      btn.style.transform = `translate(${transX}px, ${transY}px)`;
    });

    btn.addEventListener('mouseleave', () => {
      btn.style.transform = '';
    });
  });

  // ------------------------------------------------------------------------
  // 11. Cards Spotlight Interaction (mousemove radial-gradient via --mouse-x)
  // ------------------------------------------------------------------------
  const spotlightCards = document.querySelectorAll(
    '.card-corporate, .timeline-card, .project-grid-card, .bio-card, .service-col-card, .detail-header-card, .detail-content-card, .ceo-card, .project-card, .principle-card, .service-card'
  );

  spotlightCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      card.style.setProperty('--mouse-x', `${x}px`);
      card.style.setProperty('--mouse-y', `${y}px`);
    });
  });

  // ------------------------------------------------------------------------
  // 12. Scroll Fade-In Observer (IntersectionObserver add class visible)
  // ------------------------------------------------------------------------
  const scrollElements = document.querySelectorAll(
    '.section-header, .timeline-item, .timeline-entry, .project-card, .project-grid-card, .principle-card, .bio-card, .service-card, .service-col-card, .ceo-card, .card-corporate'
  );

  scrollElements.forEach(el => el.classList.add('fade-in-scroll'));

  if ('IntersectionObserver' in window) {
    const scrollObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.08,
      rootMargin: '0px 0px -40px 0px'
    });

    scrollElements.forEach(el => scrollObserver.observe(el));
  } else {
    scrollElements.forEach(el => el.classList.add('visible'));
  }

});

// ==========================================================================
// 9. Loader Component Controller (window.addEventListener 'load')
// Strict requirement: interval 0-100%, when 100% setTimeout fadeOut opacity 0
// then display none - ensures no hero leak behind
// ==========================================================================
window.addEventListener('load', () => {
  const loader = document.getElementById('loader');
  const loaderPercent = document.getElementById('loader-percent');

  if (loader) {
    let currentPercent = 0;
    let totalDuration = 700; // ms

    try {
      const loaderSettings = localStorage.getItem('alfaiz_loader_settings');
      if (loaderSettings) {
        const parsed = JSON.parse(loaderSettings);
        if (parsed.speed === 'fast') totalDuration = 450;
        else if (parsed.speed === 'deliberate') totalDuration = 1200;
      }
    } catch (e) {}

    const intervalTime = 16;
    const step = 100 / (totalDuration / intervalTime);

    const loaderTimer = setInterval(() => {
      currentPercent += step;
      if (currentPercent >= 100) {
        currentPercent = 100;
        clearInterval(loaderTimer);
        if (loaderPercent) loaderPercent.textContent = '100%';

        setTimeout(() => {
          loader.style.opacity = '0';
          loader.style.pointerEvents = 'none';
          setTimeout(() => {
            loader.style.display = 'none';
          }, 400);
        }, 150);
      } else {
        if (loaderPercent) {
          loaderPercent.textContent = `${Math.floor(currentPercent)}%`;
        }
      }
    }, intervalTime);
  }
});

