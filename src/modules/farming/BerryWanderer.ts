import { PokemonNameType } from '../pokemons/PokemonNameType';
import Requirement from '../requirements/Requirement';

export class BerryWanderer {
    constructor( 
        public pokemon: PokemonNameType[],
        public req: Requirement = null,
        public weight = 1,
    ) {}

    isAvailable(): boolean {
        return this.req?.isCompleted() ?? true;
    }

    getHint(): string {
        return this.req?.hint() ?? '';
    }
}
