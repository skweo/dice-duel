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

const storyFragments = [
  "黑礼拜堂不是建筑，而是一支随雨迁徙的审判军。它把失败者收进墙里，把胜利者送进更深的门。",
  "门外的雨没有声音。只有骰子在掌心里轻轻敲响，像小型圣钟，也像弹壳落地。",
  "墙上的圣像都被蒙住眼睛，像是不愿替谁作证。每一块黄铜铭牌都刻着被抹去的姓。",
  "账册翻开了一页，墨迹还湿，姓名栏却被刮空。有人在空白处预留了你的骨灰。",
  "烛火朝着你倒伏。礼拜堂在等待下一次下注，帝国边境也在等待下一名能活着回来的证人。"
];

const portraits = {
  oathbound: playerPortraitSvg("#21120f", "#4c1614", "#d6a95b", "#f4d58a", "誓约者"),
  ironConfessor: playerPortraitSvg("#0b1013", "#26323a", "#8fa6b8", "#e0ad54", "铁赦修女"),
  ledgerKnight: playerPortraitSvg("#160f07", "#3b2711", "#b98a3a", "#f0d16d", "账册骑士"),
  redPilgrim: playerPortraitSvg("#180606", "#43100e", "#d34236", "#ffb08a", "赤烛朝圣者"),
  mirrorVagrant: playerPortraitSvg("#0c0a16", "#211a3b", "#9c86e8", "#74f1d4", "镜隙流亡者"),
  wood: portraitSvg("#0f0d0a", "#211713", "#9a6c36", "#d0a25b", "朽木侍从"),
  iron: portraitSvg("#0a0d10", "#1f2a31", "#424d56", "#e0ad54", "铁面赌徒"),
  red: portraitSvg("#160908", "#35100f", "#9c2b29", "#ff5b4a", "赤眼典狱官"),
  coin: portraitSvg("#130d07", "#4c3213", "#9e661d", "#e0ad54", "铸币魔像"),
  violet: portraitSvg("#100817", "#241331", "#4b2a61", "#74f1d4", "黑礼拜堂庄家"),
  pale: portraitSvg("#100f12", "#28232c", "#d8cbb0", "#8fd1ff", "镜中修女"),
  green: portraitSvg("#07100b", "#18311e", "#446b35", "#9bcf84", "药园司祭"),
  ash: portraitSvg("#11100d", "#2b2924", "#756c5d", "#c7aa78", "灰烬钟童"),
  wax: portraitSvg("#160d0b", "#3a1813", "#b63b35", "#f0b36a", "封蜡书记"),
  moth: portraitSvg("#0e0b14", "#251b32", "#5b4b78", "#d8c7ff", "梦蛾女仆"),
  rabbit: portraitSvg("#101018", "#2c2c45", "#7f92a2", "#fff0c9", "白兔报时官"),
  tax: portraitSvg("#120c07", "#3d2b18", "#85611f", "#f0d16d", "什一税审计员"),
  butcher: portraitSvg("#160807", "#3d1110", "#8e2420", "#f05a45", "血槽屠户"),
  child: portraitSvg("#0b1114", "#142d35", "#4e8791", "#a9f1ff", "潮湿圣童"),
  judge: portraitSvg("#060507", "#17121d", "#3b2b4a", "#e0ad54", "空座审判官"),
  hound: portraitSvg("#150707", "#391010", "#6e1f1d", "#f05a45", "赤犬主教"),
  queen: portraitSvg("#0c0712", "#21102d", "#53356b", "#e7c6ff", "睡梦女王")
};

