/* EMBEDDED CLI TERMINAL INTERPRETER */

class CyberTerminal {
  constructor() {
    this.overlay = document.getElementById('terminal-overlay');
    this.output = document.getElementById('terminal-output');
    this.input = document.getElementById('terminal-input');
    this.closeBtn = document.getElementById('close-terminal');
    this.toggleBtn = document.getElementById('toggle-terminal-btn');

    this.history = [];
    this.historyIdx = 0;

    this.init();
  }

  init() {
    if (!this.overlay || !this.input) return;

    if (this.toggleBtn) {
      this.toggleBtn.addEventListener('click', () => this.toggle());
    }

    if (this.closeBtn) {
      this.closeBtn.addEventListener('click', () => this.close());
    }

    // Global Key Listener: Ctrl + ~ or Escape
    window.addEventListener('keydown', (e) => {
      if (e.key === '`' && e.ctrlKey) {
        e.preventDefault();
        this.toggle();
      } else if (e.key === 'Escape' && this.overlay.classList.contains('active')) {
        this.close();
      }
    });

    this.input.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        const cmd = this.input.value.trim();
        if (cmd) {
          this.execute(cmd);
          this.history.push(cmd);
          this.historyIdx = this.history.length;
          this.input.value = '';
        }
      } else if (e.key === 'ArrowUp') {
        if (this.historyIdx > 0) {
          this.historyIdx--;
          this.input.value = this.history[this.historyIdx];
        }
      } else if (e.key === 'ArrowDown') {
        if (this.historyIdx < this.history.length - 1) {
          this.historyIdx++;
          this.input.value = this.history[this.historyIdx];
        } else {
          this.historyIdx = this.history.length;
          this.input.value = '';
        }
      }
    });
  }

  toggle() {
    this.overlay.classList.toggle('active');
    if (this.overlay.classList.contains('active')) {
      this.input.focus();
      if (window.cyberAudio) window.cyberAudio.playClick();
    }
  }

  close() {
    this.overlay.classList.remove('active');
    if (window.cyberAudio) window.cyberAudio.playClick();
  }

  execute(cmdStr) {
    const raw = cmdStr.toLowerCase().trim();
    this.printLine(`<span style="color: var(--neon-pink);">pruthviraj@kale-node:~$</span> ${cmdStr}`);

    if (raw.startsWith('theme ')) {
      const themeArg = raw.split(' ')[1];
      const validThemes = ['cyberpunk', 'vaporwave', 'matrix', 'minimal-light'];
      if (validThemes.includes(themeArg)) {
        document.documentElement.setAttribute('data-theme', themeArg);
        const themeSelect = document.getElementById('theme-select');
        if (themeSelect) themeSelect.value = themeArg;
        localStorage.setItem('pk_cyber_theme', themeArg);
        if (window.cyberCanvas) window.cyberCanvas.updateThemeColors(themeArg);
        this.printLine(`<span style="color: var(--neon-green);">[SUCCESS] Visual aesthetic updated to '${themeArg.toUpperCase()}'</span>`);
      } else {
        this.printLine(`<span style="color: var(--neon-pink);">Unknown theme. Available: cyberpunk, vaporwave, matrix, minimal-light</span>`);
      }
      this.output.scrollTop = this.output.scrollHeight;
      return;
    }

    switch (raw) {
      case 'help':
        this.printLine(`
Available Commands for Pruthviraj Kale's Terminal:
  <span style="color: var(--neon-cyan);">help</span>          - Display command list
  <span style="color: var(--neon-cyan);">whoami</span>        - Print Pruthviraj Kale's engineer profile
  <span style="color: var(--neon-cyan);">skills</span>        - List technical stack & competencies
  <span style="color: var(--neon-cyan);">theme [name]</span>  - Change theme (cyberpunk, vaporwave, matrix, minimal-light)
  <span style="color: var(--neon-cyan);">projects</span>      - Display featured software systems
  <span style="color: var(--neon-cyan);">contact</span>       - Print communication channels & contact link
  <span style="color: var(--neon-cyan);">matrix</span>        - Trigger visual matrix data stream
  <span style="color: var(--neon-cyan);">clear</span>         - Clear terminal screen
  <span style="color: var(--neon-cyan);">exit</span>          - Close terminal overlay
        `);
        break;

      case 'whoami':
        this.printLine(`
[SYSTEM PROFILE // PRUTHVIRAJ KALE]
NAME: Pruthviraj Kale
ROLE: Senior Full-Stack & AI Systems Architect
TECH STACK: JavaScript, TypeScript, React, Next.js, Node.js, Python, WebGL, Gemini API
STATUS: Active // Available for High-Impact Projects & Roles
LOCATION: Global Node
        `);
        break;

      case 'skills':
        this.printLine(`
PRUTHVIRAJ KALE'S TECH STACK:
• Frontend: JS/TS, React, Next.js, HTML5, CSS3 Glassmorphism, WebGL, Canvas
• Backend: Node.js, Express, Python, FastAPI, Django, REST, GraphQL, PostgreSQL, MongoDB, Redis
• AI & DevOps: Gemini API, LLM Engineering, Docker, GitHub Actions, CI/CD
        `);
        break;

      case 'projects':
        this.printLine(`
FEATURED SYSTEMS BY PRUTHVIRAJ:
1. <span style="color: var(--neon-cyan);">AI Nexus Dashboard</span> - Real-time ML analytics & telemetry platform
2. <span style="color: var(--neon-cyan);">Quantum Code IDE</span> - Web-based collaborative cloud code editor
3. <span style="color: var(--neon-cyan);">Cyber Security SOC</span> - Threat intelligence global monitoring suite
        `);
        break;

      case 'contact':
        this.printLine(`
CONNECT WITH PRUTHVIRAJ KALE:
• Email: pruthviraj.kale@node.io
• Terminal Form: Scroll to section #contact
• GitHub & LinkedIn: Active Nodes
        `);
        break;

      case 'matrix':
        this.printLine(`<span style="color: var(--neon-green);">INITIALIZING MATRIX DATA STREAM OVERLOAD...</span>`);
        for (let i = 0; i < 5; i++) {
          setTimeout(() => {
            this.printLine(`<span style="color: var(--neon-green); font-size: 0.8rem;">PRUTHVIRAJ_KALE_01000110_01010101_01010100_${Math.random().toString(36).substr(2, 8)}</span>`);
          }, i * 150);
        }
        break;

      case 'sudo':
        this.printLine(`<span style="color: var(--neon-pink);">ACCESS GRANTED: Welcome Root Administrator Pruthviraj Kale.</span>`);
        break;

      case 'clear':
        this.output.innerHTML = '';
        break;

      case 'exit':
        this.close();
        break;

      default:
        this.printLine(`<span style="color: #ef4444;">Command not recognized: '${cmdStr}'. Type 'help' for available commands.</span>`);
        break;
    }

    this.output.scrollTop = this.output.scrollHeight;
  }

  printLine(text) {
    const div = document.createElement('div');
    div.style.marginBottom = '8px';
    div.innerHTML = text;
    this.output.appendChild(div);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  window.cyberTerminal = new CyberTerminal();
});
