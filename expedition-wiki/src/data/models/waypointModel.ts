import { WaypointType } from "../../types/enums";

export class WaypointModel {

  id!: number;

  name!: string;

  type!: number;

  positionX!: number;
  positionZ!: number;

  radius!: number;

  regionName!: string;
  terrainName!: string;

  constructor(init:Partial<WaypointModel>) {  
    Object.assign(this, init);

    this.positionX = Number(init.positionX!.toFixed(2));
    this.positionZ = Number(init.positionZ!.toFixed(2));
  }

  get typeDescription(): WaypointType {
    return WaypointType[this.type];
  }
  
  get params(): string[] {
    return ['terrain', this.regionName, this.terrainName];
  }

  get optionalParams(): Record<string, string> {
    return { waypoint: this.name };
  }
}