function playerPortraitSvg(bg, cloak, metal, accent, label) {
  return `
<svg viewBox="0 0 140 170" role="img" aria-label="${label}">
  <defs><radialGradient id="${label}-halo" cx="50%" cy="18%" r="68%"><stop offset="0" stop-color="${accent}" stop-opacity=".72"/><stop offset=".46" stop-color="${cloak}" stop-opacity=".54"/><stop offset="1" stop-color="#070606"/></radialGradient><linearGradient id="${label}-steel" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#efe1bd"/><stop offset=".46" stop-color="${metal}"/><stop offset="1" stop-color="#1d2023"/></linearGradient></defs>
  <rect width="140" height="170" rx="30" fill="url(#${label}-halo)"/>
  <path d="M13 162c9-47 26-73 57-73s48 26 57 73" fill="#080706"/>
  <path d="M27 164c8-43 22-64 43-64s35 21 43 64" fill="${cloak}"/>
  <path d="M33 101l37-21 37 21-10 63H43z" fill="#120d0b"/>
  <path d="M48 104h44l-10 60H58z" fill="url(#${label}-steel)"/>
  <path d="M38 62c5-29 18-46 32-46s27 17 32 46l-12 35H50z" fill="#11100f"/>
  <circle cx="70" cy="67" r="28" fill="#c99b6f"/>
  <path d="M37 65c8-34 24-52 33-52s25 18 33 52c-21-13-45-13-66 0z" fill="#0c0908"/>
  <path d="M48 56c10-18 34-21 44 0-4-24-13-39-22-39S52 32 48 56z" fill="${accent}"/>
  <path d="M52 68h14M74 68h14" stroke="#24130d" stroke-width="5" stroke-linecap="round"/>
  <path d="M61 82c6 5 12 5 18 0" fill="none" stroke="#6b2b21" stroke-width="4" stroke-linecap="round"/>
  <rect x="58" y="112" width="24" height="24" rx="5" fill="#f4e2bd" transform="rotate(45 70 124)"/>
  <circle cx="70" cy="124" r="3.8" fill="#261408"/>
  <path d="M30 132l-12 26M110 132l12 26M70 6l10 22-20-2z" stroke="${accent}" fill="${accent}" stroke-width="3" stroke-linecap="round"/>
</svg>`;
}

