// ====================================
// MYSTIC REALMS: PUZZLE KEEPER v2.2
// FIXED VERSION - COMPLETE & WORKING
// ====================================

class Game {
    constructor() {
        // ========== STATE (se salvează) ==========
        this.state = {
            energy: 0,
            energyCap: 3000,
            mana: 0,
            manaCap: 300,
            crystals: 0,
            gems: 10,
            coins: 0,
            energyPerSecond: 0,
            manaPerSecond: 0,
            lastTick: Date.now(),
            lastSave: Date.now(),
            lastDailyReward: 0,
            totalPlayTime: 0,
            ascensionLevel: 0,
            ascensionPoints: 0,
            lifetimeEnergy: 0,
            
            structures: {
    monastery: { level: 0, resource: 'energy' },
    farm: { level: 0, resource: 'energy' },
    laboratory: { level: 0, resource: 'energy' },
    tower: { level: 0, resource: 'energy' },
    portal: { level: 0, resource: 'energy' },
    shrine: { level: 0, resource: 'mana' },
    altar: { level: 0, resource: 'mana' }
},
            
            volcanoStructures: {
                lava_forge: { level: 0, baseProduction: 3, baseCost: 700, costMultiplier: 1.15, resource: 'volcanic_energy' },
                magma_extractor: { level: 0, baseProduction: 15, baseCost: 3500, costMultiplier: 1.15, resource: 'volcanic_energy' },
                fire_temple: { level: 0, baseProduction: 60, baseCost: 14000, costMultiplier: 1.15, resource: 'volcanic_energy' },
                inferno_reactor: { level: 0, baseProduction: 300, baseCost: 70000, costMultiplier: 1.15, resource: 'volcanic_energy' },
                phoenix_nest: { level: 0, baseProduction: 1200, baseCost: 350000, costMultiplier: 1.15, resource: 'volcanic_energy' }
            },
            
            currentRealm: 'forest',
            volcanicEnergy: 0,
            volcanicEnergyCap: 5000,
            volcanicEnergyPerSecond: 0,
            volcanoUnlocked: false,
            
            upgrades: {
    energyBoost: { level: 0 },
    autoCollect: { level: 0 },
    offlineBonus: { level: 0 },
    gemFinder: { level: 0 },
    energyCap: { level: 0 },
    manaCap: { level: 0 }
},
            
            guardians: [],
            activeQuests: [],
            weeklyQuest: null,
            lastQuestRefresh: 0,
            lastWeeklyRefresh: 0,
            completedQuestsToday: 0,
            dailyQuestLimit: 5,
            totalQuestsCompleted: 0,
            
            achievements: {},
            bosses: {},
            currentBoss: null,
            bossHP: 0,
            
            autoFeatures: {
                autoBuyStructures: { enabled: false, unlocked: false, cost: 500 },
                autoClaimQuests: { enabled: false, unlocked: false, cost: 300 },
                autoCollectOffline: { enabled: true, unlocked: true, cost: 0 },
                autoPuzzle: { enabled: false, unlocked: false, cost: 1000 }
            },
            autoBuyThreshold: 0.8,
            
            settings: {
                theme: 'dark',
                soundEnabled: true,
                musicEnabled: true,
                notificationsEnabled: true,
                particleQuality: 'high',
                autoSaveEnabled: true,
                showFPS: false
            },
            
            statistics: {
                totalEnergyGenerated: 0,
                totalManaGenerated: 0,
                totalVolcanicEnergyGenerated: 0,
                totalGemsEarned: 0,
                totalGemsSpent: 0,
                totalCrystalsEarned: 0,
                totalStructuresBought: 0,
                totalUpgradesBought: 0,
                totalGuardiansUnlocked: 0,
                totalQuestsCompleted: 0,
                totalPuzzlesCompleted: 0,
                totalBossesDefeated: 0,
                totalAchievementsUnlocked: 0,
                highestEnergyPerSecond: 0,
                fastestPuzzleTime: Infinity,
                longestSession: 0,
                totalClicks: 0,
                favoriteStructure: '',
                mostPowerfulGuardian: null,
                firstPlayDate: Date.now(),
                sessionsPlayed: 0,
                energyHistory: [],
                sessionHistory: []
            },
            
            shop: {
                lastDailyDealRefresh: 0,
                purchaseHistory: [],
                vipActive: false,
                vipExpiry: 0,
                totalSpent: 0,
                adsWatchedToday: 0,
                lastAdResetDate: 0,
                limitedOffers: [],
                specialBundles: []
            },
            
            puzzleStats: {
                totalCompleted: 0,
                highScore: 0,
                gemsEarned: 0
            }
        };
        
        // ========== CONFIG (nu se salvează) ==========
        this.config = {
            saveInterval: 10000,
            tickRate: 100,
            maxOfflineTime: 43200000, // 12 hours
            puzzleGemReward: 5,
            questRefreshTime: 3600000,
            ascensionRequirement: 100000,
            ascensionScaleFactor: 8
        };
        
        // ========== DEFINITIONS (template-uri fixe) ==========
        
        this.structureData = {
    monastery: { 
        name: 'Mănăstire Mistică', 
        icon: '🏛️', 
        description: 'Călugării generează energie spirituală',
        baseProduction: 0.3,
        baseCost: 15,
        costMultiplier: 1.30,
        resource: 'energy'
    },
    farm: { 
        name: 'Fermă Magică', 
        icon: '🌾', 
        description: 'Recoltele enchanted generează putere',
        baseProduction: 0.8,
        baseCost: 70,
        costMultiplier: 1.30,
        resource: 'energy'
    },
    laboratory: { 
        name: 'Laborator Alchemic', 
        icon: '⚗️', 
        description: 'Experimente magice amplifică energia',
        baseProduction: 3.5,
        baseCost: 280,
        costMultiplier: 1.30,
        resource: 'energy'
    },
    tower: { 
        name: 'Turn Arcanic', 
        icon: '🗼', 
        description: 'Magii puternici invocă energie cosmică',
        baseProduction: 12,
        baseCost: 1100,
        costMultiplier: 1.30,
        resource: 'energy'
    },
    portal: { 
        name: 'Portal Interdimensional', 
        icon: '🌀', 
        description: 'Energie din alte dimensiuni',
        baseProduction: 50,
        baseCost: 4200,
        costMultiplier: 1.30,
        resource: 'energy'
    },
    shrine: { 
        name: 'Sanctuar Mistic', 
        icon: '⛩️', 
        description: 'Loc sacru cu putere divină',
        baseProduction: 0.5,
        baseCost: 550,
        costMultiplier: 1.35,
        resource: 'mana'
    },
    altar: { 
        name: 'Altar Arcanic', 
        icon: '🔮', 
        description: 'Ritualuri mistice generează putere',
        baseProduction: 1.5,
        baseCost: 2000,
        costMultiplier: 1.35,
        resource: 'mana'
    }
};
        
        this.upgradeData = {
    energyBoost: { 
        name: 'Amplificator Energetic', 
        icon: '⚡', 
        description: '+25% energie per secundă',
        maxLevel: 10,
        multiplier: 1.25,
        baseCost: 75,
        costResource: 'energy'
    },
    autoCollect: { 
        name: 'Colectare Automată', 
        icon: '🤖', 
        description: '+50% productie offline per nivel',
        maxLevel: 5,
        multiplier: 1.5,
        baseCost: 300,
        costResource: 'energy'
    },
    offlineBonus: { 
        name: 'Bonus Offline', 
        icon: '⏰', 
        description: '+40% timp offline maxim',
        maxLevel: 5,
        multiplier: 1.4,
        baseCost: 225,
        costResource: 'energy'
    },
    gemFinder: { 
        name: 'Detector de Gemuri', 
        icon: '💎', 
        description: '+20% șansă gemuri din puzzle',
        maxLevel: 10,
        multiplier: 1.2,
        baseCost: 150,
        costResource: 'energy'
    },
    energyCap: { 
        name: 'Depozit Energie', 
        icon: '🔋', 
        description: '+50% capacitate de energie',
        maxLevel: 20,
        multiplier: 1.5,
        baseCost: 150,
        costResource: 'energy'
    },
    manaCap: { 
        name: 'Depozit Mana', 
        icon: '💙', 
        description: '+50% capacitate de mana',
        maxLevel: 20,
        multiplier: 1.5,
        baseCost: 150,
        costResource: 'mana'
    }
};
        
        this.guardianTemplates = [
    { name: 'Sylvan', icon: '🧙‍♂️', rarity: 'common', bonus: 1.04 },
    { name: 'Lyra', icon: '🧙‍♀️', rarity: 'common', bonus: 1.05 },
    { name: 'Thorin', icon: '⚔️', rarity: 'rare', bonus: 1.10 },
    { name: 'Aria', icon: '🏹', rarity: 'rare', bonus: 1.12 },
    { name: 'Zephyr', icon: '🌪️', rarity: 'epic', bonus: 1.20 },
    { name: 'Phoenix', icon: '🔥', rarity: 'epic', bonus: 1.25 },
    { name: 'Celestia', icon: '✨', rarity: 'legendary', bonus: 1.40 },
    { name: 'Omega', icon: '⭐', rarity: 'legendary', bonus: 1.50 }
];
        
        this.questTemplates = [
            { id: 'collect_energy', name: 'Colector Energetic', icon: '⚡', description: 'Colectează {amount} energie', type: 'collect', resource: 'energy', amountBase: 2000, reward: { type: 'gems', amount: 15 } },
            { id: 'collect_mana', name: 'Adunător de Mana', icon: '💙', description: 'Colectează {amount} mană', type: 'collect', resource: 'mana', amountBase: 500, reward: { type: 'gems', amount: 20 } },
            { id: 'buy_structures', name: 'Constructor', icon: '🏗️', description: 'Cumpără {amount} structuri', type: 'buy', target: 'structures', amountBase: 25, reward: { type: 'mana', amount: 50 } },
            { id: 'complete_puzzles', name: 'Maestru Puzzle', icon: '🧩', description: 'Completează {amount} puzzle-uri', type: 'complete', target: 'puzzles', amountBase: 10, reward: { type: 'gems', amount: 25 } },
            { id: 'upgrade_buildings', name: 'Inginer', icon: '⚙️', description: 'Îmbunătățește {amount} ori', type: 'upgrade', target: 'any', amountBase: 30, reward: { type: 'gems', amount: 15 } },
            { id: 'defeat_boss', name: 'Vanător de Boss', icon: '🐉', description: 'Înfrângi {amount} boss-uri', type: 'defeat', target: 'bosses', amountBase: 3, reward: { type: 'gems', amount: 50, bonus: { crystals: 5 } } },
            { id: 'collect_crystals', name: 'Miner de Cristale', icon: '💠', description: 'Colectează {amount} cristale', type: 'collect', resource: 'crystals', amountBase: 10, reward: { type: 'gems', amount: 30 } },
            { id: 'total_clicks', name: 'Mâini Iuți', icon: '👆', description: 'Click {amount} ori', type: 'click', target: 'any', amountBase: 500, reward: { type: 'gems', amount: 10 } }
        ];
        
        this.weeklyQuestTemplates = [
            { id: 'weekly_energy', name: 'Provocarea Săptămânii', icon: '🌟', description: 'Colectează {amount} energie în 7 zile', type: 'collect', resource: 'energy', amountBase: 500000, reward: { type: 'gems', amount: 200, bonus: { crystals: 25 } } },
            { id: 'weekly_puzzles', name: 'Maraton Puzzle', icon: '🧩', description: 'Completează {amount} puzzle-uri în 7 zile', type: 'complete', target: 'puzzles', amountBase: 50, reward: { type: 'gems', amount: 250, bonus: { crystals: 30 } } },
            { id: 'weekly_bosses', name: 'Campanie Eroică', icon: '⚔️', description: 'Înfrângi {amount} boss-uri în 7 zile', type: 'defeat', target: 'bosses', amountBase: 15, reward: { type: 'gems', amount: 300, bonus: { crystals: 40 } } },
            { id: 'weekly_crystals', name: 'Extracție Totală', icon: '💠', description: 'Colectează {amount} cristale în 7 zile', type: 'collect', resource: 'crystals', amountBase: 75, reward: { type: 'gems', amount: 200, bonus: { crystals: 50 } } },
            { id: 'weekly_clicks', name: 'Degete de Foc', icon: '🔥', description: 'Click {amount} ori în 7 zile', type: 'click', target: 'any', amountBase: 5000, reward: { type: 'gems', amount: 150, bonus: { crystals: 20 } } }
        ];
        
        // ⭐ BOSS DEFINITIONS (ADAUGĂ AICI)
        this.bossDefinitions = [
            {
                id: 'forest_guardian',
                name: 'Guardian al Pădurii',
                icon: '🌳',
                realm: 'forest',
                hp: 15,
                difficulty: 1,
                puzzleConfig: {
                    gridSize: 8,
                    movesStart: 18,
                    targetScore: 800,
                    colors: ['🔴', '🔵', '🟢', '🟡', '🟣', '🟠']
                },
                unlockRequirement: { puzzlesCompleted: 5 },
                rewards: {
                    gems: 100,
                    crystals: 5,
                    energy: 5000,
                    guaranteedGuardian: 'rare'
                }
            },
            {
                id: 'desert_sphinx',
                name: 'Sfinxul Deșertului',
                icon: '🏜️',
                realm: 'desert',
                hp: 30,
                difficulty: 2,
                puzzleConfig: {
                    gridSize: 9,
                    movesStart: 15,
                    targetScore: 1200,
                    colors: ['🔴', '🔵', '🟢', '🟡', '🟣', '🟠', '🟤']
                },
                unlockRequirement: { puzzlesCompleted: 15 },
                rewards: {
                    gems: 200,
                    crystals: 10,
                    energy: 12000,
                    guaranteedGuardian: 'epic'
                }
            },
            {
                id: 'ocean_kraken',
                name: 'Kraken-ul Adâncurilor',
                icon: '🌊',
                realm: 'ocean',
                hp: 50,
                difficulty: 3,
                puzzleConfig: {
                    gridSize: 9,
                    movesStart: 12,
                    targetScore: 1800,
                    colors: ['🔴', '🔵', '🟢', '🟡', '🟣', '🟠']
                },
                unlockRequirement: { puzzlesCompleted: 30 },
                rewards: {
                    gems: 400,
                    crystals: 20,
                    energy: 25000,
                    guaranteedGuardian: 'epic'
                }
            },
            {
                id: 'volcano_dragon',
                name: 'Dragonul de Foc',
                icon: '🔥',
                realm: 'volcano',
                hp: 70,
                difficulty: 4,
                puzzleConfig: {
                    gridSize: 9,
                    movesStart: 10,
                    targetScore: 2500,
                    colors: ['🔴', '🟠', '🟡', '🟣', '⚫']
                },
                unlockRequirement: { puzzlesCompleted: 50 },
                rewards: {
                    gems: 600,
                    crystals: 35,
                    energy: 50000,
                    guaranteedGuardian: 'legendary'
                }
            },
            {
                id: 'shadow_lord',
                name: 'Lordul Umbrelor',
                icon: '👹',
                realm: 'shadow',
                hp: 100,
                difficulty: 5,
                puzzleConfig: {
                    gridSize: 10,
                    movesStart: 8,
                    targetScore: 3500,
                    colors: ['⚫', '🟣', '🔵', '🔴']
                },
                unlockRequirement: { puzzlesCompleted: 100 },
                rewards: {
                    gems: 1000,
                    crystals: 80,
                    energy: 120000,
                    guaranteedGuardian: 'legendary',
                    specialReward: 'Boss Slayer Title'
                }
            }
        ];
        
        // ⭐ REALM DEFINITIONS
        this.realmDefinitions = {
            forest: {
                name: 'Tărâmul Pădurii',
                icon: '🌿',
                theme: 'green',
                unlocked: true,
                description: 'Tărâmul de început, plin de energie naturală'
            },
            volcano: {
                name: 'Tărâmul Vulcanului',
                icon: '🌋',
                theme: 'red',
                unlockCost: { crystals: 50 },
                unlocked: false,
                description: 'Tărâm fierbinte cu producție multiplicată x5'
            }
        };
        
        // ⭐ VOLCANO STRUCTURES DATA
        this.volcanoStructureData = {
            lava_forge: { 
                baseProduction: 3, 
                baseCost: 700, 
                costMultiplier: 1.15, 
                resource: 'volcanic_energy',
                icon: '⚒️',
                name: 'Forjă de Lavă',
                description: 'Topește pietre în energie pură'
            },
            magma_extractor: { 
                baseProduction: 15, 
                baseCost: 3500, 
                costMultiplier: 1.15, 
                resource: 'volcanic_energy',
                icon: '🏭',
                name: 'Extractor de Magmă',
                description: 'Extrage esență din adâncuri'
            },
            fire_temple: { 
                baseProduction: 60, 
                baseCost: 14000, 
                costMultiplier: 1.15, 
                resource: 'volcanic_energy',
                icon: '⛩️',
                name: 'Templu de Foc',
                description: 'Sanctuar al flamelor veșnice'
            },
            inferno_reactor: { 
                baseProduction: 300, 
                baseCost: 70000, 
                costMultiplier: 1.15, 
                resource: 'volcanic_energy',
                icon: '⚛️',
                name: 'Reactor Infernal',
                description: 'Fuziune nucleară vulcanică'
            },
            phoenix_nest: { 
                baseProduction: 1200, 
                baseCost: 350000, 
                costMultiplier: 1.15, 
                resource: 'volcanic_energy',
                icon: '🔥',
                name: 'Cuib de Phoenix',
                description: 'Regenerare infinită de energie'
            }
        };
        
        // ⭐ FIRE GUARDIANS
        this.fireGuardianTemplates = [
            { name: 'Ignis', icon: '🔥', rarity: 'rare', bonus: 1.15, realm: 'volcano' },
            { name: 'Blaze', icon: '💥', rarity: 'rare', bonus: 1.18, realm: 'volcano' },
            { name: 'Inferno', icon: '🌪️', rarity: 'epic', bonus: 1.25, realm: 'volcano' },
            { name: 'Pyro', icon: '⚡', rarity: 'epic', bonus: 1.30, realm: 'volcano' },
            { name: 'Ragnarok', icon: '🌋', rarity: 'legendary', bonus: 1.60, realm: 'volcano' }
        ];
        
        // ⭐ SHOP CONFIG
        this.shopConfig = {
            maxAdsPerDay: 10,
            adCooldown: 180000,
            dailyDealDuration: 86400000,
            vipMonthlyPrice: 4.99,
            vipBenefits: {
                productionBonus: 2,
                offlineBonus: 2,
                dailyGems: 100,
                noAdCooldown: true,
                exclusiveSkins: true
            }
        };
        
        // ⭐ IAP PACKAGES
        this.iapPackages = [
            { id: 'starter_pack', name: 'Starter Pack', icon: '🎁', price: 0.99, currency: 'USD', gems: 500, bonus: { energy: 1000 }, tag: 'BEST VALUE', popular: false, discount: 0 },
            { id: 'growth_bundle', name: 'Growth Bundle', icon: '📦', price: 4.99, currency: 'USD', gems: 2500, bonus: { energy: 10000, guardian: 'rare' }, tag: 'POPULAR', popular: true, discount: 0 },
            { id: 'mega_pack', name: 'Mega Pack', icon: '🎉', price: 19.99, currency: 'USD', gems: 15000, bonus: { energy: 50000, crystals: 10, guardian: 'epic' }, tag: 'MEGA VALUE', popular: false, discount: 25 },
            { id: 'legendary_bundle', name: 'Legendary Bundle', icon: '⭐', price: 49.99, currency: 'USD', gems: 50000, bonus: { energy: 200000, crystals: 50, guardian: 'legendary' }, tag: 'ULTIMATE', popular: false, discount: 30 },
            { id: 'small_gems', name: 'Handful of Gems', icon: '💎', price: 1.99, currency: 'USD', gems: 1000, bonus: {}, tag: null, popular: false, discount: 0 },
            { id: 'medium_gems', name: 'Bag of Gems', icon: '💎', price: 9.99, currency: 'USD', gems: 6000, bonus: {}, tag: '20% BONUS', popular: false, discount: 0 }
        ];
        
        this.puzzle = null;
        this.init();
    }

