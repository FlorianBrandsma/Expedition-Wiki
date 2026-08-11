import { TextReferenceModel } from "./textReferenceModel";
import ExLink from "../../components/exLink/exLink";
import { TextReferenceType } from "../../types/enums";
import ReferenceDescription from "../../services/textReferenceManager";

export class EventEffectModel {

  description!: string;

  textReferenceModelList!: TextReferenceModel[];

  constructor(init:Partial<EventEffectModel>) {  
    Object.assign(this, init);

    this.textReferenceModelList = this.textReferenceModelList.map((model) => new TextReferenceModel(model));
  }

  get typeDescription(): string {
    return 'Event';
  }

  descriptionComponent(): React.ReactNode {

    const result = ReferenceDescription(this.description, this.textReferenceModelList);

    return (
      <>{result}</>
    )
  }
};