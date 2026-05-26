const PLAYER_MAX_HP = 24;
const FINAL_ROUND = 6;

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

const portraits = {
  player: `
<svg viewBox="0 0 140 170" role="img" aria-label="誓约者">
  <defs><radialGradient id="pHalo" cx="50%" cy="18%" r="68%"><stop offset="0" stop-color="#f0c775" stop-opacity=".72"/><stop offset=".46" stop-color="#49301f" stop-opacity=".52"/><stop offset="1" stop-color="#080706"/></radialGradient><linearGradient id="pSteel" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#d8c19a"/><stop offset=".45" stop-color="#6e7881"/><stop offset="1" stop-color="#20242a"/></linearGradient><linearGradient id="pCloak" x1="0" y1="34" x2="0" y2="162" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#4c1614"/><stop offset=".55" stop-color="#20110f"/><stop offset="1" stop-color="#080605"/></linearGradient></defs>
  <rect width="140" height="170" rx="30" fill="url(#pHalo)"/><path d="M13 162c9-47 26-73 57-73s48 26 57 73" fill="#090706"/><path d="M27 164c8-43 22-64 43-64s35 21 43 64" fill="url(#pCloak)"/><path d="M34 101l36-20 36 20-10 63H44z" fill="#2b1d16"/><path d="M48 104h44l-10 60H58z" fill="url(#pSteel)"/><path d="M40 62c4-28 17-45 30-45s26 17 30 45l-12 35H52z" fill="#16100d"/><circle cx="70" cy="66" r="28" fill="#c99b6f"/><path d="M38 64c8-35 25-52 32-52s24 17 32 52c-20-13-43-13-64 0z" fill="#0d0908"/><path d="M45 55c10-16 40-20 50 0-4-26-15-42-25-42S49 29 45 55z" fill="#d6a95b"/><path d="M52 68h14M74 68h14" stroke="#24130d" stroke-width="5" stroke-linecap="round"/><path d="M61 82c6 5 12 5 18 0" fill="none" stroke="#6b2b21" stroke-width="4" stroke-linecap="round"/><path d="M70 6l10 22-20-2z" fill="#f4d58a"/><rect x="58" y="112" width="24" height="24" rx="5" fill="#f4e2bd" transform="rotate(45 70 124)"/><circle cx="70" cy="124" r="3.8" fill="#261408"/><path d="M42 130l-18 28M98 130l18 28" stroke="#c79a55" stroke-width="5" stroke-linecap="round"/>
</svg>`,
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
  portrait: "wood"
});

