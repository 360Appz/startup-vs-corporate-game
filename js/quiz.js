/* =====================================================================
   THE GREAT CAREER QUEST — Quiz Engine
   ===================================================================== */

(function (global) {
  'use strict';

  var TIMER_SECS = 15;

  function QuizEngine(questions, sound, achievements) {
    this.allQuestions  = questions;
    this.questions     = questions; // may be shuffled
    this.sound         = sound || null;
    this.achievements  = achievements || null;
    this.state         = 'idle'; // idle | question | answered | done
    this.current       = 0;
    this.score         = 0;
    this.streak        = 0;
    this.maxStreak     = 0;
    this.correct       = 0;
    this.timeLeft      = TIMER_SECS;
    this._timerInterval = null;
    this._el           = {};
    this._initDOM();
  }

  QuizEngine.prototype._initDOM = function () {
    var self = this;
    this._el = {
      idle:        document.getElementById('quiz-idle'),
      active:      document.getElementById('quiz-active'),
      result:      document.getElementById('quiz-result'),
      startBtn:    document.getElementById('quiz-start-btn'),
      nextBtn:     document.getElementById('quiz-next-btn'),
      restartBtn:  document.getElementById('quiz-restart-btn'),
      scoreDisp:   document.getElementById('quiz-score'),
      streakDisp:  document.getElementById('quiz-streak'),
      questionTxt: document.getElementById('quiz-question'),
      optionsGrid: document.getElementById('quiz-options'),
      explainBox:  document.getElementById('quiz-explain'),
      timerBar:    document.getElementById('quiz-timer-bar'),
      progressBar: document.getElementById('quiz-progress-bar'),
      progressTxt: document.getElementById('quiz-progress-txt'),
      qNum:        document.getElementById('quiz-q-num'),
      resultGrade: document.getElementById('result-grade'),
      resultScore: document.getElementById('result-score'),
      resultCorrect: document.getElementById('result-correct'),
      resultStreak:  document.getElementById('result-streak')
    };

    if (this._el.startBtn) {
      this._el.startBtn.addEventListener('click', function () { self.start(); });
    }
    if (this._el.nextBtn) {
      this._el.nextBtn.addEventListener('click', function () { self.next(); });
    }
    if (this._el.restartBtn) {
      this._el.restartBtn.addEventListener('click', function () { self.start(); });
    }
  };

  QuizEngine.prototype.shuffle = function (rng) {
    this.questions = rng.shuffle(this.allQuestions);
    return this;
  };

  QuizEngine.prototype.start = function () {
    this.state    = 'question';
    this.current  = 0;
    this.score    = 0;
    this.streak   = 0;
    this.maxStreak = 0;
    this.correct  = 0;
    this._show('active');
    if (this.sound) this.sound.quizStart();
    this._renderQuestion();
  };

  QuizEngine.prototype._show = function (view) {
    ['idle', 'active', 'result'].forEach(function (v) {
      var el = document.getElementById('quiz-' + v);
      if (el) el.style.display = v === view ? '' : 'none';
    });
  };

  QuizEngine.prototype._renderQuestion = function () {
    var self = this;
    var q = this.questions[this.current];
    if (!q) { this._showResult(); return; }

    /* Header */
    if (this._el.qNum) this._el.qNum.textContent = 'Q' + (this.current + 1) + ' / ' + this.questions.length;
    if (this._el.scoreDisp) this._el.scoreDisp.textContent = this.score;
    if (this._el.streakDisp) this._el.streakDisp.textContent = '🔥 × ' + this.streak;

    /* Progress */
    var pct = (this.current / this.questions.length) * 100;
    if (this._el.progressBar) this._el.progressBar.style.width = pct + '%';

    /* Question */
    if (this._el.questionTxt) this._el.questionTxt.textContent = q.q;

    /* Options */
    if (this._el.optionsGrid) {
      this._el.optionsGrid.innerHTML = '';
      q.opts.forEach(function (opt, i) {
        var btn = document.createElement('button');
        btn.className = 'quiz-option';
        btn.textContent = opt;
        btn.addEventListener('click', function () { self.answer(i); });
        self._el.optionsGrid.appendChild(btn);
      });
    }

    /* Explanation */
    if (this._el.explainBox) {
      this._el.explainBox.classList.remove('visible');
      this._el.explainBox.textContent = '';
    }

    /* Next button */
    if (this._el.nextBtn) this._el.nextBtn.style.display = 'none';

    /* Timer */
    this.timeLeft = TIMER_SECS;
    this._startTimer();
  };

  QuizEngine.prototype._startTimer = function () {
    var self = this;
    clearInterval(this._timerInterval);
    if (this._el.timerBar) {
      this._el.timerBar.style.transition = 'none';
      this._el.timerBar.style.width = '100%';
      /* Force reflow */
      void this._el.timerBar.offsetWidth;
      this._el.timerBar.style.transition = 'width ' + TIMER_SECS + 's linear';
      this._el.timerBar.style.width = '0%';
    }
    this._timerInterval = setInterval(function () {
      self.timeLeft--;
      if (self.timeLeft <= 0) {
        clearInterval(self._timerInterval);
        if (self.state === 'question') {
          if (self.sound) self.sound.timeout();
          self._resolveAnswer(-1, false);
        }
      }
    }, 1000);
  };

  QuizEngine.prototype.answer = function (index) {
    if (this.state !== 'question') return;
    this.state = 'answered';
    clearInterval(this._timerInterval);
    var q = this.questions[this.current];
    var isCorrect = (index === q.correct);
    this._resolveAnswer(index, isCorrect);
  };

  QuizEngine.prototype._resolveAnswer = function (index, isCorrect) {
    var self = this;
    var q = this.questions[this.current];
    this.state = 'answered';

    /* Score */
    if (isCorrect) {
      var bonus = Math.round(this.timeLeft * 0.5) + (this.streak * 2);
      this.score += 10 + bonus;
      this.streak++;
      this.correct++;
      if (this.streak > this.maxStreak) this.maxStreak = this.streak;
      if (this.sound) this.sound.correct();
    } else {
      this.streak = 0;
      if (this.sound) this.sound.wrong();
    }

    /* Update score display */
    if (this._el.scoreDisp) this._el.scoreDisp.textContent = this.score;
    if (this._el.streakDisp) this._el.streakDisp.textContent = '🔥 × ' + this.streak;

    /* Highlight options */
    if (this._el.optionsGrid) {
      var btns = this._el.optionsGrid.querySelectorAll('.quiz-option');
      btns.forEach(function (btn, i) {
        btn.disabled = true;
        if (i === q.correct) btn.classList.add('correct');
        else if (i === index && !isCorrect) btn.classList.add('wrong');
      });
    }

    /* Explanation */
    if (this._el.explainBox) {
      this._el.explainBox.textContent = q.explain;
      this._el.explainBox.classList.add('visible');
    }

    /* Timer bar stop */
    if (this._el.timerBar) {
      this._el.timerBar.style.transition = 'none';
    }

    /* Next button */
    if (this._el.nextBtn) {
      this._el.nextBtn.style.display = '';
      var isLast = (this.current === this.questions.length - 1);
      this._el.nextBtn.textContent = isLast ? 'See Results ⚡' : 'Next Question →';
    }
  };

  QuizEngine.prototype.next = function () {
    if (this.state !== 'answered') return;
    this.current++;
    if (this.current >= this.questions.length) {
      this._showResult();
    } else {
      this.state = 'question';
      if (this.sound) this.sound.click();
      this._renderQuestion();
    }
  };

  QuizEngine.prototype._showResult = function () {
    this._show('result');
    if (this.sound) this.sound.levelUp();

    var pct = Math.round((this.correct / this.questions.length) * 100);
    var grade = pct >= 90 ? '🏆 LEGEND' : pct >= 75 ? '⭐ SHARP' : pct >= 55 ? '📈 GROWING' : '💡 LEARNER';

    if (this._el.resultGrade)   this._el.resultGrade.textContent = grade;
    if (this._el.resultScore)   this._el.resultScore.textContent = this.score;
    if (this._el.resultCorrect) this._el.resultCorrect.textContent = this.correct + '/' + this.questions.length;
    if (this._el.resultStreak)  this._el.resultStreak.textContent = this.maxStreak;

    /* Achievement */
    if (this.achievements) {
      if (pct >= 80) {
        this.achievements.unlock('quiz-master', '🏆', 'Quiz Master', 'Scored ' + pct + '% — elite!', 15);
      } else {
        this.achievements.unlock('quiz-done', '⚡', 'Quest Tested', 'Quiz complete — ' + pct + '%', 8);
      }
    }
  };

  /* ── Exports ── */
  global.GCQ = global.GCQ || {};
  global.GCQ.QuizEngine = QuizEngine;

}(window));
