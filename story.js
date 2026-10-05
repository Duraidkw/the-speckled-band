// Story data for "The Speckled Band".
// Adapted from "The Adventure of the Speckled Band" by Sir Arthur Conan Doyle (1892, public domain).
// All narration below is an original retelling written for this game.

window.CLUES = {
  dogcart:    { title: 'An early journey', text: 'Fresh mud on her left sleeve: she rode in a dog-cart along heavy roads, then took the first train to Waterloo.' },
  whistle:    { title: 'The low whistle', text: 'In the nights before her death, Julia heard a low, clear whistle at about three in the morning.' },
  clang:      { title: 'A metallic clang', text: 'On the night of the death, Helen heard a whistle, then a clanging sound, as if metal had fallen.' },
  locked:     { title: 'A sealed room', text: 'Julia always locked her door. The windows were barred by heavy shutters. No one could have entered.' },
  lastwords:  { title: '"The speckled band!"', text: 'Julia\'s last words, pointing toward the Doctor\'s room: "It was the band! The speckled band!"' },
  animals:    { title: 'Creatures from India', text: 'Dr. Roylott keeps a cheetah and a baboon loose on the grounds. He has a passion for Indian animals.' },
  gypsies:    { title: 'The travellers', text: 'Roylott lets a band of travellers camp on his land. Some wear spotted handkerchiefs on their heads.' },
  move:       { title: 'History repeating', text: 'Helen is engaged to be married. Repairs forced her into Julia\'s old room, and last night she heard the whistle.' },
  bruises:    { title: 'Five marks', text: 'Five livid marks on Helen\'s wrist: the print of four fingers and a thumb. Her stepfather is a violent man.' },
  motive:     { title: 'The will', text: 'Their mother\'s will leaves each daughter a share on marriage. If both married, Roylott\'s income would fall to almost nothing.' },
  shutters:   { title: 'Unbreakable shutters', text: 'The shutters cannot be forced, even with a knife. Nobody came in through the window.' },
  bellpull:   { title: 'A dummy bell-rope', text: 'A new bell-rope hangs beside the bed. It rings nothing: it is fastened to a hook above a small ventilator.' },
  ventilator: { title: 'The ventilator', text: 'A ventilator opens, not to the outside air, but into Dr. Roylott\'s room next door.' },
  bed:        { title: 'A bed nailed down', text: 'The bed is clamped to the floor. It cannot be moved away from the bell-rope and the ventilator.' },
  safe:       { title: 'Safe and saucer', text: 'An iron safe in Roylott\'s room, and on top of it a saucer of milk. No cat lives in the house.' },
  lash:       { title: 'The dog lash', text: 'A small dog lash hangs on the bed, its end tied in a loop, as if to hold something by the neck.' },
};

