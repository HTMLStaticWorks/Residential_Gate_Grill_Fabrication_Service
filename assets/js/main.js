/* ============================================================
   MAIN.JS — SCALA GATE & GRILL STUDIO
   ============================================================ */

'use strict';

// ── Theme Management ──
const ThemeManager = (() => {
  const storageKey = 'scala-theme';
  const htmlEl = document.documentElement;

  const getSystemTheme = () =>
    window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';

  const apply = (theme) => {
    htmlEl.setAttribute('data-theme', theme);
    localStorage.setItem(storageKey, theme);
    const icons = document.querySelectorAll('.theme-toggle-icon');
    icons.forEach(icon => {
      icon.className = `theme-toggle-icon fas ${theme === 'dark' ? 'fa-sun' : 'fa-moon'}`;
    });
  };

  const init = () => {
    const saved = localStorage.getItem(storageKey) || getSystemTheme();
    apply(saved);
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
      if (!localStorage.getItem(storageKey)) apply(e.matches ? 'dark' : 'light');
    });
  };

  const toggle = () => {
    const current = htmlEl.getAttribute('data-theme') || 'light';
    apply(current === 'dark' ? 'light' : 'dark');
  };

  return { init, toggle };
})();

// ── RTL Management ──
const RTLManager = (() => {
  const storageKey = 'scala-rtl';

  const apply = (isRTL) => {
    document.documentElement.dir = isRTL ? 'rtl' : 'ltr';
    localStorage.setItem(storageKey, isRTL ? '1' : '0');
    const rtlCss = document.getElementById('rtl-stylesheet');
    if (rtlCss) rtlCss.disabled = !isRTL;
  };

  const init = () => {
    const saved = localStorage.getItem(storageKey);
    const isRTL = saved === '1';
    apply(isRTL);
  };

  const toggle = () => {
    const current = document.documentElement.dir;
    apply(current !== 'rtl');
  };

  return { init, toggle };
})();

// ── Navigation ──
const Navigation = (() => {
  const header = document.querySelector('.header');
  const hamburger = document.querySelector('.hamburger');
  const mobileMenu = document.querySelector('.mobile-menu');
  const mobileClose = document.querySelector('.mobile-close');

  const handleScroll = () => {
    if (!header) return;
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  };

  const toggleMobile = () => {
    const isOpen = mobileMenu && mobileMenu.classList.toggle('open');
    if (hamburger) hamburger.classList.toggle('active', isOpen);
    document.body.style.overflow = isOpen ? 'hidden' : '';
  };

  const closeMobile = () => {
    if (mobileMenu) mobileMenu.classList.remove('open');
    if (hamburger) hamburger.classList.remove('active');
    document.body.style.overflow = '';
  };

  const setActiveLink = () => {
    const path = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.nav-link').forEach(link => {
      const href = link.getAttribute('href') || '';
      link.classList.toggle('active', href.includes(path));
    });
  };

  const init = () => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    if (hamburger) hamburger.addEventListener('click', toggleMobile);
    if (mobileClose) mobileClose.addEventListener('click', closeMobile);
    document.querySelectorAll('.mobile-menu .nav-link').forEach(l => l.addEventListener('click', closeMobile));
    setActiveLink();
  };

  return { init };
})();

// ── Scroll Animations ──
const ScrollAnimations = (() => {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

  const init = () => {
    document.querySelectorAll('.animate-on-scroll').forEach(el => observer.observe(el));
  };

  return { init };
})();

// ── Counter Animation ──
const CounterAnimation = (() => {
  const animateCounter = (el) => {
    const target = parseInt(el.getAttribute('data-target') || el.textContent);
    const suffix = el.getAttribute('data-suffix') || '';
    const duration = 2000;
    const step = target / (duration / 16);
    let current = 0;

    const timer = setInterval(() => {
      current += step;
      if (current >= target) {
        current = target;
        clearInterval(timer);
      }
      el.textContent = Math.floor(current).toLocaleString() + suffix;
    }, 16);
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  const init = () => {
    document.querySelectorAll('[data-counter]').forEach(el => observer.observe(el));
  };

  return { init };
})();

// ── FAQ Accordion ──
const FAQ = (() => {
  const init = () => {
    document.querySelectorAll('.faq-question').forEach(question => {
      question.addEventListener('click', () => {
        const item = question.closest('.faq-item');
        const isOpen = item.classList.contains('open');
        document.querySelectorAll('.faq-item.open').forEach(i => i.classList.remove('open'));
        if (!isOpen) item.classList.add('open');
      });
    });
  };

  return { init };
})();

// ── Toast Notifications ──
const Toast = (() => {
  const show = (message, type = 'success', duration = 4000) => {
    let container = document.querySelector('.toast-container');
    if (!container) {
      container = document.createElement('div');
      container.className = 'toast-container';
      document.body.appendChild(container);
    }

    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.innerHTML = `
      <i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-circle'} ${type}"></i>
      <span>${message}</span>
    `;
    container.appendChild(toast);

    setTimeout(() => {
      toast.style.animation = 'slideInRight 0.4s ease reverse';
      setTimeout(() => toast.remove(), 400);
    }, duration);
  };

  return { show };
})();

// ── Form Validation ──
const FormValidation = (() => {
  const rules = {
    required: (val) => val.trim() !== '' || 'This field is required',
    email: (val) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val) || 'Please enter a valid email',
    minLength: (min) => (val) => val.length >= min || `Minimum ${min} characters required`,
    phone: (val) => /^[\+\d\s\-\(\)]{7,}$/.test(val) || 'Please enter a valid phone number',
  };

  const validate = (input) => {
    const validations = (input.dataset.validate || '').split(',').filter(Boolean);
    const errorEl = input.parentElement.querySelector('.form-error') ||
      (() => {
        const el = document.createElement('span');
        el.className = 'form-error';
        input.parentElement.appendChild(el);
        return el;
      })();

    let isValid = true;
    for (const rule of validations) {
      const [name, param] = rule.trim().split(':');
      const validator = rules[name];
      if (!validator) continue;

      const fn = param ? validator(param) : validator;
      const result = fn(input.value);
      if (result !== true) {
        input.classList.add('error');
        errorEl.innerHTML = `<i class="fas fa-exclamation-circle"></i> ${result}`;
        errorEl.style.display = 'flex';
        isValid = false;
        break;
      }
    }

    if (isValid) {
      input.classList.remove('error');
      errorEl.style.display = 'none';
    }

    return isValid;
  };

  const initForm = (formEl) => {
    if (!formEl) return;

    const inputs = formEl.querySelectorAll('input[data-validate], textarea[data-validate], select[data-validate]');
    inputs.forEach(input => {
      input.addEventListener('blur', () => validate(input));
      input.addEventListener('input', () => {
        if (input.classList.contains('error')) validate(input);
      });
    });

    formEl.addEventListener('submit', (e) => {
      e.preventDefault();
      let allValid = true;
      inputs.forEach(input => { if (!validate(input)) allValid = false; });

      if (allValid) {
        Toast.show('Message sent successfully! We\'ll be in touch soon.', 'success');
        formEl.reset();
      } else {
        Toast.show('Please fix the errors before submitting.', 'error');
      }
    });
  };

  const init = () => {
    document.querySelectorAll('form[data-validate-form]').forEach(initForm);
  };

  return { init, initForm };
})();

