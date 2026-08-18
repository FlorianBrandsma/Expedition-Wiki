import ExLink from "../../components/exLink/exLink";

export class CharacterCaseConditionModel {

  characterAgentInteractableName!: string;
  characterAgentInteractableAssetIconResourceName!: string;

  constructor(init:Partial<CharacterCaseConditionModel>) {  
    Object.assign(this, init);
  }

  descriptionComponent(): React.ReactNode {
        
    const interactable = (
      <ExLink pageName={'interactable'} name={this.characterAgentInteractableName} />
    );

    return (
      <>
        {'Initialized by '}{interactable}
      </>
    )
  }
}