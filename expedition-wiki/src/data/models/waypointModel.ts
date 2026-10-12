import { WaypointType } from "../../types/enums";

export class WaypointModel {

  id!: number;

  name!: string;

  type!: number;

  positionX!: number;
  positionZ!: number;

  radius!: number;

  constructor(init:Partial<WaypointModel>) {  
    Object.assign(this, init);
  }

  get typeDescription(): WaypointType {
    return WaypointType[this.type];
  }
}