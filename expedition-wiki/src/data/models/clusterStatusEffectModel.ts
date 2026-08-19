import { StatusEffectModel } from "./statusEffectModel";

export class ClusterStatusEffectModel {

  id!: number;

  description!: string;
  
  statusEffectName!: string;

  statusEffectIconResourceName!: string;

  statusEffectModelList!: StatusEffectModel[];

  constructor(init:Partial<ClusterStatusEffectModel>) {  
    Object.assign(this, init);

    this.statusEffectModelList = this.statusEffectModelList.map((model) => new StatusEffectModel(model));
  }
}