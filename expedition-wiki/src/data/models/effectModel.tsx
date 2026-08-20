import { AbilityEffectTargetType, EffectType } from "../../types/enums";
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

  successChance!: number;

  targetType!: number;

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

  get typeDescription(): string {
  
    switch (EffectType[this.type])
    {
      case 'Resource': return this.resourceEffectModel!.typeDescription;
      case 'Event':    return this.eventEffectModel   !.typeDescription;
      case 'Status':   return this.statusEffectModel  !.typeDescription;
    }
  }

  get targetTypeDescription(): string {
    return `${AbilityEffectTargetType[this.targetType]}`;
  }

  get successChanceDescription(): string {
    return `${this.successChance}%`;
  }

  descriptionComponent(stack?: number): React.ReactNode {

    const currentStack = stack ?? this.stack;

    switch (EffectType[this.type])
    {
      case 'Resource': return this.resourceEffectModel!.description(currentStack);
      case 'Event':    return this.eventEffectModel   !.descriptionComponent();
      case 'Status':   return this.statusEffectModel  !.descriptionComponent(currentStack);
    }
  }
}