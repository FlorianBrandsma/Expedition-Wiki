import ExLink from "../../components/exLink/exLink";
import { CompanionCaseConditionPartyState } from "../../types/enums";

export class CompanionCaseConditionModel {

  partyState!: number;

  playableCharacterAgentInteractableName!: string;
  playableCharacterAgentInteractableAssetIconResourceName!: string;

  constructor(init:Partial<CompanionCaseConditionModel>) {  
    Object.assign(this, init);
  }

  descriptionComponent(): React.ReactNode {
          
    const interactable = (
      <ExLink pageName={'interactable'} name={this.playableCharacterAgentInteractableName} />
    );

    return (
      <>
        {interactable}{` recruited${(CompanionCaseConditionPartyState[this.partyState] !== 'Either' ? `, ${CompanionCaseConditionPartyState[this.partyState].toLowerCase()}` : '')}`}
      </>
    )
  }
}