function portraitSvg(bg, body, armor, accent, label) {
  return `
<svg viewBox="0 0 140 170" role="img" aria-label="${label}">
  <rect width="140" height="170" rx="30" fill="${bg}"/>
  <path d="M16 162c10-48 29-75 54-75s44 27 54 75" fill="${body}"/>
  <path d="M34 108l36-22 36 22-12 54H46z" fill="${armor}"/>
  <path d="M37 66c5-33 18-51 33-51s28 18 33 51l-13 42H50z" fill="#120d0b"/>
  <circle cx="70" cy="70" r="31" fill="#bc8f6d"/>
  <path d="M37 65c11-31 52-40 66 0-20-12-46-12-66 0z" fill="#1a1010"/>
  <circle cx="58" cy="72" r="5" fill="${accent}"/>
  <circle cx="82" cy="72" r="5" fill="${accent}"/>
  <path d="M60 88c7 5 14 5 21 0" stroke="#4f241f" stroke-width="5" stroke-linecap="round"/>
  <path d="M44 125h52" stroke="${accent}" stroke-width="6" stroke-linecap="round"/>
  <rect x="59" y="103" width="22" height="22" rx="4" fill="#f4e2bd" transform="rotate(45 70 114)"/>
</svg>`;
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
  mirrorFugue: skill("mirrorFugue", "镜隙赋格", "若三枚骰子点数互不相同，攻击、防御、恢复点数各 +1；若出现对子，敌人意图 -1。", ctx => {
    const values = state.dice.map(die => die.value);
    const unique = new Set(values).size;
    if (values.length === 3 && unique === 3) {
      ctx.attack += 1;
      ctx.guard += 1;
      ctx.healPips += 1;
      ctx.messages.push("镜隙赋格触发：三个不同倒影同时点头，攻击、防御、恢复点数各 +1。");
    } else if (values.length === 3 && unique < 3) {
      ctx.intent = Math.max(0, ctx.intent - 1);
      ctx.messages.push("镜隙赋格触发：重复倒影替你挡下一次视线，敌人意图 -1。");
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

function relic(id, name, type, desc, lore, apply) {
  return { id, name, type, desc, lore, apply };
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
  mothEyeLantern: relic("mothEyeLantern", "蛾眼提灯", "敌人遗物", "若恢复槽有骰子，敌人意图 -1。", "灯里没有火，只有一只仍在眨动的眼睛。它看见危险，也看见梦。", ctx => {
    if (ctx.phase === "turn" && ctx.healDice > 0) {
      ctx.intent = Math.max(0, ctx.intent - 1);
      ctx.messages.push("蛾眼提灯眨了一下：敌人意图 -1。");
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
  })
};

const skillBook = {
  thorn: skill("thorn", "木刺反扑", "若你本回合没有投入防御骰，造成伤害后受到 1 点反伤。", ctx => {
    if (ctx.guardDice === 0 && ctx.attack > 0) {
      ctx.selfDamage += 1;
      ctx.messages.push("木刺反扑：你没有防御，木刺从伤口里弹回，受到 1 点反伤。");
    }
  }),
  cheat: skill("cheat", "作弊骰", "若你的攻击点数小于防御点数，敌人本回合伤害 +2。", ctx => {
    if (ctx.attack < ctx.guard) {
      ctx.intent += 2;
      ctx.messages.push("作弊骰：你守得太深，他趁空换骰，本回合伤害 +2。");
    }
  }),
  execution: skill("execution", "处刑目光", "若你本回合没有造成至少 6 点伤害，敌人额外造成 3 点伤害。", ctx => {
    if (ctx.attack < 6) {
      ctx.intent += 3;
      ctx.messages.push("处刑目光：伤害不足 6，典狱官判定你迟疑，额外伤害 +3。");
    }
  }),
  shell: skill("shell", "金壳护体", "每回合受到的前 2 点伤害会被抵消。", ctx => {
    const blocked = Math.min(2, ctx.attack);
    if (blocked > 0) {
      ctx.attack -= blocked;
      ctx.messages.push(`金壳护体：硬币鳞片合拢，抵消了 ${blocked} 点伤害。`);
    }
  }),
  mirror: skill("mirror", "镜面忏悔", "若攻击、防御、恢复中有两个数值相同，敌人伤害 +2。", ctx => {
    const heal = Math.floor(ctx.healPips / 2);
    if (ctx.attack === ctx.guard || ctx.attack === heal || ctx.guard === heal) {
      ctx.intent += 2;
      ctx.messages.push("镜面忏悔：两个选择映成同一张脸，敌人伤害 +2。");
    }
  }),
  poison: skill("poison", "迟效毒酒", "若你本回合恢复生命，额外受到 2 点伤害。", ctx => {
    if (Math.floor(ctx.healPips / 2) > 0) {
      ctx.selfDamage += 2;
      ctx.messages.push("迟效毒酒：恢复带来苦味，额外受到 2 点伤害。");
    }
  }),
  bell: skill("bell", "丧钟催促", "若本回合防御点数为 0，敌人伤害 +3。", ctx => {
    if (ctx.guard === 0) {
      ctx.intent += 3;
      ctx.messages.push("丧钟催促：没有防御时，钟声把伤害推近了 +3。");
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
  moth: skill("moth", "扑火梦蛾", "若恢复槽没有骰子，敌人伤害 +2；若有，敌人受到伤害 -1。", ctx => {
    if (ctx.healDice === 0) {
      ctx.intent += 2;
      ctx.messages.push("扑火梦蛾：你拒绝做梦，敌人伤害 +2。");
    } else if (ctx.attack > 0) {
      ctx.attack -= 1;
      ctx.messages.push("扑火梦蛾：梦粉遮住刀口，伤害 -1。");
    }
  }),
  clock: skill("clock", "迟到三拍", "第 3 回合后，敌人每回合伤害 +2。", ctx => {
    if (state.turnInFight >= 3) {
      ctx.intent += 2;
      ctx.messages.push("迟到三拍：钟声终于追上你，敌人伤害 +2。");
    }
  }),
  audit: skill("audit", "账目审计", "若三个骰子都分配到同一槽，敌人伤害 +4。", ctx => {
    if (ctx.attackDice === 3 || ctx.guardDice === 3 || ctx.healDice === 3) {
      ctx.intent += 4;
      ctx.messages.push("账目审计：单一支出被判为异常，敌人伤害 +4。");
    }
  }),
  bleed: {
    ...skill("bleed", "血槽开账", "若你受到未被防御的伤害，下回合敌人基础伤害 +1。", () => {}),
    applyAfterDamage(ctx) {
    if (ctx.incoming > 0) {
      state.nextIntentBonus += 1;
      ctx.messages.push("血槽开账：你的血被记入下回合，敌人下回合基础伤害 +1。");
    }
    }
  },
  tide: skill("tide", "潮湿祷词", "偶数回合敌人伤害 +2，奇数回合受到伤害 -1。", ctx => {
    if (state.turnInFight % 2 === 0) {
      ctx.intent += 2;
      ctx.messages.push("潮湿祷词：偶数回合潮水上涨，敌人伤害 +2。");
    } else if (ctx.attack > 0) {
      ctx.attack -= 1;
      ctx.messages.push("潮湿祷词：奇数回合水面托住敌人，伤害 -1。");
    }
  }),
  voidJudge: skill("voidJudge", "空座裁决", "若攻击、防御、恢复任一项为 0，敌人伤害 +2。", ctx => {
    const heal = Math.floor(ctx.healPips / 2);
    if (ctx.attack === 0 || ctx.guard === 0 || heal === 0) {
      ctx.intent += 2;
      ctx.messages.push("空座裁决：缺席的选择被判有罪，敌人伤害 +2。");
    }
  }),
  redHound: skill("redHound", "猎血嗅觉", "若你的生命低于 12，敌人伤害 +3。", ctx => {
    if (state.playerHp < 12) {
      ctx.intent += 3;
      ctx.messages.push("猎血嗅觉：赤犬闻到虚弱，敌人伤害 +3。");
    }
  }),
  dreamQueen: skill("dreamQueen", "梦中斩首", "若恢复值高于攻击值，恢复无效且敌人伤害 +2。", ctx => {
    const heal = Math.floor(ctx.healPips / 2);
    if (heal > ctx.attack) {
      ctx.healPips = 0;
      ctx.intent += 2;
      ctx.messages.push("梦中斩首：你选择沉睡，恢复无效，敌人伤害 +2。");
    }
  })
};

function makeEnemy(data) {
  return {
    boss: false,
    ...data,
    skill: skillBook[data.skill],
    relic: data.relic ? relicBook[data.relic] : null,
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
  min: 3,
  max: 5,
  skill: "thorn",
  relic: "rustedNameNail",
  portrait: "wood"
});

const routeRounds = {
  2: [
    makeEnemy({ id: "iron-gambler", name: "铁面赌徒", trait: "锈牌老千", path: "debt", location: "欠账回廊", locationDesc: "墙上贴满空白借据，落款处都缺一滴血。", lore: "他的铁面具焊死在脸上。面具内侧刻满了他没有兑现的赔率。", intro: "铁面赌徒把一枚骰子藏进袖口。礼拜堂没有阻止他，像是默认作弊也是规矩的一部分。", defeat: "铁面具里滚出三颗假骰。每一颗都只有一面。", hp: 22, min: 4, max: 7, skill: "cheat", relic: "falseOneFaceDie", portrait: "iron" }),
    makeEnemy({ id: "blood-warden", name: "赤眼典狱官", trait: "礼拜堂刑吏", path: "blood", location: "赤刑室", locationDesc: "这里没有刑具，只有一排排等待签字的判词。", lore: "他负责处置赖账者。赤眼不是眼睛，是两枚烧红的债印。", intro: "赤眼典狱官翻开刑簿。你的名字没有出现，只有一段空白被红线圈住。", defeat: "刑簿合上时发出骨头折断的声音。红线从纸面渗进你的骰印。", hp: 24, min: 5, max: 8, skill: "execution", relic: "redSentenceThread", portrait: "red" }),
    makeEnemy({ id: "mirror-nun", name: "镜中修女", trait: "倒影告解者", path: "dream", location: "无面忏悔室", locationDesc: "每一面镜子都照不出脸，只照出你曾经说过的谎。", lore: "她从不听告解，只让人对着自己的倒影重复罪名。", intro: "镜中修女抬起空白的脸。你在她的面纱上看见自己闭着眼睛。", defeat: "镜面碎裂，却没有落地。碎片像雪一样向上飘。", hp: 20, min: 4, max: 7, skill: "mirror", relic: "blindMirrorShard", portrait: "pale" })
  ],
  3: [
    makeEnemy({ id: "coin-golem", name: "铸币魔像", trait: "活体什一税机", path: "debt", location: "什一税铸炉", locationDesc: "铜币在炉里哭喊，铸成新的肋骨和新的账页。", lore: "它由输家的金币、牙齿和忏悔税铸成。胸口的空洞像一只永远张开的钱袋。", intro: "铸币魔像踩碎一地铜币。每一枚都在尖叫，声音却像掌声。", defeat: "魔像崩塌后，金币没有散开，而是排成一行，指向礼拜堂更深处。", hp: 31, min: 6, max: 9, skill: "shell", relic: "screamingTitheCoin", portrait: "coin" }),
    makeEnemy({ id: "blood-butcher", name: "血槽屠户", trait: "静脉收割人", path: "blood", location: "献血槽", locationDesc: "石槽里的血逆流而上，像想回到某个身体里。", lore: "屠户不收钱，只收仍在跳动的借口。", intro: "血槽屠户把钩子搭在肩上。钩尖滴下来的不是血，是红色蜡油。", defeat: "屠户倒下后，石槽里浮起一枚骰子，六面都是空白。", hp: 29, min: 6, max: 10, skill: "bleed", relic: "redWaxHook", portrait: "butcher" }),
    makeEnemy({ id: "moth-maid", name: "梦蛾女仆", trait: "烛火侍女", path: "dream", location: "倒眠温室", locationDesc: "植物在天花板上生长，花粉会让人梦见从未发生的童年。", lore: "她替客人铺床，也替客人把梦整理成标本。", intro: "梦蛾女仆提着灯走来。灯里没有火，只有一只拍翅的眼睛。", defeat: "她的翅粉落在桌上，拼出一句话：不要相信醒来。", hp: 26, min: 5, max: 9, skill: "moth", relic: "mothEyeLantern", portrait: "moth" })
  ],
  4: [
    makeEnemy({ id: "tax-auditor", name: "什一税审计员", trait: "账本清算官", path: "debt", location: "总账阶梯", locationDesc: "每一级台阶都写着一种利息，越往上越接近地窖。", lore: "他能从一声叹息里算出你欠下几生几世。", intro: "审计员展开量尺，量的不是距离，而是你还剩多少可以抵押。", defeat: "他的算盘散成一地眼珠，仍在彼此对账。", hp: 36, min: 7, max: 11, skill: "audit", relic: "auditEyeBead", portrait: "tax" }),
    makeEnemy({ id: "red-hound", name: "赤犬主教", trait: "嗅血传道人", path: "blood", location: "犬吠侧廊", locationDesc: "侧廊尽头没有门，只有数不清的项圈挂在圣像脖子上。", lore: "它布道时会摇尾。听众若鼓掌，便会被当作猎物。", intro: "赤犬主教伏在讲坛上嗅了嗅，像已经知道你哪一处最先流血。", defeat: "它的项圈断开，铃铛滚进黑暗，仍在一路吠叫。", hp: 34, min: 7, max: 12, skill: "redHound", relic: "brokenCollarBell", portrait: "hound" }),
    makeEnemy({ id: "white-rabbit", name: "白兔报时官", trait: "迟到宣判者", path: "dream", location: "逆时钟塔", locationDesc: "所有钟都倒着走，只有你的心跳被迫准时。", lore: "白兔不赶时间，它赶的是那些以为还有时间的人。", intro: "白兔报时官合上怀表：你迟到了三拍，所以审判提前。", defeat: "怀表停在第十三点。钟面背后刻着你的出生日期。", hp: 31, min: 6, max: 10, skill: "clock", relic: "thirteenthWatch", portrait: "rabbit" })
  ],
  5: [
    makeEnemy({ id: "wax-scribe", name: "封蜡书记", trait: "红印记录者", path: "debt", location: "封蜡档案库", locationDesc: "档案没有文字，只有一枚枚按在皮纸上的指纹。", lore: "他记录每一次反悔，然后把它们封进红蜡。", intro: "封蜡书记没有抬头。他已经替你写好了三种死法。", defeat: "红蜡融化成一条路，路尽头摆着一张老板椅。", hp: 39, min: 8, max: 12, skill: "seal", relic: "sealedThumbprint", portrait: "wax" }),
    makeEnemy({ id: "wet-child", name: "潮湿圣童", trait: "水下唱诗班", path: "blood", location: "淹没唱诗席", locationDesc: "长椅泡在水里。有人在水下唱赞美诗，歌词全是名字。", lore: "它从未出生，却已经替太多人哭过丧。", intro: "潮湿圣童从水面下抬头。它的歌声让你的伤口想起海。", defeat: "水面恢复平静，只剩一串气泡拼成：别回头。", hp: 37, min: 7, max: 13, skill: "tide", relic: "wetChoirBubble", portrait: "child" }),
    makeEnemy({ id: "ash-bellboy", name: "灰烬钟童", trait: "末班敲钟人", path: "dream", location: "灰钟儿童房", locationDesc: "地上都是烧焦的玩具。钟绳垂到摇篮里，像一条脐带。", lore: "他只在梦快醒时敲钟，把醒来的人再送回去。", intro: "灰烬钟童抱着小钟。每敲一下，你就忘记一件小事。", defeat: "小钟碎开，里面没有钟舌，只有一颗乳牙。", hp: 35, min: 8, max: 12, skill: "bell", relic: "ashMilkTooth", portrait: "ash" })
  ]
};

const bosses = {
  debt: makeEnemy({ id: "empty-judge", boss: true, name: "空座审判官", trait: "债路终局", path: "debt", location: "无主审判厅", locationDesc: "审判席上没有人。判决却已经写好，只差你的签名。", lore: "债路的尽头不是还清，而是承认自己也成了账目的一部分。", intro: "空座审判官没有身体。整间审判厅替它开口：欠债者，宣读自己。", defeat: "判决书烧成灰，你在灰里找回了自己的姓。", ending: "结局：焚账者。你烧毁了写有自己姓氏的总账，却留下了名字。此后黑礼拜堂仍会出现，只是不再认识你。", hp: 48, min: 9, max: 14, skill: "voidJudge", portrait: "judge" }),
  blood: makeEnemy({ id: "red-bishop", boss: true, name: "赤犬主教", trait: "血路终局", path: "blood", location: "倒悬圣坛", locationDesc: "圣坛倒挂在天花板上，血从高处落下，又流回高处。", lore: "血路的尽头不是死亡，而是把痛苦献给会鼓掌的神。", intro: "赤犬主教披着湿重的祭袍。它说你的血债很好闻。", defeat: "祭袍塌下去，里面只有一副空项圈。", ending: "结局：断铃者。你扯断了主教的项圈，血债不再追逐你。但每逢雨夜，你仍能听见远处有铃声。", hp: 50, min: 10, max: 15, skill: "redHound", portrait: "hound" }),
  dream: makeEnemy({ id: "sleeping-queen", boss: true, name: "睡梦女王", trait: "梦路终局", path: "dream", location: "倒眠王座", locationDesc: "王座漂在天花板上。所有影子都躺在地上睡觉。", lore: "梦路的尽头不是醒来，而是选择哪一个自己继续沉睡。", intro: "睡梦女王睁开第三只眼。你忽然想起，自己可能从未进入礼拜堂。", defeat: "王冠落下，没有声音。你醒在门外，手心里多了一枚没有点数的骰子。", ending: "结局：无点之骰。你从梦里醒来，却带走了一枚空白骨骰。它不会给出答案，只会在你犹豫时发热。", hp: 46, min: 9, max: 14, skill: "dreamQueen", portrait: "queen" })
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
  enemyIntent: 0,
  nextIntentBonus: 0,
  nextAttackBonus: 0,
  pathScores: { debt: 0, blood: 0, dream: 0 },
  routeHistory: [],
  relics: [],
  relicFightFlags: {},
  currentPath: null,
  oathFracture: 0,
  routeChoicePending: false,
  roundOver: false,
  rolled: false,
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
  locationName: document.getElementById("location-name"),
  locationDesc: document.getElementById("location-desc"),
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
  return state.enemy;
}

function scaleEnemy(enemy, round) {
  const hpBonus = Math.max(0, round - 1) * 3 + (enemy.boss ? 6 : 0);
  const intentBonus = Math.floor(Math.max(0, round - 1) / 2);
  return {
    ...enemy,
    hp: enemy.hp + hpBonus,
    min: enemy.min + intentBonus,
    max: enemy.max + intentBonus
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

function gainRelicFrom(enemy) {
  if (!enemy.relic || state.relics.some(relic => relic.id === enemy.relic.id)) return;
  state.relics.push(enemy.relic);
  discoverCodex("relics", enemy.relic.id);
  addLog(`获得遗物：${enemy.relic.name}。${enemy.relic.desc}`);
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
  state.enemyIntent = 0;
  state.turnInFight = 1;
  state.relicFightFlags = {};
  state.rolled = false;
  state.dice = [];
  state.slots = { attack: [], guard: [], heal: [] };
  state.selectedDie = null;
  discoverCodex("enemies", state.enemy.id);
  triggerRelicPhase("fightStart");
}

function rollD6() {
  return Math.floor(Math.random() * 6) + 1;
}

function randomIntent(enemy) {
  const base = enemy.min + Math.floor(Math.random() * (enemy.max - enemy.min + 1));
  const bonus = state.nextIntentBonus;
  state.nextIntentBonus = 0;
  return base + bonus;
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
  const ctx = createTurnContext({ preview: true });
  getSelectedCharacter().skill.apply(ctx);
  applyRelics(ctx);
  return {
    attack: ctx.attack,
    guard: ctx.guard,
    heal: Math.floor(ctx.healPips / 2)
  };
}

function createTurnContext(options = {}) {
  return {
    phase: "turn",
    preview: Boolean(options.preview),
    attack: sumSlot("attack") + state.nextAttackBonus,
    guard: sumSlot("guard"),
    healPips: sumSlot("heal"),
    attackDice: slotCount("attack"),
    guardDice: slotCount("guard"),
    healDice: slotCount("heal"),
    intent: state.enemyIntent,
    incoming: 0,
    selfDamage: 0,
    runFlags: options.preview ? { ...state.relicFightFlags } : state.relicFightFlags,
    afterResolve: [],
    messages: []
  };
}

function applyRelics(ctx) {
  for (const relic of state.relics) relic.apply(ctx);
}

function createRelicContext(phase, extra = {}) {
  return {
    phase,
    attack: 0,
    guard: 0,
    healPips: 0,
    attackDice: 0,
    guardDice: 0,
    healDice: 0,
    intent: state.enemyIntent,
    incoming: 0,
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

function render() {
  const enemy = currentEnemy();
  updateTheme();
  const totals = getPreviewTotals();
  els.turn.textContent = state.turn;
  els.wins.textContent = state.wins;
  els.roundIndicator.textContent = `${state.round}/${FINAL_ROUND}`;
  els.currentPath.textContent = state.currentPath ? `${PATH_LABELS[state.currentPath]}路` : "未定";
  els.fractureCount.textContent = state.oathFracture;
  els.debtScore.textContent = state.pathScores.debt;
  els.bloodScore.textContent = state.pathScores.blood;
  els.dreamScore.textContent = state.pathScores.dream;
  els.locationName.textContent = enemy.location;
  els.locationDesc.textContent = enemy.locationDesc;
  const character = getSelectedCharacter();
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
  els.enemyIntent.textContent = state.enemyIntent > 0 ? `意图：造成 ${state.enemyIntent} 点伤害` : "等待你掷骰";
  els.enemyHp.textContent = `${state.enemyHp}/${enemy.hp}`;
  els.enemyHpBar.style.width = `${(state.enemyHp / enemy.hp) * 100}%`;

  els.attackTotal.textContent = totals.attack;
  els.guardTotal.textContent = totals.guard;
  els.healTotal.textContent = totals.heal;

  els.rollBtn.disabled = state.rolled || state.roundOver || state.routeChoicePending;
  els.resolveBtn.disabled = !allDiceAssigned() || state.roundOver || state.routeChoicePending;
  renderRelics();
  renderRoutes();
  renderDice();
}

function renderCharacterSelect() {
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

function renderRelics() {
  if (!els.relicList) return;
  els.relicInventory.classList.toggle("empty", state.relics.length === 0);
  els.relicList.innerHTML = "";
  if (state.relics.length === 0) {
    const empty = document.createElement("p");
    empty.className = "empty-relics";
    empty.textContent = "尚未取得遗物。击败敌人后会夺取它的残留物。";
    els.relicList.appendChild(empty);
    return;
  }
  for (const relic of state.relics) {
    const chip = document.createElement("button");
    chip.className = "relic-chip";
    chip.title = `${relic.desc}\n${relic.lore}`;
    chip.innerHTML = `<strong>${relic.name}</strong><span>${relic.desc}</span>`;
    els.relicList.appendChild(chip);
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
  state.dice.forEach((die, index) => {
    const btn = document.createElement("button");
    btn.className = "die";
    btn.textContent = die.value;
    btn.disabled = state.roundOver || state.routeChoicePending;
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

function renderRoutes() {
  els.routePanel.classList.toggle("visible", state.routeChoicePending);
  els.routeOptions.innerHTML = "";
  if (!state.routeChoicePending) return;
  const options = getRouteOptions();
  for (const enemy of options) {
    const cost = getRouteSwitchCost(enemy.path);
    const isSwitch = cost > 0;
    const isLocked = !canPayRouteCost(enemy.path);
    const btn = document.createElement("button");
    btn.className = `route-card ${PATH_CLASSES[enemy.path]} ${isSwitch ? "switch-route" : "same-route"}`;
    btn.disabled = isLocked;
    btn.innerHTML = `
      <span>${PATH_LABELS[enemy.path]}路</span>
      <strong>${enemy.location}</strong>
      <small>${enemy.locationDesc}</small>
      <em>将遭遇：${enemy.name}</em>
      <b class="route-cost">${cost > 0 ? `改道代价：-${cost} 生命，违誓 +1` : state.currentPath ? "沿誓深入：无代价" : "初立誓约：无代价"}</b>
      ${isLocked ? "<i>生命不足，不能在这里撕毁旧路。</i>" : ""}
    `;
    btn.addEventListener("click", () => chooseRoute(enemy));
    els.routeOptions.appendChild(btn);
  }
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
  setEnemy(enemy, state.round);
  addLog(`${previousPath && previousPath === enemy.path ? "你没有回头，继续沿" : "你选择了"}${PATH_LABELS[enemy.path]}路：${enemy.location}。`);
  addLog(enemy.intro);
  render();
}

function selectDie(index) {
  if (state.routeChoicePending) return;
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
  if (state.selectedDie === null || state.roundOver || state.routeChoicePending) return;
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
  getSelectedCharacter().skill.apply(ctx);
  applyRelics(ctx);
  if (state.nextAttackBonus > 0) {
    ctx.messages.push(`遗物余势生效：本回合攻击 +${state.nextAttackBonus}。`);
    state.nextAttackBonus = 0;
  }
  enemy.skill.apply(ctx);

  const heal = Math.floor(ctx.healPips / 2);
  ctx.incoming = Math.max(0, ctx.intent - ctx.guard);
  enemy.skill.applyAfterDamage?.(ctx);
  applyRelics({ ...ctx, phase: "afterDamage" });
  const totalSelfDamage = ctx.incoming + ctx.selfDamage;

  state.enemyHp = clamp(state.enemyHp - ctx.attack, 0, enemy.hp);
  state.playerHp = clamp(state.playerHp + heal - totalSelfDamage, 0, state.playerMaxHp);
  for (const effect of ctx.afterResolve) effect();

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
  state.turnInFight += 1;
  state.rolled = false;
  state.dice = [];
  state.slots = { attack: [], guard: [], heal: [] };
  state.enemyIntent = 0;
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
    state.roundOver = true;
    render();
    return;
  }

  gainRelicFrom(defeated);

  state.round += 1;
  state.turn += 1;
  state.rolled = false;
  state.dice = [];
  state.slots = { attack: [], guard: [], heal: [] };
  state.enemyIntent = 0;

  if (state.round === FINAL_ROUND) {
    const bossPath = chooseBossPath();
    const boss = bosses[bossPath];
    state.routeChoicePending = false;
    setEnemy(boss, FINAL_ROUND);
    addLog(`五扇门同时关闭，只剩${PATH_LABELS[bossPath]}路的尽头还在呼吸。`);
    addLog(`你的岔路选择将你带向最终 Boss：${boss.name}。`);
    addLog(boss.intro);
  } else if (ROUTE_CHOICE_ROUNDS.has(state.round)) {
    state.routeChoicePending = true;
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
    setEnemy(nextEnemy, state.round);
    addLog(`胜利！当前生命保持为 ${state.playerHp}/${state.playerMaxHp}。门在身后闭合，你只能继续深入${PATH_LABELS[nextEnemy.path]}路。`);
    addLog(`${nextEnemy.location}接住了你的脚步。`);
    addLog(nextEnemy.intro);
  }
  render();
}

function loseRun() {
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
  state.relicFightFlags = {};
  state.currentPath = null;
  state.oathFracture = 0;
  state.routeChoicePending = false;
  state.roundOver = false;
  state.nextIntentBonus = 0;
  state.nextAttackBonus = 0;
  state.endingText = "";
  setEnemy(firstEnemy, 1);
  els.log.innerHTML = "";
  addLog(`${character.name}进入黑礼拜堂。点击掷骰。`);
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

document.querySelectorAll(".slot").forEach(slot => {
  slot.addEventListener("click", () => assignSelectedDie(slot.dataset.slot));
});

els.rollBtn.addEventListener("click", rollDice);
els.resolveBtn.addEventListener("click", resolveTurn);
els.resetBtn.addEventListener("click", showCharacterSelect);
els.startRunBtn?.addEventListener("click", startSelectedRun);
document.querySelectorAll("[data-open-codex]").forEach(btn => {
  btn.addEventListener("click", showCodex);
});
els.codexCloseBtn?.addEventListener("click", hideCodex);
els.codexTabs?.addEventListener("click", event => {
  if (event.target.matches("button[data-tab]")) renderCodex(event.target.dataset.tab);
});

showCharacterSelect();
