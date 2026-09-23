import ExLink from "../../components/exLink/exLink";
import { WorldInteractableParentType, WorldInteractableType } from "../../types/enums";
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

    const originType = this.taskModel.objectiveName ? 'objective' :
                       this.taskModel.terrainName   ? 'terrain'   : '';

    const parentParams = originType === 'objective' ? [this.taskModel.questName,  this.taskModel.objectiveName] :
                         originType === 'terrain'   ? [this.taskModel.regionName, this.taskModel.terrainName  ] : [];

    const task = (
      <ExLink 
        name={this.taskModel.name} 
        params={[
          originType,
          ...parentParams,
          'interactable',
          WorldInteractableType      [this.taskModel.worldInteractableType]      .toLowerCase(),
          WorldInteractableParentType[this.taskModel.worldInteractableParentType].toLowerCase(),
          this.taskModel.worldInteractableName,
          'task',
          this.taskModel.name
        ]} />
    );

    let list: string[] = [];

    if (this.taskInactive)
      list.push('inactive');

    if (this.taskActive)
      list.push('active');

    if (this.taskComplete)
      list.push('complete');

    return (
      <>
        {task}{` ${list.join(' or ')}`}
      </>
    );
  }
}