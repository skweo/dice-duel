const FINAL_ROUND = 6;
const ROUTE_CHOICE_ROUNDS = new Set([2, 4]);
const SWITCH_BASE_COST = 3;
const STARTER_CHARACTER_IDS = ["oathbound", "ironConfessor"];
const CHARACTER_UNLOCK_KEY = "dice_oath_unlocked_characters_v1";
const CODEX_KEY = "dice_oath_codex_v1";
const THEME_CLASSES = [
  "theme-debt",
  "theme-blood",
  "theme-dream",
  "boss-mode",
  "boss-debt",
  "boss-blood",
  "boss-dream"
];

const PATH_LABELS = {
  debt: "债",
  blood: "血",
  dream: "梦"
};

const PATH_CLASSES = {
  debt: "path-debt",
  blood: "path-blood",
  dream: "path-dream"
};

const ROUTE_SLOT_ORDER = ["attack", "guard", "heal"];
const ACTION_SLOTS = ["attack", "guard", "heal"];

const storyFragments = [
  "黑礼拜堂不是建筑，而是一支随雨迁徙的审判军。它把失败者收进墙里，把胜利者送进更深的门。",
  "门外的雨没有声音。只有骰子在掌心里轻轻敲响，像小型圣钟，也像弹壳落地。",
  "墙上的圣像都被蒙住眼睛，像是不愿替谁作证。每一块黄铜铭牌都刻着被抹去的姓。",
  "账册翻开了一页，墨迹还湿，姓名栏却被刮空。有人在空白处预留了你的骨灰。",
  "烛火朝着你倒伏。礼拜堂在等待下一次下注，帝国边境也在等待下一名能活着回来的证人。"
];

const portraits = {
  oathbound: playerCardPortrait("誓约者", "#faf0d7", "#8f2f20", "#e7b75d", "dice"),
  ironConfessor: playerCardPortrait("铁赦修女", "#edf3f4", "#273b46", "#b9c8d6", "shield"),
  ledgerKnight: playerCardPortrait("账册骑士", "#f5e4ba", "#6f4416", "#d0a24d", "ledger"),
  redPilgrim: playerCardPortrait("赤烛朝圣者", "#ffe1cf", "#b63b35", "#ff8b62", "candle"),
  mirrorVagrant: playerCardPortrait("镜隙流亡者", "#e8f9ff", "#2f4970", "#6dd7d2", "mirror"),
  wood: enemyCardPortrait("朽木侍从", "#f0ddae", "#6b4a24", "#b98a3a", "wood"),
  iron: enemyCardPortrait("铁面赌徒", "#dce5e8", "#25313a", "#d5a24e", "mask"),
  red: enemyCardPortrait("赤眼典狱官", "#ffd8cc", "#7e1d18", "#f05a45", "bars"),
  coin: enemyCardPortrait("铸币魔像", "#f2d283", "#7b5518", "#e0ad54", "coin"),
  violet: enemyCardPortrait("黑礼拜堂庄家", "#e8d8ff", "#46305f", "#74d7c9", "dealer"),
  pale: enemyCardPortrait("镜中修女", "#f4efe8", "#4c4b52", "#9edcff", "veil"),
  green: enemyCardPortrait("药园司祭", "#e0f0c8", "#31502d", "#9bcf84", "leaf"),
  ash: enemyCardPortrait("灰烬钟童", "#e3d4b7", "#565047", "#c7aa78", "bell"),
  wax: enemyCardPortrait("封蜡书记", "#f2c39f", "#6b2b1f", "#f0b36a", "seal"),
  moth: enemyCardPortrait("梦蛾女仆", "#eadcff", "#44325f", "#d8c7ff", "moth"),
  rabbit: enemyCardPortrait("白兔报时官", "#fff1cb", "#405162", "#fff0c9", "clock"),
  tax: enemyCardPortrait("什一税审计员", "#f1d890", "#684719", "#f0d16d", "abacus"),
  butcher: enemyCardPortrait("血槽屠户", "#ffd4c8", "#6c1512", "#f05a45", "hook"),
  child: enemyCardPortrait("潮湿圣童", "#d8f8ff", "#255060", "#a9f1ff", "choir"),
  judge: enemyCardPortrait("空座审判官", "#f1e6c7", "#2a2230", "#e0ad54", "judge"),
  hound: enemyCardPortrait("赤犬主教", "#ffd0c5", "#5d1514", "#f05a45", "hound"),
  queen: enemyCardPortrait("睡梦女王", "#f1dbff", "#40255a", "#e7c6ff", "queen")
};

function playerCardPortrait(label, paper, ink, accent, motif) {
  const gradientId = `player-${motif}-paper`;
  const glowId = `player-${motif}-glow`;
  return `
<svg class="card-portrait player-token" viewBox="0 0 160 210" role="img" aria-label="${label}">
  <defs>
    <linearGradient id="${gradientId}" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#fffaf0"/>
      <stop offset=".42" stop-color="${paper}"/>
      <stop offset="1" stop-color="#c8a45f"/>
    </linearGradient>
    <radialGradient id="${glowId}" cx="50%" cy="34%" r="72%">
      <stop offset="0" stop-color="${accent}" stop-opacity=".72"/>
      <stop offset="1" stop-color="${accent}" stop-opacity="0"/>
    </radialGradient>
  </defs>
  <rect x="4" y="4" width="152" height="202" rx="24" fill="url(#${gradientId})"/>
  <rect x="11" y="11" width="138" height="188" rx="19" fill="none" stroke="${ink}" stroke-opacity=".3" stroke-width="2"/>
  <path d="M20 35c32-18 88-18 120 0M20 174c32 18 88 18 120 0" fill="none" stroke="${ink}" stroke-width="2.5" opacity=".26"/>
  <circle cx="80" cy="106" r="58" fill="url(#${glowId})"/>
  <path d="M28 45c21-12 83-12 104 0v124c-21 12-83 12-104 0z" fill="#fffaf0" opacity=".28"/>
  ${playerMotifSvg(motif, ink, accent, paper)}
  <path d="M26 27h22M112 27h22M26 184h22M112 184h22" stroke="${ink}" stroke-width="3" stroke-linecap="round" opacity=".42"/>
</svg>`;
}

function enemyCardPortrait(label, paper, ink, accent, motif) {
  const gradientId = `enemy-${motif}-paper`;
  return `
<svg class="card-portrait enemy-token" viewBox="0 0 160 210" role="img" aria-label="${label}">
  <defs>
    <linearGradient id="${gradientId}" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#fff6df"/>
      <stop offset=".5" stop-color="${paper}"/>
      <stop offset="1" stop-color="#9a7648"/>
    </linearGradient>
  </defs>
  <rect x="4" y="4" width="152" height="202" rx="24" fill="url(#${gradientId})"/>
  <rect x="12" y="12" width="136" height="186" rx="18" fill="${ink}" opacity=".08"/>
  <path d="M18 33c22-15 102-15 124 0v144c-22 15-102 15-124 0z" fill="${ink}" opacity=".88"/>
  <path d="M28 50c17-11 87-11 104 0v110c-17 11-87 11-104 0z" fill="${paper}" opacity=".12"/>
  ${enemyMotifSvg(motif, paper, ink, accent)}
  <path d="M28 35h104M28 175h104" stroke="${accent}" stroke-width="4" stroke-linecap="round" opacity=".72"/>
  <path d="M42 27l-11 11M118 27l11 11M42 183l-11-11M118 183l11-11" stroke="#fff6d8" stroke-width="2.5" opacity=".55"/>
</svg>`;
}

function playerMotifSvg(motif, ink, accent, paper) {
  const motifs = {
    dice: `
      <path d="M41 167c7-51 21-94 39-94s32 43 39 94z" fill="${ink}" opacity=".9"/>
      <path d="M55 75c7-24 18-37 25-37s18 13 25 37c-15-7-35-7-50 0z" fill="${accent}"/>
      <path d="M47 170c14-19 52-19 66 0" fill="none" stroke="#fff6dd" stroke-width="5" stroke-linecap="round" opacity=".6"/>
      <g transform="translate(30 104) rotate(-18)"><rect width="34" height="34" rx="8" fill="#fff7df" stroke="${ink}" stroke-width="4"/><circle cx="10" cy="10" r="3.3" fill="${ink}"/><circle cx="24" cy="10" r="3.3" fill="${ink}"/><circle cx="17" cy="17" r="3.3" fill="${ink}"/><circle cx="10" cy="24" r="3.3" fill="${ink}"/><circle cx="24" cy="24" r="3.3" fill="${ink}"/></g>
      <g transform="translate(95 112) rotate(16)"><rect width="34" height="34" rx="8" fill="#fff7df" stroke="${ink}" stroke-width="4"/><circle cx="10" cy="10" r="3.3" fill="${ink}"/><circle cx="24" cy="24" r="3.3" fill="${ink}"/></g>
      <g transform="translate(64 133) rotate(45)"><rect width="36" height="36" rx="8" fill="${accent}" stroke="#fff4d2" stroke-width="4"/><circle cx="11" cy="11" r="3.4" fill="${ink}"/><circle cx="25" cy="11" r="3.4" fill="${ink}"/><circle cx="11" cy="25" r="3.4" fill="${ink}"/><circle cx="25" cy="25" r="3.4" fill="${ink}"/></g>
      <path d="M33 89c32 15 62 15 94 0" fill="none" stroke="${ink}" stroke-width="3" opacity=".32"/>`,
    shield: `
      <path d="M38 161c8-49 18-82 42-82s34 33 42 82z" fill="#263844"/>
      <path d="M57 73l23-39 23 39-9 25H66z" fill="${paper}" stroke="${ink}" stroke-width="5"/>
      <path d="M80 83l39 16c-4 41-18 68-39 83-21-15-35-42-39-83z" fill="#f8fbfb" stroke="${ink}" stroke-width="6"/>
      <path d="M80 94v72M55 118h50" stroke="${accent}" stroke-width="8" stroke-linecap="round"/>
      <path d="M33 122l-16-28M127 122l16-28" stroke="${ink}" stroke-width="9" stroke-linecap="round"/>`,
    ledger: `
      <path d="M31 160c9-42 23-70 49-70s40 28 49 70z" fill="${ink}" opacity=".86"/>
      <path d="M39 66c21-17 38-17 41 4v91c-17-12-30-13-41-4z" fill="#fff3ce" stroke="${ink}" stroke-width="5"/>
      <path d="M80 70c3-21 20-21 41-4v91c-11-9-24-8-41 4z" fill="#f8df9a" stroke="${ink}" stroke-width="5"/>
      <path d="M54 88h17M54 104h17M54 120h17M90 88h17M90 104h17M90 120h17" stroke="${accent}" stroke-width="4" stroke-linecap="round"/>
      <path d="M30 53l35-19M130 53L95 34" stroke="${ink}" stroke-width="5" stroke-linecap="round"/>
      <path d="M109 44l24 78" stroke="${accent}" stroke-width="6" stroke-linecap="round"/>`,
    candle: `
      <path d="M46 168c3-43 17-69 34-69s31 26 34 69z" fill="${ink}" opacity=".86"/>
      <path d="M80 32c23 26 29 48 0 75-29-27-23-49 0-75z" fill="${accent}" stroke="${ink}" stroke-width="5"/>
      <path d="M80 52c10 15 11 27 0 41-11-14-10-26 0-41z" fill="#fff6c8"/>
      <rect x="61" y="102" width="38" height="70" rx="9" fill="#fff0d8" stroke="${ink}" stroke-width="6"/>
      <path d="M62 124c10 7 26 7 36 0M62 146c10 7 26 7 36 0" stroke="${accent}" stroke-width="4" stroke-linecap="round"/>
      <path d="M35 111c-14 24-12 43 7 58M125 111c14 24 12 43-7 58" fill="none" stroke="${ink}" stroke-width="6" stroke-linecap="round"/>`,
    mirror: `
      <path d="M35 160c13-39 27-62 45-62s32 23 45 62z" fill="${ink}" opacity=".82"/>
      <path d="M80 37l42 28-16 101H54L38 65z" fill="#f1fcff" stroke="${ink}" stroke-width="6"/>
      <path d="M81 44l-21 118M43 70l64 34M58 52l56 100M105 61l-57 55" stroke="${accent}" stroke-width="4.5" stroke-linecap="round"/>
      <path d="M36 73l-23 17 22 13M124 73l23 17-22 13" fill="none" stroke="${ink}" stroke-width="5" stroke-linecap="round"/>
      <path d="M63 122c13 10 22 10 35 0" stroke="${ink}" stroke-width="5" stroke-linecap="round" opacity=".55"/>`
  };
  return motifs[motif] || motifs.dice;
}

function enemyMotifSvg(motif, paper, ink, accent) {
  const motifs = {
    wood: `<path d="M44 166c6-58 18-100 36-100s30 42 36 100z" fill="#1b120a"/><path d="M38 51l30 31M122 51L92 82M42 128l-24 34M118 128l24 34" stroke="${accent}" stroke-width="9" stroke-linecap="round"/><path d="M62 82c8 7 28 7 36 0M66 112c6 5 22 5 28 0M72 65h16v101H72z" stroke="#f1d28d" stroke-width="5" stroke-linecap="round"/>`,
    mask: `<path d="M43 66c23-20 51-20 74 0v45c-9 20-65 20-74 0z" fill="#f5f0e2" stroke="${accent}" stroke-width="6"/><rect x="51" y="78" width="58" height="21" rx="6" fill="${ink}"/><circle cx="65" cy="88" r="5" fill="${accent}"/><circle cx="95" cy="88" r="5" fill="${accent}"/><path d="M37 145h86M49 164h62" stroke="${accent}" stroke-width="8" stroke-linecap="round"/>`,
    bars: `<path d="M35 37h90v120H35z" fill="#180908" stroke="${accent}" stroke-width="6"/><path d="M50 38v118M66 38v118M82 38v118M98 38v118M114 38v118" stroke="#ffd4c8" stroke-width="7"/><path d="M37 77h86M37 119h86" stroke="${accent}" stroke-width="5"/><circle cx="80" cy="94" r="18" fill="#7e1d18"/>`,
    coin: `<circle cx="80" cy="104" r="47" fill="${accent}" stroke="#fff0c4" stroke-width="8"/><circle cx="80" cy="104" r="27" fill="${ink}" opacity=".8"/><path d="M80 68v72M61 86h38M61 122h38" stroke="#fff0c4" stroke-width="7" stroke-linecap="round"/><path d="M42 166c22-19 54-19 76 0" fill="none" stroke="${accent}" stroke-width="9" stroke-linecap="round"/>`,
    dealer: `<path d="M42 68c19-29 57-29 76 0l-14 37H56z" fill="#fff8e5" stroke="${accent}" stroke-width="6"/><path d="M36 151c23-38 65-38 88 0" fill="#130b10"/><g transform="translate(58 103) rotate(45 22 22)"><rect width="44" height="44" rx="9" fill="#fff8e5" stroke="${accent}" stroke-width="5"/><circle cx="13" cy="13" r="4" fill="${ink}"/><circle cx="31" cy="13" r="4" fill="${ink}"/><circle cx="22" cy="22" r="4" fill="${ink}"/><circle cx="13" cy="31" r="4" fill="${ink}"/><circle cx="31" cy="31" r="4" fill="${ink}"/></g>`,
    veil: `<path d="M40 55c22-30 58-30 80 0l-15 99H55z" fill="#fff9ee" stroke="${accent}" stroke-width="6"/><path d="M55 70c17 15 33 15 50 0M57 114l46 37M103 114l-46 37" stroke="${ink}" stroke-width="5" stroke-linecap="round"/><path d="M34 166c20-15 72-15 92 0" stroke="#fff9ee" stroke-width="8" stroke-linecap="round"/>`,
    leaf: `<path d="M46 68c-26-38-25-60-12-72 27 12 39 37 34 77M114 68c26-38 25-60 12-72-27 12-39 37-34 77" fill="${accent}" opacity=".85"/><path d="M80 67c-29 41-29 78 0 112 29-34 29-71 0-112z" fill="#eef7d3" stroke="${ink}" stroke-width="6"/><path d="M80 79v78M58 108h44" stroke="${accent}" stroke-width="5" stroke-linecap="round"/>`,
    bell: `<path d="M50 91c0-31 60-31 60 0l12 68H38z" fill="${accent}" stroke="#fff2cc" stroke-width="6"/><path d="M65 87c0-15 30-15 30 0M44 159h72" fill="none" stroke="#fff2cc" stroke-width="6" stroke-linecap="round"/><circle cx="80" cy="169" r="9" fill="${ink}"/><path d="M51 48l-21-17M109 48l21-17" stroke="${accent}" stroke-width="8" stroke-linecap="round"/>`,
    seal: `<path d="M43 65h74v89H43z" fill="#fff1d2" stroke="${accent}" stroke-width="6"/><circle cx="80" cy="114" r="34" fill="${accent}" stroke="#ffe6bc" stroke-width="7"/><path d="M59 114h42M80 93v42M64 78h32" stroke="${ink}" stroke-width="6" stroke-linecap="round"/><path d="M54 154l-13 28M106 154l13 28" stroke="${accent}" stroke-width="7" stroke-linecap="round"/>`,
    moth: `<path d="M39 92c-26-50-8-84 41-42-8 37-22 51-41 42zM121 92c26-50 8-84-41-42 8 37 22 51 41 42z" fill="${accent}" opacity=".82"/><path d="M80 73c-16 28-16 67 0 97 16-30 16-69 0-97z" fill="#fff5df" stroke="${ink}" stroke-width="5"/><path d="M61 139h38M66 158h28" stroke="${accent}" stroke-width="5" stroke-linecap="round"/>`,
    clock: `<path d="M55 45c-17-39-11-58 4-58 20 18 26 39 19 67M105 45c17-39 11-58-4-58-20 18-26 39-19 67" fill="#fff6d0"/><circle cx="80" cy="119" r="42" fill="#1b2730" stroke="${accent}" stroke-width="7"/><path d="M80 119l18-21M80 119v27" stroke="#fff6d0" stroke-width="7" stroke-linecap="round"/><path d="M48 166h64" stroke="${accent}" stroke-width="8" stroke-linecap="round"/>`,
    abacus: `<path d="M38 70h84v90H38z" fill="#2b1b0b" stroke="${accent}" stroke-width="6"/><path d="M50 91h60M50 113h60M50 135h60" stroke="#fff0c4" stroke-width="5"/><circle cx="62" cy="91" r="7" fill="${accent}"/><circle cx="96" cy="91" r="7" fill="${accent}"/><circle cx="75" cy="113" r="7" fill="${accent}"/><circle cx="104" cy="135" r="7" fill="${accent}"/><path d="M48 47h64" stroke="${accent}" stroke-width="8" stroke-linecap="round"/>`,
    hook: `<path d="M111 53c34 31 27 76-13 88" fill="none" stroke="${accent}" stroke-width="12" stroke-linecap="round"/><path d="M42 127h64" stroke="#ffd6c8" stroke-width="10" stroke-linecap="round"/><path d="M49 83c14 20 14 64 0 84" fill="none" stroke="${ink}" stroke-width="9" stroke-linecap="round"/><path d="M31 164c25 12 73 12 98 0" stroke="${accent}" stroke-width="6" stroke-linecap="round"/>`,
    choir: `<path d="M28 128c20-20 35-20 52 0s32 20 52 0" fill="none" stroke="${accent}" stroke-width="8" stroke-linecap="round"/><circle cx="53" cy="96" r="18" fill="#f2ffff"/><circle cx="80" cy="85" r="22" fill="#f2ffff"/><circle cx="107" cy="96" r="18" fill="#f2ffff"/><path d="M45 145h70" stroke="#a9f1ff" stroke-width="9" stroke-linecap="round"/><path d="M68 84h24M43 96h20M97 96h20" stroke="${ink}" stroke-width="4" stroke-linecap="round"/>`,
    judge: `<path d="M35 65h90M80 29v139" stroke="${accent}" stroke-width="9" stroke-linecap="round"/><path d="M53 126h54l-12 42H65z" fill="#fff1c6" stroke="${ink}" stroke-width="5"/><path d="M50 65l-18 43h36zM110 65l-18 43h36z" fill="#f1e6c7" stroke="${accent}" stroke-width="5"/><circle cx="80" cy="64" r="12" fill="${accent}"/>`,
    hound: `<path d="M50 64l-31-40 9 67M110 64l31-40-9 67" fill="${accent}"/><path d="M47 82h66l-11 54H58z" fill="#ffd0c5" stroke="${ink}" stroke-width="6"/><path d="M58 106h44M66 125h28" stroke="#5d1514" stroke-width="6" stroke-linecap="round"/><path d="M42 154h76" stroke="${accent}" stroke-width="11" stroke-linecap="round"/>`,
    queen: `<path d="M40 58l17-35 23 30 23-30 17 35z" fill="${accent}" stroke="#fff1ff" stroke-width="5"/><path d="M49 78c20-18 42-18 62 0v86H49z" fill="#fff1ff" opacity=".18"/><path d="M45 127c23-21 47-21 70 0M41 151c28-19 50-19 78 0" stroke="#fff1ff" stroke-width="6" stroke-linecap="round"/><circle cx="80" cy="96" r="24" fill="${accent}" opacity=".55"/>`
  };
  return motifs[motif] || motifs.wood;
}