const routeRounds = {
  2: [
    makeEnemy({ id: "iron-gambler", name: "铁面赌徒", trait: "锈牌老千", path: "debt", location: "欠账回廊", locationDesc: "墙上贴满空白借据，落款处都缺一滴血。", lore: "他的铁面具焊死在脸上。面具内侧刻满了他没有兑现的赔率。", intro: "铁面赌徒把一枚骰子藏进袖口。礼拜堂没有阻止他，像是默认作弊也是规矩的一部分。", defeat: "铁面具里滚出三颗假骰。每一颗都只有一面。", hp: 22, min: 4, max: 7, skill: "cheat", portrait: "iron" }),
    makeEnemy({ id: "blood-warden", name: "赤眼典狱官", trait: "礼拜堂刑吏", path: "blood", location: "赤刑室", locationDesc: "这里没有刑具，只有一排排等待签字的判词。", lore: "他负责处置赖账者。赤眼不是眼睛，是两枚烧红的债印。", intro: "赤眼典狱官翻开刑簿。你的名字没有出现，只有一段空白被红线圈住。", defeat: "刑簿合上时发出骨头折断的声音。红线从纸面渗进你的骰印。", hp: 24, min: 5, max: 8, skill: "execution", portrait: "red" }),
    makeEnemy({ id: "mirror-nun", name: "镜中修女", trait: "倒影告解者", path: "dream", location: "无面忏悔室", locationDesc: "每一面镜子都照不出脸，只照出你曾经说过的谎。", lore: "她从不听告解，只让人对着自己的倒影重复罪名。", intro: "镜中修女抬起空白的脸。你在她的面纱上看见自己闭着眼睛。", defeat: "镜面碎裂，却没有落地。碎片像雪一样向上飘。", hp: 20, min: 4, max: 7, skill: "mirror", portrait: "pale" })
  ],
  3: [
    makeEnemy({ id: "coin-golem", name: "铸币魔像", trait: "活体什一税机", path: "debt", location: "什一税铸炉", locationDesc: "铜币在炉里哭喊，铸成新的肋骨和新的账页。", lore: "它由输家的金币、牙齿和忏悔税铸成。胸口的空洞像一只永远张开的钱袋。", intro: "铸币魔像踩碎一地铜币。每一枚都在尖叫，声音却像掌声。", defeat: "魔像崩塌后，金币没有散开，而是排成一行，指向礼拜堂更深处。", hp: 31, min: 6, max: 9, skill: "shell", portrait: "coin" }),
    makeEnemy({ id: "blood-butcher", name: "血槽屠户", trait: "静脉收割人", path: "blood", location: "献血槽", locationDesc: "石槽里的血逆流而上，像想回到某个身体里。", lore: "屠户不收钱，只收仍在跳动的借口。", intro: "血槽屠户把钩子搭在肩上。钩尖滴下来的不是血，是红色蜡油。", defeat: "屠户倒下后，石槽里浮起一枚骰子，六面都是空白。", hp: 29, min: 6, max: 10, skill: "bleed", portrait: "butcher" }),
    makeEnemy({ id: "moth-maid", name: "梦蛾女仆", trait: "烛火侍女", path: "dream", location: "倒眠温室", locationDesc: "植物在天花板上生长，花粉会让人梦见从未发生的童年。", lore: "她替客人铺床，也替客人把梦整理成标本。", intro: "梦蛾女仆提着灯走来。灯里没有火，只有一只拍翅的眼睛。", defeat: "她的翅粉落在桌上，拼出一句话：不要相信醒来。", hp: 26, min: 5, max: 9, skill: "moth", portrait: "moth" })
  ],
  4: [
    makeEnemy({ id: "tax-auditor", name: "什一税审计员", trait: "账本清算官", path: "debt", location: "总账阶梯", locationDesc: "每一级台阶都写着一种利息，越往上越接近地窖。", lore: "他能从一声叹息里算出你欠下几生几世。", intro: "审计员展开量尺，量的不是距离，而是你还剩多少可以抵押。", defeat: "他的算盘散成一地眼珠，仍在彼此对账。", hp: 36, min: 7, max: 11, skill: "audit", portrait: "tax" }),
    makeEnemy({ id: "red-hound", name: "赤犬主教", trait: "嗅血传道人", path: "blood", location: "犬吠侧廊", locationDesc: "侧廊尽头没有门，只有数不清的项圈挂在圣像脖子上。", lore: "它布道时会摇尾。听众若鼓掌，便会被当作猎物。", intro: "赤犬主教伏在讲坛上嗅了嗅，像已经知道你哪一处最先流血。", defeat: "它的项圈断开，铃铛滚进黑暗，仍在一路吠叫。", hp: 34, min: 7, max: 12, skill: "redHound", portrait: "hound" }),
    makeEnemy({ id: "white-rabbit", name: "白兔报时官", trait: "迟到宣判者", path: "dream", location: "逆时钟塔", locationDesc: "所有钟都倒着走，只有你的心跳被迫准时。", lore: "白兔不赶时间，它赶的是那些以为还有时间的人。", intro: "白兔报时官合上怀表：你迟到了三拍，所以审判提前。", defeat: "怀表停在第十三点。钟面背后刻着你的出生日期。", hp: 31, min: 6, max: 10, skill: "clock", portrait: "rabbit" })
  ],
  5: [
    makeEnemy({ id: "wax-scribe", name: "封蜡书记", trait: "红印记录者", path: "debt", location: "封蜡档案库", locationDesc: "档案没有文字，只有一枚枚按在皮纸上的指纹。", lore: "他记录每一次反悔，然后把它们封进红蜡。", intro: "封蜡书记没有抬头。他已经替你写好了三种死法。", defeat: "红蜡融化成一条路，路尽头摆着一张老板椅。", hp: 39, min: 8, max: 12, skill: "seal", portrait: "wax" }),
    makeEnemy({ id: "wet-child", name: "潮湿圣童", trait: "水下唱诗班", path: "blood", location: "淹没唱诗席", locationDesc: "长椅泡在水里。有人在水下唱赞美诗，歌词全是名字。", lore: "它从未出生，却已经替太多人哭过丧。", intro: "潮湿圣童从水面下抬头。它的歌声让你的伤口想起海。", defeat: "水面恢复平静，只剩一串气泡拼成：别回头。", hp: 37, min: 7, max: 13, skill: "tide", portrait: "child" }),
    makeEnemy({ id: "ash-bellboy", name: "灰烬钟童", trait: "末班敲钟人", path: "dream", location: "灰钟儿童房", locationDesc: "地上都是烧焦的玩具。钟绳垂到摇篮里，像一条脐带。", lore: "他只在梦快醒时敲钟，把醒来的人再送回去。", intro: "灰烬钟童抱着小钟。每敲一下，你就忘记一件小事。", defeat: "小钟碎开，里面没有钟舌，只有一颗乳牙。", hp: 35, min: 8, max: 12, skill: "bell", portrait: "ash" })
  ]
};

