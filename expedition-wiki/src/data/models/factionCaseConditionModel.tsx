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

  get descriptionComponent(): React.ReactNode {
      
    const faction = (
      <ExLink name={this.factionName} params={['faction', this.factionName]} />
    );

    return (
      <>
        {faction}{` rank ${SpatialInequalityType[this.inequalityType].toLowerCase()} ${this.factionRank}`}
      </>
    )
  }
}