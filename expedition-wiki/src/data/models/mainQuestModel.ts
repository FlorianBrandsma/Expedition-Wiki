export class MainQuestModel {

  id!: number;

  questName!: string;
  
  mainQuestModelList!: MainQuestModel[];

  constructor(init:Partial<MainQuestModel>) {  
    Object.assign(this, init);

    this.mainQuestModelList = this.mainQuestModelList.map((model) => new MainQuestModel(model));
  }
}