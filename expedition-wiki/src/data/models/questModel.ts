import { QuestType } from "../../types/enums";
import { MainQuestModel } from "./mainQuestModel";
import { SideQuestModel } from "./sideQuestModel";

export class QuestModel {

  id!: string;

  type!: number;

  name!: string;

  expansionName!: string;

  mainQuestModelList!: MainQuestModel[];
  sideQuestModelList!: SideQuestModel[];

  constructor(init:Partial<QuestModel>) {  
    Object.assign(this, init);

    this.mainQuestModelList = this.mainQuestModelList.map((model) => new MainQuestModel(model));
    this.sideQuestModelList = this.sideQuestModelList.map((model) => new SideQuestModel(model));
  }

  get mainQuestModel(): MainQuestModel {  
    return this.mainQuestModelList[0];
  }

  get sideQuestModel(): SideQuestModel {  
    return this.sideQuestModelList[0];
  }

  get typeDescription(): string {
    return QuestType[this.type];
  }
}