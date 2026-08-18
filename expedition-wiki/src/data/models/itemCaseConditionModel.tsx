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

  descriptionComponent(): React.ReactNode {
    
    const item = (
      <ExLink pageName={'item'} name={this.itemName} />
    );

    return (
      <>
        {`In possession of ${QuantitativeInequalityType[this.inequalityType].toLowerCase()} ${this.quantity}`} {item}
      </>
    )
  }
}