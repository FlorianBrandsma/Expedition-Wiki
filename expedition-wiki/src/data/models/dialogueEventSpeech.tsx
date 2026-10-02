import { TextReferenceModel } from "./textReferenceModel";
import ReferenceDescription from "../../services/textReferenceManager";
import { SpeechType } from "../../types/enums";
import { WorldInteractableModel } from "./worldInteractableModel";

export class DialogueEventSpeechModel {

  id!: number;

  speechType!: number;

  text!: string;

  worldInteractableModelList!: WorldInteractableModel[];
  
  textReferenceModelList!: TextReferenceModel[];

  constructor(init:Partial<DialogueEventSpeechModel>) {  
    Object.assign(this, init);

    this.textReferenceModelList     = this.textReferenceModelList    .map((model) => new TextReferenceModel    (model));

    this.worldInteractableModelList = this.worldInteractableModelList.map((model) => new WorldInteractableModel(model));
  }

  get worldInteractableModel(): WorldInteractableModel {
    return this.worldInteractableModelList[0];
  }

  get name(): string {
    return this.worldInteractableModel ? this.worldInteractableModel.name || "Player" : "";
  }

  get speechTypeDescription(): string {
    return SpeechType[this.speechType];
  }

  get textComponent(): React.ReactNode {
    return (
      ReferenceDescription(this.text, this.textReferenceModelList)
    )
  }
}