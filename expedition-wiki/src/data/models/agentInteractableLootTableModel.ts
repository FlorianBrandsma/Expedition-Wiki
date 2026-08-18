import { RarityType } from "../../types/enums";

import { CaseConditionModel } from "./caseConditionModel";

export class AgentInteractableLootTableModel {

  id!: number;

  name!: string;

  agentInteractableName!: string;
  agentInteractableAssetIconResourceName!: string;

  itemMinimumQuantity!: number;
  itemMaximumQuantity!: number;

  itemRarityType!: number;

  caseConditionModelList!: CaseConditionModel[];

  constructor(init:Partial<AgentInteractableLootTableModel>) {  
    Object.assign(this, init);

    this.caseConditionModelList = this.caseConditionModelList.map((model) => new CaseConditionModel(model));
  }

  get quantityDescription(): string {
    return `${this.itemMinimumQuantity}${(this.itemMaximumQuantity > 0 ? `-${this.itemMaximumQuantity}` : '')}`;
  }

  get rarityDescription(): string {
    return `${RarityType[this.itemRarityType]}`;
  }
}