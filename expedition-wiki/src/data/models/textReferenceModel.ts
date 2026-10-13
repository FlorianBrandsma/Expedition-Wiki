import { WaypointTextReferenceModel } from "./waypointTextReferenceModel";

export class TextReferenceModel {

  type!: number;

  name!: string;
  referenceCode!: string;

  waypointTextReferenceModelList!: WaypointTextReferenceModel[];

  constructor(init:Partial<TextReferenceModel>) {  
    Object.assign(this, init);

    this.waypointTextReferenceModelList = this.waypointTextReferenceModelList.map((model) => new WaypointTextReferenceModel(model));
  }

  get waypointTextReferenceModel(): WaypointTextReferenceModel {
    return this.waypointTextReferenceModelList[0];
  }
}