    initAchievements() {
    this.achievementDefinitions = {
        // === PROGRES ===
        first_structure: { 
            name: 'Primul Pas', 
            icon: '🏛️', 
            category: 'progres',
            description: 'Cumpără prima structură', 
            condition: () => Object.values(this.state.structures).some(s => s.level > 0),
            reward: { gems: 5 }
        },
        energy_1k: { 
            name: 'Acumulator I', 
            icon: '⚡', 
            category: 'progres',
            description: 'Generează 1,000 energie lifetime', 
            condition: () => this.state.lifetimeEnergy >= 1000,
            reward: { gems: 10 }
        },
        energy_10k: { 
            name: 'Acumulator II', 
            icon: '⚡', 
            category: 'progres',
            description: 'Generează 10,000 energie lifetime', 
            condition: () => this.state.lifetimeEnergy >= 10000,
            reward: { gems: 25 }
        },
        energy_100k: { 
            name: 'Acumulator III', 
            icon: '⚡', 
            category: 'progres',
            description: 'Generează 100,000 energie lifetime', 
            condition: () => this.state.lifetimeEnergy >= 100000,
            reward: { gems: 50, crystals: 1 }
        },
        energy_1m: { 
            name: 'Acumulator IV', 
            icon: '⚡', 
            category: 'progres',
            description: 'Generează 1,000,000 energie lifetime', 
            condition: () => this.state.lifetimeEnergy >= 1000000,
            reward: { gems: 200, crystals: 5 }
        },
        structure_master: { 
            name: 'Arhitect', 
            icon: '🏗️', 
            category: 'progres',
            description: 'Ai 3 structuri la nivel 10+', 
            condition: () => Object.values(this.state.structures).filter(s => s.level >= 10).length >= 3,
            reward: { gems: 35, crystals: 1 }
        },
        structure_legendar: { 
            name: 'Maestru Arhitect', 
            icon: '🏗️', 
            category: 'progres',
            description: 'Ai o structură la nivel 50', 
            condition: () => Object.values(this.state.structures).some(s => s.level >= 50),
            reward: { gems: 150, crystals: 3 }
        },
        first_ascension: { 
            name: 'Ascensiune', 
            icon: '🌟', 
            category: 'progres',
            description: 'Fă prima ascensiune', 
            condition: () => this.state.ascensionLevel > 0,
            reward: { gems: 50 }
        },
        ascension_master: { 
            name: 'Maestru Ascensiunii', 
            icon: '🌟', 
            category: 'progres',
            description: 'Ajunge la nivel 5 de ascensiune', 
            condition: () => this.state.ascensionLevel >= 5,
            reward: { gems: 500, crystals: 20 }
        },

        // === PUZZLE ===
        puzzle_master: { 
            name: 'Maestru Puzzle', 
            icon: '🧩', 
            category: 'puzzle',
            description: 'Completează 10 puzzle-uri', 
            condition: () => this.state.puzzleStats.totalCompleted >= 10,
            reward: { gems: 20 }
        },
        puzzle_veteran: { 
            name: 'Veteran Puzzle', 
            icon: '🧩', 
            category: 'puzzle',
            description: 'Completează 50 puzzle-uri', 
            condition: () => this.state.puzzleStats.totalCompleted >= 50,
            reward: { gems: 75, crystals: 3 }
        },
        puzzle_legend: { 
            name: 'Legenda Puzzle-urilor', 
            icon: '🧩', 
            category: 'puzzle',
            description: 'Completează 200 puzzle-uri', 
            condition: () => this.state.puzzleStats.totalCompleted >= 200,
            reward: { gems: 300, crystals: 10 }
        },
        high_scorer: { 
            name: 'Scor Înalt', 
            icon: '🎯', 
            category: 'puzzle',
            description: 'Obține un scor de 1000 într-un puzzle', 
            condition: () => this.state.puzzleStats.highScore >= 1000,
            reward: { gems: 50 }
        },
        boss_slayer: { 
            name: 'Slayer de Boss-uri', 
            icon: '🐉', 
            category: 'puzzle',
            description: 'Înfrângi 3 boss-uri', 
            condition: () => {
                const defeated = Object.values(this.state.bosses).filter(b => b.defeated).length;
                return defeated >= 3;
            },
            reward: { gems: 200, crystals: 5 }
        },
        boss_master: { 
            name: 'Domnitorul', 
            icon: '🐉', 
            category: 'puzzle',
            description: 'Înfrângi toți boss-ii', 
            condition: () => {
                const defeated = Object.values(this.state.bosses).filter(b => b.defeated).length;
                return defeated >= 5;
            },
            reward: { gems: 1000, crystals: 30 }
        },

        // === COLECȚIE ===
        first_guardian: { 
            name: 'Invocator', 
            icon: '👥', 
            category: 'colectie',
            description: 'Invocă primul guardian', 
            condition: () => this.state.guardians.length > 0,
            reward: { gems: 10 }
        },
        collector: { 
            name: 'Colecționar', 
            icon: '👥', 
            category: 'colectie',
            description: 'Obține 5 gardieni', 
            condition: () => this.state.guardians.length >= 5,
            reward: { gems: 30 }
        },
        guardian_army: { 
            name: 'Armata', 
            icon: '👥', 
            category: 'colectie',
            description: 'Obține 15 gardieni', 
            condition: () => this.state.guardians.length >= 15,
            reward: { gems: 150, crystals: 5 }
        },
        legendary_pull: { 
            name: 'Norocos', 
            icon: '⭐', 
            category: 'colectie',
            description: 'Invocă un guardian legendar', 
            condition: () => this.state.guardians.some(g => g.rarity === 'legendary'),
            reward: { gems: 100, crystals: 2 }
        },
        epic_collector: { 
            name: 'Colecționar Epic', 
            icon: '💜', 
            category: 'colectie',
            description: 'Obține 5 gardieni epic', 
            condition: () => this.state.guardians.filter(g => g.rarity === 'epic').length >= 5,
            reward: { gems: 250, crystals: 10 }
        },
        gem_hoarder: { 
            name: 'Hoarder', 
            icon: '💎', 
            category: 'colectie',
            description: 'Acumulează 5000 gemuri', 
            condition: () => this.state.gems >= 5000,
            reward: { gems: 500, crystals: 5 }
        },

        // === TIMP ===
        quest_completionist: { 
            name: 'Completionist', 
            icon: '📜', 
            category: 'timp',
            description: 'Completează 20 quest-uri', 
            condition: () => this.state.totalQuestsCompleted >= 20,
            reward: { gems: 40 }
        },
        quest_master: { 
            name: 'Maestru Quest-uri', 
            icon: '📜', 
            category: 'timp',
            description: 'Completează 100 quest-uri', 
            condition: () => this.state.totalQuestsCompleted >= 100,
            reward: { gems: 200, crystals: 5 }
        },
        click_master: { 
            name: 'Maestrul Click-ului', 
            icon: '🖱️', 
            category: 'timp',
            description: 'Fă 5000 click-uri', 
            condition: () => this.state.statistics.totalClicks >= 5000,
            reward: { gems: 50 }
        },
        click_legend: { 
            name: 'Legenda Click-ului', 
            icon: '🖱️', 
            category: 'timp',
            description: 'Fă 50,000 click-uri', 
            condition: () => this.state.statistics.totalClicks >= 50000,
            reward: { gems: 300, crystals: 5 }
        },
        session_1h: { 
            name: 'Jucător Dedicat', 
            icon: '⏰', 
            category: 'timp',
            description: 'Joacă 10 sesiuni', 
            condition: () => this.state.statistics.sessionsPlayed >= 10,
            reward: { gems: 25 }
        },
        veteran_player: { 
            name: 'Veteran', 
            icon: '⏰', 
            category: 'timp',
            description: 'Joacă 50 de sesiuni', 
            condition: () => this.state.statistics.sessionsPlayed >= 50,
            reward: { gems: 200, crystals: 5 }
        },

        // === SPECIALE ===
        rich: { 
            name: 'Bogat', 
            icon: '💎', 
            category: 'speciale',
            description: 'Acumulează 500 gemuri', 
            condition: () => this.state.gems >= 500,
            reward: { gems: 100 }
        },
        combo_king: { 
            name: 'Regele Combo', 
            icon: '🔥', 
            category: 'speciale',
            description: 'Rezolvă un puzzle în mai puțin de 30 secunde', 
            condition: () => this.state.statistics.fastestPuzzleTime < 30,
            reward: { gems: 75 }
        },
        daily_streak_7: { 
            name: 'Jucător Zilnic', 
            icon: '🔥', 
            category: 'speciale',
            description: 'Revino 7 zile consecutive', 
            condition: () => this.state.dailyRewards && this.state.dailyRewards.currentStreak >= 7,
            reward: { gems: 300, crystals: 10 }
        }
    };
    
    if (!this.state.achievements) {
        this.state.achievements = {};
    }
    
    for (let key in this.achievementDefinitions) {
        if (!this.state.achievements[key]) {
            this.state.achievements[key] = { unlocked: false, claimed: false };
        }
    }
    
    if (this.state.totalQuestsCompleted === undefined) {
        this.state.totalQuestsCompleted = 0;
    }
}

initBosses() {
    // Initialize boss state
    for (let boss of this.bossDefinitions) {
        if (!this.state.bosses[boss.id]) {
            this.state.bosses[boss.id] = {
                unlocked: false,
                defeated: false,
                attempts: 0,
                bestScore: 0
            };
        }
    }
}

unlockVolcano() {
    const cost = this.realmDefinitions.volcano.unlockCost.crystals;
    
    if (this.state.crystals < cost) {
        this.showToast(`❌ Necesari ${cost} cristale!`, 'error');
        return;
    }
    
    if (this.state.volcanoUnlocked) {
        this.showToast('⚠️ Volcano deja deblocat!', 'warning');
        return;
    }
    
    this.state.crystals -= cost;
    this.state.volcanoUnlocked = true;
    this.realmDefinitions.volcano.unlocked = true;
    
    // Show unlock animation
    this.showRealmUnlock('volcano');
    
    this.updateUI();
    this.saveGame();
}

switchRealm(realmId) {
    if (realmId === 'volcano' && !this.state.volcanoUnlocked) {
        this.showToast('🔒 Volcano locked! Need 50 crystals', 'error');
        return;
    }
    
    this.state.currentRealm = realmId;
    this.renderCurrentRealm();
    this.showToast(`🌍 Switched to ${this.realmDefinitions[realmId].name}`, 'success');
    this.saveGame();
}

renderCurrentRealm() {
    // Update header theme
    const header = document.getElementById('game-header');
    const realm = this.realmDefinitions[this.state.currentRealm];
    
    if (realm.theme === 'red') {
        header.style.background = 'linear-gradient(135deg, #7f1d1d 0%, #991b1b 100%)';
    } else {
        header.style.background = ''; // Reset to default
    }
    
    // Render appropriate structures
    if (this.state.currentRealm === 'volcano') {
        this.renderVolcanoStructures();
    } else {
        this.renderStructures();
    }
}

renderVolcanoStructures() {
    const container = document.querySelector('.structures-grid');
    container.innerHTML = '';
    
    for (let [key, structure] of Object.entries(this.state.volcanoStructures)) {
        const data = this.volcanoStructureData[key];
        const cost = this.getVolcanoStructureCost(key);
        const production = this.getVolcanoStructureProduction(key);
        const canAfford = this.state.volcanicEnergy >= cost;
        
        const milestone = this.getMilestoneInfo(structure.level);
        const milestoneText = structure.level >= 25 ? 
            `<div class="structure-milestone">🎯 ${milestone.current} ${milestone.next ? '→ ' + milestone.bonus + ' la nivelul ' + milestone.next : 'MAX!'}</div>` : '';
        
        const card = document.createElement('div');
        card.className = `structure-card volcano-structure ${canAfford ? 'can-afford' : ''}`;
        card.dataset.structure = key;
        card.innerHTML = `
            <div class="structure-header">
                <span class="structure-icon">${data.icon}</span>
                <span class="structure-level">Nivel ${structure.level}</span>
            </div>
            <h3 class="structure-name">${data.name}</h3>
            <p class="structure-description">${data.description}</p>
            <div class="structure-production">
                ${production > 0 ? `+${this.formatNumber(production)}/s 🌋` : 'Necumpărat'}
            </div>
            ${milestoneText}
            <div class="structure-cost">
                <span class="cost-item ${canAfford ? '' : 'cant-afford'}">
                    ⚡ ${this.formatNumber(cost)}
                </span>
            </div>
            <button class="buy-btn volcano-btn" ${canAfford ? '' : 'disabled'} onclick="game.buyVolcanoStructure('${key}')">
                ${structure.level === 0 ? 'Cumpără' : 'Îmbunătățește'}
            </button>
        `;
        
        container.appendChild(card);
    }
}

getVolcanoStructureCost(structureKey) {
    const structure = this.state.volcanoStructures[structureKey];
    const data = this.volcanoStructureData[structureKey];
    return Math.floor(data.baseCost * Math.pow(data.costMultiplier, structure.level));
}

getVolcanoStructureProduction(structureKey) {
    const structure = this.state.volcanoStructures[structureKey];
    const data = this.volcanoStructureData[structureKey];
    const base = data.baseProduction * structure.level;
    return base * this.getMilestoneMultiplier(structure.level);
}

buyVolcanoStructure(structureKey) {
    const cost = this.getVolcanoStructureCost(structureKey);
    
    if (this.state.volcanicEnergy >= cost) {
        soundManager.playPurchase();
        
        this.state.volcanicEnergy -= cost;
        this.state.volcanoStructures[structureKey].level++;
        
        this.state.statistics.totalStructuresBought++;
        this.state.statistics.totalClicks++;
        this.updateQuestProgress('click', 'any', 1);
        this.updateFavoriteStructure(structureKey);
        
        this.calculateVolcanicEnergyPerSecond();
        this.renderVolcanoStructures();
        this.updateUI();
        
        this.updateQuestProgress('buy', 'structures', 1);
        this.updateQuestProgress('upgrade', 'any', 1);
        
        // FIX: Check if event exists
        let x = window.innerWidth / 2;
        let y = window.innerHeight / 2;
        
        if (typeof event !== 'undefined' && event && event.target) {
            const btn = event.target;
            const rect = btn.getBoundingClientRect();
            x = rect.left + rect.width / 2;
            y = rect.top + rect.height / 2;
        }
        
        particleSystem.burst(x, y, 15, this.volcanoStructureData[structureKey].icon);
        particleSystem.floatingNumber(x, y - 30, `+${this.formatNumber(this.getVolcanoStructureProduction(structureKey))}/s`, '#ff4500');
        
        this.showToast(`✅ ${this.volcanoStructureData[structureKey].name} îmbunătățit!`, 'success');
        this.saveGame();
    } else {
        soundManager.playError();
        particleSystem.screenShake(300, 5);
        this.showToast('❌ Energie vulcanică insuficientă!', 'error');
    }
}

calculateVolcanicEnergyPerSecond() {
    let volcanicTotal = 0;
    
    for (let [key, structure] of Object.entries(this.state.volcanoStructures)) {
        if (structure.level > 0) {
            const data = this.volcanoStructureData[key];
            volcanicTotal += data.baseProduction * structure.level;
        }
    }
    
    // Energy Boost
    const energyBoostLevel = this.state.upgrades.energyBoost.level;
    if (energyBoostLevel > 0) {
        const multiplier = Math.pow(this.upgradeData.energyBoost.multiplier, energyBoostLevel);
        volcanicTotal *= multiplier;
    }
    
    // Guardians (MULTIPLICATIVE)
    let guardianMultiplier = 1;
    for (let guardian of this.state.guardians) {
        guardianMultiplier *= guardian.bonus;
    }
    volcanicTotal *= guardianMultiplier;
    
    // Ascension
    if (this.state.ascensionLevel > 0) {
        volcanicTotal *= (1 + this.state.ascensionLevel * 0.1);
    }
    
    this.state.volcanicEnergyPerSecond = volcanicTotal;
}

showRealmUnlock(realmId) {
    const realm = this.realmDefinitions[realmId];
    
    const modal = document.createElement('div');
    modal.className = 'realm-unlock-modal';
    modal.innerHTML = `
        <div class="realm-unlock-content">
            <div class="realm-unlock-icon">${realm.icon}</div>
            <h2>🎉 REALM UNLOCKED!</h2>
            <h3>${realm.name}</h3>
            <p>${realm.description}</p>
            <button onclick="this.parentElement.parentElement.remove(); game.switchRealm('${realmId}')">
                Explorează Acum! 🔥
            </button>
        </div>
    `;
    
    document.body.appendChild(modal);
}


// ==================== TUTORIAL SYSTEM V2 ====================

initTutorial() {
    const tutorialCompleted = localStorage.getItem('tutorialCompleted');
    
    if (!tutorialCompleted) {
        this.tutorialLang = 'ro';
        
        const isVeteran = this.state.statistics.totalStructuresBought > 5 || 
                         this.state.puzzleStats.totalCompleted > 3 ||
                         this.state.guardians.length > 1;
        
        if (isVeteran) {
            console.log('🎓 Veteran player detected, skipping tutorial');
            localStorage.setItem('tutorialCompleted', 'true');
            return;
        }
        
        setTimeout(() => this.showTutorialPrompt(), 2000);
    }
}

showTutorialPrompt() {
    const modal = document.createElement('div');
    modal.id = 'tutorial-prompt';
    modal.className = 'tutorial-prompt-modal';
    modal.innerHTML = `
        <div class="tutorial-prompt-card">
            <div class="tutorial-prompt-icon">🎓</div>
            <h2>Bine ai venit în Mystic Realms!</h2>
            <p>Ești nou aici? Îți recomandăm tutorialul pentru a învăța bazele jocului.</p>
            <div class="tutorial-prompt-features">
                <div class="tutorial-prompt-feature">🏛️ Construiește structuri</div>
                <div class="tutorial-prompt-feature">✨ Invocă gardieni</div>
                <div class="tutorial-prompt-feature">🏆 Deblochează realizări</div>
            </div>
            <div class="tutorial-prompt-buttons">
                <button class="tutorial-prompt-btn tutorial-prompt-yes" onclick="game.acceptTutorial()">
                    Da, vreau tutorial!
                </button>
                <button class="tutorial-prompt-btn tutorial-prompt-no" onclick="game.skipTutorialPrompt()">
                    Nu, mulțumesc
                </button>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
}

acceptTutorial() {
    const modal = document.getElementById('tutorial-prompt');
    if (modal) modal.remove();
    
    const checkAndStart = (attempts = 0) => {
        const firstStructureBtn = document.querySelector('.structure-card:first-child .buy-btn');
        
        if (firstStructureBtn) {
            this.startTutorial();
        } else if (attempts < 10) {
            setTimeout(() => checkAndStart(attempts + 1), 300);
        } else {
            this.renderStructures();
            setTimeout(() => this.startTutorial(), 500);
        }
    };
    
    setTimeout(() => checkAndStart(), 100);
}

skipTutorialPrompt() {
    const modal = document.getElementById('tutorial-prompt');
    if (modal) modal.remove();
    
    localStorage.setItem('tutorialCompleted', 'true');
    
    if (this.state.energy < 100) {
        this.state.energy = 100;
        this.showToast('🎁 +100 ⚡ Energie de start!', 'info');
        this.updateUI();
    }
}

tutorialSteps = [
    // Pas 1: Bun venit
    {
        target: null,
        title: "🎮 Bine ai venit!",
        text: "Bine ai venit în <strong>Mystic Realms</strong>! Voi fi ghidul tău. Îți voi arăta cum să construiești, să câștigi și să devii puternic. Gata să începem?",
        button: "Hai să începem!",
        position: 'center',
        onComplete: () => {
            if (this.state.energy < 500) {
                this.state.energy = 500;
                this.showToast('🎁 +500 ⚡ Energie pentru tutorial!', 'info');
                this.updateUI();
            }
        }
    },
    
    // Pas 2: Cumpără prima structură
    {
        target: '.structure-card:first-child .buy-btn',
        title: "🏛️ Construiește Structuri",
        text: "Apasă aici pentru a cumpăra prima ta structură! <strong>Mănăstirea</strong> costă doar 20 energie și va genera energie automat.",
        button: "Am cumpărat!",
        condition: () => Object.values(this.state.structures).some(s => s.level > 0),
        highlight: true
    },
    
    // Pas 3: Explică producția
    {
        target: '.structure-card:first-child',
        title: "⚡ Producție Automată",
        text: "Perfect! Acum vezi <strong>+X/s ⚡</strong>? Aceasta este producția ta automată. Energia crește singură în timp!",
        button: "Am înțeles!",
        highlight: true
    },
    
    // Pas 4: Gardieni
    {
        target: 'button[onclick*="summonGuardian"]',
        title: "✨ Invocă Primul Guardian",
        text: "Costă 100 gemuri. <strong>Primești bonus tutorial!</strong> Încearcă-ți norocul - poate prinzi unul legendar!",
        button: "Am invocat!",
        condition: () => this.state.guardians.length > 0,
        highlight: true,
        skipToTab: 'guardians',
        onStart: () => {
            if (this.state.gems < 100) {
                const needed = 100 - this.state.gems;
                this.state.gems = 100;
                this.trackReward('gems', needed);
                this.showToast(`🎁 Bonus tutorial: +${needed} 💎`, 'info');
                this.updateUI();
            }
        }
    },
    
    // Pas 5: Achievements
    {
        target: '.tab-btn[data-tab="achievements"]',
        title: "🏆 Achievements",
        text: "Aici vezi toate realizările tale! Fiecare achievement îți oferă recompense valoroase. Revino des să le verifici!",
        button: "Super!",
        highlight: true,
        skipToTab: 'achievements'
    },
    
    // Pas 6: Final
    {
        target: null,
        title: "🎉 Gata! Ești pregătit!",
        text: "Ai terminat tutorialul! Acum știi să:<br>• Construiești structuri<br>• Invoci gardieni<br>• Deblochezi achievements<br><br><strong>Recompensa ta: 500 💎 Gemuri!</strong>",
        button: "Începe aventura! 🚀",
        position: 'center'
    }
];

startTutorial() {
    this.tutorialActive = true;
    this.tutorialCurrentStep = 0;
    
    if (this.state.energy < 50) {
        this.state.energy = 50;
        this.updateUI();
    }
    
    document.getElementById('tutorial-system').style.display = 'block';
    soundManager.playNotification();
    
    this.showTutorialStep();
}

// În game.js, modifică showTutorialStep():

showTutorialStep() {
    const step = this.tutorialSteps[this.tutorialCurrentStep];
    
    this.renderStructures();
    
    // Update tooltip content
    document.querySelector('.tutorial-step-number').textContent = 
        `Pas ${this.tutorialCurrentStep + 1}/${this.tutorialSteps.length}`;
    document.getElementById('tutorial-tooltip-title').textContent = step.title;
    document.getElementById('tutorial-tooltip-text').innerHTML = step.text;
    document.getElementById('tutorial-tooltip-btn').textContent = step.button;
    
    const btn = document.getElementById('tutorial-tooltip-btn');
    if (step.condition && !step.condition()) {
        btn.disabled = true;
        this.waitForCondition(step.condition);
    } else {
        btn.disabled = false;
    }
    
    setTimeout(() => {
        if (step.skipToTab) {
            this.switchTab(step.skipToTab);
        }
        
        if (step.onStart) {
            step.onStart();
        }
        
        if (step.target) {
            const targetEl = document.querySelector(step.target);
            if (!targetEl) {
                this.centerTooltip();
                this.hideSpotlight();
            } else {
                this.positionTooltip(step.target, step.position || 'auto');
                this.showSpotlight(step.target);
            }
        } else {
            this.centerTooltip();
            this.hideSpotlight();
        }
    }, 150);
}

positionTooltip(targetSelector, position) {
    const tooltip = document.getElementById('tutorial-tooltip');
    const arrow = tooltip.querySelector('.tutorial-arrow');
    const target = document.querySelector(targetSelector);
    
    if (!target) {
        this.centerTooltip();
        return;
    }
    
    const rect = target.getBoundingClientRect();
    
    // ⚠️ Așteaptă ca tooltip-ul să aibă dimensiuni (poate fi hidden inițial)
    tooltip.style.display = 'block';
    setTimeout(() => {
        const tooltipRect = tooltip.getBoundingClientRect();
        
        // Remove old arrow classes
        arrow.className = 'tutorial-arrow';
        arrow.style.display = 'block';
        
        // Auto-position logic
        let finalPosition = position;
        
        if (position === 'auto') {
            const spaceAbove = rect.top;
            const spaceBelow = window.innerHeight - rect.bottom;
            const spaceLeft = rect.left;
            const spaceRight = window.innerWidth - rect.right;
            
            const maxSpace = Math.max(spaceAbove, spaceBelow, spaceLeft, spaceRight);
            
            if (maxSpace === spaceBelow && spaceBelow > 200) finalPosition = 'bottom';
            else if (maxSpace === spaceAbove && spaceAbove > 200) finalPosition = 'top';
            else if (maxSpace === spaceRight && spaceRight > 350) finalPosition = 'right';
            else if (maxSpace === spaceLeft && spaceLeft > 350) finalPosition = 'left';
            else finalPosition = 'bottom'; // Default
        }
        
        // Position calculations
        let top, left;
        
        switch (finalPosition) {
            case 'bottom':
                top = rect.bottom + 20;
                left = Math.max(10, Math.min(
                    rect.left + rect.width / 2 - tooltipRect.width / 2,
                    window.innerWidth - tooltipRect.width - 10
                ));
                arrow.classList.add('arrow-top');
                break;
            case 'top':
                top = rect.top - tooltipRect.height - 20;
                left = Math.max(10, Math.min(
                    rect.left + rect.width / 2 - tooltipRect.width / 2,
                    window.innerWidth - tooltipRect.width - 10
                ));
                arrow.classList.add('arrow-bottom');
                break;
            case 'right':
                top = Math.max(10, Math.min(
                    rect.top + rect.height / 2 - tooltipRect.height / 2,
                    window.innerHeight - tooltipRect.height - 10
                ));
                left = rect.right + 20;
                arrow.classList.add('arrow-left');
                break;
            case 'left':
                top = Math.max(10, Math.min(
                    rect.top + rect.height / 2 - tooltipRect.height / 2,
                    window.innerHeight - tooltipRect.height - 10
                ));
                left = rect.left - tooltipRect.width - 20;
                arrow.classList.add('arrow-right');
                break;
            default:
                this.centerTooltip();
                return;
        }
        
        tooltip.style.top = top + 'px';
        tooltip.style.left = left + 'px';
        tooltip.style.transform = 'none';
    }, 50);
}

centerTooltip() {
    const tooltip = document.getElementById('tutorial-tooltip');
    tooltip.style.top = '50%';
    tooltip.style.left = '50%';
    tooltip.style.transform = 'translate(-50%, -50%)';
    
    const arrow = tooltip.querySelector('.tutorial-arrow');
    arrow.className = 'tutorial-arrow';
    arrow.style.display = 'none';
}

// În game.js, modifică showSpotlight():

showSpotlight(targetSelector) {
    const spotlight = document.getElementById('tutorial-spotlight');
    const target = document.querySelector(targetSelector);
    
    if (!target) {
        this.hideSpotlight();
        return;
    }
    
    // Funcție pentru update poziție
    const updatePosition = () => {
        if (!this.tutorialActive) return;
        
        const rect = target.getBoundingClientRect();
        spotlight.style.top = (rect.top - 8) + 'px';
        spotlight.style.left = (rect.left - 8) + 'px';
        spotlight.style.width = (rect.width + 16) + 'px';
        spotlight.style.height = (rect.height + 16) + 'px';
    };
    
    spotlight.style.display = 'block';
    updatePosition();
    
    // Make target clickable
    target.style.position = 'relative';
    target.style.zIndex = '30004';
    target.style.pointerEvents = 'all';
    
    // ⭐ UPDATE continuu (pentru elemente care se mișcă/resize)
    if (this.spotlightInterval) {
        clearInterval(this.spotlightInterval);
    }
    
    this.spotlightInterval = setInterval(updatePosition, 100);
}

hideSpotlight() {
    document.getElementById('tutorial-spotlight').style.display = 'none';
    
    // ⭐ Oprește tracking-ul
    if (this.spotlightInterval) {
        clearInterval(this.spotlightInterval);
        this.spotlightInterval = null;
    }
}

closeTutorial() {
    document.getElementById('tutorial-system').style.display = 'none';
    this.tutorialActive = false;
    
    // ⭐ Cleanup interval
    if (this.spotlightInterval) {
        clearInterval(this.spotlightInterval);
        this.spotlightInterval = null;
    }
    
    // Reset z-index
    document.querySelectorAll('[style*="z-index: 30004"]').forEach(el => {
        el.style.zIndex = '';
    });
}

// În waitForCondition(), adaugă mai mult feedback:

waitForCondition(condition) {
    const step = this.tutorialSteps[this.tutorialCurrentStep];
    
    console.log(`🎓 Waiting for condition at step ${this.tutorialCurrentStep + 1}`);
    
    const checkInterval = setInterval(() => {
        if (condition()) {
            console.log(`✅ Condition met at step ${this.tutorialCurrentStep + 1}!`);
            clearInterval(checkInterval);
            
            if (step.onComplete) {
                step.onComplete();
            }
            
            const btn = document.getElementById('tutorial-tooltip-btn');
            btn.disabled = false;
            
            soundManager.playSuccess();
        }
    }, 300);
    
    setTimeout(() => {
        console.warn(`⏱️ Timeout at step ${this.tutorialCurrentStep + 1}`);
        clearInterval(checkInterval);
    }, 180000);
}

tutorialNext() {
    const step = this.tutorialSteps[this.tutorialCurrentStep];
    
    console.log(`🎓 Advancing from step ${this.tutorialCurrentStep + 1}`);
    
    // Dacă e ultimul pas
    if (step.isLast || this.tutorialCurrentStep >= this.tutorialSteps.length - 1) {
        console.log(`🎉 Tutorial complete!`);
        this.completeTutorial();
        return;
    }
    
    // Next step
    this.tutorialCurrentStep++;
    soundManager.playClick();
    this.showTutorialStep();
}

skipTutorial() {
    const modal = document.createElement('div');
    modal.className = 'confirm-modal';
    modal.innerHTML = `
        <div class="confirm-content">
            <h2>⚠️ Sari peste tutorial?</h2>
            <p>Vei pierde recompensa de <strong>500 💎 gemuri</strong>!</p>
            <p>Ești sigur că vrei să sari?</p>
            <div class="confirm-buttons">
                <button class="cancel-btn" onclick="this.closest('.confirm-modal').remove()">Înapoi</button>
                <button class="confirm-btn danger-btn" id="skip-tutorial-confirm">Da, sare</button>
            </div>
        </div>
    `;
    document.body.appendChild(modal);

    document.getElementById('skip-tutorial-confirm').addEventListener('click', () => {
        modal.remove();
        this.closeTutorial();
        soundManager.playError();
        localStorage.setItem('tutorialCompleted', 'true');
        
        if (this.state.energy < 100) {
            this.state.energy = 100;
            this.showToast('🎁 +100 ⚡ Energie de start!', 'info');
            this.updateUI();
        }
        
        setTimeout(() => this.checkDailyRewards(), 500);
    });
}

completeTutorial() {
    console.log('🎉 completeTutorial() called');
    
    const completions = parseInt(localStorage.getItem('tutorialCompletions') || '0');
    const isFirstTime = completions === 0;
    
    console.log('Is first time:', isFirstTime, '| Completions:', completions);
    
    if (isFirstTime) {
        this.state.gems += 500;
        this.trackReward('gems', 500);
        
        document.getElementById('tutorial-tooltip-title').textContent = '🎉 Felicitări!';
        document.getElementById('tutorial-tooltip-text').innerHTML = 
            '<strong>Tutorial completat!</strong><br><br>✅ Ai primit <strong>+500 💎 Gemuri</strong>!<br><br>Acum poți explora jocul liber. Mult succes!';
        document.getElementById('tutorial-tooltip-btn').textContent = 'Începe aventura! 🚀';
        
        this.hideSpotlight();
        this.centerTooltip();
        
        soundManager.playFanfare();
        particleSystem.burst(window.innerWidth / 2, window.innerHeight / 2, 100, '💎');
        
        setTimeout(() => {
            this.closeTutorial();
            this.showToast('🎉 +500 💎 Gemuri primite!', 'success');
            
            // Arată Daily Rewards după tutorial
            setTimeout(() => {
                this.checkDailyRewards();
            }, 1000);
        }, 5000);
    } else {
        document.getElementById('tutorial-tooltip-title').textContent = '📚 Tutorial Revăzut';
        document.getElementById('tutorial-tooltip-text').innerHTML = 
            'Ai revăzut tutorialul!<br><br>ℹ️ Recompensele se primesc doar la prima completare.';
        document.getElementById('tutorial-tooltip-btn').textContent = 'Închide';
        
        soundManager.playSuccess();
        
        setTimeout(() => {
            this.closeTutorial();
            this.showToast('📚 Tutorial revăzut (fără recompensă)', 'info');
        }, 3000);
    }
    
    localStorage.setItem('tutorialCompletions', (completions + 1).toString());
    localStorage.setItem('tutorialCompleted', 'true');
    
    this.updateUI();
    this.saveGame();
}

replayTutorial() {
    localStorage.removeItem('tutorialCompleted');
    this.startTutorial();
    soundManager.playClick();
}

    // ==================== DAILY REWARDS SYSTEM ====================
    
    initDailyRewards() {
        if (!this.state.dailyRewards) {
            this.state.dailyRewards = {
                currentStreak: 0,
                lastClaimDate: null,
                totalClaimed: 0
            };
        }
        
        this.checkDailyRewards();
    }
    
    dailyRewardsConfig = [
        { day: 1, gems: 50, energy: 100, crystals: 0, guardian: null },
        { day: 2, gems: 100, energy: 400, crystals: 0, guardian: null },
        { day: 3, gems: 150, energy: 300, crystals: 1, guardian: null },
        { day: 4, gems: 200, energy: 800, crystals: 1, guardian: null },
        { day: 5, gems: 300, energy: 600, crystals: 2, guardian: 'rare' },
        { day: 6, gems: 400, energy: 1000, crystals: 2, guardian: null },
        { day: 7, gems: 500, energy: 1500, crystals: 5, guardian: 'epic' }
    ];
    
    checkDailyRewards() {
    const now = Date.now();
    const lastClaim = this.state.dailyRewards.lastClaimDate;
    
    // NU afișa daily rewards dacă tutorialul e activ SAU necompletat
    const tutorialCompleted = localStorage.getItem('tutorialCompleted');
    if (this.tutorialActive || !tutorialCompleted) {
        console.log('🎓 Tutorial active/incomplete - daily rewards delayed');
        return;
    }
    
    if (!lastClaim) {
        setTimeout(() => this.showDailyRewards(), 3000);
        return;
    }
    
    const timeSince = now - lastClaim;
    const oneDay = 24 * 60 * 60 * 1000;
    const twoDays = 48 * 60 * 60 * 1000;
    
    if (timeSince > twoDays) {
        this.state.dailyRewards.currentStreak = 0;
    }
    
    if (timeSince >= oneDay) {
        setTimeout(() => this.showDailyRewards(), 2000);
    }
}
    
    showDailyRewards() {
    const modal = document.getElementById('daily-rewards-modal');
    modal.classList.add('active');
    this.renderDailyRewards();
    soundManager.playNotification();
}
    
    renderDailyRewards() {
        const streak = this.state.dailyRewards.currentStreak;
        const now = Date.now();
        const lastClaim = this.state.dailyRewards.lastClaimDate;
        const canClaim = !lastClaim || (now - lastClaim >= 24 * 60 * 60 * 1000);
        
        document.getElementById('streak-days').textContent = streak;
        
        const grid = document.getElementById('daily-rewards-grid');
        grid.innerHTML = '';
        
        this.dailyRewardsConfig.forEach((reward, index) => {
            const dayNum = index + 1;
            const isClaimed = dayNum <= streak;
            const isToday = canClaim && dayNum === streak + 1;
            const isLocked = dayNum > streak + 1;
            
            let bgColor = 'rgba(255,255,255,0.05)';
            let borderColor = 'rgba(255,255,255,0.1)';
            
            if (isClaimed) {
                bgColor = 'rgba(76,175,80,0.2)';
                borderColor = 'rgba(76,175,80,0.5)';
            } else if (isToday) {
                bgColor = 'rgba(255,215,0,0.2)';
                borderColor = '#FFD700';
            }
            
            const item = document.createElement('div');
            item.style.cssText = `background:${bgColor}; border:2px solid ${borderColor}; border-radius:12px; padding:12px 8px; text-align:center; opacity:${isLocked ? '0.4' : '1'}; position:relative;${isToday ? 'box-shadow:0 0 20px rgba(255,215,0,0.5);' : ''}`;
            
            let rewardText = '';
            if (reward.gems > 0) rewardText += `${reward.gems} 💎<br>`;
            if (reward.energy > 0) rewardText += `${reward.energy} ⚡<br>`;
            if (reward.crystals > 0) rewardText += `${reward.crystals} 💠<br>`;
            if (reward.guardian) rewardText += `Guardian<br>${reward.guardian}`;
            
            item.innerHTML = `<div style="font-size:11px; font-weight:bold; color:#FFD700; margin-bottom:5px;">Ziua ${dayNum}</div><div style="font-size:28px; margin:8px 0;">${reward.gems > 0 ? '💎' : (reward.guardian ? '👥' : '💠')}</div><div style="font-size:13px; font-weight:bold; color:white;">${rewardText}</div>${isClaimed ? '<div style="position:absolute; top:5px; right:5px; background:#4CAF50; border-radius:50%; width:20px; height:20px; display:flex; align-items:center; justify-content:center; font-size:12px;">✓</div>' : ''}`;
            
            grid.appendChild(item);
        });
        
        const claimBtn = document.getElementById('claim-daily-btn');
        if (canClaim && streak < 7) {
            claimBtn.disabled = false;
            claimBtn.textContent = `🎁 Revendică Ziua ${streak + 1}`;
            claimBtn.style.background = 'linear-gradient(135deg, #FFD700, #FFA500)';
            claimBtn.style.cursor = 'pointer';
        } else if (streak >= 7) {
            claimBtn.disabled = true;
            claimBtn.textContent = '🏆 Toate recompensele revendicate!';
            claimBtn.style.background = '#555';
            claimBtn.style.cursor = 'not-allowed';
        } else {
            claimBtn.disabled = true;
            const hoursLeft = Math.ceil((24 * 60 * 60 * 1000 - (now - lastClaim)) / (60 * 60 * 1000));
            claimBtn.textContent = `⏰ Revino în ${hoursLeft}h`;
            claimBtn.style.background = '#555';
            claimBtn.style.cursor = 'not-allowed';
        }
    }
    
    claimDailyReward() {
        const streak = this.state.dailyRewards.currentStreak;
        const now = Date.now();
        const lastClaim = this.state.dailyRewards.lastClaimDate;
        
        // Check cooldown
        if (lastClaim && (now - lastClaim < 24 * 60 * 60 * 1000)) {
            const hoursLeft = Math.ceil((24 * 60 * 60 * 1000 - (now - lastClaim)) / (60 * 60 * 1000));
            this.showToast(`⏰ Trebuie să aștepți ${hoursLeft}h!`, 'warning');
            return;
        }
        
        if (streak >= 7) {
            this.showToast('⚠️ Toate recompensele au fost deja revendicate!', 'warning');
            return;
        }
        
        const reward = this.dailyRewardsConfig[streak];
        
        if (reward.gems > 0) { this.state.gems += reward.gems; this.trackReward('gems', reward.gems); }
        if (reward.energy > 0) this.state.energy += reward.energy;
        if (reward.crystals > 0) { this.state.crystals += reward.crystals; this.trackReward('crystals', reward.crystals); }
        
        if (reward.guardian) {
            const rarity = reward.guardian;
            const available = this.guardianTemplates.filter(g => g.rarity === rarity);
            if (available.length > 0) {
                const template = available[Math.floor(Math.random() * available.length)];
                this.state.guardians.push({ ...template });
                this.calculateEnergyPerSecond();
                this.renderGuardians();
            }
        }
        
        this.state.dailyRewards.currentStreak++;
        this.state.dailyRewards.lastClaimDate = Date.now();
        this.state.dailyRewards.totalClaimed++;
        
        this.updateUI();
        this.saveGame();
        
        this.showClaimedAnimation(reward);
        
        setTimeout(() => {
            this.closeDailyRewards();
        }, 4000);
    }
    
    showClaimedAnimation(reward) {
        const overlay = document.getElementById('daily-reward-claimed');
        const title = document.getElementById('claimed-title');
        const rewardsContainer = document.getElementById('claimed-rewards');
        
        const dayNum = this.state.dailyRewards.currentStreak;
        title.textContent = `🎉 Ziua ${dayNum} Revendicată!`;
        
        rewardsContainer.innerHTML = '';
        
        if (reward.gems > 0) {
            const item = document.createElement('div');
            item.style.cssText = 'background:rgba(255,215,0,0.2); border:2px solid rgba(255,215,0,0.5); border-radius:12px; padding:15px 25px; font-size:24px; font-weight:bold; display:flex; align-items:center; gap:10px;';
            item.innerHTML = `<span>💎</span> <span>+${reward.gems}</span>`;
            rewardsContainer.appendChild(item);
        }
        
        if (reward.energy > 0) {
            const item = document.createElement('div');
            item.style.cssText = 'background:rgba(255,215,0,0.2); border:2px solid rgba(255,215,0,0.5); border-radius:12px; padding:15px 25px; font-size:24px; font-weight:bold; display:flex; align-items:center; gap:10px;';
            item.innerHTML = `<span>⚡</span> <span>+${reward.energy}</span>`;
            rewardsContainer.appendChild(item);
        }
        
        if (reward.crystals > 0) {
            const item = document.createElement('div');
            item.style.cssText = 'background:rgba(255,215,0,0.2); border:2px solid rgba(255,215,0,0.5); border-radius:12px; padding:15px 25px; font-size:24px; font-weight:bold; display:flex; align-items:center; gap:10px;';
            item.innerHTML = `<span>💠</span> <span>+${reward.crystals}</span>`;
            rewardsContainer.appendChild(item);
        }
        
        if (reward.guardian) {
            const item = document.createElement('div');
            item.style.cssText = 'background:rgba(255,215,0,0.2); border:2px solid rgba(255,215,0,0.5); border-radius:12px; padding:15px 25px; font-size:20px; font-weight:bold; display:flex; align-items:center; gap:10px;';
            item.innerHTML = `<span>👥</span> <span>${this.getRarityName(reward.guardian)} Guardian</span>`;
            rewardsContainer.appendChild(item);
        }
        
        overlay.style.display = 'flex';
        soundManager.playFanfare();
        
        setTimeout(() => {
            particleSystem.burst(window.innerWidth / 2, window.innerHeight / 2, 150, '🎁');
        }, 300);
        
        setTimeout(() => {
            overlay.style.display = 'none';
        }, 3500);
    }
    
    closeDailyRewards() {
    const modal = document.getElementById('daily-rewards-modal');
    modal.classList.remove('active');
    soundManager.playClick();
}
    
    init() {
    console.log('🎮 Initializing Mystic Realms v2.2...');
    
    this.loadGame();
    this.initAchievements();
    
    // ⭐ CALCULEAZĂ ENERGIA ÎNAINTE DE OFFLINE PROGRESS
    this.calculateEnergyPerSecond();
    this.calculateResourceCaps();
    
    this.calculateOfflineProgress();  // ← Acum energyPerSecond e deja setat
    this.initBosses();
    this.initShop();
    this.initUI();
    this.startGameLoop();
    this.startAutoSave();
    
    this.puzzle = new PuzzleGame(this);
    
    if (this.state.activeQuests.length === 0) {
        this.generateQuests();
    }
    
    this.checkDailyQuestRefresh();
    this.checkWeeklyQuestRefresh();
    
    this.checkAchievements();
    this.checkBossUnlocks();
    this.initTutorial();
    this.initDailyRewards();
    
    soundManager.enabled = this.state.settings.soundEnabled;
    soundManager.musicEnabled = this.state.settings.musicEnabled;
    
    console.log('✅ Game initialized successfully!');
}
    
    initUI() {
        document.querySelectorAll('.tab-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const tabName = e.target.dataset.tab;
                this.switchTab(tabName);
            });
        });
        
        this.renderStructures();
        this.renderUpgrades();
        this.renderGuardians();
        this.renderQuests();
        this.renderAchievements();

        this.renderBosses();
        this.renderAutoSettings();
        this.updateUI();
        this.updateRealmSelector();

        this.updateAchievementBadge();
    }
    
    switchTab(tabName) {
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    document.querySelector(`[data-tab="${tabName}"]`).classList.add('active');
    
    document.querySelectorAll('.tab-content').forEach(content => {
        content.classList.remove('active');
    });
    document.getElementById(`${tabName}-tab`).classList.add('active');
    
    if (typeof sessionTracker !== 'undefined') {
        sessionTracker.tabOpened(tabName);
    }
    
    if (tabName === 'puzzle' && !this.puzzle.isInitialized) {
        this.puzzle.init();
    }
    
    if (tabName === 'achievements') {
        this.renderAchievements();
    }
    
    if (tabName === 'bosses') {
        this.renderBosses();
    }
    
    if (tabName === 'auto' && this.renderAutoSettings) {
        this.renderAutoSettings();
    }
    
    // ⭐ ADAUGĂ
    if (tabName === 'statistics') {
        this.renderStatistics();
    }

     if (tabName === 'shop') {
        this.renderShop();
    }
}
    
    startGameLoop() {
    this.gameLoop = setInterval(() => {  // ← ADĂUGAT this.gameLoop =
        this.tick();
    }, this.config.tickRate);
}
    
    tick() {
    const now = Date.now();
    const deltaTime = (now - this.state.lastTick) / 1000;
    
    // Track playtime
    this.state.totalPlayTime += deltaTime * 1000;
    
    const energyGained = this.state.energyPerSecond * deltaTime;
    const manaGained = this.state.manaPerSecond * deltaTime;
    
    this.state.energy = Math.min(this.state.energy + energyGained, this.state.energyCap);
    
    // Cap reached toast (once per session per resource)
    if (this.state.energy >= this.state.energyCap && !this._energyCapToastShown) {
        this._energyCapToastShown = true;
        this.showToast('⚡ Capacitate maximă! Upgradează Depozitul de Energie!', 'warning');
    }
    
    this.state.mana = Math.min(this.state.mana + manaGained, this.state.manaCap);
    
    // Cap reached toast (once per session per resource)
    if (this.state.mana >= this.state.manaCap && !this._manaCapToastShown) {
        this._manaCapToastShown = true;
        this.showToast('💙 Capacitate maximă! Upgradează Depozitul de Mana!', 'warning');
    }
    
    if (this.state.volcanoUnlocked) {
        const volcanicGained = this.state.volcanicEnergyPerSecond * deltaTime;
        
        this.state.volcanicEnergy = Math.min(this.state.volcanicEnergy + volcanicGained, this.state.volcanicEnergyCap);
        
        // ⭐ TRACK volcanic energy
        this.state.statistics.totalVolcanicEnergyGenerated += volcanicGained;
    }
    
    // ⭐ TRACK energy and mana
    this.state.statistics.totalEnergyGenerated += energyGained;
    this.state.statistics.totalManaGenerated += manaGained;
    
    this.state.lifetimeEnergy += energyGained;
    this.updateQuestProgress('collect', 'energy', energyGained);
    this.updateQuestProgress('collect', 'mana', manaGained);
    
    // ⭐ TRACK highest production
    if (this.state.energyPerSecond > this.state.statistics.highestEnergyPerSecond) {
        this.state.statistics.highestEnergyPerSecond = this.state.energyPerSecond;
    }
    
    // ⭐ TRACK energy history (every 60 seconds)
    if (!this.lastHistoryUpdate || now - this.lastHistoryUpdate > 60000) {
        this.updateEnergyHistory();
        this.lastHistoryUpdate = now;
    }
    
    this.state.lastTick = now;
    this.updateUI();
    this.updateStructureButtons();
    
    if (!this.lastAchievementCheck || now - this.lastAchievementCheck > 5000) {
        this.checkAchievements();
        this.lastAchievementCheck = now;
    }
    
    if (!this.lastQuestRefreshCheck || now - this.lastQuestRefreshCheck > 60000) {
        this.checkDailyQuestRefresh();
        this.checkWeeklyQuestRefresh();
        this.lastQuestRefreshCheck = now;
    }
    
    // Auto-features (dacă există)
    if (this.state.autoFeatures.autoBuyStructures.enabled) {
        if (!this.lastAutoBuy || now - this.lastAutoBuy > 2000) {
            this.autoBuyCheapestStructure();
            this.lastAutoBuy = now;
        }
    }
    
    if (this.autoClaimQuests) {
        if (!this.lastAutoClaim || now - this.lastAutoClaim > 3000) {
            this.autoClaimQuests();
            this.lastAutoClaim = now;
        }
    }
    
    if (this.autoPuzzlePlay) {
        if (!this.lastAutoPuzzle || now - this.lastAutoPuzzle > 60000) {
            this.autoPuzzlePlay();
            this.lastAutoPuzzle = now;
        }
    }
}
    
    calculateEnergyPerSecond() {
    let energyTotal = 0;
    let manaTotal = 0;
    
    // Structuri
    for (let [key, structure] of Object.entries(this.state.structures)) {
        if (structure.level > 0) {
            const data = this.structureData[key];  // ← ADAUGĂ ASTA
            const production = data.baseProduction * structure.level;  // ← MODIFICAT
            
            if (structure.resource === 'energy') {
                energyTotal += production;
            } else if (structure.resource === 'mana') {
                manaTotal += production;
            }
        }
    }
    
    // Energy Boost upgrade
const energyBoostLevel = this.state.upgrades.energyBoost.level;
if (energyBoostLevel > 0) {
    const data = this.upgradeData.energyBoost;  // ← ADAUGĂ ASTA
    const multiplier = Math.pow(data.multiplier, energyBoostLevel);  // ← MODIFICAT
    energyTotal *= multiplier;
}
    
    // GUARDIAN BONUSES (MULTIPLICATIVE - fiecare guardian inmulteste productia)
    let guardianMultiplier = 1;
    for (let guardian of this.state.guardians) {
        guardianMultiplier *= guardian.bonus;
    }
    energyTotal *= guardianMultiplier;
    manaTotal *= guardianMultiplier;
    
    // Ascension bonus (+25% per level)
    if (this.state.ascensionLevel > 0) {
        const ascensionBonus = 1 + (this.state.ascensionLevel * 0.25);
        energyTotal *= ascensionBonus;
        manaTotal *= ascensionBonus;
    }
    
    // ⭐ SOFT CAP - Reducere după anumite praguri
    if (energyTotal > 10000) {
        // După 10K/s, reducere cu 20%
        energyTotal = 10000 + (energyTotal - 10000) * 0.8;
    }
    
    if (energyTotal > 50000) {
        // După 50K/s, reducere cu 50%
        energyTotal = 50000 + (energyTotal - 50000) * 0.5;
    }
    
    if (energyTotal > 200000) {
        // După 200K/s, reducere cu 75%
        energyTotal = 200000 + (energyTotal - 200000) * 0.25;
    }
    
    this.state.energyPerSecond = energyTotal;
    this.state.manaPerSecond = manaTotal;
    
    // Update stats
    if (energyTotal > this.state.statistics.highestEnergyPerSecond) {
        this.state.statistics.highestEnergyPerSecond = energyTotal;
    }
}
    
    calculateResourceCaps() {
    let energyCap = 15000;
    let manaCap = 3000;
    
    if (this.state.upgrades.energyCap && this.state.upgrades.energyCap.level > 0) {
        const data = this.upgradeData.energyCap;  // ← ADAUGĂ ASTA
        energyCap *= Math.pow(data.multiplier, this.state.upgrades.energyCap.level);  // ← MODIFICAT
    }
    
    if (this.state.upgrades.manaCap && this.state.upgrades.manaCap.level > 0) {
        const data = this.upgradeData.manaCap;  // ← ADAUGĂ ASTA
        manaCap *= Math.pow(data.multiplier, this.state.upgrades.manaCap.level);  // ← MODIFICAT
    }
    
    if (this.state.ascensionLevel > 0) {
        energyCap *= (1 + this.state.ascensionLevel * 1.0);
        manaCap *= (1 + this.state.ascensionLevel * 1.0);
    }
    
    this.state.energyCap = Math.floor(energyCap);
    this.state.manaCap = Math.floor(manaCap);
}
    
    renderStructures(retries = 0) {
    const container = document.querySelector('.structures-grid');
    
    if (!container) {
        if (retries < 10) {
            setTimeout(() => this.renderStructures(retries + 1), 100);
        }
        return;
    }
    
    container.innerHTML = '';
    
    for (let [key, structure] of Object.entries(this.state.structures)) {
        const data = this.structureData[key];
        
        // ⭐ FIX: Verifică că data există
        if (!data) {
            console.error(`❌ Missing structureData for ${key}`);
            continue;
        }
        
        const cost = this.getStructureCost(key);
        const production = this.getStructureProduction(key);
        
        // ⭐ FIX: Calculează canAfford CORECT
        const canAfford = this.state.energy >= cost;
                
        const resourceIcon = structure.resource === 'energy' ? '⚡' : '💙';
        
        const milestone = this.getMilestoneInfo(structure.level);
        const milestoneText = structure.level >= 25 ? 
            `<div class="structure-milestone">🎯 ${milestone.current} ${milestone.next ? '→ ' + milestone.bonus + ' la nivelul ' + milestone.next : 'MAX!'}</div>` : '';
        
        const card = document.createElement('div');
        card.className = `structure-card ${canAfford ? 'can-afford' : ''}`;
        card.dataset.structure = key;
        card.innerHTML = `
            <div class="structure-header">
                <span class="structure-icon">${data.icon}</span>
                <span class="structure-level">Nivel ${structure.level}</span>
            </div>
            <h3 class="structure-name">${data.name}</h3>
            <p class="structure-description">${data.description}</p>
            <div class="structure-production">
                ${production > 0 ? `+${this.formatNumber(production)}/s ${resourceIcon}` : 'Necumpărat'}
            </div>
            ${milestoneText}
            <div class="structure-cost">
                <span class="cost-item ${canAfford ? '' : 'cant-afford'}">
                    ⚡ ${this.formatNumber(cost)}
                </span>
            </div>
            <button class="buy-btn" ${canAfford ? '' : 'disabled'} onclick="game.buyStructure('${key}')">
                ${structure.level === 0 ? 'Cumpără' : 'Îmbunătățește'}
            </button>
        `;
        
        container.appendChild(card);
    }
}
    
    updateStructureButtons() {
        for (let [key, structure] of Object.entries(this.state.structures)) {
            const card = document.querySelector(`.structure-card[data-structure="${key}"]`);
            if (!card) continue;
            const cost = this.getStructureCost(key);
            const canAfford = this.state.energy >= cost;
            const btn = card.querySelector('.buy-btn');
            if (btn) {
                btn.disabled = !canAfford;
                btn.textContent = structure.level === 0 ? 'Cumpără' : 'Îmbunătățește';
            }
            if (canAfford) card.classList.add('can-afford');
            else card.classList.remove('can-afford');
            const costEl = card.querySelector('.cost-item');
            if (costEl) {
                costEl.textContent = `⚡ ${this.formatNumber(cost)}`;
                costEl.className = canAfford ? 'cost-item' : 'cost-item cant-afford';
            }
        }
        
        if (this.state.volcanoUnlocked && this.state.currentRealm === 'volcano') {
            for (let [key, structure] of Object.entries(this.state.volcanoStructures)) {
                const card = document.querySelector(`.structure-card[data-structure="${key}"]`);
                if (!card) continue;
                const cost = this.getVolcanoStructureCost(key);
                const canAfford = this.state.energy >= cost;
                const btn = card.querySelector('.buy-btn');
                if (btn) {
                    btn.disabled = !canAfford;
                    btn.textContent = structure.level === 0 ? 'Cumpără' : 'Îmbunătățește';
                }
                if (canAfford) card.classList.add('can-afford');
                else card.classList.remove('can-afford');
                const costEl = card.querySelector('.cost-item');
                if (costEl) {
                    costEl.textContent = `⚡ ${this.formatNumber(cost)}`;
                    costEl.className = canAfford ? 'cost-item' : 'cost-item cant-afford';
                }
            }
        }
    }
    
    getStructureCost(structureKey) {
    const structure = this.state.structures[structureKey];
    const data = this.structureData[structureKey];  // ← ADAUGĂ ASTA
    return Math.floor(data.baseCost * Math.pow(data.costMultiplier, structure.level));
}

getStructureProduction(structureKey) {
    const structure = this.state.structures[structureKey];
    const data = this.structureData[structureKey];
    if (!structure || !data || typeof structure.level !== 'number' || isNaN(structure.level)) return 0;
    const base = data.baseProduction * structure.level;
    return base * this.getMilestoneMultiplier(structure.level);
}

getMilestoneMultiplier(level) {
    if (level >= 100) return 8;
    if (level >= 50) return 4;
    if (level >= 25) return 2;
    return 1;
}

getMilestoneInfo(level) {
    if (level >= 100) return { next: null, bonus: 'x8', current: 'x8', progress: 100 };
    if (level >= 50) return { next: 100, bonus: 'x8', current: 'x4', progress: ((level - 50) / 50) * 100 };
    if (level >= 25) return { next: 50, bonus: 'x4', current: 'x2', progress: ((level - 25) / 25) * 100 };
    return { next: 25, bonus: 'x2', current: 'x1', progress: (level / 25) * 100 };
}
    
    buyStructure(structureKey) {
    const cost = this.getStructureCost(structureKey);
    
    if (this.state.energy >= cost) {
        soundManager.playPurchase();
        
        this.state.energy -= cost;
        this.state.structures[structureKey].level++;
        
        if (typeof sessionTracker !== 'undefined') {
            sessionTracker.structureBought(structureKey, this.state.structures[structureKey].level, cost, this.state.energy, this.state.mana);
        }
        
        this.state.statistics.totalStructuresBought++;
        this.state.statistics.totalClicks++;
        this.updateQuestProgress('click', 'any', 1);
        this.updateFavoriteStructure(structureKey);
        
        this.calculateEnergyPerSecond();
        this.calculateResourceCaps();
        this.renderStructures();
        this.updateUI();
        
        this.updateQuestProgress('buy', 'structures', 1);
        this.updateQuestProgress('upgrade', 'any', 1);
        
        // ⭐ FIX: event poate fi undefined
        let x = window.innerWidth / 2;
        let y = window.innerHeight / 2;
        
        if (typeof event !== 'undefined' && event && event.target) {
            const btn = event.target;
            const rect = btn.getBoundingClientRect();
            x = rect.left + rect.width / 2;
            y = rect.top + rect.height / 2;
        }
        
        particleSystem.burst(x, y, 15, this.structureData[structureKey].icon);
        particleSystem.floatingNumber(x, y - 30, `+${this.formatNumber(this.getStructureProduction(structureKey))}/s`, '#10b981');
        
        this.showToast(`✅ ${this.structureData[structureKey].name} îmbunătățit!`, 'success');
        this.saveGame();
    } else {
        soundManager.playError();
        particleSystem.screenShake(300, 5);
        this.showToast('❌ Energie insuficientă!', 'error');
    }
}
    
    renderUpgrades() {
    const container = document.querySelector('.upgrades-grid');
    container.innerHTML = '';
    
    for (let [key, upgrade] of Object.entries(this.state.upgrades)) {
        const data = this.upgradeData[key];  // ← ADAUGĂ ASTA
        const cost = this.getUpgradeCost(key);
        const canAfford = data.costResource === 'energy' ?  // ← MODIFICAT
            this.state.energy >= cost : 
            this.state.mana >= cost;
        const maxed = upgrade.level >= data.maxLevel;  // ← MODIFICAT
        
        const costIcon = data.costResource === 'energy' ? '⚡' : '💙';  // ← MODIFICAT
        
        const card = document.createElement('div');
        card.className = 'upgrade-card';
        
        // Cap alert: highlight when resource is full
        let capAlertBadge = '';
        if (key === 'energyCap' && this.state.energy >= this.state.energyCap && !maxed) {
            card.classList.add('cap-alert');
            capAlertBadge = '<span class="cap-alert-badge">⚡ PLIN!</span>';
        }
        if (key === 'manaCap' && this.state.mana >= this.state.manaCap && !maxed) {
            card.classList.add('cap-alert');
            capAlertBadge = '<span class="cap-alert-badge">💙 PLIN!</span>';
        }
        
        card.innerHTML = `
            <div class="upgrade-header">
                <span class="upgrade-icon">${data.icon}</span>
                <div class="upgrade-info">
                    <h3>${data.name}${capAlertBadge}</h3>
                    <div class="upgrade-level">Nivel ${upgrade.level}/${data.maxLevel}</div>
                </div>
            </div>
            <div class="upgrade-effect">
                ${data.description}
            </div>
            <div class="upgrade-cost">
                ${maxed ? '<strong>✅ Maxat</strong>' : `Cost: ${costIcon} ${this.formatNumber(cost)}`}
            </div>
            <button class="buy-btn" ${!maxed && canAfford ? '' : 'disabled'} onclick="game.buyUpgrade('${key}')">
                ${maxed ? 'Maxat' : 'Îmbunătățește'}
            </button>
        `;
        
        container.appendChild(card);
    }
}
    
    getUpgradeCost(upgradeKey) {
    const upgrade = this.state.upgrades[upgradeKey];
    const data = this.upgradeData[upgradeKey];  // ← ADAUGĂ ASTA
    return Math.floor(data.baseCost * Math.pow(2, upgrade.level));
}
    
    buyUpgrade(upgradeKey) {
    const upgrade = this.state.upgrades[upgradeKey];
    const data = this.upgradeData[upgradeKey];  // ← ADAUGĂ ASTA
    
    if (upgrade.level >= data.maxLevel) {  // ← MODIFICAT
        soundManager.playError();
        this.showToast('⚠️ Upgrade deja maxat!', 'warning');
        return;
    }
    
    const cost = this.getUpgradeCost(upgradeKey);
    const resourceCheck = data.costResource === 'energy' ?  // ← MODIFICAT
        this.state.energy >= cost : 
        this.state.mana >= cost;
    
    if (resourceCheck) {
        soundManager.playLevelUp();
        
        if (data.costResource === 'energy') {  // ← MODIFICAT
            this.state.energy -= cost;
        } else {
            this.state.mana -= cost;
        }
        
        this.state.upgrades[upgradeKey].level++;
        this.state.statistics.totalUpgradesBought++;
        
        if (typeof sessionTracker !== 'undefined') {
            sessionTracker.upgradeBought(upgradeKey, this.state.upgrades[upgradeKey].level, cost, data.costResource);
        }
        
        // Reset cap toast flags so player sees toast again for new cap
        if (upgradeKey === 'energyCap') this._energyCapToastShown = false;
        if (upgradeKey === 'manaCap') this._manaCapToastShown = false;
        
        this.calculateEnergyPerSecond();
        this.calculateResourceCaps();
        this.updateStructureButtons();
        this.updateUI();
        
        this.updateQuestProgress('upgrade', 'any', 1);
        
        this.showToast(`✅ ${data.name} îmbunătățit!`, 'success');  // ← MODIFICAT
        this.saveGame();
    } else {
        soundManager.playError();
        this.showToast(`❌ ${data.costResource === 'energy' ? 'Energie' : 'Mana'} insuficientă!`, 'error');  // ← MODIFICAT
    }
}

    
    renderGuardians() {
        const container = document.querySelector('.guardians-grid');
        container.innerHTML = '';
        
        if (this.state.guardians.length === 0) {
            container.innerHTML = '<p style="grid-column: 1/-1; text-align: center; color: var(--text-secondary);">Nu ai gardieni. Invocă-ți primul guardian! (50 💎)</p>';
            return;
        }
        
        for (let i = 0; i < this.state.guardians.length; i++) {
            const guardian = this.state.guardians[i];
            const trainingCost = 500;
            const canTrain = this.state.gems >= trainingCost;
            
            const card = document.createElement('div');
            card.className = `guardian-card ${guardian.rarity}`;
            card.innerHTML = `
                <div class="guardian-icon">${guardian.icon}</div>
                <div class="guardian-name">${guardian.name}</div>
                <div class="guardian-rarity ${guardian.rarity}">${this.getRarityName(guardian.rarity)}</div>
                <div class="guardian-stats">
                    Bonus: +${Math.floor((guardian.bonus - 1) * 100)}% producție
                </div>
                <div class="guardian-training">
                    <button class="train-btn ${canTrain ? '' : 'cant-afford'}" 
                            onclick="game.trainGuardian(${i})" 
                            ${canTrain ? '' : 'disabled'}>
                        🎓 Antrenează (500 💎)
                    </button>
                    <div class="train-info">+5% bonus permanent</div>
                </div>
            `;
            
            container.appendChild(card);
        }
    }
    
    trainGuardian(index) {
        const cost = 500;
        if (this.state.gems < cost) {
            soundManager.playError();
            this.showToast('❌ Gemuri insuficiente! (500 💎)', 'error');
            return;
        }
        
        if (index < 0 || index >= this.state.guardians.length) return;
        
        const guardian = this.state.guardians[index];
        this.state.gems -= cost;
        this.state.statistics.totalGemsSpent += cost;
        
        // +5% bonus permanent (multiplicativ)
        guardian.bonus = parseFloat((guardian.bonus * 1.05).toFixed(4));
        
        this.calculateEnergyPerSecond();
        if (this.state.volcanoUnlocked) {
            this.calculateVolcanicEnergyPerSecond();
        }
        this.renderGuardians();
        this.updateUI();
        this.saveGame();
        
        soundManager.playLevelUp();
        this.showToast(`🎓 ${guardian.name} antrenat! Bonus: +${Math.floor((guardian.bonus - 1) * 100)}%`, 'success');
    }
    
    summonGuardian() {
    const cost = 50;
    
    if (this.state.gems < cost) {
        soundManager.playError();
        particleSystem.screenShake(300, 5);
        this.showToast('❌ Gemuri insuficiente! (50 💎 necesare)', 'error');
        return;
    }
    
    this.state.gems -= cost;
    
    // ⭐ TRACK
    this.state.statistics.totalGemsSpent += cost;
    this.state.statistics.totalClicks++;
    this.updateQuestProgress('click', 'any', 1);
    
    // Determine rarity
const random = Math.random();
let rarity;

if (random < 0.5) rarity = 'common';       // 50% șansă
else if (random < 0.8) rarity = 'rare';     // 30% șansă
else if (random < 0.95) rarity = 'epic';    // 15% șansă
else rarity = 'legendary';                  // 5% șansă
    
    // 🎵 PLAY SOUND BASED ON RARITY
    soundManager.playGuardianSummon(rarity);
    
    // Choose template based on current realm
    let templates = this.guardianTemplates;
    
    if (this.state.volcanoUnlocked && this.state.currentRealm === 'volcano') {
        templates = this.fireGuardianTemplates;
    }
    
    const available = templates.filter(g => g.rarity === rarity);
    
    if (available.length === 0) {
        const normalAvailable = this.guardianTemplates.filter(g => g.rarity === rarity);
        if (normalAvailable.length === 0) return;
        
        const template = normalAvailable[Math.floor(Math.random() * normalAvailable.length)];
        const newGuardian = { ...template };
        this.state.guardians.push(newGuardian);
    } else {
        const template = available[Math.floor(Math.random() * available.length)];
        const newGuardian = { ...template };
        this.state.guardians.push(newGuardian);
    }
    
    // ⭐ TRACK
    this.state.statistics.totalGuardiansUnlocked++;
    this.updateMostPowerfulGuardian();
    
    // Recalculate production
    this.calculateEnergyPerSecond();
    if (this.calculateVolcanicEnergyPerSecond) {
        this.calculateVolcanicEnergyPerSecond();
    }
    this.renderGuardians();
    this.updateUI();
    
    // ⭐ VISUAL EFFECTS
    const lastGuardian = this.state.guardians[this.state.guardians.length - 1];
    
    // FIX: Check if event exists (poate fi apelat din Console)
    let x = window.innerWidth / 2;
    let y = window.innerHeight / 2;
    
    if (typeof event !== 'undefined' && event.target) {
        const btn = event.target;
        const rect = btn.getBoundingClientRect();
        x = rect.left + rect.width / 2;
        y = rect.top + rect.height / 2;
    }
    
    let particleCount = 20;
    let emoji = '✨';
    
    if (rarity === 'legendary') {
        particleCount = 50;
        emoji = '⭐';
        particleSystem.screenShake(500, 15);
    } else if (rarity === 'epic') {
        particleCount = 35;
        emoji = '💜';
    }
    
    particleSystem.burst(x, y, particleCount, emoji);
    particleSystem.floatingNumber(x, y - 50, `${lastGuardian.name}!`, '#fbbf24');
    
    this.showToast(`✨ Ai invocat: ${lastGuardian.name} (${this.getRarityName(rarity)})!`, 'success');
    this.saveGame();
}
    
    getRarityName(rarity) {
        const names = {
            common: 'Comun',
            rare: 'Rar',
            epic: 'Epic',
            legendary: 'Legendar'
        };
        return names[rarity] || rarity;
    }
    
    generateQuests() {
        this.state.activeQuests = [];
        
        const numQuests = 3;
        const availableTemplates = [...this.questTemplates];
        
        for (let i = 0; i < numQuests && availableTemplates.length > 0; i++) {
            const index = Math.floor(Math.random() * availableTemplates.length);
            const template = availableTemplates.splice(index, 1)[0];
            
            const scaleFactor = 1 + (this.state.ascensionLevel * 0.5);
            const amount = Math.floor(template.amountBase * scaleFactor);
            
            const quest = {
                ...template,
                amount: amount,
                progress: 0,
                completed: false
            };
            
            this.state.activeQuests.push(quest);
        }
        
        this.state.lastQuestRefresh = Date.now();
        this.renderQuests();
    }
    
    checkDailyQuestRefresh() {
        const now = Date.now();
        const lastRefresh = this.state.lastQuestRefresh || 0;
        
        if (lastRefresh === 0) {
            this.generateQuests();
            return;
        }
        
        const lastDate = new Date(lastRefresh).toDateString();
        const today = new Date(now).toDateString();
        
        if (lastDate !== today) {
            this.state.completedQuestsToday = 0;
            this.generateQuests();
            this.showToast('📜 Quest-uri noi disponibile!', 'info');
        }
    }
    
    generateWeeklyQuest() {
        const templates = this.weeklyQuestTemplates;
        const template = templates[Math.floor(Math.random() * templates.length)];
        const scaleFactor = 1 + (this.state.ascensionLevel * 0.5);
        const amount = Math.floor(template.amountBase * scaleFactor);
        
        this.state.weeklyQuest = {
            ...template,
            amount: amount,
            progress: 0,
            completed: false,
            expiresAt: Date.now() + (7 * 24 * 60 * 60 * 1000)
        };
        
        this.state.lastWeeklyRefresh = Date.now();
    }
    
    checkWeeklyQuestRefresh() {
        const now = Date.now();
        
        if (!this.state.weeklyQuest) {
            this.generateWeeklyQuest();
            return;
        }
        
        if (now > this.state.weeklyQuest.expiresAt) {
            if (!this.state.weeklyQuest.completed) {
                this.showToast('⚠️ Quest-ul săptămânal a expirat!', 'warning');
            }
            this.generateWeeklyQuest();
        }
    }
    
    getQuestTimeUntilRefresh() {
        const now = new Date();
        const tomorrow = new Date(now);
        tomorrow.setDate(tomorrow.getDate() + 1);
        tomorrow.setHours(0, 0, 0, 0);
        return tomorrow - now;
    }
    
    renderQuests() {
        let container = document.querySelector('.quests-container');
        
        if (!container) {
            const realmTab = document.getElementById('realm-tab');
            const questSection = document.createElement('div');
            questSection.className = 'quests-section';
            questSection.innerHTML = `
                <h2 style="text-align: center; margin: 2rem 0 1rem;">📜 Quest-uri Active</h2>
                <div class="quest-refresh-timer"></div>
                <div class="quests-container"></div>
                <div class="weekly-quest-section"></div>
            `;
            realmTab.insertBefore(questSection, realmTab.querySelector('.structures-grid'));
            container = document.querySelector('.quests-container');
        }
        
        container.innerHTML = '';
        
        // Refresh timer
        const timerEl = document.querySelector('.quest-refresh-timer');
        if (timerEl) {
            const timeLeft = this.getQuestTimeUntilRefresh();
            const hours = Math.floor(timeLeft / 3600000);
            const mins = Math.floor((timeLeft % 3600000) / 60000);
            timerEl.innerHTML = `<p style="text-align:center; color:var(--text-secondary); font-size:0.85rem; margin-bottom:1rem;">⚡ Quest-uri noi în: ${hours}h ${mins}m</p>`;
        }
        
        if (this.state.activeQuests.length === 0) {
            container.innerHTML = '<p style="text-align: center; color: var(--text-secondary); padding: 2rem;">Nu ai quest-uri active</p>';
        } else {
            for (let quest of this.state.activeQuests) {
                const progress = Math.min(quest.progress, quest.amount);
                const percentage = (progress / quest.amount) * 100;
                const description = quest.description.replace('{amount}', quest.amount);
                
                const card = document.createElement('div');
                card.className = `quest-card ${quest.completed ? 'completed' : ''}`;
                card.dataset.questId = quest.id;
                card.innerHTML = `
                    <div class="quest-header">
                        <span class="quest-icon">${quest.icon}</span>
                        <div class="quest-info">
                            <h4>${quest.name}</h4>
                            <p>${description}</p>
                        </div>
                    </div>
                    <div class="quest-progress">
                        <div class="progress-bar">
                            <div class="progress-fill" style="width: ${percentage}%"></div>
                        </div>
                        <span class="progress-text">${this.formatNumber(progress)} / ${this.formatNumber(quest.amount)}</span>
                    </div>
                    <div class="quest-reward">
                        Recompensă: ${this.formatReward(quest.reward)}
                    </div>
                    ${quest.completed ? 
                        '<button class="claim-btn" onclick="game.claimQuest(\'' + quest.id + '\')">Revendică</button>' :
                        '<button class="claim-btn" disabled>În progres...</button>'
                    }
                `;
                
                container.appendChild(card);
            }
        }
        
        // Weekly quest section
        this.renderWeeklyQuest();
    }
    
    renderWeeklyQuest() {
        const section = document.querySelector('.weekly-quest-section');
        if (!section) return;
        section.innerHTML = '';
        
        if (!this.state.weeklyQuest) return;
        
        const wq = this.state.weeklyQuest;
        const progress = Math.min(wq.progress, wq.amount);
        const percentage = (progress / wq.amount) * 100;
        const description = wq.description.replace('{amount}', this.formatNumber(wq.amount));
        const timeLeft = wq.expiresAt - Date.now();
        const daysLeft = Math.floor(timeLeft / 86400000);
        const hoursLeft = Math.floor((timeLeft % 86400000) / 3600000);
        
        const card = document.createElement('div');
        card.className = `quest-card weekly-quest ${wq.completed ? 'completed' : ''}`;
        card.style.cssText = 'border: 2px solid #fbbf24; background: linear-gradient(135deg, rgba(251,191,36,0.1), rgba(245,158,11,0.05));';
        card.innerHTML = `
            <div class="quest-header">
                <span class="quest-icon" style="font-size:2.5rem;">${wq.icon}</span>
                <div class="quest-info">
                    <h4 style="color:#fbbf24;">${wq.name}</h4>
                    <p>${description}</p>
                    <p style="font-size:0.75rem; color:#f59e0b; margin-top:4px;">⏰ Expiră în: ${daysLeft}z ${hoursLeft}h</p>
                </div>
            </div>
            <div class="quest-progress">
                <div class="progress-bar">
                    <div class="progress-fill" style="width: ${percentage}%; background: linear-gradient(90deg, #f59e0b, #fbbf24);"></div>
                </div>
                <span class="progress-text">${this.formatNumber(progress)} / ${this.formatNumber(wq.amount)}</span>
            </div>
            <div class="quest-reward">
                Recompensă: ${this.formatReward(wq.reward)}
            </div>
            ${wq.completed ? 
                '<button class="claim-btn" style="background:linear-gradient(135deg,#f59e0b,#fbbf24);" onclick="game.claimWeeklyQuest()">Revendică 🌟</button>' :
                '<button class="claim-btn" disabled>În progres...</button>'
            }
        `;
        
        section.appendChild(card);
    }
    
    formatReward(reward) {
        const icons = {
            gems: '💎',
            mana: '💙',
            energy: '⚡',
            crystals: '💠'
        };
        
        let parts = [];
        
        // Primary reward
        if (reward.type && reward.amount) {
            parts.push(`${reward.amount} ${icons[reward.type] || reward.type}`);
        }
        
        // Bonus rewards
        if (reward.bonus) {
            if (reward.bonus.gems) parts.push(`${reward.bonus.gems} 💎`);
            if (reward.bonus.crystals) parts.push(`${reward.bonus.crystals} 💠`);
            if (reward.bonus.energy) parts.push(`${reward.bonus.energy} ⚡`);
            if (reward.bonus.mana) parts.push(`${reward.bonus.mana} 💙`);
        }
        
        return parts.length > 0 ? parts.join(' + ') : '???';
    }
    
    updateQuestUI() {
        for (let quest of this.state.activeQuests) {
            const card = document.querySelector(`.quest-card[data-quest-id="${quest.id}"]`);
            if (!card) continue;
            const progress = Math.min(quest.progress, quest.amount);
            const percentage = (progress / quest.amount) * 100;
            const fill = card.querySelector('.progress-fill');
            const text = card.querySelector('.progress-text');
            if (fill) fill.style.width = percentage + '%';
            if (text) text.textContent = `${this.formatNumber(progress)} / ${this.formatNumber(quest.amount)}`;
        }
        
        // Update weekly quest progress display
        if (this.state.weeklyQuest && !this.state.weeklyQuest.completed) {
            const wqCard = document.querySelector('.weekly-quest');
            if (wqCard) {
                const wq = this.state.weeklyQuest;
                const progress = Math.min(wq.progress, wq.amount);
                const percentage = (progress / wq.amount) * 100;
                const fill = wqCard.querySelector('.progress-fill');
                const text = wqCard.querySelector('.progress-text');
                if (fill) fill.style.width = percentage + '%';
                if (text) text.textContent = `${this.formatNumber(progress)} / ${this.formatNumber(wq.amount)}`;
            }
        }
    }
    
    updateQuestProgress(type, target, amount) {
        let completed = false;
        for (let quest of this.state.activeQuests) {
            if (quest.completed) continue;
            
            if (quest.type === type) {
                if (!quest.target || quest.target === target || quest.target === 'any') {
                    if (quest.resource && quest.resource !== target) continue;
                    
                    quest.progress += amount;
                    
                    if (quest.progress >= quest.amount) {
                        quest.completed = true;
                        this.showToast(`✅ Quest completat: ${quest.name}`, 'success');
                        completed = true;
                    }
                }
            }
        }
        
        // Update weekly quest
        if (this.state.weeklyQuest && !this.state.weeklyQuest.completed) {
            const wq = this.state.weeklyQuest;
            if (wq.type === type) {
                if (!wq.target || wq.target === target || wq.target === 'any') {
                    if (wq.resource && wq.resource !== target) {} else {
                        wq.progress += amount;
                        if (wq.progress >= wq.amount) {
                            wq.completed = true;
                            this.showToast(`🌟 Quest săptămânal completat!`, 'success');
                            completed = true;
                        }
                    }
                }
            }
        }
        
        if (completed) {
            this.renderQuests();
        } else {
            this.updateQuestUI();
        }
    }
    
    claimQuest(questId) {
    const questIndex = this.state.activeQuests.findIndex(q => q.id === questId);
    
    if (questIndex === -1) return;
    
    const quest = this.state.activeQuests[questIndex];
    
    if (!quest.completed) return;
    
    // 🎁 QUEST COMPLETE SOUND
    soundManager.playQuestComplete();
    
    const reward = quest.reward;
    
    // Primary reward
    if (reward.type && reward.amount) {
        switch(reward.type) {
            case 'gems': this.state.gems += reward.amount; this.trackReward('gems', reward.amount); break;
            case 'mana': this.state.mana = Math.min(this.state.mana + reward.amount, this.state.manaCap); break;
            case 'energy': this.state.energy += reward.amount; break;
            case 'crystals': this.state.crystals += reward.amount; this.trackReward('crystals', reward.amount); break;
        }
    }
    
    // Bonus rewards (multi-reward)
    if (reward.bonus) {
        if (reward.bonus.gems) { this.state.gems += reward.bonus.gems; this.trackReward('gems', reward.bonus.gems); }
        if (reward.bonus.crystals) { this.state.crystals += reward.bonus.crystals; this.trackReward('crystals', reward.bonus.crystals); }
        if (reward.bonus.energy) this.state.energy += reward.bonus.energy;
        if (reward.bonus.mana) this.state.mana = Math.min(this.state.mana + reward.bonus.mana, this.state.manaCap);
    }
    
    this.showToast(`🎁 Ai primit: ${this.formatReward(reward)}`, 'success');
    
    this.state.activeQuests.splice(questIndex, 1);
    this.state.completedQuestsToday++;
    this.state.totalQuestsCompleted++;

    // ⭐ TRACK
    this.state.statistics.totalQuestsCompleted++;
    
    if (this.state.completedQuestsToday < this.state.dailyQuestLimit) {
        const availableTemplates = this.questTemplates.filter(
            template => !this.state.activeQuests.some(q => q.id === template.id)
        );
        
        if (availableTemplates.length > 0) {
            const template = availableTemplates[Math.floor(Math.random() * availableTemplates.length)];
            const scaleFactor = 1 + (this.state.ascensionLevel * 0.5);
            const amount = Math.floor(template.amountBase * scaleFactor);
            
            const newQuest = {
                ...template,
                amount: amount,
                progress: 0,
                completed: false
            };
            
            this.state.activeQuests.push(newQuest);
        }
    }
    
    this.renderQuests();
    this.updateUI();
    this.saveGame();
}

claimWeeklyQuest() {
    const wq = this.state.weeklyQuest;
    if (!wq || !wq.completed) return;
    
    soundManager.playQuestComplete();
    
    const reward = wq.reward;
    
    // Primary reward
    if (reward.type && reward.amount) {
        switch(reward.type) {
            case 'gems': this.state.gems += reward.amount; this.trackReward('gems', reward.amount); break;
            case 'mana': this.state.mana = Math.min(this.state.mana + reward.amount, this.state.manaCap); break;
            case 'energy': this.state.energy += reward.amount; break;
            case 'crystals': this.state.crystals += reward.amount; this.trackReward('crystals', reward.amount); break;
        }
    }
    
    // Bonus rewards
    if (reward.bonus) {
        if (reward.bonus.gems) { this.state.gems += reward.bonus.gems; this.trackReward('gems', reward.bonus.gems); }
        if (reward.bonus.crystals) { this.state.crystals += reward.bonus.crystals; this.trackReward('crystals', reward.bonus.crystals); }
        if (reward.bonus.energy) this.state.energy += reward.bonus.energy;
        if (reward.bonus.mana) this.state.mana = Math.min(this.state.mana + reward.bonus.mana, this.state.manaCap);
    }
    
    this.showToast(`🌟 ${this.formatReward(reward)}`, 'success');
    
    particleSystem.burst(window.innerWidth / 2, window.innerHeight / 2, 40, '🌟');
    
    this.state.weeklyQuest = null;
    this.generateWeeklyQuest();
    
    this.renderQuests();
    this.updateUI();
    this.saveGame();
}

    checkAchievements() {
    for (let [key, achievement] of Object.entries(this.achievementDefinitions)) {
        const state = this.state.achievements[key];
        
        if (!state.unlocked && achievement.condition()) {
            state.unlocked = true;
            this.state.statistics.totalAchievementsUnlocked++;
            this.showAchievementUnlock(key, achievement);
        }
    }

    this.updateAchievementBadge();
}

updateAchievementBadge() {
    let unclaimedCount = 0;
    
    for (let [key, achievement] of Object.entries(this.achievementDefinitions)) {
        const state = this.state.achievements[key];
        if (state.unlocked && !state.claimed) {
            unclaimedCount++;
        }
    }
    
    const badge = document.getElementById('achievements-badge');
    if (badge) {
        if (unclaimedCount > 0) {
            badge.textContent = unclaimedCount;
            badge.style.display = 'flex';
        } else {
            badge.style.display = 'none';
        }
    }
}

showAchievementUnlock(key, achievement) {

    // ⭐ CHECK notifications setting
    if (!this.state.settings.notificationsEnabled) {
        // Just show toast
        this.showToast(`🏆 Achievement: ${achievement.name}`, 'success');
        return;
    }

    // Create notification element
    const notification = document.createElement('div');
    notification.className = 'achievement-unlock';
    notification.innerHTML = `
        <div class="achievement-content">
            <div class="achievement-icon">${achievement.icon}</div>
            <div class="achievement-info">
                <div class="achievement-title">🏆 Achievement Unlocked!</div>
                <div class="achievement-name">${achievement.name}</div>
                <div class="achievement-desc">${achievement.description}</div>
            </div>
        </div>
    `;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => notification.classList.add('show'), 100);
    
    // Remove after 5 seconds
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => notification.remove(), 300);
    }, 5000);
    
    // Sound effect (dacă ai)
    this.showToast(`🏆 Achievement: ${achievement.name}`, 'success');
}

claimAchievement(key) {
    const state = this.state.achievements[key];
    const achievement = this.achievementDefinitions[key];
    
    if (state.unlocked && !state.claimed) {
        soundManager.playAchievementUnlock();
        
        state.claimed = true;
        
        if (achievement.reward.gems) {
            this.state.gems += achievement.reward.gems;
            this.trackReward('gems', achievement.reward.gems);
        }
        if (achievement.reward.crystals) {
            this.state.crystals += achievement.reward.crystals;
            this.trackReward('crystals', achievement.reward.crystals);
        }
        if (achievement.reward.energy) {
            this.state.energy += achievement.reward.energy;
        }
        
        // ⭐ ADAUGĂ RE-RENDER + UPDATE BADGE:
        this.renderAchievements();
        this.updateAchievementBadge();
        
        this.updateUI();
        this.saveGame();
        
        // Achievement claim effect
        let x = window.innerWidth / 2;
        let y = window.innerHeight / 2;
        if (typeof event !== 'undefined' && event && event.target) {
            const btn = event.target;
            const rect = btn.getBoundingClientRect();
            x = rect.left + rect.width / 2;
            y = rect.top + rect.height / 2;
        }
        
        particleSystem.burst(x, y, 25, '🏆');
        particleSystem.floatingNumber(x, y - 40, `+${achievement.reward.gems || 0} 💎`, '#fbbf24');
        
        let rewardText = '';
        if (achievement.reward.gems) rewardText += `${achievement.reward.gems} 💎 `;
        if (achievement.reward.crystals) rewardText += `${achievement.reward.crystals} 💠`;
        
        this.showToast(`🎁 Claimed: ${rewardText}`, 'success');
    }
}

renderAchievements() {
    const container = document.querySelector('.achievements-grid');
    if (!container) return;
    
    container.innerHTML = '';
    
    const categories = ['toate', 'progres', 'puzzle', 'colectie', 'timp', 'speciale'];
    const categoryNames = {
        toate: '📋 Toate',
        progres: '⚡ Progres',
        puzzle: '🧩 Puzzle',
        colectie: '👥 Colecție',
        timp: '⏰ Timp',
        speciale: '✨ Speciale'
    };
    
    if (!this.currentAchievementCategory) {
        this.currentAchievementCategory = 'toate';
    }
    
    // Category filter tabs
    const filterDiv = document.createElement('div');
    filterDiv.className = 'achievement-categories';
    filterDiv.style.cssText = 'display:flex; flex-wrap:wrap; gap:8px; margin-bottom:1rem; justify-content:center;';
    
    for (const cat of categories) {
        const btn = document.createElement('button');
        btn.className = `category-btn ${this.currentAchievementCategory === cat ? 'active' : ''}`;
        btn.textContent = categoryNames[cat];
        btn.style.cssText = `padding:6px 12px; border-radius:20px; border:2px solid ${this.currentAchievementCategory === cat ? '#6366f1' : 'rgba(255,255,255,0.15)'}; background:${this.currentAchievementCategory === cat ? '#6366f1' : 'rgba(255,255,255,0.05)'}; color:white; cursor:pointer; font-size:0.85rem; font-weight:bold; transition:all 0.2s;`;
        btn.onclick = () => {
            this.currentAchievementCategory = cat;
            this.renderAchievements();
        };
        filterDiv.appendChild(btn);
    }
    container.appendChild(filterDiv);
    
    let unlockedCount = 0;
    let totalCount = Object.keys(this.achievementDefinitions).length;
    
    // Filter achievements
    const filtered = Object.entries(this.achievementDefinitions).filter(([key, ach]) => {
        return this.currentAchievementCategory === 'toate' || ach.category === this.currentAchievementCategory;
    });
    
    for (const [key, achievement] of filtered) {
        const state = this.state.achievements[key];
        if (state.unlocked) unlockedCount++;
        
        const card = document.createElement('div');
        card.className = `achievement-card ${state.unlocked ? 'unlocked' : 'locked'} ${state.claimed ? 'claimed' : ''}`;
        
        let rewardText = '';
        if (achievement.reward.gems) rewardText += `${achievement.reward.gems} 💎 `;
        if (achievement.reward.crystals) rewardText += `${achievement.reward.crystals} 💠`;
        
        card.innerHTML = `
            <div class="achievement-icon">${state.unlocked ? achievement.icon : '🔒'}</div>
            <div class="achievement-details">
                <div class="achievement-name">${state.unlocked ? achievement.name : '???'}</div>
                <div class="achievement-description">${state.unlocked ? achievement.description : 'Locked'}</div>
                ${state.unlocked ? `<div class="achievement-reward">Reward: ${rewardText}</div>` : ''}
            </div>
            ${state.unlocked && !state.claimed ? 
                `<button class="claim-achievement-btn" onclick="game.claimAchievement('${key}')">Claim</button>` : 
                state.claimed ? '<div class="claimed-badge">✅ Claimed</div>' : ''
            }
        `;
        
        container.appendChild(card);
    }
    
    // Update progress
    const totalForCategory = filtered.length;
    const unlockedForCategory = filtered.filter(([key]) => this.state.achievements[key].unlocked).length;
    
    const progress = document.querySelector('.achievements-progress');
    if (progress) {
        if (this.currentAchievementCategory === 'toate') {
            progress.textContent = `${unlockedCount}/${totalCount} Unlocked`;
        } else {
            progress.textContent = `${unlockedForCategory}/${totalForCategory} Unlocked`;
        }
    }
}

checkBossUnlocks() {
    for (let boss of this.bossDefinitions) {
        const bossState = this.state.bosses[boss.id];
        
        if (!bossState.unlocked) {
            // Check unlock requirements
            const meetsRequirements = this.state.puzzleStats.totalCompleted >= boss.unlockRequirement.puzzlesCompleted;
            
            if (meetsRequirements) {
                bossState.unlocked = true;
                this.showToast(`🐉 Boss Unlocked: ${boss.name}!`, 'success');
            }
        }
    }
    
    this.renderBosses();
}

renderBosses() {
    const container = document.querySelector('.bosses-grid');
    if (!container) return;

    if (!this.state.bosses) {
        this.state.bosses = {};
        this.initBosses();
    }
    
    container.innerHTML = '';
    
    for (let boss of this.bossDefinitions) {
        const bossState = this.state.bosses[boss.id];

        // ⭐ VERIFICARE EXTRA
        if (!bossState) {
            console.warn(`Boss state missing for ${boss.id}, initializing...`);
            this.state.bosses[boss.id] = {
                unlocked: false,
                defeated: false,
                attempts: 0,
                bestScore: 0
            };
            continue; // Skip rendering this iteration
        }
        
        const card = document.createElement('div');
        card.className = `boss-card ${bossState.unlocked ? 'unlocked' : 'locked'} ${bossState.defeated ? 'defeated' : ''}`;
        
        let rewardsText = `${boss.rewards.gems}💎 + ${boss.rewards.crystals}💠 + ${this.formatNumber(boss.rewards.energy)}⚡`;
        if (boss.rewards.guaranteedGuardian) {
            rewardsText += ` + ${this.getRarityName(boss.rewards.guaranteedGuardian)} Guardian`;
        }
        
        card.innerHTML = `
            <div class="boss-header">
                <div class="boss-icon">${bossState.unlocked ? boss.icon : '🔒'}</div>
                <div class="boss-info">
                    <h3>${bossState.unlocked ? boss.name : '???'}</h3>
                    <div class="boss-difficulty">
                        ${'⭐'.repeat(boss.difficulty)}
                    </div>
                </div>
            </div>
            
            ${bossState.unlocked ? `
                <div class="boss-details">
                    <div class="boss-stat">
                        <span>HP:</span>
                        <span class="boss-hp">${boss.hp} ❤️</span>
                    </div>
                    <div class="boss-stat">
                        <span>Moves:</span>
                        <span>${boss.puzzleConfig.movesStart}</span>
                    </div>
                    <div class="boss-stat">
                        <span>Target:</span>
                        <span>${boss.puzzleConfig.targetScore}</span>
                    </div>
                    <div class="boss-stat">
                        <span>Attempts:</span>
                        <span>${bossState.attempts}</span>
                    </div>
                    ${bossState.bestScore > 0 ? `
                        <div class="boss-stat">
                            <span>Best Score:</span>
                            <span>${bossState.bestScore}</span>
                        </div>
                    ` : ''}
                </div>
                
                <div class="boss-rewards">
                    <strong>Rewards:</strong>
                    <p>${rewardsText}</p>
                </div>
                
                <button class="challenge-boss-btn ${bossState.defeated ? 'defeated-btn' : ''}" 
                        onclick="game.challengeBoss('${boss.id}')">
                    ${bossState.defeated ? '🏆 Defeated - Rechallenge' : '⚔️ Challenge Boss'}
                </button>
            ` : `
                <div class="boss-locked-info">
                    <p>🔒 Complete ${boss.unlockRequirement.puzzlesCompleted} puzzles to unlock</p>
                    <p>Progress: ${this.state.puzzleStats.totalCompleted}/${boss.unlockRequirement.puzzlesCompleted}</p>
                </div>
            `}
        `;
        
        container.appendChild(card);
    }
}

challengeBoss(bossId) {
    const boss = this.bossDefinitions.find(b => b.id === bossId);
    const bossState = this.state.bosses[bossId];
    
    if (!bossState.unlocked) {
        this.showToast('❌ Boss not unlocked yet!', 'error');
        return;
    }
    
    // Set current boss
    this.state.currentBoss = bossId;
    this.state.bossHP = boss.hp;
    bossState.attempts++;
    
    // Switch to puzzle tab with boss config
    this.puzzle.startBossBattle(boss);
    this.switchTab('puzzle');
    
    this.showToast(`⚔️ Boss Battle: ${boss.name}!`, 'warning');
    this.saveGame();
}

onBossPuzzleComplete(score) {
    if (!this.state.currentBoss) return;
    
    const boss = this.bossDefinitions.find(b => b.id === this.state.currentBoss);
    const bossState = this.state.bosses[this.state.currentBoss];
    
    // Update best score
    if (score > bossState.bestScore) {
        bossState.bestScore = score;
    }
    
    // Calculate damage (1 HP per 100 score above target)
    const damage = Math.floor(score / boss.puzzleConfig.targetScore);
    this.state.bossHP -= damage;
    
    if (this.state.bossHP <= 0) {
        // Boss defeated!
        this.defeatBoss(boss, bossState);
    } else {
        // Continue battle
        this.showToast(`💥 ${damage} damage! Boss HP: ${this.state.bossHP}/${boss.hp}`, 'warning');
        this.puzzle.startBossBattle(boss); // New round
    }
}

defeatBoss(boss, bossState) {
    // 🎺 EPIC VICTORY SOUND
    soundManager.playBossDefeat();
    
    bossState.defeated = true;
    this.state.currentBoss = null;
    this.state.bossHP = 0;
    
    this.state.gems += boss.rewards.gems;
    this.state.crystals += boss.rewards.crystals;
    this.state.energy += boss.rewards.energy;
    this.trackReward('gems', boss.rewards.gems);
    this.trackReward('crystals', boss.rewards.crystals);
    
    this.state.statistics.totalBossesDefeated++;
    this.updateQuestProgress('defeat', 'bosses', 1);
    
    if (boss.rewards.guaranteedGuardian) {
        const rarity = boss.rewards.guaranteedGuardian;
        const available = this.guardianTemplates.filter(g => g.rarity === rarity);
        const template = available[Math.floor(Math.random() * available.length)];
        const newGuardian = { ...template };
        this.state.guardians.push(newGuardian);
        
        this.calculateEnergyPerSecond();
        this.renderGuardians();
    }
    
    // ⭐ MASSIVE VICTORY EFFECT
    particleSystem.screenShake(1000, 20);
    
    // Multiple bursts
    for (let i = 0; i < 5; i++) {
        setTimeout(() => {
            const x = Math.random() * window.innerWidth;
            const y = Math.random() * window.innerHeight;
            particleSystem.burst(x, y, 30, '🏆');
        }, i * 200);
    }
    
    this.showBossVictory(boss);
    this.renderBosses();
    this.updateUI();
    this.saveGame();
}

showBossVictory(boss) {
    const modal = document.createElement('div');
    modal.className = 'boss-victory-modal';
    modal.innerHTML = `
        <div class="boss-victory-content">
            <h2>🏆 BOSS DEFEATED!</h2>
            <div class="boss-victory-icon">${boss.icon}</div>
            <h3>${boss.name}</h3>
            <div class="boss-victory-rewards">
                <h4>Rewards:</h4>
                <p>${boss.rewards.gems} 💎</p>
                <p>${boss.rewards.crystals} 💠</p>
                <p>${this.formatNumber(boss.rewards.energy)} ⚡</p>
                ${boss.rewards.guaranteedGuardian ? 
                    `<p>✨ ${this.getRarityName(boss.rewards.guaranteedGuardian)} Guardian</p>` : ''
                }
                ${boss.rewards.specialReward ? 
                    `<p>🎖️ ${boss.rewards.specialReward}</p>` : ''
                }
            </div>
            <button onclick="this.parentElement.parentElement.remove()">Continue</button>
        </div>
    `;
    
    document.body.appendChild(modal);
}
    
    canAscend() {
        const requirement = this.config.ascensionRequirement * Math.pow(this.config.ascensionScaleFactor, this.state.ascensionLevel);
        return this.state.lifetimeEnergy >= requirement;
    }
    
    ascend() {
    if (!this.canAscend()) {
        soundManager.playError();
        this.showToast('❌ Nu ai suficientă energie lifetime pentru ascensiune!', 'error');
        return;
    }
    
    const requirement = this.config.ascensionRequirement * Math.pow(this.config.ascensionScaleFactor, this.state.ascensionLevel);
    const previewBonus = (this.state.ascensionLevel + 1) * 25;
    
    if (!confirm(`Vrei să faci ascensiune?\n\n📊 Progres resetat: Structuri + Upgrade-uri + Questuri\n✅ Păstrat: ${this.state.guardians.length} Gardieni | ${Math.floor(this.state.gems * 0.25)} 💎\n\n🌟 Bonus nou: +${previewBonus}% productie | +${(this.state.ascensionLevel + 1) * 100}% capacitate\n\nUrmătoarea ascendenta necesită: ${this.formatNumber(requirement * this.config.ascensionScaleFactor)} ⚡ lifetime`)) {
        return;
    }
    
    soundManager.playAscension();
    
    // Pastreaza gardieni (top 50% dupa bonus)
    const sortedGuardians = [...this.state.guardians].sort((a, b) => b.bonus - a.bonus);
    const keepCount = Math.ceil(sortedGuardians.length / 2);
    const keptGuardians = sortedGuardians.slice(0, keepCount);
    
    // Pastreaza 25% gemuri
    const keptGems = Math.floor(this.state.gems * 0.25);
    
    // Pastreaza achievements si stats
    const savedAchievements = { ...this.state.achievements };
    const savedStats = { ...this.state.statistics };
    const savedPuzzleStats = { ...this.state.puzzleStats };
    const savedBosses = { ...this.state.bosses };
    
    // RESET — structuri, upgrades, questuri
    this.state.energy = 0;
    this.state.mana = 0;
    this.state.coins = 0;
    this.state.gems = keptGems;
    this.state.crystals = Math.floor(this.state.crystals * 0.5); // Pastreaza 50% cristale
    
    for (let key in this.state.structures) {
        this.state.structures[key].level = 0;
    }
    
    for (let key in this.state.upgrades) {
        this.state.upgrades[key].level = 0;
    }
    
    this.state.guardians = keptGuardians;
    this.state.activeQuests = [];
    this.state.completedQuestsToday = 0;
    
    // Restaura achievements, stats, puzzle, bosses
    this.state.achievements = savedAchievements;
    this.state.statistics = savedStats;
    this.state.puzzleStats = savedPuzzleStats;
    this.state.bosses = savedBosses;
    
    this.state.ascensionLevel++;
    this.state.ascensionPoints += Math.floor(Math.sqrt(this.state.lifetimeEnergy / 10000));
    
    this.calculateEnergyPerSecond();
    this.calculateResourceCaps();
    this.generateQuests();
    
    this.renderStructures();
    this.renderUpgrades();
    this.renderGuardians();
    this.renderQuests();
    this.updateUI();
    
    this.showToast(`🌟 Ascensiune completă! Nivel ${this.state.ascensionLevel} | +${this.state.ascensionLevel * 25}% productie`, 'success');
    this.saveGame();
}
    
    calculateOfflineProgress() {
    const now = Date.now();
    const timeDiff = now - this.state.lastSave;
    
    if (timeDiff < 60000) return;
    
    const offlineLevel = this.state.upgrades.offlineBonus ? this.state.upgrades.offlineBonus.level : 0;
    let maxOfflineTime = this.config.maxOfflineTime;
    
    if (offlineLevel > 0) {
        maxOfflineTime *= Math.pow(1.8, offlineLevel);
    }
    
    const offlineTime = Math.min(timeDiff, maxOfflineTime);
    const offlineSeconds = offlineTime / 1000;
    
    // ⭐ IA DIRECT DIN STATE (deja calculat)
    let energyPerSecond = this.state.energyPerSecond || 0;
    let manaPerSecond = this.state.manaPerSecond || 0;
    
    const autoCollectLevel = this.state.upgrades.autoCollect ? this.state.upgrades.autoCollect.level : 0;
    if (autoCollectLevel > 0) {
        energyPerSecond *= Math.pow(2, autoCollectLevel);
        manaPerSecond *= Math.pow(2, autoCollectLevel);
    }
    
    // Reducere offline - 60% din producție (base)
    const energyEarned = Math.floor(energyPerSecond * offlineSeconds * 0.4);
    const manaEarned = Math.floor(manaPerSecond * offlineSeconds * 0.4);
    
    this.state.energy = Math.min(this.state.energy + energyEarned, this.state.energyCap);
    this.state.mana = Math.min(this.state.mana + manaEarned, this.state.manaCap);
    this.state.lifetimeEnergy += energyEarned;
    
    // AUTO-COLLECT SKIP MODAL
    if (this.state.autoFeatures && this.state.autoFeatures.autoCollectOffline && this.state.autoFeatures.autoCollectOffline.enabled) {
        this.showToast(`🤖 Auto-collected: ${this.formatNumber(energyEarned)} ⚡ + ${this.formatNumber(manaEarned)} 💙`, 'success');
    } else {
        this.showOfflineNotification(offlineTime, energyEarned, manaEarned);
    }
}
    
    showOfflineNotification(time, energy, mana) {
        const notification = document.getElementById('offline-notification');
        const timeStr = this.formatTime(time);
        
        document.getElementById('offline-time').textContent = timeStr;
        document.getElementById('offline-energy').textContent = `${this.formatNumber(energy)} ⚡ + ${this.formatNumber(mana)} 💙`;
        
        notification.style.display = 'flex';
    }
    
    closeOfflineNotification() {
        document.getElementById('offline-notification').style.display = 'none';
    }
    
    saveGame() {
        try {
            const saveData = {
                state: this.state,
                timestamp: Date.now(),
                version: '2.2'
            };
            
            localStorage.setItem('mysticRealms_save', JSON.stringify(saveData));
            this.state.lastSave = Date.now();
            
            console.log('✅ Game saved');
        } catch (error) {
            console.error('❌ Save failed:', error);
        }
    }
    
    loadGame() {
    try {
        const saved = localStorage.getItem('mysticRealms_save');
        
        if (saved) {
            const saveData = JSON.parse(saved);
            
            // MIGRATION - Add missing upgrades
            if (!saveData.state.upgrades.energyCap) {
                saveData.state.upgrades.energyCap = { level: 0, maxLevel: 20, multiplier: 1.5, baseCost: 100, costResource: 'energy' };
                console.log('🔄 Migration: Added energyCap');
            }
            
            if (!saveData.state.upgrades.manaCap) {
                saveData.state.upgrades.manaCap = { level: 0, maxLevel: 20, multiplier: 1.5, baseCost: 100, costResource: 'mana' };
                console.log('🔄 Migration: Added manaCap');
            }
            
            // ⭐ ADAUGĂ ASTA
            // MIGRATION - Add bosses system
            if (!saveData.state.bosses) {
                saveData.state.bosses = {};
                console.log('🔄 Migration: Added bosses system');
            }
            
            if (saveData.state.currentBoss === undefined) {
                saveData.state.currentBoss = null;
            }
            
            if (saveData.state.bossHP === undefined) {
                saveData.state.bossHP = 0;
            }

            // În loadGame(), adaugă după alte migrări:

// ⭐ MIGRATION - Auto features
if (!saveData.state.autoFeatures) {
    saveData.state.autoFeatures = {
        autoBuyStructures: { enabled: false, unlocked: false, cost: 500 },
        autoClaimQuests: { enabled: false, unlocked: false, cost: 300 },
        autoCollectOffline: { enabled: true, unlocked: true, cost: 0 },
                autoPuzzle: { enabled: false, unlocked: false, cost: 1000 }
    };
    console.log('🔄 Migration: Added auto features');
}

// ⭐ MIGRATION - Settings
if (!saveData.state.settings) {
    saveData.state.settings = {
        theme: 'dark',
        soundEnabled: true,
        musicEnabled: true,
        notificationsEnabled: true,
        particleQuality: 'high',
        autoSaveEnabled: true,
        showFPS: false
    };
    
    console.log('🔄 Migration: Added settings');
}

// ⭐ MIGRATION - Statistics
if (!saveData.state.statistics) {
    saveData.state.statistics = {
        totalEnergyGenerated: 0,
        totalManaGenerated: 0,
        totalVolcanicEnergyGenerated: 0,
        totalGemsEarned: 0,
        totalGemsSpent: 0,
        totalCrystalsEarned: 0,
        totalStructuresBought: 0,
        totalUpgradesBought: 0,
        totalGuardiansUnlocked: 0,
        totalQuestsCompleted: 0,
        totalPuzzlesCompleted: 0,
        totalBossesDefeated: 0,
        totalAchievementsUnlocked: 0,
        highestEnergyPerSecond: 0,
        fastestPuzzleTime: Infinity,
        longestSession: 0,
        totalClicks: 0,
        favoriteStructure: '',
        mostPowerfulGuardian: null,
        firstPlayDate: Date.now(),
        sessionsPlayed: 0,
        energyHistory: [],
        sessionHistory: []
    };
    console.log('🔄 Migration: Added statistics');
}

// ⭐ MIGRATION - Shop
if (!saveData.state.shop) {
    saveData.state.shop = {
        lastDailyDealRefresh: 0,
        purchaseHistory: [],
        vipActive: false,
        vipExpiry: 0,
        totalSpent: 0,
        adsWatchedToday: 0,
        lastAdResetDate: 0,
        limitedOffers: [],
        specialBundles: []
    };
    console.log('🔄 Migration: Added shop');
}

// Increment sessions
if (saveData.state.statistics.sessionsPlayed !== undefined) {
    saveData.state.statistics.sessionsPlayed++;
}

if (saveData.state.totalPlayTime === undefined) {
    saveData.state.totalPlayTime = 0;
}

if (saveData.state.autoBuyThreshold === undefined) {
    saveData.state.autoBuyThreshold = 0.8;
}

if (!saveData.state.weeklyQuest) saveData.state.weeklyQuest = null;
if (saveData.state.lastQuestRefresh === undefined) saveData.state.lastQuestRefresh = 0;
if (saveData.state.lastWeeklyRefresh === undefined) saveData.state.lastWeeklyRefresh = 0;

            if (!saveData.state.volcanoStructures) {
                saveData.state.volcanoStructures = {
                    lava_forge: { level: 0 },
                    magma_extractor: { level: 0 },
                    fire_temple: { level: 0 },
                    inferno_reactor: { level: 0 },
                    phoenix_nest: { level: 0 }
                };
                console.log('🔄 Migration: Added volcano structures');
            }
            
            if (saveData.state.currentRealm === undefined) saveData.state.currentRealm = 'forest';
            if (saveData.state.volcanicEnergy === undefined) saveData.state.volcanicEnergy = 0;
            if (saveData.state.volcanicEnergyCap === undefined) saveData.state.volcanicEnergyCap = 5000;
            if (saveData.state.volcanicEnergyPerSecond === undefined) saveData.state.volcanicEnergyPerSecond = 0;
            if (saveData.state.volcanoUnlocked === undefined) saveData.state.volcanoUnlocked = false;
            
            // Fix NaN gems
            if (!saveData.state.gems || isNaN(saveData.state.gems)) {
                saveData.state.gems = 10;
                console.log('🔄 Migration: Fixed gems');
            }
            
            // Add missing properties
            if (saveData.state.energyCap === undefined) saveData.state.energyCap = 25000;
            if (saveData.state.manaCap === undefined) saveData.state.manaCap = 5000;
            if (saveData.state.mana === undefined) saveData.state.mana = 0;
            if (saveData.state.lifetimeEnergy === undefined) saveData.state.lifetimeEnergy = 0;
            if (saveData.state.ascensionLevel === undefined) saveData.state.ascensionLevel = 0;
            
            this.state = { ...this.state, ...saveData.state };
            this.state.lastSave = saveData.timestamp;
            
            this.calculateEnergyPerSecond();
            this.calculateResourceCaps();
            
            console.log('✅ Game loaded');
        }
    } catch (error) {
        console.error('❌ Load failed:', error);
    }
}
    
    startAutoSave() {
    this.autoSaveInterval = setInterval(() => {  // ← ADĂUGAT this.autoSaveInterval =
        // ⭐ VERIFICĂ dacă auto-save e enabled
        if (this.state.settings.autoSaveEnabled) {
            this.saveGame();
        }
    }, this.config.saveInterval);
}
    
    resetGame() {
        if (confirm('Sigur vrei să resetezi complet jocul? TOT progresul va fi pierdut!')) {
            localStorage.removeItem('mysticRealms_save');
            localStorage.removeItem('tutorialCompleted');
            localStorage.removeItem('tutorialCompletions');
            localStorage.removeItem('soundSettings');
            location.reload();
        }
    }
    
    updateUI() {
    document.getElementById('energy-display').textContent = `${this.formatNumber(this.state.energy)}/${this.formatNumber(this.state.energyCap)}`;
    document.getElementById('gems-display').textContent = this.formatNumber(this.state.gems);
    
    // Energy progress bar
    const energyBarFill = document.getElementById('energy-bar-fill');
    if (energyBarFill) {
        const energyPct = Math.min(100, (this.state.energy / this.state.energyCap) * 100);
        energyBarFill.style.width = energyPct + '%';
        if (energyPct >= 100) {
            energyBarFill.classList.add('cap-reached');
        } else {
            energyBarFill.classList.remove('cap-reached');
        }
    }
    
    // Mana display
    let manaDisplay = document.getElementById('mana-display');
    if (manaDisplay) {
        manaDisplay.textContent = `${this.formatNumber(this.state.mana)}/${this.formatNumber(this.state.manaCap)}`;
    }
    
    // Mana progress bar
    const manaBarFill = document.getElementById('mana-bar-fill');
    if (manaBarFill) {
        const manaPct = Math.min(100, (this.state.mana / this.state.manaCap) * 100);
        manaBarFill.style.width = manaPct + '%';
        if (manaPct >= 100) {
            manaBarFill.classList.add('cap-reached');
        } else {
            manaBarFill.classList.remove('cap-reached');
        }
    }
    
    // ⭐ ADAUGĂ VOLCANIC ENERGY DISPLAY
    if (this.state.volcanoUnlocked) {
        let volcanicDisplay = document.getElementById('volcanic-display');
        if (!volcanicDisplay) {
            const resourcesDiv = document.querySelector('.resources');
            const volcanicItem = document.createElement('div');
            volcanicItem.className = 'resource-item volcanic-resource';
            volcanicItem.title = 'Volcanic Energy';
            volcanicItem.innerHTML = `
                <span class="resource-icon">🌋</span>
                <span id="volcanic-display">0</span>
            `;
            resourcesDiv.appendChild(volcanicItem);
            volcanicDisplay = document.getElementById('volcanic-display');
        }
        volcanicDisplay.textContent = `${this.formatNumber(this.state.volcanicEnergy)}/${this.formatNumber(this.state.volcanicEnergyCap)}`;
    }
    
    if (this.state.crystals > 0) {
        let crystalsDisplay = document.getElementById('crystals-display');
        if (!crystalsDisplay) {
            const resourcesDiv = document.querySelector('.resources');
            const crystalsItem = document.createElement('div');
            crystalsItem.className = 'resource-item';
            crystalsItem.title = 'Cristale';
            crystalsItem.innerHTML = `
                <span class="resource-icon">💠</span>
                <span id="crystals-display">0</span>
            `;
            resourcesDiv.appendChild(crystalsItem);
            crystalsDisplay = document.getElementById('crystals-display');
        }
        crystalsDisplay.textContent = this.formatNumber(this.state.crystals);
    }
    
    // ⭐ MODIFICĂ PRODUCȚIA AFIȘATĂ
    let productionText = `+${this.formatNumber(this.state.energyPerSecond)}/s ⚡ | +${this.formatNumber(this.state.manaPerSecond)}/s 💙`;
    
    if (this.state.volcanoUnlocked) {
        productionText += ` | +${this.formatNumber(this.state.volcanicEnergyPerSecond)}/s 🌋`;
    }
    
    document.getElementById('energy-per-second').textContent = productionText;
    
    this.updateRealmSelector();
    this.updateAscensionButton();
}

updateRealmSelector() {
    let selector = document.querySelector('.realm-selector');
    
    if (!selector) {
        const realmHeader = document.querySelector('.realm-header');
        if (!realmHeader) return;
        
        selector = document.createElement('div');
        selector.className = 'realm-selector';
        realmHeader.appendChild(selector);
    }
    
    selector.innerHTML = '';
    
    for (let [id, realm] of Object.entries(this.realmDefinitions)) {
        const btn = document.createElement('button');
        btn.className = `realm-btn ${this.state.currentRealm === id ? 'active' : ''} ${!realm.unlocked && !this.state.volcanoUnlocked ? 'locked' : ''}`;
        
        if (id === 'volcano' && !this.state.volcanoUnlocked) {
            btn.innerHTML = `
                <span class="realm-icon">🔒</span>
                <span class="realm-name">???</span>
                <span class="realm-cost">50 💠</span>
            `;
            btn.onclick = () => this.unlockVolcano();
        } else {
            btn.innerHTML = `
                <span class="realm-icon">${realm.icon}</span>
                <span class="realm-name">${realm.name}</span>
            `;
            btn.onclick = () => this.switchRealm(id);
        }
        
        selector.appendChild(btn);
    }
}

// ===== AUTO-FEATURES =====

toggleAutoFeature(featureKey) {
    const feature = this.state.autoFeatures[featureKey];
    
    if (!feature.unlocked) {
        // Try to unlock
        if (this.state.gems >= feature.cost) {
            if (confirm(`Unlock ${this.getAutoFeatureName(featureKey)} for ${feature.cost} 💎?`)) {
                this.state.gems -= feature.cost;
                feature.unlocked = true;
                feature.enabled = true;
                
                particleSystem.burst(window.innerWidth / 2, window.innerHeight / 2, 30, '🤖');
                this.showToast(`✅ ${this.getAutoFeatureName(featureKey)} unlocked!`, 'success');
            }
        } else {
            particleSystem.screenShake(300, 5);
            this.showToast(`❌ Need ${feature.cost} 💎 to unlock!`, 'error');
        }
    } else {
        // Toggle enabled state
        feature.enabled = !feature.enabled;
        this.showToast(`${feature.enabled ? '✅' : '⏸️'} ${this.getAutoFeatureName(featureKey)} ${feature.enabled ? 'enabled' : 'disabled'}`, 'info');
    }
    
    this.renderAutoSettings();
    this.updateUI();
    this.saveGame();
}

renderAutoSettings() {
    const container = document.querySelector('.auto-settings-grid');
    if (!container) return;
    
    container.innerHTML = '';
    
    for (let [key, feature] of Object.entries(this.state.autoFeatures)) {
        const card = document.createElement('div');
        card.className = `auto-feature-card ${feature.unlocked ? 'unlocked' : 'locked'}`;
        
        card.innerHTML = `
            <div class="auto-feature-header">
                <div class="auto-feature-icon">${feature.enabled ? '🤖' : '⏸️'}</div>
                <div class="auto-feature-info">
                    <h3>${this.getAutoFeatureName(key)}</h3>
                    <p>${this.getAutoFeatureDescription(key)}</p>
                </div>
            </div>
            
            ${!feature.unlocked ? `
                <div class="auto-feature-cost">
                    <strong>Cost:</strong> ${feature.cost} 💎
                </div>
                <button class="unlock-auto-btn" onclick="game.toggleAutoFeature('${key}')">
                    🔓 Unlock
                </button>
            ` : `
                <div class="auto-feature-toggle">
                    <label class="toggle-switch">
                        <input type="checkbox" ${feature.enabled ? 'checked' : ''} 
                               onchange="game.toggleAutoFeature('${key}')">
                        <span class="toggle-slider"></span>
                    </label>
                    <span class="toggle-label">${feature.enabled ? 'Enabled' : 'Disabled'}</span>
                </div>
            `}
        `;
        
        container.appendChild(card);
    }
}

getAutoFeatureName(key) {
    const names = {
        autoBuyStructures: 'Auto-Buy Structures',
        autoClaimQuests: 'Auto-Claim Quests',
        autoCollectOffline: 'Auto-Collect Offline',
        autoPuzzle: 'Auto-Puzzle'
    };
    return names[key] || key;
}

getAutoFeatureDescription(key) {
    const descriptions = {
        autoBuyStructures: 'Automatically purchases cheapest structure when you have 80% of energy cap',
        autoClaimQuests: 'Automatically claims completed quests and generates new ones',
        autoCollectOffline: 'Automatically collects offline progress when you return',
        autoPuzzle: 'Automatically plays puzzles every 60 seconds (requires 5 gems per puzzle)'
    };
    return descriptions[key] || '';
}

// Auto-buy: find cheapest affordable structure
autoBuyCheapestStructure() {
    if (!this.state.autoFeatures.autoBuyStructures.enabled) return;
    let cheapestKey = null;
    let cheapestCost = Infinity;
    for (const [key] of Object.entries(this.state.structures)) {
        const cost = this.getStructureCost(key);
        if (cost < cheapestCost && this.state.energy >= cost) {
            cheapestCost = cost;
            cheapestKey = key;
        }
    }
    if (cheapestKey) this.autobuyStructure(cheapestKey);
}

// Auto-buy logic
autobuyStructure(structureKey) {
    const cost = this.getStructureCost(structureKey);
    
    if (this.state.energy >= cost) {
        soundManager.playPurchase();
        
        this.state.energy -= cost;
        this.state.structures[structureKey].level++;
        
        this.state.statistics.totalStructuresBought++;
        this.state.statistics.totalClicks++;
        this.updateQuestProgress('click', 'any', 1);
        this.updateFavoriteStructure(structureKey);
        
        this.calculateEnergyPerSecond();
        this.calculateResourceCaps();
        this.renderStructures();
        this.updateUI();
        
        this.updateQuestProgress('buy', 'structures', 1);
        this.updateQuestProgress('upgrade', 'any', 1);
        
        // FIX: Check if event exists
        let x = window.innerWidth / 2;
        let y = window.innerHeight / 2;
        
        if (typeof event !== 'undefined' && event && event.target) {
            const btn = event.target;
            const rect = btn.getBoundingClientRect();
            x = rect.left + rect.width / 2;
            y = rect.top + rect.height / 2;
        }
        
        particleSystem.burst(x, y, 15, this.structureData[structureKey].icon);
        particleSystem.floatingNumber(x, y - 30, `+${this.formatNumber(this.getStructureProduction(structureKey))}/s`, '#10b981');
        
        this.showToast(`✅ ${this.structureData[structureKey].name} îmbunătățit!`, 'success');
        this.saveGame();
    } else {
        soundManager.playError();
        particleSystem.screenShake(300, 5);
        this.showToast('❌ Energie insuficientă!', 'error');
    }
}

// Auto-claim quests
autoClaimQuests() {
    if (!this.state.autoFeatures.autoClaimQuests.enabled) return;
    
    const completedQuests = this.state.activeQuests.filter(q => q.completed);
    
    for (let quest of completedQuests) {
        this.claimQuest(quest.id);
    }
}

// Auto-puzzle (expensive feature)
autoPuzzlePlay() {
    if (!this.state.autoFeatures.autoPuzzle.enabled) return;
    if (this.puzzle.state.isProcessing) return;
    
    const cost = 5; // 5 gems per auto-puzzle
    
    if (this.state.gems < cost) {
        this.state.autoFeatures.autoPuzzle.enabled = false;
        this.showToast('⏸️ Auto-Puzzle paused - not enough gems', 'warning');
        this.renderAutoSettings();
        return;
    }
    
    this.state.gems -= cost;
    
    // Simulate puzzle completion
    const simulatedScore = Math.floor(Math.random() * 200) + 150; // 150-350 score
    
    if (simulatedScore >= this.puzzle.state.target) {
        this.puzzle.state.score = simulatedScore;
        this.puzzle.gameWon();
    } else {
        // Failed, try again next interval
        this.showToast(`🤖 Auto-Puzzle: ${simulatedScore}/${this.puzzle.state.target}`, 'info');
    }
}

// ===== SETTINGS MENU =====

showSettingsModal() {
    // Create modal if doesn't exist
    let modal = document.getElementById('settings-modal');
    
    if (!modal) {
        modal = document.createElement('div');
        modal.id = 'settings-modal';
        modal.className = 'settings-modal';
        modal.innerHTML = `
            <div class="settings-content">
                <div class="settings-header">
                    <h2>⚙️ Settings</h2>
                    <button class="close-settings" onclick="game.closeSettingsModal()">✖</button>
                </div>
                
                <div class="settings-body">
                    <!-- Theme -->
                    <div class="setting-item">
                        <div class="setting-label">
                            <span class="setting-icon">🎨</span>
                            <div>
                                <strong>Theme</strong>
                                <p>Change visual theme</p>
                            </div>
                        </div>
                        <select id="theme-select" onchange="game.changeTheme(this.value)">
                            <option value="dark">Dark</option>
                            <option value="light">Light</option>
                        </select>
                    </div>
                    
                    <!-- Sound -->
                    <div class="setting-item">
                        <div class="setting-label">
                            <span class="setting-icon">🔊</span>
                            <div>
                                <strong>Sound Effects</strong>
                                <p>Toggle sound effects</p>
                            </div>
                        </div>
                        <label class="toggle-switch">
                            <input type="checkbox" id="sound-toggle" onchange="game.toggleSound(this.checked)">
                            <span class="toggle-slider"></span>
                        </label>
                    </div>
                    
                    <!-- Music -->
                    <div class="setting-item">
                        <div class="setting-label">
                            <span class="setting-icon">🎵</span>
                            <div>
                                <strong>Music</strong>
                                <p>Toggle background music</p>
                            </div>
                        </div>
                        <label class="toggle-switch">
                            <input type="checkbox" id="music-toggle" onchange="game.toggleMusic(this.checked)">
                            <span class="toggle-slider"></span>
                        </label>
                    </div>
                    
                    <!-- Notifications -->
                    <div class="setting-item">
                        <div class="setting-label">
                            <span class="setting-icon">🔔</span>
                            <div>
                                <strong>Notifications</strong>
                                <p>Show achievement/event popups</p>
                            </div>
                        </div>
                        <label class="toggle-switch">
                            <input type="checkbox" id="notifications-toggle" onchange="game.toggleNotifications(this.checked)">
                            <span class="toggle-slider"></span>
                        </label>
                    </div>
                    
                    <!-- Particle Quality -->
                    <div class="setting-item">
                        <div class="setting-label">
                            <span class="setting-icon">✨</span>
                            <div>
                                <strong>Particle Effects</strong>
                                <p>Adjust visual effects quality</p>
                            </div>
                        </div>
                        <select id="particle-quality-select" onchange="game.changeParticleQuality(this.value)">
                            <option value="low">Low</option>
                            <option value="medium">Medium</option>
                            <option value="high">High</option>
                        </select>
                    </div>
                    
                    <!-- Auto-Save -->
                    <div class="setting-item">
                        <div class="setting-label">
                            <span class="setting-icon">💾</span>
                            <div>
                                <strong>Auto-Save</strong>
                                <p>Automatically save every 10 seconds</p>
                            </div>
                        </div>
                        <label class="toggle-switch">
                            <input type="checkbox" id="autosave-toggle" onchange="game.toggleAutoSave(this.checked)">
                            <span class="toggle-slider"></span>
                        </label>
                    </div>
                    
                    <!-- Show FPS -->
                    <div class="setting-item">
                        <div class="setting-label">
                            <span class="setting-icon">📊</span>
                            <div>
                                <strong>Show FPS</strong>
                                <p>Display frame rate counter</p>
                            </div>
                        </div>
                        <label class="toggle-switch">
                            <input type="checkbox" id="fps-toggle" onchange="game.toggleFPS(this.checked)">
                            <span class="toggle-slider"></span>
                        </label>
                    </div>
                    
                    <!-- Save Management -->
                    <div class="setting-section">
                        <h3>💾 Save Management</h3>
                        
                        <button class="setting-btn export-btn" onclick="game.exportSave()">
                            📤 Export Save
                        </button>
                        
                        <button class="setting-btn import-btn" onclick="game.importSave()">
                            📥 Import Save
                        </button>
                        
                        <button class="setting-btn save-btn" onclick="game.manualSave()">
                            💾 Save Now
                        </button>
                        
                        <button class="setting-btn danger-btn" onclick="game.confirmReset()">
                            🔄 Reset Game
                        </button>
                    </div>
                    
                    <!-- Game Info -->
                    <div class="setting-section game-info">
                        <h3>ℹ️ Game Info</h3>
                        <div class="info-grid">
                            <div class="info-item">
                                <span>Version:</span>
                                <strong>2.3</strong>
                            </div>
                            <div class="info-item">
                                <span>Playtime:</span>
                                <strong id="playtime-display">0h 0m</strong>
                            </div>
                            <div class="info-item">
                                <span>Last Save:</span>
                                <strong id="lastsave-display">Never</strong>
                            </div>
                            <div class="info-item">
                                <span>Save Size:</span>
                                <strong id="savesize-display">0 KB</strong>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
    }
    
