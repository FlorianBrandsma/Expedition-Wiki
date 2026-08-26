import { ClimateModel } from "../climateModel";
import { StatusEffectModel } from "../statusEffectModel";

export class ClimatePageModel {

  climateModel!: ClimateModel;

  statusEffectModelList!: StatusEffectModel[];

  constructor(init:Partial<ClimatePageModel>) {  
    Object.assign(this, init);

    this.climateModel = new ClimateModel(this.climateModel);

    this.statusEffectModelList = this.statusEffectModelList.map((model) => new StatusEffectModel(model));
  }
}