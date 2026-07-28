import { EffectType } from "../../types/enums";
import { ResourceEffectModel } from "./resourceEffectModel";
import { EventEffectModel } from "./eventEffectModel";
import { StatusEffectModel } from "./statusEffectModel";

export class EffectModel {
  
  id!: number;
  type!: number;

  name!: string;

  iconResourceName!: string;

  stack!: number;
  stackLimit!: number;

  resourceEffectModelList!: ResourceEffectModel[];
  eventEffectModelList!:    EventEffectModel[];
  statusEffectModelList!:   StatusEffectModel[];

  constructor(init:Partial<EffectModel>) {  
    Object.assign(this, init);

    this.resourceEffectModelList = this.resourceEffectModelList.map((model) => new ResourceEffectModel(model));
    this.eventEffectModelList    = this.eventEffectModelList   .map((model) => new EventEffectModel   (model));
    this.statusEffectModelList   = this.statusEffectModelList  .map((model) => new StatusEffectModel  (model));
  }

  get resourceEffectModel(): ResourceEffectModel {  
    return this.resourceEffectModelList[0];
  }

  get eventEffectModel(): EventEffectModel {  
    return this.eventEffectModelList[0];
  }

  get statusEffectModel(): StatusEffectModel {  
    return this.statusEffectModelList[0];
  }

  descriptionComponent(stack?: number): React.ReactNode {

    const currentStack = stack ?? this.stack;

    switch (EffectType[this.type])
    {
      case 'Resource': return this.resourceEffectModel!.description(currentStack);
      case 'Event':    return this.eventEffectModel   !.description;
      case 'Status':   return this.statusEffectModel  !.descriptionComponent(currentStack);
    }
  }
};