    // Update values
    this.updateSettingsUI();
    
    // Show modal
    modal.style.display = 'flex';
}

closeSettingsModal() {
    const modal = document.getElementById('settings-modal');
    if (modal) {
        modal.style.display = 'none';
    }
}

updateSettingsUI() {
    // Theme
    const themeSelect = document.getElementById('theme-select');
    if (themeSelect) themeSelect.value = this.state.settings.theme;
    
    // Sound
    const soundToggle = document.getElementById('sound-toggle');
    if (soundToggle) soundToggle.checked = this.state.settings.soundEnabled;
    
    // Music
    const musicToggle = document.getElementById('music-toggle');
    if (musicToggle) musicToggle.checked = this.state.settings.musicEnabled;
    
    // Notifications
    const notificationsToggle = document.getElementById('notifications-toggle');
    if (notificationsToggle) notificationsToggle.checked = this.state.settings.notificationsEnabled;
    
    // Particle Quality
    const particleSelect = document.getElementById('particle-quality-select');
    if (particleSelect) particleSelect.value = this.state.settings.particleQuality;
    
    // Auto-Save
    const autoSaveToggle = document.getElementById('autosave-toggle');
    if (autoSaveToggle) autoSaveToggle.checked = this.state.settings.autoSaveEnabled;
    
    // FPS
    const fpsToggle = document.getElementById('fps-toggle');
    if (fpsToggle) fpsToggle.checked = this.state.settings.showFPS;
    
    // Game Info
    this.updateGameInfo();
}

