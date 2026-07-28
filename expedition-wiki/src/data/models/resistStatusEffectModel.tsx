import { Link } from "react-router-dom";

import { useGameContext } from "../../context/gameContext";

import { StatusEffectModel } from "./statusEffectModel";
import { StatusEffectState } from "../../types/enums";

export class ResistStatusEffectModel {

  statusEffectModel!: StatusEffectModel;

  statusEffectModelList!: StatusEffectModel[];

  constructor(init:Partial<ResistStatusEffectModel>, statusEffectModel: StatusEffectModel) {  
    Object.assign(this, init);

    this.statusEffectModel = statusEffectModel;

    this.statusEffectModelList = this.statusEffectModelList.map((model) => new StatusEffectModel(model));
  }

  get resistedStatusEffectModel(): StatusEffectModel {
    return this.statusEffectModelList[0];
  }

  descriptionComponent(stack: number): React.ReactNode {
    
    const { gameModel } = useGameContext();

    const resistedEffect = (
      <>
        <Link
          className='link'
          to={`/${gameModel.name}/effect/${this.resistedStatusEffectModel.effectName}`} 
          mask={`/${gameModel.name.replaceAll(' ', '_')}/effect/${this.resistedStatusEffectModel.effectName.replaceAll(' ', '_')}`}
          >
            {this.resistedStatusEffectModel.effectName}
        </Link>
      </>
    );

    return (
      <>
        {`${ StatusEffectState[this.statusEffectModel.state] === 'Active' ? 'Clear' : 'Resist' } ${stack} ${stack === 1 ? 'stack' : 'stacks'} of `}{resistedEffect}
      </>
    )
  }
};