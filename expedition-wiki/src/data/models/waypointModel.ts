import { WaypointType } from "../../types/enums";

export class WaypointModel {

  name!: string;

  type!: number;

  positionX!: number;
  positionZ!: number;

  radius!: number;

  constructor(init:Partial<WaypointModel>) {  
    Object.assign(this, init);

    this.positionX = Number(init.positionX!.toFixed(2));
    this.positionZ = Number(init.positionZ!.toFixed(2));
  }

  get typeDescription(): WaypointType {
    return WaypointType[this.type];
  }
}