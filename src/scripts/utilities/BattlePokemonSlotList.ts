interface BattlePokemonSlot {
    pokemon: BattlePokemon;
    pokemonIndex: number;
}

class BattlePokemonSlotList {
    private slots: KnockoutObservableArray<BattlePokemonSlot | null> = ko.observableArray([]);

    public enemyPokemons(): BattlePokemon[] {
        return this.slots()
            .filter((slot): slot is BattlePokemonSlot => !!slot)
            .map((slot) => slot.pokemon);
    }

    public activeEnemyPokemons(): BattlePokemon[] {
        return this.enemyPokemons().filter((pokemon) => pokemon.isAlive());
    }

    public activeEnemyPokemonSlots(preserveSlots: boolean): Array<BattlePokemon | null> {
        if (!preserveSlots) {
            return this.activeEnemyPokemons();
        }
        return this.slots().map((slot) => slot?.pokemon.isAlive() ? slot.pokemon : null);
    }

    public includes(pokemon: BattlePokemon): boolean {
        return this.enemyPokemons().includes(pokemon);
    }

    public firstActivePokemon(): BattlePokemon | null {
        return this.activeEnemyPokemons()[0] ?? null;
    }

    public reset(maxActivePokemon: number, totalPokemons: number, generatePokemon: (pokemonIndex: number) => BattlePokemon): void {
        const slots: BattlePokemonSlot[] = [];
        for (let pokemonIndex = 0; pokemonIndex < maxActivePokemon && pokemonIndex < totalPokemons; pokemonIndex++) {
            slots.push(this.createSlot(pokemonIndex, generatePokemon));
        }
        this.slots(slots);
    }

    public replaceDefeatedPokemon(enemyPokemon: BattlePokemon, totalPokemons: number, generatePokemon: (pokemonIndex: number) => BattlePokemon): void {
        const enemyPokemonSlotIndex = this.slots().findIndex((slot) => slot?.pokemon === enemyPokemon);
        if (enemyPokemonSlotIndex < 0) {
            return;
        }
        const nextPokemonIndex = Math.max(...this.slots().map((slot) => slot?.pokemonIndex ?? -1)) + 1;
        const replacementSlot = nextPokemonIndex < totalPokemons
            ? this.createSlot(nextPokemonIndex, generatePokemon)
            : null;
        this.slots.splice(enemyPokemonSlotIndex, 1, replacementSlot);
    }

    private createSlot(pokemonIndex: number, generatePokemon: (pokemonIndex: number) => BattlePokemon): BattlePokemonSlot {
        return {
            pokemon: generatePokemon(pokemonIndex),
            pokemonIndex,
        };
    }
}
