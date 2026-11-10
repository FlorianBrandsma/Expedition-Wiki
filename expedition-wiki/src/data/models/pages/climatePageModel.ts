import { ClimateModel } from "../climateModel";
import { TerrainModel } from "../terrainModel";
import { StatusEffectModel } from "../statusEffectModel";

export class ClimatePageModel {

  climateModel!: ClimateModel;

  terrainModelList!: TerrainModel[];

  statusEffectModelList!: StatusEffectModel[];

  constructor(init:Partial<ClimatePageModel>) {  
    Object.assign(this, init);

    this.climateModel = new ClimateModel(this.climateModel);

    this.terrainModelList      = this.terrainModelList     .map((model) => new TerrainModel     (model));

    this.statusEffectModelList = this.statusEffectModelList.map((model) => new StatusEffectModel(model));
  }

  get terrainModel(): TerrainModel {
    return this.terrainModelList[0];
  }
}