/// <reference path="../../declarations/GameHelper.d.ts" />
/// <reference path="../Battle.ts" />

class DungeonBattle extends Battle {

    static trainer: KnockoutObservable<DungeonTrainer> = ko.observable(null);
    static trainerPokemonIndex: KnockoutObservable<number> = ko.observable(0);

    public static remainingTrainerPokemon: KnockoutComputed<number> = ko.pureComputed(() => {
        if (!DungeonBattle.trainer()) {
            return 0;
        }
        return DungeonBattle.trainer().getTeam().length - DungeonBattle.defeatedTrainerPokemon();
    });

    public static defeatedTrainerPokemon: KnockoutComputed<number> = ko.pureComputed(() => {
        if (!DungeonBattle.trainer()) {
            return 0;
        }

        return DungeonBattle.getAllPokemonByStatus(false).length;
    });

    /**
     * Award the player with money and exp, and throw a Pokéball if applicable
     */
    public static defeatPokemon(enemyPoke: EnemyPokemon = undefined) {
        const enemyPokemon = enemyPoke.pokemon();

        // Handle Trainer Pokemon defeat
        if (this.trainer()) {
            this.defeatTrainerPokemon(enemyPoke);
            return;
        }

        DungeonRunner.fighting(false);
        if (DungeonRunner.fightingLootEnemy) {
            DungeonRunner.fightingLootEnemy = false;
        } else if (!DungeonRunner.fightingBoss()) {
            GameHelper.incrementObservable(DungeonRunner.encountersWon);
        }

        if (DungeonRunner.fightingBoss()) {
            DungeonRunner.fightingBoss(false);
            DungeonRunner.defeatedBoss(enemyPokemon.name);
        }
        enemyPokemon.defeat();
        App.game.breeding.progressEggsBattle(DungeonRunner.dungeon.difficultyRoute, player.region);
        player.lowerItemMultipliers(MultiplierDecreaser.Battle);

        // Clearing Dungeon tile
        DungeonRunner.map.currentTile().type(GameConstants.DungeonTileType.empty);
        DungeonRunner.map.currentTile().calculateCssClass();

        // Attempting to catch Pokemon
        const isShiny: boolean = enemyPokemon.shiny;
        const isShadow: boolean = enemyPokemon.shadow == GameConstants.ShadowStatus.Shadow;
        const pokeBall: GameConstants.Pokeball = App.game.pokeballs.calculatePokeballToUse(enemyPokemon.id, isShiny, isShadow, enemyPokemon.encounterType);
        const route = player.town?.dungeon?.difficultyRoute || 1;
        const region = player.region;
        if (pokeBall !== GameConstants.Pokeball.None) {
            this.prepareCatch(enemyPoke, pokeBall);
            setTimeout(
                () => {
                    this.attemptCatch(enemyPoke, route, region);
                    if (DungeonRunner.defeatedBoss()) {
                        DungeonRunner.dungeonWon();
                    }
                },
                App.game.pokeballs.calculateCatchTime(pokeBall)
            );
        } else if (DungeonRunner.defeatedBoss()) {
            DungeonRunner.dungeonWon();
        }
    }

    /**
     * Handles defeating a trainer Pokemon
     */
    private static defeatTrainerPokemon(enemyPoke: EnemyPokemon = undefined) {
        const enemyPokemon = enemyPoke.pokemon();
        enemyPokemon.defeat(true);

        App.game.breeding.progressEggsBattle(DungeonRunner.dungeon.difficultyRoute, player.region);
        player.lowerItemMultipliers(MultiplierDecreaser.Battle);

        if (enemyPokemon.shadow == GameConstants.ShadowStatus.Shadow) {
            // Attempting to catch Pokemon
            const isShiny: boolean = enemyPokemon.shiny;
            const isShadow: boolean = enemyPokemon.shadow == GameConstants.ShadowStatus.Shadow;
            const pokeBall: GameConstants.Pokeball = App.game.pokeballs.calculatePokeballToUse(enemyPokemon.id, isShiny, isShadow, enemyPokemon.encounterType);
            const route = player.town?.dungeon?.difficultyRoute || 1;
            const region = player.region;
            if (pokeBall !== GameConstants.Pokeball.None) {
                this.prepareCatch(enemyPoke, pokeBall);
                setTimeout(
                    () => {
                        this.attemptCatch(enemyPoke, route, region);
                        DungeonBattle.nextTrainerPokemon();
                    },
                    App.game.pokeballs.calculateCatchTime(pokeBall)
                );
            } else {
                DungeonBattle.nextTrainerPokemon();
            }
        } else {
            DungeonBattle.nextTrainerPokemon();
        }
    }


