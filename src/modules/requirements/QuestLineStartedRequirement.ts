import { AchievementOption } from '../GameConstants';
import QuestLineState from '../quests/QuestLineState';
import { QuestLineNameType } from '../quests/QuestLineNameType';

import Requirement from './Requirement';

export default class QuestLineStartedRequirement extends Requirement {
    get quest() {
        return App.game.quests.getQuestLine(this.questLineName);
    }

    constructor(private questLineName: QuestLineNameType, option = AchievementOption.equal) {
        super(1, option);
    }

    public getProgress(): number {
        const state = this.quest?.state() ?? QuestLineState.inactive;
        return +(state !== QuestLineState.inactive);
    }

    public hint(): string {
        return `Questline ${this.quest?.displayName ?? this.questLineName} needs to ${this.option !== AchievementOption.less ? 'be started' : 'not be started yet'}.`;
    }
}
