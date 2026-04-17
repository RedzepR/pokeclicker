class MassOutbreakNPC extends NPC {

    constructor(
        public name: string,
        public dialog: string[],
        public region: GameConstants.Region,
        public subRegionGroup: number,
        image: string = undefined,
        requirement?: Requirement | MultiRequirement | OneFromManyRequirement
    ) {
        super(name, dialog, {image: image, requirement: requirement});
    }

    get dialogHTML(): string {
        const route = MassOutbreak.getIncreasedChanceRouteBySubRegionGroup(this.region, this.subRegionGroup)();
        const outbreak = route.pokemon.special?.some(({ req }) => req instanceof MassOutbreakRequirement || (req instanceof MultiRequirement && req.requirements.some(x => x instanceof MassOutbreakRequirement) && req.isCompleted()));

        // If no Outbreak Pokemon unlocked yet
        if (!outbreak) {
            const regionName = RoamingPokemonList.roamerGroups[this.region]?.[this.subRegionGroup]?.name
                ?? GameConstants.camelCaseToString(GameConstants.Region[this.region]);
            return `There haven't been any reports of Mass Outbreaks around ${regionName} lately.`;
        }

        return super.dialogHTML.replace(/{ROUTE_NAME}/g, route.routeName);
    }
}
