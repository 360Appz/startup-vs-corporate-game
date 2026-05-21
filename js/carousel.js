/* =====================================================================
   THE GREAT CAREER QUEST — Carousel Component
   ===================================================================== */

(function (global) {
  'use strict';

  /**
   * Carousel
   * @param {HTMLElement} root  - The .carousel-wrap element
   * @param {Object}      sound - SoundEngine instance (optional)
   */
  function Carousel(root, sound) {
    this.root    = root;
    this.sound   = sound || null;
    this.items   = Array.from(root.querySelectorAll('.carousel-item'));
    this.current = 0;
    this.total   = this.items.length;
    this.dir     = 'next'; // last navigation direction
    this._touchStartX = 0;
    this._touchStartY = 0;
    this._bound = {};
    if (this.total > 0) this._init();
  }

  Carousel.prototype._init = function () {
    var self = this;
    /* Buttons */
    this._prevBtn = this.root.querySelector('[data-carousel-prev]');
    this._nextBtn = this.root.querySelector('[data-carousel-next]');
    this._counter = this.root.querySelector('[data-carousel-counter]');

    this._bound.prev = function (e) { e.preventDefault(); self.prev(); };
    this._bound.next = function (e) { e.preventDefault(); self.next(); };

    if (this._prevBtn) this._prevBtn.addEventListener('click', this._bound.prev);
    if (this._nextBtn) this._nextBtn.addEventListener('click', this._bound.next);

    /* Keyboard navigation when focused */
    this.root.setAttribute('tabindex', '0');
    this.root.addEventListener('keydown', function (e) {
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') { e.preventDefault(); self.next(); }
      if (e.key === 'ArrowLeft'  || e.key === 'ArrowUp')   { e.preventDefault(); self.prev(); }
    });

    /* Touch / swipe */
    var track = this.root.querySelector('.carousel-track');
    if (track) {
      track.addEventListener('touchstart', function (e) {
        self._touchStartX = e.touches[0].clientX;
        self._touchStartY = e.touches[0].clientY;
      }, { passive: true });
      track.addEventListener('touchend', function (e) {
        var dx = e.changedTouches[0].clientX - self._touchStartX;
        var dy = e.changedTouches[0].clientY - self._touchStartY;
        if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 44) {
          dx < 0 ? self.next() : self.prev();
        }
      }, { passive: true });
    }

    this._render();
  };

  Carousel.prototype._render = function () {
    var self = this;
    this.items.forEach(function (item, i) {
      item.classList.remove('active', 'prev', 'next');
      if (i === self.current) {
        item.classList.add('active');
      } else if (i < self.current) {
        item.classList.add('prev');
      } else {
        item.classList.add('next');
      }
    });

    if (this._counter) {
      this._counter.textContent = (this.current + 1) + ' / ' + this.total;
    }
    if (this._prevBtn) {
      this._prevBtn.disabled = (this.current === 0);
      this._prevBtn.setAttribute('aria-disabled', this.current === 0);
    }
    if (this._nextBtn) {
      this._nextBtn.disabled = (this.current === this.total - 1);
      this._nextBtn.setAttribute('aria-disabled', this.current === this.total - 1);
    }
  };

  Carousel.prototype.next = function () {
    if (this.current >= this.total - 1) return;
    this.dir = 'next';
    this.current++;
    if (this.sound) this.sound.swooshNext();
    this._render();
  };

  Carousel.prototype.prev = function () {
    if (this.current <= 0) return;
    this.dir = 'prev';
    this.current--;
    if (this.sound) this.sound.swooshPrev();
    this._render();
  };

  Carousel.prototype.goTo = function (index) {
    if (index < 0 || index >= this.total) return;
    this.dir = index > this.current ? 'next' : 'prev';
    this.current = index;
    this._render();
  };

  Carousel.prototype.destroy = function () {
    if (this._prevBtn) this._prevBtn.removeEventListener('click', this._bound.prev);
    if (this._nextBtn) this._nextBtn.removeEventListener('click', this._bound.next);
  };

  /* ── Tab Group ── */
  function TabGroup(root, sound, carousels) {
    this.root     = root;
    this.sound    = sound || null;
    this.carousels = carousels || {};
    this._init();
  }

  TabGroup.prototype._init = function () {
    var self = this;
    var btns   = this.root.querySelectorAll('.tab-btn');
    var panels = this.root.querySelectorAll('.tab-panel');

    btns.forEach(function (btn) {
      btn.addEventListener('click', function () {
        var target = btn.dataset.tab;
        btns.forEach(function (b) { b.classList.remove('active'); b.setAttribute('aria-selected', 'false'); });
        panels.forEach(function (p) { p.classList.remove('active'); });
        btn.classList.add('active');
        btn.setAttribute('aria-selected', 'true');
        var panel = self.root.querySelector('[data-panel="' + target + '"]');
        if (panel) panel.classList.add('active');
        if (self.sound) self.sound.tabSwitch();
      });
    });
  };

  /* ── Init all carousels & tab groups on a given root ── */
  function initAll(root, sound) {
    root = root || document;
    var instances = [];
    root.querySelectorAll('.carousel-wrap').forEach(function (el) {
      instances.push(new Carousel(el, sound));
    });
    root.querySelectorAll('.tab-group').forEach(function (el) {
      new TabGroup(el, sound);
    });
    return instances;
  }

  /* ── Exports ── */
  global.GCQ = global.GCQ || {};
  global.GCQ.Carousel   = Carousel;
  global.GCQ.TabGroup   = TabGroup;
  global.GCQ.initAll    = initAll;

}(window));
