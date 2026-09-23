import ExLink from "../../components/exLink/exLink";
import { QuantitativeInequalityType } from "../../types/enums";

export class ItemCaseConditionModel {

  inequalityType!: number;

  quantity!: number;
  
  itemName!: string;
  itemAssetIconResourceName!: string;

  constructor(init:Partial<ItemCaseConditionModel>) {  
    Object.assign(this, init);
  }

  get descriptionComponent(): React.ReactNode {
    
    const item = (
      <ExLink name={this.itemName} params={['item', this.itemName]} />
    );

    return (
      <>
        {`In possession of ${QuantitativeInequalityType[this.inequalityType].toLowerCase()} ${this.quantity}`} {item}
      </>
    )
  }
}