    private static nextTrainerPokemon() {
        
        GameHelper.incrementObservable(this.trainerPokemonIndex);
        if (!this.trainer()) {
            return;
        }
        // No Pokemon left, trainer defeated
        if (this.getAllPokemonByStatus(false).length >= this.trainer().getTeam().length) {
            // rewards for defeating trainer
            if (this.trainer().options.reward) {
                // Custom reward amount on defeat
                App.game.wallet.addAmount(this.trainer().options.reward);
            } else {
                const dungeonCost = DungeonRunner.dungeon.tokenCost;
                // Reward back 50% or 100% (boss) of the total dungeon DT cost as money (excludes achievement multiplier)
                const money = Math.round(dungeonCost * (DungeonRunner.fightingBoss() ? 1 : 0.5));
                App.game.wallet.gainMoney(money, true);
                // Reward back 4% or 10% (boss) of the total dungeon DT cost (excludes achievement multiplier)
                const tokens = Math.round(dungeonCost * (DungeonRunner.fightingBoss() ? 0.1 : 0.04));
                App.game.wallet.gainDungeonTokens(tokens, true);
            }

            DungeonRunner.fighting(false);
            GameHelper.incrementObservable(DungeonRunner.encountersWon);
            if (DungeonRunner.fightingBoss()) {
                DungeonRunner.defeatedBoss(DungeonBattle.trainer().name);
            }
            this.trainer(null);
            this.trainerPokemonIndex(0);

            // Clearing Dungeon tile
            DungeonRunner.map.currentTile().type(GameConstants.DungeonTileType.empty);
            DungeonRunner.map.currentTile().calculateCssClass();

            // Update boss
            if (DungeonRunner.fightingBoss()) {
                DungeonRunner.fightingBoss(false);
                DungeonRunner.dungeonWon();
            }
            // Generate next trainer Pokemon
        } else {
            this.generateTrainerPokemon();
        }
    }

    public static generateNewEnemy() {
        this.catching(false);
        this.counter = 0;
        this.enemyPokemonArray([]);
        this.doubleBattle = false;
        // Finding enemy from enemyList
        const enemy = Rand.fromWeightedArray(DungeonRunner.dungeon.availableMinions(), DungeonRunner.dungeon.weightList);
        // Pokemon
        if (typeof enemy === 'string' || enemy.hasOwnProperty('pokemon')) {
            //const pokemon = (typeof enemy === 'string') ? enemy : (<DetailedPokemon>enemy).pokemon;
            const pokemon = (typeof enemy === 'string') ? enemy : (enemy as DetailedPokemon).pokemon;
            const enemyPokemon = PokemonFactory.generateDungeonPokemon(pokemon, DungeonRunner.chestsOpened(), DungeonRunner.dungeon.baseHealth, DungeonRunner.dungeonLevel());
            //this.enemyPokemon(enemyPokemon);
            this.enemyPokemonArray().push(new EnemyPokemon(enemyPokemon));

            PokemonHelper.incrementPokemonStatistics(enemyPokemon.id, GameConstants.PokemonStatisticsType.Encountered, enemyPokemon.shiny, enemyPokemon.gender, enemyPokemon.shadow);
            // Shiny
            if (enemyPokemon.shiny) {
                App.game.logbook.newLog(
                    LogBookTypes.SHINY,
                    App.game.party.alreadyCaughtPokemon(enemyPokemon.id, true)
                        ? createLogContent.encounterShinyDupe({
                            location: player.town.dungeon.name,
                            pokemon: enemyPokemon.name,
                        })
                        : createLogContent.encounterShiny({
                            location: player.town.dungeon.name,
                            pokemon: enemyPokemon.name,
                        })
                );
            } else if (!App.game.party.alreadyCaughtPokemon(enemyPokemon.id)) {
                App.game.logbook.newLog(
                    LogBookTypes.NEW,
                    createLogContent.encounterWild({
                        location: player.town.dungeon.name,
                        pokemon: enemyPokemon.name,
                    })
                );
            }
            // Trainer
        } else {
            //const trainer = <DungeonTrainer>enemy;
            const trainer = enemy as DungeonTrainer;
            this.trainer(trainer);
            this.trainerPokemonIndex(0);
            this.doubleBattle = trainer.options.doubleBattle == true;

            this.generateTrainerPokemon();
        }

        DungeonRunner.fighting(true);
    }

