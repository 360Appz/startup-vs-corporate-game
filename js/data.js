/* =====================================================================
   THE GREAT CAREER QUEST — Content Data (word-for-word from source)
   ===================================================================== */

(function (global) {
  'use strict';

  /* ── Quotes (for Quote of the Day rotation) ── */
  var QUOTES = [
    { text: "Entrepreneurship gives you ownership, not automatically freedom.", source: "Core Truth" },
    { text: "You may control your calendar, but you may lose control of your mind.", source: "§1 The Big Myth" },
    { text: "Corporate is not 'security.' Corporate is rented stability.", source: "§2 The Big Myth" },
    { text: "A startup is a specific high-risk growth vehicle. Entrepreneurship is a much wider life and wealth-building category.", source: "§3 Not the Same Thing" },
    { text: "A mediocre product with strong distribution can beat a beautiful product nobody knows about.", source: "§5.1 Brutal Realities" },
    { text: "You are not 'building your dream.' You are negotiating with reality.", source: "§5.2 Brutal Realities" },
    { text: "Cash flow is not just accounting. It changes your personality.", source: "§5.3 Brutal Realities" },
    { text: "Choosing a co-founder can be closer to choosing a spouse than choosing a colleague.", source: "§5.4 Brutal Realities" },
    { text: "A business that destroys your health, marriage, faith, integrity, or sanity is not success. It is an expensive idol.", source: "§4.3 Hustle Culture" },
    { text: "Many people stay in corporate not because they lack courage, but because they have parents to support, children, medical needs, debt, visa constraints.", source: "§4.4 Cowards Narrative" },
    { text: "Corporate can be a wise season, especially when used intentionally.", source: "§4.4 Cowards Narrative" },
    { text: "Boring businesses can create beautiful lives.", source: "§12.5 Hidden Gems" },
    { text: "Customer money proves reality. Investor money proves potential.", source: "§12.6 Hidden Gems" },
    { text: "The safest person is not the employee or the founder. The safest person is the one with portable skills, trusted relationships, financial discipline, and adaptive capacity.", source: "§16 Career Portfolio" },
    { text: "A high-status startup that destroys your peace may be worse than a modest corporate job that lets you be present with family, serve church, invest wisely, and sleep well.", source: "§17.1 Lifestyle Design" },
    { text: "Likes do not pay payroll. Awards do not prove product-market fit. A Forbes feature does not mean profitability.", source: "§17.2 Cash Flow Beats Applause" },
    { text: "Growth magnifies character.", source: "§17.3 Character Scales" },
    { text: "Peace is a business metric.", source: "§17.4 Peace" },
    { text: "Can you pursue success without being possessed by it?", source: "§18 Christian Perspective" },
    { text: "Use corporate cash flow to buy entrepreneurial optionality.", source: "§13.6 Hidden Gems Corporate" },
    { text: "Not every promotion is progress. Sometimes it is just a better-paid cage.", source: "§11.2 Overrated Corporate" },
    { text: "The problem is not being inside the system. The problem is losing your soul to the system.", source: "§9 Hidden Costs Corporate" },
    { text: "Work is service. Profit is not evil. Exploitation is evil. Excellence honors God. People are not tools. Money is a servant, not master.", source: "§18 Christian Perspective" },
    { text: "For many people, the best answer is not 'quit and start.' It is learn, save, test, build, then decide.", source: "§15 Best Path" },
    { text: "Moving fast without customer feedback is just expensive confusion.", source: "§10.4 Overrated Startups" },
    { text: "A famous company with a bad boss can be worse than an ordinary company with a great boss.", source: "§6.2 Corporate Reality" },
    { text: "Calling includes faithfulness, not just visibility. Rest is obedience, not weakness. Integrity is more important than scale.", source: "§18 Christian Perspective" },
    { text: "The media sells entrepreneurship as freedom and corporate as captivity, but the wiser truth is this: corporate can be a training ground, entrepreneurship can be a wealth vehicle, startups can be an accelerated school of reality.", source: "Bottom Line" }
  ];

  /* ── Question of the Day ── */
  var QOTD = [
    {
      q: "If your business succeeded but cost you your family — was it worth it?",
      reflection: "A business that destroys your health, marriage, faith, integrity, or sanity is not success. It is an expensive idol."
    },
    {
      q: "Are you in corporate hiding from entrepreneurship, or strategically building for it?",
      reflection: "Corporate can be a wise season, especially when used intentionally — funding your investments, building your network, training your judgment."
    },
    {
      q: "What non-financial reward keeps you doing what you're doing?",
      reflection: "Research has long found that many entrepreneurs persist despite lower earnings, suggesting non-financial rewards such as autonomy, meaning, and identity matter greatly."
    },
    {
      q: "Is your ambition creating value for others, or building a name for yourself?",
      reflection: "Entrepreneurship can be stewardship, service, creativity, and dominion. But it can also become Babel: building a name for yourself."
    },
    {
      q: "Are you becoming more courageous, more curious, or more honest in your current path?",
      reflection: "Avoid corporate complacency if your job is making you less courageous, less curious, or less honest."
    },
    {
      q: "Can you pursue success without being possessed by it?",
      reflection: "Work is service. Profit is not evil. Exploitation is evil. Excellence honors God. Money is a servant, not master."
    },
    {
      q: "What season of life are you in — and is your current path actually built for it?",
      reflection: "The best path depends less on 'startup vs corporate' and more on your season of life, risk capacity, temperament, skill stack, family obligations, financial runway, and appetite for uncertainty."
    }
  ];

  /* ── Rapid Fire Quiz Questions ── */
  var RAPID_FIRE = [
    {
      q: "Entrepreneurship gives you ownership, not automatically ___.",
      opts: ["Freedom", "Money", "Status", "Control"],
      correct: 0,
      explain: "A founder may escape a boss, but gain many new bosses: customers, investors, employees, suppliers, landlords, regulators, banks, algorithms, cash flow, and market timing."
    },
    {
      q: "About what fraction of new U.S. establishments survive to year five?",
      opts: ["About half", "About 80%", "About 20%", "About 70%"],
      correct: 0,
      explain: "The U.S. Bureau of Labor Statistics data shows new businesses face serious survival pressure: about half of new U.S. establishments survive to year five."
    },
    {
      q: "U.S. median employee tenure with current employer in January 2024 was:",
      opts: ["3.9 years", "5.2 years", "2.1 years", "7.4 years"],
      correct: 0,
      explain: "U.S. BLS data shows median tenure with current employer was 3.9 years in January 2024, with private-sector at 3.5 years and public-sector at 6.2 years."
    },
    {
      q: "The WEF 2025 Future of Jobs Report predicts ___ of key skills will change by 2030.",
      opts: ["About 39%", "About 52%", "About 25%", "About 67%"],
      correct: 0,
      explain: "The World Economic Forum's 2025 Future of Jobs Report notes employers expect about 39% of key skills changing by 2030."
    },
    {
      q: "True or False: Raising money is the same as building a healthy business.",
      opts: ["False", "True"],
      correct: 0,
      explain: "Funding can mean investors believe in the upside, the market is hot, or the company needs cash because it is burning money. The company may still have bad unit economics."
    },
    {
      q: "Corporate employment is best described as:",
      opts: ["Rented stability", "True security", "Permanent safety", "Complete freedom"],
      correct: 0,
      explain: "Corporate is not 'security.' Corporate is rented stability — layoffs, reorganizations, and 3.9-year median tenure all challenge the idea of permanent corporate security."
    },
    {
      q: "A mediocre product with strong ___ can beat a beautiful product nobody knows about.",
      opts: ["Distribution", "Funding", "Design", "Team"],
      correct: 0,
      explain: "Many first-time founders obsess over the product. Experienced operators obsess over distribution."
    },
    {
      q: "True or False: A startup and entrepreneurship are the same thing.",
      opts: ["False — they are different", "True — same thing"],
      correct: 0,
      explain: "A startup is a specific high-risk growth vehicle. Entrepreneurship is a much wider life and wealth-building category including clinics, cafés, consulting practices, and more."
    },
    {
      q: "Customer money proves ___, while investor money proves potential.",
      opts: ["Reality", "Status", "Growth", "Vision"],
      correct: 0,
      explain: "Getting customers to pay is more powerful than getting investors to believe. Customer money proves demand, trust, usefulness, willingness to pay, and market urgency."
    },
    {
      q: "Gallup 2025: only ___ of managers globally had received formal management training.",
      opts: ["44%", "80%", "62%", "30%"],
      correct: 0,
      explain: "Gallup's 2025 workplace reporting found manager engagement fell in 2024 and that only 44% of managers globally had received formal management training."
    },
    {
      q: "What is cash flow described as beyond just accounting?",
      opts: ["Emotional pressure", "A tax issue", "A leadership problem", "A marketing metric"],
      correct: 0,
      explain: "When cash is low you become reactive, tolerate bad clients, underprice, overpromise, delay hard decisions, hire poorly, and make fear-based choices."
    },
    {
      q: "True or False: Many entrepreneurs want to build high-growth unicorn startups.",
      opts: ["False — most do not", "True — most do"],
      correct: 0,
      explain: "A Kauffman report noted that many entrepreneurs have no desire to build high-growth businesses and instead aim to provide existing services to existing customers."
    },
    {
      q: "What is the most underrated life skill you can learn from a startup?",
      opts: ["Sales", "Coding", "Design", "Finance"],
      correct: 0,
      explain: "Sales teaches listening, framing, rejection tolerance, human motivation, negotiation, trust-building, clear communication, and value articulation — highly portable."
    },
    {
      q: "In Christian perspective, 'Babel' in entrepreneurship means:",
      opts: ["Building a name for yourself", "Building for God", "Building community", "Fiscal responsibility"],
      correct: 0,
      explain: "Entrepreneurship can be stewardship, service, creativity, and dominion. But it can also become Babel: building a name for yourself."
    },
    {
      q: "'Growth magnifies ___' — what does this mean?",
      opts: ["Character", "Revenue", "Risk", "Brand"],
      correct: 0,
      explain: "Character scales before business scales. If you are greedy at RM10,000 revenue, you may be dangerous at RM10 million."
    },
    {
      q: "The most underrated strategy described is:",
      opts: ["Career Portfolio", "VC Funding", "Early Startup Exit", "Corporate Fast-track"],
      correct: 0,
      explain: "Instead of asking 'corporate or entrepreneur?' ask: How do I build a portfolio of income, skills, reputation, relationships, and ownership?"
    },
    {
      q: "True or False: Peace is described as a legitimate business metric.",
      opts: ["True", "False"],
      correct: 0,
      explain: "Not in accounting statements, but in life. Ask: Can I sleep? Am I honest? Am I healthy? Is my family okay? Am I becoming more loving or more harsh?"
    },
    {
      q: "Choosing a co-founder is most like:",
      opts: ["Choosing a spouse", "Hiring an employee", "Finding a mentor", "Picking a vendor"],
      correct: 0,
      explain: "You need alignment on money, equity, work ethic, faith/values, risk appetite, decision rights, exit goals, hiring standards, lifestyle expectations, and conflict resolution."
    },
    {
      q: "Not every promotion is progress — sometimes it is:",
      opts: ["A better-paid cage", "A lateral move", "A stepping stone always", "A sign to quit"],
      correct: 0,
      explain: "A promotion may give more money, more status, more responsibility — but also more politics, less craft, more meetings, less freedom."
    },
    {
      q: "True or False: A business that destroys your health and family is still success.",
      opts: ["False — it is an expensive idol", "True — success has a price"],
      correct: 0,
      explain: "A business that destroys your health, marriage, faith, integrity, or sanity is not success. It is an expensive idol."
    }
  ];

  /* ── Section Content Data ── */
  var MYTHS = [
    {
      num: "MYTH 01",
      icon: "🔥",
      title: "\"Entrepreneurship = Freedom\"",
      accentColor: "var(--a1)",
      accentBg: "var(--a1-15)",
      reality: "Entrepreneurship gives you <strong>ownership</strong>, not automatically freedom.",
      points: [
        "A founder may escape a boss, but gain many new bosses: customers, investors, employees, suppliers, landlords, regulators, banks, algorithms, cash flow, and market timing.",
        "The U.S. Bureau of Labor Statistics data shows new businesses face serious survival pressure: about half of new U.S. establishments survive to year five.",
        "No guaranteed income. No clear working hours. No one else absorbs the failure.",
        "Your identity can become fused with the business. You are always \"on.\"",
        "Your personal finances and business finances become emotionally entangled.",
        "Research has long found that many entrepreneurs persist despite lower initial earnings and lower earnings growth than paid employment, suggesting non-financial rewards such as autonomy, meaning, and identity matter greatly."
      ],
      hardTruth: "The \"be your own boss\" slogan hides the fact that business ownership often means being accountable to <strong>more people</strong>, not fewer."
    },
    {
      num: "MYTH 02",
      icon: "🏢",
      title: "\"Corporate = Safe\"",
      accentColor: "var(--a2)",
      accentBg: "var(--a2-15)",
      reality: "Corporate life is safer than entrepreneurship in some ways, but not truly safe.",
      gives: ["Monthly salary.", "Benefits.", "Structure.", "Training.", "Brand name.", "Processes.", "Legal protection.", "Career ladders."],
      hiddenRisks: ["Layoffs.", "Reorganizations.", "Bad bosses.", "Political ceilings.", "Skill stagnation.", "Dependency on one employer.", "Slow promotion cycles.", "Identity built around job title."],
      stats: "U.S. BLS data shows median tenure with current employer was <strong>3.9 years</strong> in January 2024. The World Economic Forum's 2025 Future of Jobs Report notes about <strong>39% of key skills</strong> changing by 2030.",
      hardTruth: "Corporate is not 'security.' Corporate is <strong>rented stability</strong>."
    }
  ];

  var STARTUP_VS_ENTREPRENEUR = {
    startup: {
      title: "Startup",
      icon: "🚀",
      description: "A startup is usually trying to build something scalable, often under uncertainty, sometimes with venture capital.",
      traits: [
        "Fast growth ambition.",
        "High uncertainty.",
        "Product-market fit search.",
        "Fundraising pressure.",
        "Hiring before stability.",
        "\"Winner-take-most\" dynamics.",
        "High failure probability.",
        "Potentially large upside."
      ],
      truth: "A startup is a specific high-risk growth vehicle."
    },
    entrepreneurship: {
      title: "Entrepreneurship",
      icon: "💼",
      description: "Entrepreneurship is broader.",
      examples: [
        "A clinic.", "A consulting practice.", "A tuition center.", "A café.",
        "A property agency.", "A niche import business.", "A YouTube/media business.",
        "A local service company.", "A professional practice.", "A software product.",
        "A family business."
      ],
      kauffman: "A Kauffman report noted that many entrepreneurs have no desire to build high-growth businesses and instead aim to provide existing services to existing customers, often for non-economic reasons.",
      truth: "Entrepreneurship is a much wider life and wealth-building category."
    }
  };

  var MEDIA_LIES = [
    {
      num: "4.1",
      icon: "🦄",
      title: "The \"Unicorn Founder\" Fantasy",
      accentColor: "var(--a4)",
      accentBg: "var(--a4-15)",
      mediaLoves: ["Young founder.", "Big funding round.", "Viral launch.", "Billion-dollar valuation.", "\"Dropped out and made it.\"", "Founder as celebrity."],
      reality: "Most businesses are not unicorns. Most founders are not raising venture capital. Most entrepreneurs build ordinary businesses serving ordinary needs.",
      stat: "Startups matter greatly to the economy, but most surviving startups do not become high-growth firms. The long-term contribution comes disproportionately from a small subset of young high-growth firms.",
      translation: "Startups as a category are important. But the average startup is not the startup story you see in the media."
    },
    {
      num: "4.2",
      icon: "💸",
      title: "The \"Funding = Success\" Illusion",
      accentColor: "var(--a5)",
      accentBg: "var(--a5-15)",
      fundingMeans: [
        "Investors believe in the upside.",
        "The founder can sell a vision.",
        "The market is hot.",
        "The company needs cash because it is burning money.",
        "The startup is now under pressure to grow fast."
      ],
      mediaHeadline: "\"Startup raises $20 million.\"",
      betterQuestion: "What is the revenue, gross margin, retention, burn rate, cash runway, customer concentration, and path to profitability?"
    },
    {
      num: "4.3",
      icon: "😤",
      title: "The \"Hustle Culture\" Lie",
      accentColor: "var(--a1)",
      accentBg: "var(--a1-15)",
      truth: "Working hard matters. But glorifying exhaustion is dangerous.",
      mediaShows: ["Launch party.", "Podcast interview.", "Fundraising announcement.", "\"We're changing the world.\"", "LinkedIn victory post."],
      mediaHides: ["Payroll anxiety.", "Co-founder conflict.", "Debt.", "Family strain.", "Sleep loss.", "Silent depression.", "Legal disputes.", "Customer churn.", "Investor pressure.", "Shame after failure."],
      hardTruth: "A business that destroys your health, marriage, faith, integrity, or sanity is not success. It is an expensive idol."
    },
    {
      num: "4.4",
      icon: "🦁",
      title: "The \"Corporate People Are Cowards\" Narrative",
      accentColor: "var(--a2)",
      accentBg: "var(--a2-15)",
      verdict: "This is immature.",
      reasons: [
        "Parents to support.", "Children.", "Medical needs.", "Debt.", "Visa constraints.",
        "Family expectations.", "A spouse depending on stable income.", "Strategic patience.",
        "A plan to learn before launching."
      ],
      underratedTruth: "A good corporate job can fund your investments, build your network, train your judgment, and reduce desperation when you eventually build something.",
      note: "Corporate can be a wise season, especially when used intentionally."
    }
  ];

  var STARTUP_REALITIES = [
    {
      num: "5.1",
      icon: "🎯",
      title: "The Product Is Usually Not the Hardest Part",
      accentColor: "var(--a1)",
      accentBg: "var(--a1-15)",
      hardParts: ["Distribution.", "Sales.", "Hiring.", "Cash flow.", "Timing.", "Trust.", "Focus.", "Founder psychology.", "Customer education.", "Repeated rejection.", "Prioritization under uncertainty."],
      truth: "Many first-time founders obsess over the product. Experienced operators obsess over distribution.",
      hardTruth: "A mediocre product with strong distribution can beat a beautiful product nobody knows about."
    },
    {
      num: "5.2",
      icon: "🧠",
      title: "Your First Idea Is Usually Wrong",
      accentColor: "var(--a5)",
      accentBg: "var(--a5-15)",
      scenarios: [
        "You think customers want X. They actually want Y.",
        "Or they want X, but will not pay.",
        "Or they will pay, but not enough.",
        "Or they will pay, but sales cycles are too slow.",
        "Or the buyer and user are different people.",
        "Or the problem is real, but not urgent."
      ],
      hardTruth: "You are not 'building your dream.' You are negotiating with reality."
    },
    {
      num: "5.3",
      icon: "💸",
      title: "Cash Flow Is Emotional Pressure",
      accentColor: "var(--a4)",
      accentBg: "var(--a4-15)",
      intro: "Cash flow is not just accounting. It changes your personality.",
      whenCashIsLow: ["You become reactive.", "You tolerate bad clients.", "You underprice.", "You overpromise.", "You delay hard decisions.", "You hire poorly.", "You make fear-based choices."],
      stat: "Small-business banking research has found many small firms operate with thin cash buffers, making them vulnerable to delayed payments or unexpected shocks.",
      underratedSkill: "Emotional stability under cash pressure."
    },
    {
      num: "5.4",
      icon: "💔",
      title: "Co-founder Conflict Can Kill the Company",
      accentColor: "var(--a2)",
      accentBg: "var(--a2-15)",
      intro: "Many people choose co-founders based on friendship, excitement, or complementary skills. That is not enough.",
      alignment: ["Money.", "Equity.", "Work ethic.", "Faith/values.", "Risk appetite.", "Decision rights.", "Exit goals.", "Hiring standards.", "Lifestyle expectations.", "Conflict resolution.", "Who has final say."],
      stat: "Recent reporting on startup therapy and founder conflict highlights that many founder blowups come from identity fusion, poor communication, and unmanaged psychological stress.",
      hiddenReality: "Choosing a co-founder can be closer to choosing a spouse than choosing a colleague."
    },
    {
      num: "5.5",
      icon: "⚡",
      title: "Startups Compress Time",
      accentColor: "var(--a3)",
      accentBg: "var(--a3-15)",
      inCorporate: "In corporate, you may learn one function deeply.",
      inStartup: "In a startup, you may learn:",
      learnList: ["Sales.", "Hiring.", "Product.", "Finance.", "Legal basics.", "Marketing.", "Negotiation.", "Customer psychology.", "Crisis management.", "Leadership.", "Operations.", "Fundraising.", "Firing.", "Pricing.", "Branding."],
      advantage: "You learn faster because reality gives immediate feedback.",
      danger: "You may learn chaotically without mentorship, structure, or recovery."
    }
  ];

  var CORPORATE_REALITIES = [
    {
      num: "6.1",
      icon: "🎭",
      title: "Corporate Rewards Risk Management, Not Always Truth",
      accentColor: "var(--a2)",
      accentBg: "var(--a2-15)",
      rewardedFor: ["Not making mistakes.", "Managing optics.", "Aligning upward.", "Avoiding blame.", "Speaking carefully.", "Preserving hierarchy.", "Delivering predictable outcomes."],
      context: "This is not always bad. Large organizations need control. But it can train people to become politically cautious.",
      reality: "The system often rewards \"safe competence\" more than raw creativity."
    },
    {
      num: "6.2",
      icon: "👔",
      title: "Your Boss Matters More Than the Brand",
      accentColor: "var(--a5)",
      accentBg: "var(--a5-15)",
      intro: "People obsess over company names: Google, McKinsey, Apple, Goldman, Petronas, Grab, Shopee, DBS, Maybank, etc.",
      dependsOn: ["Your manager.", "Team culture.", "Workload.", "Promotion path.", "Psychological safety.", "Internal politics.", "Whether your work is visible.", "Whether your skill is core or peripheral."],
      stat: "Gallup's 2025 workplace reporting found manager engagement fell in 2024 and that only 44% of managers globally had received formal management training.",
      hardTruth: "A famous company with a bad boss can be worse than an ordinary company with a great boss."
    },
    {
      num: "6.3",
      icon: "😴",
      title: "Corporate Can Make You Passive",
      accentColor: "var(--a1)",
      accentBg: "var(--a1-15)",
      trainsYouToWait: ["Wait for approval.", "Wait for budget.", "Wait for promotion.", "Wait for HR.", "Wait for boss.", "Wait for annual review.", "Wait for permission."],
      weakenedSkills: ["Selling directly.", "Making fast decisions.", "Owning consequences.", "Taking initiative without instruction.", "Pricing your own value.", "Creating from zero.", "Surviving ambiguity.", "Handling rejection."],
      but: "Good corporate environments can also build excellence, discipline, professionalism, and scale thinking."
    },
    {
      num: "6.4",
      icon: "♟️",
      title: "Corporate Politics Is Real",
      accentColor: "var(--a4)",
      accentBg: "var(--a4-15)",
      intro: "Politics is not always evil. It is the management of power, incentives, reputation, and scarce resources.",
      toxicPolitics: ["Credit stealing.", "Blame shifting.", "Information hoarding.", "Fake alignment.", "Promotion by proximity.", "Performative busyness.", "Meetings as theater.", "Consensus without conviction."],
      survivalSkill: "Learn to read incentives without becoming cynical."
    }
  ];

  var HIDDEN_COSTS = {
    startup: {
      financial: ["Lost salary.", "Lost CPF/EPF-style retirement contributions depending on country.", "No employer insurance.", "Startup capital.", "Legal/accounting fees.", "Failed experiments.", "Opportunity cost.", "Delayed home ownership.", "Debt risk."],
      emotional: ["Loneliness.", "Shame.", "Comparison.", "Envy.", "Identity collapse.", "Family misunderstanding.", "Chronic uncertainty."],
      relational: ["Less time for spouse/family.", "Friendship strain.", "Co-founder conflict.", "Difficulty switching off.", "Being physically present but mentally absent."],
      spiritual: ["Temptation to exaggerate.", "Temptation to underpay.", "Temptation to manipulate.", "Temptation to worship growth.", "Temptation to treat people as resources instead of image-bearers."],
      christianLens: "Entrepreneurship can be stewardship, service, creativity, and dominion. But it can also become Babel: building a name for yourself."
    },
    corporate: {
      financial: ["Salary ceiling.", "Bonus dependency.", "Lifestyle inflation.", "Golden handcuffs.", "Underdeveloped investment mindset.", "Overdependence on employer."],
      emotional: ["Feeling replaceable.", "Living for appraisal cycles.", "Suppressing personality.", "Burnout without ownership.", "Cynicism from bureaucracy."],
      relational: ["Politics affecting friendships.", "Networking becoming transactional.", "Family time damaged by workload.", "Identity tied to title."],
      spiritual: ["Fear of man.", "Compromise for promotion.", "Silence when truth is needed.", "Serving systems that may conflict with conscience.", "Pride from title, brand, or status."],
      christianLens: "Corporate work can be faithful service. Daniel, Joseph, Nehemiah, and Esther served inside powerful institutions. The problem is not being inside the system. The problem is losing your soul to the system."
    }
  };

  var OVERRATED = {
    startups: [
      {
        num: "10.1",
        icon: "💰",
        title: "Fundraising",
        accentColor: "var(--a1)",
        text: "Fundraising is overrated unless capital is truly strategic.",
        reasons: ["It validates them.", "It gives status.", "It buys time.", "It impresses peers.", "It delays profitability discipline."],
        warning: "But investor money changes the game. You are no longer just building a business. You are building a return profile.",
        alternative: "Underrated alternative: Bootstrapping, customer-funded growth, consulting-to-product, pre-sales, revenue-based financing, partnerships."
      },
      {
        num: "10.2",
        icon: "💥",
        title: "Being \"Disruptive\"",
        accentColor: "var(--a5)",
        text: "Most customers do not want disruption. They want:",
        wantList: ["Less pain.", "More trust.", "Lower cost.", "Faster results.", "Less risk.", "Better status.", "Convenience.", "Reliability."],
        note: "\"Disruption\" sounds good in a pitch deck. Customers usually buy practical improvement."
      },
      {
        num: "10.3",
        icon: "📸",
        title: "Founder Aesthetic",
        accentColor: "var(--a2)",
        overrated: ["Podcast appearances.", "LinkedIn thought leadership.", "Startup events.", "Pitch competitions.", "Founder merch.", "Fancy office.", "\"Building in public\" without substance."],
        underrated: ["Answering customer calls.", "Improving onboarding.", "Collecting payment.", "Reducing churn.", "Fixing unit economics.", "Hiring reliable operators.", "Writing clear SOPs.", "Serving boring customers well."]
      },
      {
        num: "10.4",
        icon: "⚡",
        title: "Speed Without Direction",
        accentColor: "var(--a4)",
        text: "\"Move fast\" is useful only if you are learning.",
        hardTruth: "Moving fast without customer feedback is just expensive confusion."
      }
    ],
    corporate: [
      {
        num: "11.1",
        icon: "🏆",
        title: "Brand Names",
        accentColor: "var(--a6)",
        text: "A famous employer can help, but brand is not the same as growth.",
        askInstead: ["Am I learning?", "Am I visible?", "Am I trusted?", "Am I building portable skills?", "Am I close to revenue, strategy, product, or decision-making?", "Am I becoming sharper or just more credentialed?"]
      },
      {
        num: "11.2",
        icon: "📈",
        title: "Promotions",
        accentColor: "var(--a5)",
        text: "Promotions matter, but they can trap you.",
        promotionGives: ["More money.", "More status.", "More responsibility.", "More politics.", "Less craft.", "More meetings.", "Less freedom."],
        hardTruth: "Not every promotion is progress. Sometimes it is just a better-paid cage."
      },
      {
        num: "11.3",
        icon: "🐝",
        title: "Busyness",
        accentColor: "var(--a1)",
        text: "Corporate often confuses activity with value:",
        activityList: ["Meetings.", "Slides.", "Updates.", "Alignment.", "Reporting.", "Review cycles.", "Internal visibility."],
        betterQuestion: "Did this work create revenue, reduce cost, lower risk, improve customer outcomes, develop people, or strengthen strategic position?"
      }
    ]
  };

  var HIDDEN_GEMS = {
    startups: [
      {
        num: "12.1",
        icon: "🌍",
        title: "Direct Contact With Reality",
        accentColor: "var(--a3)",
        points: ["Customers either buy or do not.", "Employees either perform or do not.", "Cash either arrives or does not.", "The product either works or does not.", "There is less room to hide behind titles."],
        gem: "You develop practical judgment."
      },
      {
        num: "12.2",
        icon: "🗣️",
        title: "Learning Sales",
        accentColor: "var(--a1)",
        intro: "Sales is one of the most underrated life skills.",
        teaches: ["Listening.", "Framing.", "Rejection tolerance.", "Human motivation.", "Negotiation.", "Trust-building.", "Clear communication.", "Value articulation."],
        note: "Even if the startup fails, learning to sell is highly portable."
      },
      {
        num: "12.3",
        icon: "🧩",
        title: "Ownership Mindset",
        accentColor: "var(--a2)",
        text: "Once you run a business, you understand:",
        understands: ["Margins.", "Payroll.", "Waste.", "Customer acquisition.", "Pricing.", "Cash conversion.", "Operational drag.", "Incentives."],
        note: "This makes you more valuable even if you return to corporate."
      },
      {
        num: "12.4",
        icon: "🌱",
        title: "Reputation Compounding",
        accentColor: "var(--a5)",
        intro: "A founder who behaves with integrity compounds trust.",
        remembered: ["You paid on time.", "You were honest.", "You did not exaggerate.", "You treated staff well.", "You admitted mistakes.", "You delivered."],
        gem: "That reputation becomes an asset."
      },
      {
        num: "12.5",
        icon: "🏠",
        title: "Small Boring Businesses",
        accentColor: "var(--a4)",
        intro: "This may be the biggest underrated gem.",
        examples: ["Bookkeeping.", "Cleaning.", "Maintenance.", "Logistics.", "Compliance.", "Training.", "Clinics.", "Repairs.", "B2B services.", "Niche software.", "Senior care.", "Industrial supplies.", "Professional services."],
        note: "They may not be cool, but they solve real problems.",
        hiddenTruth: "Boring businesses can create beautiful lives."
      },
      {
        num: "12.6",
        icon: "💎",
        title: "Customer-Funded Growth",
        accentColor: "var(--a6)",
        intro: "Getting customers to pay is more powerful than getting investors to believe.",
        proves: ["Demand.", "Trust.", "Usefulness.", "Willingness to pay.", "Market urgency."],
        note: "Investor money proves potential. Customer money proves reality."
      },
      {
        num: "12.7",
        icon: "🌐",
        title: "Entrepreneurial Range",
        accentColor: "var(--a2)",
        intro: "Entrepreneurship builds range:",
        range: ["Strategy.", "Execution.", "Finance.", "People.", "Sales.", "Operations.", "Crisis response."],
        note: "This range is hard to get in narrow corporate roles."
      }
    ],
    corporate: [
      {
        num: "13.1",
        icon: "📚",
        title: "Paid Learning",
        accentColor: "var(--a6)",
        intro: "Corporate pays you to learn.",
        canLearn: ["Management.", "Finance.", "Systems.", "Industry structure.", "Compliance.", "Procurement.", "Negotiation.", "Large-scale operations.", "Stakeholder management.", "How big decisions are made."],
        note: "In a startup, you may pay tuition through mistakes. In corporate, the company often absorbs the cost."
      },
      {
        num: "13.2",
        icon: "🎖️",
        title: "Brand Borrowing",
        accentColor: "var(--a5)",
        intro: "A good company brand gives you borrowed credibility.",
        helps: ["Future jobs.", "Clients.", "Investors.", "Immigration.", "Speaking opportunities.", "Consulting credibility.", "Family trust.", "Bank loans."],
        note: "Brand is not everything, but it is not nothing."
      },
      {
        num: "13.3",
        icon: "🕸️",
        title: "Network Density",
        accentColor: "var(--a2)",
        intro: "Corporate gives access to:",
        networkList: ["Senior leaders.", "Clients.", "Vendors.", "Alumni.", "Industry insiders.", "Regulators.", "Consultants.", "Operators."],
        note: "A strong corporate network can later become your customer base, advisory circle, hiring pool, or investor network."
      },
      {
        num: "13.4",
        icon: "⚙️",
        title: "Observing Systems at Scale",
        accentColor: "var(--a1)",
        intro: "Most founders fail not because they lack ideas, but because they cannot build systems.",
        teaches: ["SOPs.", "Governance.", "Delegation.", "Budgeting.", "Reporting.", "Risk control.", "Talent development.", "Performance management."],
        note: "These are boring but powerful."
      },
      {
        num: "13.5",
        icon: "🛡️",
        title: "Lower-Pressure Skill Building",
        accentColor: "var(--a3)",
        intro: "Corporate can be a safer place to build:",
        skills: ["Presentation skills.", "Analytical skills.", "Leadership skills.", "Industry knowledge.", "People management.", "Technical expertise.", "Communication discipline."],
        note: "You can become excellent before carrying full business risk."
      },
      {
        num: "13.6",
        icon: "🔑",
        title: "Stable Base for Side Experiments",
        accentColor: "var(--a4)",
        intro: "A corporate salary can fund:",
        funds: ["Investing.", "Side business.", "Courses.", "Real estate.", "Content creation.", "Freelance experiments.", "Professional certifications."],
        strategy: "Use corporate cash flow to buy entrepreneurial optionality."
      }
    ],
    employee: {
      benefits: ["Fast learning.", "Broad responsibility.", "Closer access to founders.", "Equity upside.", "Less bureaucracy.", "Faster promotion.", "More visibility.", "Cross-functional exposure."],
      risks: ["Lower structure.", "Role ambiguity.", "Unstable leadership.", "Funding risk.", "Equity may become worthless.", "Weak HR.", "Firefighting culture.", "Poor mentorship."],
      profile: "Someone who wants accelerated learning, can handle ambiguity, and does not need the company to parent them."
    }
  };

  var BEST_PATH = [
    {
      path: "Corporate",
      icon: "🏢",
      accentColor: "var(--a6)",
      accentBg: "var(--a6-15)",
      suits: "Corporate may suit you better if you value:",
      list: ["Stability.", "Mentorship.", "Structure.", "Predictable income.", "Clear career ladders.", "Working inside teams.", "Specialization.", "Lower personal financial risk."]
    },
    {
      path: "Entrepreneurship",
      icon: "💼",
      accentColor: "var(--a3)",
      accentBg: "var(--a3-15)",
      suits: "Entrepreneurship may suit you better if you value:",
      list: ["Autonomy.", "Ownership.", "Building from zero.", "Direct customer contact.", "Flexibility.", "Long-term upside.", "Creating your own system.", "Accepting uncertainty."]
    },
    {
      path: "Startup",
      icon: "🚀",
      accentColor: "var(--a1)",
      accentBg: "var(--a1-15)",
      suits: "Startups may suit you better if you value:",
      list: ["Speed.", "Chaos.", "Innovation.", "High upside.", "Rapid learning.", "Ambiguity.", "Pressure.", "Mission intensity."]
    },
    {
      path: "Hybrid",
      icon: "⚡",
      accentColor: "var(--a2)",
      accentBg: "var(--a2-15)",
      suits: "Hybrid may suit you best if you want:",
      list: ["Stable income now.", "A future business.", "Time to test ideas.", "Lower downside.", "Skills before risk.", "Family responsibility plus ambition."],
      note: "For many people, the best answer is not 'quit and start.' It is learn, save, test, build, then decide."
    }
  ];

  var CAREER_PORTFOLIO = {
    intro: "Instead of asking, \"Corporate or entrepreneur?\" ask: How do I build a portfolio of income, skills, reputation, relationships, and ownership?",
    components: ["Main job.", "Investments.", "Side business.", "Personal brand.", "Consulting.", "Network.", "Deep skill.", "Industry expertise.", "Spiritual grounding.", "Family stability.", "Health."],
    modernReality: "The safest person is not the employee or the founder. The safest person is the one with portable skills, trusted relationships, financial discipline, and adaptive capacity."
  };

  var MEDIA_MISSES = [
    {
      num: "17.1",
      icon: "🕊️",
      title: "Lifestyle Design Beats Status",
      accentColor: "var(--a5)",
      text: "A business is not automatically better than a job.",
      insight: "A high-status startup that destroys your peace may be worse than a modest corporate job that lets you be present with family, serve church, invest wisely, and sleep well."
    },
    {
      num: "17.2",
      icon: "💵",
      title: "Cash Flow Beats Applause",
      accentColor: "var(--a3)",
      text: "Revenue matters more than praise.",
      points: ["Likes do not pay payroll.", "Awards do not prove product-market fit.", "A Forbes feature does not mean profitability."]
    },
    {
      num: "17.3",
      icon: "🪞",
      title: "Character Scales Before Business Scales",
      accentColor: "var(--a1)",
      text: "Growth magnifies character.",
      points: [
        "If you are greedy at RM10,000 revenue, you may be dangerous at RM10 million.",
        "If you are dishonest with small promises, you may become destructive with investor money.",
        "If you cannot handle criticism now, leadership will expose you later."
      ]
    },
    {
      num: "17.4",
      icon: "☮️",
      title: "Peace Is a Business Metric",
      accentColor: "var(--a2)",
      text: "Not in accounting statements, but in life.",
      ask: ["Can I sleep?", "Am I honest?", "Am I healthy?", "Is my family okay?", "Am I becoming more loving or more harsh?", "Is success making me more grateful or more arrogant?"]
    }
  ];

  var CHRISTIAN_PERSPECTIVE = {
    extreme1: {
      title: "Extreme 1: \"Ambition is bad\"",
      verdict: "Not true.",
      explanation: "Scripture honors diligence, stewardship, skill, building, trade, leadership, and multiplication."
    },
    extreme2: {
      title: "Extreme 2: \"Success proves God's favor\"",
      verdict: "Also not true.",
      explanation: "Wealth, growth, fame, and influence can be blessings, tests, or traps."
    },
    betterFrame: [
      "Work is service.",
      "Profit is not evil.",
      "Exploitation is evil.",
      "Excellence honors God.",
      "People are not tools.",
      "Money is a servant, not master.",
      "Calling includes faithfulness, not just visibility.",
      "Rest is obedience, not weakness.",
      "Integrity is more important than scale."
    ],
    keyQuestion: "Can you pursue success without being possessed by it?"
  };

  var DECISION_FRAMEWORK = {
    chooseCorporate: {
      title: "Choose corporate now if:",
      conditions: ["You need stable income.", "You lack savings.", "You need mentorship.", "You are still building core skills.", "Your idea is untested.", "Your family depends on you.", "You are emotionally burned out.", "You want to learn an industry first."]
    },
    chooseEntrepreneurship: {
      title: "Choose entrepreneurship now if:",
      conditions: ["You have runway.", "You have paying customers or strong validation.", "You understand the market.", "You can survive uncertainty.", "You have support.", "You can sell.", "You can manage cash.", "You are willing to start small and boring."]
    },
    chooseStartupEmployee: {
      title: "Choose startup employment if:",
      conditions: ["You want fast learning.", "You can tolerate chaos.", "You believe in the founders.", "The company has real traction.", "You understand equity risk.", "You want broad responsibility."]
    },
    avoidEntrepreneurship: {
      title: "Avoid entrepreneurship for now if:",
      conditions: ["You mainly want status.", "You hate sales.", "You cannot handle rejection.", "You have no savings.", "You are trying to escape a bad boss but have no business model.", "You think passion replaces market demand.", "You are unwilling to do boring admin."]
    },
    avoidCorporateComplacency: {
      title: "Avoid corporate complacency if:",
      conditions: ["You are not learning.", "You are underpaid and passive.", "You are hiding behind stability.", "You complain but do not upskill.", "You are politically adapting at the cost of conscience.", "Your job is making you less courageous, less curious, or less honest."]
    }
  };

  var SUMMARY_TABLE = [
    { path: "Startup founder",           overrated: "Fundraising, hype, disruption",    gem: "Customer-funded revenue, distribution, resilience, judgment" },
    { path: "Entrepreneur",              overrated: "\"Freedom\"",                        gem: "Boring profitable businesses, cash flow, autonomy with discipline" },
    { path: "Corporate",                 overrated: "Brand, title, promotion",           gem: "Paid learning, network, systems knowledge, stable base" },
    { path: "Startup employee",          overrated: "Equity dream",                      gem: "Fast learning, founder access, broad responsibility" },
    { path: "Hybrid path",               overrated: "Seen as \"not brave enough\"",       gem: "Best risk-adjusted route for many people" },
    { path: "Small business",            overrated: "Seen as less glamorous",            gem: "Often better lifestyle and cash flow than VC startup" },
    { path: "Corporate middle mgmt",     overrated: "Seen as boring",                    gem: "Learning people leadership and organizational power" },
    { path: "Freelance / consulting",    overrated: "Seen as unstable",                  gem: "High-margin bridge into business ownership" }
  ];

  var BOTTOM_LINE = "The media sells entrepreneurship as freedom and corporate as captivity, but the wiser truth is this: <strong>corporate can be a training ground, entrepreneurship can be a wealth vehicle, startups can be an accelerated school of reality, and the best path is the one that fits your season, responsibilities, character, and risk capacity.</strong>";

  /* ── Accent Palette Sets (rotated hourly) ── */
  var ACCENT_SETS = [
    { a1: '#FF1463', a2: '#6B2FFF', a3: '#00E589', a4: '#FFE000', a5: '#FF5E3A', a6: '#00AAFF' },
    { a1: '#FF5E3A', a2: '#6B2FFF', a3: '#00D68F', a4: '#FFD600', a5: '#FF1463', a6: '#0090E0' },
    { a1: '#E0006A', a2: '#8B2FFF', a3: '#00E5C8', a4: '#FFC200', a5: '#FF6B35', a6: '#00C0FF' },
    { a1: '#FF2080', a2: '#5B1FEF', a3: '#00E067', a4: '#F5E000', a5: '#FF7040', a6: '#20B0FF' },
    { a1: '#FF0850', a2: '#7B3FFF', a3: '#00D4A0', a4: '#FFE800', a5: '#FF4820', a6: '#00A8FF' },
    { a1: '#F5005F', a2: '#5E28EF', a3: '#10E880', a4: '#FFD000', a5: '#FF6030', a6: '#00B8FF' }
  ];

  /* Export */
  global.GCQ = global.GCQ || {};
  global.GCQ.QUOTES           = QUOTES;
  global.GCQ.QOTD             = QOTD;
  global.GCQ.RAPID_FIRE       = RAPID_FIRE;
  global.GCQ.MYTHS            = MYTHS;
  global.GCQ.STARTUP_VS_ENT   = STARTUP_VS_ENTREPRENEUR;
  global.GCQ.MEDIA_LIES       = MEDIA_LIES;
  global.GCQ.STARTUP_REALITIES = STARTUP_REALITIES;
  global.GCQ.CORP_REALITIES   = CORPORATE_REALITIES;
  global.GCQ.HIDDEN_COSTS     = HIDDEN_COSTS;
  global.GCQ.OVERRATED        = OVERRATED;
  global.GCQ.HIDDEN_GEMS      = HIDDEN_GEMS;
  global.GCQ.BEST_PATH        = BEST_PATH;
  global.GCQ.CAREER_PORTFOLIO = CAREER_PORTFOLIO;
  global.GCQ.MEDIA_MISSES     = MEDIA_MISSES;
  global.GCQ.CHRISTIAN        = CHRISTIAN_PERSPECTIVE;
  global.GCQ.DECISION         = DECISION_FRAMEWORK;
  global.GCQ.SUMMARY_TABLE    = SUMMARY_TABLE;
  global.GCQ.BOTTOM_LINE      = BOTTOM_LINE;
  global.GCQ.ACCENT_SETS      = ACCENT_SETS;

}(window));
