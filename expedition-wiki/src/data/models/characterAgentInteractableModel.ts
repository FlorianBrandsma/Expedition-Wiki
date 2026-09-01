import { CharacterAgentInteractableType, EquipmentSlotType } from "../../types/enums";

export class CharacterAgentInteractableModel {

  id!: number;

  type!: number;
  
  agentInteractableName!: string;
  agentInteractableAssetIconResourceName!: string;

  className!: string;

  equipmentSlotType!: number;

  constructor(init:Partial<CharacterAgentInteractableModel>) {  
    Object.assign(this, init);
  }

  get typeDescription(): string {
    return CharacterAgentInteractableType[this.type];
  }

  get equipmentSlotTypeDescription(): string {
    return EquipmentSlotType[this.equipmentSlotType];
  }

  get playable(): boolean {
    return CharacterAgentInteractableType[this.type] === 'Playable';
  }
}