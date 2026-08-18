export class TaskCaseConditionModel {

  taskInactive!: boolean;
  taskActive!: boolean;
  taskComplete!: boolean;

  taskName!: string;
  taskWorldInteractableIconResourceName!: string;
  
  constructor(init:Partial<TaskCaseConditionModel>) {  
    Object.assign(this, init);
  }

  description(): string {

    let list: string[] = [];

    if (this.taskInactive)
      list.push('inactive');

    if (this.taskActive)
      list.push('active');

    if (this.taskComplete)
      list.push('complete');

    return `${this.taskName} ${list.join(' or ')}`;
  }
}