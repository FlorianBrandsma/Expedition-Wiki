import { TextReferenceModel } from "./textReferenceModel";
import ReferenceDescription from "../../services/textReferenceManager";
import { SpeechType } from "../../types/enums";

export class SpeechEventModel {

  duration!: number;

  speechType!: number;

  text!: string;

  textReferenceModelList!: TextReferenceModel[];

  constructor(init:Partial<SpeechEventModel>) {  
    Object.assign(this, init);

    this.duration = Number(init.duration!.toFixed(2));

    this.textReferenceModelList = this.textReferenceModelList.map((model) => new TextReferenceModel(model));
  }

  get typeDescription(): string {
    return 'Speech';
  }

  get speechTypeDescription(): string {
    return SpeechType[this.speechType];
  }

  get durationDescription(): string {
    return `${this.duration.toFixed(2)}s`
  }

  get textComponent(): React.ReactNode {
    return (
      ReferenceDescription(this.text, this.textReferenceModelList)
    )
  }
}