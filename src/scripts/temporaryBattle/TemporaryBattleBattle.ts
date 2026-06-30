class TemporaryBattleBattle extends Battle {

    static index: KnockoutObservable<number> = ko.observable(0);
    static totalPokemons: KnockoutObservable<number> = ko.observable(0);
    static enemyPokemons: KnockoutComputed<BattlePokemon[]> = ko.pureComputed(() => {
        return TemporaryBattleBattle.getEnemyPokemons();
    });
    static activeEnemyPokemons: KnockoutComputed<BattlePokemon[]> = ko.pureComputed(() => {
        return TemporaryBattleBattle.getActiveEnemyPokemons();
    });
    static activeEnemyPokemonSlots: KnockoutComputed<Array<BattlePokemon | null>> = ko.pureComputed(() => {
        return TemporaryBattleBattle.getActiveEnemyPokemonSlots(TemporaryBattleBattle.battle?.optionalArgs.isDoubleBattle);
    });

    public static pokemonAttack() {
        if (TemporaryBattleRunner.running()) {
            super.pokemonAttack();
        }
    }

    public static clickAttack(targetPokemon = this.enemyPokemon()) {
        if (!TemporaryBattleRunner.running()) {
            return;
        }
        super.clickAttack(targetPokemon);
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
            this.replaceDefeatedEnemyPokemon(
                enemyPokemon,
                this.battle.getPokemonList().length,
                (pokemonIndex) => PokemonFactory.generateTemporaryBattlePokemon(this.battle, pokemonIndex)
            );
            this.selectFirstActiveEnemyPokemonIfNeeded(enemyPokemon);
        }
        player.lowerItemMultipliers(MultiplierDecreaser.Battle);
    }

    /**
     * Reset the counter.
     */
    public static generateNewEnemy() {
        this.catching(false);
        TemporaryBattleBattle.counter = 0;
        this.resetEnemyPokemonSlots(
            this.maxActivePokemon(),
            this.battle.getPokemonList().length,
            (pokemonIndex) => PokemonFactory.generateTemporaryBattlePokemon(this.battle, pokemonIndex)
        );
        TemporaryBattleBattle.enemyPokemon(this.getFirstActiveEnemyPokemon());
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

    private static maxActivePokemon() {
        return this.battle.optionalArgs.isDoubleBattle ? 2 : 1;
    }

    private static shouldCatchEnemyPokemon(enemyPokemon: BattlePokemon): boolean {
        return !this.battle.optionalArgs.isDoubleBattle && (!this.battle.optionalArgs.isTrainerBattle || enemyPokemon.shadow == GameConstants.ShadowStatus.Shadow);
    }
}