window.STORY = {
  arrival: {
    chapter: 'I · A Visitor at Dawn',
    text: [
      'April, 1883. It is a quarter past seven when Mrs. Hudson wakes you. A young lady is waiting in the sitting room, dressed in black and heavily veiled.',
      'When she raises her veil you see a face pale and drawn, with restless, frightened eyes. She is shivering, though not from the cold.',
      '"Mr. Holmes," she whispers, "I have no one else to turn to. I am afraid. It is terror."',
    ],
    choices: [
      { id: 'deduce', text: 'Study her closely before she says another word', to: 'deduce', clue: 'dogcart' },
      { id: 'comfort', text: 'Draw a chair to the fire and order coffee', to: 'story' },
    ],
  },

  deduce: {
    chapter: 'I · A Visitor at Dawn',
    text: [
      '"You came in by train this morning," you say gently, "the first one. But before that you had a long drive in a dog-cart along muddy roads. The left arm of your jacket is spattered in seven places."',
      'She stares at you. "How could you possibly know that? But it is true. I left home before six." She seems, somehow, steadier for it. Here at last is someone who sees.',
    ],
    choices: [{ id: 'continue', text: 'Ask her to tell her story', to: 'story' }],
  },

  story: {
    chapter: 'I · A Visitor at Dawn',
    text: [
      'Her name is Helen Stoner. She lives with her stepfather, Dr. Grimesby Roylott, the last of an old family, at the crumbling manor of Stoke Moran in Surrey.',
      'He practised medicine in India, where a violent temper led to a death and a long prison term. He came home a bitter man, feared by the whole village.',
      'Two years ago, Helen\'s twin sister Julia was to be married. Two weeks before the wedding, Julia ran from her room into the corridor in the middle of a storm, screaming. She fell. Her last words were: <em>"Oh, Helen! It was the band! The speckled band!"</em> She pointed toward the Doctor\'s room, and then she died.',
      'The coroner found no wound, no poison, no cause at all.',
    ],
    onEnter: { clue: 'lastwords' },
    choices: [{ id: 'continue', text: 'Question her', to: 'questions' }],
  },

  questions: {
    chapter: 'II · Questions at Baker Street',
    text: (s) => [
      Object.keys(s.used).some((k) => k.startsWith('ask-'))
        ? 'Helen waits for your next question, her hands twisting her gloves.'
        : 'You lean back, fingertips pressed together. "Every detail, Miss Stoner, however small."',
    ],
    choices: [
      { id: 'ask-whistle', text: '"Did your sister speak of anything strange before that night?"', to: 'q-whistle', clue: 'whistle', once: true },
      { id: 'ask-night', text: '"What exactly did you hear on the night she died?"', to: 'q-night', clue: 'clang', once: true },
      { id: 'ask-room', text: '"Could anyone have entered her room?"', to: 'q-room', clue: 'locked', once: true },
      { id: 'ask-animals', text: '"Who, or what, else lives at Stoke Moran?"', to: 'q-animals', clue: 'animals', once: true },
      { id: 'ask-now', text: '"Why have you come to me now, after two years?"', to: 'q-now', clue: 'move', once: true },
      { id: 'ask-wrist', text: 'Lean forward and push back the lace at her wrist', to: 'q-wrist', clue: 'bruises', once: true },
      { id: 'done', text: 'Promise to come to Stoke Moran this very afternoon', to: 'roylott' },
    ],
  },

  'q-whistle': {
    chapter: 'II · Questions at Baker Street',
    text: [
      '"Yes. She asked me if I had ever heard anyone whistle in the dead of night. A low, clear whistle, at about three in the morning. I had not. We thought it might be the travellers on the lawn."',
    ],
    choices: [{ id: 'back', text: 'Continue', to: 'questions' }],
  },
  'q-night': {
    chapter: 'II · Questions at Baker Street',
    text: [
      '"The wind was howling. I heard her scream, and as I opened my door I heard the low whistle she had described, and a moment later a clanging sound, as if a mass of metal had fallen."',
    ],
    choices: [{ id: 'back', text: 'Continue', to: 'questions' }],
  },
  'q-room': {
    chapter: 'II · Questions at Baker Street',
    text: [
      '"Impossible. She always locked her door at night, because of the animals. The windows had old shutters with broad iron bars, fastened every evening. The walls and floor were sound. The chimney is wide, but barred by staples."',
      'A locked room, then. You file the fact away.',
    ],
    choices: [{ id: 'back', text: 'Continue', to: 'questions' }],
  },
  'q-animals': {
    chapter: 'II · Questions at Baker Street',
    text: [
      '"My stepfather has a passion for Indian animals. A cheetah and a baboon wander the grounds freely, and the villagers fear them almost as much as they fear him."',
      '"He also lets travellers camp on the land. He wanders away with them for weeks. Many of them wear spotted handkerchiefs over their heads."',
      'A band of people. A spotted band. You note that too.',
    ],
    onEnter: { clue: 'gypsies' },
    choices: [{ id: 'back', text: 'Continue', to: 'questions' }],
  },
  'q-now': {
    chapter: 'II · Questions at Baker Street',
    text: [
      '"A month ago I became engaged. Then, two days ago, repairs began on the west wing and a hole was knocked in my bedroom wall. I was moved into Julia\'s old room. I sleep in the very bed she slept in."',
      '"Last night I lay awake, and at three o\'clock I heard it. The low whistle. I lit the lamp and saw nothing. I could not sleep again."',
    ],
    choices: [{ id: 'back', text: 'Continue', to: 'questions' }],
  },
  'q-wrist': {
    chapter: 'II · Questions at Baker Street',
    text: [
      'Five small red marks circle her wrist: four fingers and a thumb.',
      'She flushes and covers them. "He is a hard man," she says quietly, "and perhaps he hardly knows his own strength."',
      '"You are shielding your stepfather, Miss Stoner."',
    ],
    choices: [{ id: 'back', text: 'Continue', to: 'questions' }],
  },

  roylott: {
    chapter: 'III · An Unwelcome Guest',
    text: [
      'Helen has barely left when the door bursts open. A huge man fills the frame: top hat, long frock-coat, a face burned yellow by the sun and lined with every evil passion.',
      '"Which of you is Holmes? My stepdaughter has been here. What has she been saying to you? I know your kind, Holmes the meddler! Holmes the busybody! Scotland Yard\'s jack-in-office!"',
      'He seizes the steel poker from the fireplace and, with one movement, bends it into a curve.',
      '"Keep out of my affairs!" He hurls the twisted poker into the grate.',
    ],
    choices: [
      { id: 'calm', text: 'Smile and remark that there is a draught from the door', to: 'roylott-calm', flag: 'calm' },
      { id: 'revolver', text: 'Rise and put your hand to your pocket', to: 'roylott-gun' },
    ],
  },
  'roylott-calm': {
    chapter: 'III · An Unwelcome Guest',
    text: [
      '"Your conversation is most entertaining," you say pleasantly. "When you go out, close the door, for there is a decided draught."',
      'He storms out. You pick up the poker and, with a sudden effort, straighten it out again. "Now, Watson, we shall have breakfast, and then the morning is our own."',
    ],
    choices: [{ id: 'continue', text: 'Decide how to spend the morning', to: 'morning' }],
  },
  'roylott-gun': {
    chapter: 'III · An Unwelcome Guest',
    text: [
      'The Doctor\'s eyes flick to your pocket. He sneers, but he does not come closer. With a last curse he is gone, slamming the door.',
      'You pick up the poker and straighten it. "A dangerous man, Watson. Bring your revolver this afternoon. An Eley\'s No. 2 is an excellent argument with gentlemen who can twist steel pokers into knots."',
    ],
    choices: [{ id: 'continue', text: 'Decide how to spend the morning', to: 'morning' }],
  },

  morning: {
    chapter: 'III · An Unwelcome Guest',
    text: [
      'The man\'s fury tells you one thing: he has something to protect. But what? Money is the usual answer.',
    ],
    choices: [
      { id: 'will', text: 'Go to Doctors\' Commons and read the late Mrs. Roylott\'s will', to: 'will', clue: 'motive' },
      { id: 'train', text: 'Waste no time: take the next train to Leatherhead', to: 'stoke' },
    ],
  },
  will: {
    chapter: 'III · An Unwelcome Guest',
    text: [
      'At Doctors\' Commons you find it. The mother\'s income was once some £1100 a year. Falling prices have reduced it to £750.',
      'Each daughter may claim £250 a year on her marriage. If both married, the Doctor would be left with almost nothing. Even one marriage would cripple him.',
      '"He has the very strongest motive," you tell Watson, "for standing in the way of either wedding."',
    ],
    choices: [{ id: 'continue', text: 'Take the train to Surrey', to: 'stoke' }],
  },

  stoke: {
    chapter: 'IV · Stoke Moran',
    text: (s) => [
      s.time === 4
        ? 'The grey manor rises from a grove of old trees, one wing in ruins, scaffolding against the other. Helen meets you on the lawn. "My stepfather has gone to London. He will not be back before evening."'
        : null,
      s.time > 0
        ? `The sun is sinking. You have time for <b data-testid="time-left">${s.time}</b> more ${s.time === 1 ? 'inspection' : 'inspections'} before the Doctor returns.`
        : 'The light is almost gone. A carriage could arrive at any moment. You must leave <b data-testid="time-left">now</b>.',
    ],
    choices: [
      { id: 'inspect-windows', text: 'Test the window shutters from outside', to: 'i-windows', clue: 'shutters', once: true, time: true },
      { id: 'inspect-bellpull', text: 'Examine the bell-rope beside Julia\'s bed', to: 'i-bellpull', clue: 'bellpull', once: true, time: true },
      { id: 'inspect-ventilator', text: 'Look at the ceiling and the small grate near it', to: 'i-ventilator', clue: 'ventilator', once: true, time: true },
      { id: 'inspect-bed', text: 'Try to move the bed', to: 'i-bed', clue: 'bed', once: true, time: true },
      { id: 'inspect-safe', text: 'Search Dr. Roylott\'s room: the safe', to: 'i-safe', clue: 'safe', once: true, time: true },
      { id: 'inspect-lash', text: 'Search Dr. Roylott\'s room: the bed and chair', to: 'i-lash', clue: 'lash', once: true, time: true },
      { id: 'leave', text: 'Leave the house and find rooms at the Crown Inn', to: 'plan', always: true },
    ],
  },
  'i-windows': {
    chapter: 'IV · Stoke Moran',
    text: [
      'You try every way to open the shutters from outside. Not even a knife blade could lift the bar. Hinges of solid iron, set deep in stone.',
      '"My theory that someone came through the window is fading," you murmur. "So: whatever entered that room came another way."',
    ],
    choices: [{ id: 'back', text: 'Continue', to: 'stoke' }],
  },
  'i-bellpull': {
    chapter: 'IV · Stoke Moran',
    text: [
      'A thick bell-rope hangs beside the bed, its tassel lying on the pillow. You give it a tug. Nothing. No bell rings anywhere in the house.',
      '"It is a dummy," you say, "fastened to a hook just above that little opening. And it is quite new." Helen confirms it was put up only two years ago.',
      '"A bell-rope that rings nothing. Most curious."',
    ],
    choices: [{ id: 'back', text: 'Continue', to: 'stoke' }],
  },
  'i-ventilator': {
    chapter: 'IV · Stoke Moran',
    text: [
      'Near the ceiling is a small ventilator. Odd: why ventilate a room into the next room, when the builder could just as easily open it to the outside air?',
      'It leads directly into Dr. Roylott\'s chamber. Helen says it was made at the same time as the bell-rope.',
    ],
    choices: [{ id: 'back', text: 'Continue', to: 'stoke' }],
  },
  'i-bed': {
    chapter: 'IV · Stoke Moran',
    text: [
      'You put your shoulder to the bed. It will not move. It is clamped to the floor.',
      'So the sleeper must always lie in the same place: directly beneath the bell-rope and the ventilator.',
    ],
    choices: [{ id: 'back', text: 'Continue', to: 'stoke' }],
  },
  'i-safe': {
    chapter: 'IV · Stoke Moran',
    text: [
      'A large iron safe stands in the corner. "Business papers," Helen says. "I once saw inside. Only papers."',
      'On top of the safe sits a small saucer of milk.',
      '"There is no cat in the house," Helen says. "A cheetah is just a big cat," you reply, "and yet a saucer of milk would hardly satisfy one."',
    ],
    choices: [{ id: 'back', text: 'Continue', to: 'stoke' }],
  },
  'i-lash': {
    chapter: 'IV · Stoke Moran',
    text: [
      'A wooden chair beside the ventilator wall: the seat is marked, as if someone often stood on it.',
      'On the corner of the bed hangs a small dog lash. Its end has been tied into a loop, the kind used to hold a creature by the neck.',
      '"When a doctor goes wrong," you say quietly, "he is the first of criminals. He has nerve and he has knowledge."',
    ],
    choices: [{ id: 'back', text: 'Continue', to: 'stoke' }],
  },

  plan: {
    chapter: 'V · The Crown Inn',
    text: (s) => [
      'From your window at the Crown Inn you can see the manor across the park. At dusk the Doctor\'s carriage rolls past, and you hear his voice raised at the boy who opens the gates.',
      s.clues.has('ventilator') || s.clues.has('bellpull')
        ? 'Your mind keeps returning to the ventilator and the rope. A route into the room, and a bridge down to the pillow.'
        : 'You are troubled. There is something in that room you have not yet understood.',
      'Before leaving, you gave Helen your instructions. What were they?',
    ],
    choices: [
      { id: 'plan-signal', text: '"Signal us with a lamp, then go to your old room. Watson and I will spend the night in yours."', to: 'night', flag: 'helenSafe' },
      { id: 'plan-lock', text: '"Lock your door and sleep with the lamp lit. We will watch the house from the lawn."', to: 'ending-lost' },
    ],
  },

  night: {
    chapter: 'VI · The Vigil',
    text: [
      'At eleven a single light shines out across the park. You cross the dark lawn; something like a hideous child flings itself out of a tree and bounds away. "The baboon," you whisper.',
      'You slip into the room through the window, and Helen goes to her old room. You place a lamp on the table, a box of matches, and a long thin cane beside you.',
      '"We must sit without light," you whisper. "He would see it through the ventilator."',
    ],
    choices: [
      { id: 'dark', text: 'Shade the lamp and wait in total darkness', to: 'waiting' },
      { id: 'light', text: 'Leave the lamp burning: you will need to see', to: 'ending-escaped' },
    ],
  },
  waiting: {
    chapter: 'VI · The Vigil',
    text: [
      'The church clock strikes twelve. One. Two. Three. You hardly breathe.',
      'A sudden gleam of light from the ventilator. Then a strong smell of burning oil and heated metal. Someone in the next room has lit a dark lantern.',
      'Then a very gentle, soothing sound, like a small jet of steam escaping from a kettle.',
    ],
    choices: [
      { id: 'strike', text: 'Strike a match and lash with your cane at the bell-rope', to: 'climax', if: (s) => s.clues.has('bellpull') || s.clues.has('ventilator') },
      { id: 'shoot', text: 'Fire your revolver at the ventilator', to: 'ending-escaped' },
      { id: 'freeze', text: 'Stay still and wait to see what happens', to: 'ending-lost' },
    ],
  },
  climax: {
    chapter: 'VI · The Vigil',
    text: [
      '"You see it, Watson? You see it?" You lash furiously at the rope. Something moves upward and is gone through the ventilator.',
      'Then, from the next room, comes a most horrible cry: rage and fear and pain, rising louder and louder. It wakes the whole village. Then silence.',
      'You enter the Doctor\'s room together. The safe stands open. Dr. Grimesby Roylott sits in the wooden chair, quite dead, the dog lash across his knees.',
      'Around his brow is a strange yellow band with brownish speckles.',
      '"The band! The speckled band!" you whisper. The band stirs, and from his hair rises the squat, diamond-shaped head of a loathsome serpent.',
    ],
    choices: [{ id: 'continue', text: 'Explain the case to Watson', to: 'deduction' }],
  },

  deduction: {
    chapter: 'VII · The Solution',
    text: [
      'Later, on the train back to London, Watson turns to you. "Holmes, I confess I am still in the dark. What really killed Julia Stoner?"',
    ],
    choices: [
      { id: 'accuse-adder', text: '"A swamp adder from India, sent down the bell-rope through the ventilator, and whistled back to the safe."', to: 'ending-true' },
      { id: 'accuse-gypsies', text: '"The travellers in their spotted handkerchiefs. The speckled band was a band of people."', to: 'ending-muddled' },
      { id: 'accuse-baboon', text: '"The baboon, trained to climb down the chimney."', to: 'ending-muddled' },
      { id: 'accuse-fright', text: '"Pure terror. Julia simply died of fright."', to: 'ending-muddled' },
    ],
  },

  // ---------- Endings ----------

  'ending-true': {
    chapter: 'The Case is Closed',
    ending: { type: 'true', title: 'The Speckled Band' },
    text: (s) => [
      '"I had come to an entirely wrong conclusion at first," you admit. "The word band, and the travellers, led me astray. But the ventilator and the dummy rope that led to the bed showed me the way."',
      '"A man trained in India, keeping Indian creatures. A poison no chemical test could find. A bite that leaves two tiny marks. He fed it milk, kept it in the safe, and sent it down the rope at night. When he whistled, it came back."',
      s.clues.has('motive')
        ? '"And the will gave him every reason. Two weddings would have ruined him."'
        : '"Why? Money, Watson. I would wager that a will lies at the bottom of this."',
      '"I struck at the snake and drove it back. It turned on its master. I cannot say that it weighs heavily on my conscience."',
      'Helen Stoner is safe. Next month, she will be married.',
    ],
  },
  'ending-muddled': {
    chapter: 'The Case is Closed',
    ending: { type: 'muddled', title: 'Right Night, Wrong Answer' },
    text: [
      'Watson frowns. "But Holmes, we saw the creature ourselves. It was wrapped around his head."',
      'You fall silent. Helen is safe and Dr. Roylott is dead, but you misread the evidence. Lestrade will tell this story in every pub in London.',
      'The speckled band was never a band of people, nor a beast in the chimney. It was a swamp adder from India, sent down the dummy bell-rope through the ventilator.',
    ],
  },
  'ending-escaped': {
    chapter: 'The Case is Closed',
    ending: { type: 'partial', title: 'The Serpent Escapes' },
    text: [
      'The room fills with noise and light. In the next room, a lantern is snuffed and a heavy door closes. Whatever was coming retreats into the dark.',
      'Helen survives the night. But by morning Dr. Roylott is calm and polite, his safe locked and his alibi spotless. There is no proof of anything.',
      'Within a week, Helen\'s letters stop arriving. You never learn what happened at Stoke Moran. Some cases need patience as much as cleverness.',
    ],
  },
  'ending-lost': {
    chapter: 'The Case is Closed',
    ending: { type: 'lost', title: 'A Scream in the Night' },
    text: [
      'At three in the morning a scream rings out across the dark park: high, terrible, and cut short.',
      'By the time you reach her, it is too late. Helen lies just as her sister did. There are two tiny marks on her wrist that no doctor will notice.',
      'Her last words are the same as Julia\'s. You understand them only when it no longer matters.',
      '<em>Hint: the danger was in the room itself. Study the bed, the bell-rope and the ventilator, and keep Helen out of that room.</em>',
    ],
  },
};
