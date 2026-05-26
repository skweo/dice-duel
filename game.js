const PLAYER_MAX_HP = 24;

const playerPortrait = `
<svg viewBox="0 0 140 170" role="img" aria-label="The Oathbound">
  <defs>
    <radialGradient id="pHalo" cx="50%" cy="18%" r="68%">
      <stop offset="0" stop-color="#f0c775" stop-opacity=".72"/>
      <stop offset=".46" stop-color="#49301f" stop-opacity=".52"/>
      <stop offset="1" stop-color="#080706"/>
    </radialGradient>
    <linearGradient id="pSteel" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#d8c19a"/>
      <stop offset=".45" stop-color="#6e7881"/>
      <stop offset="1" stop-color="#20242a"/>
    </linearGradient>
    <linearGradient id="pCloak" x1="0" y1="34" x2="0" y2="162" gradientUnits="userSpaceOnUse">
      <stop offset="0" stop-color="#4c1614"/>
      <stop offset=".55" stop-color="#20110f"/>
      <stop offset="1" stop-color="#080605"/>
    </linearGradient>
  </defs>
  <rect width="140" height="170" rx="30" fill="url(#pHalo)"/>
  <path d="M13 162c9-47 26-73 57-73s48 26 57 73" fill="#090706"/>
  <path d="M27 164c8-43 22-64 43-64s35 21 43 64" fill="url(#pCloak)"/>
  <path d="M34 101l36-20 36 20-10 63H44z" fill="#2b1d16"/>
  <path d="M48 104h44l-10 60H58z" fill="url(#pSteel)"/>
  <path d="M40 62c4-28 17-45 30-45s26 17 30 45l-12 35H52z" fill="#16100d"/>
  <circle cx="70" cy="66" r="28" fill="#c99b6f"/>
  <path d="M38 64c8-35 25-52 32-52s24 17 32 52c-20-13-43-13-64 0z" fill="#0d0908"/>
  <path d="M45 55c10-16 40-20 50 0-4-26-15-42-25-42S49 29 45 55z" fill="#d6a95b"/>
  <path d="M52 68h14M74 68h14" stroke="#24130d" stroke-width="5" stroke-linecap="round"/>
  <path d="M61 82c6 5 12 5 18 0" fill="none" stroke="#6b2b21" stroke-width="4" stroke-linecap="round"/>
  <path d="M70 6l10 22-20-2z" fill="#f4d58a"/>
  <rect x="58" y="112" width="24" height="24" rx="5" fill="#f4e2bd" transform="rotate(45 70 124)"/>
  <circle cx="70" cy="124" r="3.8" fill="#261408"/>
  <path d="M42 130l-18 28M98 130l18 28" stroke="#c79a55" stroke-width="5" stroke-linecap="round"/>
</svg>`;

