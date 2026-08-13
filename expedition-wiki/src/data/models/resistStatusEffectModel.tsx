import { StatusEffectModel } from "./statusEffectModel";
import { StatusEffectState } from "../../types/enums";

import ExLink from "../../components/exLink/exLink";

export class ResistStatusEffectModel {

  id!: number;

  statusEffectName!: string;
  statusEffectIconResourceName!: string;

  statusEffectModel?: StatusEffectModel;

  statusEffectModelList!: StatusEffectModel[];

  constructor(init:Partial<ResistStatusEffectModel>, statusEffectModel?: StatusEffectModel) {  
    Object.assign(this, init);

    this.statusEffectModel = statusEffectModel;

    this.statusEffectModelList = this.statusEffectModelList.map((model) => new StatusEffectModel(model));
  }

  get resistedStatusEffectModel(): StatusEffectModel {
    return this.statusEffectModelList[0];
  }

  descriptionComponent(stack: number): React.ReactNode {

    const resistedEffect = (
      <ExLink pageName={'effect'} name={this.resistedStatusEffectModel.effectName} />
    );

    return (
      <>
        {`${ StatusEffectState[this.statusEffectModel?.state ?? 0] === 'Active' ? 'Clear' : 'Resist' } ${stack} ${stack === 1 ? 'stack' : 'stacks'} of `}{resistedEffect}
      </>
    )
  }
};