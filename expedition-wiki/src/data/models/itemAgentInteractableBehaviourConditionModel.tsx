import { SpatialInequalityType } from "../../types/enums";

import ExLink from "../../components/exLink/exLink";

export class ItemAgentInteractableBehaviourConditionModel {

  inequalityType!: number;

  quantity!: number;

  itemName!: string;

  constructor(init:Partial<ItemAgentInteractableBehaviourConditionModel>) {  
    Object.assign(this, init);
  }

  get descriptionComponent(): React.ReactNode {
  
    const item = (
      <ExLink name={this.itemName} params={['item', this.itemName]} />
    );

    return (
      <>
        {item}{` quantity ${SpatialInequalityType[this.inequalityType].toLowerCase()} ${this.quantity}`}
      </>
    )
  }
}