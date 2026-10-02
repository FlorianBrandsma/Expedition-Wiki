import { TextReferenceModel } from "./textReferenceModel";
import ReferenceDescription from "../../services/textReferenceManager";

export class EventEffectModel {

  id!: number;

  effectName!: string;
  effectIconResourceName!: string;

  description!: string;

  textReferenceModelList!: TextReferenceModel[];

  constructor(init:Partial<EventEffectModel>) {  
    Object.assign(this, init);

    this.textReferenceModelList = this.textReferenceModelList.map((model) => new TextReferenceModel(model));
  }

  get typeDescription(): string {
    return 'Event';
  }

  get descriptionComponent(): React.ReactNode {
    return (
      ReferenceDescription(this.description, this.textReferenceModelList)
    )
  }
}