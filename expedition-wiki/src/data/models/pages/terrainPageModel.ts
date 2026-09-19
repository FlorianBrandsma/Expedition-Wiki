import { TerrainModel } from "../terrainModel";
import { ClimateModel } from "../climateModel";
import { WorldInteractableModel } from "../worldInteractableModel";

export class TerrainPageModel {

  terrainModel!: TerrainModel;

  climateModelList!: ClimateModel[];

  worldInteractableModelList!: WorldInteractableModel[];

  constructor(init:Partial<TerrainPageModel>) {  
    Object.assign(this, init);

    this.terrainModel = new TerrainModel(this.terrainModel);

    this.climateModelList           = this.climateModelList          .map((model) => new ClimateModel          (model));

    this.worldInteractableModelList = this.worldInteractableModelList.map((model) => new WorldInteractableModel(model));
  }
}