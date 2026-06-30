class GymBattle extends Battle {

    static gym: Gym;
    static index: KnockoutObservable<number> = ko.observable(0);
    static totalPokemons: KnockoutObservable<number> = ko.observable(0);
    static enemyPokemons: KnockoutComputed<BattlePokemon[]> = ko.pureComputed(() => {
        return GymBattle.getEnemyPokemons();
    });
    static activeEnemyPokemons: KnockoutComputed<BattlePokemon[]> = ko.pureComputed(() => {
        return GymBattle.getActiveEnemyPokemons();
    });
    static activeEnemyPokemonSlots: KnockoutComputed<Array<BattlePokemon | null>> = ko.pureComputed(() => {
        return GymBattle.getActiveEnemyPokemonSlots(GymBattle.gym?.optionalArgs.isDoubleBattle);
    });

    public static pokemonAttack() {
        if (GymRunner.running()) {
            super.pokemonAttack();
        }
    }

    public static clickAttack(targetPokemon = this.enemyPokemon()) {
        if (!GymRunner.running()) {
            return;
        }
        super.clickAttack(targetPokemon);
    }

    /**
     * Award the player with exp, and go to the next pokemon
     */
    public static defeatPokemon(enemyPokemon = this.enemyPokemon()) {
        if (!enemyPokemon) {
            return;
        }
        enemyPokemon.defeat(true);

        // Make gym "route" regionless
        App.game.breeding.progressEggsBattle(this.gym.badgeReward * 3 + 1, GameConstants.Region.none);
        this.index(this.index() + 1);
        player.lowerItemMultipliers(MultiplierDecreaser.Battle);

        if (this.index() >= this.gym.getPokemonList().length) {
            GymRunner.gymWon(this.gym);
        } else {
            this.replaceDefeatedEnemyPokemon(
                enemyPokemon,
                this.gym.getPokemonList().length,
                (pokemonIndex) => PokemonFactory.generateGymPokemon(this.gym, pokemonIndex)
            );
            this.selectFirstActiveEnemyPokemonIfNeeded(enemyPokemon);
        }
    }

    /**
     * Reset the counter.
     */
    public static generateNewEnemy() {
        this.counter = 0;
        this.resetEnemyPokemonSlots(
            this.maxActivePokemon(),
            this.gym.getPokemonList().length,
            (pokemonIndex) => PokemonFactory.generateGymPokemon(this.gym, pokemonIndex)
        );
        this.enemyPokemon(this.getFirstActiveEnemyPokemon());
    }

    public static pokemonsDefeatedComputable: KnockoutComputed<number> = ko.pureComputed(() => {
        return GymBattle.index();
    });

    public static pokemonsUndefeatedComputable: KnockoutComputed<number> = ko.pureComputed(() => {
        return GymBattle.totalPokemons() - GymBattle.index();
    })

    private static maxActivePokemon() {
        return this.gym.optionalArgs.isDoubleBattle ? 2 : 1;
    }
}
