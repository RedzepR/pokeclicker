///<reference path="../Battle.ts"/>
class GymBattle extends Battle {

    static gym: Gym;
    static index: KnockoutObservable<number> = ko.observable(0);
    static totalPokemons: KnockoutObservable<number> = ko.observable(0);

    public static pokemonAttack() {
        if (GymRunner.running()) {
            super.pokemonAttack();
        }
    }

    public static clickAttack(index = -1) {
        if (GymRunner.running()) {
            super.clickAttack(index); 
        }
    }
    /**
     * Award the player with exp, and go to the next pokemon
     */
    public static defeatPokemon(enemyPokemon: EnemyPokemon) {
        enemyPokemon.pokemon().defeat(true);

        // Make gym "route" regionless
        App.game.breeding.progressEggsBattle(this.gym.badgeReward * 3 + 1, GameConstants.Region.none);
        this.index(this.index() + 1);

        if (this.getAllPokemon().filter(p => !p.isAlive()).length >= this.gym.getPokemonList().length) {
            GymRunner.gymWon(this.gym);
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
        if (this.index() >= this.gym.getPokemonList().length) {
            return;
        }
        this.enemyPokemonArray().push(new EnemyPokemon(PokemonFactory.generateGymPokemon(this.gym, this.index())));
        if (this.doubleBattle && this.pokemonsUndefeatedComputable() >= 2 && this.getAllPokemon().filter(x => x.isAlive()).length == 1) {
            this.index(this.index() + 1);
            this.generateNewEnemy();
        }
    }

    public static pokemonsDefeatedComputable: KnockoutComputed<number> = ko.pureComputed(() => {
        return GymBattle.getAllPokemon().filter(x => !x.isAlive()).length;
    });

    public static pokemonsUndefeatedComputable: KnockoutComputed<number> = ko.pureComputed(() => {
        return GymBattle.gym.getPokemonList().length - GymBattle.pokemonsDefeatedComputable();
    })
}