function skill(id, name, desc, apply) {
  return { id, name, desc, apply };
}

const characterSkills = {
  trinity: skill("trinity", "三相誓约", "若本回合攻击、防御、恢复三个槽都有骰子，则攻击、防御、恢复点数各 +2。", ctx => {
    if (ctx.attackDice > 0 && ctx.guardDice > 0 && ctx.healDice > 0) {
      ctx.attack += 2;
      ctx.guard += 2;
      ctx.healPips += 2;
      ctx.messages.push("三相誓约触发：三枚骰印同时发烫，攻击、防御、恢复点数各 +2。");
    }
  }),
  ironMass: skill("ironMass", "铁赦弥撒", "若防御点数至少为 6，本回合反击 2 点伤害；若没有恢复骰，额外防御 +1。", ctx => {
    if (ctx.guard >= 6) {
      ctx.attack += 2;
      ctx.messages.push("铁赦弥撒触发：盾面敲响低沉圣歌，反击伤害 +2。");
    }
    if (ctx.healDice === 0) {
      ctx.guard += 1;
      ctx.messages.push("铁赦修女拒绝软弱：没有恢复骰，防御 +1。");
    }
  }),
  ledgerSaint: skill("ledgerSaint", "总账圣痕", "每回合第一次使用攻击骰时，若攻击点数为奇数则攻击 +2，若为偶数则防御 +2。", ctx => {
    if (ctx.attackDice > 0 && ctx.attack > 0) {
      if (ctx.attack % 2 === 1) {
        ctx.attack += 2;
        ctx.messages.push("总账圣痕判定为欠项：攻击为奇数，攻击 +2。");
      } else {
        ctx.guard += 2;
        ctx.messages.push("总账圣痕判定为余项：攻击为偶数，防御 +2。");
      }
    }
  }),
  redCandle: skill("redCandle", "赤烛苦行", "若生命低于一半，攻击 +3；若本回合造成至少 8 点伤害，恢复 1 点生命。", ctx => {
    if (state.playerHp <= Math.floor(state.playerMaxHp / 2)) {
      ctx.attack += 3;
      ctx.messages.push("赤烛苦行触发：伤口替你祷告，攻击 +3。");
    }
    ctx.afterResolve.push(() => {
      if (ctx.attack >= 8 && state.playerHp > 0) {
        state.playerHp = clamp(state.playerHp + 1, 0, state.playerMaxHp);
        ctx.messages.push("赤烛余焰舔过伤口：造成至少 8 点伤害，恢复 1 点生命。");
      }
    });
  }),
  mirrorFugue: skill("mirrorFugue", "镜隙赋格", "若三枚骰子点数互不相同，攻击、防御、恢复点数各 +1；若出现对子，敌方攻击 -1。", ctx => {
    const values = state.dice.map(die => die.value);
    const unique = new Set(values).size;
    if (values.length === 3 && unique === 3) {
      ctx.attack += 1;
      ctx.guard += 1;
      ctx.healPips += 1;
      ctx.messages.push("镜隙赋格触发：三个不同倒影同时点头，攻击、防御、恢复点数各 +1。");
    } else if (values.length === 3 && unique < 3) {
      ctx.enemyAttack = Math.max(0, ctx.enemyAttack - 1);
      ctx.messages.push("镜隙赋格触发：重复倒影替你挡下一次视线，敌方攻击 -1。");
    }
  })
};

const characters = {
  oathbound: {
    id: "oathbound",
    name: "誓约者",
    title: "失姓的骰印者",
    maxHp: 24,
    skill: characterSkills.trinity,
    portrait: portraits.oathbound,
    unlock: "初始可用",
    personality: "谨慎、固执，习惯把恐惧拆成可以执行的步骤。",
    background: "他醒在旧前厅，左腕有三枚烙穿皮肤的骰印。审判军档案称这种人是“失姓者”：名字被礼拜堂抵押，灵魂却还没签完字。",
    arc: "他以为自己只是来赎回名字；真正要学会的是，名字不是账册赏还的东西，而是他在每一次选择后仍愿承认的自己。"
  },
  ironConfessor: {
    id: "ironConfessor",
    name: "铁赦修女",
    title: "边境审判庭逃兵",
    maxHp: 28,
    skill: characterSkills.ironMass,
    portrait: portraits.ironConfessor,
    unlock: "初始可用",
    personality: "冷静、严厉，讨厌空话，也讨厌未经清点的牺牲。",
    background: "她曾替边境审判庭给士兵赦罪，后来发现赦罪文书只是另一种征兵令。她带着断裂的铁念珠进入黑礼拜堂，想审问审判本身。",
    arc: "她相信秩序只能靠铁维持；礼拜堂会逼她承认，没有怜悯的秩序只是更干净的屠宰。"
  },
  ledgerKnight: {
    id: "ledgerKnight",
    name: "账册骑士",
    title: "无主审判厅继承人",
    maxHp: 26,
    skill: characterSkills.ledgerSaint,
    portrait: portraits.ledgerKnight,
    unlock: "击败债路 Boss 空座审判官后解锁",
    unlockBoss: "debt",
    personality: "端正、克制，连愤怒都像被装订进了账页。",
    background: "他曾是无主审判厅的抄写骑士，负责给空座审判官整理罪名。直到某天，他发现自己的出生也被记成一笔债。",
    arc: "他以为公平就是不偏不倚地结算；真正的公平，是承认有些债从一开始就不该存在。"
  },
  redPilgrim: {
    id: "redPilgrim",
    name: "赤烛朝圣者",
    title: "血路幸存者",
    maxHp: 22,
    skill: characterSkills.redCandle,
    portrait: portraits.redPilgrim,
    unlock: "击败血路 Boss 赤犬主教后解锁",
    unlockBoss: "blood",
    personality: "热烈、冲动，把疼痛当成确认自己还活着的钟声。",
    background: "他曾被赤犬主教的项圈拖行三夜，醒来时手里攥着一截仍在燃烧的红烛。自那以后，他相信所有伤口都能照路。",
    arc: "他想用痛苦证明自己没有被驯服；真正的胜利是停止把伤害误认成信仰。"
  },
  mirrorVagrant: {
    id: "mirrorVagrant",
    name: "镜隙流亡者",
    title: "梦路漏出的替身",
    maxHp: 20,
    skill: characterSkills.mirrorFugue,
    portrait: portraits.mirrorVagrant,
    unlock: "击败梦路 Boss 睡梦女王后解锁",
    unlockBoss: "dream",
    personality: "轻声、狡黠，常像在和不存在的人交换眼神。",
    background: "没有人知道流亡者是从镜中逃出，还是把真正的自己留在镜里。她说黑礼拜堂不是迷宫，是一场不肯醒的排练。",
    arc: "她以为身份可以像倒影一样随时更换；礼拜堂会让她明白，逃避选择本身也是一种选择。"
  }
};

function relic(id, name, type, desc, lore, apply, options = {}) {
  const charges = options.charges ?? (options.consumable ? 1 : 0);
  return {
    id,
    name,
    type,
    desc,
    lore,
    apply,
    consumable: Boolean(options.consumable || charges > 0),
    charges,
    use: options.use || null
  };
}

