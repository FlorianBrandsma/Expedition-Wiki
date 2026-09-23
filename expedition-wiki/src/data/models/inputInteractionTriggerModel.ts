import { ActionDelayModel } from "./actionDelayModel";

export class InputInteractionTriggerModel {

  description!: string;

  actionDelayModelList!: ActionDelayModel[];

  constructor(init:Partial<InputInteractionTriggerModel>) {  
    Object.assign(this, init);

    this.actionDelayModelList = this.actionDelayModelList.map((model) => new ActionDelayModel(model));
  }

  get actionDelayModel(): ActionDelayModel {
    return this.actionDelayModelList[0];
  }
}