const PLAYER_MAX_HP = 24;

const playerPortrait = `
<svg viewBox="0 0 120 144" role="img" aria-label="骰誓者">
  <defs>
    <linearGradient id="playerBg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#3f2a14"/>
      <stop offset="1" stop-color="#15120d"/>
    </linearGradient>
    <linearGradient id="playerCoat" x1="0" y1="16" x2="0" y2="130" gradientUnits="userSpaceOnUse">
      <stop offset="0" stop-color="#f1b84b"/>
      <stop offset="1" stop-color="#8b4e22"/>
    </linearGradient>
  </defs>
  <rect width="120" height="144" rx="26" fill="url(#playerBg)"/>
  <path d="M18 128C26 94 37 76 60 76s34 18 42 52" fill="#2b2017"/>
  <path d="M30 126c6-31 16-46 30-46s24 15 30 46" fill="url(#playerCoat)"/>
  <path d="M38 48c4-18 16-28 22-28s18 10 22 28l-7 31H45z" fill="#201812"/>
  <circle cx="60" cy="55" r="25" fill="#d9a86a"/>
  <path d="M38 54c4-22 14-33 22-33s20 12 23 32c-10-9-25-9-45 1z" fill="#17110d"/>
  <path d="M43 46c15 7 29 7 42-2-3-13-12-24-25-24-10 0-18 9-17 26z" fill="#f1b84b"/>
  <circle cx="51" cy="58" r="3" fill="#23150c"/>
  <circle cx="69" cy="58" r="3" fill="#23150c"/>
  <path d="M53 70c5 4 10 4 15 0" fill="none" stroke="#6c321e" stroke-width="3" stroke-linecap="round"/>
  <path d="M59 13l10 18-18-2z" fill="#f1b84b"/>
  <rect x="52" y="88" width="16" height="16" rx="4" fill="#fff0c2" transform="rotate(45 60 96)"/>
  <circle cx="60" cy="96" r="3" fill="#2b2017"/>
</svg>`;

