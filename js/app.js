/* =====================================================================
   THE GREAT CAREER QUEST — App Init & Content Renderer
   ===================================================================== */

(function (global) {
  'use strict';

  var D = global.GCQ; /* namespace shorthand */

  /* ────────────────────────────────────────────
     Helpers
  ──────────────────────────────────────────── */
  function el(tag, cls, html) {
    var e = document.createElement(tag);
    if (cls) e.className = cls;
    if (html !== undefined) e.innerHTML = html;
    return e;
  }
  function ul(items, cls) {
    var list = el('ul', cls || '');
    items.forEach(function (t) {
      var li = document.createElement('li');
      li.textContent = t;
      list.appendChild(li);
    });
    return list;
  }
  function carouselShell(id, items, renderFn) {
    var wrap = el('div', 'carousel-wrap');
    wrap.setAttribute('aria-label', id + ' carousel');
    /* Nav */
    var nav = el('div', 'carousel-nav');
    var prevBtn = el('button', 'carousel-btn', '&#8592;');
    prevBtn.setAttribute('data-carousel-prev', '');
    prevBtn.setAttribute('aria-label', 'Previous');
    var counter = el('span', 'carousel-counter');
    counter.setAttribute('data-carousel-counter', '');
    counter.textContent = '1 / ' + items.length;
    var nextBtn = el('button', 'carousel-btn', '&#8594;');
    nextBtn.setAttribute('data-carousel-next', '');
    nextBtn.setAttribute('aria-label', 'Next');
    nav.appendChild(prevBtn);
    nav.appendChild(counter);
    nav.appendChild(nextBtn);
    wrap.appendChild(nav);
    /* Track */
    var track = el('div', 'carousel-track');
    track.setAttribute('aria-live', 'polite');
    items.forEach(function (item, i) {
      var slide = el('div', 'carousel-item' + (i === 0 ? ' active' : ''));
      slide.setAttribute('data-slide', i);
      slide.setAttribute('role', 'group');
      slide.setAttribute('aria-roledescription', 'slide');
      slide.appendChild(renderFn(item, i));
      track.appendChild(slide);
    });
    wrap.appendChild(track);
    return wrap;
  }

  function renderStartupEntrepreneurCard(item) {
    var card = el('div', 'content-card glass-card glass-card--solid');
    card.style.setProperty('--card-accent', item.accent);
    var accent = el('div', 'content-card__accent');
    accent.style.background = item.accent;
    card.appendChild(accent);
    var eyebrow = el('div', 'content-card__eyebrow');
    eyebrow.innerHTML = item.icon + ' ' + item.title;
    card.appendChild(eyebrow);
    card.appendChild(el('p', 'mt-md', item.description));
    card.appendChild(el('h5', 'mt-md', item.listTitle));
    card.appendChild(ul(item.items, 'mt-md'));
    if (item.note) {
      var note = el('p', 'mt-md');
      note.style.cssText = 'font-size:.82rem;color:var(--text-3);font-style:italic';
      note.textContent = item.note;
      card.appendChild(note);
    }
    card.appendChild(el('div', 'highlight-box mt-md', item.truth));
    return card;
  }

  function renderClonedCard(node) {
    return node.cloneNode(true);
  }

  /* ────────────────────────────────────────────
     Renderers
  ──────────────────────────────────────────── */
  function renderMythCard(myth) {
    var card = el('div', 'content-card glass-card glass-card--solid');
    card.style.setProperty('--card-accent', myth.accentColor);
    card.style.setProperty('--card-accent-15', myth.accentBg);
    var accent = el('div', 'content-card__accent');
    accent.style.background = myth.accentColor;
    card.appendChild(accent);
    var badge = el('div', 'truth-badge');
    badge.innerHTML = myth.icon + ' ' + myth.num;
    card.appendChild(badge);
    card.appendChild(el('h3', '', myth.title));
    var intro = el('p', 'mt-md');
    intro.innerHTML = myth.reality || myth.verdict || '';
    card.appendChild(intro);

    if (myth.points) {
      var list = ul(myth.points);
      list.className = 'mt-md';
      card.appendChild(list);
    }
    if (myth.gives) {
      var h5a = el('h5', 'mt-md', 'What Corporate Gives:');
      card.appendChild(h5a);
      card.appendChild(ul(myth.gives));
      var h5b = el('h5', 'mt-md', 'Hidden Risks:');
      card.appendChild(h5b);
      card.appendChild(ul(myth.hiddenRisks));
      var statP = el('p', 'mt-md');
      statP.innerHTML = myth.stats;
      card.appendChild(statP);
    }
    if (myth.reasons) {
      card.appendChild(el('p', 'mt-md', 'Many people stay in corporate not because they lack courage, but because they have:'));
      card.appendChild(ul(myth.reasons));
    }
    var box = el('div', 'highlight-box mt-md');
    box.innerHTML = myth.hardTruth || myth.underratedTruth || myth.note || '';
    card.appendChild(box);
    return card;
  }

  function renderMediaLieCard(lie) {
    var card = el('div', 'content-card glass-card glass-card--solid');
    card.style.setProperty('--card-accent', lie.accentColor);
    card.style.setProperty('--card-accent-15', lie.accentBg);
    var accent = el('div', 'content-card__accent');
    accent.style.background = lie.accentColor;
    card.appendChild(accent);
    var badge = el('div', 'truth-badge');
    badge.innerHTML = lie.icon + ' §' + lie.num;
    card.appendChild(badge);
    card.appendChild(el('h3', '', lie.title));

    if (lie.mediaLoves) {
      card.appendChild(el('h5', 'mt-md', 'Media loves:'));
      card.appendChild(ul(lie.mediaLoves));
      card.appendChild(el('p', 'mt-md', lie.reality));
      if (lie.stat) card.appendChild(el('p', 'mt-md', lie.stat));
      var box = el('div', 'highlight-box mt-md', lie.translation);
      card.appendChild(box);
    }
    if (lie.fundingMeans) {
      card.appendChild(el('h5', 'mt-md', 'Funding can mean:'));
      card.appendChild(ul(lie.fundingMeans));
      var mh = el('div', 'highlight-box mt-md');
      mh.innerHTML = '<strong>Media headline:</strong> ' + lie.mediaHeadline + '<br><strong>Better question:</strong> ' + lie.betterQuestion;
      card.appendChild(mh);
    }
    if (lie.mediaShows) {
      card.appendChild(el('p', 'mt-md', lie.truth));
      var cols = el('div', 'faith-grid mt-md');
      var showCol = el('div', '');
      showCol.appendChild(el('h5', '', 'Media shows:'));
      showCol.appendChild(ul(lie.mediaShows));
      var hideCol = el('div', '');
      hideCol.appendChild(el('h5', '', 'Media hides:'));
      hideCol.appendChild(ul(lie.mediaHides));
      cols.appendChild(showCol);
      cols.appendChild(hideCol);
      card.appendChild(cols);
      var box2 = el('div', 'highlight-box mt-md', lie.hardTruth);
      card.appendChild(box2);
    }
    if (lie.verdict) {
      card.appendChild(el('p', 'mt-md'));
      var vBox = el('div', 'highlight-box mt-md');
      vBox.innerHTML = '<strong>' + lie.verdict + '</strong> ' + lie.note;
      card.appendChild(vBox);
    }
    return card;
  }

  function renderRealityCard(r, isStartup) {
    var card = el('div', 'content-card glass-card glass-card--solid');
    card.style.setProperty('--card-accent', r.accentColor);
    card.style.setProperty('--card-accent-15', r.accentBg);
    var accent = el('div', 'content-card__accent');
    accent.style.background = r.accentColor;
    card.appendChild(accent);
    var badge = el('div', 'truth-badge');
    badge.innerHTML = r.icon + ' §' + r.num;
    card.appendChild(badge);
    card.appendChild(el('h3', '', r.title));

    /* Render flexible content — intro first, then lists */
    if (r.intro)   card.appendChild(el('p', 'mt-md', r.intro));
    if (r.context) card.appendChild(el('p', 'mt-md', r.context));

    var keys = isStartup
      ? ['hardParts','scenarios','whenCashIsLow','alignment','learnList']
      : ['rewardedFor','dependsOn','trainsYouToWait','weakenedSkills','toxicPolitics'];
    keys.forEach(function (k) {
      if (r[k]) {
        var lbl = {
          hardParts: 'The hard parts are often:', scenarios: 'Startup reality check:',
          whenCashIsLow: 'When cash is low:', alignment: 'You need alignment on:',
          learnList: 'In a startup, you may learn:',
          rewardedFor: 'People are rewarded for:', dependsOn: 'Day-to-day experience depends on:',
          trainsYouToWait: 'Corporate trains you to wait:', weakenedSkills: 'Skills that may weaken:',
          toxicPolitics: 'Toxic politics includes:'
        }[k] || '';
        if (lbl) card.appendChild(el('h5', 'mt-md', lbl));
        card.appendChild(ul(r[k]));
      }
    });
    if (r.stat)     { var sp = el('p', 'mt-md'); sp.style.cssText = 'font-size:.8rem;color:var(--text-3);font-style:italic'; sp.textContent = r.stat; card.appendChild(sp); }
    if (r.but)      card.appendChild(el('p', 'mt-md', r.but));
    if (r.advantage) {
      var adv = el('div', 'highlight-box mt-md');
      adv.innerHTML = '<strong>Advantage:</strong> ' + r.advantage + (r.danger ? '<br><strong>Danger:</strong> ' + r.danger : '');
      card.appendChild(adv);
    }
    var truthKey = r.hardTruth || r.reality || r.hiddenReality || r.underratedSkill || r.survivalSkill;
    if (truthKey) {
      var tbox = el('div', 'highlight-box mt-md');
      tbox.innerHTML = truthKey;
      card.appendChild(tbox);
    }
    return card;
  }

  function renderGemCard(gem) {
    var card = el('div', 'content-card glass-card glass-card--solid');
    card.style.setProperty('--card-accent', gem.accentColor);
    var accent = el('div', 'content-card__accent');
    accent.style.background = gem.accentColor;
    card.appendChild(accent);
    var badge = el('div', 'truth-badge');
    badge.innerHTML = gem.icon + ' §' + gem.num;
    card.appendChild(badge);
    card.appendChild(el('h3', '', gem.title));
    if (gem.intro) card.appendChild(el('p', 'mt-md', gem.intro));
    var listKey = gem.points || gem.teaches || gem.understands || gem.remembered || gem.examples ||
                  gem.proves || gem.range || gem.canLearn || gem.helps || gem.networkList ||
                  gem.teaches || gem.skills || gem.funds;
    if (listKey) card.appendChild(ul(listKey, 'mt-md'));
    if (gem.note) {
      var box = el('div', 'highlight-box mt-md', gem.note);
      card.appendChild(box);
    }
    if (gem.gem) {
      var gbox = el('div', 'highlight-box mt-md');
      gbox.innerHTML = '<strong>Gem:</strong> ' + gem.gem;
      card.appendChild(gbox);
    }
    if (gem.hiddenTruth) {
      var htbox = el('div', 'highlight-box mt-md', gem.hiddenTruth);
      card.appendChild(htbox);
    }
    if (gem.strategy) {
      var sbox = el('div', 'highlight-box mt-md');
      sbox.innerHTML = '<strong>Underrated strategy:</strong> ' + gem.strategy;
      card.appendChild(sbox);
    }
    return card;
  }

  function renderOverratedCard(item, path) {
    var card = el('div', 'content-card glass-card glass-card--solid');
    card.style.setProperty('--card-accent', item.accentColor);
    var accent = el('div', 'content-card__accent');
    accent.style.background = item.accentColor;
    card.appendChild(accent);
    var badge = el('div', 'truth-badge');
    badge.innerHTML = item.icon + ' §' + item.num;
    card.appendChild(badge);
    card.appendChild(el('h3', '', item.title));
    if (item.text) card.appendChild(el('p', 'mt-md', item.text));
    if (item.reasons) { card.appendChild(el('h5', 'mt-md', 'Founders raise money because:')); card.appendChild(ul(item.reasons)); }
    if (item.wantList) card.appendChild(ul(item.wantList, 'mt-md'));
    if (item.askInstead) { card.appendChild(el('h5', 'mt-md', 'Ask instead:')); card.appendChild(ul(item.askInstead)); }
    if (item.overrated) { card.appendChild(el('h5', 'mt-md', 'Overrated:')); card.appendChild(ul(item.overrated)); }
    if (item.underrated) { card.appendChild(el('h5', 'mt-md', 'Underrated:')); card.appendChild(ul(item.underrated)); }
    if (item.promotionGives) { card.appendChild(el('h5', 'mt-md', 'A promotion may give:')); card.appendChild(ul(item.promotionGives)); }
    if (item.activityList) { card.appendChild(el('h5', 'mt-md', 'Often confused with value:')); card.appendChild(ul(item.activityList)); }
    var note = item.alternative || item.note || item.hardTruth || item.warning || item.betterQuestion;
    if (note) { card.appendChild(el('div', 'highlight-box mt-md', note)); }
    return card;
  }

  function renderPathCard(path) {
    var card = el('div', 'content-card glass-card glass-card--solid');
    card.style.setProperty('--card-accent', path.accentColor);
    card.style.setProperty('--card-accent-15', path.accentBg);
    var accent = el('div', 'content-card__accent');
    accent.style.background = path.accentColor;
    card.appendChild(accent);
    var badge = el('div', 'truth-badge');
    badge.innerHTML = path.icon + ' ' + path.path;
    card.appendChild(badge);
    card.appendChild(el('h3', '', path.path));
    card.appendChild(el('p', 'mt-md', path.suits));
    card.appendChild(ul(path.list, 'mt-md'));
    if (path.note) card.appendChild(el('div', 'highlight-box mt-md', path.note));
    return card;
  }

  function renderMediaMissCard(m) {
    var card = el('div', 'content-card glass-card glass-card--solid');
    card.style.setProperty('--card-accent', m.accentColor);
    var accent = el('div', 'content-card__accent');
    accent.style.background = m.accentColor;
    card.appendChild(accent);
    var badge = el('div', 'truth-badge');
    badge.innerHTML = m.icon + ' §' + m.num;
    card.appendChild(badge);
    card.appendChild(el('h3', '', m.title));
    card.appendChild(el('p', 'mt-md', m.text));
    if (m.insight) card.appendChild(el('div', 'highlight-box mt-md', m.insight));
    if (m.points) card.appendChild(ul(m.points, 'mt-md'));
    if (m.ask) { card.appendChild(el('h5', 'mt-md', 'Ask yourself:')); card.appendChild(ul(m.ask)); }
    return card;
  }

  function renderSummaryCard(row) {
    var card = el('div', 'ledger-card glass-card glass-card--solid');
    var pathEl = el('div', '');
    pathEl.appendChild(el('div', 'ledger-path', row.path));
    var overEl = el('div', '');
    overEl.appendChild(el('div', 'ledger-over', row.overrated));
    var underEl = el('div', '');
    underEl.appendChild(el('div', 'ledger-under', row.gem));
    card.appendChild(pathEl);
    card.appendChild(overEl);
    card.appendChild(underEl);
    return card;
  }

  /* ────────────────────────────────────────────
     Populate carousels & dynamic content
  ──────────────────────────────────────────── */
  function populate() {
    var seed = D.getHourSeed();
    var rng  = new D.SeededRandom(seed);

    /* Apply hourly accent colors */
    new D.HourlyStyler(rng, D.ACCENT_SETS);

    /* ── Quote of the Day (hero) ── */
    var shuffledQ = rng.shuffle(D.QUOTES);
    var todayQ = shuffledQ[0];
    var heroQ  = document.getElementById('hero-quote');
    var heroQSrc = document.getElementById('hero-quote-source');
    if (heroQ)    heroQ.textContent    = todayQ.text;
    if (heroQSrc) heroQSrc.textContent = '— ' + todayQ.source;

    /* ── QOTD ── */
    var shuffledQOTD = rng.shuffle(D.QOTD);
    var todayQOTD = shuffledQOTD[0];
    var qotdQ = document.getElementById('qotd-question');
    var qotdR = document.getElementById('qotd-reflection');
    if (qotdQ) qotdQ.textContent = todayQOTD.q;
    if (qotdR) qotdR.textContent = todayQOTD.reflection;

    /* QOTD navigation */
    var qotdIdx = 0;
    var qotdPrev = document.getElementById('qotd-prev');
    var qotdNext = document.getElementById('qotd-next');
    var qotdNum  = document.getElementById('qotd-num');
    function updateQOTD() {
      if (qotdQ) qotdQ.textContent = shuffledQOTD[qotdIdx].q;
      if (qotdR) qotdR.textContent = shuffledQOTD[qotdIdx].reflection;
      if (qotdNum) qotdNum.textContent = (qotdIdx + 1) + ' / ' + shuffledQOTD.length;
    }
    if (qotdPrev) qotdPrev.addEventListener('click', function () {
      qotdIdx = (qotdIdx - 1 + shuffledQOTD.length) % shuffledQOTD.length;
      updateQOTD();
    });
    if (qotdNext) qotdNext.addEventListener('click', function () {
      qotdIdx = (qotdIdx + 1) % shuffledQOTD.length;
      updateQOTD();
    });
    if (qotdNum) qotdNum.textContent = '1 / ' + shuffledQOTD.length;

    /* ── Myths Carousel ── */
    var mythsContainer = document.getElementById('carousel-myths-host');
    if (mythsContainer) {
      mythsContainer.appendChild(carouselShell('myths', D.MYTHS, renderMythCard));
    }

    /* ── Media Lies Carousel ── */
    var mediaContainer = document.getElementById('carousel-media-host');
    if (mediaContainer) {
      mediaContainer.appendChild(carouselShell('media', D.MEDIA_LIES, renderMediaLieCard));
    }

    /* ── Startup vs Entrepreneurship: mobile/tablet carousel ── */
    var vsHost = document.getElementById('carousel-vs-host');
    if (vsHost && D.STARTUP_VS_ENT) {
      var vs = D.STARTUP_VS_ENT;
      var vsItems = [
        {
          title: vs.startup.title,
          icon: vs.startup.icon,
          description: vs.startup.description,
          listTitle: 'Typical traits:',
          items: vs.startup.traits,
          truth: vs.startup.truth,
          accent: 'var(--a1)'
        },
        {
          title: vs.entrepreneurship.title,
          icon: vs.entrepreneurship.icon,
          description: vs.entrepreneurship.description + ' It can include:',
          listTitle: 'Examples:',
          items: vs.entrepreneurship.examples,
          note: vs.entrepreneurship.kauffman,
          truth: vs.entrepreneurship.truth,
          accent: 'var(--a3)'
        }
      ];
      vsHost.appendChild(carouselShell('startup-vs-entrepreneurship', vsItems, renderStartupEntrepreneurCard));
    }

    /* ── Startup Realities ── */
    var startupRealContainer = document.getElementById('carousel-startup-real-host');
    if (startupRealContainer) {
      startupRealContainer.appendChild(carouselShell('startup-realities', D.STARTUP_REALITIES, function (r) { return renderRealityCard(r, true); }));
    }

    /* ── Corporate Realities ── */
    var corpRealContainer = document.getElementById('carousel-corp-real-host');
    if (corpRealContainer) {
      corpRealContainer.appendChild(carouselShell('corp-realities', D.CORP_REALITIES, function (r) { return renderRealityCard(r, false); }));
    }

    /* ── Money Reality: mobile/tablet carousel from existing cards ── */
    var moneyHost = document.getElementById('carousel-money-host');
    var moneyGrid = document.getElementById('money-card-grid');
    if (moneyHost && moneyGrid) {
      var moneyCards = Array.from(moneyGrid.querySelectorAll('.money-card'));
      moneyHost.appendChild(carouselShell('money-paths', moneyCards, renderClonedCard));
    }

    /* ── Hidden Costs: Startup ── */
    var hcStartupHost = document.getElementById('carousel-hc-startup-host');
    if (hcStartupHost) {
      var hcSItems = [
        { label: 'Financial', icon: '💸', items: D.HIDDEN_COSTS.startup.financial, accent: 'var(--a1)' },
        { label: 'Emotional', icon: '😰', items: D.HIDDEN_COSTS.startup.emotional, accent: 'var(--a2)' },
        { label: 'Relational', icon: '💔', items: D.HIDDEN_COSTS.startup.relational, accent: 'var(--a5)' },
        { label: 'Spiritual / Moral', icon: '🙏', items: D.HIDDEN_COSTS.startup.spiritual, accent: 'var(--a4)', extra: D.HIDDEN_COSTS.startup.christianLens }
      ];
      hcStartupHost.appendChild(carouselShell('hc-startup', hcSItems, function (item) {
        var card = el('div', 'content-card glass-card glass-card--solid');
        card.style.setProperty('--card-accent', item.accent);
        var acc = el('div', 'content-card__accent'); acc.style.background = item.accent;
        card.appendChild(acc);
        var badge = el('div', 'truth-badge'); badge.innerHTML = item.icon + ' ' + item.label; card.appendChild(badge);
        card.appendChild(el('h3', '', item.label + ' Costs'));
        card.appendChild(ul(item.items, 'mt-md'));
        if (item.extra) card.appendChild(el('div', 'highlight-box mt-md', item.extra));
        return card;
      }));
    }

    /* ── Hidden Costs: Corporate ── */
    var hcCorpHost = document.getElementById('carousel-hc-corp-host');
    if (hcCorpHost) {
      var hcCItems = [
        { label: 'Financial', icon: '💸', items: D.HIDDEN_COSTS.corporate.financial, accent: 'var(--a6)' },
        { label: 'Emotional', icon: '😶', items: D.HIDDEN_COSTS.corporate.emotional, accent: 'var(--a2)' },
        { label: 'Relational', icon: '🤝', items: D.HIDDEN_COSTS.corporate.relational, accent: 'var(--a5)' },
        { label: 'Spiritual / Moral', icon: '🙏', items: D.HIDDEN_COSTS.corporate.spiritual, accent: 'var(--a4)', extra: D.HIDDEN_COSTS.corporate.christianLens }
      ];
      hcCorpHost.appendChild(carouselShell('hc-corp', hcCItems, function (item) {
        var card = el('div', 'content-card glass-card glass-card--solid');
        card.style.setProperty('--card-accent', item.accent);
        var acc = el('div', 'content-card__accent'); acc.style.background = item.accent;
        card.appendChild(acc);
        var badge = el('div', 'truth-badge'); badge.innerHTML = item.icon + ' ' + item.label; card.appendChild(badge);
        card.appendChild(el('h3', '', item.label + ' Costs'));
        card.appendChild(ul(item.items, 'mt-md'));
        if (item.extra) card.appendChild(el('div', 'highlight-box mt-md', item.extra));
        return card;
      }));
    }

    /* ── Overrated: Startups ── */
    var ovStartupHost = document.getElementById('carousel-ov-startup-host');
    if (ovStartupHost) {
      ovStartupHost.appendChild(carouselShell('ov-startup', D.OVERRATED.startups, function (r) { return renderOverratedCard(r, 'startup'); }));
    }

    /* ── Overrated: Corporate ── */
    var ovCorpHost = document.getElementById('carousel-ov-corp-host');
    if (ovCorpHost) {
      ovCorpHost.appendChild(carouselShell('ov-corp', D.OVERRATED.corporate, function (r) { return renderOverratedCard(r, 'corp'); }));
    }

    /* ── Hidden Gems: Startups ── */
    var gemStartupHost = document.getElementById('carousel-gem-startup-host');
    if (gemStartupHost) {
      gemStartupHost.appendChild(carouselShell('gem-startup', D.HIDDEN_GEMS.startups, renderGemCard));
    }

    /* ── Hidden Gems: Corporate ── */
    var gemCorpHost = document.getElementById('carousel-gem-corp-host');
    if (gemCorpHost) {
      gemCorpHost.appendChild(carouselShell('gem-corp', D.HIDDEN_GEMS.corporate, renderGemCard));
    }

    /* ── Hidden Gems: Employee ── */
    var gemEmpHost = document.getElementById('carousel-gem-emp-host');
    if (gemEmpHost) {
      var empData = D.HIDDEN_GEMS.employee;
      var empItems = [
        { title: 'Benefits', icon: '👤', items: empData.benefits, note: null, accent: 'var(--a3)' },
        { title: 'Risks', icon: '⚠️', items: empData.risks, note: '<strong>Best profile:</strong> ' + empData.profile, accent: 'var(--a1)' }
      ];
      gemEmpHost.appendChild(carouselShell('gem-employee', empItems, function (item) {
        var card = el('div', 'content-card glass-card glass-card--solid');
        card.style.setProperty('--card-accent', item.accent);
        var acc = el('div', 'content-card__accent'); acc.style.background = item.accent; card.appendChild(acc);
        var badge = el('div', 'truth-badge'); badge.innerHTML = item.icon + ' Employee Gems'; card.appendChild(badge);
        card.appendChild(el('h3', '', item.title));
        card.appendChild(ul(item.items, 'mt-md'));
        if (item.note) card.appendChild(el('div', 'highlight-box mt-md', item.note));
        return card;
      }));
    }

    /* ── Best Path ── */
    var pathHost = document.getElementById('carousel-path-host');
    if (pathHost) {
      pathHost.appendChild(carouselShell('path', D.BEST_PATH, renderPathCard));
    }

    /* ── Media Misses ── */
    var missHost = document.getElementById('carousel-miss-host');
    if (missHost) {
      missHost.appendChild(carouselShell('miss', D.MEDIA_MISSES, renderMediaMissCard));
    }

    /* ── Summary Table ── */
    var ledgerHost = document.getElementById('carousel-ledger-host');
    if (ledgerHost) {
      ledgerHost.appendChild(carouselShell('ledger', D.SUMMARY_TABLE, renderSummaryCard));
    }

    /* ── Decision Framework ── */
    var decisionKeys = Object.keys(D.DECISION);
    decisionKeys.forEach(function (key) {
      var host = document.getElementById('decision-' + key + '-host');
      if (host) {
        var sec = D.DECISION[key];
        var list = ul(sec.conditions);
        host.appendChild(list);
      }
    });

    var decisionCarouselHost = document.getElementById('carousel-decision-host');
    var decisionGrid = document.getElementById('decision-card-grid');
    if (decisionCarouselHost && decisionGrid) {
      var decisionCards = Array.from(decisionGrid.querySelectorAll('.money-card'));
      decisionCarouselHost.appendChild(carouselShell('decision-framework', decisionCards, renderClonedCard));
    }

    /* ── Init all carousels ── */
    var sound = global._gcqSound || null;
    D.initAll(document, sound);

    /* ── Quiz ── */
    var shuffledQuiz = rng.shuffle(D.RAPID_FIRE);
    var quiz = new D.QuizEngine(shuffledQuiz, sound, global._gcqAchievements || null);
    global._gcqQuiz = quiz;
    /* start btn achievement */
    var startBtn = document.getElementById('quiz-start-btn');
    if (startBtn && global._gcqAchievements) {
      startBtn.addEventListener('click', function () {
        global._gcqAchievements.unlock('quiz-start', '⚡', 'Boss Battle Started', '+5 XP — courage!', 5);
      }, { once: true });
    }
  }

  /* ────────────────────────────────────────────
     Boot
  ──────────────────────────────────────────── */
  function boot() {
    /* Sound engine */
    var sound = new D.SoundEngine();
    global._gcqSound = sound;

    /* XP */
    var xp = new D.XPManager();
    global._gcqXP = xp;

    /* Achievements */
    var achievements = new D.AchievementManager(sound, xp);
    global._gcqAchievements = achievements;

    document.documentElement.setAttribute('data-theme', 'light');
    try { localStorage.removeItem('gcq-theme'); } catch (e) {}

    var mobileMenuBtn = document.getElementById('mobile-menu-btn');
    var mobileMenu = document.getElementById('mobile-menu');
    if (mobileMenuBtn && mobileMenu) {
      mobileMenuBtn.addEventListener('click', function () {
        var isOpen = mobileMenuBtn.getAttribute('aria-expanded') === 'true';
        mobileMenuBtn.setAttribute('aria-expanded', String(!isOpen));
        mobileMenuBtn.textContent = isOpen ? '☰' : '×';
        mobileMenu.hidden = isOpen;
        if (sound) sound.click();
      });
      mobileMenu.querySelectorAll('a').forEach(function (link) {
        link.addEventListener('click', function () {
          mobileMenuBtn.setAttribute('aria-expanded', 'false');
          mobileMenuBtn.textContent = '☰';
          mobileMenu.hidden = true;
        });
      });
    }

    /* Sound toggle */
    var soundBtn = document.getElementById('sound-btn');
    if (soundBtn) soundBtn.addEventListener('click', function () {
      var on = sound.toggle_mute();
      soundBtn.classList.toggle('muted', !on);
      soundBtn.title = on ? 'Mute sounds' : 'Unmute sounds';
    });

    /* Cursor */
    new D.CursorTracker();

    /* Parallax */
    D.initParallax();

    /* Populate dynamic content */
    populate();

    /* Reveal observer */
    D.initRevealObserver(achievements, xp);

    /* Loading screen dismiss */
    var loader = document.getElementById('loader');
    if (loader) {
      setTimeout(function () {
        loader.classList.add('exit');
        setTimeout(function () {
          loader.style.display = 'none';
          /* Unlock first achievement after load */
          achievements.unlock('quest-start', '⚔️', 'Quest Begins', '+3 XP — you showed up!', 3);
        }, 650);
      }, 2000);
    }

    /* Hero section buttons */
    var heroQuizBtn = document.getElementById('hero-quiz-btn');
    if (heroQuizBtn) heroQuizBtn.addEventListener('click', function () {
      var arena = document.getElementById('quiz-arena');
      if (arena) arena.scrollIntoView({ behavior: 'smooth' });
    });
  }

  /* ────────────────────────────────────────────
     DOM Ready
  ──────────────────────────────────────────── */
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }

}(window));
