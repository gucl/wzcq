// 文字传奇游戏核心逻辑
class TextLegendGame {
    constructor() {
        this.gameState = {
            screen: 'character-creation',
            character: null,
            currentLocation: 'village',
            inBattle: false,
            currentEnemy: null
        };

        this.locations = {
            village: {
                name: '新手村',
                description: '一个宁静的新手村庄，这里有友善的村民和基础的商店。',
                monsters: ['史莱姆', '野狼'],
                level: 1
            },
            forest: {
                name: '幽暗森林',
                description: '阴暗的森林，到处潜伏着危险的生物。',
                monsters: ['森林蜘蛛', '哥布林', '野狼'],
                level: 3
            },
            cave: {
                name: '山洞',
                description: '阴森的山洞，传说有珍贵的矿物和危险的怪物。',
                monsters: ['哥布林', '野熊', '暗影刺客'],
                level: 5
            },
            desert: {
                name: '沙漠绿洲',
                description: '热浪翻滚的沙漠中的一片绿洲，隐藏着古老的秘密。',
                monsters: ['野熊', '暗影刺客'],
                level: 7
            },
            dungeon: {
                name: '古代遗迹',
                description: '神秘的古代遗迹，充满了危险和宝藏。',
                monsters: ['暗影刺客', '古代骷髅'],
                level: 10
            }
        };

        this.monsters = {
            '史莱姆': {
                hp: 30, attack: 5, defense: 2, exp: 10, gold: 5,
                drops: {
                    common: ['铁剑', '皮甲', '生命药水'],
                    uncommon: ['钢剑'],
                    rare: []
                }
            },
            '野狼': {
                hp: 45, attack: 8, defense: 3, exp: 15, gold: 8,
                drops: {
                    common: ['皮甲', '生命药水', '魔法药水'],
                    uncommon: ['哥布林匕首', '蜘蛛丝手套'],
                    rare: []
                }
            },
            '森林蜘蛛': {
                hp: 60, attack: 12, defense: 5, exp: 25, gold: 15,
                drops: {
                    common: ['蜘蛛丝手套', '魔法药水'],
                    uncommon: ['铁甲', '魔法长袍'],
                    rare: ['钢甲']
                }
            },
            '哥布林': {
                hp: 70, attack: 15, defense: 6, exp: 30, gold: 20,
                drops: {
                    common: ['哥布林匕首', '生命药水大'],
                    uncommon: ['铁甲', '力量戒指'],
                    rare: ['钢剑', '智力戒指']
                }
            },
            '野熊': {
                hp: 100, attack: 20, defense: 8, exp: 50, gold: 35,
                drops: {
                    common: ['熊皮靴', '生命药水大'],
                    uncommon: ['力量戒指', '铁甲'],
                    rare: ['钢甲', '銀剑']
                }
            },
            '暗影刺客': {
                hp: 120, attack: 25, defense: 10, exp: 80, gold: 50,
                drops: {
                    common: ['生命药水大', '魔法药水大'],
                    uncommon: ['力量戒指', '智力戒指'],
                    rare: ['銀剑', '钢甲'],
                    epic: ['龙鳞剑']
                }
            },
            '古代骷髅': {
                hp: 150, attack: 30, defense: 15, exp: 120, gold: 80,
                drops: {
                    common: ['魔法药水大'],
                    uncommon: ['智力戒指', '魔法长袍'],
                    rare: ['钢甲', '銀剑'],
                    epic: ['龙鳞盾', '法圣杖']
                }
            }
        };

        this.items = {
            '生命药水': { type: 'consumable', effect: 'heal', value: 50, description: '恢复50点生命值', price: 20 },
            '生命药水大': { type: 'consumable', effect: 'heal', value: 100, description: '恢复100点生命值', price: 50 },
            '魔法药水': { type: 'consumable', effect: 'mana', value: 50, description: '恢复50点魔法值', price: 25 },
            '魔法药水大': { type: 'consumable', effect: 'mana', value: 100, description: '恢复100点魔法值', price: 60 },
            '铁剑': { type: 'weapon', attack: 10, description: '普通的铁制长剑', quality: 'common', price: 100 },
            '钢剑': { type: 'weapon', attack: 15, description: '尖锐的钢制长剑', quality: 'uncommon', price: 200 },
            '銀剑': { type: 'weapon', attack: 22, description: '闪亮的銀制长剑', quality: 'rare', price: 400 },
            '龙鳞剑': { type: 'weapon', attack: 35, agility: 5, description: '传说中的龙鳞剑', quality: 'epic', price: 1000 },
            '法圣杖': { type: 'weapon', attack: 15, mp: 50, description: '法圣使用的神圣法杖', quality: 'epic', price: 1200 },
            '哥布林匕首': { type: 'weapon', attack: 8, agility: 3, description: '轻巧的匕首', quality: 'uncommon', price: 150 },
            '法杖': { type: 'weapon', attack: 6, mp: 20, description: '增强魔法的法杖', quality: 'common', price: 120 },
            '皮甲': { type: 'armor', defense: 8, description: '柔软的皮制护甲', quality: 'common', price: 80 },
            '铁甲': { type: 'armor', defense: 15, description: '结实的铁制护甲', quality: 'uncommon', price: 180 },
            '钢甲': { type: 'armor', defense: 25, description: '重型钢制护甲', quality: 'rare', price: 350 },
            '龙鳞盾': { type: 'armor', defense: 40, hp: 50, description: '龙鳞打造的传说护甲', quality: 'epic', price: 1500 },
            '魔法长袍': { type: 'armor', defense: 5, mp: 30, description: '魔法师的长袍', quality: 'uncommon', price: 160 },
            '蜘蛛丝手套': { type: 'accessory', agility: 5, description: '用蜘蛛丝编织的手套', quality: 'uncommon', price: 90 },
            '熊皮靴': { type: 'accessory', defense: 5, agility: 2, description: '保暖的熊皮靴子', quality: 'rare', price: 140 },
            '力量戒指': { type: 'accessory', attack: 5, description: '增强力量的魔法戒指', quality: 'rare', price: 180 },
            '智力戒指': { type: 'accessory', mp: 25, description: '增强智力的魔法戒指', quality: 'rare', price: 160 }
        };

        this.skills = {
            warrior: {
                '重击': {
                    level: 1, cost: 0, mpCost: 5, damage: 1.5,
                    description: '强力一击，造成1.5倍伤害',
                    requirements: { level: 1 }
                },
                '盾牌格挡': {
                    level: 1, cost: 50, mpCost: 8, effect: 'defense', value: 0.5,
                    description: '提高防御，减少50%伤害',
                    requirements: { level: 3 }
                },
                '狂暴': {
                    level: 1, cost: 100, mpCost: 15, damage: 2.0,
                    description: '狂暴攻击，造成2倍伤害',
                    requirements: { level: 5, skill: '重击' }
                },
                '旋风斩': {
                    level: 1, cost: 200, mpCost: 20, damage: 2.5,
                    description: '旋风斩击，造成2.5倍伤害',
                    requirements: { level: 8, skill: '狂暴' }
                }
            },
            mage: {
                '火球术': {
                    level: 1, cost: 0, mpCost: 8, damage: 1.8,
                    description: '释放火球，造成1.8倍魔法伤害',
                    requirements: { level: 1 }
                },
                '冰箭': {
                    level: 1, cost: 60, mpCost: 12, damage: 2.2,
                    description: '释放冰箭，造成2.2倍魔法伤害',
                    requirements: { level: 3 }
                },
                '闪电': {
                    level: 1, cost: 120, mpCost: 18, damage: 2.8,
                    description: '释放闪电，造成2.8倍魔法伤害',
                    requirements: { level: 6, skill: '冰箭' }
                },
                '流星火雨': {
                    level: 1, cost: 250, mpCost: 35, damage: 3.5,
                    description: '终极魔法，造成3.5倍魔法伤害',
                    requirements: { level: 10, skill: '闪电' }
                }
            },
            archer: {
                '精准射击': {
                    level: 1, cost: 0, mpCost: 6, damage: 1.6,
                    description: '精准射击，造成1.6倍伤害',
                    requirements: { level: 1 }
                },
                '多重射击': {
                    level: 1, cost: 80, mpCost: 12, damage: 1.3, hits: 3,
                    description: '连续3次射击，每次造成1.3倍伤害',
                    requirements: { level: 4 }
                },
                '爆炸箭': {
                    level: 1, cost: 150, mpCost: 18, damage: 2.6,
                    description: '爆炸箭矢，造成2.6倍伤害',
                    requirements: { level: 7, skill: '多重射击' }
                },
                '神箭': {
                    level: 1, cost: 300, mpCost: 25, damage: 4.0,
                    description: '神箭一击，造成4倍伤害',
                    requirements: { level: 12, skill: '爆炸箭' }
                }
            }
        };

        this.init();
    }

