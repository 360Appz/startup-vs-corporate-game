/* =====================================================================
   THE GREAT CAREER QUEST — Core Engine (SeededRandom, Sound, Theme, XP)
   ===================================================================== */

(function (global) {
  'use strict';

  /* ── Mulberry32 Seeded PRNG ── */
  function SeededRandom(seed) {
    this.seed = seed >>> 0;
  }
  SeededRandom.prototype.next = function () {
    this.seed = (this.seed + 0x6D2B79F5) >>> 0;
    var t = Math.imul(this.seed ^ (this.seed >>> 15), 1 | this.seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
  SeededRandom.prototype.shuffle = function (arr) {
    var a = arr.slice();
    for (var i = a.length - 1; i > 0; i--) {
      var j = Math.floor(this.next() * (i + 1));
      var tmp = a[i]; a[i] = a[j]; a[j] = tmp;
    }
    return a;
  };
  SeededRandom.prototype.pick = function (arr) {
    return arr[Math.floor(this.next() * arr.length)];
  };

  /* ── Hour Seed ── */
  function getHourSeed() {
    return Math.floor(Date.now() / 3600000);
  }

  /* ── Sound Engine (Web Audio API) ── */
  function SoundEngine() {
    this.ctx = null;
    this.enabled = true;
    this._ready = false;
  }
  SoundEngine.prototype._ensureCtx = function () {
    if (this._ready) return true;
    try {
      this.ctx = new (window.AudioContext || window.webkitAudioContext)();
      this._ready = true;
      return true;
    } catch (e) { return false; }
  };
  SoundEngine.prototype._tone = function (freq, dur, type, vol, delay) {
    if (!this.enabled || !this._ensureCtx()) return;
    var ctx = this.ctx;
    var t = ctx.currentTime + (delay || 0);
    var osc = ctx.createOscillator();
    var gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.type = type || 'sine';
    osc.frequency.setValueAtTime(freq, t);
    gain.gain.setValueAtTime(0, t);
    gain.gain.linearRampToValueAtTime(vol || 0.18, t + 0.01);
    gain.gain.exponentialRampToValueAtTime(0.001, t + dur);
    osc.start(t);
    osc.stop(t + dur + 0.05);
  };
  SoundEngine.prototype.click = function () {
    this._tone(1100, 0.05, 'sine', 0.12);
  };
  SoundEngine.prototype.swooshNext = function () {
    this._tone(500, 0.08, 'sine', 0.1);
    this._tone(700, 0.12, 'sine', 0.08, 0.06);
  };
  SoundEngine.prototype.swooshPrev = function () {
    this._tone(700, 0.08, 'sine', 0.1);
    this._tone(500, 0.12, 'sine', 0.08, 0.06);
  };
  SoundEngine.prototype.correct = function () {
    this._tone(523, 0.08, 'sine', 0.25);
    this._tone(659, 0.08, 'sine', 0.25, 0.09);
    this._tone(784, 0.18, 'sine', 0.25, 0.18);
  };
  SoundEngine.prototype.wrong = function () {
    this._tone(280, 0.04, 'sawtooth', 0.2);
    this._tone(220, 0.15, 'sawtooth', 0.15, 0.05);
  };
  SoundEngine.prototype.timeout = function () {
    for (var i = 0; i < 4; i++) {
      this._tone(400 - i * 40, 0.08, 'triangle', 0.15, i * 0.08);
    }
  };
  SoundEngine.prototype.reveal = function () {
    var freqs = [200, 280, 360, 450, 560, 700];
    for (var i = 0; i < freqs.length; i++) {
      this._tone(freqs[i], 0.09, 'sine', 0.09, i * 0.035);
    }
  };
  SoundEngine.prototype.levelUp = function () {
    var notes = [261, 329, 392, 523, 659];
    for (var i = 0; i < notes.length; i++) {
      this._tone(notes[i], 0.14, 'sine', 0.22, i * 0.1);
    }
  };
  SoundEngine.prototype.toggle = function () {
    this._tone(900, 0.03, 'sine', 0.15);
    this._tone(1200, 0.06, 'sine', 0.1, 0.04);
  };
  SoundEngine.prototype.tabSwitch = function () {
    this._tone(650, 0.08, 'sine', 0.1);
  };
  SoundEngine.prototype.quizStart = function () {
    var notes = [330, 392, 494, 659];
    for (var i = 0; i < notes.length; i++) {
      this._tone(notes[i], 0.12, 'triangle', 0.2, i * 0.09);
    }
  };
  SoundEngine.prototype.achievement = function () {
    var notes = [523, 659, 784, 1047];
    for (var i = 0; i < notes.length; i++) {
      this._tone(notes[i], 0.1, 'sine', 0.18, i * 0.07);
    }
  };
  SoundEngine.prototype.mute = function () { this.enabled = false; };
  SoundEngine.prototype.unmute = function () { this.enabled = true; this._ensureCtx(); };
  SoundEngine.prototype.toggle_mute = function () {
    this.enabled = !this.enabled;
    if (this.enabled) this._ensureCtx();
    return this.enabled;
  };

  /* ── Theme Manager ── */
  function ThemeManager(sound) {
    this.sound = sound;
    this.current = localStorage.getItem('gcq-theme') || 'light';
    document.documentElement.setAttribute('data-theme', this.current);
    this._updateBtn();
  }
  ThemeManager.prototype._updateBtn = function () {
  };
  ThemeManager.prototype.toggle = function () {
    this.current = this.current === 'light' ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', this.current);
    localStorage.setItem('gcq-theme', this.current);
    this._updateBtn();
    if (this.sound) this.sound.toggle();
  };

  /* ── XP Manager ── */
  function XPManager() {
    this.max = 100;
    this.current = 0;
    this.fill = document.getElementById('xp-fill');
    this.milestones = {};
  }
  XPManager.prototype.award = function (points, label) {
    this.current = Math.min(this.max, this.current + points);
    if (this.fill) {
      this.fill.style.width = this.current + '%';
    }
  };
  XPManager.prototype.milestone = function (id, points, label) {
    if (!this.milestones[id]) {
      this.milestones[id] = true;
      this.award(points, label);
      return true;
    }
    return false;
  };

  /* ── Achievement Manager ── */
  function AchievementManager(sound, xp) {
    this.sound = sound;
    this.xp = xp;
    this.container = document.getElementById('achievement-container');
    this.shown = {};
  }
  AchievementManager.prototype.unlock = function (id, icon, title, sub, xpPoints) {
    if (this.shown[id]) return;
    this.shown[id] = true;
    if (this.xp) this.xp.award(xpPoints || 5);
    if (this.sound) this.sound.achievement();
    if (!this.container) return;
    var toast = document.createElement('div');
    toast.className = 'achievement-toast';
    toast.innerHTML =
      '<div class="achieve-icon">' + icon + '</div>' +
      '<div><div class="achieve-label">' + title + '</div>' +
      '<div class="achieve-sub">' + sub + '</div></div>';
    this.container.appendChild(toast);
    var self = this;
    setTimeout(function () {
      toast.classList.add('out');
      setTimeout(function () {
        if (toast.parentNode) toast.parentNode.removeChild(toast);
      }, 450);
    }, 4000);
  };

  /* ── Hourly Style Applier ── */
  function HourlyStyler(rng, accentSets) {
    var set = rng.pick(accentSets);
    var root = document.documentElement;
    root.style.setProperty('--a1', set.a1);
    root.style.setProperty('--a2', set.a2);
    root.style.setProperty('--a3', set.a3);
    root.style.setProperty('--a4', set.a4);
    root.style.setProperty('--a5', set.a5);
    root.style.setProperty('--a6', set.a6);
    /* Update alpha variants */
    function hexToRgba(hex, alpha) {
      var r = parseInt(hex.slice(1,3),16);
      var g = parseInt(hex.slice(3,5),16);
      var b = parseInt(hex.slice(5,7),16);
      return 'rgba(' + r + ',' + g + ',' + b + ',' + alpha + ')';
    }
    root.style.setProperty('--a1-15', hexToRgba(set.a1, 0.13));
    root.style.setProperty('--a2-15', hexToRgba(set.a2, 0.13));
    root.style.setProperty('--a3-15', hexToRgba(set.a3, 0.13));
    root.style.setProperty('--a4-15', hexToRgba(set.a4, 0.13));
    root.style.setProperty('--a5-15', hexToRgba(set.a5, 0.13));
    root.style.setProperty('--a6-15', hexToRgba(set.a6, 0.13));
    root.style.setProperty('--grad-hero', 'linear-gradient(135deg,' + set.a1 + ' 0%,' + set.a2 + ' 100%)');
  }

  /* ── Cursor Tracker ── */
  function CursorTracker() {
    this.ring = document.getElementById('cursor-ring');
    this.dot  = document.getElementById('cursor-dot');
    if (!this.ring) return;
    this._rx = 0; this._ry = 0;
    this._cx = 0; this._cy = 0;
    this._init();
  }
  CursorTracker.prototype._init = function () {
    var self = this;
    document.addEventListener('mousemove', function (e) {
      self._cx = e.clientX;
      self._cy = e.clientY;
      if (self.dot) {
        self.dot.style.left = e.clientX + 'px';
        self.dot.style.top  = e.clientY + 'px';
      }
    }, { passive: true });
    document.addEventListener('mousedown', function () {
      document.body.classList.add('cursor-click');
    });
    document.addEventListener('mouseup', function () {
      document.body.classList.remove('cursor-click');
    });
    /* Hover detection */
    var interactives = 'a,button,[role="button"],label,input,select,textarea,.carousel-btn,.tab-btn,.quiz-option';
    document.addEventListener('mouseover', function (e) {
      if (e.target.closest(interactives)) document.body.classList.add('cursor-hover');
    });
    document.addEventListener('mouseout', function (e) {
      if (e.target.closest(interactives)) document.body.classList.remove('cursor-hover');
    });
    this._tick();
  };
  CursorTracker.prototype._tick = function () {
    var self = this;
    this._rx += (this._cx - this._rx) * 0.12;
    this._ry += (this._cy - this._ry) * 0.12;
    if (this.ring) {
      this.ring.style.left = this._rx + 'px';
      this.ring.style.top  = this._ry + 'px';
    }
    requestAnimationFrame(function () { self._tick(); });
  };

  /* ── Scroll Parallax ── */
  function initParallax() {
    var lastY = 0;
    function update() {
      var y = window.scrollY;
      if (Math.abs(y - lastY) > 0.5) {
        document.documentElement.style.setProperty('--scroll-y', y + 'px');
        lastY = y;
      }
      requestAnimationFrame(update);
    }
    requestAnimationFrame(update);
  }

  /* ── Intersection Observer for Reveals ── */
  function initRevealObserver(achievements, xp) {
    var chapterXP = {
      'ch-myths':  { id: 'myths',  icon: '🔥', title: 'Myth Buster', sub: '+5 XP — Myths revealed', xp: 5 },
      'ch-battle': { id: 'battle', icon: '⚔️', title: 'Reality Check', sub: '+5 XP — Battlefield entered', xp: 5 },
      'ch-money':  { id: 'money',  icon: '💰', title: 'Money Moves',   sub: '+5 XP — Counting the cost', xp: 5 },
      'ch-gems':   { id: 'gems',   icon: '💎', title: 'Treasure Hunter', sub: '+10 XP — Vault unlocked', xp: 10 },
      'ch-faith':  { id: 'faith',  icon: '✝️', title: 'Faith & Work',  sub: '+5 XP — Perspective gained', xp: 5 },
      'ch-bottom': { id: 'bottom', icon: '🏁', title: 'Quest Complete', sub: '+10 XP — You finished!', xp: 10 }
    };
    var revealObs = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          e.target.classList.add('visible');
          revealObs.unobserve(e.target);
        }
      });
    }, { threshold: 0.12 });

    var chapterObs = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          var id = e.target.id;
          if (chapterXP[id] && achievements) {
            var c = chapterXP[id];
            achievements.unlock(c.id, c.icon, c.title, c.sub, c.xp);
          }
          chapterObs.unobserve(e.target);
        }
      });
    }, { threshold: 0.25 });

    document.querySelectorAll('.reveal,.reveal-left,.reveal-right,.reveal-scale').forEach(function (el) {
      revealObs.observe(el);
    });
    document.querySelectorAll('[data-chapter]').forEach(function (el) {
      chapterObs.observe(el);
    });
  }

  /* ── Exports ── */
  global.GCQ = global.GCQ || {};
  global.GCQ.SeededRandom     = SeededRandom;
  global.GCQ.SoundEngine      = SoundEngine;
  global.GCQ.ThemeManager     = ThemeManager;
  global.GCQ.XPManager        = XPManager;
  global.GCQ.AchievementManager = AchievementManager;
  global.GCQ.HourlyStyler     = HourlyStyler;
  global.GCQ.CursorTracker    = CursorTracker;
  global.GCQ.initParallax     = initParallax;
  global.GCQ.initRevealObserver = initRevealObserver;
  global.GCQ.getHourSeed      = getHourSeed;

}(window));