updateGameInfo() {
    // Playtime
    const playtimeDisplay = document.getElementById('playtime-display');
    if (playtimeDisplay) {
        const hours = Math.floor(this.state.totalPlayTime / 3600000);
        const minutes = Math.floor((this.state.totalPlayTime % 3600000) / 60000);
        playtimeDisplay.textContent = `${hours}h ${minutes}m`;
    }
    
    // Last Save
    const lastSaveDisplay = document.getElementById('lastsave-display');
    if (lastSaveDisplay) {
        const timeSince = Date.now() - this.state.lastSave;
        if (timeSince < 60000) {
            lastSaveDisplay.textContent = 'Just now';
        } else if (timeSince < 3600000) {
            lastSaveDisplay.textContent = `${Math.floor(timeSince / 60000)}m ago`;
        } else {
            lastSaveDisplay.textContent = `${Math.floor(timeSince / 3600000)}h ago`;
        }
    }
    
    // Save Size
    const saveSizeDisplay = document.getElementById('savesize-display');
    if (saveSizeDisplay) {
        const saved = localStorage.getItem('mysticRealms_save');
        if (saved) {
            const sizeKB = (saved.length / 1024).toFixed(2);
            saveSizeDisplay.textContent = `${sizeKB} KB`;
        }
    }
}

