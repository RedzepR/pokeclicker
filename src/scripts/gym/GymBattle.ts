interface GymBattlePokemonSlot {
    pokemon: BattlePokemon;
    pokemonIndex: number;
}

class GymBattle extends Battle {

    static gym: Gym;
    static index: KnockoutObservable<number> = ko.observable(0);
    static totalPokemons: KnockoutObservable<number> = ko.observable(0);
    static enemyPokemonSlots: KnockoutObservableArray<GymBattlePokemonSlot | null> = ko.observableArray([]);
    static enemyPokemons: KnockoutComputed<BattlePokemon[]> = ko.pureComputed(() => {
        return GymBattle.enemyPokemonSlots()
            .filter((slot): slot is GymBattlePokemonSlot => !!slot)
            .map((slot) => slot.pokemon);
    });
    static activeEnemyPokemons: KnockoutComputed<BattlePokemon[]> = ko.pureComputed(() => {
        return GymBattle.enemyPokemons().filter((pokemon) => pokemon.isAlive());
    });
    static activeEnemyPokemonSlots: KnockoutComputed<Array<BattlePokemon | null>> = ko.pureComputed(() => {
        if (!GymBattle.gym?.optionalArgs.isDoubleBattle) {
            return GymBattle.activeEnemyPokemons();
        }
        return GymBattle.enemyPokemonSlots().map((slot) => slot?.pokemon.isAlive() ? slot.pokemon : null);
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
            this.replaceDefeatedEnemyPokemon(enemyPokemon);
            if (this.enemyPokemon() === enemyPokemon || !this.enemyPokemon()?.isAlive()) {
                this.enemyPokemon(this.activeEnemyPokemons()[0] ?? null);
            }
        }
    }

    /**
     * Reset the counter.
     */
    public static generateNewEnemy() {
        this.counter = 0;
        const slots: GymBattlePokemonSlot[] = [];
        for (let pokemonIndex = 0; pokemonIndex < this.maxActivePokemon() && pokemonIndex < this.gym.getPokemonList().length; pokemonIndex++) {
            slots.push(this.createEnemyPokemonSlot(pokemonIndex));
        }
        this.enemyPokemonSlots(slots);
        this.enemyPokemon(slots[0]?.pokemon ?? null);
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

    private static createEnemyPokemonSlot(pokemonIndex: number): GymBattlePokemonSlot {
        return {
            pokemon: PokemonFactory.generateGymPokemon(this.gym, pokemonIndex),
            pokemonIndex,
        };
    }

    private static replaceDefeatedEnemyPokemon(enemyPokemon: BattlePokemon) {
        const enemyPokemonSlotIndex = this.enemyPokemonSlots().findIndex((slot) => slot?.pokemon === enemyPokemon);
        if (enemyPokemonSlotIndex < 0) {
            return;
        }
        const nextPokemonIndex = Math.max(...this.enemyPokemonSlots().map((slot) => slot?.pokemonIndex ?? -1)) + 1;
        const replacementSlot = nextPokemonIndex < this.gym.getPokemonList().length
            ? this.createEnemyPokemonSlot(nextPokemonIndex)
            : null;
        this.enemyPokemonSlots.splice(enemyPokemonSlotIndex, 1, replacementSlot);
    }
}