const bosses = {
  debt: makeEnemy({ id: "empty-judge", boss: true, name: "空座审判官", trait: "债路终局", path: "debt", location: "无主审判厅", locationDesc: "审判席上没有人。判决却已经写好，只差你的签名。", lore: "债路的尽头不是还清，而是承认自己也成了账目的一部分。", intro: "空座审判官没有身体。整间审判厅替它开口：欠债者，宣读自己。", defeat: "判决书烧成灰，你在灰里找回了自己的姓。", ending: "结局：焚账者。你烧毁了写有自己姓氏的总账，却留下了名字。此后黑礼拜堂仍会出现，只是不再认识你。", hp: 48, min: 9, max: 14, skill: "voidJudge", portrait: "judge" }),
  blood: makeEnemy({ id: "red-bishop", boss: true, name: "赤犬主教", trait: "血路终局", path: "blood", location: "倒悬圣坛", locationDesc: "圣坛倒挂在天花板上，血从高处落下，又流回高处。", lore: "血路的尽头不是死亡，而是把痛苦献给会鼓掌的神。", intro: "赤犬主教披着湿重的祭袍。它说你的血债很好闻。", defeat: "祭袍塌下去，里面只有一副空项圈。", ending: "结局：断铃者。你扯断了主教的项圈，血债不再追逐你。但每逢雨夜，你仍能听见远处有铃声。", hp: 50, min: 10, max: 15, skill: "redHound", portrait: "hound" }),
  dream: makeEnemy({ id: "sleeping-queen", boss: true, name: "睡梦女王", trait: "梦路终局", path: "dream", location: "倒眠王座", locationDesc: "王座漂在天花板上。所有影子都躺在地上睡觉。", lore: "梦路的尽头不是醒来，而是选择哪一个自己继续沉睡。", intro: "睡梦女王睁开第三只眼。你忽然想起，自己可能从未进入礼拜堂。", defeat: "王冠落下，没有声音。你醒在门外，手心里多了一枚没有点数的骰子。", ending: "结局：无点之骰。你从梦里醒来，却带走了一枚空白骨骰。它不会给出答案，只会在你犹豫时发热。", hp: 46, min: 9, max: 14, skill: "dreamQueen", portrait: "queen" })
};

const state = {
  playerHp: PLAYER_MAX_HP,
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
  pathScores: { debt: 0, blood: 0, dream: 0 },
  routeHistory: [],
  routeChoicePending: false,
  roundOver: false,
  rolled: false,
  endingText: ""
};

const els = {
  turn: document.getElementById("turn"),
  wins: document.getElementById("wins"),
  roundIndicator: document.getElementById("round-indicator"),
  debtScore: document.getElementById("debt-score"),
  bloodScore: document.getElementById("blood-score"),
  dreamScore: document.getElementById("dream-score"),
  locationName: document.getElementById("location-name"),
  locationDesc: document.getElementById("location-desc"),
  routePanel: document.getElementById("route-panel"),
  routeOptions: document.getElementById("route-options"),
  playerHp: document.getElementById("player-hp"),
  playerHpBar: document.getElementById("player-hp-bar"),
  playerSkill: document.getElementById("player-skill"),
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

function setEnemy(enemy, round) {
  state.enemy = scaleEnemy(enemy, round);
  state.enemyHp = state.enemy.hp;
  state.enemyIntent = 0;
  state.turnInFight = 1;
  state.rolled = false;
  state.dice = [];
  state.slots = { attack: [], guard: [], heal: [] };
  state.selectedDie = null;
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
    incoming: 0,
    selfDamage: 0,
    messages: []
  };
}