const relicBook = {
  rustedNameNail: relic("rustedNameNail", "锈名钉", "敌人遗物", "每场战斗第一次造成伤害时，额外造成 1 点伤害。", "钉帽上刻着半个姓。记录员说，名字被钉住后，人会比木头更容易顺从。", ctx => {
    if (ctx.phase === "turn" && ctx.attack > 0 && !ctx.runFlags.rustedNameNail) {
      ctx.attack += 1;
      ctx.runFlags.rustedNameNail = true;
      ctx.messages.push("锈名钉刺入骰面：本场第一次伤害 +1。");
    }
  }),
  falseOneFaceDie: relic("falseOneFaceDie", "单面假骰", "敌人遗物", "若攻击点数小于防御点数，攻击 +1。", "六面都刻着同一个点数。作弊者把命运变窄，直到自己也无处可逃。", ctx => {
    if (ctx.phase === "turn" && ctx.attack < ctx.guard) {
      ctx.attack += 1;
      ctx.messages.push("单面假骰转向唯一的面：攻击 +1。");
    }
  }),
  redSentenceThread: relic("redSentenceThread", "红判线", "敌人遗物", "若本回合攻击点数至少为 6，防御 +1。", "它原本用来圈住空白罪名。现在缠在你的腕上，像一条安静的血管。", ctx => {
    if (ctx.phase === "turn" && ctx.attack >= 6) {
      ctx.guard += 1;
      ctx.messages.push("红判线收紧：攻击至少 6，防御 +1。");
    }
  }),
  blindMirrorShard: relic("blindMirrorShard", "盲镜碎片", "敌人遗物", "若攻击、防御、恢复中有两个数值相同，恢复点数 +2。", "照不出脸的镜片最适合携带秘密。它只反射你不愿承认的那一半。", ctx => {
    if (ctx.phase !== "turn") return;
    const heal = Math.floor(ctx.healPips / 2);
    if (ctx.attack === ctx.guard || ctx.attack === heal || ctx.guard === heal) {
      ctx.healPips += 2;
      ctx.messages.push("盲镜碎片映出重叠选择：恢复点数 +2。");
    }
  }),
  screamingTitheCoin: relic("screamingTitheCoin", "尖叫什一币", "敌人遗物", "每场战斗开始时，敌人初始生命 -2。", "铸炉没有熄灭，只是学会在口袋里小声尖叫。", ctx => {
    if (ctx.phase === "fightStart") {
      state.enemyHp = clamp(state.enemyHp - 2, 1, state.enemy.hp);
      ctx.messages.push("尖叫什一币提前缴税：敌人初始生命 -2。");
    }
  }),
  redWaxHook: relic("redWaxHook", "红蜡屠钩", "敌人遗物", "若你受到未被防御的伤害，下回合你的攻击 +1。", "钩尖滴落的是红蜡，不是血。它把疼痛挂起来，等下一回合取用。", ctx => {
    if (ctx.phase === "afterDamage" && ctx.incoming > 0) {
      state.nextAttackBonus += 1;
      ctx.messages.push("红蜡屠钩记住伤口：下回合攻击 +1。");
    }
  }),
  mothEyeLantern: relic("mothEyeLantern", "蛾眼提灯", "敌人遗物", "若恢复槽有骰子，敌方攻击 -1。", "灯里没有火，只有一只仍在眨动的眼睛。它看见危险，也看见梦。", ctx => {
    if (ctx.phase === "turn" && ctx.healDice > 0) {
      ctx.enemyAttack = Math.max(0, ctx.enemyAttack - 1);
      ctx.messages.push("蛾眼提灯眨了一下：敌方攻击 -1。");
    }
  }),
  auditEyeBead: relic("auditEyeBead", "审计眼珠", "敌人遗物", "若三个槽都至少有骰子，攻击 +1、防御 +1。", "算盘散落后仍在互相对账。你把其中一颗眼珠串进念珠。", ctx => {
    if (ctx.phase === "turn" && ctx.attackDice && ctx.guardDice && ctx.healDice) {
      ctx.attack += 1;
      ctx.guard += 1;
      ctx.messages.push("审计眼珠核准三项支出：攻击 +1，防御 +1。");
    }
  }),
  brokenCollarBell: relic("brokenCollarBell", "断项圈铃", "敌人遗物", "若生命低于一半，本回合防御 +2。", "铃铛不再听从主人。它只在你快被猎上时发出一点不合时宜的怜悯。", ctx => {
    if (ctx.phase === "turn" && state.playerHp <= Math.floor(state.playerMaxHp / 2)) {
      ctx.guard += 2;
      ctx.messages.push("断项圈铃低鸣：生命低于一半，防御 +2。");
    }
  }),
  thirteenthWatch: relic("thirteenthWatch", "第十三点怀表", "敌人遗物", "第 3 回合后，你的攻击 +1、恢复点数 +1。", "怀表停在不存在的第十三点。它不让你准时，只让迟到变得有用。", ctx => {
    if (ctx.phase === "turn" && state.turnInFight >= 3) {
      ctx.attack += 1;
      ctx.healPips += 1;
      ctx.messages.push("第十三点怀表倒走：第 3 回合后攻击 +1、恢复点数 +1。");
    }
  }),
  sealedThumbprint: relic("sealedThumbprint", "封蜡指纹", "敌人遗物", "每场战斗第一次把三个骰子放入同一槽时，额外防御 +3。", "红蜡里按着一个人的指纹。它拒绝解释自己曾经反悔过什么。", ctx => {
    if (ctx.phase === "turn" && !ctx.runFlags.sealedThumbprint && (ctx.attackDice === 3 || ctx.guardDice === 3 || ctx.healDice === 3)) {
      ctx.guard += 3;
      ctx.runFlags.sealedThumbprint = true;
      ctx.messages.push("封蜡指纹替你担保异常支出：防御 +3。");
    }
  }),
  wetChoirBubble: relic("wetChoirBubble", "唱诗气泡", "敌人遗物", "偶数回合恢复点数 +2，奇数回合攻击 +1。", "气泡里有一句没唱完的赞美诗。贴近耳边时，会听见自己的名字。", ctx => {
    if (ctx.phase !== "turn") return;
    if (state.turnInFight % 2 === 0) {
      ctx.healPips += 2;
      ctx.messages.push("唱诗气泡在偶数回合上浮：恢复点数 +2。");
    } else {
      ctx.attack += 1;
      ctx.messages.push("唱诗气泡在奇数回合破裂：攻击 +1。");
    }
  }),
  ashMilkTooth: relic("ashMilkTooth", "灰烬乳牙", "敌人遗物", "若本回合防御为 0，攻击 +2。", "乳牙里塞满灰。它提醒你，童年也可以被烧成武器。", ctx => {
    if (ctx.phase === "turn" && ctx.guard === 0) {
      ctx.attack += 2;
      ctx.messages.push("灰烬乳牙咬碎沉默：防御为 0，攻击 +2。");
    }
  }),
  chapelSplinter: relic("chapelSplinter", "礼拜堂木刺", "次数遗物", "可用 2 次。立即对当前敌人造成 4 点伤害。", "木刺还记得练习木桩的疼痛。折断它时，会听见很多名字一起喊痛。", () => {}, {
    charges: 2,
    use() {
      state.enemyHp = clamp(state.enemyHp - 4, 0, state.enemy.hp);
      addLog("使用礼拜堂木刺：当前敌人受到 4 点伤害。");
    }
  }),
  gamblerSleeveAce: relic("gamblerSleeveAce", "袖中王牌", "次数遗物", "可用 2 次。重掷你所有尚未分配的骨骰。", "老千藏起的不是牌，而是一次重新解释命运的机会。", () => {}, {
    charges: 2,
    use() {
      let rerolled = 0;
      state.dice.forEach(die => {
        if (!die.used) {
          die.value = rollD6();
          rerolled += 1;
        }
      });
      addLog(`使用袖中王牌：重掷 ${rerolled} 枚未分配骨骰。`);
    }
  }),
  wardenBrand: relic("wardenBrand", "赤刑烙印", "次数遗物", "可用 2 次。攻击槽已有骰子时可用，本回合攻击 +5。", "它本该盖在判词上。现在按在掌心，像一枚短暂燃烧的命令。", () => {}, {
    charges: 2,
    use() {
      state.nextAttackBonus += 5;
      addLog("使用赤刑烙印：本回合攻击 +5。");
    }
  }),
  mirrorSnow: relic("mirrorSnow", "倒飞镜雪", "次数遗物", "可用 2 次。敌方最高黑骰点数 -2，最低为 1。", "碎镜向上飘时，伤害也会短暂忘记落下。", () => {}, {
    charges: 2,
    use() {
      const result = weakenHighestEnemyDie(2);
      if (result) {
        addLog(`使用倒飞镜雪：敌方最高黑骰从 ${result.oldValue} 点冻结为 ${result.newValue} 点。`);
      }
    }
  }),
  titheVoucher: relic("titheVoucher", "什一税赦券", "次数遗物", "可用 2 次。生命未满时可用，立刻恢复 3 点生命。", "赦券只免一次税。奇怪的是，礼拜堂承认它。", () => {}, {
    charges: 2,
    use() {
      state.playerHp = clamp(state.playerHp + 3, 0, state.playerMaxHp);
      addLog("使用什一税赦券：恢复 3 点生命。");
    }
  }),
  butcherClot: relic("butcherClot", "凝血蜡块", "次数遗物", "可用 2 次。防御槽已有骰子时可用，本回合防御 +5。", "蜡块很轻，却能堵住一整条静脉的恐惧。", () => {}, {
    charges: 2,
    use() {
      state.temporaryGuard += 5;
      addLog("使用凝血蜡块：本回合防御 +5。");
    }
  }),
  mothPowder: relic("mothPowder", "梦蛾翅粉", "次数遗物", "可用 2 次。恢复槽已有骰子时可用，本回合恢复点数 +6。", "撒开后，你会梦见自己从未受伤。醒来时不一定如此。", () => {}, {
    charges: 2,
    use() {
      state.temporaryHealPips += 6;
      addLog("使用梦蛾翅粉：本回合恢复点数 +6。");
    }
  }),
  auditStamp: relic("auditStamp", "审计钢印", "次数遗物", "可用 2 次。三槽都有骰子时可用，本回合攻击、防御、恢复点数各 +2。", "钢印落下时，所有不合理支出都会变得合法。", () => {}, {
    charges: 2,
    use() {
      state.temporaryAllBonus += 2;
      addLog("使用审计钢印：本回合攻击、防御、恢复点数各 +2。");
    }
  }),
  houndMeat: relic("houndMeat", "主教犬粮", "次数遗物", "可用 2 次。敌方最高黑骰点数 -3，最低为 1。", "红色肉干闻起来像布道词。赤犬会为此迟疑一瞬。", () => {}, {
    charges: 2,
    use() {
      const result = weakenHighestEnemyDie(3);
      if (result) {
        addLog(`使用主教犬粮：敌方最高黑骰从 ${result.oldValue} 点被诱降为 ${result.newValue} 点。`);
      }
    }
  }),
  rabbitMinute: relic("rabbitMinute", "偷来的分钟", "次数遗物", "可用 2 次。若尚未掷骰，可立即掷骰；若已掷骰，重掷敌方黑骰。", "这不是怀表上的一分钟，而是从迟到者喉咙里偷出的时间。", () => {}, {
    charges: 2,
    use() {
      if (!state.rolled) {
        rollDice();
        addLog("使用偷来的分钟：立刻开始本回合掷骰。");
        return;
      }
      const enemyRoll = rollEnemyDice(currentEnemy());
      state.enemyDice = enemyRoll.dice;
      planEnemySlots(getPlayerDiceRead());
      addLog(`使用偷来的分钟：敌方黑骰重掷为 ${state.enemyDice.join("、")}。`);
    }
  }),
  waxSealKey: relic("waxSealKey", "开封钥", "次数遗物", "可用 2 次。清空当前选择，撤回所有已分配骨骰。", "钥匙没有齿，却能打开一次反悔。", () => {}, {
    charges: 2,
    use() {
      state.slots = emptySlots();
      state.dice.forEach(die => { die.used = false; });
      state.selectedDie = null;
      addLog("使用开封钥：撤回所有已分配骨骰。");
    }
  }),
  drownedHymn: relic("drownedHymn", "溺水赞美诗", "次数遗物", "可用 2 次。已掷骰时可用，本回合受到伤害 -4。", "水下唱诗班只唱一次给你听。听完，肺会记住该如何闭合。", () => {}, {
    charges: 2,
    use() {
      state.temporaryDamageReduction += 4;
      addLog("使用溺水赞美诗：本回合受到伤害 -4。");
    }
  }),
  bellAsh: relic("bellAsh", "灰钟余烬", "次数遗物", "可用 1 次。生命不高于一半且已掷骰时可用，本回合敌我伤害归零，恢复 2 点生命。", "余烬落下时，钟声会替你拖延一回合。", () => {}, {
    charges: 1,
    use() {
      state.skipDamageOnce = true;
      state.playerHp = clamp(state.playerHp + 2, 0, state.playerMaxHp);
      addLog("使用灰钟余烬：本回合敌我伤害归零，并恢复 2 点生命。");
    }
  })
};

const enemyRelicPools = {
  "hollow-squire": ["rustedNameNail", "chapelSplinter", "sealedThumbprint"],
  "iron-gambler": ["falseOneFaceDie", "gamblerSleeveAce", "auditStamp"],
  "blood-warden": ["redSentenceThread", "wardenBrand", "brokenCollarBell"],
  "mirror-nun": ["blindMirrorShard", "mirrorSnow", "mothEyeLantern"],
  "coin-golem": ["screamingTitheCoin", "titheVoucher", "auditEyeBead"],
  "blood-butcher": ["redWaxHook", "butcherClot", "wardenBrand"],
  "moth-maid": ["mothEyeLantern", "mothPowder", "blindMirrorShard"],
  "tax-auditor": ["auditEyeBead", "auditStamp", "titheVoucher", "falseOneFaceDie"],
  "red-hound": ["brokenCollarBell", "houndMeat", "redWaxHook"],
  "white-rabbit": ["thirteenthWatch", "rabbitMinute", "waxSealKey"],
  "wax-scribe": ["sealedThumbprint", "waxSealKey", "auditStamp"],
  "wet-child": ["wetChoirBubble", "drownedHymn", "butcherClot"],
  "ash-bellboy": ["ashMilkTooth", "bellAsh", "thirteenthWatch"]
};

const skillBook = {
  thorn: skill("thorn", "木刺反扑", "若你本回合没有投入防御骰，造成伤害后受到 1 点反伤。", ctx => {
    if (ctx.guardDice === 0 && ctx.attack > 0) {
      ctx.selfDamage += 1;
      ctx.messages.push("木刺反扑：你没有防御，木刺从伤口里弹回，受到 1 点反伤。");
    }
  }),
  cheat: skill("cheat", "作弊骰", "若你的攻击点数小于防御点数，敌方攻击 +2。", ctx => {
    if (ctx.attack < ctx.guard) {
      ctx.enemyAttack += 2;
      ctx.messages.push("作弊骰：你守得太深，他趁空换骰，敌方攻击 +2。");
    }
  }),
  execution: skill("execution", "处刑目光", "若你本回合攻击低于 6，敌方攻击 +3。", ctx => {
    if (ctx.attack < 6) {
      ctx.enemyAttack += 3;
      ctx.messages.push("处刑目光：攻击低于 6，典狱官判定你迟疑，敌方攻击 +3。");
    }
  }),
  shell: skill("shell", "金壳护体", "每回合受到的前 2 点伤害会被抵消。", ctx => {
    const blocked = Math.min(2, ctx.attack);
    if (blocked > 0) {
      ctx.attack -= blocked;
      ctx.messages.push(`金壳护体：硬币鳞片合拢，抵消了 ${blocked} 点伤害。`);
    }
  }),
  mirror: skill("mirror", "镜面忏悔", "若攻击、防御、恢复中有两个数值相同，敌方攻击 +2。", ctx => {
    const heal = Math.floor(ctx.healPips / 2);
    if (ctx.attack === ctx.guard || ctx.attack === heal || ctx.guard === heal) {
      ctx.enemyAttack += 2;
      ctx.messages.push("镜面忏悔：两个选择映成同一张脸，敌方攻击 +2。");
    }
  }),
  poison: skill("poison", "迟效毒酒", "若你本回合恢复生命，额外受到 2 点伤害。", ctx => {
    if (Math.floor(ctx.healPips / 2) > 0) {
      ctx.selfDamage += 2;
      ctx.messages.push("迟效毒酒：恢复带来苦味，额外受到 2 点伤害。");
    }
  }),
  bell: skill("bell", "丧钟催促", "若本回合防御点数为 0，敌方攻击 +3。", ctx => {
    if (ctx.guard === 0) {
      ctx.enemyAttack += 3;
      ctx.messages.push("丧钟催促：没有防御时，钟声把敌方攻击推近了 +3。");
    }
  }),
  seal: skill("seal", "红蜡封账", "若攻击点数超过 9，超过部分只造成一半伤害。", ctx => {
    if (ctx.attack > 9) {
      const overflow = ctx.attack - 9;
      const reduced = Math.ceil(overflow / 2);
      ctx.attack -= reduced;
      ctx.messages.push(`红蜡封账：过高的伤害被封存，减少 ${reduced} 点。`);
    }
  }),
  moth: skill("moth", "扑火梦蛾", "若恢复槽没有骰子，敌方攻击 +2；若有，敌方防御 +1。", ctx => {
    if (ctx.healDice === 0) {
      ctx.enemyAttack += 2;
      ctx.messages.push("扑火梦蛾：你拒绝做梦，敌方攻击 +2。");
    } else {
      ctx.enemyGuard += 1;
      ctx.messages.push("扑火梦蛾：梦粉遮住刀口，敌方防御 +1。");
    }
  }),
  clock: skill("clock", "迟到三拍", "第 3 回合后，敌方攻击 +2。", ctx => {
    if (state.turnInFight >= 3) {
      ctx.enemyAttack += 2;
      ctx.messages.push("迟到三拍：钟声终于追上你，敌方攻击 +2。");
    }
  }),
  audit: skill("audit", "账目审计", "若三个骰子都分配到同一槽，敌方攻击 +2、敌方防御 +2。", ctx => {
    if (ctx.attackDice === 3 || ctx.guardDice === 3 || ctx.healDice === 3) {
      ctx.enemyAttack += 2;
      ctx.enemyGuard += 2;
      ctx.messages.push("账目审计：单一支出被判为异常，敌方攻击 +2、敌方防御 +2。");
    }
  }),
  bleed: {
    ...skill("bleed", "血槽开账", "若你受到未被防御的伤害，下回合敌方攻击 +1。", () => {}),
    applyAfterDamage(ctx) {
    if (ctx.incoming > 0) {
      state.nextEnemyAttackBonus += 1;
      ctx.messages.push("血槽开账：你的血被记入下回合，敌方攻击 +1。");
    }
    }
  },
  tide: skill("tide", "潮湿祷词", "偶数回合敌方攻击 +2，奇数回合敌方防御 +1。", ctx => {
    if (state.turnInFight % 2 === 0) {
      ctx.enemyAttack += 2;
      ctx.messages.push("潮湿祷词：偶数回合潮水上涨，敌方攻击 +2。");
    } else {
      ctx.enemyGuard += 1;
      ctx.messages.push("潮湿祷词：奇数回合水面托住敌人，敌方防御 +1。");
    }
  }),
  voidJudge: skill("voidJudge", "空座裁决", "若攻击、防御、恢复任一项为 0，敌方攻击 +2。", ctx => {
    const heal = Math.floor(ctx.healPips / 2);
    if (ctx.attack === 0 || ctx.guard === 0 || heal === 0) {
      ctx.enemyAttack += 2;
      ctx.messages.push("空座裁决：缺席的选择被判有罪，敌方攻击 +2。");
    }
  }),
  redHound: skill("redHound", "猎血嗅觉", "若你的生命低于 12，敌方攻击 +3。", ctx => {
    if (state.playerHp < 12) {
      ctx.enemyAttack += 3;
      ctx.messages.push("猎血嗅觉：赤犬闻到虚弱，敌方攻击 +3。");
    }
  }),
  dreamQueen: skill("dreamQueen", "梦中斩首", "若恢复值高于攻击值，恢复无效且敌方攻击 +2。", ctx => {
    const heal = Math.floor(ctx.healPips / 2);
    if (heal > ctx.attack) {
      ctx.healPips = 0;
      ctx.enemyAttack += 2;
      ctx.messages.push("梦中斩首：你选择沉睡，恢复无效，敌方攻击 +2。");
    }
  })
};

function makeEnemy(data) {
  return {
    boss: false,
    ...data,
    skill: skillBook[data.skill],
    relic: data.relic ? relicBook[data.relic] : null,
    relicPool: data.relicPool || enemyRelicPools[data.id] || (data.relic ? [data.relic] : []),
    portrait: portraits[data.portrait]
  };
}

const firstEnemy = makeEnemy({
  id: "hollow-squire",
  name: "朽木侍从",
  trait: "裂誓木偶",
  path: "debt",
  location: "旧前厅",
  locationDesc: "第一盏烛火永远不会熄灭，像在替后来者数数。",
  lore: "它曾是练习用的侍从木桩。后来有人把输家的名字钉进木纹里。",
  intro: "朽木侍从拖着钉满姓名的木臂走来。它不会说话，只会模仿上一位输家的姿势。",
  defeat: "木纹裂开，一枚生锈钉子掉在地上。钉帽上刻着一个被磨掉的姓。",
  hp: 18,
  skill: "thorn",
  relic: "rustedNameNail",
  portrait: "wood"
});

