export class WaypointTextReferenceModel {

  waypointName!: string;
  terrainName!: string;
  regionName!: string;

  constructor(init:Partial<WaypointTextReferenceModel>) {  
    Object.assign(this, init);
  }
}