const enemies = [
  {
    name: "训练木偶",
    hp: 18,
    min: 3,
    max: 5,
    portrait: `
<svg viewBox="0 0 120 144" role="img" aria-label="训练木偶">
  <rect width="120" height="144" rx="26" fill="#1a1712"/>
  <path d="M22 126c8-36 19-52 38-52s30 16 38 52" fill="#3d2c1c"/>
  <rect x="36" y="34" width="48" height="48" rx="12" fill="#b8894b"/>
  <path d="M36 48h48M45 34v48M75 34v48" stroke="#6c4326" stroke-width="4" opacity=".7"/>
  <circle cx="51" cy="58" r="4" fill="#21140c"/>
  <circle cx="69" cy="58" r="4" fill="#21140c"/>
  <path d="M50 72h20" stroke="#21140c" stroke-width="4" stroke-linecap="round"/>
  <path d="M32 94h56" stroke="#f1b84b" stroke-width="7" stroke-linecap="round"/>
  <circle cx="36" cy="94" r="7" fill="#d6ae72"/>
  <circle cx="84" cy="94" r="7" fill="#d6ae72"/>
</svg>`
  },
  {
    name: "铁皮赌徒",
    hp: 22,
    min: 4,
    max: 7,
    portrait: `
<svg viewBox="0 0 120 144" role="img" aria-label="铁皮赌徒">
  <rect width="120" height="144" rx="26" fill="#12161a"/>
  <path d="M18 126c9-35 22-54 42-54s33 19 42 54" fill="#29343d"/>
  <path d="M33 51c3-22 14-34 27-34s24 12 27 34l-9 30H42z" fill="#59636a"/>
  <circle cx="60" cy="56" r="25" fill="#9ea8a9"/>
  <path d="M36 53c10-18 39-24 53-4-6-24-17-35-29-35S41 26 36 53z" fill="#1c252d"/>
  <circle cx="50" cy="58" r="4" fill="#f1b84b"/>
  <circle cx="70" cy="58" r="4" fill="#f1b84b"/>
  <path d="M52 72c5 3 11 3 16 0" stroke="#263139" stroke-width="4" stroke-linecap="round"/>
  <rect x="45" y="90" width="30" height="30" rx="6" fill="#f1b84b" transform="rotate(45 60 105)"/>
  <circle cx="60" cy="105" r="3" fill="#263139"/>
  <circle cx="50" cy="95" r="2.5" fill="#263139"/>
  <circle cx="70" cy="115" r="2.5" fill="#263139"/>
</svg>`
  },
  {
    name: "红眼卫兵",
    hp: 28,
    min: 5,
    max: 8,
    portrait: `
<svg viewBox="0 0 120 144" role="img" aria-label="红眼卫兵">
  <rect width="120" height="144" rx="26" fill="#1b0f0d"/>
  <path d="M20 128c6-36 20-56 40-56s34 20 40 56" fill="#3a1514"/>
  <path d="M32 54c2-25 14-39 28-39s26 14 28 39L78 85H42z" fill="#4a2220"/>
  <circle cx="60" cy="57" r="26" fill="#68413a"/>
  <path d="M34 52c9-28 43-31 52-1-13-8-38-8-52 1z" fill="#2b1210"/>
  <path d="M45 58h13" stroke="#ff574a" stroke-width="6" stroke-linecap="round"/>
  <path d="M62 58h13" stroke="#ff574a" stroke-width="6" stroke-linecap="round"/>
  <path d="M51 74h18" stroke="#e05a47" stroke-width="4" stroke-linecap="round"/>
  <path d="M31 96l29-16 29 16-29 18z" fill="#c33a32"/>
  <path d="M60 79v42" stroke="#f1b84b" stroke-width="5" stroke-linecap="round"/>
</svg>`
  },
  {
    name: "铸币魔像",
    hp: 34,
    min: 6,
    max: 10,
    portrait: `
<svg viewBox="0 0 120 144" role="img" aria-label="铸币魔像">
  <rect width="120" height="144" rx="26" fill="#181209"/>
  <path d="M17 126c9-38 23-56 43-56s34 18 43 56" fill="#5a3c15"/>
  <rect x="34" y="30" width="52" height="54" rx="14" fill="#b87922"/>
  <path d="M44 40h32v34H44z" fill="#e0a23a"/>
  <circle cx="52" cy="57" r="5" fill="#2b1808"/>
  <circle cx="68" cy="57" r="5" fill="#2b1808"/>
  <path d="M49 72h22" stroke="#2b1808" stroke-width="4" stroke-linecap="round"/>
  <circle cx="60" cy="104" r="24" fill="#f1b84b"/>
  <circle cx="60" cy="104" r="16" fill="#7a4b18"/>
  <path d="M52 104h16M60 96v16" stroke="#f1b84b" stroke-width="4" stroke-linecap="round"/>
</svg>`
  },
  {
    name: "夜场庄家",
    hp: 42,
    min: 7,
    max: 12,
    portrait: `
<svg viewBox="0 0 120 144" role="img" aria-label="夜场庄家">
  <rect width="120" height="144" rx="26" fill="#100d16"/>
  <path d="M18 128c8-39 22-61 42-61s34 22 42 61" fill="#22172d"/>
  <path d="M32 47c5-23 16-35 28-35s23 12 28 35l-9 35H41z" fill="#17101f"/>
  <circle cx="60" cy="55" r="25" fill="#d0a078"/>
  <path d="M36 52c7-24 40-37 52 0-15-9-36-9-52 0z" fill="#2d183f"/>
  <circle cx="50" cy="59" r="4" fill="#6ff0d2"/>
  <circle cx="70" cy="59" r="4" fill="#e05a47"/>
  <path d="M52 73c6 4 12 4 18 0" stroke="#5c2732" stroke-width="4" stroke-linecap="round"/>
  <path d="M36 91l24-14 24 14v34H36z" fill="#4b2d60"/>
  <path d="M45 103h30" stroke="#f1b84b" stroke-width="5" stroke-linecap="round"/>
  <rect x="54" y="86" width="12" height="12" rx="2" fill="#fff0c2" transform="rotate(45 60 92)"/>
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
  els.playerPortrait.innerHTML = playerPortrait;
  els.enemyPortrait.innerHTML = enemy.portrait;
  els.enemyIntent.textContent = state.enemyIntent > 0 ? `意图：造成 ${state.enemyIntent} 点伤害` : "等待你掷骰";
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
      btn.title = "点击撤回这个骰子";
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
  const labels = { attack: "攻", guard: "防", heal: "疗" };
  return labels[slotName] || "";
}

function rollDice() {
  const enemy = currentEnemy();
  state.dice = Array.from({ length: 3 }, () => ({ value: rollD6(), used: false }));
  state.slots = { attack: [], guard: [], heal: [] };
  state.selectedDie = null;
  state.enemyIntent = randomIntent(enemy);
  state.rolled = true;
  addLog(`第 ${state.turn} 回合开始。敌人准备造成 ${state.enemyIntent} 点伤害。`);
  render();
}

function resolveTurn() {
  const attack = sumSlot("attack");
  const guard = sumSlot("guard");
  const heal = Math.floor(sumSlot("heal") / 2);
  const incoming = Math.max(0, state.enemyIntent - guard);

  state.enemyHp = clamp(state.enemyHp - attack, 0, currentEnemy().hp);
  state.playerHp = clamp(state.playerHp + heal - incoming, 0, PLAYER_MAX_HP);

  addLog(`你造成 ${attack} 伤害，格挡 ${guard}，治疗 ${heal}，受到 ${incoming} 伤害。`);

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
  addLog(`胜利！你恢复 4 HP。新的对手：${enemy.name}。`);
  render();
}

function loseRun() {
  state.roundOver = true;
  addLog(`失败。最终连胜：${state.wins}。点击重新开始再来一局。`);
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
  addLog("新的决斗开始。先点击掷骰。");
  render();
}

document.querySelectorAll(".slot").forEach(slot => {
  slot.addEventListener("click", () => assignSelectedDie(slot.dataset.slot));
});

els.rollBtn.addEventListener("click", rollDice);
els.resolveBtn.addEventListener("click", resolveTurn);
els.resetBtn.addEventListener("click", resetGame);

resetGame();
