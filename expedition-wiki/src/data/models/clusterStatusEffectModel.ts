import { EffectModel } from "./effectModel";

export class ClusterStatusEffectModel {

  id!: number;

  description!: string;
  
  statusEffectName!: string;

  statusEffectIconResourceName!: string;

  effectModelList!: EffectModel[];

  constructor(init:Partial<ClusterStatusEffectModel>) {  
    Object.assign(this, init);

    this.effectModelList = this.effectModelList.map((model) => new EffectModel(model));
  }

  get effectModel(): EffectModel {
    return this.effectModelList[0];
  }
};