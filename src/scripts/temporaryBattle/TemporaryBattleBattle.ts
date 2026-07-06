interface TemporaryBattleCatchState {
    pokemon: BattlePokemon;
    pokeball: GameConstants.Pokeball;
    catchRateActual: number;
}

class TemporaryBattleBattle extends Battle {

    static index: KnockoutObservable<number> = ko.observable(0);
    static totalPokemons: KnockoutObservable<number> = ko.observable(0);
    static catchingPokemons: KnockoutObservableArray<TemporaryBattleCatchState> = ko.observableArray([]);
    static enemyPokemons: KnockoutComputed<BattlePokemon[]> = ko.pureComputed(() => {
        return TemporaryBattleBattle.getEnemyPokemons();
    });
    static activeEnemyPokemons: KnockoutComputed<BattlePokemon[]> = ko.pureComputed(() => {
        return TemporaryBattleBattle.activeEnemyPokemonSlots().filter((pokemon): pokemon is BattlePokemon => !!pokemon);
    });
    static activeEnemyPokemonSlots: KnockoutComputed<Array<BattlePokemon | null>> = ko.pureComputed(() => {
        if (!TemporaryBattleBattle.battle?.optionalArgs.isDoubleBattle) {
            return TemporaryBattleBattle.getActiveEnemyPokemonSlots(false);
        }
        return TemporaryBattleBattle.visibleEnemyPokemonSlots();
    });

    public static isDoubleBattle: KnockoutComputed<boolean> = ko.pureComputed(() => {
        return !!TemporaryBattleBattle.battle?.optionalArgs.isDoubleBattle;
    });

    public static isCatchingPokemon(pokemon: BattlePokemon): boolean {
        return !!pokemon && this.catchingPokemons().some((catchState) => catchState.pokemon === pokemon);
    }

    public static getCatchState(pokemon: BattlePokemon): TemporaryBattleCatchState {
        return this.catchingPokemons().find((catchState) => catchState.pokemon === pokemon);
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
        const shouldCatchEnemyPokemon = !this.battle.optionalArgs.isTrainerBattle || enemyPokemon.shadow == GameConstants.ShadowStatus.Shadow;
        if (shouldCatchEnemyPokemon) {
            // Attempting to catch Pokemon
            const isShiny: boolean = enemyPokemon.shiny;
            const isShadow: boolean = enemyPokemon.shadow == GameConstants.ShadowStatus.Shadow;
            const pokeBall: GameConstants.Pokeball = App.game.pokeballs.calculatePokeballToUse(enemyPokemon.id, isShiny, isShadow, enemyPokemon.encounterType);
            if (pokeBall !== GameConstants.Pokeball.None) {
                const catchState = this.prepareTemporaryBattleCatch(enemyPokemon, pokeBall);
                setTimeout(
                    () => {
                        this.resolveCatchAttempt(enemyPokemon, 1, player.region, catchState.catchRateActual, catchState.pokeball);
                        this.removeTemporaryBattleCatch(enemyPokemon);
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
            if (this.catchingPokemons().length) {
                return;
            }
            TemporaryBattleRunner.battleWon(TemporaryBattleBattle.battle);
        } else {
            this.updateEnemyPokemonSequence(
                this.battle.getPokemonList().length,
                (pokemonIndex) => PokemonFactory.generateTemporaryBattlePokemon(this.battle, pokemonIndex),
                undefined,
                enemyPokemon
            );
        }
        player.lowerItemMultipliers(MultiplierDecreaser.Battle);
    }

    /**
     * Reset the counter.
     */
    public static generateNewEnemy() {
        this.clearCatchState();
        TemporaryBattleBattle.counter = 0;
        this.updateEnemyPokemonSequence(
            this.battle.getPokemonList().length,
            (pokemonIndex) => PokemonFactory.generateTemporaryBattlePokemon(this.battle, pokemonIndex),
            this.battle.optionalArgs.isDoubleBattle ? 2 : 1
        );
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

    private static visibleEnemyPokemonSlots(): Array<BattlePokemon | null> {
        return this.getEnemyPokemonSlots()().map((slot) => {
            const pokemon = slot?.pokemon;
            return pokemon && (pokemon.isAlive() || this.isCatchingPokemon(pokemon)) ? pokemon : null;
        });
    }

    private static prepareTemporaryBattleCatch(enemyPokemon: BattlePokemon, pokeball: GameConstants.Pokeball): TemporaryBattleCatchState {
        const catchState = {
            pokemon: enemyPokemon,
            pokeball,
            catchRateActual: this.calculateActualCatchRate(enemyPokemon, pokeball),
        };
        this.catchingPokemons.push(catchState);
        this.pokeball(pokeball);
        this.catchRateActual(catchState.catchRateActual);
        this.catching(true);
        App.game.pokeballs.usePokeball(pokeball);
        return catchState;
    }

    private static removeTemporaryBattleCatch(enemyPokemon: BattlePokemon): void {
        this.catchingPokemons.remove((catchState) => catchState.pokemon === enemyPokemon);
        this.catching(this.catchingPokemons().length > 0);
        if (!this.catching()) {
            this.catchRateActual(null);
        }
    }

    private static clearCatchState(): void {
        this.catching(false);
        this.catchingPokemons([]);
        this.catchRateActual(null);
    }
}
