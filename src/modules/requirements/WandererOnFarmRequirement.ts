import * as GameConstants from '../GameConstants';
import { PokemonNameType } from '../pokemons/PokemonNameType';
import Requirement from './Requirement';

export default class WandererOnFarmRequirement extends Requirement {
    private pokemon: PokemonNameType[];

    constructor(
        pokemonName: PokemonNameType[],
        capturesNeeded = 1,
        option: GameConstants.AchievementOption = GameConstants.AchievementOption.more,
    ) {
        super(capturesNeeded, option);
        this.pokemon = pokemonName;
    }

    public getProgress() {
        const numWanderer = App.game.farming.plotList.map(x => x.wanderer?.name).filter(name => this.pokemon.includes(name)).length;

        return Math.min(numWanderer, this.requiredValue);
    }

    public hint(): string {
        return `Have atleast ${this.requiredValue} ${this.pokemon.join(' and ')} wandering on the Farm at the same time.`;
    }
}