const routeRounds = {
  2: [
    makeEnemy({ id: "iron-gambler", name: "铁面赌徒", trait: "锈牌老千", path: "debt", location: "欠账回廊", locationDesc: "墙上贴满空白借据，落款处都缺一滴血。", lore: "他的铁面具焊死在脸上。面具内侧刻满了他没有兑现的赔率。", intro: "铁面赌徒把一枚骰子藏进袖口。礼拜堂没有阻止他，像是默认作弊也是规矩的一部分。", defeat: "铁面具里滚出三颗假骰。每一颗都只有一面。", hp: 22, skill: "cheat", relic: "falseOneFaceDie", portrait: "iron" }),
    makeEnemy({ id: "blood-warden", name: "赤眼典狱官", trait: "礼拜堂刑吏", path: "blood", location: "赤刑室", locationDesc: "这里没有刑具，只有一排排等待签字的判词。", lore: "他负责处置赖账者。赤眼不是眼睛，是两枚烧红的债印。", intro: "赤眼典狱官翻开刑簿。你的名字没有出现，只有一段空白被红线圈住。", defeat: "刑簿合上时发出骨头折断的声音。红线从纸面渗进你的骰印。", hp: 24, skill: "execution", relic: "redSentenceThread", portrait: "red" }),
    makeEnemy({ id: "mirror-nun", name: "镜中修女", trait: "倒影告解者", path: "dream", location: "无面忏悔室", locationDesc: "每一面镜子都照不出脸，只照出你曾经说过的谎。", lore: "她从不听告解，只让人对着自己的倒影重复罪名。", intro: "镜中修女抬起空白的脸。你在她的面纱上看见自己闭着眼睛。", defeat: "镜面碎裂，却没有落地。碎片像雪一样向上飘。", hp: 20, skill: "mirror", relic: "blindMirrorShard", portrait: "pale" })
  ],
  3: [
    makeEnemy({ id: "coin-golem", name: "铸币魔像", trait: "活体什一税机", path: "debt", location: "什一税铸炉", locationDesc: "铜币在炉里哭喊，铸成新的肋骨和新的账页。", lore: "它由输家的金币、牙齿和忏悔税铸成。胸口的空洞像一只永远张开的钱袋。", intro: "铸币魔像踩碎一地铜币。每一枚都在尖叫，声音却像掌声。", defeat: "魔像崩塌后，金币没有散开，而是排成一行，指向礼拜堂更深处。", hp: 31, skill: "shell", relic: "screamingTitheCoin", portrait: "coin" }),
    makeEnemy({ id: "blood-butcher", name: "血槽屠户", trait: "静脉收割人", path: "blood", location: "献血槽", locationDesc: "石槽里的血逆流而上，像想回到某个身体里。", lore: "屠户不收钱，只收仍在跳动的借口。", intro: "血槽屠户把钩子搭在肩上。钩尖滴下来的不是血，是红色蜡油。", defeat: "屠户倒下后，石槽里浮起一枚骰子，六面都是空白。", hp: 29, skill: "bleed", relic: "redWaxHook", portrait: "butcher" }),
    makeEnemy({ id: "moth-maid", name: "梦蛾女仆", trait: "烛火侍女", path: "dream", location: "倒眠温室", locationDesc: "植物在天花板上生长，花粉会让人梦见从未发生的童年。", lore: "她替客人铺床，也替客人把梦整理成标本。", intro: "梦蛾女仆提着灯走来。灯里没有火，只有一只拍翅的眼睛。", defeat: "她的翅粉落在桌上，拼出一句话：不要相信醒来。", hp: 26, skill: "moth", relic: "mothEyeLantern", portrait: "moth" })
  ],
  4: [
    makeEnemy({ id: "tax-auditor", name: "什一税审计员", trait: "账本清算官", path: "debt", location: "总账阶梯", locationDesc: "每一级台阶都写着一种利息，越往上越接近地窖。", lore: "他能从一声叹息里算出你欠下几生几世。", intro: "审计员展开量尺，量的不是距离，而是你还剩多少可以抵押。", defeat: "他的算盘散成一地眼珠，仍在彼此对账。", hp: 36, skill: "audit", relic: "auditEyeBead", portrait: "tax" }),
    makeEnemy({ id: "red-hound", name: "赤犬主教", trait: "嗅血传道人", path: "blood", location: "犬吠侧廊", locationDesc: "侧廊尽头没有门，只有数不清的项圈挂在圣像脖子上。", lore: "它布道时会摇尾。听众若鼓掌，便会被当作猎物。", intro: "赤犬主教伏在讲坛上嗅了嗅，像已经知道你哪一处最先流血。", defeat: "它的项圈断开，铃铛滚进黑暗，仍在一路吠叫。", hp: 34, skill: "redHound", relic: "brokenCollarBell", portrait: "hound" }),
    makeEnemy({ id: "white-rabbit", name: "白兔报时官", trait: "迟到宣判者", path: "dream", location: "逆时钟塔", locationDesc: "所有钟都倒着走，只有你的心跳被迫准时。", lore: "白兔不赶时间，它赶的是那些以为还有时间的人。", intro: "白兔报时官合上怀表：你迟到了三拍，所以审判提前。", defeat: "怀表停在第十三点。钟面背后刻着你的出生日期。", hp: 31, skill: "clock", relic: "thirteenthWatch", portrait: "rabbit" })
  ],
  5: [
    makeEnemy({ id: "wax-scribe", name: "封蜡书记", trait: "红印记录者", path: "debt", location: "封蜡档案库", locationDesc: "档案没有文字，只有一枚枚按在皮纸上的指纹。", lore: "他记录每一次反悔，然后把它们封进红蜡。", intro: "封蜡书记没有抬头。他已经替你写好了三种死法。", defeat: "红蜡融化成一条路，路尽头摆着一张老板椅。", hp: 39, skill: "seal", relic: "sealedThumbprint", portrait: "wax" }),
    makeEnemy({ id: "wet-child", name: "潮湿圣童", trait: "水下唱诗班", path: "blood", location: "淹没唱诗席", locationDesc: "长椅泡在水里。有人在水下唱赞美诗，歌词全是名字。", lore: "它从未出生，却已经替太多人哭过丧。", intro: "潮湿圣童从水面下抬头。它的歌声让你的伤口想起海。", defeat: "水面恢复平静，只剩一串气泡拼成：别回头。", hp: 37, skill: "tide", relic: "wetChoirBubble", portrait: "child" }),
    makeEnemy({ id: "ash-bellboy", name: "灰烬钟童", trait: "末班敲钟人", path: "dream", location: "灰钟儿童房", locationDesc: "地上都是烧焦的玩具。钟绳垂到摇篮里，像一条脐带。", lore: "他只在梦快醒时敲钟，把醒来的人再送回去。", intro: "灰烬钟童抱着小钟。每敲一下，你就忘记一件小事。", defeat: "小钟碎开，里面没有钟舌，只有一颗乳牙。", hp: 35, skill: "bell", relic: "ashMilkTooth", portrait: "ash" })
  ]
};

const bosses = {
  debt: makeEnemy({ id: "empty-judge", boss: true, name: "空座审判官", trait: "债路终局", path: "debt", location: "无主审判厅", locationDesc: "审判席上没有人。判决却已经写好，只差你的签名。", lore: "债路的尽头不是还清，而是承认自己也成了账目的一部分。", intro: "空座审判官没有身体。整间审判厅替它开口：欠债者，宣读自己。", defeat: "判决书烧成灰，你在灰里找回了自己的姓。", ending: "结局：焚账者。你烧毁了写有自己姓氏的总账，却留下了名字。此后黑礼拜堂仍会出现，只是不再认识你。", hp: 48, skill: "voidJudge", portrait: "judge" }),
  blood: makeEnemy({ id: "red-bishop", boss: true, name: "赤犬主教", trait: "血路终局", path: "blood", location: "倒悬圣坛", locationDesc: "圣坛倒挂在天花板上，血从高处落下，又流回高处。", lore: "血路的尽头不是死亡，而是把痛苦献给会鼓掌的神。", intro: "赤犬主教披着湿重的祭袍。它说你的血债很好闻。", defeat: "祭袍塌下去，里面只有一副空项圈。", ending: "结局：断铃者。你扯断了主教的项圈，血债不再追逐你。但每逢雨夜，你仍能听见远处有铃声。", hp: 50, skill: "redHound", portrait: "hound" }),
  dream: makeEnemy({ id: "sleeping-queen", boss: true, name: "睡梦女王", trait: "梦路终局", path: "dream", location: "倒眠王座", locationDesc: "王座漂在天花板上。所有影子都躺在地上睡觉。", lore: "梦路的尽头不是醒来，而是选择哪一个自己继续沉睡。", intro: "睡梦女王睁开第三只眼。你忽然想起，自己可能从未进入礼拜堂。", defeat: "王冠落下，没有声音。你醒在门外，手心里多了一枚没有点数的骰子。", ending: "结局：无点之骰。你从梦里醒来，却带走了一枚空白骨骰。它不会给出答案，只会在你犹豫时发热。", hp: 46, skill: "dreamQueen", portrait: "queen" })
};

const allEnemies = [firstEnemy, ...Object.values(routeRounds).flat(), ...Object.values(bosses)];

function loadSet(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return new Set(fallback);
    const parsed = JSON.parse(raw);
    return new Set(Array.isArray(parsed) ? parsed : fallback);
  } catch {
    return new Set(fallback);
  }
}

function saveSet(key, set) {
  try {
    localStorage.setItem(key, JSON.stringify([...set]));
  } catch {
    // Local storage can be unavailable in private contexts; the run still works.
  }
}

const unlockedCharacters = loadSet(CHARACTER_UNLOCK_KEY, STARTER_CHARACTER_IDS);
const codex = {
  enemies: loadSet(`${CODEX_KEY}_enemies`, []),
  relics: loadSet(`${CODEX_KEY}_relics`, [])
};

function discoverCodex(kind, id) {
  if (!codex[kind] || !id || codex[kind].has(id)) return;
  codex[kind].add(id);
  saveSet(`${CODEX_KEY}_${kind}`, codex[kind]);
}

function unlockCharacter(id) {
  if (!id || unlockedCharacters.has(id)) return false;
  unlockedCharacters.add(id);
  saveSet(CHARACTER_UNLOCK_KEY, unlockedCharacters);
  return true;
}

function getSelectedCharacter() {
  return characters[state.selectedCharacterId] || characters.oathbound;
}

const state = {
  selectedCharacterId: STARTER_CHARACTER_IDS[0],
  playerMaxHp: characters[STARTER_CHARACTER_IDS[0]].maxHp,
  playerHp: characters[STARTER_CHARACTER_IDS[0]].maxHp,
  round: 1,
  wins: 0,
  turn: 1,
  turnInFight: 1,
  enemy: firstEnemy,
  enemyHp: firstEnemy.hp,
  dice: [],
  selectedDie: null,
  slots: { attack: [], guard: [], heal: [] },
  enemyDice: [],
  enemySlots: { attack: [], guard: [], heal: [] },
  nextEnemyAttackBonus: 0,
  nextAttackBonus: 0,
  temporaryGuard: 0,
  temporaryHealPips: 0,
  temporaryAllBonus: 0,
  temporaryDamageReduction: 0,
  skipDamageOnce: false,
  pathScores: { debt: 0, blood: 0, dream: 0 },
  routeHistory: [],
  relics: [],
  lastReward: null,
  relicFightFlags: {},
  currentPath: null,
  oathFracture: 0,
  routeChoicePending: false,
  selectedRouteIndex: null,
  roundOver: false,
  rolled: false,
  diceAnimating: false,
  throwToken: 0,
  endingText: ""
};

const els = {
  turn: document.getElementById("turn"),
  wins: document.getElementById("wins"),
  roundIndicator: document.getElementById("round-indicator"),
  currentPath: document.getElementById("current-path"),
  fractureCount: document.getElementById("fracture-count"),
  debtScore: document.getElementById("debt-score"),
  bloodScore: document.getElementById("blood-score"),
  dreamScore: document.getElementById("dream-score"),
  titleCard: document.querySelector(".title-card"),
  locationName: document.getElementById("location-name"),
  locationDesc: document.getElementById("location-desc"),
  scenePathLabel: document.getElementById("scene-path-label"),
  sceneLocationName: document.getElementById("scene-location-name"),
  sceneLocationDesc: document.getElementById("scene-location-desc"),
  routePanel: document.getElementById("route-panel"),
  routeOptions: document.getElementById("route-options"),
  characterSelect: document.getElementById("character-select"),
  characterOptions: document.getElementById("character-options"),
  startRunBtn: document.getElementById("start-run-btn"),
  codexScreen: document.getElementById("codex-screen"),
  codexTabs: document.getElementById("codex-tabs"),
  codexGrid: document.getElementById("codex-grid"),
  codexCloseBtn: document.getElementById("codex-close-btn"),
  relicInventory: document.getElementById("relic-inventory"),
  relicList: document.getElementById("relic-list"),
  buffList: document.getElementById("buff-list"),
  playerHp: document.getElementById("player-hp"),
  playerHpBar: document.getElementById("player-hp-bar"),
  playerName: document.getElementById("player-name"),
  playerLore: document.getElementById("player-lore"),
  playerSkill: document.getElementById("player-skill"),
  playerSkillDesc: document.getElementById("player-skill-desc"),
  enemyRank: document.getElementById("enemy-rank"),
  enemyName: document.getElementById("enemy-name"),
  enemyTrait: document.getElementById("enemy-trait"),
  enemyLore: document.getElementById("enemy-lore"),
  enemySkill: document.getElementById("enemy-skill"),
  enemySkillDesc: document.getElementById("enemy-skill-desc"),
  enemyDiceTray: document.getElementById("enemy-dice-tray"),
  playerPortrait: document.getElementById("player-portrait"),
  enemyPortrait: document.getElementById("enemy-portrait"),
  enemyHp: document.getElementById("enemy-hp"),
  enemyHpBar: document.getElementById("enemy-hp-bar"),
  diceTray: document.getElementById("dice-tray"),
  boardHint: document.getElementById("board-hint"),
  rollBtn: document.getElementById("roll-btn"),
  resolveBtn: document.getElementById("resolve-btn"),
  resetBtn: document.getElementById("reset-btn"),
  board: document.querySelector(".board"),
  routeLockBanner: document.getElementById("route-lock-banner"),
  diceTheater: document.getElementById("dice-theater"),
  dicePhysicsLayer: document.getElementById("dice-physics-layer"),
  attackTotal: document.getElementById("attack-total"),
  guardTotal: document.getElementById("guard-total"),
  healTotal: document.getElementById("heal-total"),
  log: document.getElementById("battle-log"),
  storyLog: document.getElementById("story-log")
};

function currentEnemy() {
  return state.enemy;
}

function scaleEnemy(enemy, round) {
  const hpBonus = Math.max(0, round - 1) * 3 + (enemy.boss ? 6 : 0);
  return {
    ...enemy,
    hp: enemy.hp + hpBonus
  };
}

function chooseBossPath() {
  const entries = Object.entries(state.pathScores);
  entries.sort((a, b) => {
    if (b[1] !== a[1]) return b[1] - a[1];
    return state.routeHistory.lastIndexOf(b[0]) - state.routeHistory.lastIndexOf(a[0]);
  });
  return entries[0][0];
}

function updateTheme() {
  const activePath = currentEnemy()?.boss ? currentEnemy().path : state.currentPath;
  document.body.classList.remove(...THEME_CLASSES);
  if (activePath) document.body.classList.add(`theme-${activePath}`);
  if (currentEnemy()?.boss) {
    document.body.classList.add("boss-mode", `boss-${currentEnemy().path}`);
  }
}

function getRouteOptions() {
  const options = routeRounds[state.round] || [];
  if (state.round === 4 && state.currentPath) {
    const current = options.find(enemy => enemy.path === state.currentPath);
    const alternatives = options.filter(enemy => enemy.path !== state.currentPath);
    return current ? [current, ...alternatives] : options;
  }
  return options;
}

function getRouteSwitchCost(path) {
  if (!state.currentPath || path === state.currentPath) return 0;
  return SWITCH_BASE_COST + state.oathFracture;
}

function canPayRouteCost(path) {
  const cost = getRouteSwitchCost(path);
  return cost === 0 || state.playerHp > cost;
}

function randomFrom(list) {
  return list[Math.floor(Math.random() * list.length)];
}

function gainRelicFrom(enemy) {
  const pool = enemy.relicPool || [];
  const available = pool.map(id => relicBook[id]).filter(Boolean);
  if (available.length === 0) return;
  const relic = randomFrom(available);
  const relicInstance = { ...relic, usesLeft: relic.charges, instanceId: `${relic.id}-${Date.now()}-${Math.random()}` };
  state.relics.push(relicInstance);
  discoverCodex("relics", relic.id);
  state.lastReward = relicInstance;
  addLog(`获得${relic.consumable ? "次数遗物" : "永久遗物"}：${relic.name}。${relic.desc}`);
}

function canUseRelic(relic) {
  if (!relic.consumable || relic.usesLeft <= 0 || state.roundOver || state.routeChoicePending || state.diceAnimating) return false;
  if (relic.id === "chapelSplinter") return state.enemyHp > 0;
  if (relic.id === "gamblerSleeveAce") return state.rolled && state.dice.some(die => !die.used);
  if (relic.id === "wardenBrand") return state.rolled && state.slots.attack.length > 0;
  if (relic.id === "titheVoucher") return state.playerHp < state.playerMaxHp;
  if (relic.id === "butcherClot") return state.rolled && state.slots.guard.length > 0;
  if (relic.id === "mothPowder") return state.rolled && state.slots.heal.length > 0;
  if (relic.id === "auditStamp") return state.rolled && ACTION_SLOTS.every(slotName => state.slots[slotName].length > 0);
  if (relic.id === "drownedHymn") return state.rolled;
  if (relic.id === "bellAsh") return state.rolled && state.playerHp <= Math.floor(state.playerMaxHp / 2);
  if (relic.id === "rabbitMinute") return true;
  if (["mirrorSnow", "houndMeat"].includes(relic.id)) return state.rolled && state.enemyDice.length > 0;
  if (relic.id === "waxSealKey") return state.rolled && state.dice.some(die => die.used);
  return true;
}

function useRelic(instanceId) {
  const index = state.relics.findIndex(relic => relic.instanceId === instanceId);
  if (index < 0) return;
  const relic = state.relics[index];
  if (!canUseRelic(relic)) {
    addLog(`${relic.name}现在还不能使用。`);
    return;
  }
  state.lastReward = null;
  relic.use?.();
  relic.usesLeft -= 1;
  if (relic.usesLeft <= 0) state.relics.splice(index, 1);
  render();
  if (state.enemyHp <= 0) winFight();
}

