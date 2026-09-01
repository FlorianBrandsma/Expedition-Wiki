import { BehaviourCommandType, BehaviourConditionType, RelationshipType } from "../../types/enums";

import { AttributeAgentInteractableBehaviourConditionModel } from "./attributeAgentInteractableBehaviourConditionModel";
import { DistanceAgentInteractableBehaviourConditionModel } from "./distanceAgentInteractableBehaviourConditionModel";
import { EffectAgentInteractableBehaviourConditionModel } from "./effectAgentInteractableBehaviourConditionModel";
import { EnmityAgentInteractableBehaviourConditionModel } from "./enmityAgentInteractableBehaviourConditionModel";
import { GroupAgentInteractableBehaviourConditionModel } from "./groupAgentInteractableBehaviourConditionModel";
import { ItemAgentInteractableBehaviourConditionModel } from "./itemAgentInteractableBehaviourConditionModel";
import { ResourceAgentInteractableBehaviourConditionModel } from "./resourceAgentInteractableBehaviourConditionModel";
import { TargetAgentInteractableBehaviourConditionModel } from "./targetAgentInteractableBehaviourConditionModel";
import { ItemAgentInteractableBehaviourCommandModel } from "./itemAgentInteractableBehaviourCommandModel";
import { AbilityAgentInteractableBehaviourCommandModel } from "./abilityAgentInteractableBehaviourCommandModel";

export class AgentInteractableBehaviourModel {

  id!: number;

  relationshipType!: number;
  conditionType!: number;
  commandType!: number;
  
  targetAgentInteractableBehaviourConditionModelList!:    TargetAgentInteractableBehaviourConditionModel[];
  groupAgentInteractableBehaviourConditionModelList!:     GroupAgentInteractableBehaviourConditionModel[];
  distanceAgentInteractableBehaviourConditionModelList!:  DistanceAgentInteractableBehaviourConditionModel[];
  enmityAgentInteractableBehaviourConditionModelList!:    EnmityAgentInteractableBehaviourConditionModel[];
  resourceAgentInteractableBehaviourConditionModelList!:  ResourceAgentInteractableBehaviourConditionModel[];
  attributeAgentInteractableBehaviourConditionModelList!: AttributeAgentInteractableBehaviourConditionModel[];
  effectAgentInteractableBehaviourConditionModelList!:    EffectAgentInteractableBehaviourConditionModel[];
  itemAgentInteractableBehaviourConditionModelList!:      ItemAgentInteractableBehaviourConditionModel[];

  abilityAgentInteractableBehaviourCommandModelList!:     AbilityAgentInteractableBehaviourCommandModel[];
  itemAgentInteractableBehaviourCommandModelList!:        ItemAgentInteractableBehaviourCommandModel[];

  constructor(init:Partial<AgentInteractableBehaviourModel>) {  
    Object.assign(this, init);

    this.targetAgentInteractableBehaviourConditionModelList    = this.targetAgentInteractableBehaviourConditionModelList   .map((model) => new TargetAgentInteractableBehaviourConditionModel   (model));
    this.groupAgentInteractableBehaviourConditionModelList     = this.groupAgentInteractableBehaviourConditionModelList    .map((model) => new GroupAgentInteractableBehaviourConditionModel    (model));
    this.distanceAgentInteractableBehaviourConditionModelList  = this.distanceAgentInteractableBehaviourConditionModelList .map((model) => new DistanceAgentInteractableBehaviourConditionModel (model));
    this.enmityAgentInteractableBehaviourConditionModelList    = this.enmityAgentInteractableBehaviourConditionModelList   .map((model) => new EnmityAgentInteractableBehaviourConditionModel   (model));
    this.resourceAgentInteractableBehaviourConditionModelList  = this.resourceAgentInteractableBehaviourConditionModelList .map((model) => new ResourceAgentInteractableBehaviourConditionModel (model));
    this.attributeAgentInteractableBehaviourConditionModelList = this.attributeAgentInteractableBehaviourConditionModelList.map((model) => new AttributeAgentInteractableBehaviourConditionModel(model));
    this.effectAgentInteractableBehaviourConditionModelList    = this.effectAgentInteractableBehaviourConditionModelList   .map((model) => new EffectAgentInteractableBehaviourConditionModel   (model));
    this.itemAgentInteractableBehaviourConditionModelList      = this.itemAgentInteractableBehaviourConditionModelList     .map((model) => new ItemAgentInteractableBehaviourConditionModel     (model));

    this.abilityAgentInteractableBehaviourCommandModelList     = this.abilityAgentInteractableBehaviourCommandModelList    .map((model) => new AbilityAgentInteractableBehaviourCommandModel    (model));
    this.itemAgentInteractableBehaviourCommandModelList        = this.itemAgentInteractableBehaviourCommandModelList       .map((model) => new ItemAgentInteractableBehaviourCommandModel       (model));
  }