const enemies = [
  {
    name: "Hollow Squire",
    trait: "Splintered oath",
    hp: 18,
    min: 3,
    max: 5,
    portrait: `
<svg viewBox="0 0 140 170" role="img" aria-label="Hollow Squire">
  <rect width="140" height="170" rx="30" fill="#0f0d0a"/>
  <path d="M16 160c10-46 26-70 54-70s44 24 54 70" fill="#211713"/>
  <path d="M32 102l38-22 38 22-13 59H45z" fill="#3a281d"/>
  <rect x="43" y="36" width="54" height="55" rx="13" fill="#9a6c36"/>
  <path d="M43 51h54M53 36v55M87 36v55" stroke="#59351f" stroke-width="5" opacity=".72"/>
  <circle cx="59" cy="62" r="5" fill="#16100b"/>
  <circle cx="81" cy="62" r="5" fill="#16100b"/>
  <path d="M57 77h26" stroke="#16100b" stroke-width="5" stroke-linecap="round"/>
  <path d="M33 111h74" stroke="#d0a25b" stroke-width="8" stroke-linecap="round"/>
  <circle cx="37" cy="111" r="8" fill="#c19a62"/>
  <circle cx="103" cy="111" r="8" fill="#c19a62"/>
  <path d="M31 28l18 7M109 28l-18 7" stroke="#c79a55" stroke-width="5" stroke-linecap="round"/>
</svg>`
  },
  {
    name: "Iron Gambler",
    trait: "Rustbound cheat",
    hp: 22,
    min: 4,
    max: 7,
    portrait: `
<svg viewBox="0 0 140 170" role="img" aria-label="Iron Gambler">
  <rect width="140" height="170" rx="30" fill="#0a0d10"/>
  <path d="M16 160c11-44 28-69 54-69s43 25 54 69" fill="#1f2a31"/>
  <path d="M35 66c3-32 17-50 35-50s32 18 35 50l-13 40H48z" fill="#424d56"/>
  <circle cx="70" cy="69" r="31" fill="#9ba6aa"/>
  <path d="M37 66c12-26 51-31 66-5-6-33-19-49-33-49S44 29 37 66z" fill="#151c22"/>
  <circle cx="58" cy="70" r="5" fill="#e0ad54"/>
  <circle cx="82" cy="70" r="5" fill="#e0ad54"/>
  <path d="M60 87c6 4 14 4 20 0" stroke="#20272d" stroke-width="5" stroke-linecap="round"/>
  <path d="M39 110l31-18 31 18-31 20z" fill="#293844"/>
  <rect x="54" y="108" width="32" height="32" rx="6" fill="#e0ad54" transform="rotate(45 70 124)"/>
  <circle cx="70" cy="124" r="3.6" fill="#1a2228"/>
  <circle cx="58" cy="112" r="2.8" fill="#1a2228"/>
  <circle cx="82" cy="136" r="2.8" fill="#1a2228"/>
</svg>`
  },
  {
    name: "Blood-Eye Warden",
    trait: "Chapel executioner",
    hp: 28,
    min: 5,
    max: 8,
    portrait: `
<svg viewBox="0 0 140 170" role="img" aria-label="Blood-Eye Warden">
  <rect width="140" height="170" rx="30" fill="#160908"/>
  <path d="M18 162c8-49 28-75 52-75s44 26 52 75" fill="#35100f"/>
  <path d="M35 68c3-36 17-55 35-55s32 19 35 55l-15 42H50z" fill="#2a0e0d"/>
  <circle cx="70" cy="70" r="32" fill="#6b4038"/>
  <path d="M36 66c12-38 55-42 68-2-18-12-49-12-68 2z" fill="#170807"/>
  <path d="M50 70h17" stroke="#ff5b4a" stroke-width="7" stroke-linecap="round"/>
  <path d="M73 70h17" stroke="#ff5b4a" stroke-width="7" stroke-linecap="round"/>
  <path d="M58 89h25" stroke="#e05a47" stroke-width="5" stroke-linecap="round"/>
  <path d="M35 112l35-22 35 22-35 24z" fill="#9c2b29"/>
  <path d="M70 90v60" stroke="#d6a95b" stroke-width="6" stroke-linecap="round"/>
  <path d="M48 123h44" stroke="#d6a95b" stroke-width="5" stroke-linecap="round"/>
</svg>`
  },
  {
    name: "Coinforged Golem",
    trait: "Living tithe engine",
    hp: 34,
    min: 6,
    max: 10,
    portrait: `
<svg viewBox="0 0 140 170" role="img" aria-label="Coinforged Golem">
  <rect width="140" height="170" rx="30" fill="#130d07"/>
  <path d="M16 162c10-51 29-74 54-74s44 23 54 74" fill="#4c3213"/>
  <rect x="39" y="34" width="62" height="62" rx="15" fill="#9e661d"/>
  <path d="M51 46h38v38H51z" fill="#d69835"/>
  <circle cx="60" cy="66" r="6" fill="#231207"/>
  <circle cx="80" cy="66" r="6" fill="#231207"/>
  <path d="M57 84h27" stroke="#231207" stroke-width="5" stroke-linecap="round"/>
  <circle cx="70" cy="125" r="31" fill="#e0ad54"/>
  <circle cx="70" cy="125" r="20" fill="#674015"/>
  <path d="M60 125h20M70 115v20" stroke="#e0ad54" stroke-width="5" stroke-linecap="round"/>
  <path d="M36 109l-13 32M104 109l13 32" stroke="#8f5c20" stroke-width="8" stroke-linecap="round"/>
</svg>`
  },
  {
    name: "Black Chapel Dealer",
    trait: "Saint of crooked odds",
    hp: 42,
    min: 7,
    max: 12,
    portrait: `
<svg viewBox="0 0 140 170" role="img" aria-label="Black Chapel Dealer">
  <defs>
    <radialGradient id="dGlow" cx="50%" cy="22%" r="72%">
      <stop offset="0" stop-color="#5b315f"/>
      <stop offset=".46" stop-color="#1a1022"/>
      <stop offset="1" stop-color="#060408"/>
    </radialGradient>
  </defs>
  <rect width="140" height="170" rx="30" fill="url(#dGlow)"/>
  <path d="M16 162c10-52 29-80 54-80s44 28 54 80" fill="#160b1d"/>
  <path d="M34 61c6-32 20-49 36-49s30 17 36 49l-14 48H48z" fill="#0d0711"/>
  <circle cx="70" cy="67" r="31" fill="#c69a78"/>
  <path d="M37 64c9-32 52-50 66 0-20-13-45-13-66 0z" fill="#2b1736"/>
  <circle cx="58" cy="70" r="5" fill="#74f1d4"/>
  <circle cx="82" cy="70" r="5" fill="#f05a45"/>
  <path d="M60 88c7 5 14 5 21 0" stroke="#5b2732" stroke-width="5" stroke-linecap="round"/>
  <path d="M38 112l32-20 32 20v46H38z" fill="#3c224d"/>
  <path d="M49 128h42" stroke="#e0ad54" stroke-width="6" stroke-linecap="round"/>
  <rect x="59" y="103" width="22" height="22" rx="4" fill="#f4e2bd" transform="rotate(45 70 114)"/>
  <circle cx="70" cy="114" r="3.4" fill="#2b1736"/>
</svg>`
  }
];

