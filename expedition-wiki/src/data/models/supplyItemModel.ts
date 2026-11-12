import { SupplyItemType } from "../../types/enums";

export class SupplyItemModel {

  type!: number;

  itemName!: string;
  
  itemAssetIconResourceName!: string;

  constructor(init:Partial<SupplyItemModel>) {  
    Object.assign(this, init);
	}

  get typeDescription(): string {
    return `${ SupplyItemType[this.type] } Supply`;
  }
}