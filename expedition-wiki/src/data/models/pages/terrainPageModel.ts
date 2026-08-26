import { TerrainModel } from "../terrainModel";
import { ClimateModel } from "../climateModel";

export class TerrainPageModel {

  terrainModel!: TerrainModel;

  climateModelList!: ClimateModel[];

  constructor(init:Partial<TerrainPageModel>) {  
    Object.assign(this, init);

    this.terrainModel = new TerrainModel(this.terrainModel);

    this.climateModelList = this.climateModelList.map((model) => new ClimateModel(model));
  }
}