function render() {
  const enemy = currentEnemy();
  const totals = getPreviewTotals();
  els.turn.textContent = state.turn;
  els.wins.textContent = state.wins;
  els.roundIndicator.textContent = `${state.round}/${FINAL_ROUND}`;
  els.debtScore.textContent = state.pathScores.debt;
  els.bloodScore.textContent = state.pathScores.blood;
  els.dreamScore.textContent = state.pathScores.dream;
  els.locationName.textContent = enemy.location;
  els.locationDesc.textContent = enemy.locationDesc;
  els.playerHp.textContent = `${state.playerHp}/${PLAYER_MAX_HP}`;
  els.playerHpBar.style.width = `${(state.playerHp / PLAYER_MAX_HP) * 100}%`;
  els.playerSkill.textContent = playerSkill.name;
  els.enemyRank.textContent = enemy.boss ? "Boss" : `敌人 · ${PATH_LABELS[enemy.path]}路`;
  els.enemyName.textContent = enemy.name;
  els.enemyTrait.textContent = enemy.trait;
  els.enemyLore.textContent = enemy.lore;
  els.enemySkill.textContent = enemy.skill.name;
  els.enemySkillDesc.textContent = enemy.skill.desc;
  els.playerPortrait.innerHTML = portraits.player;
  els.enemyPortrait.innerHTML = enemy.portrait;
  els.enemyIntent.textContent = state.enemyIntent > 0 ? `意图：造成 ${state.enemyIntent} 点伤害` : "等待你掷骰";
  els.enemyHp.textContent = `${state.enemyHp}/${enemy.hp}`;
  els.enemyHpBar.style.width = `${(state.enemyHp / enemy.hp) * 100}%`;

  els.attackTotal.textContent = totals.attack;
  els.guardTotal.textContent = totals.guard;
  els.healTotal.textContent = totals.heal;

  els.rollBtn.disabled = state.rolled || state.roundOver || state.routeChoicePending;
  els.resolveBtn.disabled = !allDiceAssigned() || state.roundOver || state.routeChoicePending;
  renderRoutes();
  renderDice();
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
  const options = routeRounds[state.round] || [];
  for (const enemy of options) {
    const btn = document.createElement("button");
    btn.className = `route-card ${PATH_CLASSES[enemy.path]}`;
    btn.innerHTML = `
      <span>${PATH_LABELS[enemy.path]}路</span>
      <strong>${enemy.location}</strong>
      <small>${enemy.locationDesc}</small>
      <em>将遭遇：${enemy.name}</em>
    `;
    btn.addEventListener("click", () => chooseRoute(enemy));
    els.routeOptions.appendChild(btn);
  }
}

function chooseRoute(enemy) {
  if (!state.routeChoicePending) return;
  state.pathScores[enemy.path] += 1;
  state.routeHistory.push(enemy.path);
  state.routeChoicePending = false;
  setEnemy(enemy, state.round);
  addLog(`你选择了${PATH_LABELS[enemy.path]}路：${enemy.location}。`);
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
  playerSkill.apply(ctx);
  enemy.skill.apply(ctx);

  const heal = Math.floor(ctx.healPips / 2);
  ctx.incoming = Math.max(0, ctx.intent - ctx.guard);
  enemy.skill.applyAfterDamage?.(ctx);
  const totalSelfDamage = ctx.incoming + ctx.selfDamage;

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
  state.turnInFight += 1;
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

  if (state.round >= FINAL_ROUND) {
    state.endingText = defeated.ending || "结局：你离开黑礼拜堂，但骰子仍在口袋里跳动。";
    addLog(state.endingText);
    state.roundOver = true;
    render();
    return;
  }

  state.round += 1;
  state.turn += 1;
  state.rolled = false;
  state.dice = [];
  state.slots = { attack: [], guard: [], heal: [] };
  state.enemyIntent = 0;

  if (state.round === FINAL_ROUND) {
    const bossPath = chooseBossPath();
    const boss = bosses[bossPath];
    setEnemy(boss, FINAL_ROUND);
    addLog(`五扇门同时关闭，只剩${PATH_LABELS[bossPath]}路的尽头还在呼吸。`);
    addLog(`你的岔路选择将你带向最终 Boss：${boss.name}。`);
    addLog(boss.intro);
  } else {
    state.routeChoicePending = true;
    addLog(`胜利！当前生命保持为 ${state.playerHp}/${PLAYER_MAX_HP}。三条岔路在你面前打开。`);
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
  state.playerHp = PLAYER_MAX_HP;
  state.round = 1;
  state.wins = 0;
  state.turn = 1;
  state.turnInFight = 1;
  state.pathScores = { debt: 0, blood: 0, dream: 0 };
  state.routeHistory = [];
  state.routeChoicePending = false;
  state.roundOver = false;
  state.nextIntentBonus = 0;
  state.endingText = "";
  setEnemy(firstEnemy, 1);
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
