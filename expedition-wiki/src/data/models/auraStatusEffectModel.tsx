import { StatusEffectModel } from "./statusEffectModel";
import { AuraStatusEffectTargetType, CombatState } from "../../types/enums";

import ExLink from "../../components/exLink/exLink";

export class AuraStatusEffectModel {

  id!: number;

  targetType!: number;
  combatState!: number;
  auraRange!: number;
  
  statusEffectName!: string;
  statusEffectIconResourceName!: string;

  statusEffectModelList!: StatusEffectModel[];

  constructor(init:Partial<AuraStatusEffectModel>) {  
    Object.assign(this, init);

    this.statusEffectModelList = this.statusEffectModelList.map((model) => new StatusEffectModel(model));
  }

  get appliedStatusEffectModel(): StatusEffectModel {
    return this.statusEffectModelList[0];
  }

  descriptionComponent(stack: number): React.ReactNode {

    const appliedEffect = (
      <ExLink pageName={'effect'} name={this.appliedStatusEffectModel.effectName} />
    );

    return (
      <>
        {`Apply ${stack} ${ stack === 1 ? 'stack' : 'stacks'} of `}{appliedEffect}{` to ${CombatState[this.combatState].toLowerCase()} ${AuraStatusEffectTargetType[this.targetType].toLowerCase()}${this.auraRange > 0 ? ` within ${this.auraRange}m` : ''}`}
      </>
    )
  }
}