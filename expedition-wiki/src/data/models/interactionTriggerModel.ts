import { InteractionTriggerActivationType, InteractionTriggerTargetType, InteractionTriggerType } from "../../types/enums";

import { InteractionModel } from "./interactionModel";
import { InputInteractionTriggerModel } from "./inputInteractionTriggerModel";
import { CaseConditionModel } from "./caseConditionModel";
import { EventModel } from "./eventModel";

export class InteractionTriggerModel {

  id!: number;

  type!: number;
  targetType!: number;
  activationType!: number;

  eventName!: string;

  interactionModel!: InteractionModel;

  eventModel!: EventModel;

  inputInteractionTriggerModelList!: InputInteractionTriggerModel[];

  caseConditionModelList!: CaseConditionModel[];

  constructor(init:Partial<InteractionTriggerModel>) {  
    Object.assign(this, init);

    if (this.interactionModel) this.interactionModel = new InteractionModel(this.interactionModel);

    if (this.eventModel)       this.eventModel       = new EventModel      (this.eventModel);

    this.inputInteractionTriggerModelList = this.inputInteractionTriggerModelList.map((model) => new InputInteractionTriggerModel(model));

    this.caseConditionModelList           = this.caseConditionModelList          .map((model) => new CaseConditionModel          (model));
  }

  get inputInteractionTriggerModel(): InputInteractionTriggerModel {
    return this.inputInteractionTriggerModelList[0];
  }

  get typeDescription(): string {
    return InteractionTriggerType[this.type];
  }

  get targetTypeDescription(): string {
    return InteractionTriggerTargetType[this.targetType];
  }

  get activationTypeDescription(): string {
    return InteractionTriggerActivationType[this.activationType];
  }

  get interactionTimeDescription(): string {
    return this.interactionModel.timeDescription;
  }
}