/**
 * Holds all the logic for an enemy Pokemon
 */
class EnemyPokemon {

    pokemon: KnockoutObservable<BattlePokemon> = ko.observable(null);
    catching: KnockoutObservable<boolean> = ko.observable(false);
    catchRateActual: KnockoutObservable<number> = ko.observable(null);
    pokeball: KnockoutObservable<GameConstants.Pokeball> = ko.observable(GameConstants.Pokeball.Pokeball);

    constructor(pokemon: BattlePokemon) {
        this.pokemon(pokemon);
    }

}
