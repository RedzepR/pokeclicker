/// <reference path="../utilities/BattlePokemonSlotList.ts"/>

class TemporaryBattleBattle extends Battle {

    static index: KnockoutObservable<number> = ko.observable(0);
    static totalPokemons: KnockoutObservable<number> = ko.observable(0);
    static enemyPokemonSlotList = new BattlePokemonSlotList();
    static enemyPokemons: KnockoutComputed<BattlePokemon[]> = ko.pureComputed(() => {
        return TemporaryBattleBattle.enemyPokemonSlotList.enemyPokemons();
    });
    static activeEnemyPokemons: KnockoutComputed<BattlePokemon[]> = ko.pureComputed(() => {
        return TemporaryBattleBattle.enemyPokemonSlotList.activeEnemyPokemons();
    });
    static activeEnemyPokemonSlots: KnockoutComputed<Array<BattlePokemon | null>> = ko.pureComputed(() => {
        return TemporaryBattleBattle.enemyPokemonSlotList.activeEnemyPokemonSlots(TemporaryBattleBattle.battle?.optionalArgs.isDoubleBattle);
    });

    public static pokemonAttack() {
        if (TemporaryBattleRunner.running()) {
            this.attackActivePokemon((pokemon) => App.game.party.calculatePokemonAttack(pokemon.type1, pokemon.type2));
        }
    }

    public static clickAttack(targetPokemon = this.enemyPokemon()) {
        if (!TemporaryBattleRunner.running()) {
            return;
        }
        // click attacks disabled and we already beat the starter
        if (App.game.challenges.list.disableClickAttack.active() && player.regionStarters[GameConstants.Region.kanto]() != GameConstants.Starter.None) {
            return;
        }
        // TODO: figure out a better way of handling this
        // Limit click attack speed, Only allow 1 attack per 50ms (20 per second)
        const now = Date.now();
        if (this.lastClickAttack > now - 50) {
            return;
        }
        this.lastClickAttack = now;
        if (!targetPokemon?.isAlive() || !this.enemyPokemons().includes(targetPokemon)) {
            return;
        }
        GameHelper.incrementObservable(App.game.statistics.clickAttacks);
        targetPokemon.damage(App.game.party.calculateClickAttack(true));
        if (!targetPokemon.isAlive()) {
            this.defeatPokemon(targetPokemon);
        }
    }


    public static defeatPokemon(enemyPokemon = this.enemyPokemon()) {
        if (!enemyPokemon) {
            return;
        }
        if (this.shouldCatchEnemyPokemon(enemyPokemon)) {
            // Attempting to catch Pokemon
            const isShiny: boolean = enemyPokemon.shiny;
            const isShadow: boolean = enemyPokemon.shadow == GameConstants.ShadowStatus.Shadow;
            const pokeBall: GameConstants.Pokeball = App.game.pokeballs.calculatePokeballToUse(enemyPokemon.id, isShiny, isShadow, enemyPokemon.encounterType);
            if (pokeBall !== GameConstants.Pokeball.None) {
                this.prepareCatch(enemyPokemon, pokeBall);
                setTimeout(
                    () => {
                        this.attemptCatch(enemyPokemon, 1, player.region);
                        this.endFight(enemyPokemon);
                    },
                    App.game.pokeballs.calculateCatchTime(pokeBall)
                );
            } else {
                this.endFight(enemyPokemon);
            }
        } else {
            this.endFight(enemyPokemon);
        }
    }

    private static endFight(enemyPokemon = this.enemyPokemon()) {
        if (!enemyPokemon) {
            return;
        }
        enemyPokemon.defeat(this.battle.optionalArgs.isTrainerBattle ?? true);

        TemporaryBattleBattle.index(TemporaryBattleBattle.index() + 1);

        if (TemporaryBattleBattle.index() >= TemporaryBattleBattle.battle.getPokemonList().length) {
            TemporaryBattleRunner.battleWon(TemporaryBattleBattle.battle);
        } else {
            this.enemyPokemonSlotList.replaceDefeatedPokemon(
                enemyPokemon,
                this.battle.getPokemonList().length,
                (pokemonIndex) => PokemonFactory.generateTemporaryBattlePokemon(this.battle, pokemonIndex)
            );
            if (this.enemyPokemon() === enemyPokemon || !this.enemyPokemon()?.isAlive()) {
                this.enemyPokemon(this.enemyPokemonSlotList.firstActivePokemon());
            }
        }
        player.lowerItemMultipliers(MultiplierDecreaser.Battle);
    }

    /**
     * Reset the counter.
     */
    public static generateNewEnemy() {
        this.catching(false);
        TemporaryBattleBattle.counter = 0;
        this.enemyPokemonSlotList.reset(
            this.maxActivePokemon(),
            this.battle.getPokemonList().length,
            (pokemonIndex) => PokemonFactory.generateTemporaryBattlePokemon(this.battle, pokemonIndex)
        );
        TemporaryBattleBattle.enemyPokemon(this.enemyPokemonSlotList.firstActivePokemon());
    }

    public static pokemonsDefeatedComputable: KnockoutComputed<number> = ko.pureComputed(() => {
        return TemporaryBattleBattle.index();
    });

    public static pokemonsUndefeatedComputable: KnockoutComputed<number> = ko.pureComputed(() => {
        return TemporaryBattleBattle.totalPokemons() - TemporaryBattleBattle.index();
    })

    static get battle(): TemporaryBattle {
        return TemporaryBattleRunner.battleObservable();
    }

    static set battle(battle: TemporaryBattle) {
        TemporaryBattleRunner.battleObservable(battle);
    }

    private static attackActivePokemon(calculateDamage: (pokemon: BattlePokemon) => number) {
        const enemyPokemons = this.activeEnemyPokemons();
        if (!enemyPokemons.length) {
            return;
        }
        const damageMultiplier = enemyPokemons.length > 1 ? 0.75 : 1;
        enemyPokemons.forEach((pokemon) => {
            pokemon.damage(this.applyDamageMultiplier(calculateDamage(pokemon), damageMultiplier));
        });
        enemyPokemons.filter((pokemon) => !pokemon.isAlive()).forEach((pokemon) => {
            this.defeatPokemon(pokemon);
        });
    }

    private static applyDamageMultiplier(damage: number, damageMultiplier: number): number {
        if (damage <= 0) {
            return 0;
        }
        return Math.max(1, Math.floor(damage * damageMultiplier));
    }

    private static maxActivePokemon() {
        return this.battle.optionalArgs.isDoubleBattle ? 2 : 1;
    }

    private static shouldCatchEnemyPokemon(enemyPokemon: BattlePokemon): boolean {
        return !this.battle.optionalArgs.isDoubleBattle && (!this.battle.optionalArgs.isTrainerBattle || enemyPokemon.shadow == GameConstants.ShadowStatus.Shadow);
    }
}
