import * as GameConstants from '../GameConstants';
import MassOutbreak from '../pokemons/MassOutbreak';
import { Routes } from '../routes';
import Requirement from './Requirement';

export default class MassOutbreakRequirement extends Requirement {
    Region: GameConstants.Region;
    Route: number;
    constructor(region: GameConstants.Region, route: number, option: GameConstants.AchievementOption = GameConstants.AchievementOption.equal) {
        super(1, option);
        this.Region = region;
        this.Route = route;
    }

    public getProgress(): number {
        return +(MassOutbreak.getIncreasedChanceRouteBySubRegionGroup(this.Region, Routes.getSubRegionByRegionRoute(this.Region, this.Route))()?.number == this.Route);
    }

    // eslint-disable-next-line class-methods-use-this
    public hint(): string {
        return 'Might randomly appear.';
    }
}