    init() {
        this.bindEvents();
        this.updateTime();
        setInterval(() => this.updateTime(), 1000);

        // 检查是否有保存的游戏
        this.loadGame();
    }

    bindEvents() {
        // 角色创建事件
        document.getElementById('char-class').addEventListener('change', (e) => {
            this.showClassInfo(e.target.value);
        });

        document.getElementById('create-character-btn').addEventListener('click', () => {
            this.createCharacter();
        });

        // 导航事件
        document.querySelectorAll('.nav-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.switchPanel(e.target.id.replace('nav-', ''));
            });
        });

        // 探索事件
        document.getElementById('hunt-monsters').addEventListener('click', () => {
            this.startBattle();
        });

        document.getElementById('rest-inn').addEventListener('click', () => {
            this.restAtInn();
        });

        // 探索地牢事件
        document.getElementById('explore-dungeon').addEventListener('click', () => {
            this.exploreDungeon();
        });

        // 商店事件
        document.getElementById('visit-shop').addEventListener('click', () => {
            this.openShop();
        });

        // 战斗事件
        document.getElementById('attack-btn').addEventListener('click', () => {
            this.playerAttack();
        });

        document.getElementById('skill-attack-btn').addEventListener('click', () => {
            this.showSkillsForBattle();
        });

        document.getElementById('flee-btn').addEventListener('click', () => {
            this.fleeBattle();
        });

        // 保存游戏
        document.getElementById('save-btn').addEventListener('click', () => {
            this.saveGame();
        });

        // 使用物品事件
        document.getElementById('use-item-btn').addEventListener('click', () => {
            this.showInventoryForUse();
        });

        // 地点切换
        document.querySelectorAll('.location-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.changeLocation(e.target.dataset.location);
            });
        });

        // 挂机功能
        document.getElementById('toggle-afk').addEventListener('click', () => {
            this.toggleAfkMode();
        });
    }

    updateTime() {
        const now = new Date();
        document.getElementById('current-time').textContent =
            now.toLocaleTimeString('zh-CN');
    }

    showClassInfo(className) {
        document.querySelectorAll('.class-desc').forEach(desc => {
            desc.style.display = 'none';
        });
        document.getElementById(`${className}-info`).style.display = 'block';
    }

    createCharacter() {
        const name = document.getElementById('char-name').value.trim();
        const charClass = document.getElementById('char-class').value;

        if (!name) {
            this.showMessage('请输入角色名称！', 'error');
            return;
        }

        const stats = this.getClassStats(charClass);

        this.gameState.character = {
            name: name,
            class: charClass,
            level: 1,
            hp: stats.hp,
            maxHp: stats.hp,
            mp: stats.mp,
            maxMp: stats.mp,
            attack: stats.attack,
            defense: stats.defense,
            agility: stats.agility,
            exp: 0,
            expToNext: 100,
            gold: 100,
            inventory: [
                { name: '生命药水', quantity: 3 },
                { name: '魔法药水', quantity: 2 },
                { name: '铁剑', quantity: 1 }
            ],
            maxInventory: 20,
            equipment: {
                weapon: null,
                armor: null,
                accessory: null
            },
            skills: {},
            skillPoints: 1,  // 初始1点技能点
            shopRefreshCount: 0,  // 商店刷新次数
            lastShopResetDate: new Date().toDateString(),  // 上次商店重置日期
            isAfkMode: false,  // 挂机模式
            afkStartTime: null  // 挂机开始时间
        };

        this.showMessage(`角色 ${name} 创建成功！`, 'success');
        this.switchToGame();
    }

    getClassStats(className) {
        const stats = {
            warrior: { hp: 120, mp: 30, attack: 15, defense: 12, agility: 8 },
            mage: { hp: 80, mp: 150, attack: 8, defense: 6, agility: 10 },
            archer: { hp: 100, mp: 60, attack: 12, defense: 8, agility: 15 }
        };
        return stats[className];
    }

    switchToGame() {
        document.getElementById('character-creation').style.display = 'none';
        document.getElementById('main-game').style.display = 'grid';
        this.updateUI();
        this.showMessage('欢迎来到文字传奇世界！', 'important');

        // 检查挂机状态
        this.checkAfkStatus();
    }

    updateUI() {
        if (!this.gameState.character) return;

        const char = this.gameState.character;

        // 更新角色信息
        document.getElementById('char-display-name').textContent = char.name;
        document.getElementById('char-display-class').textContent = this.getClassName(char.class);
        document.getElementById('char-level').textContent = `等级 ${char.level}`;

        // 更新状态条
        this.updateStatBar('hp', char.hp, char.maxHp);
        this.updateStatBar('mp', char.mp, char.maxMp);
        this.updateStatBar('exp', char.exp, char.expToNext);

        // 更新详细属性
        document.getElementById('attack-stat').textContent = char.attack;
        document.getElementById('defense-stat').textContent = char.defense;
        document.getElementById('agility-stat').textContent = char.agility;
        document.getElementById('gold-amount').textContent = char.gold;

        // 更新当前位置
        const location = this.locations[this.gameState.currentLocation];
        document.getElementById('current-location').textContent = location.name;
        document.getElementById('location-description').textContent = location.description;
    }

    updateStatBar(type, current, max) {
        const percentage = (current / max) * 100;
        document.getElementById(`${type}-fill`).style.width = `${percentage}%`;
        document.getElementById(`${type}-text`).textContent = `${current}/${max}`;
    }

    getClassName(classKey) {
        const names = {
            warrior: '战士',
            mage: '法师',
            archer: '弓手'
        };
        return names[classKey];
    }

    switchPanel(panelName) {
        // 隐藏所有面板
        document.querySelectorAll('.content-panel').forEach(panel => {
            panel.style.display = 'none';
        });

        // 移除所有导航按钮的active类
        document.querySelectorAll('.nav-btn').forEach(btn => {
            btn.classList.remove('active');
        });

        // 显示选中的面板
        document.getElementById(`${panelName}-panel`).style.display = 'block';
        document.getElementById(`nav-${panelName}`).classList.add('active');

        // 根据面板类型更新内容
        if (panelName === 'inventory') {
            this.updateInventory();
        } else if (panelName === 'equipment') {
            this.updateEquipment();
        } else if (panelName === 'skills') {
            this.updateSkills();
        } else if (panelName === 'shop') {
            this.updateShop();
        }
    }

    startBattle() {
        const location = this.locations[this.gameState.currentLocation];
        const monsters = location.monsters;
        const randomMonster = monsters[Math.floor(Math.random() * monsters.length)];

        this.gameState.inBattle = true;
        this.gameState.currentEnemy = {
            name: randomMonster,
            ...this.monsters[randomMonster],
            currentHp: this.monsters[randomMonster].hp
        };

        this.switchPanel('battle');
        this.updateBattleUI();
        this.showMessage(`遭遇了 ${randomMonster}！`, 'important');
    }

    updateBattleUI() {
        const enemy = this.gameState.currentEnemy;
        document.getElementById('enemy-name').textContent = enemy.name;
        document.getElementById('enemy-description').textContent = `一只危险的${enemy.name}`;

        const enemyHpPercentage = (enemy.currentHp / enemy.hp) * 100;
        document.getElementById('enemy-hp-fill').style.width = `${enemyHpPercentage}%`;
        document.getElementById('enemy-hp-text').textContent = `HP: ${enemy.currentHp}/${enemy.hp}`;
    }

    playerAttack() {
        if (!this.gameState.inBattle) return;

        const char = this.gameState.character;
        const enemy = this.gameState.currentEnemy;

        // 计算伤害
        const damage = Math.max(1, char.attack - enemy.defense + Math.floor(Math.random() * 5));
        enemy.currentHp = Math.max(0, enemy.currentHp - damage);

        this.addBattleLog(`你攻击了${enemy.name}，造成${damage}点伤害`);

        if (enemy.currentHp <= 0) {
            this.winBattle();
        } else {
            this.enemyAttack();
        }

        this.updateBattleUI();
        this.updateUI();
    }

    enemyAttack() {
        const char = this.gameState.character;
        const enemy = this.gameState.currentEnemy;

        const damage = Math.max(1, enemy.attack - char.defense + Math.floor(Math.random() * 3));
        char.hp = Math.max(0, char.hp - damage);

        this.addBattleLog(`${enemy.name}攻击了你，造成${damage}点伤害`);

        if (char.hp <= 0) {
            this.gameOver();
        }
    }

    winBattle() {
        const char = this.gameState.character;
        const enemy = this.gameState.currentEnemy;

        char.exp += enemy.exp;

        // 金币必掉，根据怪物难度确定数量
        const baseGold = enemy.gold;
        const goldVariation = Math.floor(baseGold * 0.3); // ±30%变化
        const actualGold = baseGold + Math.floor(Math.random() * (goldVariation * 2 + 1)) - goldVariation;
        char.gold += Math.max(1, actualGold); // 确保至少掉1金币

        this.addBattleLog(`战斗胜利！获得${enemy.exp}经验值和${Math.max(1, actualGold)}金币`);

        // 掉落物品系统
        const drops = this.monsters[enemy.name].drops || {};

        // 按稀有度尝试掉落（从高到低）
        const dropTypes = [
            { type: 'epic', chance: 0.02, items: drops.epic || [] },
            { type: 'rare', chance: 0.08, items: drops.rare || [] },
            { type: 'uncommon', chance: 0.25, items: drops.uncommon || [] },
            { type: 'common', chance: 0.5, items: drops.common || [] }
        ];

        let hasDropped = false;
        for (const dropType of dropTypes) {
            if (!hasDropped && dropType.items.length > 0 && Math.random() < dropType.chance) {
                const dropItem = dropType.items[Math.floor(Math.random() * dropType.items.length)];
                if (this.addItemToInventory(dropItem)) {
                    const quality = this.items[dropItem] ? this.items[dropItem].quality : 'common';
                    this.addBattleLog(`获得${this.getQualityText(quality)}物品：${dropItem}`);
                    hasDropped = true; // 每次战斗最多掉落一件物品
                } else {
                    this.addBattleLog(`背包已满，丢失了${dropItem}！`);
                    hasDropped = true;
                }
            }
        }

        if (!hasDropped) {
            this.addBattleLog('没有发现其他战利品。');
        }

        this.showMessage(`击败了${enemy.name}！`, 'success');

        // 检查升级
        if (char.exp >= char.expToNext) {
            this.levelUp();
        }

        this.endBattle();
    }

    getQualityText(quality) {
        const qualityMap = {
            'common': '普通',
            'uncommon': '罕见',
            'rare': '稀有',
            'epic': '史诗',
            'legendary': '传说'
        };
        return qualityMap[quality] || '普通';
    }

    levelUp() {
        const char = this.gameState.character;
        char.level++;
        char.exp -= char.expToNext;
        char.expToNext = Math.floor(char.expToNext * 1.5);

        // 升级属性提升
        const hpIncrease = 20;
        const mpIncrease = 10;
        const attackIncrease = 3;
        const defenseIncrease = 2;

        char.maxHp += hpIncrease;
        char.hp = char.maxHp; // 升级回满血
        char.maxMp += mpIncrease;
        char.mp = char.maxMp; // 升级回满蓝
        char.attack += attackIncrease;
        char.defense += defenseIncrease;
        char.skillPoints += 1; // 每级获得1点技能点

        this.showMessage(`恭喜升级！达到${char.level}级！获得1点技能点！`, 'success');
        this.addBattleLog(`升级！生命值+${hpIncrease}，魔法值+${mpIncrease}，攻击力+${attackIncrease}，防御力+${defenseIncrease}，技能点+1`);

        // 刷新技能界面如果当前在技能面板
        const currentPanel = document.querySelector('.nav-btn.active');
        if (currentPanel && currentPanel.id === 'nav-skills') {
            this.updateSkills();
        }
    }

    fleeBattle() {
        this.addBattleLog('你逃跑了！');
        this.showMessage('逃跑成功！', 'important');
        this.endBattle();
    }

    endBattle() {
        this.gameState.inBattle = false;
        this.gameState.currentEnemy = null;
        this.switchPanel('explore');
        document.getElementById('battle-log').innerHTML = '';
    }

    gameOver() {
        this.showMessage('你死了！游戏结束！', 'error');
        this.addBattleLog('你被击败了...');
        // 这里可以添加重生或重新开始的逻辑
    }

    addBattleLog(message) {
        const log = document.getElementById('battle-log');
        const div = document.createElement('div');
        div.textContent = message;
        log.appendChild(div);
        log.scrollTop = log.scrollHeight;
    }

    restAtInn() {
        const char = this.gameState.character;
        const cost = char.level * 10;

        if (char.gold >= cost) {
            char.gold -= cost;
            char.hp = char.maxHp;
            char.mp = char.maxMp;
            this.updateUI();
            this.showMessage(`在客栈休息，花费${cost}金币，生命值和魔法值已恢复！`, 'success');
        } else {
            this.showMessage('金币不足，无法在客栈休息！', 'error');
        }
    }

    changeLocation(locationKey) {
        if (this.locations[locationKey]) {
            this.gameState.currentLocation = locationKey;
            this.updateUI();
            this.showMessage(`来到了${this.locations[locationKey].name}`, 'important');
        }
    }

    exploreDungeon() {
        const char = this.gameState.character;
        const location = this.locations[this.gameState.currentLocation];

        if (char.level < location.level) {
            this.showMessage(`需要${location.level}级才能探索这里！`, 'error');
            return;
        }

        // 随机遇到怪物或发现宝箱
        if (Math.random() < 0.7) {
            this.startBattle();
        } else {
            this.findTreasure();
        }
    }

    findTreasure() {
        const char = this.gameState.character;
        const treasures = [
            { type: 'gold', min: 50, max: 200 },
            { type: 'exp', min: 20, max: 100 },
            { type: 'item', items: ['生命药水大', '魔法药水大', '力量戒指', '智力戒指'] }
        ];

        const treasure = treasures[Math.floor(Math.random() * treasures.length)];

        switch (treasure.type) {
            case 'gold':
                const goldAmount = Math.floor(Math.random() * (treasure.max - treasure.min + 1)) + treasure.min;
                char.gold += goldAmount;
                this.showMessage(`发现了宝箱！获得${goldAmount}金币！`, 'success');
                break;
            case 'exp':
                const expAmount = Math.floor(Math.random() * (treasure.max - treasure.min + 1)) + treasure.min;
                char.exp += expAmount;
                this.showMessage(`发现了魔法水晶！获得${expAmount}经验值！`, 'success');
                if (char.exp >= char.expToNext) {
                    this.levelUp();
                }
                break;
            case 'item':
                const item = treasure.items[Math.floor(Math.random() * treasure.items.length)];
                this.addItemToInventory(item);
                this.showMessage(`发现了神秘宝箱！获得${item}！`, 'success');
                break;
        }

        this.updateUI();
    }

    updateInventory() {
        const char = this.gameState.character;
        if (!char) return;

        const grid = document.getElementById('inventory-grid');
        grid.innerHTML = '';

        // 创建背包格子
        for (let i = 0; i < char.maxInventory; i++) {
            const slot = document.createElement('div');
            slot.className = 'inventory-slot';
            slot.dataset.index = i;

            if (char.inventory[i]) {
                const item = char.inventory[i];
                const itemData = this.items[item.name];
                const qualityClass = itemData && itemData.quality ? `item-${itemData.quality}` : 'item-common';

                slot.classList.add('has-item', qualityClass);
                slot.innerHTML = `
                    <div class="item-icon" style="font-size: 1.8em;">${this.getItemIcon(item.name)}</div>
                    ${(item.quantity && item.quantity > 1) ? `<div class="item-count">${item.quantity}</div>` : ''}
                `;
                slot.title = `${item.name}: ${itemData ? itemData.description : '未知物品'}`;

                // 添加点击事件
                slot.addEventListener('click', () => {
                    this.handleItemClick(i);
                });
            } else {
                slot.textContent = '空';
            }

            grid.appendChild(slot);
        }

        // 更新背包信息（修复BUG：正确统计实际使用的槽位）
        const usedSlots = char.inventory.filter((item, index) =>
            index < char.maxInventory && item && item.name && item.name.trim() !== ''
        ).length;
        document.getElementById('inventory-used').textContent = usedSlots;
        document.getElementById('inventory-max').textContent = char.maxInventory;
    }

    updateEquipment() {
        const char = this.gameState.character;
        if (!char) return;

        const weaponSlot = document.getElementById('weapon-slot');
        const armorSlot = document.getElementById('armor-slot');
        const accessorySlot = document.getElementById('accessory-slot');

        // 更新武器槽
        if (char.equipment.weapon) {
            weaponSlot.textContent = char.equipment.weapon;
            weaponSlot.className = 'slot-box equipped';
        } else {
            weaponSlot.textContent = '空';
            weaponSlot.className = 'slot-box';
        }

        // 更新防具槽
        if (char.equipment.armor) {
            armorSlot.textContent = char.equipment.armor;
            armorSlot.className = 'slot-box equipped';
        } else {
            armorSlot.textContent = '空';
            armorSlot.className = 'slot-box';
        }

        // 更新饰品槽
        if (char.equipment.accessory) {
            accessorySlot.textContent = char.equipment.accessory;
            accessorySlot.className = 'slot-box equipped';
        } else {
            accessorySlot.textContent = '空';
            accessorySlot.className = 'slot-box';
        }

        // 添加装备槽点击事件
        weaponSlot.onclick = () => {
            if (char.equipment.weapon) {
                this.unequipItem('weapon');
            }
        };

        armorSlot.onclick = () => {
            if (char.equipment.armor) {
                this.unequipItem('armor');
            }
        };

        accessorySlot.onclick = () => {
            if (char.equipment.accessory) {
                this.unequipItem('accessory');
            }
        };
    }

    showMessage(message, type = 'normal') {
        const logContent = document.getElementById('log-content');
        const div = document.createElement('div');
        div.className = `log-message ${type}`;
        div.textContent = `${new Date().toLocaleTimeString()}: ${message}`;
        logContent.appendChild(div);
        logContent.scrollTop = logContent.scrollHeight;
    }

    saveGame() {
        if (this.gameState.character) {
            localStorage.setItem('textLegendSave', JSON.stringify(this.gameState));
            this.showMessage('游戏已保存！', 'success');
        }
    }

    loadGame() {
        const saveData = localStorage.getItem('textLegendSave');
        if (saveData) {
            try {
                this.gameState = JSON.parse(saveData);
                if (this.gameState.character) {
                    // 确保新属性存在
                    const char = this.gameState.character;
                    if (typeof char.shopRefreshCount !== 'number') char.shopRefreshCount = 0;
                    if (!char.lastShopResetDate) char.lastShopResetDate = new Date().toDateString();
                    if (typeof char.isAfkMode !== 'boolean') char.isAfkMode = false;
                    if (!char.afkStartTime) char.afkStartTime = null;

                    this.switchToGame();
                    this.showMessage('游戏加载成功！', 'success');
                }
            } catch (error) {
                this.showMessage('存档损坏，将开始新游戏', 'error');
            }
        }
    }

    // 添加物品到背包（修复背包检查逻辑）
    addItemToInventory(itemName, quantity = 1) {
        const char = this.gameState.character;

        // 检查是否是可堆叠物品（消耗品）
        if (this.items[itemName] && this.items[itemName].type === 'consumable') {
            // 查找是否已有相同物品
            const existingIndex = char.inventory.findIndex(item =>
                item && item.name === itemName
            );

            if (existingIndex !== -1) {
                char.inventory[existingIndex].quantity += quantity;
                return true;
            }
        }

        // 查找空槽位（修复：确保背包数组长度正确）
        // 确保背包数组有足够的长度
        while (char.inventory.length < char.maxInventory) {
            char.inventory.push(null);
        }

        const emptyIndex = char.inventory.findIndex((item, index) =>
            index < char.maxInventory && !item
        );

        if (emptyIndex !== -1) {
            char.inventory[emptyIndex] = {
                name: itemName,
                quantity: this.items[itemName] && this.items[itemName].type === 'consumable' ? quantity : 1
            };
            return true;
        } else {
            this.showMessage('背包已满！', 'error');
            return false;
        }
    }

    // 获取物品图标
    getItemIcon(itemName) {
        const icons = {
            '生命药水': '🧪',
            '生命药水大': '🧪',
            '魔法药水': '💙',
            '魔法药水大': '💙',
            '铁剑': '⚔️',
            '钢剑': '⚔️',
            '银剑': '⚔️',
            '哥布林匕首': '🗡️',
            '法杖': '🪄',
            '皮甲': '🛡️',
            '铁甲': '🛡️',
            '钢甲': '🛡️',
            '魔法长袍': '🥼',
            '蜘蛛丝手套': '🧤',
            '熊皮靴': '👢',
            '力量戒指': '💍',
            '智力戒指': '💍'
        };
        return icons[itemName] || '📦';
    }

    // 处理物品点击
    handleItemClick(index) {
        const char = this.gameState.character;
        const item = char.inventory[index];

        if (!item) return;

        const itemData = this.items[item.name];

        if (itemData.type === 'consumable') {
            this.useItem(index);
        } else {
            this.equipItem(index);
        }
    }

    // 使用物品
    useItem(index) {
        const char = this.gameState.character;
        const item = char.inventory[index];
        const itemData = this.items[item.name];

        if (itemData.effect === 'heal') {
            const healAmount = Math.min(itemData.value, char.maxHp - char.hp);
            char.hp += healAmount;
            this.showMessage(`使用${item.name}，恢复${healAmount}点生命值`, 'success');
        } else if (itemData.effect === 'mana') {
            const manaAmount = Math.min(itemData.value, char.maxMp - char.mp);
            char.mp += manaAmount;
            this.showMessage(`使用${item.name}，恢复${manaAmount}点魔法值`, 'success');
        }

        // 减少物品数量
        item.quantity--;
        if (item.quantity <= 0) {
            char.inventory[index] = null;
        }

        this.updateInventory();
        this.updateUI();
    }

    // 装备物品
    equipItem(index) {
        const char = this.gameState.character;
        const item = char.inventory[index];
        const itemData = this.items[item.name];

        // 卸下当前装备
        if (char.equipment[itemData.type]) {
            this.addItemToInventory(char.equipment[itemData.type]);
        }

        // 装备新物品
        char.equipment[itemData.type] = item.name;
        char.inventory[index] = null;

        // 应用装备属性
        this.applyEquipmentStats();

        this.showMessage(`装备了${item.name}`, 'success');
        this.updateInventory();
        this.updateEquipment();
        this.updateUI();
    }

    // 卸下装备
    unequipItem(slot) {
        const char = this.gameState.character;
        const equipmentName = char.equipment[slot];

        if (equipmentName && this.addItemToInventory(equipmentName)) {
            char.equipment[slot] = null;
            this.applyEquipmentStats();
            this.showMessage(`卸下了${equipmentName}`, 'success');
            this.updateInventory();
            this.updateEquipment();
            this.updateUI();
        }
    }

    // 应用装备属性
    applyEquipmentStats() {
        const char = this.gameState.character;
        const baseStats = this.getClassStats(char.class);

        // 重置为基础属性
        char.attack = baseStats.attack + (char.level - 1) * 3;
        char.defense = baseStats.defense + (char.level - 1) * 2;
        char.agility = baseStats.agility;

        // 应用装备属性
        Object.values(char.equipment).forEach(equipmentName => {
            if (equipmentName && this.items[equipmentName]) {
                const item = this.items[equipmentName];
                if (item.attack) char.attack += item.attack;
                if (item.defense) char.defense += item.defense;
                if (item.agility) char.agility += item.agility;
                if (item.mp) char.maxMp += item.mp;
            }
        });
    }

    // 显示背包用于使用物品
    showInventoryForUse() {
        if (!this.gameState.inBattle) return;

        const char = this.gameState.character;
        const consumables = char.inventory.filter((item, index) =>
            item && this.items[item.name].type === 'consumable'
        );

        if (consumables.length === 0) {
            this.showMessage('没有可使用的物品！', 'error');
            return;
        }

        // 显示可用物品列表（简单实现）
        const firstConsumable = consumables[0];
        const index = char.inventory.findIndex(item =>
            item && item.name === firstConsumable.name
        );

        this.useItem(index);
    }

    // 商店系统
    openShop() {
        this.switchPanel('shop');
        this.showMessage('欢迎来到商店！', 'important');
    }

    updateShop() {
        // 检查是否需要重置商店刷新次数
        this.checkShopReset();

        // 绑定商店标签切换事件
        document.getElementById('shop-equipment-tab').onclick = () => {
            this.switchShopTab('equipment');
        };
        document.getElementById('shop-items-tab').onclick = () => {
            this.switchShopTab('items');
        };

        // 默认显示装备商店
        this.switchShopTab('equipment');
    }

    switchShopTab(tab) {
        // 更新标签样式
        document.querySelectorAll('.shop-tab').forEach(t => t.classList.remove('active'));
        document.getElementById(`shop-${tab}-tab`).classList.add('active');

        // 显示对应内容
        document.querySelectorAll('.shop-content').forEach(c => c.style.display = 'none');
        document.getElementById(`shop-${tab}`).style.display = 'block';

        // 加载商品
        if (tab === 'equipment') {
            this.loadEquipmentShop();
        } else {
            this.loadItemsShop();
        }

        // 添加刷新按钮
        this.addRefreshButton(tab);
    }

    loadEquipmentShop() {
        const container = document.getElementById('equipment-shop-list');
        container.innerHTML = '';

        // 获取装备类物品
        const equipments = Object.entries(this.items).filter(([name, item]) =>
            item.type === 'weapon' || item.type === 'armor' || item.type === 'accessory'
        );

        equipments.forEach(([name, item]) => {
            const shopItem = this.createShopItem(name, item);
            container.appendChild(shopItem);
        });
    }

    loadItemsShop() {
        const container = document.getElementById('items-shop-list');
        container.innerHTML = '';

        // 获取消耗品
        const consumables = Object.entries(this.items).filter(([name, item]) =>
            item.type === 'consumable'
        );

        consumables.forEach(([name, item]) => {
            const shopItem = this.createShopItem(name, item);
            container.appendChild(shopItem);
        });
    }

    createShopItem(name, item) {
        const div = document.createElement('div');
        div.className = 'shop-item';

        const statsText = this.getItemStatsText(item);
        const qualityClass = item.quality ? `item-${item.quality}` : '';

        div.innerHTML = `
            <div class="shop-item-info">
                <div class="shop-item-name ${qualityClass}">${name} ${this.getItemIcon(name)}</div>
                <div class="shop-item-desc">${item.description}</div>
                ${statsText ? `<div class="shop-item-stats">${statsText}</div>` : ''}
                <div class="shop-item-price">💰 ${item.price} 金币</div>
            </div>
            <button class="shop-buy-btn" onclick="game.buyItem('${name}')">购买</button>
        `;

        return div;
    }

    getItemStatsText(item) {
        const stats = [];
        if (item.attack) stats.push(`攻击+${item.attack}`);
        if (item.defense) stats.push(`防御+${item.defense}`);
        if (item.agility) stats.push(`敏捷+${item.agility}`);
        if (item.mp) stats.push(`魔法+${item.mp}`);
        if (item.effect === 'heal') stats.push(`恢复生命+${item.value}`);
        if (item.effect === 'mana') stats.push(`恢复魔法+${item.value}`);
        return stats.join(' | ');
    }

    buyItem(itemName) {
        const char = this.gameState.character;
        const item = this.items[itemName];

        if (!item) return;

        if (char.gold < item.price) {
            this.showMessage('金币不足！', 'error');
            return;
        }

        if (!this.addItemToInventory(itemName)) {
            return; // 背包已满
        }

        char.gold -= item.price;
        this.showMessage(`购买了 ${itemName}！花费${item.price}金币`, 'success');
        this.updateUI();
    }

    // 商店刷新系统
    checkShopReset() {
        const char = this.gameState.character;
        if (!char) return;

        const today = new Date().toDateString();
        if (char.lastShopResetDate !== today) {
            char.shopRefreshCount = 0;
            char.lastShopResetDate = today;
            this.showMessage('商店已重置，刷新次数清零！', 'success');
        }
    }

    getRefreshCost() {
        const char = this.gameState.character;
        // 按次数递增：第一次100金币，之后每次增加50%
        return Math.floor(100 * Math.pow(1.5, char.shopRefreshCount));
    }

    addRefreshButton(tab) {
        const container = document.getElementById(`${tab}-shop-list`);
        const char = this.gameState.character;

        // 移除旧的刷新按钮
        const oldRefreshBtn = container.querySelector('.shop-refresh-btn');
        if (oldRefreshBtn) {
            oldRefreshBtn.remove();
        }

        const refreshCost = this.getRefreshCost();
        const refreshBtn = document.createElement('div');
        refreshBtn.className = 'shop-refresh-btn';
        refreshBtn.style.cssText = `
            grid-column: 1 / -1;
            text-align: center;
            margin: 20px 0;
            padding: 15px;
            background: rgba(255, 215, 0, 0.1);
            border: 2px solid #ffd700;
            border-radius: 8px;
            cursor: pointer;
            transition: all 0.3s ease;
        `;

        refreshBtn.innerHTML = `
            <h4 style="color: #ffd700; margin-bottom: 10px;">🔄 刷新商店</h4>
            <p style="color: #add8e6; margin-bottom: 10px;">今日已刷新：${char.shopRefreshCount}次</p>
            <p style="color: #f39c12; font-weight: bold;">费用：${refreshCost} 金币</p>
        `;

        refreshBtn.onmouseover = () => {
            refreshBtn.style.background = 'rgba(255, 215, 0, 0.2)';
        };

        refreshBtn.onmouseout = () => {
            refreshBtn.style.background = 'rgba(255, 215, 0, 0.1)';
        };

        refreshBtn.onclick = () => {
            this.refreshShop(tab);
        };

        container.appendChild(refreshBtn);
    }

    refreshShop(tab) {
        const char = this.gameState.character;
        const cost = this.getRefreshCost();

        if (char.gold < cost) {
            this.showMessage('金币不足，无法刷新商店！', 'error');
            return;
        }

        char.gold -= cost;
        char.shopRefreshCount++;

        this.showMessage(`商店已刷新！花费${cost}金币`, 'success');

        // 重新加载商品
        if (tab === 'equipment') {
            this.loadEquipmentShop();
        } else {
            this.loadItemsShop();
        }

        // 更新刷新按钮
        this.addRefreshButton(tab);
        this.updateUI();
    }

    // 技能系统
    updateSkills() {
        const char = this.gameState.character;
        if (!char) return;

        // 确保技能对象和技能点存在
        if (!char.skills) {
            char.skills = {};
        }
        if (typeof char.skillPoints !== 'number') {
            char.skillPoints = 1;
        }

        const container = document.getElementById('skills-list');
        container.innerHTML = `
            <div style="grid-column: 1 / -1; text-align: center; margin-bottom: 20px; color: #ffd700; padding: 15px; background: rgba(0,0,0,0.3); border-radius: 8px;">
                <h4>技能点：${char.skillPoints || 0}</h4>
                <p style="color: #add8e6; margin-top: 10px; font-size: 0.9em;">点击下方按钮学习或升级技能</p>
            </div>
        `;

        const classSkills = this.skills[char.class];
        if (!classSkills || Object.keys(classSkills).length === 0) {
            container.innerHTML += `<div style="grid-column: 1 / -1; text-align: center; color: #ff6b6b; padding: 20px; background: rgba(139, 0, 0, 0.2); border-radius: 8px; border: 1px solid #ff6b6b;">
                该职业暂无可用技能<br>
                <small style="color: #add8e6; margin-top: 10px; display: block;">职业：${char.class} | 技能数据：${JSON.stringify(this.skills)}</small>
            </div>`;
            return;
        }

        console.log('技能数据:', classSkills); // 调试信息

        Object.entries(classSkills).forEach(([skillName, skillData]) => {
            const skillItem = this.createSkillItem(skillName, skillData);
            container.appendChild(skillItem);
        });
    }

    createSkillItem(skillName, skillData) {
        const char = this.gameState.character;
        const div = document.createElement('div');

        const isLearned = char.skills[skillName];
        const canLearn = this.canLearnSkill(skillName, skillData);
        const isAvailable = !isLearned && canLearn && (skillData.cost === 0 || char.skillPoints >= skillData.cost);

        let statusClass = 'locked';
        if (isLearned) statusClass = 'learned';
        else if (isAvailable) statusClass = 'available';

        div.className = `skill-item ${statusClass}`;

        const requirementsText = this.getSkillRequirementsText(skillData);
        const currentLevel = isLearned ? char.skills[skillName] : 0;

        div.innerHTML = `
            <h4>${skillName} ${isLearned ? `(等级 ${currentLevel})` : ''}</h4>
            <p>${skillData.description}</p>
            <p class="skill-cost">消耗魔法：${skillData.mpCost}</p>
            ${skillData.cost > 0 ? `<p class="skill-cost">学习费用：${skillData.cost} 技能点</p>` : '<p class="skill-cost">基础技能，免费学习</p>'}
            ${requirementsText ? `<p class="skill-requirements">要求：${requirementsText}</p>` : ''}
            ${!isLearned ?
                (canLearn ?
                    `<button class="skill-learn-btn" onclick="game.learnSkill('${skillName}')" 
                     ${skillData.cost > 0 && char.skillPoints < skillData.cost ? 'disabled' : ''}>学习技能</button>` :
                    '<div style="color: #ff6b6b;">✗ 不满足要求</div>') :
                '<div style="color: #2ecc71;">✓ 已学会</div>'}
        `;

        return div;
    }

    canLearnSkill(skillName, skillData) {
        const char = this.gameState.character;
        const req = skillData.requirements;

        // 检查等级要求
        if (req.level && char.level < req.level) return false;

        // 检查前置技能
        if (req.skill && !char.skills[req.skill]) return false;

        return true;
    }

    getSkillRequirementsText(skillData) {
        const req = skillData.requirements;
        const requirements = [];

        if (req.level) requirements.push(`等级 ${req.level}`);
        if (req.skill) requirements.push(`技能: ${req.skill}`);

        return requirements.join(', ');
    }

    learnSkill(skillName) {
        const char = this.gameState.character;
        const skillData = this.skills[char.class][skillName];

        if (!this.canLearnSkill(skillName, skillData)) {
            this.showMessage('不满足学习要求！', 'error');
            return;
        }

        // 检查技能点（免费技能cost为0不需要技能点）
        if (skillData.cost > 0 && char.skillPoints < skillData.cost) {
            this.showMessage('技能点不足！', 'error');
            return;
        }

        // 消耗技能点（只有非免费技能才消耗）
        if (skillData.cost > 0) {
            char.skillPoints -= skillData.cost;
        }
        char.skills[skillName] = 1;

        this.showMessage(`学会了技能：${skillName}！`, 'success');
        this.updateSkills();
        this.updateUI();
    }

    // 技能攻击系统
    showSkillsForBattle() {
        if (!this.gameState.inBattle) return;

        const char = this.gameState.character;
        const learnedSkills = Object.keys(char.skills);

        if (learnedSkills.length === 0) {
            this.showMessage('你还没有学会任何技能！', 'error');
            return;
        }

        // 简单实现：使用第一个已学技能
        const firstSkill = learnedSkills[0];
        this.useSkill(firstSkill);
    }

    useSkill(skillName) {
        if (!this.gameState.inBattle) return;

        const char = this.gameState.character;
        const enemy = this.gameState.currentEnemy;
        const skillData = this.skills[char.class][skillName];

        if (!skillData || !char.skills[skillName]) {
            this.showMessage('你还没有学会这个技能！', 'error');
            return;
        }

        if (char.mp < skillData.mpCost) {
            this.showMessage('魔法值不足！', 'error');
            return;
        }

        char.mp -= skillData.mpCost;

        if (skillData.effect === 'defense') {
            // 防御技能
            this.addBattleLog(`你使用了${skillName}！提高了防御力！`);
            // 这里可以添加临时状态的逻辑
        } else {
            // 攻击技能
            let totalDamage = 0;
            const hits = skillData.hits || 1;

            for (let i = 0; i < hits; i++) {
                const baseDamage = char.attack * skillData.damage;
                const damage = Math.max(1, Math.floor(baseDamage - enemy.defense + Math.random() * 5));
                totalDamage += damage;
                enemy.currentHp = Math.max(0, enemy.currentHp - damage);

                if (hits > 1) {
                    this.addBattleLog(`${skillName}第${i + 1}击，造成${damage}点伤害`);
                }
            }

            if (hits === 1) {
                this.addBattleLog(`你使用了${skillName}，造成${totalDamage}点伤害`);
            } else {
                this.addBattleLog(`${skillName}总共造成${totalDamage}点伤害`);
            }
        }

        if (enemy.currentHp <= 0) {
            this.winBattle();
        } else {
            this.enemyAttack();
        }

        this.updateBattleUI();
        this.updateUI();
    }

    // 挂机系统
    toggleAfkMode() {
        const char = this.gameState.character;
        if (!char) return;

        if (char.isAfkMode) {
            this.stopAfkMode();
        } else {
            this.startAfkMode();
        }
    }

    startAfkMode() {
        const char = this.gameState.character;
        char.isAfkMode = true;
        char.afkStartTime = Date.now();
        char.afkExp = 0;
        char.afkGold = 0;

        document.getElementById('toggle-afk').textContent = '停止挂机';
        document.getElementById('toggle-afk').style.background = 'linear-gradient(45deg, #e74c3c, #c0392b)';
        document.getElementById('afk-status').style.display = 'block';

        this.showMessage('开始挂机，自动获得经验和金币！', 'success');

        // 启动挂机循环
        this.afkInterval = setInterval(() => {
            this.processAfk();
        }, 1000); // 每秒1次

        this.updateAfkDisplay();
    }

    stopAfkMode() {
        const char = this.gameState.character;
        char.isAfkMode = false;

        if (this.afkInterval) {
            clearInterval(this.afkInterval);
            this.afkInterval = null;
        }

        document.getElementById('toggle-afk').textContent = '开始挂机';
        document.getElementById('toggle-afk').style.background = 'linear-gradient(45deg, #3498db, #2980b9)';
        document.getElementById('afk-status').style.display = 'none';

        const totalExp = char.afkExp || 0;
        const totalGold = char.afkGold || 0;

        if (totalExp > 0 || totalGold > 0) {
            this.showMessage(`挂机结束！总共获得${totalExp}经验值和${totalGold}金币`, 'success');
        } else {
            this.showMessage('挂机结束！', 'important');
        }

        char.afkStartTime = null;
        char.afkExp = 0;
        char.afkGold = 0;
    }

    processAfk() {
        const char = this.gameState.character;
        if (!char.isAfkMode) return;

        // 每秒获得随机经验和金币（基于等级和地点）
        const location = this.locations[this.gameState.currentLocation];
        const baseExpPerSecond = location.level * 2;
        const baseGoldPerSecond = location.level * 1;

        const expGain = Math.floor(Math.random() * baseExpPerSecond) + 1;
        const goldGain = Math.floor(Math.random() * baseGoldPerSecond) + 1;

        char.exp += expGain;
        char.gold += goldGain;
        char.afkExp += expGain;
        char.afkGold += goldGain;

        // 检查升级
        if (char.exp >= char.expToNext) {
            this.levelUp();
        }

        // 小概率获得物品（0.1%每秒）
        if (Math.random() < 0.001) {
            const monsters = location.monsters;
            const randomMonster = monsters[Math.floor(Math.random() * monsters.length)];
            const drops = this.monsters[randomMonster].drops;

            if (drops && drops.common && drops.common.length > 0) {
                const dropItem = drops.common[Math.floor(Math.random() * drops.common.length)];
                if (this.addItemToInventory(dropItem)) {
                    this.showMessage(`挂机中获得物品：${dropItem}`, 'success');
                }
            }
        }

        this.updateAfkDisplay();
        this.updateUI();
    }

    updateAfkDisplay() {
        const char = this.gameState.character;
        if (!char.isAfkMode || !char.afkStartTime) return;

        const elapsed = Date.now() - char.afkStartTime;
        const hours = Math.floor(elapsed / 3600000);
        const minutes = Math.floor((elapsed % 3600000) / 60000);
        const seconds = Math.floor((elapsed % 60000) / 1000);

        const timeStr = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

        document.getElementById('afk-timer').textContent = `挂机时间：${timeStr}`;
        document.getElementById('afk-progress').textContent = `获得经验：${char.afkExp || 0} | 获得金币：${char.afkGold || 0}`;
    }

    // 初始化时检查挂机状态
    checkAfkStatus() {
        const char = this.gameState.character;
        if (char && char.isAfkMode && char.afkStartTime) {
            // 恢复挂机状态
            this.startAfkMode();
        }
    }
}

// 为了支持onclick事件，将游戏实例设为全局变量
let game;

// 游戏启动
document.addEventListener('DOMContentLoaded', () => {
    game = new TextLegendGame();
});