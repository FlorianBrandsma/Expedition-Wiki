import { EventModel } from "./eventModel";
import { TerrainModel } from "./terrainModel";

export class TransportEventModel {

  positionX!: number;
  positionZ!: number;

  regionName!: string;
  terrainName!: string;

  eventModelList!: EventModel[];

  terrainModelList!: TerrainModel[];

  constructor(init:Partial<TransportEventModel>) {  
    Object.assign(this, init);

    this.positionX = Number(init.positionX!.toFixed(2));
    this.positionZ = Number(init.positionZ!.toFixed(2));

    this.eventModelList   = this.eventModelList  .map((model) => new EventModel  (model));

    this.terrainModelList = this.terrainModelList.map((model) => new TerrainModel(model));
  }

  get eventModel(): EventModel {
    return this.eventModelList[0];
  }

  get terrainModel(): TerrainModel {
    return this.terrainModelList[0];
  }

  get typeDescription(): string {
    return 'Transport';
  }
}