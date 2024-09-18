///<reference path="../Battle.ts"/>
class TemporaryBattleBattle extends Battle {

    static battle: TemporaryBattle;
    static index: KnockoutObservable<number> = ko.observable(0);
    static totalPokemons: KnockoutObservable<number> = ko.observable(0);

    public static pokemonAttack() {
        if (TemporaryBattleRunner.running()) {
            //if (this.index() < 3) {
                super.pokemonAttack();
            //}
        }
    }

    public static clickAttack(index = -1) {
        if (TemporaryBattleRunner.running()) {
            super.clickAttack(index);
        }
    }


    public static defeatPokemon(enemyPoke: EnemyPokemon) {
        const enemyPokemon = enemyPoke.pokemon();
        if (!this.battle.optionalArgs.isTrainerBattle || enemyPokemon.shadow == GameConstants.ShadowStatus.Shadow) {
            // Attempting to catch Pokemon
            const isShiny: boolean = enemyPokemon.shiny;
            const isShadow: boolean = enemyPokemon.shadow == GameConstants.ShadowStatus.Shadow;
            const pokeBall: GameConstants.Pokeball = App.game.pokeballs.calculatePokeballToUse(enemyPokemon.id, isShiny, isShadow, enemyPokemon.encounterType);
            if (pokeBall !== GameConstants.Pokeball.None) {
                this.prepareCatch(enemyPoke, pokeBall);
                setTimeout(
                    () => {
                        this.attemptCatch(enemyPoke, 1, player.region);
                        this.endFight();
                    },
                    App.game.pokeballs.calculateCatchTime(pokeBall)
                );
            } else {
                this.endFight();
            }
        } else {
            this.endFight();
        }
    }

    private static endFight() {
        this.index(this.index() + 1);

        if (this.getAllPokemonByStatus(false).length >= this.battle.getPokemonList().length) {
            TemporaryBattleRunner.battleWon(this.battle);
        } else {
            this.generateNewEnemy();
        }
        player.lowerItemMultipliers(MultiplierDecreaser.Battle);
    }

    /**
     * Reset the counter.
     */
    public static generateNewEnemy() {
        this.counter = 0;
        if (this.index() >= this.battle.getPokemonList().length) {
            return;
        }
        this.enemyPokemonArray().push(new EnemyPokemon(PokemonFactory.generateTemporaryBattlePokemon(this.battle, this.index())));
        if (this.doubleBattle && this.pokemonsUndefeatedComputable() >= 2 && this.enemyPokemonArray().filter(p => p.pokemon().isAlive() || p.catching()).length == 1) {
            this.index(this.index() + 1);
            this.generateNewEnemy();
        }
    }

    public static pokemonsDefeatedComputable: KnockoutComputed<number> = ko.pureComputed(() => {
        return TemporaryBattleBattle.getAllPokemonByStatus(false).length;
    });

    public static pokemonsUndefeatedComputable: KnockoutComputed<number> = ko.pureComputed(() => {
        return TemporaryBattleBattle.totalPokemons() - TemporaryBattleBattle.pokemonsDefeatedComputable();
    })
}