// Setting Functions
changeTheme(theme) {
    this.state.settings.theme = theme;
    
    const body = document.body;
    
    if (theme === 'light') {
        body.style.background = 'linear-gradient(135deg, #f3f4f6 0%, #e5e7eb 100%)';
        body.style.color = '#1f2937';
        document.documentElement.style.setProperty('--text-primary', '#1f2937');
        document.documentElement.style.setProperty('--text-secondary', '#6b7280');
        document.documentElement.style.setProperty('--card-bg', '#ffffff');
        document.documentElement.style.setProperty('--dark-bg', '#f9fafb');
    } else {
        body.style.background = 'linear-gradient(135deg, #1e1b4b 0%, #312e81 100%)';
        body.style.color = '#f8fafc';
        document.documentElement.style.setProperty('--text-primary', '#f8fafc');
        document.documentElement.style.setProperty('--text-secondary', '#cbd5e1');
        document.documentElement.style.setProperty('--card-bg', '#2d2a5a');
        document.documentElement.style.setProperty('--dark-bg', '#1e1b4b');
    }
    
    this.showToast(`🎨 Theme changed to ${theme}`, 'success');
    this.saveGame();
}

toggleSound(enabled) {
    this.state.settings.soundEnabled = enabled;
    soundManager.enabled = enabled;
    this.showToast(`🔊 Sound ${enabled ? 'enabled' : 'disabled'}`, 'info');
    this.saveGame();
}

