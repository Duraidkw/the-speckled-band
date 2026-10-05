// @ts-check
const { test, expect } = require('@playwright/test');

/** Click a sequence of choices by id. */
async function play(page, ...ids) {
  for (const id of ids) {
    await page.getByTestId(`choice-${id}`).click();
  }
}

const ASK_EVERYTHING = [
  'ask-whistle', 'back', 'ask-night', 'back', 'ask-room', 'back',
  'ask-animals', 'back', 'ask-now', 'back', 'ask-wrist', 'back',
];

/** Plays from the first scene to the Stoke Moran investigation hub. */
async function reachStokeMoran(page, { thorough = true } = {}) {
  await page.getByTestId('new-game').click();
  if (thorough) {
    await play(page, 'deduce', 'continue', 'continue', ...ASK_EVERYTHING, 'done', 'calm', 'continue', 'will', 'continue');
  } else {
    await play(page, 'comfort', 'continue', 'done', 'revolver', 'continue', 'train');
  }
  await expect(page.getByTestId('chapter')).toHaveText('IV · Stoke Moran');
}

test.beforeEach(async ({ page }) => {
  await page.goto('/');
  await page.evaluate(() => localStorage.clear());
  await page.reload();
});

test.describe('Title screen', () => {
  test('shows the title and starts a new case', async ({ page }) => {
    await expect(page).toHaveTitle('The Speckled Band');
    await expect(page.getByTestId('title-screen')).toBeVisible();
    await expect(page.getByTestId('continue-game')).toBeHidden();

    await page.getByTestId('new-game').click();
    await expect(page.getByTestId('chapter')).toHaveText('I · A Visitor at Dawn');
    await expect(page.getByTestId('choices').getByRole('button')).toHaveCount(2);
  });
});

test.describe('Investigation', () => {
  test('choices add clues to the notebook', async ({ page }) => {
    await page.getByTestId('new-game').click();
    await expect(page.getByTestId('clue-count')).toHaveText('0/16');

    await play(page, 'deduce');
    await expect(page.getByTestId('clue-count')).toHaveText('1/16');

    // Entering Helen's story records Julia's last words automatically.
    await play(page, 'continue');
    await expect(page.getByTestId('clue-count')).toHaveText('2/16');
  });

  test('each question can only be asked once', async ({ page }) => {
    await page.getByTestId('new-game').click();
    await play(page, 'comfort', 'continue', 'ask-whistle', 'back');
    await expect(page.getByTestId('choice-ask-whistle')).toHaveCount(0);
    await expect(page.getByTestId('choice-ask-night')).toBeVisible();
  });

  test('only four inspections are allowed at Stoke Moran', async ({ page }) => {
    await reachStokeMoran(page, { thorough: false });
    await expect(page.getByTestId('time-left')).toHaveText('4');

    await play(page, 'inspect-windows', 'back', 'inspect-bed', 'back', 'inspect-safe', 'back');
    await expect(page.getByTestId('time-left')).toHaveText('1');

    await play(page, 'inspect-lash', 'back');
    await expect(page.getByTestId('time-left')).toHaveText('now');
    await expect(page.getByTestId('choices').getByRole('button')).toHaveCount(1);
    await expect(page.getByTestId('choice-leave')).toBeVisible();
  });

  test('the cane strike is unavailable without the key clues', async ({ page }) => {
    await reachStokeMoran(page, { thorough: false });
    await play(page, 'inspect-windows', 'back', 'leave', 'plan-signal', 'dark');
    await expect(page.getByTestId('choice-strike')).toHaveCount(0);
    await expect(page.getByTestId('choice-shoot')).toBeVisible();
  });
});

test.describe('Endings', () => {
  test('perfect investigation earns the true ending and top rank', async ({ page }) => {
    await reachStokeMoran(page);
    await play(page,
      'inspect-bellpull', 'back', 'inspect-ventilator', 'back',
      'inspect-bed', 'back', 'inspect-safe', 'back', 'leave',
      'plan-signal', 'dark', 'strike', 'continue', 'accuse-adder');

    await expect(page.getByTestId('ending-title')).toHaveText('The Speckled Band');
    await expect(page.getByTestId('rank')).toHaveText('Sherlock Holmes');
    await expect(page.getByTestId('clues-found')).toHaveText('14/16');
  });

  test('wrong explanation gives the muddled ending', async ({ page }) => {
    await reachStokeMoran(page, { thorough: false });
    await play(page, 'inspect-bellpull', 'back', 'leave', 'plan-signal', 'dark', 'strike', 'continue', 'accuse-gypsies');
    await expect(page.getByTestId('ending-title')).toHaveText('Right Night, Wrong Answer');
    await expect(page.getByTestId('rank')).toHaveText('Dr. Watson');
  });

  test('leaving Helen in the room ends in tragedy', async ({ page }) => {
    await reachStokeMoran(page, { thorough: false });
    await play(page, 'leave', 'plan-lock');
    await expect(page.getByTestId('ending-title')).toHaveText('A Scream in the Night');
    await expect(page.getByTestId('rank')).toHaveText('Inspector Lestrade');
  });

  test('keeping the lamp lit lets the serpent escape', async ({ page }) => {
    await reachStokeMoran(page, { thorough: false });
    await play(page, 'leave', 'plan-signal', 'light');
    await expect(page.getByTestId('ending-title')).toHaveText('The Serpent Escapes');
  });

  test('play again returns to the first scene with an empty notebook', async ({ page }) => {
    await reachStokeMoran(page, { thorough: false });
    await play(page, 'leave', 'plan-lock');
    await page.getByTestId('play-again').click();
    await expect(page.getByTestId('chapter')).toHaveText('I · A Visitor at Dawn');
    await expect(page.getByTestId('clue-count')).toHaveText('0/16');
  });
});

test.describe('Saving & controls', () => {
  test('progress is saved and can be continued after reload', async ({ page }) => {
    await page.getByTestId('new-game').click();
    await play(page, 'deduce', 'continue', 'continue', 'ask-room');
    await page.reload();

    await expect(page.getByTestId('continue-game')).toBeVisible();
    await page.getByTestId('continue-game').click();
    await expect(page.getByTestId('scene-text')).toContainText('A locked room');
    await expect(page.getByTestId('clue-count')).toHaveText('3/16');
  });

  test('restart asks for confirmation and resets the case', async ({ page }) => {
    await page.getByTestId('new-game').click();
    await play(page, 'deduce');
    page.once('dialog', (dialog) => dialog.accept());
    await page.getByTestId('restart').click();
    await expect(page.getByTestId('chapter')).toHaveText('I · A Visitor at Dawn');
    await expect(page.getByTestId('clue-count')).toHaveText('0/16');
  });

  test('number keys pick choices', async ({ page, isMobile }) => {
    test.skip(isMobile, 'No keyboard on mobile');
    await page.getByTestId('new-game').click();
    await page.keyboard.press('1');
    await expect(page.getByTestId('choice-continue')).toBeVisible();
    await expect(page.getByTestId('clue-count')).toHaveText('1/16');
  });
});
