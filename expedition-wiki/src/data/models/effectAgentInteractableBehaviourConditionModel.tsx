import { SpatialInequalityType } from "../../types/enums";

import ExLink from "../../components/exLink/exLink";

export class EffectAgentInteractableBehaviourConditionModel {

  inequalityType!: number;
  
  stack!: number;

  effectName!: string;

  constructor(init:Partial<EffectAgentInteractableBehaviourConditionModel>) {  
    Object.assign(this, init);
  }

  get descriptionComponent(): React.ReactNode {

    const effect = (
      <ExLink name={this.effectName} params={['effect', this.effectName]} />
    );

    return (
      <>
        {effect}{` stack ${SpatialInequalityType[this.inequalityType].toLowerCase()} ${this.stack}`}
      </>
    )
  }
}