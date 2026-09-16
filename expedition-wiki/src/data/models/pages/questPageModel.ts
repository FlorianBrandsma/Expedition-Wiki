import { QuestModel } from "../questModel";
import { MainQuestModel } from "../mainQuestModel";
import { ObjectiveModel } from "../objectiveModel";

export class QuestPageModel {

  questModel!: QuestModel;

  objectiveModelList!: ObjectiveModel[];
  
  mainQuestModelList!: MainQuestModel[];

  constructor(init:Partial<QuestPageModel>) {  
    Object.assign(this, init);

    this.questModel = new QuestModel(this.questModel);

    this.objectiveModelList = this.objectiveModelList.map((model) => new ObjectiveModel(model));
    
    this.mainQuestModelList = this.mainQuestModelList.map((model) => new MainQuestModel(model));
  }
}