toggleMusic(enabled) {
    this.state.settings.musicEnabled = enabled;
    soundManager.musicEnabled = enabled;
    if (enabled) {
        soundManager.startBackgroundMusic();
    } else {
        soundManager.stopBackgroundMusic();
    }
    this.showToast(`🎵 Music ${enabled ? 'enabled' : 'disabled'}`, 'info');
    this.saveGame();
}

toggleNotifications(enabled) {
    this.state.settings.notificationsEnabled = enabled;
    this.showToast(`🔔 Notifications ${enabled ? 'enabled' : 'disabled'}`, 'info');
    this.saveGame();
}

changeParticleQuality(quality) {
    this.state.settings.particleQuality = quality;
    
    // Adjust particle system
    if (particleSystem) {
        switch(quality) {
            case 'low':
                particleSystem.maxParticles = 50;
                break;
            case 'medium':
                particleSystem.maxParticles = 150;
                break;
            case 'high':
                particleSystem.maxParticles = 500;
                break;
        }
    }
    
    this.showToast(`✨ Particle quality: ${quality}`, 'success');
    this.saveGame();
}

toggleAutoSave(enabled) {
    this.state.settings.autoSaveEnabled = enabled;
    this.showToast(`💾 Auto-save ${enabled ? 'enabled' : 'disabled'}`, 'info');
    this.saveGame();
}

toggleFPS(enabled) {
    this.state.settings.showFPS = enabled;
    
    if (enabled) {
        this.startFPSCounter();
    } else {
        this.stopFPSCounter();
    }
    
    this.saveGame();
}

// ===== STATISTICS FUNCTIONS =====

updateEnergyHistory() {
    const dataPoint = {
        timestamp: Date.now(),
        energy: Math.floor(this.state.energy),
        energyPerSecond: this.state.energyPerSecond,
        mana: Math.floor(this.state.mana)
    };
    
    this.state.statistics.energyHistory.push(dataPoint);
    
    // Keep only last 10
    if (this.state.statistics.energyHistory.length > 10) {
        this.state.statistics.energyHistory.shift();
    }
}

updateFavoriteStructure(structureKey) {
    // Track which structure is bought most
    if (!this.structureBuyCount) {
        this.structureBuyCount = {};
    }
    
    this.structureBuyCount[structureKey] = (this.structureBuyCount[structureKey] || 0) + 1;
    
    // Find most bought
    let maxCount = 0;
    let favorite = '';
    
    for (let key in this.structureBuyCount) {
        if (this.structureBuyCount[key] > maxCount) {
            maxCount = this.structureBuyCount[key];
            favorite = key;
        }
    }
    
    this.state.statistics.favoriteStructure = favorite;
}

updateMostPowerfulGuardian() {
    let mostPowerful = null;
    let highestBonus = 0;
    
    for (let guardian of this.state.guardians) {
        if (guardian.bonus > highestBonus) {
            highestBonus = guardian.bonus;
            mostPowerful = guardian;
        }
    }
    
    this.state.statistics.mostPowerfulGuardian = mostPowerful;
}

getStatisticsData() {
    const stats = this.state.statistics;
    
    return {
        production: [
            { label: 'Total Energy', value: this.formatNumber(stats.totalEnergyGenerated), icon: '⚡' },
            { label: 'Total Mana', value: this.formatNumber(stats.totalManaGenerated), icon: '💙' },
            { label: 'Total Volcanic', value: this.formatNumber(stats.totalVolcanicEnergyGenerated), icon: '🌋' },
            { label: 'Peak Energy/s', value: this.formatNumber(stats.highestEnergyPerSecond), icon: '📈' }
        ],
        currency: [
            { label: 'Gems Earned', value: this.formatNumber(stats.totalGemsEarned), icon: '💎' },
            { label: 'Gems Spent', value: this.formatNumber(stats.totalGemsSpent), icon: '💸' },
            { label: 'Net Gems', value: this.formatNumber(stats.totalGemsEarned - stats.totalGemsSpent), icon: '💰' },
            { label: 'Crystals Earned', value: this.formatNumber(stats.totalCrystalsEarned), icon: '💠' }
        ],
        activity: [
            { label: 'Structures Bought', value: stats.totalStructuresBought, icon: '🏗️' },
            { label: 'Upgrades Bought', value: stats.totalUpgradesBought, icon: '⬆️' },
            { label: 'Guardians Unlocked', value: stats.totalGuardiansUnlocked, icon: '👥' },
            { label: 'Total Clicks', value: this.formatNumber(stats.totalClicks), icon: '🖱️' }
        ],
        progress: [
            { label: 'Quests Completed', value: stats.totalQuestsCompleted, icon: '📜' },
            { label: 'Puzzles Completed', value: stats.totalPuzzlesCompleted, icon: '🧩' },
            { label: 'Bosses Defeated', value: stats.totalBossesDefeated, icon: '🐉' },
            { label: 'Achievements', value: stats.totalAchievementsUnlocked, icon: '🏆' }
        ],
        records: [
            { label: 'Fastest Puzzle', value: stats.fastestPuzzleTime === Infinity ? 'N/A' : `${stats.fastestPuzzleTime}s`, icon: '⏱️' },
            { label: 'Longest Session', value: this.formatTime(stats.longestSession), icon: '⏰' },
            { label: 'Sessions Played', value: stats.sessionsPlayed, icon: '🎮' },
            { label: 'Playing Since', value: new Date(stats.firstPlayDate).toLocaleDateString(), icon: '📅' }
        ]
    };
}

renderStatistics() {
    const container = document.querySelector('.statistics-container');
    if (!container) return;
    
    container.innerHTML = '';
    
    const data = this.getStatisticsData();
    
    // Create sections
    for (let [sectionKey, sectionData] of Object.entries(data)) {
        const section = document.createElement('div');
        section.className = 'stats-section';
        
        const title = sectionKey.charAt(0).toUpperCase() + sectionKey.slice(1);
        
        section.innerHTML = `
            <h3 class="stats-section-title">${this.getSectionIcon(sectionKey)} ${title}</h3>
            <div class="stats-grid">
                ${sectionData.map(stat => `
                    <div class="stat-card">
                        <div class="stat-icon">${stat.icon}</div>
                        <div class="stat-info">
                            <div class="stat-label">${stat.label}</div>
                            <div class="stat-value">${stat.value}</div>
                        </div>
                    </div>
                `).join('')}
            </div>
        `;
        
        container.appendChild(section);
    }
    
    // Add energy history chart
    this.renderEnergyChart();
    
    // Add special highlights
    this.renderHighlights();
}

// ===== SHOP & MONETIZATION =====

initShop() {
    // Check daily deal refresh
    this.checkDailyDealRefresh();
    
    // Check VIP expiry
    this.checkVIPStatus();
    
    // Generate limited offers if needed
    if (this.state.shop.limitedOffers.length === 0) {
        this.generateLimitedOffers();
    }
}

checkDailyDealRefresh() {
    const now = Date.now();
    const timeSince = now - this.state.shop.lastDailyDealRefresh;
    
    if (timeSince >= this.shopConfig.dailyDealDuration) {
        this.generateDailyDeal();
        this.state.shop.lastDailyDealRefresh = now;
    }
}

generateDailyDeal() {
    // Random package with 50% discount
    const randomPackage = this.iapPackages[Math.floor(Math.random() * this.iapPackages.length)];
    
    this.dailyDeal = {
        ...randomPackage,
        originalPrice: randomPackage.price,
        price: randomPackage.price * 0.5,
        discount: 50,
        expiresAt: Date.now() + this.shopConfig.dailyDealDuration
    };
}

checkVIPStatus() {
    if (this.state.shop.vipActive && Date.now() > this.state.shop.vipExpiry) {
        this.state.shop.vipActive = false;
        this.showToast('⚠️ VIP Status expired!', 'warning');
    }
}

generateLimitedOffers() {
    const now = Date.now();
    
    this.state.shop.limitedOffers = [
        {
            id: 'weekend_special',
            name: 'Weekend Special',
            icon: '🎊',
            gems: 5000,
            price: 7.99,
            originalPrice: 12.99,
            discount: 38,
            expiresAt: now + 259200000, // 3 days
            description: 'Limited time offer!'
        },
        {
            id: 'ascension_boost',
            name: 'Ascension Boost',
            icon: '🌟',
            gems: 3000,
            bonus: { crystals: 20 },
            price: 9.99,
            originalPrice: 14.99,
            discount: 33,
            expiresAt: now + 604800000, // 7 days
            description: 'Perfect for your next ascension!'
        }
    ];
}

purchasePackage(packageId) {
    const pkg = this.iapPackages.find(p => p.id === packageId);
    
    if (!pkg) {
        this.showToast('❌ Package not found!', 'error');
        return;
    }
    
    // MOCKUP - In production, this would trigger real IAP
    this.showPurchaseModal(pkg);
}

