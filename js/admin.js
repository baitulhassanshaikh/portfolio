/**
 * ALFAIZ | Administrative Console System (js/admin.js)
 * Manages Branding, Hero, Projects CRUD, Fiverr Gig Canvas Generator (1280x769),
 * Loader Settings, and SEO configuration in localStorage.
 */

document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  // ==========================================================================
  // 1. Authentication Protection Check
  // ==========================================================================
  if (localStorage.getItem('adminLogged') !== 'true') {
    window.location.href = 'login.html';
    return;
  }

  // Logout Handler
  const logoutBtn = document.getElementById('sidebar-logout-btn');
  if (logoutBtn) {
    logoutBtn.addEventListener('click', () => {
      if (confirm('Terminate Administrative Session?')) {
        localStorage.removeItem('adminLogged');
        window.location.href = 'login.html';
      }
    });
  }

  // Toast System
  const toast = document.getElementById('admin-toast');
  const toastMsg = document.getElementById('toast-message');
  let toastTimer = null;

  function showToast(message, isSuccess = true) {
    if (!toast) return;
    if (toastTimer) clearTimeout(toastTimer);

    toastMsg.textContent = message;
    toast.style.borderColor = isSuccess ? '#10B981' : '#EF4444';
    toast.classList.add('active');

    toastTimer = setTimeout(() => {
      toast.classList.remove('active');
    }, 3200);
  }

  // ==========================================================================
  // 2. Sidebar Tab Navigation
  // ==========================================================================
  const sidebarLinks = document.querySelectorAll('.sidebar-link[data-tab]');
  const contentPanes = document.querySelectorAll('.admin-tab-pane');
  const topbarTitle = document.getElementById('topbar-tab-title');

  sidebarLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const tabTarget = link.getAttribute('data-tab');

      sidebarLinks.forEach(l => l.classList.remove('active'));
      link.classList.add('active');

      contentPanes.forEach(pane => {
        pane.style.display = (pane.id === `tab-${tabTarget}`) ? 'block' : 'none';
      });

      if (topbarTitle) {
        topbarTitle.textContent = link.textContent.trim();
      }

      // If switching to Gig generator, redraw canvas
      if (tabTarget === 'gig') {
        renderGigCanvas();
      }
    });
  });

  // Mobile sidebar toggle
  const sidebarToggle = document.getElementById('admin-sidebar-toggle');
  const adminSidebar = document.querySelector('.admin-sidebar');
  if (sidebarToggle && adminSidebar) {
    sidebarToggle.addEventListener('click', () => {
      adminSidebar.classList.toggle('open');
    });
  }

  // ==========================================================================
  // 3. Branding Section Management ('alfaiz_branding')
  // ==========================================================================
  const brandingForm = document.getElementById('branding-form');
  const brandLogoInput = document.getElementById('brand-logo-text');
  const brandFaviconInput = document.getElementById('brand-favicon-url');
  const brandPrimaryColor = document.getElementById('brand-color-primary');
  const brandDarkColor = document.getElementById('brand-color-dark');
  const brandAccentColor = document.getElementById('brand-color-accent');

  function loadBrandingSettings() {
    const saved = localStorage.getItem('alfaiz_branding');
    const data = saved ? JSON.parse(saved) : {
      logoText: 'ALFAIZ | Web Architect',
      faviconUrl: 'favicon.ico',
      primaryColor: '#0F6CBD',
      darkColor: '#0A3D6B',
      accentColor: '#38BDF8'
    };

    if (brandLogoInput) brandLogoInput.value = data.logoText || 'ALFAIZ | Web Architect';
    if (brandFaviconInput) brandFaviconInput.value = data.faviconUrl || 'favicon.ico';
    if (brandPrimaryColor) brandPrimaryColor.value = data.primaryColor || '#0F6CBD';
    if (brandDarkColor) brandDarkColor.value = data.darkColor || '#0A3D6B';
    if (brandAccentColor) brandAccentColor.value = data.accentColor || '#38BDF8';
  }

  if (brandingForm) {
    brandingForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const data = {
        logoText: brandLogoInput.value.trim(),
        faviconUrl: brandFaviconInput.value.trim(),
        primaryColor: brandPrimaryColor.value,
        darkColor: brandDarkColor.value,
        accentColor: brandAccentColor.value,
        updatedAt: new Date().toISOString()
      };
      localStorage.setItem('alfaiz_branding', JSON.stringify(data));
      showToast('Branding settings saved successfully!');
    });
  }

  // ==========================================================================
  // 4. Hero Section Management ('alfaiz_hero')
  // ==========================================================================
  const heroForm = document.getElementById('hero-form');
  const heroBadgeInput = document.getElementById('hero-badge-input');
  const heroHeading1Input = document.getElementById('hero-h1-part1');
  const heroHeading2Input = document.getElementById('hero-h1-gradient');
  const heroHeading3Input = document.getElementById('hero-h1-part3');
  const heroDescInput = document.getElementById('hero-desc-input');
  const heroBtn1Input = document.getElementById('hero-btn1-input');
  const heroBtn2Input = document.getElementById('hero-btn2-input');

  function loadHeroSettings() {
    const saved = localStorage.getItem('alfaiz_hero');
    const data = saved ? JSON.parse(saved) : {
      badge: 'Available for freelance projects',
      heading1: 'Architecting',
      headingGradient: 'Future-Ready',
      heading3: 'Web Systems With Pure Speed',
      description: 'High-performance digital engineering crafted without framework overhead. Delivering sub-second latency, rock-solid architectural stability, and frictionless enterprise scalability directly aligned with your business milestones.',
      btn1Text: 'Explore Selected Works',
      btn2Text: 'Order Fiverr Gig'
    };

    if (heroBadgeInput) heroBadgeInput.value = data.badge;
    if (heroHeading1Input) heroHeading1Input.value = data.heading1;
    if (heroHeading2Input) heroHeading2Input.value = data.headingGradient;
    if (heroHeading3Input) heroHeading3Input.value = data.heading3;
    if (heroDescInput) heroDescInput.value = data.description;
    if (heroBtn1Input) heroBtn1Input.value = data.btn1Text;
    if (heroBtn2Input) heroBtn2Input.value = data.btn2Text;
  }

  if (heroForm) {
    heroForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const data = {
        badge: heroBadgeInput.value.trim(),
        heading1: heroHeading1Input.value.trim(),
        headingGradient: heroHeading2Input.value.trim(),
        heading3: heroHeading3Input.value.trim(),
        description: heroDescInput.value.trim(),
        btn1Text: heroBtn1Input.value.trim(),
        btn2Text: heroBtn2Input.value.trim(),
        updatedAt: new Date().toISOString()
      };
      localStorage.setItem('alfaiz_hero', JSON.stringify(data));
      showToast('Hero matrix settings saved successfully!');
    });
  }

  // ==========================================================================
  // 5. Projects CRUD Management ('alfaiz_portfolio_v2')
  // ==========================================================================
  const projectForm = document.getElementById('project-form');
  const projectIdField = document.getElementById('project-id-field');
  const projectTitleInput = document.getElementById('project-title-input');
  const projectCatInput = document.getElementById('project-cat-input');
  const projectBadgeInput = document.getElementById('project-badge-input');
  const projectImgInput = document.getElementById('project-img-input');
  const projectVideoInput = document.getElementById('project-video-input');
  const projectDescInput = document.getElementById('project-desc-input');
  const projectTagsInput = document.getElementById('project-tags-input');
  const projectSubmitBtn = document.getElementById('project-submit-btn');
  const projectCancelBtn = document.getElementById('project-cancel-btn');
  const projectsTableBody = document.getElementById('projects-table-body');
  const resetProjectsBtn = document.getElementById('reset-projects-btn');

  function getProjectsList() {
    try {
      const data = localStorage.getItem('alfaiz_portfolio_v2');
      if (data) {
        const parsed = JSON.parse(data);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch (e) {
      console.warn('Error reading projects', e);
    }
    // Fallback if empty
    return [
      {
        id: "1",
        title: "Nexus Global Financial Engine",
        category: "Fintech Core",
        filterCat: "fintech",
        badge: "99/100 SPEED",
        summary: "An ultra-low latency liquidity engine and currency terminal handling real-time WebSocket feeds with 60FPS fluid canvas visualizations.",
        coverImage: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&h=450&q=80",
        videoUrl: "https://www.youtube-nocookie.com/embed/ScMzIvxBSi4?rel=0&modestbranding=1",
        tags: ["Pure Vanilla JS", "WebSocket", "Canvas 2D", "Binary Buffers"]
      },
      {
        id: "2",
        title: "Veloce Headless Commerce Core",
        category: "E-Commerce Architecture",
        filterCat: "ecommerce",
        badge: "100/100 SPEED",
        summary: "Custom-built shopping engine designed for high-concurrency flash sales. Replaced a sluggish 3.2MB legacy storefront with a modular 35KB vanilla engine.",
        coverImage: "https://images.unsplash.com/photo-1472851294608-062f824d29cc?auto=format&fit=crop&w=800&h=450&q=80",
        videoUrl: "https://www.youtube-nocookie.com/embed/ScMzIvxBSi4?rel=0&modestbranding=1",
        tags: ["HTML5 Template", "IndexedDB", "Vanilla Router", "Edge Caching"]
      },
      {
        id: "3",
        title: "Aether Multi-Cloud Observability",
        category: "Cloud Systems",
        filterCat: "cloud",
        badge: "ENTERPRISE SCALE",
        summary: "Real-time distributed telemetry dashboard for multi-region clusters. Features native SVG charting, asynchronous event streaming, and custom reactive micro-stores.",
        coverImage: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=800&h=450&q=80",
        videoUrl: "https://www.youtube-nocookie.com/embed/ScMzIvxBSi4?rel=0&modestbranding=1",
        tags: ["Native SVG", "Server-Sent Events", "Micro-Store", "Web Workers"]
      }
    ];
  }

  function saveProjectsList(projects) {
    localStorage.setItem('alfaiz_portfolio_v2', JSON.stringify(projects));
  }

  function renderProjectsTable() {
    if (!projectsTableBody) return;
    const projects = getProjectsList();
    projectsTableBody.innerHTML = '';

    if (projects.length === 0) {
      projectsTableBody.innerHTML = `
        <tr>
          <td colspan="6" style="text-align: center; color: var(--admin-text-dim); padding: 30px;">
            No projects in database. Add your first system deployment above.
          </td>
        </tr>
      `;
      return;
    }

    projects.forEach(project => {
      const row = document.createElement('tr');
      const tagsBadges = (project.tags || []).slice(0, 2).map(t => `<span class="table-badge">${t}</span>`).join(' ');

      row.innerHTML = `
        <td>
          <img src="${project.coverImage || 'https://via.placeholder.com/80x50'}" alt="${project.title}" class="table-thumb" onerror="this.src='https://via.placeholder.com/80x50'">
        </td>
        <td>
          <strong>${project.title}</strong>
          <div style="font-size: 0.76rem; color: var(--admin-text-dim);">ID: ${project.id}</div>
        </td>
        <td><span class="table-badge">${project.category || 'Architecture'}</span></td>
        <td>${tagsBadges}</td>
        <td><span style="color: #10B981; font-weight: 700; font-size: 0.78rem;">${project.badge || 'ACTIVE'}</span></td>
        <td>
          <div class="table-actions">
            <button class="admin-btn admin-btn-secondary" style="padding: 5px 12px; font-size: 0.78rem;" onclick="editProject('${project.id}')">
              Edit
            </button>
            <button class="admin-btn admin-btn-danger" style="padding: 5px 12px; font-size: 0.78rem;" onclick="deleteProject('${project.id}')">
              Delete
            </button>
          </div>
        </td>
      `;
      projectsTableBody.appendChild(row);
    });
  }

  // Global delete & edit hooks
  window.deleteProject = function(id) {
    if (confirm(`Confirm permanent deletion of Project ID #${id}?`)) {
      let projects = getProjectsList();
      projects = projects.filter(p => String(p.id) !== String(id));
      saveProjectsList(projects);
      renderProjectsTable();
      showToast(`Project #${id} removed successfully.`);
    }
  };

  window.editProject = function(id) {
    const projects = getProjectsList();
    const project = projects.find(p => String(p.id) === String(id));
    if (!project) return;

    if (projectIdField) projectIdField.value = project.id;
    if (projectTitleInput) projectTitleInput.value = project.title || '';
    if (projectCatInput) projectCatInput.value = project.category || '';
    if (projectBadgeInput) projectBadgeInput.value = project.badge || '';
    if (projectImgInput) projectImgInput.value = project.coverImage || '';
    if (projectVideoInput) projectVideoInput.value = project.videoUrl || '';
    if (projectDescInput) projectDescInput.value = project.summary || '';
    if (projectTagsInput) projectTagsInput.value = (project.tags || []).join(', ');

    if (projectSubmitBtn) projectSubmitBtn.textContent = 'Update Existing System Spec';
    if (projectCancelBtn) projectCancelBtn.style.display = 'inline-flex';

    projectTitleInput.focus();
    projectTitleInput.scrollIntoView({ behavior: 'smooth', block: 'center' });
  };

  if (projectCancelBtn) {
    projectCancelBtn.addEventListener('click', () => {
      projectForm.reset();
      projectIdField.value = '';
      projectSubmitBtn.textContent = 'Add System to Portfolio';
      projectCancelBtn.style.display = 'none';
    });
  }

  if (projectForm) {
    projectForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const projects = getProjectsList();
      const existingId = projectIdField.value;

      const tagsArray = projectTagsInput.value
        .split(',')
        .map(t => t.trim())
        .filter(t => t.length > 0);

      if (existingId) {
        // Update existing project
        const index = projects.findIndex(p => String(p.id) === String(existingId));
        if (index !== -1) {
          projects[index] = {
            ...projects[index],
            title: projectTitleInput.value.trim(),
            category: projectCatInput.value.trim(),
            badge: projectBadgeInput.value.trim() || 'PROJECT',
            coverImage: projectImgInput.value.trim(),
            videoUrl: projectVideoInput.value.trim(),
            summary: projectDescInput.value.trim(),
            tags: tagsArray
          };
          saveProjectsList(projects);
          showToast(`Project #${existingId} updated successfully.`);
        }
      } else {
        // Create new project
        const newId = String(Date.now());
        const newProject = {
          id: newId,
          title: projectTitleInput.value.trim(),
          category: projectCatInput.value.trim() || 'Enterprise Web',
          filterCat: 'enterprise',
          badge: projectBadgeInput.value.trim() || 'NEW DEPLOYMENT',
          subtitle: 'High performance enterprise architecture',
          summary: projectDescInput.value.trim(),
          fullDescription: projectDescInput.value.trim(),
          coverImage: projectImgInput.value.trim() || 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&h=450&q=80',
          gallery: [projectImgInput.value.trim() || 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&h=675&q=80'],
          videoUrl: projectVideoInput.value.trim() || 'https://www.youtube-nocookie.com/embed/ScMzIvxBSi4?rel=0&modestbranding=1',
          metrics: { payload: '22 KB', fcp: '0.2s', lcp: '0.3s', fps: '60 FPS' },
          tags: tagsArray.length > 0 ? tagsArray : ['Vanilla JS', 'Performance', 'Enterprise'],
          client: 'Enterprise Client',
          year: new Date().getFullYear().toString(),
          status: 'Production Live'
        };
        projects.unshift(newProject);
        saveProjectsList(projects);
        showToast('New project system added to portfolio!');
      }

      projectForm.reset();
      projectIdField.value = '';
      projectSubmitBtn.textContent = 'Add System to Portfolio';
      projectCancelBtn.style.display = 'none';
      renderProjectsTable();
    });
  }

  if (resetProjectsBtn) {
    resetProjectsBtn.addEventListener('click', () => {
      if (confirm('Reset portfolio to 6 default enterprise systems? This will overwrite local changes.')) {
        localStorage.removeItem('alfaiz_portfolio_v2');
        renderProjectsTable();
        showToast('Projects reset to default matrix.');
      }
    });
  }

  // ==========================================================================
  // 6. Fiverr Gig Image Generator (Canvas 1280x769)
  // ==========================================================================
  const gigCanvas = document.getElementById('gig-canvas');
  const gigTitleInput = document.getElementById('gig-title-input');
  const gigSubtitleInput = document.getElementById('gig-subtitle-input');
  const gigBadgeInput = document.getElementById('gig-badge-input');
  const gigBullet1Input = document.getElementById('gig-bullet-1');
  const gigBullet2Input = document.getElementById('gig-bullet-2');
  const gigBullet3Input = document.getElementById('gig-bullet-3');
  const gigThemeSelect = document.getElementById('gig-theme-select');
  const downloadGigBtn = document.getElementById('download-gig-btn');

  function renderGigCanvas() {
    if (!gigCanvas) return;
    const ctx = gigCanvas.getContext('2d');

    // Strict Fiverr Gig Resolution: 1280 x 769
    const W = 1280;
    const H = 769;

    const title = gigTitleInput ? gigTitleInput.value : 'ARCHITECTING FUTURE-READY WEB SYSTEMS';
    const subtitle = gigSubtitleInput ? gigSubtitleInput.value : 'Pure Vanilla Performance • Sub-Second 0.3s Latency • Zero Framework Bloat';
    const badge = gigBadgeInput ? gigBadgeInput.value : 'VERIFIED PRO ARCHITECT • TOP RATED';
    const bullet1 = gigBullet1Input ? gigBullet1Input.value : '✔ 100/100 Google Core Web Vitals Guaranteed';
    const bullet2 = gigBullet2Input ? gigBullet2Input.value : '✔ Sub-Millisecond WebSocket & 3D Glass UI';
    const bullet3 = gigBullet3Input ? gigBullet3Input.value : '✔ 0 KB Framework Dependencies • Instant Render';
    const theme = gigThemeSelect ? gigThemeSelect.value : 'navy';

    // 1. Background Fill
    if (theme === 'navy') {
      const grad = ctx.createLinearGradient(0, 0, W, H);
      grad.addColorStop(0, '#061325');
      grad.addColorStop(0.5, '#0A1931');
      grad.addColorStop(1, '#082042');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, W, H);
    } else if (theme === 'cyan') {
      const grad = ctx.createLinearGradient(0, 0, W, H);
      grad.addColorStop(0, '#020b18');
      grad.addColorStop(1, '#06284d');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, W, H);
    } else {
      // Solid Modern Enterprise
      ctx.fillStyle = '#0B192C';
      ctx.fillRect(0, 0, W, H);
    }

    // 2. Ambient Hexagons & Geometry
    ctx.save();
    ctx.strokeStyle = 'rgba(15, 108, 189, 0.2)';
    ctx.lineWidth = 1.5;

    function drawHex(x, y, radius) {
      ctx.beginPath();
      for (let i = 0; i < 6; i++) {
        const angle = (Math.PI / 3) * i - Math.PI / 6;
        const hx = x + radius * Math.cos(angle);
        const hy = y + radius * Math.sin(angle);
        if (i === 0) ctx.moveTo(hx, hy);
        else ctx.lineTo(hx, hy);
      }
      ctx.closePath();
      ctx.stroke();
    }

    drawHex(1150, 200, 140);
    drawHex(1150, 480, 100);
    drawHex(1020, 340, 75);
    drawHex(160, 680, 110);
    drawHex(80, 220, 60);

    // Glowing Radial Light on Top-Right
    const glow = ctx.createRadialGradient(1080, 260, 10, 1080, 260, 450);
    glow.addColorStop(0, 'rgba(15, 108, 189, 0.35)');
    glow.addColorStop(0.5, 'rgba(10, 61, 107, 0.15)');
    glow.addColorStop(1, 'transparent');
    ctx.fillStyle = glow;
    ctx.fillRect(600, 0, 680, 769);
    ctx.restore();

    // 3. 3D Glass Ribbon Accent on Canvas
    ctx.save();
    ctx.shadowColor = 'rgba(15, 108, 189, 0.4)';
    ctx.shadowBlur = 30;
    const ribbonGrad = ctx.createLinearGradient(900, 150, 1200, 450);
    ribbonGrad.addColorStop(0, 'rgba(255, 255, 255, 0.3)');
    ribbonGrad.addColorStop(0.5, 'rgba(15, 108, 189, 0.25)');
    ribbonGrad.addColorStop(1, 'rgba(10, 61, 107, 0.4)');
    ctx.fillStyle = ribbonGrad;
    ctx.strokeStyle = 'rgba(56, 189, 248, 0.5)';
    ctx.lineWidth = 2;

    ctx.beginPath();
    ctx.roundRect(880, 170, 320, 180, 24);
    ctx.fill();
    ctx.stroke();

    // Inner Specular Light
    ctx.fillStyle = 'rgba(255, 255, 255, 0.12)';
    ctx.beginPath();
    ctx.ellipse(1040, 230, 120, 35, -Math.PI / 8, 0, Math.PI * 2);
    ctx.fill();

    // Inside the glass card: 99.9% Core Web Vitals
    ctx.fillStyle = '#FFFFFF';
    ctx.font = 'bold 38px "Space Grotesk", sans-serif';
    ctx.fillText('99.9%', 920, 250);
    ctx.fillStyle = '#38BDF8';
    ctx.font = '600 16px "Plus Jakarta Sans", sans-serif';
    ctx.fillText('CORE WEB VITALS', 920, 280);
    ctx.fillStyle = '#94A3B8';
    ctx.font = '500 14px "Plus Jakarta Sans", sans-serif';
    ctx.fillText('< 0.3s Global Latency', 920, 305);
    ctx.restore();

    // 4. Content Area Left (X = 90)
    // Brand Watermark / Top Header
    ctx.fillStyle = '#38BDF8';
    ctx.font = '800 20px "Space Grotesk", sans-serif';
    ctx.letterSpacing = '3px';
    ctx.fillText('ALFAIZ // WEB ARCHITECT', 90, 105);

    // Top Badge Pill
    ctx.save();
    ctx.fillStyle = 'rgba(15, 108, 189, 0.25)';
    ctx.strokeStyle = '#0F6CBD';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.roundRect(90, 135, 420, 38, 19);
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = '#38BDF8';
    ctx.font = 'bold 14px "Plus Jakarta Sans", sans-serif';
    ctx.fillText('★  ' + badge.toUpperCase(), 114, 160);
    ctx.restore();

    // Main Big Headline (Multi-line)
    ctx.save();
    ctx.fillStyle = '#FFFFFF';
    ctx.font = '800 50px "Plus Jakarta Sans", sans-serif';
    ctx.shadowColor = 'rgba(0, 0, 0, 0.8)';
    ctx.shadowBlur = 12;

    const words = title.split(' ');
    let line1 = words.slice(0, 3).join(' ');
    let line2 = words.slice(3, 7).join(' ');
    let line3 = words.slice(7).join(' ');

    ctx.fillText(line1, 90, 235);
    // Draw Gradient Line for middle phrase
    const textGrad = ctx.createLinearGradient(90, 0, 600, 0);
    textGrad.addColorStop(0, '#38BDF8');
    textGrad.addColorStop(1, '#0F6CBD');
    ctx.fillStyle = textGrad;
    ctx.fillText(line2, 90, 295);

    ctx.fillStyle = '#FFFFFF';
    if (line3) {
      ctx.fillText(line3, 90, 355);
    }
    ctx.restore();

    // Subtitle
    ctx.fillStyle = '#94A3B8';
    ctx.font = '500 20px "Plus Jakarta Sans", sans-serif';
    ctx.fillText(subtitle, 90, 415);

    // Divider Line
    ctx.strokeStyle = 'rgba(15, 108, 189, 0.3)';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(90, 450);
    ctx.lineTo(820, 450);
    ctx.stroke();

    // 3 Feature Bullets
    ctx.fillStyle = '#FFFFFF';
    ctx.font = '600 22px "Plus Jakarta Sans", sans-serif';
    ctx.fillText(bullet1, 90, 505);
    ctx.fillText(bullet2, 90, 555);
    ctx.fillText(bullet3, 90, 605);

    // Bottom Trust Bar
    ctx.save();
    ctx.fillStyle = 'rgba(15, 23, 42, 0.7)';
    ctx.strokeStyle = 'rgba(15, 108, 189, 0.25)';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.roundRect(90, 645, 1100, 60, 14);
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = '#38BDF8';
    ctx.font = '700 15px "Space Grotesk", sans-serif';
    ctx.fillText('FIVERR EXCLUSIVE GIG', 120, 680);

    ctx.fillStyle = '#E2E8F0';
    ctx.font = '600 15px "Plus Jakarta Sans", sans-serif';
    ctx.fillText('24H FAST-TRACK AVAILABLE • ESCROW PROTECTED • 100% 5-STAR DELIVERY', 360, 680);
    ctx.restore();
  }

  // Trigger gig redraw on input changes
  [gigTitleInput, gigSubtitleInput, gigBadgeInput, gigBullet1Input, gigBullet2Input, gigBullet3Input, gigThemeSelect].forEach(input => {
    if (input) {
      input.addEventListener('input', renderGigCanvas);
      input.addEventListener('change', renderGigCanvas);
    }
  });

  // Download Gig Image Button
  if (downloadGigBtn && gigCanvas) {
    downloadGigBtn.addEventListener('click', () => {
      renderGigCanvas();
      const link = document.createElement('a');
      link.download = 'fiverr-gig-alfaiz-1280x769.png';
      link.href = gigCanvas.toDataURL('image/png', 1.0);
      link.click();
      showToast('Fiverr Gig Canvas exported (1280x769 PNG)!');
    });
  }

  // ==========================================================================
  // 7. Loader Settings Management ('alfaiz_loader_settings')
  // ==========================================================================
  const loaderForm = document.getElementById('loader-settings-form');
  const loaderTypeSelect = document.getElementById('loader-type-select');
  const loaderSpeedSelect = document.getElementById('loader-speed-select');
  const loaderColorInput = document.getElementById('loader-color-input');
  const testLoaderBtn = document.getElementById('test-loader-btn');

  function loadLoaderSettings() {
    const saved = localStorage.getItem('alfaiz_loader_settings');
    const data = saved ? JSON.parse(saved) : {
      type: 'circle',
      speed: 'normal',
      color: '#0F6CBD'
    };

    if (loaderTypeSelect) loaderTypeSelect.value = data.type || 'circle';
    if (loaderSpeedSelect) loaderSpeedSelect.value = data.speed || 'normal';
    if (loaderColorInput) loaderColorInput.value = data.color || '#0F6CBD';
  }

  if (loaderForm) {
    loaderForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const data = {
        type: loaderTypeSelect.value,
        speed: loaderSpeedSelect.value,
        color: loaderColorInput.value,
        updatedAt: new Date().toISOString()
      };
      localStorage.setItem('alfaiz_loader_settings', JSON.stringify(data));
      showToast('Loader configuration saved!');
    });
  }

  if (testLoaderBtn) {
    testLoaderBtn.addEventListener('click', () => {
      const type = loaderTypeSelect.value;
      const speed = loaderSpeedSelect.value;
      showToast(`Loader Preview: Type [${type.toUpperCase()}] • Speed [${speed.toUpperCase()}]`);
    });
  }

  // ==========================================================================
  // 8. SEO Section Management ('alfaiz_seo')
  // ==========================================================================
  const seoForm = document.getElementById('seo-form');
  const seoTitleInput = document.getElementById('seo-title-input');
  const seoDescInput = document.getElementById('seo-desc-input');
  const seoKeywordsInput = document.getElementById('seo-keywords-input');
  const serpTitlePreview = document.getElementById('serp-title-preview');
  const serpDescPreview = document.getElementById('serp-desc-preview');

  function loadSeoSettings() {
    const saved = localStorage.getItem('alfaiz_seo');
    const data = saved ? JSON.parse(saved) : {
      title: 'ALFAIZ | Web Architect - High Performance Web Systems',
      description: 'High-performance digital engineering crafted without framework overhead. Sub-second latency, rock-solid architectural stability, and frictionless scalability.',
      keywords: 'Web Architect, Vanilla JS, Performance Engineering, Core Web Vitals, Enterprise Frontend'
    };

    if (seoTitleInput) seoTitleInput.value = data.title;
    if (seoDescInput) seoDescInput.value = data.description;
    if (seoKeywordsInput) seoKeywordsInput.value = data.keywords;
    updateSerpPreview();
  }

  function updateSerpPreview() {
    if (serpTitlePreview && seoTitleInput) {
      serpTitlePreview.textContent = seoTitleInput.value || 'ALFAIZ | Web Architect';
    }
    if (serpDescPreview && seoDescInput) {
      serpDescPreview.textContent = seoDescInput.value || 'Architecting Future-Ready Web Systems With Pure Speed.';
    }
  }

  if (seoTitleInput) seoTitleInput.addEventListener('input', updateSerpPreview);
  if (seoDescInput) seoDescInput.addEventListener('input', updateSerpPreview);

  if (seoForm) {
    seoForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const data = {
        title: seoTitleInput.value.trim(),
        description: seoDescInput.value.trim(),
        keywords: seoKeywordsInput.value.trim(),
        updatedAt: new Date().toISOString()
      };
      localStorage.setItem('alfaiz_seo', JSON.stringify(data));
      showToast('SEO metadata configuration updated!');
    });
  }

  // ==========================================================================
  // 9. Initial Load Calls
  // ==========================================================================
  loadBrandingSettings();
  loadHeroSettings();
  renderProjectsTable();
  renderGigCanvas();
  loadLoaderSettings();
  loadSeoSettings();

});

