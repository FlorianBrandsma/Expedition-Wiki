import { EventType } from "../../types/enums";
import { EffectEventModel } from "./effectEventModel";

export class EventModel {

  id!: number;

  type!: number;

  name!: string;

  completeTask!: boolean;

  effectEventModelList!: EffectEventModel[];
  
  constructor(init:Partial<EventModel>) {  
    Object.assign(this, init);

    this.effectEventModelList = this.effectEventModelList.map((model) => new EffectEventModel(model));
  }

  get effectEventModel(): EffectEventModel {  
    return this.effectEventModelList[0];
  }

  get typeDescription(): string {

    switch (EventType[this.type])
    {
      case 'Effect': return this.effectEventModel!.typeDescription;

      default: return '';
    }
  }
};