showPurchaseModal(pkg) {
    const modal = document.createElement('div');
    modal.className = 'purchase-modal';
    modal.innerHTML = `
        <div class="purchase-content">
            <div class="purchase-header">
                <h2>💳 Confirm Purchase</h2>
                <button class="close-modal" onclick="this.parentElement.parentElement.parentElement.remove()">✖</button>
            </div>
            
            <div class="purchase-body">
                <div class="package-preview">
                    <div class="package-icon">${pkg.icon}</div>
                    <h3>${pkg.name}</h3>
                    ${pkg.discount > 0 ? `
                        <div class="discount-badge">${pkg.discount}% OFF</div>
                    ` : ''}
                </div>
                
                <div class="package-contents">
                    <h4>You will receive:</h4>
                    <div class="rewards-list">
                        <div class="reward-item">
                            <span class="reward-icon">💎</span>
                            <span class="reward-amount">${this.formatNumber(pkg.gems)} Gems</span>
                        </div>
                        ${pkg.bonus.energy ? `
                            <div class="reward-item">
                                <span class="reward-icon">⚡</span>
                                <span class="reward-amount">${this.formatNumber(pkg.bonus.energy)} Energy</span>
                            </div>
                        ` : ''}
                        ${pkg.bonus.crystals ? `
                            <div class="reward-item">
                                <span class="reward-icon">💠</span>
                                <span class="reward-amount">${pkg.bonus.crystals} Crystals</span>
                            </div>
                        ` : ''}
                        ${pkg.bonus.guardian ? `
                            <div class="reward-item">
                                <span class="reward-icon">👥</span>
                                <span class="reward-amount">Guaranteed ${this.getRarityName(pkg.bonus.guardian)} Guardian</span>
                            </div>
                        ` : ''}
                    </div>
                </div>
                
                <div class="purchase-price">
                    ${pkg.discount > 0 ? `
                        <span class="original-price">$${pkg.price / (1 - pkg.discount/100)}</span>
                    ` : ''}
                    <span class="final-price">$${pkg.price}</span>
                </div>
                
                <div class="purchase-disclaimer">
                    <p>🛡️ This is a DEMO - No real money will be charged</p>
                    <p>In production, this would integrate with:</p>
                    <p>• Google Play Billing</p>
                    <p>• Apple App Store</p>
                    <p>• Stripe/PayPal for web</p>
                </div>
            </div>
            
            <div class="purchase-actions">
                <button class="cancel-purchase" onclick="this.parentElement.parentElement.parentElement.remove()">
                    Cancel
                </button>
                <button class="confirm-purchase" onclick="game.completeMockPurchase('${pkg.id}')">
                    🛒 Buy Now (DEMO)
                </button>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
}

completeMockPurchase(packageId) {
    const pkg = this.iapPackages.find(p => p.id === packageId);
    
    if (!pkg) return;
    
    // Close modal
    document.querySelector('.purchase-modal')?.remove();
    
    // Show processing
    this.showToast('⏳ Processing purchase...', 'info');
    
    setTimeout(() => {
        // Give rewards
        this.state.gems += pkg.gems;
        this.trackReward('gems', pkg.gems);
        
        if (pkg.bonus.energy) {
            this.state.energy += pkg.bonus.energy;
        }
        
        if (pkg.bonus.crystals) {
            this.state.crystals += pkg.bonus.crystals;
            this.trackReward('crystals', pkg.bonus.crystals);
        }
        
        if (pkg.bonus.guardian) {
    const rarity = pkg.bonus.guardian;
    const available = this.guardianTemplates.filter(g => g.rarity === rarity);
    if (available.length > 0) {
        const template = available[Math.floor(Math.random() * available.length)];
        const newGuardian = { ...template };
        this.state.guardians.push(newGuardian);
        
        // 🎵 ADAUGĂ AICI:
        soundManager.playGuardianSummon(rarity);
        
        this.calculateEnergyPerSecond();
        this.renderGuardians();
    }
}
        
        // Track purchase
        this.state.shop.purchaseHistory.push({
            packageId: pkg.id,
            timestamp: Date.now(),
            price: pkg.price
        });
        
        this.state.shop.totalSpent += pkg.price;
        
        // Show success with epic effects
        particleSystem.screenShake(500, 15);
        
        for (let i = 0; i < 10; i++) {
            setTimeout(() => {
                const x = Math.random() * window.innerWidth;
                const y = Math.random() * window.innerHeight;
                particleSystem.burst(x, y, 30, '💎');
            }, i * 100);
        }
        
        this.showToast(`🎉 Purchase successful! +${this.formatNumber(pkg.gems)} 💎`, 'success');
        
        this.updateUI();
        this.saveGame();
        
        // Refresh shop
        this.renderShop();
    }, 2000);
}

purchaseVIP() {
    const modal = document.createElement('div');
    modal.className = 'purchase-modal vip-modal';
    modal.innerHTML = `
        <div class="purchase-content vip-content">
            <div class="vip-header">
                <h2>👑 VIP Premium Pass</h2>
                <button class="close-modal" onclick="this.parentElement.parentElement.parentElement.remove()">✖</button>
            </div>
            
            <div class="vip-body">
                <div class="vip-price">
                    <span class="price-label">Monthly Subscription</span>
                    <span class="price-value">$${this.shopConfig.vipMonthlyPrice}</span>
                </div>
                
                <div class="vip-benefits">
                    <h3>✨ VIP Benefits:</h3>
                    <div class="benefit-item">
                        <span class="benefit-icon">⚡</span>
                        <span class="benefit-text">+${this.shopConfig.vipBenefits.productionBonus}x Production Speed</span>
                    </div>
                    <div class="benefit-item">
                        <span class="benefit-icon">⏰</span>
                        <span class="benefit-text">+${this.shopConfig.vipBenefits.offlineBonus}x Offline Progress</span>
                    </div>
                    <div class="benefit-item">
                        <span class="benefit-icon">💎</span>
                        <span class="benefit-text">${this.shopConfig.vipBenefits.dailyGems} Daily Gems</span>
                    </div>
                    <div class="benefit-item">
                        <span class="benefit-icon">🚫</span>
                        <span class="benefit-text">No Ad Cooldowns</span>
                    </div>
                    <div class="benefit-item">
                        <span class="benefit-icon">🎨</span>
                        <span class="benefit-text">Exclusive VIP Skins</span>
                    </div>
                    <div class="benefit-item">
                        <span class="benefit-icon">🏆</span>
                        <span class="benefit-text">VIP Badge & Crown</span>
                    </div>
                </div>
                
                <div class="purchase-disclaimer">
                    <p>🛡️ DEMO MODE - No real subscription will be created</p>
                    <p>Subscription would auto-renew monthly</p>
                    <p>Cancel anytime from account settings</p>
                </div>
            </div>
            
            <div class="purchase-actions">
                <button class="cancel-purchase" onclick="this.parentElement.parentElement.parentElement.remove()">
                    Maybe Later
                </button>
                <button class="confirm-purchase vip-purchase" onclick="game.activateMockVIP()">
                    👑 Subscribe (DEMO)
                </button>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
}

activateMockVIP() {
    document.querySelector('.vip-modal')?.remove();
    
    this.showToast('⏳ Activating VIP...', 'info');
    
    setTimeout(() => {
        // Activate VIP for 30 days (demo: 30 minutes)
        this.state.shop.vipActive = true;
        this.state.shop.vipExpiry = Date.now() + 1800000; // 30 minutes for demo
        
        // Apply VIP bonuses
        this.calculateEnergyPerSecond();
        
        // Epic celebration
        particleSystem.screenShake(1000, 20);
        
        for (let i = 0; i < 20; i++) {
            setTimeout(() => {
                const x = Math.random() * window.innerWidth;
                const y = Math.random() * window.innerHeight;
                particleSystem.burst(x, y, 40, '👑');
            }, i * 100);
        }
        
        this.showToast('👑 VIP Status Activated!', 'success');
        
        this.updateUI();
        this.saveGame();
        this.renderShop();
    }, 2000);
}

watchAd(rewardType) {
    // Check daily limit
    const today = new Date().toDateString();
    const lastReset = new Date(this.state.shop.lastAdResetDate).toDateString();
    
    if (today !== lastReset) {
        this.state.shop.adsWatchedToday = 0;
        this.state.shop.lastAdResetDate = Date.now();
    }
    
    if (this.state.shop.adsWatchedToday >= this.shopConfig.maxAdsPerDay) {
        this.showToast('⚠️ Daily ad limit reached! Come back tomorrow.', 'warning');
        return;
    }
    
    // MOCKUP - Show fake ad
    this.showMockAd(rewardType);
}

showMockAd(rewardType) {
    const modal = document.createElement('div');
    modal.className = 'ad-modal';
    modal.innerHTML = `
        <div class="ad-content">
            <div class="ad-header">
                <h3>📺 Rewarded Video Ad</h3>
            </div>
            
            <div class="ad-video-container">
                <div class="fake-video">
                    <div class="video-placeholder">
                        <div class="play-icon">▶️</div>
                        <p>DEMO: This would show a 30s video ad</p>
                        <p>Integration with:</p>
                        <p>• Google AdMob</p>
                        <p>• Unity Ads</p>
                        <p>• Facebook Audience Network</p>
                    </div>
                    <div class="ad-timer" id="ad-timer">Ad ends in: 5s</div>
                </div>
            </div>
            
            <div class="ad-reward-preview">
                <h4>Your Reward:</h4>
                <p>${this.getAdRewardDescription(rewardType)}</p>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Simulate 5 second ad
    let timeLeft = 5;
    const timerElement = document.getElementById('ad-timer');
    
    const countdown = setInterval(() => {
        timeLeft--;
        if (timerElement) {
            timerElement.textContent = `Ad ends in: ${timeLeft}s`;
        }
        
        if (timeLeft <= 0) {
            clearInterval(countdown);
            this.completeAdWatch(rewardType);
            modal.remove();
        }
    }, 1000);
}

getAdRewardDescription(rewardType) {
    const rewards = {
        double_offline: '🎁 2x Offline Rewards',
        free_gems: '💎 50 Free Gems',
        instant_puzzle: '🧩 Instant Puzzle Completion',
        energy_boost: '⚡ +5000 Energy',
        mystery_box: '🎁 Mystery Reward Box'
    };
    
    return rewards[rewardType] || '🎁 Special Reward';
}

completeAdWatch(rewardType) {
    this.state.shop.adsWatchedToday++;
    
    let rewardText = '';
    
    switch(rewardType) {
        case 'double_offline':
            // Set flag for next offline session
            this.nextOfflineDouble = true;
            rewardText = '🎁 Next offline rewards will be DOUBLED!';
            break;
            
        case 'free_gems':
            this.state.gems += 50;
            this.trackReward('gems', 50);
            rewardText = '💎 +50 Gems!';
            particleSystem.burst(window.innerWidth / 2, window.innerHeight / 2, 40, '💎');
            break;
            
        case 'instant_puzzle':
            if (this.puzzle.isInitialized) {
                this.puzzle.state.score = this.puzzle.state.target + 100;
                this.puzzle.gameWon();
                rewardText = '🧩 Puzzle completed instantly!';
            }
            break;
            
        case 'energy_boost':
            this.state.energy += 5000;
            rewardText = '⚡ +5,000 Energy!';
            particleSystem.burst(window.innerWidth / 2, window.innerHeight / 2, 40, '⚡');
            break;
            
        case 'mystery_box':
            const mysteryRewards = [
                { type: 'gems', amount: 100 },
                { type: 'energy', amount: 10000 },
                { type: 'crystals', amount: 5 }
            ];
            
            const reward = mysteryRewards[Math.floor(Math.random() * mysteryRewards.length)];
            
            if (reward.type === 'gems') {
                this.state.gems += reward.amount;
                this.trackReward('gems', reward.amount);
                rewardText = `💎 +${reward.amount} Gems!`;
            } else if (reward.type === 'energy') {
                this.state.energy += reward.amount;
                rewardText = `⚡ +${this.formatNumber(reward.amount)} Energy!`;
            } else if (reward.type === 'crystals') {
                this.state.crystals += reward.amount;
                this.trackReward('crystals', reward.amount);
                rewardText = `💠 +${reward.amount} Crystals!`;
            }
            
            particleSystem.burst(window.innerWidth / 2, window.innerHeight / 2, 50, '🎁');
            break;
    }
    
    this.showToast(`✅ ${rewardText}`, 'success');
    this.updateUI();
    this.saveGame();
    this.renderShop();
}

renderShop() {
    const container = document.querySelector('.shop-container');
    if (!container) return;
    
    container.innerHTML = '';
    
    // VIP Section
    this.renderVIPSection(container);
    
    // Daily Deal Section
    this.renderDailyDealSection(container);
    
    // Gem Packages Section
    this.renderGemPackagesSection(container);
    
    // Rewarded Ads Section
    this.renderRewardedAdsSection(container);
    
    // Limited Offers Section
    this.renderLimitedOffersSection(container);
    
    // Purchase History
    this.renderPurchaseHistory(container);
}

renderVIPSection(container) {
    const isVIP = this.state.shop.vipActive;
    const timeLeft = isVIP ? this.state.shop.vipExpiry - Date.now() : 0;
    
    const section = document.createElement('div');
    section.className = `shop-section vip-section ${isVIP ? 'active-vip' : ''}`;
    
    section.innerHTML = `
        <div class="vip-banner">
            <div class="vip-icon">👑</div>
            <div class="vip-info">
                <h2>VIP Premium Pass</h2>
                ${isVIP ? `
                    <p class="vip-status active">✅ ACTIVE - Expires in ${this.formatTime(timeLeft)}</p>
                    <div class="vip-benefits-active">
                        <span>⚡ +${this.shopConfig.vipBenefits.productionBonus}x Production</span>
                        <span>💎 ${this.shopConfig.vipBenefits.dailyGems}/day</span>
                        <span>🚫 No Cooldowns</span>
                    </div>
                ` : `
                    <p class="vip-status inactive">Unlock premium benefits</p>
                    <p class="vip-price">$${this.shopConfig.vipMonthlyPrice}/month</p>
                `}
            </div>
            <button class="vip-button" onclick="game.purchaseVIP()">
                ${isVIP ? '♻️ Renew' : '👑 Subscribe'}
            </button>
        </div>
    `;
    
    container.appendChild(section);
}

renderDailyDealSection(container) {
    if (!this.dailyDeal) {
        this.generateDailyDeal();
    }
    
    const deal = this.dailyDeal;
    const timeLeft = deal.expiresAt - Date.now();
    
    const section = document.createElement('div');
    section.className = 'shop-section daily-deal-section';
    
    section.innerHTML = `
        <div class="section-header">
            <h3>🔥 Daily Deal</h3>
            <span class="timer">⏰ ${this.formatTime(timeLeft)}</span>
        </div>
        
        <div class="daily-deal-card">
            <div class="deal-badge">50% OFF</div>
            <div class="deal-icon">${deal.icon}</div>
            <h4>${deal.name}</h4>
            <div class="deal-contents">
                <span>💎 ${this.formatNumber(deal.gems)} Gems</span>
                ${deal.bonus.energy ? `<span>⚡ ${this.formatNumber(deal.bonus.energy)}</span>` : ''}
            </div>
            <div class="deal-price">
                <span class="original-price">$${deal.originalPrice}</span>
                <span class="sale-price">$${deal.price}</span>
            </div>
            <button class="buy-deal-btn" onclick="game.purchasePackage('${deal.id}')">
                🛒 Buy Now
            </button>
        </div>
    `;
    
    container.appendChild(section);
}

renderGemPackagesSection(container) {
    const section = document.createElement('div');
    section.className = 'shop-section packages-section';
    
    section.innerHTML = `
        <div class="section-header">
            <h3>💎 Gem Packages</h3>
        </div>
        
        <div class="packages-grid">
            ${this.iapPackages.map(pkg => `
                <div class="package-card ${pkg.popular ? 'popular' : ''}">
                    ${pkg.tag ? `<div class="package-tag">${pkg.tag}</div>` : ''}
                    ${pkg.popular ? `<div class="popular-badge">⭐ POPULAR</div>` : ''}
                    
                    <div class="package-icon">${pkg.icon}</div>
                    <h4>${pkg.name}</h4>
                    
                    <div class="package-contents">
                        <div class="main-reward">
                            <span class="gems-amount">${this.formatNumber(pkg.gems)}</span>
                            <span class="gems-label">💎 Gems</span>
                        </div>
                        
                        ${Object.keys(pkg.bonus).length > 0 ? `
                            <div class="bonus-rewards">
                                <p class="bonus-label">+ BONUS:</p>
                                ${pkg.bonus.energy ? `<p>⚡ ${this.formatNumber(pkg.bonus.energy)} Energy</p>` : ''}
                                ${pkg.bonus.crystals ? `<p>💠 ${pkg.bonus.crystals} Crystals</p>` : ''}
                                ${pkg.bonus.guardian ? `<p>👥 ${this.getRarityName(pkg.bonus.guardian)} Guardian</p>` : ''}
                            </div>
                        ` : ''}
                    </div>
                    
                    <div class="package-price">
                        ${pkg.discount > 0 ? `
                            <span class="original-price">$${(pkg.price / (1 - pkg.discount/100)).toFixed(2)}</span>
                        ` : ''}
                        <span class="final-price">$${pkg.price}</span>
                    </div>
                    
                    <button class="buy-package-btn" onclick="game.purchasePackage('${pkg.id}')">
                        🛒 Buy Now
                    </button>
                </div>
            `).join('')}
        </div>
    `;
    
    container.appendChild(section);
}

renderRewardedAdsSection(container) {
    const adsRemaining = this.shopConfig.maxAdsPerDay - this.state.shop.adsWatchedToday;
    
    const section = document.createElement('div');
    section.className = 'shop-section ads-section';
    
    section.innerHTML = `
        <div class="section-header">
            <h3>📺 Watch & Earn</h3>
            <span class="ads-counter">${adsRemaining}/${this.shopConfig.maxAdsPerDay} ads left today</span>
        </div>
        
        <div class="ads-grid">
            <div class="ad-card">
                <div class="ad-icon">💎</div>
                <h4>Free Gems</h4>
                <p>Watch an ad to get 50 gems</p>
                <button class="watch-ad-btn" ${adsRemaining <= 0 ? 'disabled' : ''} onclick="game.watchAd('free_gems')">
                    📺 Watch Ad
                </button>
            </div>
            
            <div class="ad-card">
                <div class="ad-icon">⚡</div>
                <h4>Energy Boost</h4>
                <p>Get 5,000 energy instantly</p>
                <button class="watch-ad-btn" ${adsRemaining <= 0 ? 'disabled' : ''} onclick="game.watchAd('energy_boost')">
                    📺 Watch Ad
                </button>
            </div>
            
            <div class="ad-card">
                <div class="ad-icon">🎁</div>
                <h4>2x Offline</h4>
                <p>Double your next offline rewards</p>
                <button class="watch-ad-btn" ${adsRemaining <= 0 ? 'disabled' : ''} onclick="game.watchAd('double_offline')">
                    📺 Watch Ad
                </button>
            </div>
            
            <div class="ad-card">
                <div class="ad-icon">🎁</div>
                <h4>Mystery Box</h4>
                <p>Random reward (gems/energy/crystals)</p>
                <button class="watch-ad-btn" ${adsRemaining <= 0 ? 'disabled' : ''} onclick="game.watchAd('mystery_box')">
                    📺 Watch Ad
                </button>
            </div>
        </div>
        
        ${adsRemaining <= 0 ? `
            <p class="ads-limit-msg">⏰ Come back tomorrow for more ads!</p>
        ` : ''}
    `;
    
    container.appendChild(section);
}

renderLimitedOffersSection(container) {
    if (this.state.shop.limitedOffers.length === 0) return;
    
    const section = document.createElement('div');
    section.className = 'shop-section limited-offers-section';
    
    section.innerHTML = `
        <div class="section-header">
            <h3>⏰ Limited Time Offers</h3>
        </div>
        
        <div class="limited-offers-grid">
            ${this.state.shop.limitedOffers.map(offer => {
                const timeLeft = offer.expiresAt - Date.now();
                
                return `
                    <div class="limited-offer-card">
                        <div class="offer-timer">⏰ ${this.formatTime(timeLeft)}</div>
                        <div class="offer-discount">${offer.discount}% OFF</div>
                        <div class="offer-icon">${offer.icon}</div>
                        <h4>${offer.name}</h4>
                        <p>${offer.description}</p>
                        <div class="offer-price">
                            <span class="original-price">$${offer.originalPrice}</span>
                            <span class="sale-price">$${offer.price}</span>
                        </div>
                        <button class="buy-offer-btn" onclick="game.purchasePackage('${offer.id}')">
                            🛒 Buy Now
                        </button>
                    </div>
                `;
            }).join('')}
        </div>
    `;
    
    container.appendChild(section);
}

renderPurchaseHistory(container) {
    if (this.state.shop.purchaseHistory.length === 0) return;
    
    const section = document.createElement('div');
    section.className = 'shop-section history-section';
    
    const recentPurchases = this.state.shop.purchaseHistory.slice(-5).reverse();
    
    section.innerHTML = `
        <div class="section-header">
            <h3>📜 Recent Purchases</h3>
            <span class="total-spent">Total Spent: $${this.state.shop.totalSpent.toFixed(2)}</span>
        </div>
        
        <div class="purchase-history-list">
            ${recentPurchases.map(purchase => {
                const pkg = this.iapPackages.find(p => p.id === purchase.packageId);
                const date = new Date(purchase.timestamp).toLocaleDateString();
                
                return `
                    <div class="history-item">
                        <span class="history-icon">${pkg ? pkg.icon : '💎'}</span>
                        <span class="history-name">${pkg ? pkg.name : 'Unknown'}</span>
                        <span class="history-date">${date}</span>
                        <span class="history-price">$${purchase.price}</span>
                    </div>
                `;
            }).join('')}
        </div>
    `;
    
    container.appendChild(section);
}

getSectionIcon(sectionKey) {
    const icons = {
        production: '⚡',
        currency: '💎',
        activity: '🎯',
        progress: '📊',
        records: '🏆'
    };
    return icons[sectionKey] || '📊';
}

renderEnergyChart() {
    const container = document.querySelector('.statistics-container');
    if (!container || this.state.statistics.energyHistory.length === 0) return;
    
    const chartSection = document.createElement('div');
    chartSection.className = 'stats-section chart-section';
    
    const history = this.state.statistics.energyHistory;
    const maxEnergy = Math.max(...history.map(h => h.energy));
    
    chartSection.innerHTML = `
        <h3 class="stats-section-title">📈 Energy History (Last 10 minutes)</h3>
        <div class="energy-chart">
            ${history.map((point, index) => {
                const height = maxEnergy > 0 ? (point.energy / maxEnergy) * 100 : 0;
                const time = new Date(point.timestamp).toLocaleTimeString();
                
                return `
                    <div class="chart-bar" style="height: ${height}%" title="${this.formatNumber(point.energy)} ⚡ at ${time}">
                        <div class="bar-fill"></div>
                        <div class="bar-label">${index + 1}</div>
                    </div>
                `;
            }).join('')}
        </div>
        <div class="chart-legend">
            <span>⚡ Max: ${this.formatNumber(maxEnergy)}</span>
            <span>📊 Average: ${this.formatNumber(history.reduce((a, b) => a + b.energy, 0) / history.length)}</span>
        </div>
    `;
    
    container.appendChild(chartSection);
}

renderHighlights() {
    const container = document.querySelector('.statistics-container');
    if (!container) return;
    
    const highlights = document.createElement('div');
    highlights.className = 'stats-section highlights-section';
    
    const favoriteStructure = this.state.statistics.favoriteStructure 
        ? this.structureData[this.state.statistics.favoriteStructure]?.name || 'None'
        : 'None';
    
    const mostPowerful = this.state.statistics.mostPowerfulGuardian
        ? `${this.state.statistics.mostPowerfulGuardian.icon} ${this.state.statistics.mostPowerfulGuardian.name} (+${Math.floor((this.state.statistics.mostPowerfulGuardian.bonus - 1) * 100)}%)`
        : 'None';
    
    highlights.innerHTML = `
        <h3 class="stats-section-title">✨ Special Highlights</h3>
        <div class="highlights-grid">
            <div class="highlight-card">
                <div class="highlight-icon">🏗️</div>
                <div class="highlight-info">
                    <div class="highlight-label">Favorite Structure</div>
                    <div class="highlight-value">${favoriteStructure}</div>
                </div>
            </div>
            
            <div class="highlight-card">
                <div class="highlight-icon">⭐</div>
                <div class="highlight-info">
                    <div class="highlight-label">Most Powerful Guardian</div>
                    <div class="highlight-value">${mostPowerful}</div>
                </div>
            </div>
            
            <div class="highlight-card">
                <div class="highlight-icon">💪</div>
                <div class="highlight-info">
                    <div class="highlight-label">Current Power</div>
                    <div class="highlight-value">${this.formatNumber(this.state.energyPerSecond)}/s ⚡</div>
                </div>
            </div>
            
            <div class="highlight-card">
                <div class="highlight-icon">🌟</div>
                <div class="highlight-info">
                    <div class="highlight-label">Ascension Level</div>
                    <div class="highlight-value">Level ${this.state.ascensionLevel}</div>
                </div>
            </div>
        </div>
    `;
    
    container.appendChild(highlights);
}

startFPSCounter() {
    if (this.fpsInterval) return;
    
    let fps = 0;
    let lastTime = performance.now();
    let frames = 0;
    
    const updateFPS = () => {
        frames++;
        const currentTime = performance.now();
        
        if (currentTime >= lastTime + 1000) {
            fps = Math.round((frames * 1000) / (currentTime - lastTime));
            frames = 0;
            lastTime = currentTime;
            
            let fpsDisplay = document.getElementById('fps-display');
            if (!fpsDisplay) {
                fpsDisplay = document.createElement('div');
                fpsDisplay.id = 'fps-display';
                fpsDisplay.style.cssText = 'position:fixed;top:10px;right:10px;background:rgba(0,0,0,0.8);color:#10b981;padding:8px 12px;border-radius:8px;font-weight:bold;z-index:10000;font-family:monospace;';
                document.body.appendChild(fpsDisplay);
            }
            
            fpsDisplay.textContent = `FPS: ${fps}`;
        }
        
        this.fpsInterval = requestAnimationFrame(updateFPS);
    };
    
    this.fpsInterval = requestAnimationFrame(updateFPS);
}

stopFPSCounter() {
    if (this.fpsInterval) {
        cancelAnimationFrame(this.fpsInterval);
        this.fpsInterval = null;
    }
    
    const fpsDisplay = document.getElementById('fps-display');
    if (fpsDisplay) {
        fpsDisplay.remove();
    }
}

// Save Management
exportSave() {
    try {
        const saveData = {
            state: this.state,
            timestamp: Date.now(),
            version: '2.3'
        };
        
        const jsonString = JSON.stringify(saveData);
        const blob = new Blob([jsonString], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        
        const a = document.createElement('a');
        a.href = url;
        a.download = `mystic-realms-save-${Date.now()}.json`;
        a.click();
        
        URL.revokeObjectURL(url);
        
        particleSystem.burst(window.innerWidth / 2, window.innerHeight / 2, 30, '📤');
        this.showToast('✅ Save exported successfully!', 'success');
    } catch (error) {
        console.error('Export failed:', error);
        this.showToast('❌ Export failed!', 'error');
    }
}

importSave() {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';
    
    input.onchange = (e) => {
        const file = e.target.files[0];
        if (!file) return;
        
        const reader = new FileReader();
        
        reader.onload = (event) => {
            try {
                const saveData = JSON.parse(event.target.result);
                
                if (!saveData.state || !saveData.version) {
                    throw new Error('Invalid save file');
                }
                
                if (confirm('Import this save? Current progress will be overwritten!')) {
                    localStorage.setItem('mysticRealms_save', JSON.stringify(saveData));
                    
                    particleSystem.burst(window.innerWidth / 2, window.innerHeight / 2, 30, '📥');
                    this.showToast('✅ Save imported! Reloading...', 'success');
                    
                    setTimeout(() => {
                        location.reload();
                    }, 1500);
                }
            } catch (error) {
                console.error('Import failed:', error);
                particleSystem.screenShake(500, 10);
                this.showToast('❌ Invalid save file!', 'error');
            }
        };
        
        reader.readAsText(file);
    };
    
    input.click();
}

manualSave() {
    this.saveGame();
    particleSystem.burst(window.innerWidth / 2, 200, 20, '💾');
    this.showToast('✅ Game saved manually!', 'success');
    this.updateGameInfo();
}

confirmReset() {
    const modal = document.createElement('div');
    modal.className = 'confirm-modal';
    modal.innerHTML = `
        <div class="confirm-content">
            <h2>⚠️ Confirm Reset</h2>
            <p>Are you sure you want to reset the game?</p>
            <p><strong>ALL PROGRESS WILL BE LOST!</strong></p>
            <p>This action cannot be undone.</p>
            
            <div class="confirm-buttons">
                <button class="cancel-btn" onclick="this.parentElement.parentElement.parentElement.remove()">
                    Cancel
                </button>
                <button class="confirm-btn danger-btn" onclick="this.closest('.confirm-modal').remove(); localStorage.removeItem('mysticRealms_save'); localStorage.removeItem('tutorialCompleted'); localStorage.removeItem('tutorialCompletions'); localStorage.removeItem('soundSettings'); location.reload();">
                    Reset Game
                </button>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
}
    
    updateAscensionButton() {
        let ascendBtn = document.getElementById('ascend-btn');
        
        if (!ascendBtn) {
            const footer = document.getElementById('game-footer');
            ascendBtn = document.createElement('button');
            ascendBtn.id = 'ascend-btn';
            ascendBtn.className = 'footer-btn ascend-btn';
            ascendBtn.onclick = () => this.ascend();
            footer.insertBefore(ascendBtn, footer.firstChild);
        }
        
        const canAscend = this.canAscend();
        const requirement = this.config.ascensionRequirement * Math.pow(this.config.ascensionScaleFactor, this.state.ascensionLevel);
        
        ascendBtn.innerHTML = canAscend ? 
            `🌟 Ascensiune (Nivel ${this.state.ascensionLevel + 1})` :
            `🌟 Ascend (${this.formatNumber(this.state.lifetimeEnergy)}/${this.formatNumber(requirement)})`;
        
        ascendBtn.disabled = !canAscend;
        ascendBtn.style.background = canAscend ? 'linear-gradient(45deg, #f59e0b, #fbbf24)' : '';
    }
    
    trackReward(type, amount) {
        if (type === 'gems') this.state.statistics.totalGemsEarned += amount;
        if (type === 'crystals') this.state.statistics.totalCrystalsEarned += amount;
    }
    
    formatNumber(num) {
        if (num >= 1000000000) return parseFloat((num / 1000000000).toFixed(2)) + 'B';
        if (num >= 1000000) return parseFloat((num / 1000000).toFixed(2)) + 'M';
        if (num >= 1000) return parseFloat((num / 1000).toFixed(2)) + 'K';
        return Math.floor(num).toString();
    }
    
    formatTime(ms) {
        const seconds = Math.floor(ms / 1000);
        const minutes = Math.floor(seconds / 60);
        const hours = Math.floor(minutes / 60);
        
        if (hours > 0) return `${hours}h ${minutes % 60}m`;
        if (minutes > 0) return `${minutes}m ${seconds % 60}s`;
        return `${seconds}s`;
    }
    
    showToast(message, type = 'info') {
        const toast = document.getElementById('toast');
        toast.textContent = message;
        toast.className = `toast show ${type}`;
        
        setTimeout(() => {
            toast.classList.remove('show');
        }, 3000);
    }
    
    showSettings() {
        this.showSettingsModal();
    }
}

