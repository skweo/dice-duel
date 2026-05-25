const PLAYER_MAX_HP = 24;

const enemies = [
  { name: "训练木偶", hp: 18, min: 3, max: 5 },
  { name: "铁皮赌徒", hp: 22, min: 4, max: 7 },
  { name: "红眼卫兵", hp: 28, min: 5, max: 8 },
  { name: "铸币魔像", hp: 34, min: 6, max: 10 },
  { name: "夜场庄家", hp: 42, min: 7, max: 12 }
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