  get targetAgentInteractableBehaviourConditionModel(): TargetAgentInteractableBehaviourConditionModel {
    return this.targetAgentInteractableBehaviourConditionModelList[0];
  }

  get groupAgentInteractableBehaviourConditionModel(): GroupAgentInteractableBehaviourConditionModel {
    return this.groupAgentInteractableBehaviourConditionModelList[0];
  }

  get distanceAgentInteractableBehaviourConditionModel(): DistanceAgentInteractableBehaviourConditionModel {
    return this.distanceAgentInteractableBehaviourConditionModelList[0];
  }

  get enmityAgentInteractableBehaviourConditionModel(): EnmityAgentInteractableBehaviourConditionModel {
    return this.enmityAgentInteractableBehaviourConditionModelList[0];
  }

  get resourceAgentInteractableBehaviourConditionModel(): ResourceAgentInteractableBehaviourConditionModel {
    return this.resourceAgentInteractableBehaviourConditionModelList[0];
  }

  get attributeAgentInteractableBehaviourConditionModel(): AttributeAgentInteractableBehaviourConditionModel {
    return this.attributeAgentInteractableBehaviourConditionModelList[0];
  }

  get effectAgentInteractableBehaviourConditionModel(): EffectAgentInteractableBehaviourConditionModel {
    return this.effectAgentInteractableBehaviourConditionModelList[0];
  }

  get itemAgentInteractableBehaviourConditionModel(): ItemAgentInteractableBehaviourConditionModel {
    return this.itemAgentInteractableBehaviourConditionModelList[0];
  }

  get abilityAgentInteractableBehaviourCommandModel(): AbilityAgentInteractableBehaviourCommandModel {
    return this.abilityAgentInteractableBehaviourCommandModelList[0];
  }

  get itemAgentInteractableBehaviourCommandModel(): ItemAgentInteractableBehaviourCommandModel {
    return this.itemAgentInteractableBehaviourCommandModelList[0];
  }

  get targetDescription(): string {
    return `${RelationshipType[this.relationshipType]}`;
  }

  get conditionDescriptionComponent(): React.ReactNode {

    switch (BehaviourConditionType[this.conditionType])
    {
      case 'Target':    return this.targetAgentInteractableBehaviourConditionModel   !.description;
      case 'Group':     return this.groupAgentInteractableBehaviourConditionModel    !.description;
      case 'Distance':  return this.distanceAgentInteractableBehaviourConditionModel !.description;
      case 'Enmity':    return this.enmityAgentInteractableBehaviourConditionModel   !.description;
      case 'Resource':  return this.resourceAgentInteractableBehaviourConditionModel !.description;
      case 'Attribute': return this.attributeAgentInteractableBehaviourConditionModel!.description;
      case 'Effect':    return this.effectAgentInteractableBehaviourConditionModel   !.descriptionComponent;
      case 'Item':      return this.itemAgentInteractableBehaviourConditionModel     !.descriptionComponent;
    }
  }

  get commandDescriptionComponent(): React.ReactNode {

    switch (BehaviourCommandType[this.commandType])
    {
      case 'Engage':  return 'Engage'
      case 'Ability': return this.abilityAgentInteractableBehaviourCommandModel!.descriptionComponent;
      case 'Item':    return this.itemAgentInteractableBehaviourCommandModel   !.descriptionComponent;
    }
  }
}