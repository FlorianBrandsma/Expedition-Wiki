export class AgentInteractableModel {

  id!: number;
  type!: number;

  elementType!: number;

  health!: number;
  mana!: number;
  physicalAttack!: number;
  magicalAttack!: number;
  physicalDefence!: number;
  magicalDefence!: number;

  constructor(init:Partial<AgentInteractableModel>) {  
    Object.assign(this, init);
  }
}