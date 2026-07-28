import { Link } from "react-router-dom";

import { useGameContext } from "../../context/gameContext";

import { StatusEffectModel } from "./statusEffectModel";
import { AuraStatusEffectTargetType, CombatState } from "../../types/enums";

export class AuraStatusEffectModel {

  targetType!: number;
  combatState!: number;
  auraRange!: number;
  
  statusEffectModelList!: StatusEffectModel[];

  constructor(init:Partial<AuraStatusEffectModel>) {  
    Object.assign(this, init);

    this.statusEffectModelList = this.statusEffectModelList.map((model) => new StatusEffectModel(model));
  }

  get appliedStatusEffectModel(): StatusEffectModel {
      return this.statusEffectModelList[0];
    }

  descriptionComponent(stack: number): React.ReactNode {

    const { gameModel } = useGameContext();

    const appliedEffect = (
      <>
        <Link
          className='link'
          to={`/${gameModel.name}/effect/${this.appliedStatusEffectModel.effectName}`} 
          mask={`/${gameModel.name.replaceAll(' ', '_')}/effect/${this.appliedStatusEffectModel.effectName.replaceAll(' ', '_')}`}
          >
            {this.appliedStatusEffectModel.effectName}
        </Link>
      </>
    );

    return (
      <>
        {`Apply ${stack} ${ stack === 1 ? 'stack' : 'stacks'} of `}{appliedEffect}{` to ${CombatState[this.combatState].toLowerCase()} ${AuraStatusEffectTargetType[this.targetType].toLowerCase()}${this.auraRange > 0 ? ` within ${this.auraRange}m` : ''}`}
      </>
    )
  }
};