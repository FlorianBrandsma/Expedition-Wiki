import ExLink from "../../components/exLink/exLink";
import { SpatialInequalityType } from "../../types/enums";

export class FactionCaseConditionModel {

  inequalityType!: number;

  factionRank!: number;
  
  factionName!: string;
  factionIconResourceName!: string;

  constructor(init:Partial<FactionCaseConditionModel>) {  
    Object.assign(this, init);
  }

  descriptionComponent(): React.ReactNode {
      
    const faction = (
      <ExLink pageName={'faction'} name={this.factionName} />
    );

    return (
      <>
        {faction}{` rank ${SpatialInequalityType[this.inequalityType].toLowerCase()} ${this.factionRank}`}
      </>
    )
  }
}