const state = {
  playerHp: PLAYER_MAX_HP,
  enemyIndex: 0,
  enemyHp: enemies[0].hp,
  turn: 1,
  wins: 0,
  dice: [],
  selectedDie: null,
  slots: { attack: [], guard: [], heal: [] },
  enemyIntent: 0,
  rolled: false,
  roundOver: false
};

const els = {
  turn: document.getElementById("turn"),
  wins: document.getElementById("wins"),
  playerHp: document.getElementById("player-hp"),
  playerHpBar: document.getElementById("player-hp-bar"),
  enemyName: document.getElementById("enemy-name"),
  enemyTrait: document.getElementById("enemy-trait"),
  enemyIntent: document.getElementById("enemy-intent"),
  playerPortrait: document.getElementById("player-portrait"),
  enemyPortrait: document.getElementById("enemy-portrait"),
  enemyHp: document.getElementById("enemy-hp"),
  enemyHpBar: document.getElementById("enemy-hp-bar"),
  diceTray: document.getElementById("dice-tray"),
  rollBtn: document.getElementById("roll-btn"),
  resolveBtn: document.getElementById("resolve-btn"),
  resetBtn: document.getElementById("reset-btn"),
  attackTotal: document.getElementById("attack-total"),
  guardTotal: document.getElementById("guard-total"),
  healTotal: document.getElementById("heal-total"),
  log: document.getElementById("battle-log")
};

function currentEnemy() {
  return enemies[Math.min(state.enemyIndex, enemies.length - 1)];
}

function rollD6() {
  return Math.floor(Math.random() * 6) + 1;
}

function randomIntent(enemy) {
  return enemy.min + Math.floor(Math.random() * (enemy.max - enemy.min + 1));
}

function sumSlot(slotName) {
  return state.slots[slotName].reduce((total, dieIndex) => total + state.dice[dieIndex].value, 0);
}

function allDiceAssigned() {
  return state.dice.length > 0 && state.dice.every(die => die.used);
}

function slotForDie(index) {
  return Object.keys(state.slots).find(slotName => state.slots[slotName].includes(index));
}

function unassignDie(index) {
  const slotName = slotForDie(index);
  if (!slotName) return false;
  state.slots[slotName] = state.slots[slotName].filter(dieIndex => dieIndex !== index);
  state.dice[index].used = false;
  return true;
}

function addLog(text) {
  const p = document.createElement("p");
  p.textContent = text;
  els.log.prepend(p);
}

function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

