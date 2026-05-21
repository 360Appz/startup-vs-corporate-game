/* =====================================================================
   THE GREAT CAREER QUEST — Canvas Particle System
   ===================================================================== */

(function (global) {
  'use strict';

  function ParticleSystem(canvasId) {
    this.canvas = document.getElementById(canvasId);
    if (!this.canvas) return;
    this.ctx = this.canvas.getContext('2d');
    this.particles = [];
    this.mouse = { x: -999, y: -999 };
    this.COUNT = 48;
    this.CONNECT_DIST = 130;
    this.running = true;
    this._resize();
    this._spawn();
    this._bindEvents();
    this._tick();
  }

  ParticleSystem.prototype._resize = function () {
    var canvas = this.canvas;
    var dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width  = canvas.offsetWidth  * dpr;
    canvas.height = canvas.offsetHeight * dpr;
    this.ctx.scale(dpr, dpr);
    this._w = canvas.offsetWidth;
    this._h = canvas.offsetHeight;
    this._dpr = dpr;
  };

  ParticleSystem.prototype._spawn = function () {
    this.particles = [];
    for (var i = 0; i < this.COUNT; i++) {
      this.particles.push({
        x:   Math.random() * this._w,
        y:   Math.random() * this._h,
        vx:  (Math.random() - 0.5) * 0.55,
        vy:  (Math.random() - 0.5) * 0.55,
        r:   Math.random() * 2.2 + 0.8,
        a:   Math.random() * 0.5 + 0.2
      });
    }
  };

  ParticleSystem.prototype._bindEvents = function () {
    var self = this;
    window.addEventListener('resize', function () {
      self._resize();
      self._spawn();
    }, { passive: true });
    document.addEventListener('mousemove', function (e) {
      var rect = self.canvas.getBoundingClientRect();
      self.mouse.x = e.clientX - rect.left;
      self.mouse.y = e.clientY - rect.top;
    }, { passive: true });
    document.addEventListener('touchmove', function (e) {
      if (e.touches.length > 0) {
        var rect = self.canvas.getBoundingClientRect();
        self.mouse.x = e.touches[0].clientX - rect.left;
        self.mouse.y = e.touches[0].clientY - rect.top;
      }
    }, { passive: true });
  };

  ParticleSystem.prototype._getAccentColor = function () {
    return getComputedStyle(document.documentElement).getPropertyValue('--a1').trim() || '#FF1463';
  };

  ParticleSystem.prototype._getAccentColor2 = function () {
    return getComputedStyle(document.documentElement).getPropertyValue('--a2').trim() || '#6B2FFF';
  };

  ParticleSystem.prototype._tick = function () {
    var self = this;
    if (!this.running) return;
    var ctx = this.ctx;
    var w = this._w;
    var h = this._h;
    var c1 = this._getAccentColor();
    var c2 = this._getAccentColor2();

    ctx.clearRect(0, 0, w, h);

    /* Update & draw particles */
    for (var i = 0; i < this.particles.length; i++) {
      var p = this.particles[i];
      /* Mouse repulsion */
      var mdx = p.x - this.mouse.x;
      var mdy = p.y - this.mouse.y;
      var md  = Math.sqrt(mdx * mdx + mdy * mdy);
      if (md < 90 && md > 0) {
        var force = (90 - md) / 90 * 0.6;
        p.vx += (mdx / md) * force;
        p.vy += (mdy / md) * force;
      }
      /* Damping */
      p.vx *= 0.99;
      p.vy *= 0.99;
      /* Speed cap */
      var spd = Math.sqrt(p.vx * p.vx + p.vy * p.vy);
      if (spd > 1.2) { p.vx = (p.vx / spd) * 1.2; p.vy = (p.vy / spd) * 1.2; }
      p.x += p.vx;
      p.y += p.vy;
      /* Wrap */
      if (p.x < -5) p.x = w + 5;
      if (p.x > w + 5) p.x = -5;
      if (p.y < -5) p.y = h + 5;
      if (p.y > h + 5) p.y = -5;
      /* Draw */
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = c1;
      ctx.globalAlpha = p.a * 0.7;
      ctx.fill();
    }

    /* Connect nearby particles */
    for (var i = 0; i < this.particles.length - 1; i++) {
      for (var j = i + 1; j < this.particles.length; j++) {
        var a = this.particles[i];
        var b = this.particles[j];
        var dx = a.x - b.x;
        var dy = a.y - b.y;
        var dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < this.CONNECT_DIST) {
          var alpha = (1 - dist / this.CONNECT_DIST) * 0.18;
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.strokeStyle = c2;
          ctx.globalAlpha = alpha;
          ctx.lineWidth = 0.8;
          ctx.stroke();
        }
      }
    }

    ctx.globalAlpha = 1;
    requestAnimationFrame(function () { self._tick(); });
  };

  ParticleSystem.prototype.destroy = function () {
    this.running = false;
  };

  /* ── Exports ── */
  global.GCQ = global.GCQ || {};
  global.GCQ.ParticleSystem = ParticleSystem;

}(window));
