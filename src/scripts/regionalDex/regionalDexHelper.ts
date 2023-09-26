class regionalDexHelper {
    public static initialize() { }

    public static checkIfPokemonIsInRegionalDex(region: GameConstants.Region, pokemonID: number) {
        return RegionalDex[region].includes(Math.floor(pokemonID)) && region >= PokemonHelper.calcNativeRegion(PokemonHelper.getPokemonById(pokemonID).name);
    }
}
