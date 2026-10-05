<div align="center">

# 🔍 The Speckled Band

**An interactive Sherlock Holmes mystery game**

*Investigate. Collect clues. Keep Helen Stoner alive until morning.*

[![Tests & Deploy](https://github.com/Duraidkw/the-speckled-band/actions/workflows/ci.yml/badge.svg)](https://github.com/Duraidkw/the-speckled-band/actions/workflows/ci.yml)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat&logo=javascript&logoColor=black)
![Playwright](https://img.shields.io/badge/Tested%20with-Playwright-2EAD33?style=flat&logo=playwright&logoColor=white)
![License](https://img.shields.io/badge/license-MIT-blue?style=flat)

### [▶ Play it in your browser](https://duraidkw.github.io/the-speckled-band/)

</div>

---

## 📖 The Story

Surrey, 1883. Helen Stoner arrives at Baker Street at dawn, shaking with fear. Two years ago, her twin sister died behind a locked door. Her last words were *"It was the band! The speckled band!"* Now Helen has been moved into her dead sister's room, and last night she heard the same low whistle in the dark.

You are **Sherlock Holmes**. Your choices decide whether the case is solved, or whether history repeats itself.

The game is based on *The Adventure of the Speckled Band* by Sir Arthur Conan Doyle (1892), which is in the public domain. All of the game's text is an original retelling.

## 🎮 Features

- **Branching story:** 7 chapters, 30+ scenes and **4 different endings**
- **Case notebook:** 16 clues to discover, including red herrings
- **Limited time:** the Doctor returns at dusk, so you can only make 4 inspections at Stoke Moran. Choose carefully.
- **Choices with consequences:** you can't strike at the danger in the final scene unless you found the right clues
- **Detective rank:** finish as *Inspector Lestrade*, *Dr. Watson*, *Consulting Detective* or *Sherlock Holmes*
- **Autosave:** close the tab and continue the case later
- **Keyboard support:** press `1`–`9` to pick a choice
- **Responsive:** works on desktop and mobile, and respects reduced-motion settings
- **No frameworks or build step:** plain HTML, CSS and JavaScript

## 🧪 Test Automation

Every story path is covered by an end-to-end **Playwright** test suite that runs on **desktop Chrome** and **mobile (Pixel 7)**:

| Area | What is tested |
|---|---|
| Title screen | Start a new case, hidden Continue button with no save |
| Investigation | Clues added to the notebook, questions asked only once, 4-inspection limit, gated final action |
| Endings | All 4 endings, the rank calculation and the clue count, Play again resets state |
| Persistence | Autosave and continue after reload, restart with confirmation |
| Accessibility / controls | Number-key shortcuts |

GitHub Actions runs the suite on every push and pull request. When the tests pass on `main`, the game deploys automatically to **GitHub Pages**.

## 🚀 Run Locally

```bash
git clone https://github.com/Duraidkw/the-speckled-band.git
cd the-speckled-band
npm install
npm start            # http://127.0.0.1:8080
```

Run the tests:

```bash
npx playwright install chromium
npm test             # headless
npm run test:headed  # watch the browser
npm run report       # open the HTML report
```

## 🗂️ Project Structure

```
├── index.html          # Layout: title screen, story page, notebook
├── style.css           # Victorian paper-and-ink theme
├── story.js            # All scenes, choices, clues and endings (data only)
├── game.js             # Story engine: state, rendering, saving, ranks
├── tests/game.spec.js  # Playwright end-to-end tests
└── .github/workflows/  # CI: test, then deploy to GitHub Pages
```

The story is plain **data**, kept separate from the engine. To add a scene, add an entry to `story.js` with its `text` and `choices`. No changes to the engine are needed.

---

<div align="center">

Made by **[Duraikandeeshwaran S](https://github.com/Duraidkw)**, QA Engineer · *"You see, but you do not observe."*

</div>
