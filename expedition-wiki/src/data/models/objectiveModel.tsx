import { TextReferenceModel } from "./textReferenceModel";
import ReferenceDescription from "../../services/textReferenceManager";

export class ObjectiveModel {

  id!: string;

  orderNumber!: number;

  name!: string;

  description!: string;

  questName!: string;

  textReferenceModelList!: TextReferenceModel[];

  constructor(init:Partial<ObjectiveModel>) {  
    Object.assign(this, init);

    this.textReferenceModelList = this.textReferenceModelList.map((model) => new TextReferenceModel(model));
  }

  get descriptionComponent(): React.ReactNode {
    return (
      <>{ReferenceDescription(this.description, this.textReferenceModelList)}</>
    )
  }
}