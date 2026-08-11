export class EquipmentSetModel {

  id!: number;

  name!: string;

  iconResourceName!: string;

  constructor(init:Partial<EquipmentSetModel>) {  
    Object.assign(this, init);
  }
}