function render() {
  const enemy = currentEnemy();
  els.turn.textContent = state.turn;
  els.wins.textContent = state.wins;
  els.playerHp.textContent = `${state.playerHp}/${PLAYER_MAX_HP}`;
  els.playerHpBar.style.width = `${(state.playerHp / PLAYER_MAX_HP) * 100}%`;
  els.enemyName.textContent = enemy.name;
  els.enemyTrait.textContent = enemy.trait;
  els.playerPortrait.innerHTML = playerPortrait;
  els.enemyPortrait.innerHTML = enemy.portrait;
  els.enemyIntent.textContent = state.enemyIntent > 0 ? `Intent: deal ${state.enemyIntent} damage` : "Waiting for your cast";
  els.enemyHp.textContent = `${state.enemyHp}/${enemy.hp}`;
  els.enemyHpBar.style.width = `${(state.enemyHp / enemy.hp) * 100}%`;

  els.attackTotal.textContent = sumSlot("attack");
  els.guardTotal.textContent = sumSlot("guard");
  els.healTotal.textContent = Math.floor(sumSlot("heal") / 2);

  els.rollBtn.disabled = state.rolled || state.roundOver;
  els.resolveBtn.disabled = !allDiceAssigned() || state.roundOver;

  els.diceTray.innerHTML = "";
  state.dice.forEach((die, index) => {
    const btn = document.createElement("button");
    btn.className = "die";
    btn.textContent = die.value;
    btn.disabled = state.roundOver;
    if (state.selectedDie === index) btn.classList.add("selected");
    if (die.used) {
      btn.classList.add("used");
      btn.title = "Click to reclaim this die";
      const badge = document.createElement("span");
      badge.className = "die-slot-badge";
      badge.textContent = slotLabel(slotForDie(index));
      btn.appendChild(badge);
    }
    btn.addEventListener("click", () => selectDie(index));
    els.diceTray.appendChild(btn);
  });
}

function selectDie(index) {
  if (state.dice[index].used) {
    unassignDie(index);
    state.selectedDie = index;
    render();
    return;
  }
  state.selectedDie = state.selectedDie === index ? null : index;
  render();
}

function assignSelectedDie(slotName) {
  if (state.selectedDie === null || state.roundOver) return;
  state.slots[slotName].push(state.selectedDie);
  state.dice[state.selectedDie].used = true;
  state.selectedDie = null;
  render();
}

function slotLabel(slotName) {
  const labels = { attack: "STR", guard: "WRD", heal: "MND" };
  return labels[slotName] || "";
}

function rollDice() {
  const enemy = currentEnemy();
  state.dice = Array.from({ length: 3 }, () => ({ value: rollD6(), used: false }));
  state.slots = { attack: [], guard: [], heal: [] };
  state.selectedDie = null;
  state.enemyIntent = randomIntent(enemy);
  state.rolled = true;
  addLog(`Turn ${state.turn}. ${enemy.name} prepares to deal ${state.enemyIntent} damage.`);
  render();
}

function resolveTurn() {
  const attack = sumSlot("attack");
  const guard = sumSlot("guard");
  const heal = Math.floor(sumSlot("heal") / 2);
  const incoming = Math.max(0, state.enemyIntent - guard);

  state.enemyHp = clamp(state.enemyHp - attack, 0, currentEnemy().hp);
  state.playerHp = clamp(state.playerHp + heal - incoming, 0, PLAYER_MAX_HP);

  addLog(`You strike for ${attack}, ward ${guard}, mend ${heal}, and suffer ${incoming}.`);

  if (state.enemyHp <= 0) {
    winFight();
    return;
  }

  if (state.playerHp <= 0) {
    loseRun();
    return;
  }

  state.turn += 1;
  state.rolled = false;
  state.dice = [];
  state.slots = { attack: [], guard: [], heal: [] };
  state.enemyIntent = 0;
  render();
}

function winFight() {
  state.wins += 1;
  state.enemyIndex = Math.min(state.enemyIndex + 1, enemies.length - 1);
  const enemy = currentEnemy();
  state.enemyHp = enemy.hp;
  state.playerHp = clamp(state.playerHp + 4, 0, PLAYER_MAX_HP);
  state.turn += 1;
  state.rolled = false;
  state.dice = [];
  state.slots = { attack: [], guard: [], heal: [] };
  state.enemyIntent = 0;
  addLog(`Victory. You restore 4 vigor. A new foe enters: ${enemy.name}.`);
  render();
}

function loseRun() {
  state.roundOver = true;
  addLog(`The oath breaks. Final streak: ${state.wins}. Begin again to challenge the chapel.`);
  render();
}

function resetGame() {
  state.playerHp = PLAYER_MAX_HP;
  state.enemyIndex = 0;
  state.enemyHp = enemies[0].hp;
  state.turn = 1;
  state.wins = 0;
  state.dice = [];
  state.selectedDie = null;
  state.slots = { attack: [], guard: [], heal: [] };
  state.enemyIntent = 0;
  state.rolled = false;
  state.roundOver = false;
  els.log.innerHTML = "";
  addLog("A new oath is sworn. Cast the dice.");
  render();
}

document.querySelectorAll(".slot").forEach(slot => {
  slot.addEventListener("click", () => assignSelectedDie(slot.dataset.slot));
});

els.rollBtn.addEventListener("click", rollDice);
els.resolveBtn.addEventListener("click", resolveTurn);
els.resetBtn.addEventListener("click", resetGame);

resetGame();
