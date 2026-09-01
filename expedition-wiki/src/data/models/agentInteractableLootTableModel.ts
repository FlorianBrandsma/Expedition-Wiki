import { RarityType } from "../../types/enums";

import { ItemModel } from "./itemModel";
import { CaseConditionModel } from "./caseConditionModel";

export class AgentInteractableLootTableModel {

  id!: number;

  name!: string;

  agentInteractableName!: string;
  agentInteractableAssetIconResourceName!: string;

  itemMinimumQuantity!: number;
  itemMaximumQuantity!: number;

  itemRarityType!: number;

  itemModelList!: ItemModel[];

  caseConditionModelList!: CaseConditionModel[];

  constructor(init:Partial<AgentInteractableLootTableModel>) {  
    Object.assign(this, init);

    this.itemModelList          = this.itemModelList         .map((model) => new ItemModel         (model));

    this.caseConditionModelList = this.caseConditionModelList.map((model) => new CaseConditionModel(model));
  }

  get quantityDescription(): string {
    return `${this.itemMinimumQuantity}${(this.itemMaximumQuantity > this.itemMinimumQuantity ? `-${this.itemMaximumQuantity}` : '')}`;
  }

  get rarityDescription(): string {
    return `${RarityType[this.itemRarityType]}`;
  }
}