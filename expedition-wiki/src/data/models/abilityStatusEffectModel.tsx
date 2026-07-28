import { Link } from "react-router-dom";

import { useGameContext } from "../../context/gameContext";

import { EffectModel } from "./effectModel";
import { AbilityEffectTargetType } from "../../types/enums";

export class AbilityStatusEffectModel {

  targetType!: number;
  stack!: number;
  successChance!: number;
  
  effectModelList!: EffectModel[];

  constructor(init:Partial<AbilityStatusEffectModel>) {  
    Object.assign(this, init);

    this.effectModelList = this.effectModelList.map((model) => new EffectModel(model));
  }

  get effectModel(): EffectModel {
    return this.effectModelList[0];
  }

  descriptionComponent(stack: number): React.ReactNode {
    
    const { gameModel } = useGameContext();

    const successChanceDescription = `${this.successChance < 100 ? `${this.successChance}% chance to ` : ''}`;

    const descriptionBody = (
      <>
        {successChanceDescription ? 'apply ' : 'Apply '} 
        {`${stack} ${stack === 1 ? 'stack' : 'stacks'} of `}
        <Link
            className='link'
            to={`/${gameModel.name}/effect/${this.effectModel.name}`} 
            mask={`/${gameModel.name.replaceAll(' ', '_')}/effect/${this.effectModel.name.replaceAll(' ', '_')}`}
            >
              {this.effectModel.name}
          </Link>
      </>
    );

    const descriptionTail = ` to the ${AbilityEffectTargetType[this.targetType].toLowerCase()} when ${AbilityEffectTargetType[this.targetType] === 'User' ? 'using' : 'hit with'} an arm ability`;

    return (
      <>
        {successChanceDescription}{descriptionBody}{descriptionTail}
      </>
    )
  }
};