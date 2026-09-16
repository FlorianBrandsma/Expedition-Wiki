import { TaskModel } from "./taskModel";

export class SideQuestModel {

  questName!: string;
  
  taskModelList!: TaskModel[];

  constructor(init:Partial<SideQuestModel>) {  
    Object.assign(this, init);

    this.taskModelList = this.taskModelList.map((model) => new TaskModel(model));
  }
}