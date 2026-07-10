import { AchievementOption } from '../GameConstants';
import QuestLineState from '../quests/QuestLineState';
import { QuestLineNameType } from '../quests/QuestLineNameType';

import Requirement from './Requirement';

export default class QuestLineStepCompletedRequirement extends Requirement {
    get quest() {
        return App.game.quests.getQuestLine(this.questLineName);
    }

    constructor(private questLineName: QuestLineNameType, private questIndex: (() => number) | number, option = AchievementOption.equal) {
        super(1, option);
    }

    public getProgress(): number {
        const quest = this.quest;
        if (!quest) {
            return 0;
        }
        const questIndex = typeof this.questIndex === 'number' ? this.questIndex : (typeof this.questIndex === 'function' ? this.questIndex() : 0);
        return (quest.state() === QuestLineState.ended || quest.curQuest() > questIndex) ? 1 : 0;
    }

    public isCompleted() {
        return this.quest?.state() == QuestLineState.suspended ? false : super.isCompleted();
    }

    public hint(): string {
        const displayName = this.quest?.displayName ?? this.questLineName;
        return this.option !== AchievementOption.less ? `Progress further in questline ${displayName}.` : `Questline ${displayName} has progressed past this point.`;
    }
}