    public static generateNewLootEnemy(pokemon: PokemonNameType) {
        this.catching(false);
        this.counter = 0;
        this.enemyPokemonArray([]);
        this.doubleBattle = false;

        const enemyPokemon = PokemonFactory.generateDungeonPokemon(pokemon
            , DungeonRunner.chestsOpened(), DungeonRunner.dungeon.baseHealth * 2, DungeonRunner.dungeonLevel(), true);

        this.enemyPokemonArray().push(new EnemyPokemon(enemyPokemon));
        PokemonHelper.incrementPokemonStatistics(enemyPokemon.id, GameConstants.PokemonStatisticsType.Encountered, enemyPokemon.shiny, enemyPokemon.gender, enemyPokemon.shadow);
        // Shiny
        if (enemyPokemon.shiny) {
            App.game.logbook.newLog(
                LogBookTypes.SHINY,
                App.game.party.alreadyCaughtPokemon(enemyPokemon.id, true)
                    ? createLogContent.encounterShinyDupe({
                        location: player.town.dungeon.name,
                        pokemon: enemyPokemon.name,
                    })
                    : createLogContent.encounterShiny({
                        location: player.town.dungeon.name,
                        pokemon: enemyPokemon.name,
                    })
            );
        } else if (!App.game.party.alreadyCaughtPokemon(enemyPokemon.id)) {
            App.game.logbook.newLog(
                LogBookTypes.NEW,
                createLogContent.encounterWild({
                    location: player.town.dungeon.name,
                    pokemon: enemyPokemon.name,
                })
            );
        }
        DungeonRunner.fighting(true);
    }

    /**
 * Handles generating the enemy Trainer Pokemon
 */
    public static generateTrainerPokemon() {
        this.counter = 0;

        if (this.trainerPokemonIndex() >= this.trainer().getTeam().length) {
            return;
        }

        const pokemon = this.trainer().getTeam()[this.trainerPokemonIndex()];
        const baseHealth = DungeonRunner.fightingBoss() ? pokemon.maxHealth : DungeonRunner.dungeon.baseHealth;
        const level = DungeonRunner.fightingBoss() ? pokemon.level : DungeonRunner.dungeonLevel();
        const enemyPokemon = PokemonFactory.generateDungeonTrainerPokemon(pokemon, DungeonRunner.chestsOpened(), baseHealth, level, DungeonRunner.fightingBoss());
        this.enemyPokemonArray().push(new EnemyPokemon(enemyPokemon));
        if (this.doubleBattle && this.remainingTrainerPokemon() >= 2 && this.enemyPokemonArray().filter(p => p.pokemon().isAlive() || p.catching()).length == 1) {
            this.trainerPokemonIndex(this.trainerPokemonIndex() + 1);
            this.generateTrainerPokemon();
        }
    }

    public static generateNewBoss() {
        DungeonRunner.fighting(true);
        this.catching(false);
        this.counter = 0;
        this.enemyPokemonArray([]);
        this.doubleBattle = false;

        // Finding boss from bossList
        const enemy = Rand.fromWeightedArray(DungeonRunner.dungeon.availableBosses(), DungeonRunner.dungeon.bossWeightList);
        // Pokemon
        if (enemy instanceof DungeonBossPokemon) {
            const enemyPokemon = PokemonFactory.generateDungeonBoss(enemy, DungeonRunner.chestsOpened());

            this.enemyPokemonArray().push(new EnemyPokemon(enemyPokemon));
            PokemonHelper.incrementPokemonStatistics(enemyPokemon.id, GameConstants.PokemonStatisticsType.Encountered, enemyPokemon.shiny, enemyPokemon.gender, enemyPokemon.shadow);
            // Shiny
            if (enemyPokemon.shiny) {
                App.game.logbook.newLog(
                    LogBookTypes.SHINY,
                    App.game.party.alreadyCaughtPokemon(enemyPokemon.id, true)
                        ? createLogContent.encounterShinyDupe({
                            location: player.town.dungeon.name,
                            pokemon: enemyPokemon.name,
                        })
                        : createLogContent.encounterShiny({
                            location: player.town.dungeon.name,
                            pokemon: enemyPokemon.name,
                        })
                );
            } else if (!App.game.party.alreadyCaughtPokemon(enemyPokemon.id)) {
                App.game.logbook.newLog(
                    LogBookTypes.NEW,
                    createLogContent.encounterWild({
                        location: player.town.dungeon.name,
                        pokemon: enemyPokemon.name,
                    })
                );
            }
        } else {
            this.trainer(enemy);
            this.trainerPokemonIndex(0);
            this.doubleBattle = this.trainer().options.doubleBattle == true;

            this.generateTrainerPokemon();
        }
    }

    public static CurrentlyCatching() {
        return this.enemyPokemonArray().some(x => x.catching());
    }

}