function clearTemporaryConsumableEffects() {
  state.temporaryGuard = 0;
  state.temporaryHealPips = 0;
  state.temporaryAllBonus = 0;
  state.temporaryDamageReduction = 0;
  state.skipDamageOnce = false;
}

function resetTemporaryConsumableEffects() {
  clearTemporaryConsumableEffects();
  state.nextAttackBonus = 0;
}

function unlockBossReward(enemy) {
  if (!enemy.boss) return;
  const reward = Object.values(characters).find(character => character.unlockBoss === enemy.path);
  if (reward && unlockCharacter(reward.id)) {
    addLog(`新角色解锁：${reward.name}。${reward.unlock}`);
  }
}

function enemyForCurrentPath(round) {
  const options = routeRounds[round] || [];
  return options.find(enemy => enemy.path === state.currentPath) || options[0];
}

function setEnemy(enemy, round) {
  state.enemy = scaleEnemy(enemy, round);
  state.enemyHp = state.enemy.hp;
  state.enemyDice = [];
  state.enemySlots = emptySlots();
  state.nextEnemyAttackBonus = 0;
  state.turnInFight = 1;
  state.relicFightFlags = {};
  state.rolled = false;
  state.diceAnimating = false;
  state.throwToken += 1;
  state.dice = [];
  state.slots = emptySlots();
  state.enemySlots = emptySlots();
  state.selectedDie = null;
  resetTemporaryConsumableEffects();
  discoverCodex("enemies", state.enemy.id);
  triggerRelicPhase("fightStart");
}

function rollD6() {
  return Math.floor(Math.random() * 6) + 1;
}

function emptySlots() {
  return { attack: [], guard: [], heal: [] };
}

function enemyDiceCount(enemy) {
  return 3;
}

function rollEnemyDice(enemy) {
  const count = enemyDiceCount(enemy);
  const dice = Array.from({ length: count }, () => rollD6());
  return { dice, total: dice.reduce((sum, value) => sum + value, 0) };
}

function sumDiceByIndexes(dice, indexes) {
  return indexes.reduce((total, dieIndex) => total + (dice[dieIndex] || 0), 0);
}

function enemySlotTotal(slotName) {
  return sumDiceByIndexes(state.enemyDice, state.enemySlots?.[slotName] || []);
}

function getEnemyTotals() {
  return {
    attack: enemySlotTotal("attack") + state.nextEnemyAttackBonus,
    guard: enemySlotTotal("guard"),
    healPips: enemySlotTotal("heal"),
    heal: Math.floor(enemySlotTotal("heal") / 2)
  };
}

function enemyDiceTotal() {
  const totals = getEnemyTotals();
  return Math.max(0, totals.attack);
}

function moveStrongestEnemyAttackDie(targetSlot) {
  if (!state.enemySlots?.attack?.length || !state.enemySlots[targetSlot]) return false;
  const bestIndex = state.enemySlots.attack.reduce((best, dieIndex) => {
    return state.enemyDice[dieIndex] > state.enemyDice[best] ? dieIndex : best;
  }, state.enemySlots.attack[0]);
  state.enemySlots.attack = state.enemySlots.attack.filter(dieIndex => dieIndex !== bestIndex);
  state.enemySlots[targetSlot].push(bestIndex);
  return true;
}

