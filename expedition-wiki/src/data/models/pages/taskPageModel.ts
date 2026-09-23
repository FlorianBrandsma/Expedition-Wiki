import { TaskModel } from "../taskModel";
import { BehaviourInteractionModel } from "../behaviourInteractionModel";
import { InteractionTriggerModel } from "../interactionTriggerModel";
import { StatusEffectModel } from "../statusEffectModel";
import { CaseConditionModel } from "../caseConditionModel";
import { EventModel } from "../eventModel";

export class TaskPageModel {

  taskModel!: TaskModel;

  behaviourInteractionModelList!: BehaviourInteractionModel[];

  eventModelList!: EventModel[];

  interactionTriggerModelList!: InteractionTriggerModel[];

  statusEffectModelList!: StatusEffectModel[];

  caseConditionModelList!: CaseConditionModel[];

  constructor(init:Partial<TaskPageModel>) {  
    Object.assign(this, init);

    if(this.taskModel) this.taskModel = new TaskModel(this.taskModel);

    this.behaviourInteractionModelList = this.behaviourInteractionModelList.map((model) => new BehaviourInteractionModel(model));

    this.eventModelList                = this.eventModelList               .map((model) => new EventModel               (model));

    this.interactionTriggerModelList   = this.interactionTriggerModelList  .map((model) => new InteractionTriggerModel  (model));

    this.statusEffectModelList         = this.statusEffectModelList        .map((model) => new StatusEffectModel        (model));

    this.caseConditionModelList        = this.caseConditionModelList       .map((model) => new CaseConditionModel       (model));
  }
}