import ExLink from "../../components/exLink/exLink";
import { TaskModel } from "./taskModel";

export class TaskCaseConditionModel {

  taskInactive!: boolean;
  taskActive!: boolean;
  taskComplete!: boolean;

  taskModel!: TaskModel;

  constructor(init:Partial<TaskCaseConditionModel>) {  
    Object.assign(this, init);

    if (this.taskModel) this.taskModel = new TaskModel(this.taskModel);
  }

  get descriptionComponent(): React.ReactNode {

    let list: string[] = [];

    if (this.taskInactive)
      list.push('inactive');

    if (this.taskActive)
      list.push('active');

    if (this.taskComplete)
      list.push('complete');

    return (
      <>
        {<ExLink name={this.taskModel.name} params={this.taskModel.params} />}{` ${list.join(' or ')}`}
      </>
    );
  }
}