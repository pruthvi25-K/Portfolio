/* AMBIENT CANVAS & SPOTLIGHT CONTROLLER */

class AmbientCanvas {
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId);
    if (!this.canvas) return;
    this.ctx = this.canvas.getContext('2d');
    this.particles = [];
    this.numParticles = 45;
    this.mouse = { x: null, y: null };

    this.primaryColor = 'rgba(0, 240, 255, 0.35)';
    this.secondaryColor = 'rgba(139, 92, 246, 0.25)';

    this.init();
    this.animate();
    this.addListeners();
  }

  init() {
    this.resize();
    this.particles = [];
    for (let i = 0; i < this.numParticles; i++) {
      this.particles.push({
        x: Math.random() * this.canvas.width,
        y: Math.random() * this.canvas.height,
        vx: (Math.random() - 0.5) * 0.35,
        vy: (Math.random() - 0.5) * 0.35,
        radius: Math.random() * 2 + 1,
        isPrimary: Math.random() > 0.4
      });
    }
  }

  resize() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
  }

  addListeners() {
    window.addEventListener('resize', () => this.resize());
    window.addEventListener('mousemove', (e) => {
      this.mouse.x = e.clientX;
      this.mouse.y = e.clientY;
      
      const spotlight = document.getElementById('spotlight');
      if (spotlight) {
        spotlight.style.setProperty('--x', `${e.clientX}px`);
        spotlight.style.setProperty('--y', `${e.clientY}px`);
      }
    });
    window.addEventListener('mouseout', () => {
      this.mouse.x = null;
      this.mouse.y = null;
    });
  }

  animate() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    for (let i = 0; i < this.particles.length; i++) {
      const p = this.particles[i];

      p.x += p.vx;
      p.y += p.vy;

      if (p.x < 0 || p.x > this.canvas.width) p.vx *= -1;
      if (p.y < 0 || p.y > this.canvas.height) p.vy *= -1;

      // Render Node Dot
      const pColor = p.isPrimary ? this.primaryColor : this.secondaryColor;
      this.ctx.beginPath();
      this.ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      this.ctx.fillStyle = pColor;
      this.ctx.fill();

      // Draw Connection Lines
      for (let j = i + 1; j < this.particles.length; j++) {
        const p2 = this.particles[j];
        const dx = p.x - p2.x;
        const dy = p.y - p2.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 140) {
          this.ctx.beginPath();
          this.ctx.moveTo(p.x, p.y);
          this.ctx.lineTo(p2.x, p2.y);
          const opacity = (1 - dist / 140) * 0.12;
          this.ctx.strokeStyle = `rgba(0, 240, 255, ${opacity})`;
          this.ctx.lineWidth = 0.75;
          this.ctx.stroke();
        }
      }
    }

    requestAnimationFrame(() => this.animate());
  }
}

document.addEventListener('DOMContentLoaded', () => {
  window.ambientCanvas = new AmbientCanvas('bg-canvas');
});
