import { SupplyItemType } from "../../types/enums";

export class SupplyItemModel {

  type!: number;

  constructor(init:Partial<SupplyItemModel>) {  
    Object.assign(this, init);
	}

  get typeDescription(): string {
    return `${ SupplyItemType[this.type] } Supply`;
  }
}