function weakenHighestEnemyDie(amount) {
  if (!state.enemyDice.length) return null;
  const bestIndex = state.enemyDice.reduce((best, value, index) => {
    return value > state.enemyDice[best] ? index : best;
  }, 0);
  const oldValue = state.enemyDice[bestIndex];
  const newValue = Math.max(1, oldValue - amount);
  state.enemyDice[bestIndex] = newValue;
  return { index: bestIndex, oldValue, newValue };
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

function enemyArchetype(enemy = currentEnemy()) {
  if (enemy?.boss) return enemy.path === "blood" ? "aggressive" : enemy.path === "dream" ? "trickster" : "counter";
  if (enemy?.path === "blood") return "aggressive";
  if (enemy?.path === "dream") return "trickster";
  return "counter";
}

function sumValues(values) {
  return values.reduce((total, value) => total + value, 0);
}

function getPlayerDiceRead() {
  const values = state.dice.map(die => die.value).filter(value => Number.isFinite(value));
  const sorted = [...values].sort((a, b) => b - a);
  return {
    values,
    high: sorted[0] || 0,
    mid: sorted[1] || 0,
    low: sorted[2] || 0,
    total: sorted.reduce((sum, value) => sum + value, 0),
    pairs: values.length - new Set(values).size,
    spread: sorted.length ? sorted[0] - sorted[sorted.length - 1] : 0
  };
}

function scoreEnemyPlan(plan, values, playerRead, archetype) {
  const enemyAttack = sumValues(plan.attack.map(index => values[index]));
  const enemyGuard = sumValues(plan.guard.map(index => values[index]));
  const enemyHeal = sumValues(plan.heal.map(index => values[index]));
  const expectedPlayerAttack = archetype === "aggressive"
    ? playerRead.high
    : archetype === "counter"
      ? playerRead.high + Math.floor(playerRead.mid / 2)
      : playerRead.mid + Math.floor(playerRead.low / 2);
  const expectedPlayerGuard = archetype === "aggressive"
    ? playerRead.mid
    : archetype === "counter"
      ? playerRead.high
      : playerRead.mid;
  const expectedPlayerHeal = Math.floor((archetype === "trickster" ? playerRead.high : playerRead.low) / 2);
  const expectedDamage = Math.max(0, expectedPlayerAttack - enemyGuard);
  const expectedIncoming = Math.max(0, enemyAttack - expectedPlayerGuard);
  const heal = Math.floor(enemyHeal / 2);
  let score = expectedIncoming * 2.2 - expectedDamage * 2 + heal * 1.05;
  if (archetype === "aggressive") score += enemyAttack * 0.85 - enemyGuard * 0.15;
  if (archetype === "counter") score += enemyGuard * 0.75 + Math.max(0, enemyGuard - expectedPlayerAttack) * 0.7;
  if (archetype === "trickster") {
    score += Math.abs(enemyAttack - expectedPlayerGuard) * 0.25;
    score += expectedPlayerHeal > 0 ? enemyAttack * 0.25 : enemyHeal * 0.45;
  }
  if (playerRead.pairs > 0 && plan.guard.length > 0) score += 0.35;
  if (playerRead.spread >= 4 && plan.attack.length > 0) score += 0.45;
  if (expectedPlayerAttack >= enemyGuard && enemyGuard > 0) score += 0.8;
  if (expectedPlayerGuard >= enemyAttack && enemyAttack > 0) score -= 0.55;
  return score;
}

function buildEnemyPlans(count) {
  const plans = [];
  function walk(index, plan) {
    if (index >= count) {
      plans.push({
        attack: [...plan.attack],
        guard: [...plan.guard],
        heal: [...plan.heal]
      });
      return;
    }
    for (const slot of ACTION_SLOTS) {
      plan[slot].push(index);
      walk(index + 1, plan);
      plan[slot].pop();
    }
  }
  walk(0, emptySlots());
  return plans;
}

function planEnemySlots(playerRead = getPlayerDiceRead()) {
  if (!state.rolled || state.enemyDice.length === 0) {
    state.enemySlots = emptySlots();
    return;
  }
  const archetype = enemyArchetype();
  const values = [...state.enemyDice];
  const plans = buildEnemyPlans(values.length);
  const best = plans.reduce((winner, plan) => {
    const score = scoreEnemyPlan(plan, values, playerRead, archetype);
    if (!winner || score > winner.score) return { plan, score };
    return winner;
  }, null);
  state.enemySlots = best?.plan || emptySlots();
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

function isStatLog(text) {
  return /第 \d+ 回合|掷出|合计|造成 \d+|防御 \d+|恢复 \d+|受到 \d+|使用|获得|当前生命|最终连胜|生命不足|付出 \d+|攻击|防御|恢复|伤害|\+\d+|-\d+/.test(text);
}

function addLog(text, type = "auto") {
  const p = document.createElement("p");
  p.textContent = text;
  const target = type === "story"
    ? els.storyLog
    : type === "stat"
      ? els.log
      : isStatLog(text) ? els.log : els.storyLog;
  (target || els.log).prepend(p);
}

function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

function getPreviewTotals() {
  const ctx = createTurnContext({ preview: true });
  getSelectedCharacter().skill.apply(ctx);
  applySlotTraits(ctx);
  applyRelics(ctx);
  return {
    attack: ctx.attack,
    guard: ctx.guard,
    heal: Math.floor(ctx.healPips / 2),
    healPips: ctx.healPips
  };
}

function createTurnContext(options = {}) {
  const enemyTotals = getEnemyTotals();
  return {
    phase: "turn",
    preview: Boolean(options.preview),
    attack: sumSlot("attack") + state.nextAttackBonus,
    guard: sumSlot("guard"),
    healPips: sumSlot("heal"),
    attackDice: slotCount("attack"),
    guardDice: slotCount("guard"),
    healDice: slotCount("heal"),
    enemyDiceTotal: enemyTotals.attack,
    enemyAttack: enemyTotals.attack,
    enemyGuard: enemyTotals.guard,
    enemyHealPips: enemyTotals.healPips,
    enemyHeal: enemyTotals.heal,
    enemyDice: [...state.enemyDice],
    enemySlots: {
      attack: [...(state.enemySlots?.attack || [])],
      guard: [...(state.enemySlots?.guard || [])],
      heal: [...(state.enemySlots?.heal || [])]
    },
    incoming: 0,
    outgoing: 0,
    selfDamage: 0,
    runFlags: options.preview ? { ...state.relicFightFlags } : state.relicFightFlags,
    afterResolve: [],
    messages: []
  };
}

function applyRelics(ctx) {
  for (const relic of state.relics) relic.apply(ctx);
}

function applySlotTraits(ctx) {
  const tempAll = state.temporaryAllBonus;
  const tempGuard = state.temporaryGuard;
  const tempHealPips = state.temporaryHealPips;
  if (tempAll > 0) {
    ctx.attack += tempAll;
    ctx.guard += tempAll;
    ctx.healPips += tempAll;
    ctx.messages.push(`临时圣印：攻击、防御、恢复点数各 +${tempAll}。`);
  }
  if (tempGuard > 0) {
    ctx.guard += tempGuard;
    ctx.messages.push(`临时护持：防御 +${tempGuard}。`);
  }
  if (tempHealPips > 0) {
    ctx.healPips += tempHealPips;
    ctx.messages.push(`临时祷疗：恢复点数 +${tempHealPips}。`);
  }
  if (ctx.attackDice >= 2) {
    ctx.attack += 1;
    ctx.messages.push("攻击槽特性：双骰破甲，攻击 +1。");
  }
  if (ctx.guardDice > 0 && ctx.guard >= ctx.enemyDiceTotal && ctx.enemyDiceTotal > 0) {
    ctx.attack += 1;
    ctx.messages.push("防御槽特性：完全格挡敌方攻击，反击 1 点。");
  }
  if (ctx.healDice >= 2) {
    ctx.healPips += 2;
    ctx.messages.push("恢复槽特性：双骰祷疗，恢复点数 +2。");
  }
}

function createRelicContext(phase, extra = {}) {
  const enemyTotals = getEnemyTotals();
  return {
    phase,
    attack: 0,
    guard: 0,
    healPips: 0,
    attackDice: 0,
    guardDice: 0,
    healDice: 0,
    enemyDiceTotal: enemyTotals.attack,
    enemyAttack: enemyTotals.attack,
    enemyGuard: enemyTotals.guard,
    enemyHealPips: enemyTotals.healPips,
    enemyHeal: enemyTotals.heal,
    enemyDice: [...state.enemyDice],
    enemySlots: {
      attack: [...(state.enemySlots?.attack || [])],
      guard: [...(state.enemySlots?.guard || [])],
      heal: [...(state.enemySlots?.heal || [])]
    },
    incoming: 0,
    outgoing: 0,
    selfDamage: 0,
    runFlags: state.relicFightFlags,
    afterResolve: [],
    messages: [],
    ...extra
  };
}

function triggerRelicPhase(phase, extra = {}) {
  const ctx = createRelicContext(phase, extra);
  applyRelics(ctx);
  for (const msg of ctx.messages) addLog(msg);
}

function renderActionTotals(totals) {
  [
    ["attack", totals.attack],
    ["guard", totals.guard],
    ["heal", totals.heal]
  ].forEach(([slotName, value]) => {
    const totalEl = document.getElementById(`${slotName}-total`);
    if (!totalEl) return;
    const previous = totalEl.dataset.value;
    const next = String(value);
    totalEl.textContent = next;
    totalEl.dataset.value = next;
    if (previous === undefined || previous === next) return;
    const slot = totalEl.closest(".slot");
    totalEl.classList.remove("total-bump");
    slot?.classList.remove("slot-total-flash");
    void totalEl.offsetWidth;
    totalEl.classList.add("total-bump");
    slot?.classList.add("slot-total-flash");
  });
}

function render() {
  const enemy = currentEnemy();
  updateTheme();
  const totals = getPreviewTotals();
  els.turn.textContent = state.turn;
  els.wins.textContent = state.wins;
  if (els.roundIndicator) els.roundIndicator.textContent = `${state.round}/${FINAL_ROUND}`;
  if (els.currentPath) els.currentPath.textContent = state.currentPath ? `${PATH_LABELS[state.currentPath]}路` : "未定";
  if (els.fractureCount) els.fractureCount.textContent = state.oathFracture;
  if (els.debtScore) els.debtScore.textContent = state.pathScores.debt;
  if (els.bloodScore) els.bloodScore.textContent = state.pathScores.blood;
  if (els.dreamScore) els.dreamScore.textContent = state.pathScores.dream;
  els.locationName.textContent = enemy.location;
  els.locationDesc.textContent = enemy.locationDesc;
  const scenePath = enemy.path || state.currentPath;
  els.scenePathLabel.textContent = enemy.boss
    ? `${PATH_LABELS[scenePath] || "黑"}路终局`
    : state.currentPath
      ? `${PATH_LABELS[scenePath] || "黑"}路场景`
      : "当前场景";
  els.sceneLocationName.textContent = enemy.location;
  els.sceneLocationDesc.textContent = enemy.locationDesc;
  if (els.titleCard) {
    els.titleCard.dataset.scene = scenePath || "first";
    els.titleCard.dataset.location = enemy.id || "first";
    els.titleCard.dataset.boss = enemy.boss ? "true" : "false";
  }
  const character = getSelectedCharacter();
  document.body.dataset.character = character.id;
  document.body.dataset.enemy = enemy.id;
  els.playerHp.textContent = `${state.playerHp}/${state.playerMaxHp}`;
  els.playerHpBar.style.width = `${(state.playerHp / state.playerMaxHp) * 100}%`;
  els.playerName.textContent = character.name;
  els.playerLore.textContent = character.background;
  els.playerSkill.textContent = character.skill.name;
  els.playerSkillDesc.textContent = character.skill.desc;
  els.enemyRank.textContent = enemy.boss
    ? "Boss"
    : state.currentPath ? `敌人 · ${PATH_LABELS[enemy.path]}路` : "敌人 · 初门";
  els.enemyName.textContent = enemy.name;
  els.enemyTrait.textContent = enemy.trait;
  els.enemyLore.textContent = enemy.lore;
  els.enemySkill.textContent = enemy.skill.name;
  els.enemySkillDesc.textContent = enemy.skill.desc;
  els.playerPortrait.innerHTML = character.portrait;
  els.enemyPortrait.innerHTML = enemy.portrait;
  els.boardHint.textContent = state.routeChoicePending
    ? "岔路已经打开。先点选下方三张路线牌之一，再确认前往。"
    : state.diceAnimating
      ? "骰子正在桌面上翻滚。等它们完全停下，最终点数才会显现。"
    : state.rolled
      ? "敌方黑骰点数已公开，但行动被黑蜡封存。根据双方骰面决定你的三槽。"
      : "先掷骰。敌人会看见你的骨骰点数并暗中决定行动；你只能看见黑骰点数。";
  els.enemyHp.textContent = `${state.enemyHp}/${enemy.hp}`;
  els.enemyHpBar.style.width = `${(state.enemyHp / enemy.hp) * 100}%`;

  els.rollBtn.disabled = state.rolled || state.roundOver || state.routeChoicePending || state.diceAnimating;
  if (state.routeChoicePending) {
    els.resolveBtn.textContent = "确认前往";
    els.resolveBtn.disabled = state.selectedRouteIndex === null || state.roundOver || state.diceAnimating;
  } else {
    els.resolveBtn.textContent = "执行回合";
    els.resolveBtn.disabled = !allDiceAssigned() || state.roundOver || state.diceAnimating;
  }
  els.board?.classList.toggle("route-locked", state.routeChoicePending);
  els.routeLockBanner?.classList.remove("visible");
  renderRelics();
  renderRoutes();
  if (!state.routeChoicePending) renderActionTotals(totals);
  renderDice();
  renderEnemyDice();
}

function renderLegacyCharacterSelect() {
  if (!els.characterOptions) return;
  els.characterOptions.innerHTML = "";
  for (const character of Object.values(characters)) {
    const unlocked = unlockedCharacters.has(character.id);
    const btn = document.createElement("button");
    btn.className = `character-card ${state.selectedCharacterId === character.id ? "selected" : ""} ${unlocked ? "" : "locked"}`;
    btn.disabled = !unlocked;
    btn.innerHTML = `
      <div class="character-mini-portrait">${character.portrait}</div>
      <div>
        <span>${unlocked ? character.title : "档案封存"}</span>
        <strong>${unlocked ? character.name : "未解锁角色"}</strong>
        <small>${unlocked ? character.background : character.unlock}</small>
        <em>${unlocked ? `技能：${character.skill.name} · ${character.skill.desc}` : "击败对应 Boss 后，此角色会加入可选名单。"}</em>
      </div>
    `;
    btn.addEventListener("click", () => {
      if (!unlocked) return;
      state.selectedCharacterId = character.id;
      renderCharacterSelect();
    });
    els.characterOptions.appendChild(btn);
  }
}

function renderCharacterSelect() {
  if (!els.characterOptions) return;
  els.characterOptions.innerHTML = "";
  Object.values(characters).forEach((character, index) => {
    const unlocked = unlockedCharacters.has(character.id);
    const rarity = character.unlockBoss ? "epic" : "starter";
    const rarityLabel = character.unlockBoss ? "Boss 契约" : "初始契约";
    const btn = document.createElement("button");
    btn.className = `character-card rarity-${rarity} ${state.selectedCharacterId === character.id ? "selected" : ""} ${unlocked ? "" : "locked"}`;
    btn.style.setProperty("--card-order", index);
    btn.disabled = !unlocked;
    btn.innerHTML = `
      <div class="card-rarity">${unlocked ? rarityLabel : "档案封存"}</div>
      <div class="card-cost">${unlocked ? character.maxHp : "?"}</div>
      <div class="character-mini-portrait">${unlocked ? character.portrait : lockedCardPortrait()}</div>
      <div class="card-nameplate">
        <span>${unlocked ? character.title : "击败 Boss 后解锁"}</span>
        <strong>${unlocked ? character.name : "未解锁角色"}</strong>
      </div>
      <div class="card-skill">
        <b>${unlocked ? character.skill.name : "封印技能"}</b>
        <em>${unlocked ? character.skill.desc : character.unlock}</em>
      </div>
      <div class="card-story">
        <small>${unlocked ? character.background : "这张契约仍被黑礼拜堂压在封蜡之下。"}</small>
      </div>
    `;
    btn.addEventListener("click", () => {
      if (!unlocked) return;
      state.selectedCharacterId = character.id;
      renderCharacterSelect();
    });
    els.characterOptions.appendChild(btn);
  });
}

function lockedCardPortrait() {
  return `
<svg class="card-portrait locked-token" viewBox="0 0 160 210" role="img" aria-label="未解锁角色">
  <defs>
    <radialGradient id="locked-glow" cx="50%" cy="42%" r="70%">
      <stop offset="0" stop-color="#6f4b22" stop-opacity=".55"/>
      <stop offset="1" stop-color="#080604" stop-opacity="0"/>
    </radialGradient>
  </defs>
  <rect x="5" y="5" width="150" height="200" rx="24" fill="#15110e"/>
  <rect x="15" y="15" width="130" height="180" rx="18" fill="url(#locked-glow)" stroke="#9f7239" stroke-opacity=".38" stroke-width="3"/>
  <path d="M42 67c18-24 58-24 76 0v82H42z" fill="#080604" stroke="#9f7239" stroke-width="6"/>
  <path d="M55 92h50M55 118h50M80 70v70" stroke="#d1a35c" stroke-width="7" stroke-linecap="round" opacity=".78"/>
  <path d="M41 169c25-18 53-18 78 0" stroke="#5d3b1b" stroke-width="9" stroke-linecap="round"/>
</svg>`;
}

function renderRelics() {
  if (!els.relicList) return;
  const passiveRelics = state.relics.filter(relic => !relic.consumable);
  const chargedRelics = state.relics.filter(relic => relic.consumable);
  if (els.buffList) {
    els.buffList.innerHTML = "";
    els.buffList.classList.toggle("empty", passiveRelics.length === 0);
    passiveRelics.forEach((relic, index) => {
      const buff = document.createElement("span");
      const column = index % 4;
      const tooltipSide = column <= 1 ? "tooltip-left" : "tooltip-right";
      buff.className = `buff-chip relic-${relic.id} ${tooltipSide}`;
      buff.setAttribute("tabindex", "0");
      buff.setAttribute("aria-label", `${relic.name}，永久遗物。${relic.desc}`);
      buff.innerHTML = `
        <span class="relic-icon" aria-hidden="true"><i></i><b></b></span>
        <span class="relic-tooltip" role="tooltip">
          <strong>${relic.name}</strong>
          <em>永久加成</em>
          <small>${relic.desc}</small>
          <small class="relic-lore">${relic.lore}</small>
        </span>
      `;
      els.buffList.appendChild(buff);
    });
  }
  els.relicInventory?.classList.toggle("route-phase", state.routeChoicePending);
  els.relicInventory?.classList.toggle("empty", chargedRelics.length === 0);
  els.relicList.innerHTML = "";
  if (state.routeChoicePending) {
    const notice = document.createElement("p");
    notice.className = "empty-relics route-relic-note";
    notice.textContent = state.lastReward
      ? `新遗物已封入圣匣：${state.lastReward.name}。选择下一处地点后再检视。`
      : "岔路开启时，圣匣暂时封存。先选择下一处地点。";
    els.relicList.appendChild(notice);
    return;
  }
  if (chargedRelics.length === 0) {
    const empty = document.createElement("p");
    empty.className = "empty-relics";
    empty.textContent = passiveRelics.length > 0 ? "暂无次数遗物。永久遗物已化为卡面旁的圣印。" : "尚未取得遗物。击败敌人后会夺取它的残留物。";
    els.relicList.appendChild(empty);
    return;
  }
  chargedRelics.forEach((relic, index) => {
    const chip = document.createElement("button");
    const usable = canUseRelic(relic);
    const column = index % 5;
    const tooltipSide = column <= 1 ? "tooltip-left" : column >= 3 ? "tooltip-right" : "tooltip-mid";
    chip.className = `relic-chip relic-${relic.id} ${tooltipSide} ${relic.consumable ? "consumable" : "passive"} ${state.lastReward?.instanceId === relic.instanceId ? "new-relic" : ""}`;
    chip.disabled = relic.consumable && !usable;
    chip.setAttribute("aria-label", `${relic.name}，${relic.consumable ? "次数遗物" : "永久遗物"}。${relic.desc}`);
    chip.innerHTML = `
      <span class="relic-icon" aria-hidden="true"><i></i><b></b></span>
      <span class="relic-tooltip" role="tooltip">
        <strong>${relic.name}</strong>
        <em>剩余 ${relic.usesLeft}/${relic.charges} 次</em>
        <small>${relic.desc}</small>
        <small class="relic-lore">${relic.lore}</small>
      </span>
    `;
    chip.style.setProperty("--uses-left", `"${relic.usesLeft}"`);
    chip.addEventListener("click", () => useRelic(relic.instanceId));
    els.relicList.appendChild(chip);
  });
  if (state.lastReward) {
    const reward = document.createElement("div");
    reward.className = `reward-toast ${state.lastReward.consumable ? "consumable" : "passive"}`;
    reward.innerHTML = `<span>新获得 · ${state.lastReward.consumable ? "次数遗物" : "永久遗物"}</span><strong>${state.lastReward.name}</strong><small>${state.lastReward.desc}</small>`;
    els.relicList.prepend(reward);
  }
}

function renderCodex(tab = state.codexTab || "enemies") {
  state.codexTab = tab;
  if (!els.codexGrid) return;
  if (els.codexTabs) {
    els.codexTabs.querySelectorAll("button").forEach(btn => {
      btn.classList.toggle("active", btn.dataset.tab === tab);
    });
  }
  const items = tab === "relics" ? Object.values(relicBook) : allEnemies;
  els.codexGrid.innerHTML = "";
  for (const item of items) {
    const unlocked = tab === "relics" ? codex.relics.has(item.id) : codex.enemies.has(item.id);
    const card = document.createElement("article");
    card.className = `codex-card ${unlocked ? "" : "locked"}`;
    if (tab === "relics") {
      card.innerHTML = `
        <span>${unlocked ? item.type : "封存遗物"}</span>
        <strong>${unlocked ? item.name : "未解锁档案"}</strong>
        <small>${unlocked ? item.desc : "击败对应敌人并获得遗物后，档案会自动解封。"}</small>
        <p>${unlocked ? item.lore : "黑礼拜堂的记录员用黑蜡遮住了这一页。"}</p>
      `;
    } else {
      card.innerHTML = `
        <div class="codex-portrait">${unlocked ? item.portrait : ""}</div>
        <span>${unlocked ? `${item.location} · ${item.trait}` : "敌对档案加密"}</span>
        <strong>${unlocked ? item.name : "未遭遇敌人"}</strong>
        <small>${unlocked ? `技能：${item.skill.name} · ${item.skill.desc}` : "遭遇该敌人后会解锁基础档案。"}</small>
        <p>${unlocked ? item.lore : "档案页边缘留下焦痕，正文尚不可读。"}</p>
      `;
    }
    els.codexGrid.appendChild(card);
  }
}

function renderDice() {
  els.diceTray.innerHTML = "";
  if (state.diceAnimating) {
    for (let index = 0; index < 3; index++) {
      const btn = document.createElement("button");
      btn.className = "die rolling-preview";
      btn.disabled = true;
      btn.innerHTML = `<span class="die-face rolling-face">${renderPips(((index + state.turn) % 6) + 1)}</span><b>?</b>`;
      els.diceTray.appendChild(btn);
    }
    return;
  }
  state.dice.forEach((die, index) => {
    const btn = document.createElement("button");
    btn.className = "die";
    btn.dataset.dieIndex = index;
    btn.draggable = !die.used && !state.roundOver && !state.routeChoicePending && !state.diceAnimating;
    btn.innerHTML = `<span class="die-face">${renderPips(die.value)}</span><b>${die.value}</b>`;
    btn.disabled = state.roundOver || state.routeChoicePending || state.diceAnimating;
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
    btn.addEventListener("dragstart", event => handleDieDragStart(event, index));
    btn.addEventListener("dragend", handleDieDragEnd);
    els.diceTray.appendChild(btn);
  });
}

function renderThrowDice(valuesOrCount = 3) {
  if (!els.dicePhysicsLayer) return;
  els.dicePhysicsLayer.innerHTML = "";
  const count = Array.isArray(valuesOrCount) ? valuesOrCount.length : valuesOrCount;
  Array.from({ length: count }).forEach((_, index) => {
    const die = document.createElement("span");
    die.className = "physics-die";
    die.style.setProperty("--die-index", index);
    die.style.setProperty("--die-offset", `${(index - 1) * 70}px`);
    die.innerHTML = renderDieCube(((index + state.turn) % 6) + 1);
    els.dicePhysicsLayer.appendChild(die);
  });
}

function renderDieCube(value) {
  return `
    <span class="cube" data-value="${value}">
      <i class="cube-face cube-face-1">${renderPips(1)}</i>
      <i class="cube-face cube-face-2">${renderPips(2)}</i>
      <i class="cube-face cube-face-3">${renderPips(3)}</i>
      <i class="cube-face cube-face-4">${renderPips(4)}</i>
      <i class="cube-face cube-face-5">${renderPips(5)}</i>
      <i class="cube-face cube-face-6">${renderPips(6)}</i>
    </span>
    <span class="physics-shadow"></span>
    <span class="die-impact"></span>
  `;
}

function playThrowAnimation(valuesOrCount, onComplete) {
  if (!els.diceTheater || !els.dicePhysicsLayer) {
    onComplete?.();
    return;
  }
  const dieCount = Array.isArray(valuesOrCount) ? valuesOrCount.length : valuesOrCount;
  renderThrowDice(dieCount);
  els.diceTheater.classList.remove("throwing", "settled");
  void els.diceTheater.offsetWidth;
  els.diceTheater.classList.add("throwing");

  const dice = [...els.dicePhysicsLayer.querySelectorAll(".physics-die")];
  const bounds = getDiceTableBounds();
  const seed = Date.now() + dieCount * 97 + state.turn * 313;
  const random = seededRandom(seed);
  const bodies = dice.map((die, index) => createDiceBody(index, random, bounds));
  const start = performance.now();
  let previous = start;
  let settledFrames = 0;
  let finished = false;
  const settleFramesNeeded = 14;
  const safetyDampAfterMs = 9000;

  function finishRoll() {
    if (finished) return;
    finished = true;
    const finalValues = bodies.map((body, index) => {
      body.z = 0;
      body.vx = 0;
      body.vy = 0;
      body.vz = 0;
      body.avx = 0;
      body.avy = 0;
      body.avz = 0;
      body.impact = 0;
      renderDiceBody(dice[index], body);
      return diceValueFromRenderedDie(dice[index])
        ?? diceValueFromRotation(body.rx - 8, body.ry + 7, body.rz);
    });
    els.diceTheater.classList.remove("throwing", "settling");
    els.diceTheater.classList.add("settled");
    onComplete?.(finalValues);
  }

  function frame(now) {
    if (finished) {
      return;
    }

    const dt = Math.min(0.034, Math.max(0.012, (now - previous) / 1000));
    previous = now;
    stepDicePhysics(bodies, bounds, dt);
    if (now - start > safetyDampAfterMs) {
      bodies.forEach(body => {
        body.vx *= 0.985;
        body.vy *= 0.985;
        body.vz *= 0.99;
        body.avx *= 0.98;
        body.avy *= 0.98;
        body.avz *= 0.975;
      });
    }
    bodies.forEach((body, index) => renderDiceBody(dice[index], body));
    const allSettled = bodies.every(isDiceBodySettled);
    settledFrames = allSettled ? settledFrames + 1 : 0;
    if (settledFrames < settleFramesNeeded) {
      requestAnimationFrame(frame);
    } else {
      finishRoll();
    }
  }
  requestAnimationFrame(frame);
}

function getDiceTableBounds() {
  const width = Math.min(760, Math.max(320, (els.diceTheater?.clientWidth || 720) - 72));
  const height = Math.min(230, Math.max(170, (els.diceTheater?.clientHeight || 320) - 96));
  return {
    left: -width / 2,
    right: width / 2,
    top: -height / 2,
    bottom: height / 2,
    gravity: 1680
  };
}

function createDiceBody(index, random, bounds) {
  const entries = [
    { x: bounds.left - 82, y: randomRange(random, bounds.top - 8, bounds.bottom * 0.16) },
    { x: randomRange(random, bounds.left * 0.42, bounds.right * 0.42), y: bounds.top - 96 },
    { x: bounds.right + 82, y: randomRange(random, bounds.top - 8, bounds.bottom * 0.16) }
  ];
  const entry = entries[index] || entries[index % entries.length];
  const target = {
    x: randomRange(random, -120, 120) + (index - 1) * randomRange(random, 18, 34),
    y: randomRange(random, -42, 62)
  };
  const travelTime = randomRange(random, 0.62, 0.86);
  const sideSpin = random() > 0.5 ? 1 : -1;
  return {
    x: entry.x + randomRange(random, -28, 28),
    y: entry.y + randomRange(random, -22, 22),
    z: randomRange(random, 36, 92),
    vx: (target.x - entry.x) / travelTime + randomRange(random, -95, 95),
    vy: (target.y - entry.y) / travelTime + randomRange(random, -75, 75),
    vz: randomRange(random, 330, 520),
    rx: randomRange(random, 0, 360),
    ry: randomRange(random, 0, 360),
    rz: randomRange(random, -25, 25),
    avx: randomRange(random, 620, 1120) * sideSpin,
    avy: randomRange(random, 560, 1040) * (random() > 0.5 ? 1 : -1),
    avz: randomRange(random, 260, 560) * (random() > 0.5 ? 1 : -1),
    radius: 33,
    bounces: 0,
    impact: 0,
    restitution: randomRange(random, 0.42, 0.58),
    wallRestitution: randomRange(random, 0.46, 0.62),
    rollDrag: randomRange(random, 0.975, 0.987),
    spinDrag: randomRange(random, 0.965, 0.98)
  };
}

function stepDicePhysics(bodies, bounds, dt) {
  const steps = Math.max(1, Math.ceil(dt / 0.011));
  const stepDt = dt / steps;
  for (let i = 0; i < steps; i++) {
    stepDicePhysicsOnce(bodies, bounds, stepDt);
  }
}

function stepDicePhysicsOnce(bodies, bounds, dt) {
  for (const body of bodies) {
    body.impact *= Math.pow(0.075, dt);
    body.vz -= bounds.gravity * dt;
    body.x += body.vx * dt;
    body.y += body.vy * dt;
    body.z += body.vz * dt;
    body.avx += body.vy * 0.04 * dt;
    body.avy -= body.vx * 0.04 * dt;
    body.rx += body.avx * dt;
    body.ry += body.avy * dt;
    body.rz += body.avz * dt;

    if (body.z <= 0) {
      body.z = 0;
      const hitSpeed = Math.abs(body.vz);
      if (hitSpeed > 54) {
        const impact = clamp(hitSpeed / 680, 0.16, 1);
        const skipAngle = (body.rx * 0.73 + body.ry * 1.21 + body.bounces * 79) * Math.PI / 180;
        const bounceLoss = Math.max(0.24, body.restitution - body.bounces * 0.055);
        body.vz = hitSpeed * bounceLoss;
        body.vx = body.vx * 0.82 + Math.cos(skipAngle) * hitSpeed * 0.028;
        body.vy = body.vy * 0.82 + Math.sin(skipAngle) * hitSpeed * 0.028;
        body.avx = body.avx * 0.74 + body.vy * 0.52;
        body.avy = body.avy * 0.74 - body.vx * 0.52;
        body.avz = body.avz * 0.72 + (body.vx - body.vy) * 0.24;
        body.impact = Math.max(body.impact, impact);
        body.bounces += 1;
      } else {
        body.vz = 0;
        body.vx *= 0.88;
        body.vy *= 0.88;
        body.avx *= 0.8;
        body.avy *= 0.8;
        body.avz *= 0.8;
      }
    }

    collideDiceWithWalls(body, bounds);
    if (body.z === 0) {
      body.vx *= body.rollDrag;
      body.vy *= body.rollDrag;
      body.avx *= body.spinDrag;
      body.avy *= body.spinDrag;
      body.avz *= body.spinDrag;
    }
  }
  collideDiceBodies(bodies);
}

function collideDiceWithWalls(body, bounds) {
  if (body.x - body.radius < bounds.left) {
    body.x = bounds.left + body.radius;
    body.impact = Math.max(body.impact, clamp(Math.abs(body.vx) / 720, 0.12, 0.7));
    body.vx = Math.abs(body.vx) * body.wallRestitution;
    body.vy *= 0.92;
    body.avz += body.vy * 1.4;
    body.avy -= Math.abs(body.vx) * 0.46;
  } else if (body.x + body.radius > bounds.right) {
    body.x = bounds.right - body.radius;
    body.impact = Math.max(body.impact, clamp(Math.abs(body.vx) / 720, 0.12, 0.7));
    body.vx = -Math.abs(body.vx) * body.wallRestitution;
    body.vy *= 0.92;
    body.avz -= body.vy * 1.4;
    body.avy += Math.abs(body.vx) * 0.46;
  }
  if (body.y - body.radius < bounds.top) {
    body.y = bounds.top + body.radius;
    body.impact = Math.max(body.impact, clamp(Math.abs(body.vy) / 720, 0.12, 0.7));
    body.vy = Math.abs(body.vy) * body.wallRestitution;
    body.vx *= 0.92;
    body.avz -= body.vx * 1.4;
    body.avx += Math.abs(body.vy) * 0.46;
  } else if (body.y + body.radius > bounds.bottom) {
    body.y = bounds.bottom - body.radius;
    body.impact = Math.max(body.impact, clamp(Math.abs(body.vy) / 720, 0.12, 0.7));
    body.vy = -Math.abs(body.vy) * body.wallRestitution;
    body.vx *= 0.92;
    body.avz += body.vx * 1.4;
    body.avx -= Math.abs(body.vy) * 0.46;
  }
}

function collideDiceBodies(bodies) {
  for (let i = 0; i < bodies.length; i++) {
    for (let j = i + 1; j < bodies.length; j++) {
      const a = bodies[i];
      const b = bodies[j];
      if (Math.max(a.z, b.z) > 48) continue;
      const dx = b.x - a.x;
      const dy = b.y - a.y;
      const distance = Math.hypot(dx, dy) || 1;
      const minDistance = a.radius + b.radius;
      if (distance >= minDistance) continue;
      const nx = dx / distance;
      const ny = dy / distance;
      const overlap = (minDistance - distance) / 2;
      a.x -= nx * overlap;
      a.y -= ny * overlap;
      b.x += nx * overlap;
      b.y += ny * overlap;
      const relativeVelocity = (b.vx - a.vx) * nx + (b.vy - a.vy) * ny;
      if (relativeVelocity > 0) continue;
      const restitution = (a.wallRestitution + b.wallRestitution) * 0.5;
      const impulse = -(1 + restitution) * relativeVelocity / 2;
      a.vx -= impulse * nx;
      a.vy -= impulse * ny;
      b.vx += impulse * nx;
      b.vy += impulse * ny;
      const tangentX = -ny;
      const tangentY = nx;
      const scrape = (b.vx - a.vx) * tangentX + (b.vy - a.vy) * tangentY;
      a.avx -= impulse * ny * 2.2;
      a.avy += impulse * nx * 2.2;
      b.avx += impulse * ny * 2.2;
      b.avy -= impulse * nx * 2.2;
      a.avz -= (impulse + scrape * 0.2) * 3.2;
      b.avz += (impulse + scrape * 0.2) * 3.2;
      const impact = clamp(Math.abs(relativeVelocity) / 440, 0.12, 0.8);
      a.impact = Math.max(a.impact, impact);
      b.impact = Math.max(b.impact, impact);
      if (Math.max(a.z, b.z) < 14 && Math.abs(relativeVelocity) > 130) {
        a.vz = Math.max(a.vz, Math.abs(relativeVelocity) * 0.055);
        b.vz = Math.max(b.vz, Math.abs(relativeVelocity) * 0.055);
      }
    }
  }
}

function renderDiceBody(element, body) {
  const lift = body.z;
  const cube = element.querySelector(".cube");
  const impactSquash = body.z === 0 ? body.impact : 0;
  const squashX = 1 + impactSquash * 0.08;
  const squashY = 1 - impactSquash * 0.06;
  const flightScale = 1 + clamp(lift / 420, 0, 0.18);
  element.style.transform = `translate3d(${body.x}px, ${body.y - lift * 0.16}px, 0) scale(${flightScale * squashX}, ${flightScale * squashY})`;
  if (cube) {
    cube.style.transform = `rotateX(${body.rx - 8}deg) rotateY(${body.ry + 7}deg) rotateZ(${body.rz}deg)`;
  }
  element.style.setProperty("--shadow-scale", clamp(1 - body.z / 230, 0.44, 1.08));
  element.style.setProperty("--shadow-alpha", clamp(0.42 - body.z / 520, 0.08, 0.38));
  element.style.setProperty("--impact-scale", 0.38 + body.impact * 1.15);
  element.style.setProperty("--impact-alpha", clamp(body.impact * 0.72, 0, 0.62));
}

function renderSettlingDice(element, body, target, t) {
  const eased = easeOutCubic(t);
  const rotationT = easeOutCubic(clamp((t - 0.18) / 0.82, 0, 1));
  const wobble = Math.sin(t * Math.PI * 4.5) * (1 - t) * 8;
  const rotationWobble = wobble * (1 - rotationT);
  const bodyFrame = {
    x: mix(target.startX, target.x, eased),
    y: mix(target.startY, target.y, eased),
    z: Math.max(0, mix(target.startZ, 0, eased) + Math.max(0, Math.sin(t * Math.PI * 2)) * (1 - t) * 5),
    rx: mix(target.startRx, target.rx, rotationT) + rotationWobble,
    ry: mix(target.startRy, target.ry, rotationT) - rotationWobble * 0.62,
    rz: mix(target.startRz, target.rz, rotationT) + rotationWobble * 0.34,
    vx: 0,
    vy: 0,
    vz: 0,
    impact: Math.max(0, body.impact * (1 - t) + Math.sin(t * Math.PI) * 0.18 * (1 - t))
  };
  bodyFrame.finalValue = body.finalValue;
  renderDiceBody(element, bodyFrame);
}

function isDiceBodySettled(body) {
  return body.z === 0
    && Math.hypot(body.vx, body.vy) < 12
    && Math.abs(body.vz) < 6
    && Math.abs(body.avx) < 42
    && Math.abs(body.avy) < 42
    && Math.abs(body.avz) < 32
    && body.impact < 0.04;
}

function createDiceRestTarget(body, index, bounds) {
  const finalRotation = diceRotationForValue(body.finalValue);
  const driftScale = clamp(Math.hypot(body.vx, body.vy) / 90, 0, 1);
  const driftX = clamp(body.vx * 0.11, -18, 18) * driftScale;
  const driftY = clamp(body.vy * 0.11, -18, 18) * driftScale;
  return {
    startX: body.x,
    startY: body.y,
    startZ: body.z,
    startRx: body.rx,
    startRy: body.ry,
    startRz: body.rz,
    x: clamp(body.x + driftX, bounds.left + body.radius, bounds.right - body.radius),
    y: clamp(body.y + driftY, bounds.top + body.radius, bounds.bottom - body.radius),
    rx: nearestEquivalentAngle(body.rx, finalRotation.rx),
    ry: nearestEquivalentAngle(body.ry, finalRotation.ry),
    rz: nearestEquivalentAngle(body.rz, finalRotation.rz + index * 8 - 8)
  };
}

function diceRotationForValue(value) {
  const rotations = {
    1: { rx: 0, ry: 0, rz: 0 },
    2: { rx: -90, ry: 0, rz: 0 },
    3: { rx: 0, ry: 90, rz: 0 },
    4: { rx: 0, ry: -90, rz: 0 },
    5: { rx: 90, ry: 0, rz: 0 },
    6: { rx: 180, ry: 0, rz: 0 }
  };
  return rotations[value] || rotations[1];
}

function settleDiceBody(body, index, target = null) {
  body.z = 0;
  if (Number.isFinite(body.tableLeft)) {
    body.x = clamp(body.x, body.radius + body.tableLeft, body.tableRight - body.radius);
    body.y = clamp(body.y, body.radius + body.tableTop, body.tableBottom - body.radius);
  }
  if (target) {
    body.x = target.x;
    body.y = target.y;
  }
  body.vx = 0;
  body.vy = 0;
  body.vz = 0;
  body.avx = 0;
  body.avy = 0;
  body.avz = 0;
  body.impact = 0;
  if (target) {
    body.rx = target.rx;
    body.ry = target.ry;
    body.rz = target.rz;
  } else {
    const finalRotation = diceRotationForValue(body.finalValue);
    body.rx = finalRotation.rx;
    body.ry = finalRotation.ry;
    body.rz = finalRotation.rz + index * 8 - 8;
  }
}

function relaxDiceBodies(bodies, bounds) {
  for (const body of bodies) {
    body.tableLeft = bounds.left;
    body.tableRight = bounds.right;
    body.tableTop = bounds.top;
    body.tableBottom = bounds.bottom;
  }
  for (let iteration = 0; iteration < 10; iteration++) {
    for (let i = 0; i < bodies.length; i++) {
      const body = bodies[i];
      body.x = clamp(body.x, bounds.left + body.radius, bounds.right - body.radius);
      body.y = clamp(body.y, bounds.top + body.radius, bounds.bottom - body.radius);
      for (let j = i + 1; j < bodies.length; j++) {
        const other = bodies[j];
        const dx = other.x - body.x;
        const dy = other.y - body.y;
        const distance = Math.hypot(dx, dy) || 1;
        const minDistance = body.radius + other.radius + 6;
        if (distance >= minDistance) continue;
        const nx = dx / distance;
        const ny = dy / distance;
        const overlap = (minDistance - distance) / 2;
        body.x -= nx * overlap;
        body.y -= ny * overlap;
        other.x += nx * overlap;
        other.y += ny * overlap;
      }
    }
  }
}

function seededRandom(seed) {
  let value = seed % 2147483647;
  if (value <= 0) value += 2147483646;
  return () => {
    value = value * 16807 % 2147483647;
    return (value - 1) / 2147483646;
  };
}

function randomRange(random, min, max) {
  return min + (max - min) * random();
}

function mix(start, end, amount) {
  return start + (end - start) * amount;
}

function easeOutCubic(value) {
  return 1 - Math.pow(1 - value, 3);
}

function nearestEquivalentAngle(current, target) {
  return target + Math.round((current - target) / 360) * 360;
}

function diceValueFromRenderedDie(element) {
  const cube = element?.querySelector(".cube");
  if (!cube || typeof DOMMatrixReadOnly === "undefined" || typeof getComputedStyle === "undefined") {
    return null;
  }
  const transform = getComputedStyle(cube).transform;
  if (!transform || transform === "none") return null;
  const matrix = new DOMMatrixReadOnly(transform);
  const faces = [
    { value: 1, normal: { x: 0, y: 0, z: 1 } },
    { value: 2, normal: { x: 0, y: -1, z: 0 } },
    { value: 3, normal: { x: -1, y: 0, z: 0 } },
    { value: 4, normal: { x: 1, y: 0, z: 0 } },
    { value: 5, normal: { x: 0, y: 1, z: 0 } },
    { value: 6, normal: { x: 0, y: 0, z: -1 } }
  ];
  let bestValue = 1;
  let bestDepth = -Infinity;
  for (const face of faces) {
    const depth = face.normal.x * matrix.m13
      + face.normal.y * matrix.m23
      + face.normal.z * matrix.m33;
    if (depth > bestDepth) {
      bestDepth = depth;
      bestValue = face.value;
    }
  }
  return bestValue;
}

function diceValueFromRotation(rx, ry, rz = 0) {
  const faces = [
    { value: 1, normal: { x: 0, y: 0, z: 1 } },
    { value: 2, normal: { x: 0, y: -1, z: 0 } },
    { value: 3, normal: { x: -1, y: 0, z: 0 } },
    { value: 4, normal: { x: 1, y: 0, z: 0 } },
    { value: 5, normal: { x: 0, y: 1, z: 0 } },
    { value: 6, normal: { x: 0, y: 0, z: -1 } }
  ];
  const xRad = rx * Math.PI / 180;
  const yRad = ry * Math.PI / 180;
  const zRad = rz * Math.PI / 180;
  const cosX = Math.cos(xRad);
  const sinX = Math.sin(xRad);
  const cosY = Math.cos(yRad);
  const sinY = Math.sin(yRad);
  const cosZ = Math.cos(zRad);
  const sinZ = Math.sin(zRad);
  let bestValue = 1;
  let bestDepth = -Infinity;
  for (const face of faces) {
    const afterZ = {
      x: face.normal.x * cosZ - face.normal.y * sinZ,
      y: face.normal.x * sinZ + face.normal.y * cosZ,
      z: face.normal.z
    };
    const afterY = {
      x: afterZ.x * cosY + afterZ.z * sinY,
      y: afterZ.y,
      z: -afterZ.x * sinY + afterZ.z * cosY
    };
    const afterX = {
      x: afterY.x,
      y: afterY.y * cosX - afterY.z * sinX,
      z: afterY.y * sinX + afterY.z * cosX
    };
    if (afterX.z > bestDepth) {
      bestDepth = afterX.z;
      bestValue = face.value;
    }
  }
  return bestValue;
}

function renderEnemyDice() {
  if (!els.enemyDiceTray) return;
  const enemy = currentEnemy();
  const path = enemy?.path || "debt";
  const diceRow = els.enemyDiceTray.closest(".enemy-dice-row");
  const pathLabel = PATH_LABELS[path] || "黑";
  if (diceRow) {
    diceRow.dataset.path = path;
    diceRow.dataset.boss = enemy?.boss ? "true" : "false";
    const label = diceRow.querySelector(":scope > span");
    if (label) label.textContent = enemy?.boss ? `${pathLabel}路终局黑骰` : `${pathLabel}路黑骰`;
  }
  els.enemyDiceTray.innerHTML = "";
  if (!state.rolled || state.enemyDice.length === 0) {
    const empty = document.createElement("span");
    empty.className = "enemy-dice-empty";
    empty.textContent = "未掷";
    els.enemyDiceTray.appendChild(empty);
    return;
  }
  const hiddenGroup = document.createElement("div");
  hiddenGroup.className = "enemy-dice-group enemy-hidden-plan";
  hiddenGroup.innerHTML = `<span>黑骰</span><div class="enemy-dice-stack"></div>`;
  const stack = hiddenGroup.querySelector(".enemy-dice-stack");
  state.enemyDice.forEach(value => {
    const die = document.createElement("span");
    die.className = `enemy-die enemy-die-${path}${enemy?.boss ? " boss-die" : ""}`;
    die.dataset.value = value;
    die.setAttribute("aria-label", `${pathLabel}路黑骰 ${value} 点，分配已隐藏`);
    die.innerHTML = `<span class="die-face">${renderPips(value)}</span>`;
    stack.appendChild(die);
  });
  const seal = document.createElement("span");
  seal.className = "enemy-plan-seal";
  seal.textContent = "分配封存";
  hiddenGroup.appendChild(seal);
  els.enemyDiceTray.appendChild(hiddenGroup);
}

function renderPips(value) {
  const layouts = {
    1: ["center"],
    2: ["top-left", "bottom-right"],
    3: ["top-left", "center", "bottom-right"],
    4: ["top-left", "top-right", "bottom-left", "bottom-right"],
    5: ["top-left", "top-right", "center", "bottom-left", "bottom-right"],
    6: ["top-left", "top-right", "middle-left", "middle-right", "bottom-left", "bottom-right"]
  };
  return (layouts[value] || []).map(position => `<i class="pip ${position}"></i>`).join("");
}

function restoreActionSlots() {
  document.querySelectorAll(".slot").forEach(slot => {
    if (slot.dataset.actionHtml) slot.innerHTML = slot.dataset.actionHtml;
    slot.className = `slot ${slot.dataset.slot}`;
    slot.disabled = false;
    delete slot.dataset.routePath;
    delete slot.dataset.routeEnemyId;
    delete slot.dataset.routeIndex;
  });
}

function renderRouteSlots(options) {
  const slots = document.querySelectorAll(".slot");
  slots.forEach((slot, index) => {
    const enemy = options[index];
    if (!enemy) {
      slot.disabled = true;
      slot.className = `slot ${slot.dataset.slot} route-choice-slot route-empty`;
      delete slot.dataset.routeIndex;
      slot.innerHTML = `
        <span class="slot-label"><i>封</i>岔路封闭</span>
        <span class="slot-art route-art" aria-hidden="true"><i></i><b></b></span>
        <strong>无门</strong>
        <small>礼拜堂没有在这里留下可走的路。</small>
      `;
      return;
    }

    const cost = getRouteSwitchCost(enemy.path);
    const isSwitch = cost > 0;
    const isLocked = !canPayRouteCost(enemy.path);
    slot.disabled = isLocked;
    slot.dataset.routeIndex = index;
    slot.dataset.routePath = enemy.path;
    slot.dataset.routeEnemyId = enemy.id;
    slot.className = `slot ${slot.dataset.slot} route-choice-slot ${PATH_CLASSES[enemy.path]} ${isSwitch ? "switch-route" : "same-route"} ${isLocked ? "locked-route" : ""} ${state.selectedRouteIndex === index ? "selected-route" : ""}`;
    slot.innerHTML = `
      <span class="slot-label"><i>${PATH_LABELS[enemy.path]}</i>${PATH_LABELS[enemy.path]}路</span>
      <span class="slot-art route-art" aria-hidden="true"><i></i><b></b></span>
      <strong>${enemy.location}</strong>
      <small><span>${enemy.locationDesc}</span><em>将遭遇：${enemy.name}</em><b class="route-cost">${cost > 0 ? `改道：-${cost} 生命，违誓 +1` : state.currentPath ? "无代价" : "初立誓约"}</b>${isLocked ? "<i>生命不足</i>" : ""}</small>
    `;
  });
}

function renderRoutes() {
  els.routePanel?.classList.remove("visible");
  if (els.routeOptions) els.routeOptions.innerHTML = "";
  if (!state.routeChoicePending) {
    restoreActionSlots();
    return;
  }
  const options = getRouteOptions();
  renderRouteSlots(options);
}

function chooseRoute(enemy) {
  if (!state.routeChoicePending) return;
  const cost = getRouteSwitchCost(enemy.path);
  if (!canPayRouteCost(enemy.path)) {
    addLog("你的生命不足以支付改道代价。礼拜堂拒绝这次反悔。");
    render();
    return;
  }
  const previousPath = state.currentPath;
  if (cost > 0) {
    state.playerHp = clamp(state.playerHp - cost, 1, state.playerMaxHp);
    state.oathFracture += 1;
    addLog(`你从${PATH_LABELS[previousPath]}路改投${PATH_LABELS[enemy.path]}路，付出 ${cost} 点生命，违誓痕迹 +1。`);
  }
  state.pathScores[enemy.path] += 1;
  state.routeHistory.push(enemy.path);
  state.currentPath = enemy.path;
  state.routeChoicePending = false;
  state.selectedRouteIndex = null;
  setEnemy(enemy, state.round);
  addLog(`${previousPath && previousPath === enemy.path ? "你没有回头，继续沿" : "你选择了"}${PATH_LABELS[enemy.path]}路：${enemy.location}。`);
  addLog(enemy.intro);
  render();
}

function handleSlotClick(slot) {
  if (state.routeChoicePending) {
    const options = getRouteOptions();
    const index = ROUTE_SLOT_ORDER.indexOf(slot.dataset.slot);
    const enemy = options[index];
    if (!enemy || !canPayRouteCost(enemy.path)) return;
    state.selectedRouteIndex = state.selectedRouteIndex === index ? null : index;
    render();
    return;
  }
  assignSelectedDie(slot.dataset.slot);
}

function confirmSelectedRoute() {
  if (!state.routeChoicePending) {
    resolveTurn();
    return;
  }
  const options = getRouteOptions();
  const enemy = options[state.selectedRouteIndex];
  if (!enemy) return;
  chooseRoute(enemy);
}

function selectDie(index) {
  if (state.routeChoicePending || state.diceAnimating) return;
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
  if (state.selectedDie === null || state.roundOver || state.routeChoicePending || state.diceAnimating) return;
  assignDieToSlot(state.selectedDie, slotName);
  state.selectedDie = null;
  render();
}

function assignDieToSlot(index, slotName) {
  if (!state.dice[index] || state.dice[index].used || state.roundOver || state.routeChoicePending || state.diceAnimating) return false;
  if (!state.slots[slotName]) return false;
  state.slots[slotName].push(index);
  state.dice[index].used = true;
  return true;
}

function handleDieDragStart(event, index) {
  if (!state.dice[index] || state.dice[index].used || state.roundOver || state.routeChoicePending || state.diceAnimating) {
    event.preventDefault();
    return;
  }
  state.selectedDie = index;
  event.dataTransfer?.setData("text/plain", String(index));
  if (event.dataTransfer) event.dataTransfer.effectAllowed = "move";
  event.currentTarget.classList.add("dragging");
  document.body.classList.add("dragging-die");
}

function handleDieDragEnd(event) {
  event.currentTarget.classList.remove("dragging");
  document.body.classList.remove("dragging-die");
  document.querySelectorAll(".slot.drag-over").forEach(slot => slot.classList.remove("drag-over"));
}

function handleSlotDragOver(event) {
  if (state.roundOver || state.routeChoicePending || state.diceAnimating) return;
  event.preventDefault();
  if (event.dataTransfer) event.dataTransfer.dropEffect = "move";
  event.currentTarget.classList.add("drag-over");
}

function handleSlotDragLeave(event) {
  event.currentTarget.classList.remove("drag-over");
}

function handleSlotDrop(event) {
  event.preventDefault();
  event.currentTarget.classList.remove("drag-over");
  const rawIndex = event.dataTransfer?.getData("text/plain");
  const index = Number(rawIndex);
  if (!Number.isInteger(index)) return;
  if (assignDieToSlot(index, event.currentTarget.dataset.slot)) {
    state.selectedDie = null;
    render();
  }
}

function slotLabel(slotName) {
  const labels = { attack: "攻", guard: "防", heal: "愈" };
  return labels[slotName] || "";
}

function rollDice() {
  const enemy = currentEnemy();
  const enemyRoll = rollEnemyDice(enemy);
  const throwToken = state.throwToken + 1;
  state.throwToken = throwToken;
  state.lastReward = null;
  state.dice = Array.from({ length: 3 }, () => ({ value: null, used: false }));
  state.enemyDice = enemyRoll.dice;
  state.slots = emptySlots();
  state.enemySlots = emptySlots();
  state.selectedDie = null;
  state.rolled = true;
  state.diceAnimating = true;
  addLog(`第 ${state.turn} 回合：${enemy.name} 掷出黑骰 ${state.enemyDice.join("、")}。敌人会在看见你的骨骰点数后暗中分配。`);
  render();
  playThrowAnimation(state.dice.length, finalValues => {
    if (state.throwToken !== throwToken) return;
    state.dice = finalValues.map(value => ({ value, used: false }));
    planEnemySlots(getPlayerDiceRead());
    addLog(`你的骨骰显现为 ${state.dice.map(die => die.value).join("、")}。敌方黑骰分配已被黑蜡封存。`);
    state.diceAnimating = false;
    render();
  });
}

function resolveTurn() {
  const enemy = currentEnemy();
  const ctx = createTurnContext();
  getSelectedCharacter().skill.apply(ctx);
  applySlotTraits(ctx);
  applyRelics(ctx);
  if (state.nextAttackBonus > 0) {
    ctx.messages.push(`遗物余势生效：本回合攻击 +${state.nextAttackBonus}。`);
    state.nextAttackBonus = 0;
  }
  if (state.nextEnemyAttackBonus > 0) {
    ctx.messages.push(`血债余势生效：本回合敌方攻击 +${state.nextEnemyAttackBonus}。`);
    state.nextEnemyAttackBonus = 0;
  }
  enemy.skill.apply(ctx);

  const heal = Math.floor(ctx.healPips / 2);
  const enemyHeal = Math.floor(ctx.enemyHealPips / 2);
  ctx.outgoing = Math.max(0, ctx.attack - ctx.enemyGuard);
  ctx.incoming = Math.max(0, ctx.enemyAttack - ctx.guard);
  enemy.skill.applyAfterDamage?.(ctx);
  applyRelics({ ...ctx, phase: "afterDamage" });
  let totalSelfDamage = ctx.incoming + ctx.selfDamage;
  if (state.temporaryDamageReduction > 0) {
    const reduced = Math.min(totalSelfDamage, state.temporaryDamageReduction);
    totalSelfDamage -= reduced;
    ctx.messages.push(`临时减伤生效：受到伤害 -${reduced}。`);
  }
  if (state.skipDamageOnce) {
    ctx.attack = 0;
    totalSelfDamage = 0;
    ctx.messages.push("灰钟余烬拖住本回合：敌我伤害归零。");
  }

  state.enemyHp = clamp(state.enemyHp - ctx.outgoing + enemyHeal, 0, enemy.hp);
  state.playerHp = clamp(state.playerHp + heal - totalSelfDamage, 0, state.playerMaxHp);
  for (const effect of ctx.afterResolve) effect();
  clearTemporaryConsumableEffects();

  for (const msg of ctx.messages) addLog(msg);
  addLog(`你攻 ${ctx.attack} / 防 ${ctx.guard} / 愈 ${heal}；敌攻 ${ctx.enemyAttack} / 防 ${ctx.enemyGuard} / 愈 ${enemyHeal}。你造成 ${ctx.outgoing} 点伤害，受到 ${totalSelfDamage} 点伤害。`);

  if (state.enemyHp <= 0) {
    winFight();
    return;
  }

  if (state.playerHp <= 0) {
    loseRun();
    return;
  }

  state.turn += 1;
  state.turnInFight += 1;
  state.rolled = false;
  state.diceAnimating = false;
  state.throwToken += 1;
  state.dice = [];
  state.enemyDice = [];
  state.slots = emptySlots();
  state.enemySlots = emptySlots();
  render();
}

function winFight() {
  const defeated = currentEnemy();
  discoverCodex("enemies", defeated.id);
  addLog(defeated.defeat);
  state.wins += 1;

  if (state.round >= FINAL_ROUND) {
    unlockBossReward(defeated);
    state.endingText = defeated.ending || "结局：你离开黑礼拜堂，但骰子仍在口袋里跳动。";
    addLog(state.endingText);
    state.diceAnimating = false;
    state.throwToken += 1;
    state.roundOver = true;
    render();
    return;
  }

  gainRelicFrom(defeated);

  state.round += 1;
  state.turn += 1;
  state.rolled = false;
  state.diceAnimating = false;
  state.throwToken += 1;
  state.dice = [];
  state.enemyDice = [];
  state.slots = emptySlots();
  state.enemySlots = emptySlots();

  if (state.round === FINAL_ROUND) {
    const bossPath = chooseBossPath();
    const boss = bosses[bossPath];
    state.routeChoicePending = false;
    state.selectedRouteIndex = null;
    setEnemy(boss, FINAL_ROUND);
    addLog(`五扇门同时关闭，只剩${PATH_LABELS[bossPath]}路的尽头还在呼吸。`);
    addLog(`你的岔路选择将你带向最终 Boss：${boss.name}。`);
    addLog(boss.intro);
  } else if (ROUTE_CHOICE_ROUNDS.has(state.round)) {
    state.routeChoicePending = true;
    state.selectedRouteIndex = null;
    const choiceText = state.currentPath
      ? `裂隙路口只出现这一次：继续${PATH_LABELS[state.currentPath]}路，或付出生命改投别路。`
      : "三条岔路在你面前打开。第一次立誓不需要代价。";
    addLog(`胜利！当前生命保持为 ${state.playerHp}/${state.playerMaxHp}。${choiceText}`);
  } else {
    const nextEnemy = enemyForCurrentPath(state.round);
    state.pathScores[nextEnemy.path] += 1;
    state.routeHistory.push(nextEnemy.path);
    state.currentPath = nextEnemy.path;
    state.routeChoicePending = false;
    state.selectedRouteIndex = null;
    setEnemy(nextEnemy, state.round);
    addLog(`胜利！当前生命保持为 ${state.playerHp}/${state.playerMaxHp}。门在身后闭合，你只能继续深入${PATH_LABELS[nextEnemy.path]}路。`);
    addLog(`${nextEnemy.location}接住了你的脚步。`);
    addLog(nextEnemy.intro);
  }
  render();
}

function loseRun() {
  state.diceAnimating = false;
  state.throwToken += 1;
  state.roundOver = true;
  addLog("誓约破碎。账册合上时，你听见有人用你的声音说：再来一局。");
  addLog(`最终连胜：${state.wins}。`);
  render();
}

function resetGame() {
  const character = getSelectedCharacter();
  state.playerMaxHp = character.maxHp;
  state.playerHp = state.playerMaxHp;
  state.round = 1;
  state.wins = 0;
  state.turn = 1;
  state.turnInFight = 1;
  state.pathScores = { debt: 0, blood: 0, dream: 0 };
  state.routeHistory = [];
  state.relics = [];
  state.lastReward = null;
  state.relicFightFlags = {};
  state.currentPath = null;
  state.oathFracture = 0;
  state.routeChoicePending = false;
  state.selectedRouteIndex = null;
  state.roundOver = false;
  state.diceAnimating = false;
  state.throwToken += 1;
  state.nextEnemyAttackBonus = 0;
  state.nextAttackBonus = 0;
  state.endingText = "";
  setEnemy(firstEnemy, 1);
  els.log.innerHTML = "";
  if (els.storyLog) els.storyLog.innerHTML = "";
  addLog(`${character.name}进入黑礼拜堂。点击掷骰。`, "story");
  for (const text of storyFragments.slice(0, 3).reverse()) addLog(text);
  addLog(currentEnemy().intro);
  render();
}

function startSelectedRun() {
  if (!unlockedCharacters.has(state.selectedCharacterId)) {
    state.selectedCharacterId = STARTER_CHARACTER_IDS[0];
  }
  els.characterSelect?.classList.add("hidden");
  resetGame();
}

function showCharacterSelect() {
  renderCharacterSelect();
  els.characterSelect?.classList.remove("hidden");
}

function showCodex() {
  renderCodex(state.codexTab || "enemies");
  els.codexScreen?.classList.add("visible");
}

function hideCodex() {
  els.codexScreen?.classList.remove("visible");
}

function pulseButton(button, event) {
  if (!button) return;
  button.classList.remove("clicking");
  void button.offsetWidth;
  button.classList.add("clicking");
  const rect = button.getBoundingClientRect();
  const x = event?.clientX ?? rect.left + rect.width / 2;
  const y = event?.clientY ?? rect.top + rect.height / 2;
  const pressX = ((x - rect.left) / rect.width) * 100;
  const pressY = ((y - rect.top) / rect.height) * 100;
  button.style.setProperty("--press-x", `${clamp(pressX, 8, 92)}%`);
  button.style.setProperty("--press-y", `${clamp(pressY, 8, 92)}%`);
  const rune = document.createElement("span");
  rune.className = "click-rune";
  rune.style.left = `${clamp(pressX, 6, 94)}%`;
  rune.style.top = `${clamp(pressY, 6, 94)}%`;
  button.appendChild(rune);
  window.setTimeout(() => rune.remove(), 620);
  window.setTimeout(() => button.classList.remove("clicking"), 280);
}

function setupButtonPressAnimations() {
  document.querySelectorAll("button").forEach(button => button.classList.add("clickable-press"));
  document.addEventListener("pointerdown", event => {
    const button = event.target.closest?.("button");
    if (!button || button.disabled) return;
    button.classList.add("clickable-press");
    pulseButton(button, event);
  }, true);
}

document.querySelectorAll(".slot").forEach(slot => {
  slot.dataset.actionHtml = slot.innerHTML;
  slot.addEventListener("click", () => handleSlotClick(slot));
  slot.addEventListener("dragover", handleSlotDragOver);
  slot.addEventListener("dragleave", handleSlotDragLeave);
  slot.addEventListener("drop", handleSlotDrop);
});

els.rollBtn.addEventListener("click", rollDice);
els.resolveBtn.addEventListener("click", confirmSelectedRoute);
els.resetBtn.addEventListener("click", showCharacterSelect);
els.startRunBtn?.addEventListener("click", startSelectedRun);
document.querySelectorAll("[data-open-codex]").forEach(btn => {
  btn.addEventListener("click", showCodex);
});
els.codexCloseBtn?.addEventListener("click", hideCodex);
els.codexTabs?.addEventListener("click", event => {
  if (event.target.matches("button[data-tab]")) renderCodex(event.target.dataset.tab);
});

setupButtonPressAnimations();
showCharacterSelect();
