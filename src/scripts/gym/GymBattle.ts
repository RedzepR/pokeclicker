/// <reference path="../utilities/BattlePokemonSlotList.ts"/>

class GymBattle extends Battle {

    static gym: Gym;
    static index: KnockoutObservable<number> = ko.observable(0);
    static totalPokemons: KnockoutObservable<number> = ko.observable(0);
    static enemyPokemonSlotList = new BattlePokemonSlotList();
    static enemyPokemons: KnockoutComputed<BattlePokemon[]> = ko.pureComputed(() => {
        return GymBattle.enemyPokemonSlotList.enemyPokemons();
    });
    static activeEnemyPokemons: KnockoutComputed<BattlePokemon[]> = ko.pureComputed(() => {
        return GymBattle.enemyPokemonSlotList.activeEnemyPokemons();
    });
    static activeEnemyPokemonSlots: KnockoutComputed<Array<BattlePokemon | null>> = ko.pureComputed(() => {
        return GymBattle.enemyPokemonSlotList.activeEnemyPokemonSlots(GymBattle.gym?.optionalArgs.isDoubleBattle);
    });

    public static pokemonAttack() {
        if (GymRunner.running()) {
            this.attackActivePokemon((pokemon) => App.game.party.calculatePokemonAttack(pokemon.type1, pokemon.type2));
        }
    }

    public static clickAttack(targetPokemon = this.enemyPokemon()) {
        if (!GymRunner.running()) {
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
            this.enemyPokemonSlotList.replaceDefeatedPokemon(
                enemyPokemon,
                this.gym.getPokemonList().length,
                (pokemonIndex) => PokemonFactory.generateGymPokemon(this.gym, pokemonIndex)
            );
            if (this.enemyPokemon() === enemyPokemon || !this.enemyPokemon()?.isAlive()) {
                this.enemyPokemon(this.enemyPokemonSlotList.firstActivePokemon());
            }
        }
    }

    /**
     * Reset the counter.
     */
    public static generateNewEnemy() {
        this.counter = 0;
        this.enemyPokemonSlotList.reset(
            this.maxActivePokemon(),
            this.gym.getPokemonList().length,
            (pokemonIndex) => PokemonFactory.generateGymPokemon(this.gym, pokemonIndex)
        );
        this.enemyPokemon(this.enemyPokemonSlotList.firstActivePokemon());
    }

    public static pokemonsDefeatedComputable: KnockoutComputed<number> = ko.pureComputed(() => {
        return GymBattle.index();
    });

    public static pokemonsUndefeatedComputable: KnockoutComputed<number> = ko.pureComputed(() => {
        return GymBattle.totalPokemons() - GymBattle.index();
    })

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
        return this.gym.optionalArgs.isDoubleBattle ? 2 : 1;
    }
}
