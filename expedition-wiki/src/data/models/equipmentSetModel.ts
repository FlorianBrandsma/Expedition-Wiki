export class EquipmentSetModel {

  id!: number;

  name!: string;

  iconResourceName!: string;

  statusEffectStack!: number;

  constructor(init:Partial<EquipmentSetModel>) {  
    Object.assign(this, init);
  }

  get params(): string[] {
    return ['set', this.name];
  }
}