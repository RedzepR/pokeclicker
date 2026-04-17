import { Observable } from 'knockout';
import {
    KantoSubRegions, JohtoSubRegions, HoennSubRegions, SinnohSubRegions, UnovaSubRegions, KalosSubRegions, AlolaSubRegions, GalarSubRegions, HisuiSubRegions, PaldeaSubRegions, Region,
} from '../GameConstants';
import GameHelper from '../GameHelper';
import RegionRoute from '../routes/RegionRoute';
import Routes from '../routes/Routes';
import SeededRand from '../utilities/SeededRand';
import RoamingGroup from './RoamingGroup';
import MassOutbreakRequirement from '../requirements/MassOutbreakRequirement';
import MultiRequirement from '../requirements/MultiRequirement';

export default class MassOutbreak {
    public static roamerGroups: RoamingGroup[][] = [
        [new RoamingGroup('Kanto', [KantoSubRegions.Kanto]), new RoamingGroup('Kanto - Sevii Islands', [KantoSubRegions.Sevii123, KantoSubRegions.Sevii4567])],
        [new RoamingGroup('Johto', [JohtoSubRegions.Johto])],
        [new RoamingGroup('Hoenn', [HoennSubRegions.Hoenn]), new RoamingGroup('Hoenn - Orre', [HoennSubRegions.Orre])],
        [new RoamingGroup('Sinnoh', [SinnohSubRegions.Sinnoh])],
        [new RoamingGroup('Unova', [UnovaSubRegions.Unova])],
        [new RoamingGroup('Kalos', [KalosSubRegions.Kalos])],
        [new RoamingGroup('Alola', [AlolaSubRegions.MelemeleIsland, AlolaSubRegions.AkalaIsland, AlolaSubRegions.UlaulaIsland, AlolaSubRegions.PoniIsland]), new RoamingGroup('Alola - Magikarp Jump', [AlolaSubRegions.MagikarpJump])],
        [new RoamingGroup('Galar - South', [GalarSubRegions.SouthGalar]), new RoamingGroup('Galar - North', [GalarSubRegions.NorthGalar]), new RoamingGroup('Galar - Isle of Armor', [GalarSubRegions.IsleofArmor]), new RoamingGroup('Galar - Crown Tundra', [GalarSubRegions.CrownTundra])],
        [new RoamingGroup('Hisui', [HisuiSubRegions.Hisui])],
        [new RoamingGroup('Paldea', [PaldeaSubRegions.Paldea]), new RoamingGroup('Paldea - Kitakami', [PaldeaSubRegions.Kitakami]), new RoamingGroup('Paldea - Blueberry Academy', [PaldeaSubRegions.BlueberryAcademy])],
    ];

    public static increasedChanceRoute: Array<Array<Observable<RegionRoute>>> = new Array(GameHelper.enumLength(Region) - 2) // Remove None and Final
        .fill(0).map((v, i) => new Array(MassOutbreak.roamerGroups[i].length)
            .fill(0).map(() => ko.observable(undefined)));

    // How many hours between when the roaming Pokemon change routes for increased chances
    private static period = 4;

    public static getIncreasedChanceRouteBySubRegionGroup(region: Region, subRegionGroup: number): Observable<RegionRoute> {
        return MassOutbreak.increasedChanceRoute[region]?.[subRegionGroup];
    }

    public static generateIncreasedChanceRoutes(date = new Date()) {
        // Seed the random runmber generator
        SeededRand.seedWithDateHour(date, this.period);

        MassOutbreak.increasedChanceRoute.forEach((subRegionGroups, region) => {
            subRegionGroups.forEach((route, group) => {
                const routes = Routes.getRoutesByRegion(region).filter((r) => this.findGroup(region, r.subRegion ?? 0) === group).filter(r => r.pokemon.special?.some(({ req }) => req instanceof MassOutbreakRequirement || (req instanceof MultiRequirement && req.requirements.some(x => x instanceof MassOutbreakRequirement))));
                // Select a route
                const selectedRoute = SeededRand.fromArray(routes);
                route(selectedRoute);
            });
        });
    }

    public static findGroup(region: Region, subRegion: number) {
        return this.roamerGroups[region].findIndex((g) => g.subRegions.includes(subRegion));
    }
}
