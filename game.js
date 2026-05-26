const PLAYER_MAX_HP = 24;

const storyFragments = [
  "门外的雨没有声音。只有骰子在掌心里轻轻敲响。",
  "墙上的圣像都被蒙住眼睛，像是不愿替谁作证。",
  "账册翻开了一页，墨迹还湿，姓名栏却被刮空。",
  "烛火朝着你倒伏。礼拜堂在等待下一次下注。"
];

const playerSkill = {
  name: "三相誓约",
  desc: "若本回合攻击、防御、恢复三个槽都有骰子，则攻击、防御、恢复点数各 +2。",
  apply(ctx) {
    if (ctx.attackDice > 0 && ctx.guardDice > 0 && ctx.healDice > 0) {
      ctx.attack += 2;
      ctx.guard += 2;
      ctx.healPips += 2;
      ctx.messages.push("三相誓约触发：三枚骰印同时发烫，攻击、防御、恢复点数各 +2。");
    }
  }
};

const playerPortrait = `
<svg viewBox="0 0 140 170" role="img" aria-label="誓约者">
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
    name: "朽木侍从",
    trait: "裂誓木偶",
    lore: "它曾是练习用的侍从木桩。后来有人把输家的名字钉进木纹里。",
    intro: "朽木侍从拖着钉满姓名的木臂走来。它不会说话，只会模仿上一位输家的姿势。",
    defeat: "木纹裂开，一枚生锈钉子掉在地上。钉帽上刻着一个被磨掉的姓。",
    skillName: "木刺反扑",
    skillDesc: "若你本回合没有投入防御骰，造成伤害后受到 1 点反伤。",
    hp: 18,
    min: 3,
    max: 5,
    applySkill(ctx) {
      if (ctx.guardDice === 0 && ctx.attack > 0) {
        ctx.selfDamage += 1;
        ctx.messages.push("木刺反扑：你没有防御，木刺从伤口里弹回，受到 1 点反伤。");
      }
    },
    portrait: `
<svg viewBox="0 0 140 170" role="img" aria-label="朽木侍从">
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
    name: "铁面赌徒",
    trait: "锈牌老千",
    lore: "他的铁面具焊死在脸上。面具内侧刻满了他没有兑现的赔率。",
    intro: "铁面赌徒把一枚骰子藏进袖口。礼拜堂没有阻止他，像是默认作弊也是规矩的一部分。",
    defeat: "铁面具里滚出三颗假骰。每一颗都只有一面。",
    skillName: "作弊骰",
    skillDesc: "若你的攻击骰总点数小于防御骰总点数，敌人本回合伤害 +2。",
    hp: 22,
    min: 4,
    max: 7,
    applySkill(ctx) {
      if (ctx.attack < ctx.guard) {
        ctx.intent += 2;
        ctx.messages.push("作弊骰：你守得太深，他趁空换骰，本回合伤害 +2。");
      }
    },
    portrait: `
<svg viewBox="0 0 140 170" role="img" aria-label="铁面赌徒">
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
    name: "赤眼典狱官",
    trait: "礼拜堂刑吏",
    lore: "他负责处置赖账者。赤眼不是眼睛，是两枚烧红的债印。",
    intro: "赤眼典狱官翻开刑簿。你的名字没有出现，只有一段空白被红线圈住。",
    defeat: "刑簿合上时发出骨头折断的声音。红线从纸面渗进你的骰印。",
    skillName: "处刑目光",
    skillDesc: "若你本回合没有造成至少 6 点伤害，敌人额外造成 3 点伤害。",
    hp: 28,
    min: 5,
    max: 8,
    applySkill(ctx) {
      if (ctx.attack < 6) {
        ctx.intent += 3;
        ctx.messages.push("处刑目光：伤害不足 6，典狱官判定你迟疑，额外伤害 +3。");
      }
    },
    portrait: `
<svg viewBox="0 0 140 170" role="img" aria-label="赤眼典狱官">
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
    name: "铸币魔像",
    trait: "活体什一税机",
    lore: "它由输家的金币、牙齿和忏悔税铸成。胸口的空洞像一只永远张开的钱袋。",
    intro: "铸币魔像踩碎一地铜币。每一枚都在尖叫，声音却像掌声。",
    defeat: "魔像崩塌后，金币没有散开，而是排成一行，指向礼拜堂更深处。",
    skillName: "金壳护体",
    skillDesc: "每回合受到的前 2 点伤害会被抵消。",
    hp: 34,
    min: 6,
    max: 10,
    applySkill(ctx) {
      const blocked = Math.min(2, ctx.attack);
      if (blocked > 0) {
        ctx.attack -= blocked;
        ctx.messages.push(`金壳护体：硬币鳞片合拢，抵消了 ${blocked} 点伤害。`);
      }
    },
    portrait: `
<svg viewBox="0 0 140 170" role="img" aria-label="铸币魔像">
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
    name: "黑礼拜堂庄家",
    trait: "歪曲赔率的圣徒",
    lore: "没人见过他的真脸。有人说庄家不是人，而是整座礼拜堂学会了微笑。",
    intro: "黑礼拜堂庄家替你拉开椅子。桌面上摆着一张旧契约，签名处与你的笔迹一模一样。",
    defeat: "庄家的影子没有倒下。它只是把账册推到你面前，像是在邀请你翻到第一页。",
    skillName: "终局赔率",
    skillDesc: "若你的生命低于 10，敌人伤害 +2；若高于 18，敌人受到伤害 -2。",
    hp: 42,
    min: 7,
    max: 12,
    applySkill(ctx) {
      if (state.playerHp < 10) {
        ctx.intent += 2;
        ctx.messages.push("终局赔率：你生命低于 10，庄家提高赔率，敌人伤害 +2。");
      }
      if (state.playerHp > 18) {
        const reduced = Math.min(2, ctx.attack);
        ctx.attack -= reduced;
        if (reduced > 0) ctx.messages.push(`终局赔率：你状态太好，赔率被压低，敌人减免 ${reduced} 点伤害。`);
      }
    },
    portrait: `
