export class TaskModel {

  id!: string;

  name!: string;

  completeObjective!: boolean;
  repeatable!: boolean;

  constructor(init:Partial<TaskModel>) {  
    Object.assign(this, init);
  }
}