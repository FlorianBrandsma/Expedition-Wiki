import { AbsoluteInequalityType, ElementalAttributeType, ElementType, NormalAttributeType, ResourceDamageType } from "../../types/enums";

export class AttributeAgentInteractableBehaviourConditionModel {

  inequalityType!: number;
  attributeType!: number;
  damageType!: number;
  elementType!: number;

  constructor(init:Partial<AttributeAgentInteractableBehaviourConditionModel>) {  
    Object.assign(this, init);
  }

  get description(): string {
    return `${AbsoluteInequalityType[this.inequalityType]} ${ResourceDamageType[this.damageType].toLowerCase()} ${ElementType[this.elementType] === 'Normal' ? `${NormalAttributeType[this.attributeType].toLowerCase()}` : `${ElementType[this.elementType].toLowerCase()} ${ElementalAttributeType[this.attributeType].toLowerCase()}`}`;
  }
}