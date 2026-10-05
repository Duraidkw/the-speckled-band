(() => {
  'use strict';

  const STORY = window.STORY;
  const CLUES = window.CLUES;
  const SAVE_KEY = 'speckled-band-save';
  const START_SCENE = 'arrival';
  const INSPECTIONS = 4;
  const TOTAL_CLUES = Object.keys(CLUES).length;

  const $ = (id) => document.getElementById(id);
  const ui = {
    title: $('title-screen'), game: $('game-screen'),
    newGame: $('new-game'), continueGame: $('continue-game'),
    chapter: $('chapter'), text: $('scene-text'), choices: $('choices'),
    ending: $('ending'), notebook: $('notebook'), clueList: $('clue-list'),
    clueCount: $('clue-count'), notebookToggle: $('notebook-toggle'), restart: $('restart'),
  };

  let state = freshState();

  function freshState() {
    return { scene: START_SCENE, clues: new Set(), flags: new Set(), used: {}, time: INSPECTIONS };
  }

  // ---------- Save / load ----------

  function save() {
    try {
      localStorage.setItem(SAVE_KEY, JSON.stringify({
        scene: state.scene, clues: [...state.clues], flags: [...state.flags], used: state.used, time: state.time,
      }));
    } catch { /* storage unavailable */ }
  }

  function load() {
    try {
      const raw = JSON.parse(localStorage.getItem(SAVE_KEY));
      if (!raw || !STORY[raw.scene]) return null;
      return { scene: raw.scene, clues: new Set(raw.clues), flags: new Set(raw.flags), used: raw.used || {}, time: raw.time };
    } catch { return null; }
  }

  function clearSave() {
    try { localStorage.removeItem(SAVE_KEY); } catch { /* storage unavailable */ }
  }

  // ---------- Rendering ----------

  function resolve(value) {
    return typeof value === 'function' ? value(state) : value;
  }

  function availableChoices(scene) {
    return (scene.choices || []).filter((c) => {
      if (c.once && state.used[c.id]) return false;
      if (c.time && state.time <= 0) return false;
      if (c.if && !c.if(state)) return false;
      return true;
    });
  }

  let lastClue = null;

  function addClue(id) {
    if (!id || state.clues.has(id)) return;
    state.clues.add(id);
    lastClue = id;
  }

  function renderNotebook(newId) {
    ui.clueCount.textContent = `${state.clues.size}/${TOTAL_CLUES}`;
    ui.clueList.innerHTML = '';
    if (!state.clues.size) {
      ui.clueList.innerHTML = '<li class="empty">No clues yet. Observe everything.</li>';
      return;
    }
    for (const id of state.clues) {
      const li = document.createElement('li');
      li.dataset.testid = `clue-${id}`;
      li.setAttribute('data-testid', `clue-${id}`);
      if (id === newId) li.classList.add('new');
      li.innerHTML = `<strong>${CLUES[id].title}</strong><span>${CLUES[id].text}</span>`;
      ui.clueList.appendChild(li);
    }
  }

  function render() {
    const scene = STORY[state.scene];
    if (scene.onEnter) addClue(scene.onEnter.clue);

    ui.chapter.textContent = scene.chapter;
    ui.text.innerHTML = '';
    resolve(scene.text).filter(Boolean).forEach((para, i) => {
      const p = document.createElement('p');
      p.innerHTML = para;
      p.style.animationDelay = `${i * 0.12}s`;
      ui.text.appendChild(p);
    });

    ui.choices.innerHTML = '';
    ui.ending.hidden = true;

    if (scene.ending) {
      renderEnding(scene.ending);
      clearSave();
    } else {
      availableChoices(scene).forEach((choice) => {
        const btn = document.createElement('button');
        btn.type = 'button';
        btn.className = 'choice';
        btn.setAttribute('data-testid', `choice-${choice.id}`);
        btn.innerHTML = choice.text;
        btn.addEventListener('click', () => choose(choice));
        ui.choices.appendChild(btn);
      });
      save();
    }

    renderNotebook(lastClue);
    lastClue = null;
    window.scrollTo({ top: 0, behavior: 'smooth' });
    ui.text.focus({ preventScroll: true });
  }

  function rank(type) {
    const found = state.clues.size;
    if (type === 'true' && found >= TOTAL_CLUES - 3) return { name: 'Sherlock Holmes', stars: 3 };
    if (type === 'true') return { name: 'Consulting Detective', stars: 2 };
    if (type === 'lost') return { name: 'Inspector Lestrade', stars: 0 };
    return { name: 'Dr. Watson', stars: 1 };
  }

  function renderEnding(ending) {
    const r = rank(ending.type);
    ui.ending.hidden = false;
    ui.ending.dataset.ending = ending.type;
    ui.ending.innerHTML = `
      <p class="ending-label">Ending</p>
      <h2 data-testid="ending-title">${ending.title}</h2>
      <p class="stars" aria-label="${r.stars} of 3 stars">${'★'.repeat(r.stars)}${'☆'.repeat(3 - r.stars)}</p>
      <p>Your rank: <b data-testid="rank">${r.name}</b></p>
      <p>Clues found: <b data-testid="clues-found">${state.clues.size}/${TOTAL_CLUES}</b></p>
      <button type="button" class="primary" data-testid="play-again">Investigate again</button>
    `;
    ui.ending.querySelector('button').addEventListener('click', newGame);
  }

  // ---------- Game flow ----------

  function choose(choice) {
    if (choice.once) state.used[choice.id] = true;
    if (choice.time) state.time -= 1;
    if (choice.flag) state.flags.add(choice.flag);
    addClue(choice.clue);
    state.scene = choice.to;
    render();
  }

  function showGame() {
    ui.title.hidden = true;
    ui.game.hidden = false;
    render();
  }

  function newGame() {
    clearSave();
    state = freshState();
    showGame();
  }

  ui.newGame.addEventListener('click', newGame);
  ui.continueGame.addEventListener('click', () => {
    const saved = load();
    if (saved) { state = saved; showGame(); }
  });
  ui.restart.addEventListener('click', () => {
    if (confirm('Abandon this investigation and start again?')) newGame();
  });
  ui.notebookToggle.addEventListener('click', () => {
    const open = ui.notebook.classList.toggle('open');
    ui.notebookToggle.setAttribute('aria-expanded', String(open));
  });

  // Number keys pick choices.
  document.addEventListener('keydown', (e) => {
    if (ui.game.hidden || e.ctrlKey || e.metaKey || e.altKey) return;
    const n = Number(e.key);
    if (n >= 1 && n <= 9) {
      const btn = ui.choices.children[n - 1];
      if (btn) btn.click();
    }
  });

  ui.continueGame.hidden = !load();
  renderNotebook();
})();
