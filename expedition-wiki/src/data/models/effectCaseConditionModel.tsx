import ExLink from "../../components/exLink/exLink";
import { CaseConditionTargetType, QuantitativeInequalityType } from "../../types/enums";

export class EffectCaseConditionModel {

  targetType!: number;

  inequalityType!: number;

  stack!: number;

  statusEffectName!: string;
  statusEffectIconResourceName!: string;

  constructor(init:Partial<EffectCaseConditionModel>) {  
    Object.assign(this, init);
  }

  descriptionComponent(): React.ReactNode {
  
    const effect = (
      <ExLink pageName={'effect'} name={this.statusEffectName} />
    );

    return (
      <>
        {`${(CaseConditionTargetType[this.targetType] === 'Self' ? 'Affected' : `${CaseConditionTargetType[this.targetType]} affected`)} by ${QuantitativeInequalityType[this.inequalityType].toLowerCase()} ${this.stack} ${(this.stack === 1 ? 'stack' : 'stacks')} of `}{effect}
      </>
    )
  }
}