// ── Back To Top ──
const BackToTop = (() => {
  const btn = document.querySelector('.back-to-top');

  const init = () => {
    if (!btn) return;
    window.addEventListener('scroll', () => {
      btn.classList.toggle('visible', window.scrollY > 400);
    }, { passive: true });
    btn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
  };

  return { init };
})();

// ── Password Toggle ──
const PasswordToggle = (() => {
  const init = () => {
    document.querySelectorAll('.toggle-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const input = btn.closest('.password-toggle').querySelector('input');
        const isText = input.type === 'text';
        input.type = isText ? 'password' : 'text';
        btn.className = `toggle-btn fas fa-${isText ? 'eye' : 'eye-slash'}`;
      });
    });
  };

  return { init };
})();

// ── Countdown Timer ──
const Countdown = (() => {
  const init = () => {
    const el = document.querySelector('[data-countdown]');
    if (!el) return;

    const targetDate = new Date(el.getAttribute('data-countdown')).getTime();

    const update = () => {
      const now = Date.now();
      const diff = targetDate - now;
      if (diff <= 0) { el.innerHTML = '<span>Launch has arrived!</span>'; return; }

      const d = Math.floor(diff / 86400000);
      const h = Math.floor((diff % 86400000) / 3600000);
      const m = Math.floor((diff % 3600000) / 60000);
      const s = Math.floor((diff % 60000) / 1000);

      ['days', 'hours', 'minutes', 'seconds'].forEach((unit, i) => {
        const num = [d, h, m, s][i];
        const numEl = el.querySelector(`[data-unit="${unit}"]`);
        if (numEl) numEl.textContent = String(num).padStart(2, '0');
      });
    };

    update();
    setInterval(update, 1000);
  };

  return { init };
})();

// ── Particles ──
const Particles = (() => {
  const init = () => {
    const container = document.querySelector('.hero-particles');
    if (!container) return;

    for (let i = 0; i < 20; i++) {
      const p = document.createElement('div');
      p.className = 'particle';
      p.style.cssText = `
        left: ${Math.random() * 100}%;
        top: ${Math.random() * 100}%;
        --dur: ${6 + Math.random() * 8}s;
        --delay: ${-Math.random() * 8}s;
        width: ${2 + Math.random() * 4}px;
        height: ${2 + Math.random() * 4}px;
        opacity: ${0.3 + Math.random() * 0.5};
      `;
      container.appendChild(p);
    }
  };

  return { init };
})();

// ── Gallery Filter ──
const GalleryFilter = (() => {
  const init = () => {
    const filterBtns = document.querySelectorAll('[data-filter]');
    const items = document.querySelectorAll('[data-category]');
    if (!filterBtns.length) return;

    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const filter = btn.getAttribute('data-filter');
        items.forEach(item => {
          const show = filter === 'all' || item.getAttribute('data-category') === filter;
          item.style.display = show ? '' : 'none';
          item.style.animation = show ? 'fadeIn 0.4s ease' : '';
        });
      });
    });
  };

  return { init };
})();

// ── Init All ──
document.addEventListener('DOMContentLoaded', () => {
  ThemeManager.init();
  RTLManager.init();
  Navigation.init();
  ScrollAnimations.init();
  CounterAnimation.init();
  FAQ.init();
  FormValidation.init();
  BackToTop.init();
  PasswordToggle.init();
  Countdown.init();
  Particles.init();
  GalleryFilter.init();
});

// Expose for inline HTML usage
window.Scala = { ThemeManager, RTLManager, Toast, FormValidation };
window.Deco = window.Scala;
