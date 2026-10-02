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

  inputInteractionTriggerModelList!: InputInteractionTriggerModel[];

  caseConditionModelList!: CaseConditionModel[];

  interactionModelList!: InteractionModel[];

  eventModelList!: EventModel[];

  constructor(init:Partial<InteractionTriggerModel>) {  
    Object.assign(this, init);

    this.inputInteractionTriggerModelList = this.inputInteractionTriggerModelList.map((model) => new InputInteractionTriggerModel(model));

    this.caseConditionModelList           = this.caseConditionModelList          .map((model) => new CaseConditionModel          (model));

    this.interactionModelList             = this.interactionModelList            .map((model) => new InteractionModel            (model));

    this.eventModelList                   = this.eventModelList                  .map((model) => new EventModel                  (model));
  }

  get inputInteractionTriggerModel(): InputInteractionTriggerModel {
    return this.inputInteractionTriggerModelList[0];
  }

  get interactionModel(): InteractionModel {
    return this.interactionModelList[0];
  }

  get eventModel(): EventModel {
    return this.eventModelList[0];
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