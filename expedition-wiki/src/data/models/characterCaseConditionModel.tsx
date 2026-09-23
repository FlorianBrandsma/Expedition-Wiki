import ExLink from "../../components/exLink/exLink";

export class CharacterCaseConditionModel {

  characterAgentInteractableName!: string;
  characterAgentInteractableAssetIconResourceName!: string;

  constructor(init:Partial<CharacterCaseConditionModel>) {  
    Object.assign(this, init);
  }

  get descriptionComponent(): React.ReactNode {
        
    const interactable = (
      <ExLink name={this.characterAgentInteractableName} params={['interactable', this.characterAgentInteractableName]} />
    );

    return (
      <>
        {'Initialized by '}{interactable}
      </>
    )
  }
}