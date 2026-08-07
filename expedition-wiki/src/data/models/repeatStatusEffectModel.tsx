import { EffectType } from "../../types/enums";
import { EffectModel } from "./effectModel";

import ExLink from "../../components/exLink/exLink";

export class RepeatStatusEffectModel {

  successChance!: number;
  duration!: number;
  
  effectModelList!: EffectModel[];

  constructor(init:Partial<RepeatStatusEffectModel>) {  
    Object.assign(this, init);

    this.duration = Number(init.duration!.toFixed(2));

    this.effectModelList = this.effectModelList.map((model) => new EffectModel(model));
  }

  get effectModel(): EffectModel {
    return this.effectModelList[0];
  }

  descriptionComponent(stack: number): React.ReactNode {

    const successChanceDescription = `${this.successChance < 100 ? `${this.successChance}% chance to ` : ''}`;

    const descriptionBody = EffectType[this.effectModel.type] == 'Status' ? (
      <>
        {successChanceDescription ? 'apply ' : 'Apply '}
        <ExLink pageName={'effect'} name={this.effectModel.name} />
      </>
    ) : (
      this.effectModel.descriptionComponent(stack)
    );

    const repeatedEffectDuration = this.effectModel.statusEffectModel?.duration ?? 0;

    const repeatedEffectDurationDescription = `${repeatedEffectDuration > 0 ? ` for ${repeatedEffectDuration} ${Math.abs(repeatedEffectDuration) !== 1 ? 'seconds' : 'second'}`: ''}`;

    const durationDescription = `${repeatedEffectDurationDescription} every ${Math.abs(this.duration) !== 1 ? `${this.duration} seconds` : 'second'}`;

    return (
      <>
        {successChanceDescription}{descriptionBody}{durationDescription}
      </>
    )
  }
};