<svg viewBox="0 0 140 170" role="img" aria-label="黑礼拜堂庄家">
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
  playerSkill: document.getElementById("player-skill"),
  enemyName: document.getElementById("enemy-name"),
  enemyTrait: document.getElementById("enemy-trait"),
  enemyLore: document.getElementById("enemy-lore"),
  enemySkill: document.getElementById("enemy-skill"),
  enemySkillDesc: document.getElementById("enemy-skill-desc"),
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

function slotCount(slotName) {
  return state.slots[slotName].length;
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

function getPreviewTotals() {
  const ctx = createTurnContext();
  playerSkill.apply(ctx);
  return {
    attack: ctx.attack,
    guard: ctx.guard,
    heal: Math.floor(ctx.healPips / 2)
  };
}

function createTurnContext() {
  return {
    attack: sumSlot("attack"),
    guard: sumSlot("guard"),
    healPips: sumSlot("heal"),
    attackDice: slotCount("attack"),
    guardDice: slotCount("guard"),
    healDice: slotCount("heal"),
    intent: state.enemyIntent,
    selfDamage: 0,
    messages: []
  };
}

function render() {
  const enemy = currentEnemy();
  const totals = getPreviewTotals();
  els.turn.textContent = state.turn;
  els.wins.textContent = state.wins;
  els.playerHp.textContent = `${state.playerHp}/${PLAYER_MAX_HP}`;
  els.playerHpBar.style.width = `${(state.playerHp / PLAYER_MAX_HP) * 100}%`;
  els.playerSkill.textContent = playerSkill.name;
  els.enemyName.textContent = enemy.name;
  els.enemyTrait.textContent = enemy.trait;
  els.enemyLore.textContent = enemy.lore;
  els.enemySkill.textContent = enemy.skillName;
  els.enemySkillDesc.textContent = enemy.skillDesc;
  els.playerPortrait.innerHTML = playerPortrait;
  els.enemyPortrait.innerHTML = enemy.portrait;
  els.enemyIntent.textContent = state.enemyIntent > 0 ? `意图：造成 ${state.enemyIntent} 点伤害` : "等待你掷骰";
  els.enemyHp.textContent = `${state.enemyHp}/${enemy.hp}`;
  els.enemyHpBar.style.width = `${(state.enemyHp / enemy.hp) * 100}%`;

  els.attackTotal.textContent = totals.attack;
  els.guardTotal.textContent = totals.guard;
  els.healTotal.textContent = totals.heal;

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
  const labels = { attack: "攻", guard: "防", heal: "愈" };
  return labels[slotName] || "";
}

function rollDice() {
  const enemy = currentEnemy();
  state.dice = Array.from({ length: 3 }, () => ({ value: rollD6(), used: false }));
  state.slots = { attack: [], guard: [], heal: [] };
  state.selectedDie = null;
  state.enemyIntent = randomIntent(enemy);
  state.rolled = true;
  addLog(`第 ${state.turn} 回合：${enemy.name} 准备造成 ${state.enemyIntent} 点伤害。`);
  render();
}

function resolveTurn() {
  const enemy = currentEnemy();
  const ctx = createTurnContext();
  playerSkill.apply(ctx);
  enemy.applySkill(ctx);

  const heal = Math.floor(ctx.healPips / 2);
  const incoming = Math.max(0, ctx.intent - ctx.guard);
  const totalSelfDamage = incoming + ctx.selfDamage;

  state.enemyHp = clamp(state.enemyHp - ctx.attack, 0, enemy.hp);
  state.playerHp = clamp(state.playerHp + heal - totalSelfDamage, 0, PLAYER_MAX_HP);

  for (const msg of ctx.messages) addLog(msg);
  addLog(`你造成 ${ctx.attack} 点伤害，防御 ${ctx.guard} 点，恢复 ${heal} 点，受到 ${totalSelfDamage} 点伤害。`);

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
  const defeated = currentEnemy();
  addLog(defeated.defeat);
  state.wins += 1;

  if (state.enemyIndex >= enemies.length - 1) {
    addLog("你走到赌桌尽头，却发现庄家的座位空着。椅背上刻着：第一局，现在开始。");
    state.roundOver = true;
    render();
    return;
  }

  state.enemyIndex += 1;
  const enemy = currentEnemy();
  state.enemyHp = enemy.hp;
  state.turn += 1;
  state.rolled = false;
  state.dice = [];
  state.slots = { attack: [], guard: [], heal: [] };
  state.enemyIntent = 0;
  addLog(`胜利！当前生命保持为 ${state.playerHp}/${PLAYER_MAX_HP}。`);
  addLog(enemy.intro);
  render();
}

function loseRun() {
  state.roundOver = true;
  addLog("誓约破碎。账册合上时，你听见有人用你的声音说：再来一局。");
  addLog(`最终连胜：${state.wins}。`);
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
  addLog("新的誓约开始。点击掷骰。");
  for (const text of storyFragments.slice(0, 2).reverse()) addLog(text);
  addLog(currentEnemy().intro);
  render();
}

document.querySelectorAll(".slot").forEach(slot => {
  slot.addEventListener("click", () => assignSelectedDie(slot.dataset.slot));
});

els.rollBtn.addEventListener("click", rollDice);
els.resolveBtn.addEventListener("click", resolveTurn);
els.resetBtn.addEventListener("click", resetGame);

resetGame();
