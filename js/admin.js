/**
 * ALFAIZ STUDIO | Administrative Console JavaScript Matrix
 * High-performance, zero-framework, clean white+blue corporate dashboard.
 * Zero login requirement - instant access to real-time localStorage sync.
 */

document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  // ==========================================================================
  // 1. Tab Switching & Mobile Sidebar Navigation
  // ==========================================================================
  const sidebarLinks = document.querySelectorAll('.sidebar-link');
  const tabPanels = document.querySelectorAll('.admin-tab-panel');
  const topbarTitle = document.getElementById('topbar-title');
  const mobileToggle = document.getElementById('mobile-sidebar-toggle');
  const sidebar = document.getElementById('admin-sidebar');

  const tabTitles = {
    'dashboard': 'Dashboard Overview',
    'branding': 'Branding & Favicon Configuration',
    'hero': 'Hero Section Management',
    'projects': 'Engineered Systems Portfolio (CRUD)',
    'experience': 'Career Experience & Milestones (CRUD)',
    'skills': 'Skills & Technical Matrix',
    'services': 'Consulting Services & Packages',
    'about': 'Architect Profile & Executive Bio',
    'contact': 'Contact Channels & Response SLAs',
    'links': 'External Links & Fiverr Integration',
    'seo': 'Search Engine Optimization & OpenGraph',
    'gig': 'Fiverr Gig Graphic Generator (1280x769)'
  };

  window.switchAdminTab = function(tabName) {
    sidebarLinks.forEach(link => {
      if (link.dataset.tab === tabName) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });

    tabPanels.forEach(panel => {
      if (panel.id === `tab-${tabName}`) {
        panel.classList.add('active');
      } else {
        panel.classList.remove('active');
      }
    });

    if (topbarTitle && tabTitles[tabName]) {
      topbarTitle.textContent = tabTitles[tabName];
    }

    if (sidebar) {
      sidebar.classList.remove('mobile-open');
    }

    // Trigger canvas redraw if gig tab opened
    if (tabName === 'gig') {
      setTimeout(renderGigCanvas, 100);
    } else if (tabName === 'dashboard') {
      setTimeout(renderVisitorChart, 100);
    }
  };

  sidebarLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const tab = link.dataset.tab;
      if (tab) switchAdminTab(tab);
    });
  });

  if (mobileToggle && sidebar) {
    mobileToggle.addEventListener('click', () => {
      sidebar.classList.toggle('mobile-open');
    });
  }

  // ==========================================================================
  // 2. Toast Feedback Notification
  // ==========================================================================
  const toast = document.getElementById('admin-toast');
  const toastMessage = document.getElementById('toast-message');
  let toastTimer = null;

  function showToast(msg, type = 'success') {
    if (!toast) return;
    if (toastTimer) clearTimeout(toastTimer);

    toastMessage.textContent = msg;
    toast.className = `admin-toast ${type} show`;

    toastTimer = setTimeout(() => {
      toast.classList.remove('show');
    }, 3200);
  }

  // ==========================================================================
  // 3. Activity Logger
  // ==========================================================================
  function logActivity(description) {
    try {
      const existing = JSON.parse(localStorage.getItem('alfaiz_activity_log') || '[]');
      const now = new Date();
      const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) + ' • ' + now.toLocaleDateString();

      existing.unshift({ desc: description, time: timeStr });
      if (existing.length > 25) existing.pop();

      localStorage.setItem('alfaiz_activity_log', JSON.stringify(existing));
      localStorage.setItem('alfaiz_last_updated', timeStr);

      renderActivityFeed();
      updateDashboardCards();
    } catch (e) {
      console.warn('Could not log activity:', e);
    }
  }

  function renderActivityFeed() {
    const listEl = document.getElementById('activity-feed-list');
    if (!listEl) return;

    let items = [];
    try {
      items = JSON.parse(localStorage.getItem('alfaiz_activity_log') || '[]');
    } catch (e) { items = []; }

    if (items.length === 0) {
      items = [
        { desc: 'Admin console initialized in clean white + blue mode', time: 'Just now' },
        { desc: 'Projects CRUD synchronized with localStorage (6 projects)', time: 'Today' },
        { desc: 'Core Web Vitals analytics tracking activated', time: 'Today' }
      ];
    }

    listEl.innerHTML = items.map(item => `
      <div class="activity-feed-item">
        <span class="activity-dot"></span>
        <div class="activity-text-wrap">
          <span class="activity-desc">${item.desc}</span>
          <span class="activity-meta">${item.time}</span>
        </div>
      </div>
    `).join('');
  }

  // ==========================================================================
  // 4. Drag & Drop File Upload Helper (Converts to Base64 Data URL)
  // ==========================================================================
  function setupDragDrop(zoneId, inputId, previewWrapId, previewImgId, previewNameId, removeBtnId, onDataReady) {
    const zone = document.getElementById(zoneId);
    const input = document.getElementById(inputId);
    const wrap = document.getElementById(previewWrapId);
    const img = document.getElementById(previewImgId);
    const nameEl = document.getElementById(previewNameId);
    const removeBtn = document.getElementById(removeBtnId);

    if (!zone || !input) return;

    function handleFile(file) {
      if (!file) return;

      const reader = new FileReader();
      reader.onload = (e) => {
        const dataUrl = e.target.result;
        if (img) img.src = dataUrl;
        if (nameEl) nameEl.textContent = file.name;
        if (wrap) wrap.classList.add('active');

        if (typeof onDataReady === 'function') {
          onDataReady(dataUrl, file.name);
        }
      };
      reader.readAsDataURL(file);
    }

    // Drag events
    ['dragenter', 'dragover'].forEach(eventName => {
      zone.addEventListener(eventName, (e) => {
        e.preventDefault();
        e.stopPropagation();
        zone.classList.add('dragover');
      });
    });

    ['dragleave', 'drop'].forEach(eventName => {
      zone.addEventListener(eventName, (e) => {
        e.preventDefault();
        e.stopPropagation();
        zone.classList.remove('dragover');
      });
    });

    zone.addEventListener('drop', (e) => {
      const dt = e.dataTransfer;
      const files = dt.files;
      if (files && files[0]) {
        handleFile(files[0]);
      }
    });

    input.addEventListener('change', () => {
      if (input.files && input.files[0]) {
        handleFile(input.files[0]);
      }
    });

    if (removeBtn) {
      removeBtn.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        input.value = '';
        if (img) img.src = '';
        if (wrap) wrap.classList.remove('active');
        if (typeof onDataReady === 'function') {
          onDataReady('', '');
        }
      });
    }
  }

  // ==========================================================================
  // 5. Dashboard Telemetry & 7-Day Canvas Chart
  // ==========================================================================
  function updateDashboardCards() {
    const vEl = document.getElementById('stat-total-visitors');
    const pEl = document.getElementById('stat-page-views');
    const cEl = document.getElementById('stat-project-count');
    const uEl = document.getElementById('stat-last-updated');
    const navCounter = document.getElementById('nav-project-counter');

    const visitors = localStorage.getItem('alfaiz_visitors') || '1,482';
    const pageviews = localStorage.getItem('alfaiz_pageviews') || '4,290';
    const lastUpdated = localStorage.getItem('alfaiz_last_updated') || 'Just now';

    let projCount = 6;
    try {
      const projs = JSON.parse(localStorage.getItem('alfaiz_portfolio_v2') || '[]');
      if (Array.isArray(projs)) projCount = projs.length;
    } catch (e) {}

    if (vEl) vEl.textContent = visitors;
    if (pEl) pEl.textContent = pageviews;
    if (cEl) cEl.textContent = projCount;
    if (navCounter) navCounter.textContent = projCount;
    if (uEl) uEl.textContent = lastUpdated;
  }

  function renderVisitorChart() {
    const canvas = document.getElementById('visitor-chart');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;

    // Daily stats or realistic default sequence
    let dailyData = [142, 178, 220, 265, 240, 290, 345];
    try {
      const savedStats = JSON.parse(localStorage.getItem('alfaiz_daily_stats') || 'null');
      if (Array.isArray(savedStats) && savedStats.length >= 7) {
        dailyData = savedStats.slice(-7);
      }
    } catch (e) {}

    // Day labels for past 7 days
    const dayNames = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

    // Clear canvas
    ctx.clearRect(0, 0, width, height);

    const padLeft = 45;
    const padRight = 20;
    const padTop = 25;
    const padBottom = 35;
    const chartW = width - padLeft - padRight;
    const chartH = height - padTop - padBottom;

    const maxVal = Math.max(...dailyData, 400);

    // 1. Draw horizontal grid lines & labels
    ctx.lineWidth = 1;
    ctx.strokeStyle = '#E2E8F0';
    ctx.font = '11px Plus Jakarta Sans, sans-serif';
    ctx.fillStyle = '#94A3B8';
    ctx.textAlign = 'right';

    const gridLines = 4;
    for (let i = 0; i <= gridLines; i++) {
      const yVal = Math.round((maxVal / gridLines) * i);
      const y = padTop + chartH - (i * (chartH / gridLines));

      ctx.beginPath();
      ctx.moveTo(padLeft, y);
      ctx.lineTo(width - padRight, y);
      ctx.stroke();

      ctx.fillText(yVal.toString(), padLeft - 8, y + 4);
    }

    // 2. Compute point coordinates
    const points = dailyData.map((val, idx) => {
      const x = padLeft + (idx * (chartW / (dailyData.length - 1)));
      const y = padTop + chartH - ((val / maxVal) * chartH);
      return { x, y, val };
    });

    // 3. Draw gradient filled area under the line
    const grad = ctx.createLinearGradient(0, padTop, 0, padTop + chartH);
    grad.addColorStop(0, 'rgba(15, 108, 189, 0.28)');
    grad.addColorStop(1, 'rgba(15, 108, 189, 0.01)');

    ctx.beginPath();
    ctx.moveTo(points[0].x, padTop + chartH);
    points.forEach(pt => ctx.lineTo(pt.x, pt.y));
    ctx.lineTo(points[points.length - 1].x, padTop + chartH);
    ctx.closePath();
    ctx.fillStyle = grad;
    ctx.fill();

    // 4. Draw smooth stroke curve
    ctx.beginPath();
    ctx.lineWidth = 3;
    ctx.strokeStyle = '#0F6CBD';
    ctx.lineJoin = 'round';
    ctx.lineCap = 'round';

    points.forEach((pt, idx) => {
      if (idx === 0) ctx.moveTo(pt.x, pt.y);
      else {
        const prev = points[idx - 1];
        const cx = (prev.x + pt.x) / 2;
        ctx.bezierCurveTo(cx, prev.y, cx, pt.y, pt.x, pt.y);
      }
    });
    ctx.stroke();

    // 5. Draw point dots and X-axis day labels
    ctx.textAlign = 'center';
    points.forEach((pt, idx) => {
      // Outer glow circle
      ctx.beginPath();
      ctx.arc(pt.x, pt.y, 5, 0, Math.PI * 2);
      ctx.fillStyle = '#FFFFFF';
      ctx.fill();
      ctx.lineWidth = 2.5;
      ctx.strokeStyle = '#0F6CBD';
      ctx.stroke();

      // Day label
      ctx.fillStyle = '#64748B';
      ctx.fillText(dayNames[idx % 7], pt.x, height - 12);
    });
  }

  const btnRefreshChart = document.getElementById('btn-refresh-chart');
  if (btnRefreshChart) {
    btnRefreshChart.addEventListener('click', () => {
      renderVisitorChart();
      showToast('Chart analytics re-indexed', 'info');
    });
  }

  // ==========================================================================
  // 6. Branding & Favicon Management
  // ==========================================================================
  let uploadedFavicon = '';
  let uploadedLogo = '';

  setupDragDrop(
    'favicon-drop-zone',
    'favicon-file-input',
    'favicon-preview-wrap',
    'favicon-preview-img',
    'favicon-preview-name',
    'btn-remove-favicon',
    (dataUrl, fileName) => {
      uploadedFavicon = dataUrl;
      const fav = document.getElementById('site-favicon');
      if (fav && dataUrl) fav.href = dataUrl;
    }
  );

  setupDragDrop(
    'logo-drop-zone',
    'logo-file-input',
    'logo-preview-wrap',
    'logo-preview-img',
    'logo-preview-name',
    'btn-remove-logo',
    (dataUrl) => {
      uploadedLogo = dataUrl;
    }
  );

  const brandForm = document.getElementById('branding-form');
  const brandLogoInput = document.getElementById('brand-logo-text');
  const brandSubInput = document.getElementById('brand-sub-title');
  const brandPrimaryInput = document.getElementById('brand-primary-color');
  const brandDarkInput = document.getElementById('brand-dark-color');

  // Live preview elements
  const prevBrandName = document.getElementById('prev-brand-name');
  const prevBrandRole = document.getElementById('prev-brand-role');

  if (brandLogoInput) {
    brandLogoInput.addEventListener('input', () => {
      if (prevBrandName) prevBrandName.textContent = brandLogoInput.value || 'ALFAIZ';
    });
  }

  if (brandSubInput) {
    brandSubInput.addEventListener('input', () => {
      if (prevBrandRole) prevBrandRole.textContent = brandSubInput.value || 'Web Architect';
    });
  }

  function loadBrandingData() {
    try {
      const data = JSON.parse(localStorage.getItem('alfaiz_branding') || '{}');
      if (data.logoText && brandLogoInput) brandLogoInput.value = data.logoText;
      if (data.subTitle && brandSubInput) brandSubInput.value = data.subTitle;
      if (data.primaryColor && brandPrimaryInput) brandPrimaryInput.value = data.primaryColor;
      if (data.darkColor && brandDarkInput) brandDarkInput.value = data.darkColor;

      if (data.favicon) {
        uploadedFavicon = data.favicon;
        const img = document.getElementById('favicon-preview-img');
        const wrap = document.getElementById('favicon-preview-wrap');
        if (img) img.src = data.favicon;
        if (wrap) wrap.classList.add('active');
        const fav = document.getElementById('site-favicon');
        if (fav) fav.href = data.favicon;
      }

      if (data.logoImage) {
        uploadedLogo = data.logoImage;
        const img = document.getElementById('logo-preview-img');
        const wrap = document.getElementById('logo-preview-wrap');
        if (img) img.src = data.logoImage;
        if (wrap) wrap.classList.add('active');
      }

      // Update preview
      if (prevBrandName) prevBrandName.textContent = data.logoText || 'ALFAIZ';
      if (prevBrandRole) prevBrandRole.textContent = data.subTitle || 'Web Architect';
    } catch (e) {}
  }

  if (brandForm) {
    brandForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const config = {
        logoText: brandLogoInput ? brandLogoInput.value.trim() : 'ALFAIZ',
        subTitle: brandSubInput ? brandSubInput.value.trim() : 'Web Architect',
        primaryColor: brandPrimaryInput ? brandPrimaryInput.value : '#0F6CBD',
        darkColor: brandDarkInput ? brandDarkInput.value : '#0A3D6B',
        favicon: uploadedFavicon || '',
        faviconUrl: uploadedFavicon || '',
        logoImage: uploadedLogo || ''
      };

      localStorage.setItem('alfaiz_branding', JSON.stringify(config));
      logActivity('Branding and favicon updated');
      showToast('Branding configuration saved successfully!');
    });
  }

  // ==========================================================================
  // 7. Hero Section Management & Live Preview
  // ==========================================================================
  const heroForm = document.getElementById('hero-form');
  const heroBadge = document.getElementById('hero-badge-input');
  const heroLine1 = document.getElementById('hero-line1');
  const heroLine2 = document.getElementById('hero-line2');
  const heroLine3 = document.getElementById('hero-line3');
  const heroDesc = document.getElementById('hero-desc-input');
  const heroBtn1Text = document.getElementById('hero-btn1-text');
  const heroBtn1Url = document.getElementById('hero-btn1-url');
  const heroBtn2Text = document.getElementById('hero-btn2-text');
  const heroBtn2Url = document.getElementById('hero-btn2-url');

  const prevHeroBadge = document.getElementById('prev-hero-badge');
  const prevHeroLine1 = document.getElementById('prev-hero-line1');
  const prevHeroLine2 = document.getElementById('prev-hero-line2');
  const prevHeroLine3 = document.getElementById('prev-hero-line3');
  const prevHeroDesc = document.getElementById('prev-hero-desc');
  const prevHeroBtn1 = document.getElementById('prev-hero-btn1');
  const prevHeroBtn2 = document.getElementById('prev-hero-btn2');

  function bindHeroLivePreview() {
    if (heroBadge && prevHeroBadge) {
      heroBadge.addEventListener('input', () => prevHeroBadge.textContent = heroBadge.value || 'Available for freelance projects');
    }
    if (heroLine1 && prevHeroLine1) {
      heroLine1.addEventListener('input', () => prevHeroLine1.textContent = heroLine1.value || 'Architecting');
    }
    if (heroLine2 && prevHeroLine2) {
      heroLine2.addEventListener('input', () => prevHeroLine2.textContent = heroLine2.value || 'Future-Ready');
    }
    if (heroLine3 && prevHeroLine3) {
      heroLine3.addEventListener('input', () => prevHeroLine3.textContent = heroLine3.value || 'Web Systems With Pure Speed');
    }
    if (heroDesc && prevHeroDesc) {
      heroDesc.addEventListener('input', () => prevHeroDesc.textContent = heroDesc.value || 'High-performance digital engineering...');
    }
    if (heroBtn1Text && prevHeroBtn1) {
      heroBtn1Text.addEventListener('input', () => prevHeroBtn1.textContent = heroBtn1Text.value || 'Explore Selected Works');
    }
    if (heroBtn2Text && prevHeroBtn2) {
      heroBtn2Text.addEventListener('input', () => prevHeroBtn2.textContent = heroBtn2Text.value || 'Order Fiverr Gig');
    }
  }

  function loadHeroData() {
    try {
      const data = JSON.parse(localStorage.getItem('alfaiz_hero') || '{}');
      if (heroBadge) heroBadge.value = data.badge || 'Available for freelance projects';
      if (heroLine1) heroLine1.value = data.line1 || 'Architecting';
      if (heroLine2) heroLine2.value = data.line2 || 'Future-Ready';
      if (heroLine3) heroLine3.value = data.line3 || 'Web Systems With Pure Speed';
      if (heroDesc) heroDesc.value = data.desc || 'High-performance digital engineering crafted without framework overhead. Delivering sub-second latency, rock-solid stability, and frictionless scalability.';
      if (heroBtn1Text) heroBtn1Text.value = data.btn1Text || 'Explore Selected Works';
      if (heroBtn1Url) heroBtn1Url.value = data.btn1Url || 'projects.html';
      if (heroBtn2Text) heroBtn2Text.value = data.btn2Text || 'Order Fiverr Gig';
      if (heroBtn2Url) heroBtn2Url.value = data.btn2Url || 'https://www.fiverr.com';

      // Update preview
      if (prevHeroBadge) prevHeroBadge.textContent = heroBadge.value;
      if (prevHeroLine1) prevHeroLine1.textContent = heroLine1.value;
      if (prevHeroLine2) prevHeroLine2.textContent = heroLine2.value;
      if (prevHeroLine3) prevHeroLine3.textContent = heroLine3.value;
      if (prevHeroDesc) prevHeroDesc.textContent = heroDesc.value;
      if (prevHeroBtn1) prevHeroBtn1.textContent = heroBtn1Text.value;
      if (prevHeroBtn2) prevHeroBtn2.textContent = heroBtn2Text.value;
    } catch (e) {}
  }

  if (heroForm) {
    heroForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const config = {
        badge: heroBadge.value.trim(),
        line1: heroLine1.value.trim(),
        line2: heroLine2.value.trim(),
        line3: heroLine3.value.trim(),
        desc: heroDesc.value.trim(),
        btn1Text: heroBtn1Text.value.trim(),
        btn1Url: heroBtn1Url.value.trim(),
        btn2Text: heroBtn2Text.value.trim(),
        btn2Url: heroBtn2Url.value.trim()
      };

      localStorage.setItem('alfaiz_hero', JSON.stringify(config));
      logActivity('Hero section content modified');
      showToast('Hero section saved successfully!');
    });
  }

  // ==========================================================================
  // 8. Projects CRUD Matrix (With Drag & Drop Image)
  // ==========================================================================
  const DEFAULT_PROJECTS = [
    {
      id: "1",
      title: "Apex Pulse • Ultra-Low Latency Telemetry Engine",
      category: "Fintech / Telemetry",
      client: "Global Financial Infrastructure • 2024",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80",
      videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
      description: "High-frequency algorithmic monitoring platform rendering 60,000 live updates per second with hardware-accelerated canvas visualizers and zero DOM churn.",
      tags: ["Vanilla JS", "Canvas 60FPS", "WebSocket", "Zero-Framework"]
    },
    {
      id: "2",
      title: "Vanguard • Zero-Runtime Enterprise System",
      category: "Enterprise UI Architecture",
      client: "Enterprise SaaS • 2023",
      image: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=800&q=80",
      videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
      description: "Enterprise design token library and modular component ecosystem written entirely in CSS Custom Properties and semantic web components with 0 KB JavaScript runtime cost.",
      tags: ["CSS Architecture", "Web Components", "0 KB JS", "Shadow DOM"]
    },
    {
      id: "3",
      title: "Chronos • Sub-200ms Instant Checkout Portal",
      category: "E-Commerce Systems",
      client: "High-Volume Retail • 2023",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80",
      videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
      description: "High-conversion e-commerce storefront engineered with precomputed state machines, speculative link prefetching, and sub-200ms checkout transitions.",
      tags: ["Speculative Prefetch", "State Machines", "Edge Cache", "Core Web Vitals"]
    },
    {
      id: "4",
      title: "Aether Stream • Audio Processing WebAssembly Synth",
      category: "WebAudio / AudioDSP",
      client: "Creative Studio • 2024",
      image: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=800&q=80",
      videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
      description: "In-browser multi-track synthesizer running native C++ DSP via WebAssembly audio worklets with sub-5ms roundtrip latency and hardware acceleration.",
      tags: ["WebAudio API", "Wasm DSP", "Canvas FFT", "AudioWorklet"]
    },
    {
      id: "5",
      title: "Helios • Decentralized Storage Telemetry Visualizer",
      category: "Infrastructure Analytics",
      client: "Cloud Storage Network • 2022",
      image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=800&q=80",
      videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
      description: "Live node cluster visualization managing 10,000 active nodes with memory-safe ring buffers, spatial indexing, and zero layout thrashing.",
      tags: ["Spatial Indexing", "Binary Protocol", "Ring Buffers", "Memory-Safe"]
    },
    {
      id: "6",
      title: "Nexus Gate • Micro-Frontend Router & Orchestrator",
      category: "Frontend Infrastructure",
      client: "Fintech Platform • 2024",
      image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=800&q=80",
      videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
      description: "Ultra-lean micro-frontend orchestration kernel (2.4 KB) replacing heavy framework monorepos with native ES Module dynamic imports and isolated shadow DOM.",
      tags: ["Micro-Frontends", "ES Modules", "Shadow DOM", "Micro-Kernel"]
    }
  ];

  let projectsData = [];
  let modalUploadedImage = '';

  setupDragDrop(
    'proj-img-drop-zone',
    'proj-file-input',
    'proj-preview-wrap',
    'proj-preview-img',
    'proj-preview-name',
    'btn-remove-proj-img',
    (dataUrl) => {
      modalUploadedImage = dataUrl;
      const urlInput = document.getElementById('proj-input-image');
      if (urlInput) urlInput.value = dataUrl;
    }
  );

  function loadProjectsData() {
    try {
      const stored = localStorage.getItem('alfaiz_portfolio_v2');
      if (stored) {
        projectsData = JSON.parse(stored);
      } else {
        projectsData = [...DEFAULT_PROJECTS];
        localStorage.setItem('alfaiz_portfolio_v2', JSON.stringify(projectsData));
      }
    } catch (e) {
      projectsData = [...DEFAULT_PROJECTS];
    }
    renderProjectsTable();
    updateDashboardCards();
  }

  function renderProjectsTable() {
    const tbody = document.getElementById('projects-crud-tbody');
    if (!tbody) return;

    if (projectsData.length === 0) {
      tbody.innerHTML = `<tr><td colspan="5" style="text-align: center; padding: 32px; color: #64748B;">No projects registered. Click "Add New Project" to create one.</td></tr>`;
      return;
    }

    tbody.innerHTML = projectsData.map((p, idx) => `
      <tr>
        <td>
          <img src="${p.image || 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80'}" alt="${p.title}" class="table-thumb">
        </td>
        <td>
          <div style="font-weight: 700; color: #0F172A;">${p.title}</div>
          <div style="font-size: 0.75rem; color: #0F6CBD;">${p.category || 'Architecture'}</div>
        </td>
        <td>
          <div style="display: flex; gap: 4px; flex-wrap: wrap;">
            ${(p.tags || []).slice(0, 3).map(t => `<span style="background: #EDF5FE; color: #0F6CBD; font-size: 0.7rem; font-weight: 700; padding: 2px 6px; border-radius: 4px;">${t}</span>`).join('')}
          </div>
        </td>
        <td>
          <span style="font-size: 0.75rem; color: ${p.videoUrl ? '#10B981' : '#94A3B8'}; font-weight: 700;">
            ${p.videoUrl ? '✓ Video Linked' : 'No Video'}
          </span>
        </td>
        <td style="text-align: right;">
          <div class="table-actions" style="justify-content: flex-end;">
            <button type="button" class="action-icon-btn btn-edit-proj" data-index="${idx}" title="Edit Project">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
              </svg>
            </button>
            <button type="button" class="action-icon-btn btn-delete btn-delete-proj" data-index="${idx}" title="Delete Project">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polyline points="3 6 5 6 21 6"></polyline>
                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
              </svg>
            </button>
          </div>
        </td>
      </tr>
    `).join('');

    // Attach row events
    tbody.querySelectorAll('.btn-edit-proj').forEach(btn => {
      btn.addEventListener('click', () => openProjectModal(parseInt(btn.dataset.index, 10)));
    });

    tbody.querySelectorAll('.btn-delete-proj').forEach(btn => {
      btn.addEventListener('click', () => deleteProject(parseInt(btn.dataset.index, 10)));
    });
  }

  const projModal = document.getElementById('modal-project');
  const projModalTitle = document.getElementById('project-modal-title');
  const btnOpenAddProject = document.getElementById('btn-open-add-project');
  const btnCloseProjModal = document.getElementById('btn-close-project-modal');
  const btnCancelProj = document.getElementById('btn-cancel-project');
  const btnSaveProj = document.getElementById('btn-save-project');

  const pIdInput = document.getElementById('project-edit-id');
  const pTitleInput = document.getElementById('proj-input-title');
  const pCatInput = document.getElementById('proj-input-category');
  const pClientInput = document.getElementById('proj-input-client');
  const pImgUrlInput = document.getElementById('proj-input-image');
  const pVideoInput = document.getElementById('proj-input-video');
  const pDescInput = document.getElementById('proj-input-desc');
  const pTagsInput = document.getElementById('proj-input-tags');

  function openProjectModal(index = -1) {
    modalUploadedImage = '';
    const imgPreview = document.getElementById('proj-preview-img');
    const wrapPreview = document.getElementById('proj-preview-wrap');
    if (wrapPreview) wrapPreview.classList.remove('active');

    if (index >= 0 && projectsData[index]) {
      const p = projectsData[index];
      projModalTitle.textContent = 'Edit Project';
      pIdInput.value = index.toString();
      pTitleInput.value = p.title || '';
      pCatInput.value = p.category || '';
      pClientInput.value = p.client || '';
      pImgUrlInput.value = p.image || '';
      pVideoInput.value = p.videoUrl || '';
      pDescInput.value = p.description || '';
      pTagsInput.value = (p.tags || []).join(', ');

      if (p.image) {
        if (imgPreview) imgPreview.src = p.image;
        if (wrapPreview) wrapPreview.classList.add('active');
        modalUploadedImage = p.image;
      }
    } else {
      projModalTitle.textContent = 'Add New Project';
      pIdInput.value = '-1';
      pTitleInput.value = '';
      pCatInput.value = 'Web Architecture';
      pClientInput.value = 'Enterprise Client • 2024';
      pImgUrlInput.value = '';
      pVideoInput.value = '';
      pDescInput.value = '';
      pTagsInput.value = 'Vanilla JS, CSS3, Performance';
    }

    if (projModal) projModal.classList.add('active');
  }

  function closeProjectModal() {
    if (projModal) projModal.classList.remove('active');
  }

  if (btnOpenAddProject) btnOpenAddProject.addEventListener('click', () => openProjectModal(-1));
  if (btnCloseProjModal) btnCloseProjModal.addEventListener('click', closeProjectModal);
  if (btnCancelProj) btnCancelProj.addEventListener('click', closeProjectModal);

  if (btnSaveProj) {
    btnSaveProj.addEventListener('click', () => {
      const title = pTitleInput.value.trim();
      if (!title) {
        alert('Please enter a project title');
        return;
      }

      const tagsArray = pTagsInput.value.split(',').map(s => s.trim()).filter(Boolean);
      const imgVal = modalUploadedImage || pImgUrlInput.value.trim() || 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80';

      const projectObj = {
        id: (Date.now()).toString(),
        title: title,
        category: pCatInput.value.trim() || 'Web Architecture',
        client: pClientInput.value.trim(),
        image: imgVal,
        videoUrl: pVideoInput.value.trim(),
        description: pDescInput.value.trim(),
        tags: tagsArray.length > 0 ? tagsArray : ['Vanilla JS', 'High Performance']
      };

      const idx = parseInt(pIdInput.value, 10);
      if (idx >= 0 && projectsData[idx]) {
        projectObj.id = projectsData[idx].id;
        projectsData[idx] = projectObj;
        logActivity(`Project '${title}' modified`);
        showToast('Project updated successfully!');
      } else {
        projectsData.unshift(projectObj);
        logActivity(`New project '${title}' added`);
        showToast('New project created successfully!');
      }

      localStorage.setItem('alfaiz_portfolio_v2', JSON.stringify(projectsData));
      renderProjectsTable();
      closeProjectModal();
    });
  }

  function deleteProject(idx) {
    if (projectsData[idx]) {
      const title = projectsData[idx].title;
      if (confirm(`Delete project "${title}"?`)) {
        projectsData.splice(idx, 1);
        localStorage.setItem('alfaiz_portfolio_v2', JSON.stringify(projectsData));
        logActivity(`Project '${title}' removed`);
        showToast('Project deleted successfully!');
        renderProjectsTable();
      }
    }
  }

  // ==========================================================================
  // 9. Experience CRUD Matrix
  // ==========================================================================
  const DEFAULT_EXPERIENCE = [
    {
      id: "exp-1",
      role: "Principal Web Architect",
      company: "Enterprise Distributed Systems",
      period: "2023 - PRESENT",
      location: "Remote / Global Enterprise",
      summary: "Directing frontend architectural strategy for high-scale enterprise platforms. Led comprehensive migration initiatives eliminating bloated legacy framework monoliths in favor of ultra-lean vanilla micro-frontends.",
      tags: ["Vanilla JS", "Micro-frontends", "Web Workers", "Edge Computing"]
    },
    {
      id: "exp-2",
      role: "Senior Performance Engineer",
      company: "Fintech Real-Time Infrastructure",
      period: "2021 - 2023",
      location: "New York / Hybrid",
      summary: "Architected high-throughput financial telemetry dashboards rendering live WebSocket ticks at sustained 60FPS using native HTML5 Canvas visualizers and strict garbage collection policies.",
      tags: ["Canvas API", "WebSocket", "Memory Profiling", "Zero GC Pause"]
    },
    {
      id: "exp-3",
      role: "Frontend Systems Architect",
      company: "Hyper-Growth SaaS Infrastructure",
      period: "2019 - 2021",
      location: "San Francisco / Remote",
      summary: "Spearheaded design token distribution and headless component engines serving 40M+ monthly pageviews with zero runtime CSS dependencies and sub-200ms TTFB globally.",
      tags: ["Design Tokens", "CSS Custom Properties", "Web Components", "Core Web Vitals"]
    }
  ];

  let experienceData = [];

  function loadExperienceData() {
    try {
      const stored = localStorage.getItem('alfaiz_experience');
      if (stored) {
        experienceData = JSON.parse(stored);
      } else {
        experienceData = [...DEFAULT_EXPERIENCE];
        localStorage.setItem('alfaiz_experience', JSON.stringify(experienceData));
      }
    } catch (e) {
      experienceData = [...DEFAULT_EXPERIENCE];
    }
    renderExperienceTable();
  }

  function renderExperienceTable() {
    const tbody = document.getElementById('experience-crud-tbody');
    if (!tbody) return;

    if (experienceData.length === 0) {
      tbody.innerHTML = `<tr><td colspan="5" style="text-align: center; padding: 32px; color: #64748B;">No positions registered. Click "Add New Job Position" to create one.</td></tr>`;
      return;
    }

    tbody.innerHTML = experienceData.map((e, idx) => `
      <tr>
        <td>
          <div style="font-weight: 700; color: #0F172A;">${e.role}</div>
          <div style="font-size: 0.75rem; color: #0F6CBD;">${e.company}</div>
        </td>
        <td><span style="font-size: 0.78rem; font-weight: 700;">${e.period}</span></td>
        <td><span style="font-size: 0.78rem; color: #64748B;">${e.location || 'Remote'}</span></td>
        <td><div style="font-size: 0.78rem; max-width: 280px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">${e.summary}</div></td>
        <td style="text-align: right;">
          <div class="table-actions" style="justify-content: flex-end;">
            <button type="button" class="action-icon-btn btn-edit-exp" data-index="${idx}" title="Edit Position">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
              </svg>
            </button>
            <button type="button" class="action-icon-btn btn-delete btn-delete-exp" data-index="${idx}" title="Delete Position">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polyline points="3 6 5 6 21 6"></polyline>
                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
              </svg>
            </button>
          </div>
        </td>
      </tr>
    `).join('');

    tbody.querySelectorAll('.btn-edit-exp').forEach(btn => {
      btn.addEventListener('click', () => openExpModal(parseInt(btn.dataset.index, 10)));
    });

    tbody.querySelectorAll('.btn-delete-exp').forEach(btn => {
      btn.addEventListener('click', () => deleteExperience(parseInt(btn.dataset.index, 10)));
    });
  }

  const expModal = document.getElementById('modal-experience');
  const expModalTitle = document.getElementById('exp-modal-title');
  const btnOpenAddExp = document.getElementById('btn-open-add-experience');
  const btnCloseExpModal = document.getElementById('btn-close-exp-modal');
  const btnCancelExp = document.getElementById('btn-cancel-exp');
  const btnSaveExp = document.getElementById('btn-save-exp');

  const expIdInput = document.getElementById('exp-edit-id');
  const expRoleInput = document.getElementById('exp-input-role');
  const expCompInput = document.getElementById('exp-input-company');
  const expPeriodInput = document.getElementById('exp-input-period');
  const expLocInput = document.getElementById('exp-input-location');
  const expSummInput = document.getElementById('exp-input-summary');
  const expTagsInput = document.getElementById('exp-input-tags');

  function openExpModal(index = -1) {
    if (index >= 0 && experienceData[index]) {
      const e = experienceData[index];
      expModalTitle.textContent = 'Edit Job Position';
      expIdInput.value = index.toString();
      expRoleInput.value = e.role || '';
      expCompInput.value = e.company || '';
      expPeriodInput.value = e.period || '';
      expLocInput.value = e.location || '';
      expSummInput.value = e.summary || '';
      expTagsInput.value = (e.tags || []).join(', ');
    } else {
      expModalTitle.textContent = 'Add Job Position';
      expIdInput.value = '-1';
      expRoleInput.value = '';
      expCompInput.value = '';
      expPeriodInput.value = '2024 - PRESENT';
      expLocInput.value = 'Remote';
      expSummInput.value = '';
      expTagsInput.value = 'Vanilla JS, Performance, Web Architecture';
    }

    if (expModal) expModal.classList.add('active');
  }

  function closeExpModal() {
    if (expModal) expModal.classList.remove('active');
  }

  if (btnOpenAddExp) btnOpenAddExp.addEventListener('click', () => openExpModal(-1));
  if (btnCloseExpModal) btnCloseExpModal.addEventListener('click', closeExpModal);
  if (btnCancelExp) btnCancelExp.addEventListener('click', closeExpModal);

  if (btnSaveExp) {
    btnSaveExp.addEventListener('click', () => {
      const role = expRoleInput.value.trim();
      const comp = expCompInput.value.trim();
      if (!role || !comp) {
        alert('Please fill out the Role and Company fields');
        return;
      }

      const tagsArray = expTagsInput.value.split(',').map(s => s.trim()).filter(Boolean);
      const expObj = {
        id: 'exp-' + Date.now(),
        role: role,
        company: comp,
        period: expPeriodInput.value.trim() || '2024 - PRESENT',
        location: expLocInput.value.trim() || 'Remote',
        summary: expSummInput.value.trim(),
        tags: tagsArray
      };

      const idx = parseInt(expIdInput.value, 10);
      if (idx >= 0 && experienceData[idx]) {
        experienceData[idx] = expObj;
        logActivity(`Experience '${role}' at ${comp} updated`);
        showToast('Experience position updated successfully!');
      } else {
        experienceData.unshift(expObj);
        logActivity(`New position '${role}' at ${comp} added`);
        showToast('New position added to experience timeline!');
      }

      localStorage.setItem('alfaiz_experience', JSON.stringify(experienceData));
      renderExperienceTable();
      closeExpModal();
    });
  }

  function deleteExperience(idx) {
    if (experienceData[idx]) {
      const role = experienceData[idx].role;
      if (confirm(`Delete position "${role}"?`)) {
        experienceData.splice(idx, 1);
        localStorage.setItem('alfaiz_experience', JSON.stringify(experienceData));
        logActivity(`Position '${role}' deleted`);
        showToast('Position removed from experience timeline!');
        renderExperienceTable();
      }
    }
  }

  // ==========================================================================
  // 10. Skills Matrix & Services CRUD
  // ==========================================================================
  const DEFAULT_SKILLS = [
    { category: "Architectural Engineering", items: ["Vanilla JavaScript", "Micro-Frontends", "Web Workers", "Edge Computing", "Shadow DOM"] },
    { category: "Performance & Profiling", items: ["Core Web Vitals 95+", "Lighthouse 100", "Memory Profiling", "Critical Render Path"] },
    { category: "Graphics & Real-Time", items: ["HTML5 Canvas 60FPS", "WebAudio DSP", "WebSocket & SSE", "CSS3 3D Surfaces"] }
  ];

  let skillsData = [];

  function loadSkillsData() {
    try {
      const stored = localStorage.getItem('alfaiz_skills');
      if (stored) skillsData = JSON.parse(stored);
      else skillsData = [...DEFAULT_SKILLS];
    } catch (e) { skillsData = [...DEFAULT_SKILLS]; }
    renderSkillsTable();
  }

  function renderSkillsTable() {
    const tbody = document.getElementById('skills-crud-tbody');
    if (!tbody) return;

    tbody.innerHTML = skillsData.map((s, idx) => `
      <tr>
        <td style="font-weight: 700; color: #0F172A;">${s.category}</td>
        <td>
          <div style="display: flex; gap: 4px; flex-wrap: wrap;">
            ${(s.items || []).map(i => `<span style="background: #F1F5F9; color: #0F172A; font-size: 0.72rem; padding: 2px 8px; border-radius: 4px; border: 1px solid #DBEAFE;">${i}</span>`).join('')}
          </div>
        </td>
        <td style="text-align: right;">
          <button type="button" class="action-icon-btn btn-delete" onclick="deleteSkill(${idx})" title="Delete Category">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <polyline points="3 6 5 6 21 6"></polyline>
              <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
            </svg>
          </button>
        </td>
      </tr>
    `).join('');
  }

  window.deleteSkill = function(idx) {
    if (confirm('Delete this skill category?')) {
      skillsData.splice(idx, 1);
      localStorage.setItem('alfaiz_skills', JSON.stringify(skillsData));
      renderSkillsTable();
      showToast('Skill category deleted');
    }
  };

  const btnOpenAddSkill = document.getElementById('btn-open-add-skill');
  if (btnOpenAddSkill) {
    btnOpenAddSkill.addEventListener('click', () => {
      const cat = prompt('Enter Skill Category Name (e.g. "DevOps & Cloud"):');
      if (!cat) return;
      const itemsStr = prompt('Enter Skills (comma-separated):', 'Docker, CI/CD, Edge Networks');
      const items = (itemsStr || '').split(',').map(s => s.trim()).filter(Boolean);
      skillsData.push({ category: cat, items });
      localStorage.setItem('alfaiz_skills', JSON.stringify(skillsData));
      renderSkillsTable();
      logActivity(`Skill category '${cat}' added`);
      showToast('New skill category added!');
    });
  }

  // Services
  const DEFAULT_SERVICES = [
    { title: "Enterprise Web Architecture & Blueprinting", desc: "End-to-end frontend blueprinting and decoupling monolithic frontends into high-speed modular micro-frontends.", deliverables: "System Topology, Component Standards, Codebase Health Audit" },
    { title: "High-Performance Vanilla JS Engineering", desc: "Bespoke web applications and client portals built entirely in native HTML5, modern CSS, and vanilla JS.", deliverables: "Zero Framework Vulnerabilities, Custom 3D Glass, Full Source Code" },
    { title: "Core Web Vitals Auditing & Optimization", desc: "Exhaustive profiling of memory leaks, layout thrashing, and asset bloat to achieve perfect 95+ Lighthouse scores.", deliverables: "Deep Profiler Trace, Critical Render Path, 95+ Guarantee" }
  ];

  let servicesData = [];

  function loadServicesData() {
    try {
      const stored = localStorage.getItem('alfaiz_services');
      if (stored) servicesData = JSON.parse(stored);
      else servicesData = [...DEFAULT_SERVICES];
    } catch (e) { servicesData = [...DEFAULT_SERVICES]; }
    renderServicesTable();
  }

  function renderServicesTable() {
    const tbody = document.getElementById('services-crud-tbody');
    if (!tbody) return;

    tbody.innerHTML = servicesData.map((s, idx) => `
      <tr>
        <td style="font-weight: 700; color: #0F172A;">${s.title}</td>
        <td><div style="font-size: 0.78rem; max-width: 260px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">${s.desc}</div></td>
        <td><span style="font-size: 0.75rem; color: #0F6CBD;">${s.deliverables}</span></td>
        <td style="text-align: right;">
          <button type="button" class="action-icon-btn btn-delete" onclick="deleteService(${idx})" title="Delete Service">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <polyline points="3 6 5 6 21 6"></polyline>
              <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
            </svg>
          </button>
        </td>
      </tr>
    `).join('');
  }

  window.deleteService = function(idx) {
    if (confirm('Delete this service package?')) {
      servicesData.splice(idx, 1);
      localStorage.setItem('alfaiz_services', JSON.stringify(servicesData));
      renderServicesTable();
      showToast('Service package deleted');
    }
  };

  const btnOpenAddService = document.getElementById('btn-open-add-service');
  if (btnOpenAddService) {
    btnOpenAddService.addEventListener('click', () => {
      const title = prompt('Enter Service Title:');
      if (!title) return;
      const desc = prompt('Enter Brief Description:');
      const deliverables = prompt('Enter Deliverables Summary:');
      servicesData.push({ title, desc: desc || '', deliverables: deliverables || '' });
      localStorage.setItem('alfaiz_services', JSON.stringify(servicesData));
      renderServicesTable();
      logActivity(`Service package '${title}' added`);
      showToast('New service package registered!');
    });
  }

  // ==========================================================================
  // 11. About Architect & Avatar Photo Drag & Drop
  // ==========================================================================
  let uploadedArchitectPhoto = '';

  setupDragDrop(
    'architect-drop-zone',
    'architect-file-input',
    'architect-preview-wrap',
    'architect-preview-img',
    'architect-preview-name',
    'btn-remove-architect-photo',
    (dataUrl) => {
      uploadedArchitectPhoto = dataUrl;
      const photoWrap = document.getElementById('prev-about-photo-wrap');
      if (photoWrap && dataUrl) {
        photoWrap.innerHTML = `<img src="${dataUrl}" style="width: 100%; height: 100%; object-fit: cover;">`;
      }
    }
  );

  const aboutForm = document.getElementById('about-form');
  const aboutName = document.getElementById('about-name');
  const aboutRole = document.getElementById('about-role');
  const aboutBio = document.getElementById('about-bio');
  const statCompleted = document.getElementById('stat-completed');
  const statRating = document.getElementById('stat-rating');
  const statRender = document.getElementById('stat-render');
  const statSla = document.getElementById('stat-sla');

  // Preview elements
  const prevAboutName = document.getElementById('prev-about-name');
  const prevAboutRole = document.getElementById('prev-about-role');
  const prevAboutBio = document.getElementById('prev-about-bio');
  const prevStatComp = document.getElementById('prev-stat-completed');
  const prevStatRate = document.getElementById('prev-stat-rating');

  function bindAboutLivePreview() {
    if (aboutName && prevAboutName) {
      aboutName.addEventListener('input', () => prevAboutName.textContent = aboutName.value || 'ALFAIZ');
    }
    if (aboutRole && prevAboutRole) {
      aboutRole.addEventListener('input', () => prevAboutRole.textContent = aboutRole.value || 'Principal Web Architect');
    }
    if (aboutBio && prevAboutBio) {
      aboutBio.addEventListener('input', () => prevAboutBio.textContent = aboutBio.value || 'Over 8+ years specializing...');
    }
    if (statCompleted && prevStatComp) {
      statCompleted.addEventListener('input', () => prevStatComp.textContent = statCompleted.value || '50+');
    }
    if (statRating && prevStatRate) {
      statRating.addEventListener('input', () => prevStatRate.textContent = statRating.value || '100%');
    }
  }

  function loadAboutData() {
    try {
      const data = JSON.parse(localStorage.getItem('alfaiz_about') || '{}');
      if (aboutName) aboutName.value = data.name || 'ALFAIZ';
      if (aboutRole) aboutRole.value = data.role || 'Principal Web Architect & Performance Systems Engineer';
      if (aboutBio) aboutBio.value = data.bio || 'Over 8+ years specializing in high-concurrency client-side applications, performance auditing, and framework-free enterprise portals.';
      if (statCompleted) statCompleted.value = data.completed || '50+';
      if (statRating) statRating.value = data.rating || '100% 5-Star';
      if (statRender) statRender.value = data.renderTime || '< 0.3s';
      if (statSla) statSla.value = data.sla || '4 Hours';

      if (data.photo) {
        uploadedArchitectPhoto = data.photo;
        const img = document.getElementById('architect-preview-img');
        const wrap = document.getElementById('architect-preview-wrap');
        if (img) img.src = data.photo;
        if (wrap) wrap.classList.add('active');
        const photoWrap = document.getElementById('prev-about-photo-wrap');
        if (photoWrap) photoWrap.innerHTML = `<img src="${data.photo}" style="width: 100%; height: 100%; object-fit: cover;">`;
      }

      // Update preview
      if (prevAboutName) prevAboutName.textContent = aboutName.value;
      if (prevAboutRole) prevAboutRole.textContent = aboutRole.value;
      if (prevAboutBio) prevAboutBio.textContent = aboutBio.value;
      if (prevStatComp) prevStatComp.textContent = statCompleted.value;
      if (prevStatRate) prevStatRate.textContent = statRating.value;
    } catch (e) {}
  }

  if (aboutForm) {
    aboutForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const config = {
        name: aboutName.value.trim(),
        role: aboutRole.value.trim(),
        bio: aboutBio.value.trim(),
        completed: statCompleted.value.trim(),
        rating: statRating.value.trim(),
        renderTime: statRender.value.trim(),
        sla: statSla.value.trim(),
        photo: uploadedArchitectPhoto || ''
      };

      localStorage.setItem('alfaiz_about', JSON.stringify(config));
      logActivity('Architect about profile and stats updated');
      showToast('About profile saved successfully!');
    });
  }

  // ==========================================================================
  // 12. Contact Channels & SLA Settings
  // ==========================================================================
  const contactForm = document.getElementById('contact-channels-form');
  const contactEmail = document.getElementById('contact-email');
  const contactSla = document.getElementById('contact-response-window');
  const contactFiverr = document.getElementById('contact-fiverr-channel');

  function loadContactData() {
    try {
      const data = JSON.parse(localStorage.getItem('alfaiz_contact') || '{}');
      if (contactEmail) contactEmail.value = data.email || 'contact@alfaiz-architect.com';
      if (contactSla) contactSla.value = data.sla || 'Within 4 business hours';
      if (contactFiverr) contactFiverr.value = data.fiverrUrl || 'https://www.fiverr.com';
    } catch (e) {}
  }

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const config = {
        email: contactEmail.value.trim(),
        sla: contactSla.value.trim(),
        fiverrUrl: contactFiverr.value.trim()
      };
      localStorage.setItem('alfaiz_contact', JSON.stringify(config));
      logActivity('Contact channels and response SLAs updated');
      showToast('Contact channels saved successfully!');
    });
  }

  // ==========================================================================
  // 13. External Links Matrix (Fiverr, GitHub, LinkedIn, Twitter)
  // ==========================================================================
  const linksForm = document.getElementById('external-links-form');
  const extFiverr = document.getElementById('ext-fiverr-url');
  const extGithub = document.getElementById('ext-github-url');
  const extLinkedin = document.getElementById('ext-linkedin-url');
  const extTwitter = document.getElementById('ext-twitter-url');

  function loadLinksData() {
    try {
      const data = JSON.parse(localStorage.getItem('alfaiz_links') || '{}');
      if (extFiverr) extFiverr.value = data.fiverr || 'https://www.fiverr.com';
      if (extGithub) extGithub.value = data.github || 'https://github.com';
      if (extLinkedin) extLinkedin.value = data.linkedin || 'https://linkedin.com';
      if (extTwitter) extTwitter.value = data.twitter || 'https://x.com';
    } catch (e) {}
  }

  if (linksForm) {
    linksForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const config = {
        fiverr: extFiverr.value.trim() || 'https://www.fiverr.com',
        github: extGithub.value.trim() || 'https://github.com',
        linkedin: extLinkedin.value.trim() || 'https://linkedin.com',
        twitter: extTwitter.value.trim() || 'https://x.com'
      };
      localStorage.setItem('alfaiz_links', JSON.stringify(config));
      logActivity('External links and Fiverr gig URL updated');
      showToast('External links matrix saved successfully!');
    });
  }

  // ==========================================================================
  // 14. SEO & OG Image Drag & Drop
  // ==========================================================================
  let uploadedOgImage = '';

  setupDragDrop(
    'og-drop-zone',
    'og-file-input',
    'og-preview-wrap',
    'og-preview-img',
    'og-preview-name',
    'btn-remove-og',
    (dataUrl) => {
      uploadedOgImage = dataUrl;
    }
  );

  const seoForm = document.getElementById('seo-form');
  const seoTitle = document.getElementById('seo-title-input');
  const seoDesc = document.getElementById('seo-desc-input');
  const seoKw = document.getElementById('seo-keywords-input');

  const prevSeoTitle = document.getElementById('prev-seo-title');
  const prevSeoDesc = document.getElementById('prev-seo-desc');

  if (seoTitle) {
    seoTitle.addEventListener('input', () => {
      if (prevSeoTitle) prevSeoTitle.textContent = seoTitle.value || 'ALFAIZ | Web Architect';
    });
  }

  if (seoDesc) {
    seoDesc.addEventListener('input', () => {
      if (prevSeoDesc) prevSeoDesc.textContent = seoDesc.value || 'High-performance digital engineering...';
    });
  }

  function loadSeoData() {
    try {
      const data = JSON.parse(localStorage.getItem('alfaiz_seo') || '{}');
      if (seoTitle) seoTitle.value = data.title || 'ALFAIZ | Web Architect - High Performance Web Systems';
      if (seoDesc) seoDesc.value = data.description || 'High-performance digital engineering crafted without framework overhead. Sub-second latency, rock-solid architectural stability, and frictionless scalability.';
      if (seoKw) seoKw.value = data.keywords || 'Web Architect, Vanilla JS, Performance Engineering, Core Web Vitals';

      if (data.ogImage) {
        uploadedOgImage = data.ogImage;
        const img = document.getElementById('og-preview-img');
        const wrap = document.getElementById('og-preview-wrap');
        if (img) img.src = data.ogImage;
        if (wrap) wrap.classList.add('active');
      }

      if (prevSeoTitle) prevSeoTitle.textContent = seoTitle.value;
      if (prevSeoDesc) prevSeoDesc.textContent = seoDesc.value;
    } catch (e) {}
  }

  if (seoForm) {
    seoForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const config = {
        title: seoTitle.value.trim(),
        description: seoDesc.value.trim(),
        keywords: seoKw.value.trim(),
        ogImage: uploadedOgImage || ''
      };

      localStorage.setItem('alfaiz_seo', JSON.stringify(config));
      logActivity('SEO and OpenGraph metadata updated');
      showToast('SEO configuration saved successfully!');
    });
  }

  // ==========================================================================
  // 15. Fiverr Gig Image Generator (1280x769 Canvas)
  // ==========================================================================
  function renderGigCanvas() {
    const canvas = document.getElementById('gig-canvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const w = 1280;
    const h = 769;

    const badge = document.getElementById('gig-badge-text')?.value || 'EXPERT WEB ARCHITECT';
    const title = document.getElementById('gig-title-text')?.value || 'FUTURE-READY WEB SYSTEMS';
    const subtitle = document.getElementById('gig-subtitle-text')?.value || 'ZERO FRAMEWORK BLOAT • SUB-SECOND SPEED';
    const pill1 = document.getElementById('gig-pill1')?.value || '100% Vanilla JS & CSS3';
    const pill2 = document.getElementById('gig-pill2')?.value || 'Lighthouse 95+ Guaranteed';

    // 1. Solid White Base with subtle clean corporate gradients
    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect(0, 0, w, h);

    // Subtle blue corner ambient glow
    const ambientGrad = ctx.createRadialGradient(1000, 200, 50, 1000, 200, 600);
    ambientGrad.addColorStop(0, 'rgba(15, 108, 189, 0.08)');
    ambientGrad.addColorStop(1, 'rgba(255, 255, 255, 0)');
    ctx.fillStyle = ambientGrad;
    ctx.fillRect(0, 0, w, h);

    // Subtle blue accent border
    ctx.lineWidth = 14;
    ctx.strokeStyle = '#0F6CBD';
    ctx.strokeRect(7, 7, w - 14, h - 14);

    // Hexagon Logo in corner
    ctx.save();
    ctx.translate(110, 130);
    ctx.beginPath();
    const hexRadius = 45;
    for (let i = 0; i < 6; i++) {
      const angle = (i * Math.PI) / 3;
      const x = hexRadius * Math.cos(angle);
      const y = hexRadius * Math.sin(angle);
      if (i === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.closePath();
    ctx.fillStyle = '#0F6CBD';
    ctx.fill();

    ctx.fillStyle = '#FFFFFF';
    ctx.font = '800 48px Space Grotesk, sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('A', 0, 4);
    ctx.restore();

    // Brand Name next to hexagon
    ctx.textAlign = 'left';
    ctx.fillStyle = '#0F172A';
    ctx.font = '800 36px Plus Jakarta Sans, sans-serif';
    ctx.fillText('ALFAIZ', 180, 126);
    ctx.fillStyle = '#0F6CBD';
    ctx.font = '700 24px Plus Jakarta Sans, sans-serif';
    ctx.fillText('WEB ARCHITECT', 180, 156);

    // Badge Pill
    ctx.save();
    ctx.translate(110, 240);
    ctx.fillStyle = '#EDF5FE';
    ctx.strokeStyle = '#DBEAFE';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.roundRect(0, 0, 360, 44, 22);
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = '#0F6CBD';
    ctx.font = '800 15px Plus Jakarta Sans, sans-serif';
    ctx.fillText(`⚡ ${badge}`, 22, 28);
    ctx.restore();

    // Primary Title
    ctx.fillStyle = '#0F172A';
    ctx.font = '800 58px Plus Jakarta Sans, sans-serif';
    ctx.fillText(title, 110, 360);

    // Subtitle
    ctx.fillStyle = '#0F6CBD';
    ctx.font = '800 28px Space Grotesk, sans-serif';
    ctx.fillText(subtitle, 110, 420);

    // Feature Badges
    const drawBadgePill = (text, x, y) => {
      ctx.save();
      ctx.fillStyle = '#FFFFFF';
      ctx.strokeStyle = '#DBEAFE';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.roundRect(x, y, 380, 56, 14);
      ctx.fill();
      ctx.stroke();

      ctx.fillStyle = '#10B981';
      ctx.font = '800 20px sans-serif';
      ctx.fillText('✓', x + 20, y + 36);

      ctx.fillStyle = '#0F172A';
      ctx.font = '700 19px Plus Jakarta Sans, sans-serif';
      ctx.fillText(text, x + 50, y + 35);
      ctx.restore();
    };

    drawBadgePill(pill1, 110, 480);
    drawBadgePill(pill2, 110, 555);

    // Rating & Guarantee badge on bottom right
    ctx.save();
    ctx.fillStyle = '#F8FAFC';
    ctx.strokeStyle = '#DBEAFE';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.roundRect(840, 480, 340, 160, 16);
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = '#F59E0B';
    ctx.font = '800 24px sans-serif';
    ctx.fillText('★ ★ ★ ★ ★', 870, 525);

    ctx.fillStyle = '#0F172A';
    ctx.font = '800 22px Plus Jakarta Sans, sans-serif';
    ctx.fillText('100% 5-Star Delivery', 870, 565);

    ctx.fillStyle = '#64748B';
    ctx.font = '600 15px Plus Jakarta Sans, sans-serif';
    ctx.fillText('Verified Escrow Guarantee', 870, 600);
    ctx.restore();
  }

  const btnRedrawGig = document.getElementById('btn-redraw-gig');
  if (btnRedrawGig) btnRedrawGig.addEventListener('click', renderGigCanvas);

  const btnDownloadGig = document.getElementById('btn-download-gig');
  if (btnDownloadGig) {
    btnDownloadGig.addEventListener('click', () => {
      const canvas = document.getElementById('gig-canvas');
      if (!canvas) return;
      const link = document.createElement('a');
      link.download = 'fiverr-gig-alfaiz-1280x769.png';
      link.href = canvas.toDataURL('image/png');
      link.click();
      showToast('Gig thumbnail PNG downloaded!');
    });
  }

  // ==========================================================================
  // 16. Reset Sample Data Helper
  // ==========================================================================
  const btnSeedDefaults = document.getElementById('btn-seed-defaults');
  if (btnSeedDefaults) {
    btnSeedDefaults.addEventListener('click', () => {
      if (confirm('Reset portfolio sample data to default 6 projects and settings?')) {
        localStorage.setItem('alfaiz_portfolio_v2', JSON.stringify(DEFAULT_PROJECTS));
        localStorage.setItem('alfaiz_experience', JSON.stringify(DEFAULT_EXPERIENCE));
        localStorage.setItem('alfaiz_skills', JSON.stringify(DEFAULT_SKILLS));
        localStorage.setItem('alfaiz_services', JSON.stringify(DEFAULT_SERVICES));
        logActivity('Portfolio data restored to defaults');
        showToast('Sample data reset successfully!');
        loadProjectsData();
        loadExperienceData();
        loadSkillsData();
        loadServicesData();
      }
    });
  }

  // ==========================================================================
  // 17. Initialization Sequence
  // ==========================================================================
  bindHeroLivePreview();
  bindAboutLivePreview();

  loadBrandingData();
  loadHeroData();
  loadProjectsData();
  loadExperienceData();
  loadSkillsData();
  loadServicesData();
  loadAboutData();
  loadContactData();
  loadLinksData();
  loadSeoData();

  renderActivityFeed();
  updateDashboardCards();
  renderVisitorChart();
  renderGigCanvas();
});
