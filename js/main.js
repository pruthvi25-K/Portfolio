/* STUDIO PORTFOLIO CONTROLLER & INTERACTION ENGINE */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Navigation Scroll & Active Link Observer
  const navbar = document.getElementById('navbar');
  const sections = document.querySelectorAll('section');
  const navLinks = document.querySelectorAll('.nav-link');

  function handleScroll() {
    if (window.scrollY > 30) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    let current = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 150;
      const sectionHeight = section.offsetHeight;
      if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  }

  window.addEventListener('scroll', handleScroll);

  // 2. Mobile Menu Toggle
  const mobileBtn = document.getElementById('mobile-menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  const mobileLinks = document.querySelectorAll('.mobile-nav-link');

  if (mobileBtn && mobileMenu) {
    mobileBtn.addEventListener('click', () => {
      mobileMenu.classList.toggle('open');
    });

    mobileLinks.forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.classList.remove('open');
      });
    });
  }

  // 3. Hero Portrait Multi-Layer Parallax
  const heroSection = document.getElementById('hero');
  const portraitCard = document.getElementById('portrait-card');
  const portraitGlow = document.querySelector('.portrait-glow-back');

  if (heroSection && portraitCard) {
    heroSection.addEventListener('mousemove', (e) => {
      const rect = heroSection.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;

      const rotX = (y / rect.height) * -10;
      const rotY = (x / rect.width) * 10;

      portraitCard.style.transform = `rotateX(${rotX}deg) rotateY(${rotY}deg) translateY(-4px)`;
      if (portraitGlow) {
        portraitGlow.style.transform = `translate(${x * 0.06}px, ${y * 0.06}px)`;
      }
    });

    heroSection.addEventListener('mouseleave', () => {
      portraitCard.style.transform = 'rotateX(0deg) rotateY(0deg) translateY(0px)';
      if (portraitGlow) {
        portraitGlow.style.transform = 'translate(0px, 0px)';
      }
    });
  }

  // 4. Magnetic Button Hover Effect
  const magneticBtns = document.querySelectorAll('.magnetic-btn');

  magneticBtns.forEach(btn => {
    btn.addEventListener('mousemove', (e) => {
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;

      btn.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px)`;
    });

    btn.addEventListener('mouseleave', () => {
      btn.style.transform = 'translate(0px, 0px)';
    });
  });

  // 5. Scroll Reveal Intersection Observer
  const revealElements = document.querySelectorAll(
    '.editorial-project-card, .service-card, .level-card, .flow-step, .about-diagram-card, .edu-minimal-card'
  );

  const observerOptions = {
    threshold: 0.12,
    rootMargin: '0px 0px -40px 0px'
  };

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        revealObserver.unobserve(entry.target);
      }
    });
  }, observerOptions);

  revealElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(24px)';
    el.style.transition = 'opacity 0.7s cubic-bezier(0.16, 1, 0.3, 1), transform 0.7s cubic-bezier(0.16, 1, 0.3, 1)';
    revealObserver.observe(el);
  });
});
