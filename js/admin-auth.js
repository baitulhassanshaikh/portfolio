/**
 * ALFAIZ | Administrative Authentication Script
 * Validates credentials against security matrix and manages admin session state
 */

document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  // Check if already logged in - if so, redirect directly to admin console
  if (localStorage.getItem('adminLogged') === 'true') {
    window.location.href = 'index.html';
    return;
  }

  const loginForm = document.getElementById('admin-login-form');
  const emailInput = document.getElementById('admin-email');
  const passInput = document.getElementById('admin-password');
  const errorBanner = document.getElementById('auth-error-banner');
  const demoFillBtn = document.getElementById('demo-fill-btn');
  const submitBtn = document.getElementById('submit-auth-btn');

  // 1-Click Demo Fill Functionality
  if (demoFillBtn) {
    demoFillBtn.addEventListener('click', () => {
      emailInput.value = 'admin@gmail.com';
      passInput.value = 'ALFAIZ123';

      // Visual pulse on inputs
      emailInput.style.borderColor = '#10B981';
      passInput.style.borderColor = '#10B981';
      setTimeout(() => {
        emailInput.style.borderColor = '';
        passInput.style.borderColor = '';
      }, 1000);

      if (errorBanner) {
        errorBanner.classList.remove('active');
      }

      // Automatically focus submit button
      if (submitBtn) {
        submitBtn.focus();
      }
    });
  }

  // Handle Login Submission
  if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const email = emailInput.value.trim();
      const password = passInput.value.trim();

      // Check credentials: admin@gmail.com / ALFAIZ123
      if (email === 'admin@gmail.com' && password === 'ALFAIZ123') {
        if (errorBanner) {
          errorBanner.classList.remove('active');
        }

        // Animate button unlock
        submitBtn.disabled = true;
        submitBtn.innerHTML = `
          <span>Matrix Authenticated &bull; Unlocking...</span>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" class="btn-spinner">
            <circle cx="12" cy="12" r="10" stroke-opacity="0.25"></circle>
            <path d="M12 2a10 10 0 0 1 10 10" stroke-linecap="round"></path>
          </svg>
        `;

        // Store auth state in localStorage
        localStorage.setItem('adminLogged', 'true');

        // Smooth redirect to admin console
        setTimeout(() => {
          window.location.href = 'index.html';
        }, 650);

      } else {
        // Show authentication failure banner
        if (errorBanner) {
          errorBanner.textContent = 'ACCESS DENIED: Invalid Security Credentials';
          errorBanner.classList.remove('active');
          void errorBanner.offsetWidth; // Trigger reflow for shake animation
          errorBanner.classList.add('active');
        }

        passInput.value = '';
        passInput.focus();
      }
    });
  }
});

