import { TextReferenceModel } from "./textReferenceModel";
import ReferenceDescription from "../../services/textReferenceManager";

export class NoteModel {

  id!: string;

  text!: string;

  textReferenceModelList!: TextReferenceModel[];

  constructor(init:Partial<NoteModel>) {  
    Object.assign(this, init);

    this.textReferenceModelList = this.textReferenceModelList.map((model) => new TextReferenceModel(model));
  }

  textComponent(): React.ReactNode {
      
      return (
        <>{ReferenceDescription(this.text, this.textReferenceModelList)}</>
      )
    }
}