// ====================================
// PUZZLE GAME
// ====================================

class PuzzleGame {
    constructor(gameInstance) {
        this.game = gameInstance;
        this.isInitialized = false;
        
        this.config = {
            gridSize: 8,
            colors: ['🔴', '🔵', '🟢', '🟡', '🟣', '🟠'],
            movesStart: 12,
            targetScore: 400,
            scorePerMatch: 10,
            comboMultiplier: 1.25,
            gemReward: 5
        };
        
        this.state = {
            grid: [],
            selectedCell: null,
            moves: this.config.movesStart,
            score: 0,
            target: this.config.targetScore,
            isProcessing: false,
            combo: 0
        };
    }

    startBossBattle(boss) {
    this.isBossBattle = true;
    this.currentBossConfig = boss;
    
    // Override config with boss settings
    this.config.gridSize = boss.puzzleConfig.gridSize;
    this.config.colors = boss.puzzleConfig.colors;
    this.config.movesStart = boss.puzzleConfig.movesStart;
    this.config.targetScore = boss.puzzleConfig.targetScore;
    
    this.newGame();
    
    // Show boss info
    this.showBossInfo(boss);
}

showBossInfo(boss) {
    const bossInfo = document.querySelector('.boss-battle-info');
    if (!bossInfo) {
        const puzzleHeader = document.querySelector('.puzzle-header');
        const info = document.createElement('div');
        info.className = 'boss-battle-info';
        puzzleHeader.appendChild(info);
    }
    
    document.querySelector('.boss-battle-info').innerHTML = `
        <div class="boss-battle-banner">
            <span class="boss-banner-icon">${boss.icon}</span>
            <span class="boss-banner-name">${boss.name}</span>
            <span class="boss-banner-hp">${this.game.state.bossHP}/${boss.hp} ❤️</span>
        </div>
    `;
}

exitBossBattle() {
    this.isBossBattle = false;
    this.currentBossConfig = null;
    
    // Reset to normal config
    this.config.gridSize = 8;
    this.config.colors = ['🔴', '🔵', '🟢', '🟡', '🟣', '🟠'];
    this.config.movesStart = 15;
    this.config.targetScore = 300;
    
    const bossInfo = document.querySelector('.boss-battle-info');
    if (bossInfo) bossInfo.remove();
    
    this.newGame();
}
    
    init() {
        if (this.isInitialized) return;
        this.newGame();
        this.isInitialized = true;
    }
    
    newGame() {
        // Progressive scaling for regular puzzles (not bosses)
        if (!this.isBossBattle) {
            const puzzlesCompleted = this.game.state.puzzleStats.totalCompleted;
            this.state.moves = Math.max(8, 15 - Math.floor(puzzlesCompleted / 5));
            this.state.target = 400 + (puzzlesCompleted * 25);
        } else {
            this.state.moves = this.config.movesStart;
            this.state.target = this.config.targetScore;
        }
        
        this.state.score = 0;
        this.state.selectedCell = null;
        this.state.combo = 0;
        
        this.generateGrid();
        while (this.hasMatches()) {
            this.generateGrid();
        }
        
        this.render();
        this.updatePuzzleUI();
    }
    
    generateGrid() {
        this.state.grid = [];
        for (let row = 0; row < this.config.gridSize; row++) {
            this.state.grid[row] = [];
            for (let col = 0; col < this.config.gridSize; col++) {
                this.state.grid[row][col] = this.randomColor();
            }
        }
    }
    
    randomColor() {
        return this.config.colors[Math.floor(Math.random() * this.config.colors.length)];
    }
    
    render() {
        const board = document.getElementById('puzzle-board');
        board.innerHTML = '';
        
        for (let row = 0; row < this.config.gridSize; row++) {
            for (let col = 0; col < this.config.gridSize; col++) {
                const cell = document.createElement('div');
                cell.className = 'puzzle-cell';
                cell.textContent = this.state.grid[row][col];
                cell.dataset.row = row;
                cell.dataset.col = col;
                cell.addEventListener('click', () => this.handleCellClick(row, col));
                board.appendChild(cell);
            }
        }
    }
    
    handleCellClick(row, col) {
        if (this.state.isProcessing || this.state.moves <= 0) return;
        
        const cell = this.getCellElement(row, col);
        
        if (!this.state.selectedCell) {
            this.state.selectedCell = { row, col };
            cell.classList.add('selected');
            return;
        }
        
        if (this.state.selectedCell.row === row && this.state.selectedCell.col === col) {
            cell.classList.remove('selected');
            this.state.selectedCell = null;
            return;
        }
        
        if (this.areAdjacent(this.state.selectedCell.row, this.state.selectedCell.col, row, col)) {
            this.swapCells(this.state.selectedCell.row, this.state.selectedCell.col, row, col);
        } else {
            document.querySelector('.puzzle-cell.selected')?.classList.remove('selected');
            this.state.selectedCell = { row, col };
            cell.classList.add('selected');
        }
    }
    
    areAdjacent(row1, col1, row2, col2) {
        const rowDiff = Math.abs(row1 - row2);
        const colDiff = Math.abs(col1 - col2);
        return (rowDiff === 1 && colDiff === 0) || (rowDiff === 0 && colDiff === 1);
    }
    
    async swapCells(row1, col1, row2, col2) {
        this.state.isProcessing = true;
        soundManager.playClick();
        
        const temp = this.state.grid[row1][col1];
        this.state.grid[row1][col1] = this.state.grid[row2][col2];
        this.state.grid[row2][col2] = temp;
        
        this.render();
        
        if (this.hasMatches()) {
            this.state.moves--;
            document.querySelector('.puzzle-cell.selected')?.classList.remove('selected');
            this.state.selectedCell = null;
            await this.processMatches();
            this.updatePuzzleUI();
            this.checkGameOver();
        } else {
            await this.sleep(300);
            const temp2 = this.state.grid[row1][col1];
            this.state.grid[row1][col1] = this.state.grid[row2][col2];
            this.state.grid[row2][col2] = temp2;
            this.render();
            document.querySelector('.puzzle-cell.selected')?.classList.remove('selected');
            this.state.selectedCell = null;
            this.game.showToast('❌ Mutare invalidă!', 'error');
        }
        
        this.state.isProcessing = false;
    }
    
    hasMatches() {
        for (let row = 0; row < this.config.gridSize; row++) {
            for (let col = 0; col < this.config.gridSize - 2; col++) {
                if (this.state.grid[row][col] === this.state.grid[row][col + 1] &&
                    this.state.grid[row][col] === this.state.grid[row][col + 2]) {
                    return true;
                }
            }
        }
        
        for (let col = 0; col < this.config.gridSize; col++) {
            for (let row = 0; row < this.config.gridSize - 2; row++) {
                if (this.state.grid[row][col] === this.state.grid[row + 1][col] &&
                    this.state.grid[row][col] === this.state.grid[row + 2][col]) {
                    return true;
                }
            }
        }
        
        return false;
    }
    
    async processMatches() {
        let hasMatches = true;
        this.state.combo = 0;
        
        while (hasMatches) {
            const groups = this.findMatches();
            
            if (groups.length === 0) {
                hasMatches = false;
                break;
            }
            
            this.state.combo++;
            
            // Track combo for quests
            this.game.updateQuestProgress('combo', 'puzzle', 1);
            
            // Scoring per group: match-3=30, match-4=60, match-5+=100
            let baseScore = 0;
            for (const group of groups) {
                const len = group.length;
                if (len >= 5) baseScore += 100;
                else if (len >= 4) baseScore += 60;
                else baseScore += 30;
            }
            
            // Linear combo: 1.0, 1.2, 1.4, 1.6, 1.8...
            const comboBonus = 1 + (this.state.combo * 0.2);
            const totalScore = Math.floor(baseScore * comboBonus);
            
            this.state.score += totalScore;
            
            if (this.state.combo > 1) {
                this.game.showToast(`🔥 Combo x${this.state.combo}! +${totalScore}`, 'success');
            }
            
            // Animate + clear all cells from all groups
            const allCells = groups.flat();
            for (const cell of allCells) {
                const el = this.getCellElement(cell.row, cell.col);
                if (el) el.classList.add('matched');
            }
            
            await this.sleep(500);
            
            for (const cell of allCells) {
                this.state.grid[cell.row][cell.col] = null;
            }
            
            await this.dropCells();
            this.fillEmpty();
            this.render();
            this.updatePuzzleUI();
            await this.sleep(300);
        }
    }
    
    findMatches() {
        const groups = [];
        const counted = new Set();
        
        // Horizontal matches
        for (let row = 0; row < this.config.gridSize; row++) {
            for (let col = 0; col < this.config.gridSize - 2; col++) {
                const color = this.state.grid[row][col];
                if (!color) continue;
                
                let matchLength = 1;
                while (col + matchLength < this.config.gridSize && 
                       this.state.grid[row][col + matchLength] === color) {
                    matchLength++;
                }
                
                if (matchLength >= 3) {
                    const group = [];
                    for (let i = 0; i < matchLength; i++) {
                        const key = `${row}-${col + i}`;
                        if (!counted.has(key)) {
                            group.push({ row, col: col + i });
                            counted.add(key);
                        }
                    }
                    if (group.length >= 3) groups.push(group);
                }
            }
        }
        
        // Vertical matches
        for (let col = 0; col < this.config.gridSize; col++) {
            for (let row = 0; row < this.config.gridSize - 2; row++) {
                const color = this.state.grid[row][col];
                if (!color) continue;
                
                let matchLength = 1;
                while (row + matchLength < this.config.gridSize && 
                       this.state.grid[row + matchLength][col] === color) {
                    matchLength++;
                }
                
                if (matchLength >= 3) {
                    const group = [];
                    for (let i = 0; i < matchLength; i++) {
                        const key = `${row + i}-${col}`;
                        if (!counted.has(key)) {
                            group.push({ row: row + i, col });
                            counted.add(key);
                        }
                    }
                    if (group.length >= 3) groups.push(group);
                }
            }
        }

        // Flatten for sound effects
        const flatMatches = groups.flat();
        if (flatMatches.length > 0) {
            soundManager.playPuzzleMatch();
            if (this.state.combo > 1) {
                soundManager.playPuzzleCombo(this.state.combo);
            }
        }
        
        return groups;
    }
    
    async dropCells() {
        for (let col = 0; col < this.config.gridSize; col++) {
            let emptyCount = 0;
            for (let row = this.config.gridSize - 1; row >= 0; row--) {
                if (this.state.grid[row][col] === null) {
                    emptyCount++;
                } else if (emptyCount > 0) {
                    this.state.grid[row + emptyCount][col] = this.state.grid[row][col];
                    this.state.grid[row][col] = null;
                }
            }
        }
    }
    
    fillEmpty() {
        for (let row = 0; row < this.config.gridSize; row++) {
            for (let col = 0; col < this.config.gridSize; col++) {
                if (this.state.grid[row][col] === null) {
                    this.state.grid[row][col] = this.randomColor();
                }
            }
        }
    }
    
    getCellElement(row, col) {
        return document.querySelector(`[data-row="${row}"][data-col="${col}"]`);
    }
    
    updatePuzzleUI() {
        document.getElementById('moves-left').textContent = this.state.moves;
        document.getElementById('puzzle-score').textContent = this.state.score;
        document.getElementById('puzzle-target').textContent = this.state.target;
        
        // Update extra moves button
        const extraBtn = document.getElementById('extra-moves-btn');
        if (extraBtn) {
            const canAfford = this.game.state.gems >= 3;
            extraBtn.disabled = !canAfford || this.state.isProcessing;
        }
    }
    
    buyExtraMoves() {
        const cost = 3;
        if (this.game.state.gems < cost) {
            this.game.showToast('❌ Gemuri insuficiente! (3 💎)', 'error');
            return;
        }
        
        this.game.state.gems -= cost;
        this.game.state.statistics.totalGemsSpent += cost;
        this.state.moves += 5;
        
        soundManager.playPurchase();
        this.updatePuzzleUI();
        this.game.updateUI();
        this.game.saveGame();
        
        this.game.showToast('🎮 +5 mutari extra!', 'success');
    }
    
    checkGameOver() {
        if (this.state.score >= this.state.target) {
            this.gameWon();
        } else if (this.state.moves <= 0) {
            soundManager.playReward();
            setTimeout(() => soundManager.playCoins(), 200);
            this.gameLost();
        }
    }
    
    gameWon() {
        const baseGemReward = this.config.gemReward || 5;
        const bonusGems = Math.floor(this.state.score / 200);
        const totalGemReward = baseGemReward + bonusGems;
        
        const gemFinderLevel = this.game.state.upgrades.gemFinder ? this.game.state.upgrades.gemFinder.level : 0;
        const gemBonus = gemFinderLevel > 0 ? Math.pow(1.2, gemFinderLevel) : 1;
        
        let finalGems = Math.floor(totalGemReward * gemBonus);
        let energyReward = Math.floor(this.state.score * 1);
        
        if (!finalGems || isNaN(finalGems) || finalGems < 1) {
            finalGems = baseGemReward;
        }
        
        if (!energyReward || isNaN(energyReward) || energyReward < 1) {
            energyReward = 100;
        }
        
        this.game.state.puzzleStats.totalCompleted++;
        if (this.state.score > this.game.state.puzzleStats.highScore) {
            this.game.state.puzzleStats.highScore = this.state.score;
        }
        
        this.game.updateQuestProgress('complete', 'puzzles', 1);
        this.game.state.statistics.totalPuzzlesCompleted++;
        
        if (typeof sessionTracker !== 'undefined') {
            sessionTracker.puzzleWon(this.state.score, finalGems, energyReward);
        }
        
        document.getElementById('final-score').textContent = this.state.score;
        document.getElementById('puzzle-rewards').textContent = `${finalGems} 💎 + ${this.game.formatNumber(energyReward)} ⚡`;
        document.getElementById('puzzle-complete').style.display = 'flex';
        
        this.pendingRewards = { gems: finalGems, energy: energyReward };
    }
    
    gameLost() {
        if (typeof sessionTracker !== 'undefined') {
            sessionTracker.puzzleLost(this.state.score, this.state.moves);
        }
        this.game.showToast('😔 Ai rămas fără mutări!', 'error');
        setTimeout(() => this.newGame(), 2000);
    }
    
    claimRewards() {
    if (this.pendingRewards) {
        this.game.state.gems += this.pendingRewards.gems;
        this.game.state.energy += this.pendingRewards.energy;
        this.game.trackReward('gems', this.pendingRewards.gems);
        
        this.game.state.puzzleStats.gemsEarned += this.pendingRewards.gems;
        this.game.updateUI();
        this.game.saveGame();
        
        // ⭐ REWARD CLAIM EFFECT
        const modal = document.getElementById('puzzle-complete');
        const rect = modal.getBoundingClientRect();
        const x = rect.left + rect.width / 2;
        const y = rect.top + rect.height / 2;
        
        particleSystem.burst(x, y, 30, '💎');
        particleSystem.burst(x, y + 50, 30, '⚡');
        particleSystem.floatingNumber(x - 50, y, `+${this.pendingRewards.gems} 💎`, '#fbbf24');
        particleSystem.floatingNumber(x + 50, y, `+${this.game.formatNumber(this.pendingRewards.energy)} ⚡`, '#10b981');
        
        console.log('✅ Rewards claimed:', this.pendingRewards);
        this.pendingRewards = null;
    }
    
    document.getElementById('puzzle-complete').style.display = 'none';
    this.newGame();
}
    
    useHint() {
        const cost = 3;
        if (this.game.state.gems < cost) {
            soundManager.playError();
            this.game.showToast('❌ Gemuri insuficiente! (3 💎)', 'error');
            return;
        }
        
        const move = this.findValidMove();
        if (!move) {
            this.game.showToast('ℹ️ Nu există mutări valide!', 'info');
            return;
        }
        
        this.game.state.gems -= cost;
        soundManager.playNotification();
        this.game.updateUI();
        
        const cell1 = this.getCellElement(move.row1, move.col1);
        const cell2 = this.getCellElement(move.row2, move.col2);
        
        cell1.style.animation = 'pulse 1s infinite';
        cell2.style.animation = 'pulse 1s infinite';
        
        setTimeout(() => {
            cell1.style.animation = '';
            cell2.style.animation = '';
        }, 3000);
        
        this.game.showToast('💡 Hint activat!', 'success');
    }
    
    findValidMove() {
        for (let row = 0; row < this.config.gridSize; row++) {
            for (let col = 0; col < this.config.gridSize; col++) {
                if (col < this.config.gridSize - 1) {
                    if (this.wouldCreateMatch(row, col, row, col + 1)) {
                        return { row1: row, col1: col, row2: row, col2: col + 1 };
                    }
                }
                if (row < this.config.gridSize - 1) {
                    if (this.wouldCreateMatch(row, col, row + 1, col)) {
                        return { row1: row, col1: col, row2: row + 1, col2: col };
                    }
                }
            }
        }
        return null;
    }
    
    wouldCreateMatch(row1, col1, row2, col2) {
        const temp = this.state.grid[row1][col1];
        this.state.grid[row1][col1] = this.state.grid[row2][col2];
        this.state.grid[row2][col2] = temp;
        
        const hasMatch = this.hasMatches();
        
        const temp2 = this.state.grid[row1][col1];
        this.state.grid[row1][col1] = this.state.grid[row2][col2];
        this.state.grid[row2][col2] = temp2;
        
        return hasMatch;
    }
    
    sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}

// ====================================
// INITIALIZATION
// ====================================

var game;

window.addEventListener('DOMContentLoaded', () => {
    game = new Game();
    
    const style = document.createElement('style');
    style.textContent = `
        @keyframes pulse {
            0%, 100% { transform: scale(1); box-shadow: 0 0 10px rgba(251, 191, 36, 0.5); }
            50% { transform: scale(1.15); box-shadow: 0 0 20px rgba(251, 191, 36, 1); }
        }
        .structure-milestone {
            background: linear-gradient(135deg, rgba(251, 191, 36, 0.15), rgba(245, 158, 11, 0.15));
            border: 1px solid rgba(251, 191, 36, 0.3);
            border-radius: 6px;
            padding: 4px 8px;
            font-size: 0.75rem;
            font-weight: bold;
            color: #fbbf24;
            text-align: center;
            margin: 6px 0;
        }
        .guardian-training {
            margin-top: 8px;
            padding-top: 8px;
            border-top: 1px solid rgba(255,255,255,0.1);
            text-align: center;
        }
        .train-btn {
            width: 100%;
            padding: 6px 12px;
            background: linear-gradient(135deg, #8b5cf6, #7c3aed);
            color: white;
            border: none;
            border-radius: 6px;
            cursor: pointer;
            font-weight: bold;
            font-size: 0.85rem;
            transition: all 0.2s;
        }
        .train-btn:hover:not(:disabled) {
            transform: translateY(-1px);
            box-shadow: 0 4px 12px rgba(139, 92, 246, 0.4);
        }
        .train-btn:disabled, .train-btn.cant-afford {
            background: #4b5563;
            cursor: not-allowed;
            opacity: 0.6;
        }
        .train-info {
            font-size: 0.7rem;
            color: #a78bfa;
            margin-top: 4px;
        }
        #extra-moves-btn {
            background: linear-gradient(135deg, #f59e0b, #d97706);
            color: white;
            border: none;
            padding: 8px 16px;
            border-radius: 8px;
            cursor: pointer;
            font-weight: bold;
            transition: all 0.2s;
        }
        #extra-moves-btn:hover:not(:disabled) {
            transform: translateY(-2px);
            box-shadow: 0 4px 12px rgba(245, 158, 11, 0.4);
        }
        #extra-moves-btn:disabled {
            background: #4b5563;
            cursor: not-allowed;
        }
        .quests-container {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
            gap: 1rem;
            margin-bottom: 2rem;
        }
        .quest-card {
            background: var(--card-bg);
            border: 2px solid var(--border-color);
            border-radius: 12px;
            padding: 1rem;
        }
        .quest-card.completed { border-color: var(--success-color); }
        .quest-header { display: flex; gap: 1rem; margin-bottom: 1rem; }
        .quest-icon { font-size: 2rem; }
        .quest-info h4 { margin-bottom: 0.3rem; }
        .quest-info p { font-size: 0.9rem; color: var(--text-secondary); }
        .quest-progress { margin-bottom: 0.8rem; }
        .progress-bar {
            background: rgba(0,0,0,0.3);
            height: 8px;
            border-radius: 4px;
            overflow: hidden;
            margin-bottom: 0.3rem;
        }
        .progress-fill {
            background: var(--success-color);
            height: 100%;
            transition: width 0.3s;
        }
        .progress-text { font-size: 0.85rem; color: var(--text-secondary); }
        .quest-reward { color: var(--warning-color); font-size: 0.9rem; margin-bottom: 0.8rem; }
        .claim-btn {
            width: 100%;
            padding: 0.6rem;
            background: var(--success-color);
            color: white;
            border: none;
            border-radius: 6px;
            cursor: pointer;
            font-weight: bold;
        }
        .claim-btn:disabled { background: #4b5563; cursor: not-allowed; }
        .resource-bar {
            flex: 0 0 100%;
            width: 100%;
            height: 6px;
            background: rgba(0,0,0,0.3);
            border-radius: 3px;
            overflow: hidden;
            margin-top: 4px;
        }
        .resource-bar-fill {
            height: 100%;
            background: linear-gradient(90deg, #10b981, #34d399);
            border-radius: 3px;
            transition: width 0.3s ease;
        }
        .resource-bar-fill.mana-bar-fill {
            background: linear-gradient(90deg, #3b82f6, #60a5fa);
        }
        .resource-bar-fill.cap-reached {
            background: linear-gradient(90deg, #ef4444, #f87171);
            animation: capPulse 1.5s ease-in-out infinite;
        }
        @keyframes capPulse {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.6; }
        }
        .upgrade-card.cap-alert {
            border: 2px solid #ef4444 !important;
            box-shadow: 0 0 12px rgba(239, 68, 68, 0.4);
            animation: capGlow 2s ease-in-out infinite;
        }
        @keyframes capGlow {
            0%, 100% { box-shadow: 0 0 8px rgba(239, 68, 68, 0.3); }
            50% { box-shadow: 0 0 16px rgba(239, 68, 68, 0.6); }
        }
        .cap-alert-badge {
            background: #ef4444;
            color: white;
            font-size: 0.7rem;
            padding: 2px 6px;
            border-radius: 4px;
            font-weight: bold;
            margin-left: 6px;
        }
    `;
    document.head.appendChild(style);
});

document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        game.saveGame();
    } else {
        game.calculateOfflineProgress();
    }
});

window.addEventListener('beforeunload', () => {
    game.saveGame();
});

console.log('%c🎮 Mystic Realms v2.2', 'font-size: 20px; color: #6366f1; font-weight: bold;');
console.log('%c✅ All fixes applied!', 'color: #10b981;');