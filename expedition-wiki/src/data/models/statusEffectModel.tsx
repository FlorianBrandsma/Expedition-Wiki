import { StatusEffectType } from "../../types/enums";

import { BasicStatusEffectModel } from "./basicStatusEffectModel";
import { AttributeStatusEffectModel } from "./attributeStatusEffectModel";
import { AbilityStatusEffectModel } from "./abilityStatusEffectModel";
import { AuraStatusEffectModel } from "./auraStatusEffectModel";
import { RepeatStatusEffectModel } from "./repeatStatusEffectModel";
import { ResistStatusEffectModel } from "./resistStatusEffectModel";
import { DisableStatusEffectModel } from "./disableStatusEffectModel";
import { MorphStatusEffectModel } from "./morphStatusEffectModel";
import { SizeStatusEffectModel } from "./sizeStatusEffectModel";
import { SensorStatusEffectModel } from "./sensorStatusEffectModel";
import { StandingStatusEffectModel } from "./standingStatusEffectModel";
import { ClusterStatusEffectModel } from "./clusterStatusEffectModel";

export class StatusEffectModel {
  
  id!: number;

  type!: number;

  duration!: number;
  
  state!: number;

  stack!: number;
  stackLimit!: number;

  effectName!: string;
  effectIconResourceName!: string;

  basicStatusEffectModelList!:     BasicStatusEffectModel[];
  attributeStatusEffectModelList!: AttributeStatusEffectModel[];
  abilityStatusEffectModelList!:   AbilityStatusEffectModel[];
  auraStatusEffectModelList!:      AuraStatusEffectModel[];
  repeatStatusEffectModelList!:    RepeatStatusEffectModel[];
  resistStatusEffectModelList!:    ResistStatusEffectModel[];
  disableStatusEffectModelList!:   DisableStatusEffectModel[];
  morphStatusEffectModelList!:     MorphStatusEffectModel[];
  sizeStatusEffectModelList!:      SizeStatusEffectModel[];
  sensorStatusEffectModelList!:    SensorStatusEffectModel[];
  standingStatusEffectModelList!:  StandingStatusEffectModel[];
  clusterStatusEffectModelList!:   ClusterStatusEffectModel[];

  constructor(init:Partial<StatusEffectModel>) {  
    Object.assign(this, init);

    this.basicStatusEffectModelList     = this.basicStatusEffectModelList    .map((model) => new BasicStatusEffectModel    (model));
    this.attributeStatusEffectModelList = this.attributeStatusEffectModelList.map((model) => new AttributeStatusEffectModel(model));
    this.abilityStatusEffectModelList   = this.abilityStatusEffectModelList  .map((model) => new AbilityStatusEffectModel  (model));
    this.auraStatusEffectModelList      = this.auraStatusEffectModelList     .map((model) => new AuraStatusEffectModel     (model));
    this.repeatStatusEffectModelList    = this.repeatStatusEffectModelList   .map((model) => new RepeatStatusEffectModel   (model));
    this.resistStatusEffectModelList    = this.resistStatusEffectModelList   .map((model) => new ResistStatusEffectModel   (model, this));
    this.disableStatusEffectModelList   = this.disableStatusEffectModelList  .map((model) => new DisableStatusEffectModel  (model));
    this.morphStatusEffectModelList     = this.morphStatusEffectModelList    .map((model) => new MorphStatusEffectModel    (model));
    this.sizeStatusEffectModelList      = this.sizeStatusEffectModelList     .map((model) => new SizeStatusEffectModel     (model));
    this.sensorStatusEffectModelList    = this.sensorStatusEffectModelList   .map((model) => new SensorStatusEffectModel   (model));
    this.standingStatusEffectModelList  = this.standingStatusEffectModelList .map((model) => new StandingStatusEffectModel (model));
    this.clusterStatusEffectModelList   = this.clusterStatusEffectModelList  .map((model) => new ClusterStatusEffectModel  (model));
  }

  get basicStatusEffectModel(): BasicStatusEffectModel {  
    return this.basicStatusEffectModelList[0];
  }

  get attributeStatusEffectModel(): AttributeStatusEffectModel {  
    return this.attributeStatusEffectModelList[0];
  }

  get abilityStatusEffectModel(): AbilityStatusEffectModel {  
    return this.abilityStatusEffectModelList[0];
  }

  get auraStatusEffectModel(): AuraStatusEffectModel {  
    return this.auraStatusEffectModelList[0];
  }

  get repeatStatusEffectModel(): RepeatStatusEffectModel {  
    return this.repeatStatusEffectModelList[0];
  }

  get resistStatusEffectModel(): ResistStatusEffectModel {  
    return this.resistStatusEffectModelList[0];
  }

  get disableStatusEffectModel(): DisableStatusEffectModel {  
    return this.disableStatusEffectModelList[0];
  }
  
  get morphStatusEffectModel(): MorphStatusEffectModel {  
    return this.morphStatusEffectModelList[0];
  }

  get sizeStatusEffectModel(): SizeStatusEffectModel {  
    return this.sizeStatusEffectModelList[0];
  }

  get sensorStatusEffectModel(): SensorStatusEffectModel {  
    return this.sensorStatusEffectModelList[0];
  }
  
  get standingStatusEffectModel(): StandingStatusEffectModel {  
    return this.standingStatusEffectModelList[0];
  }

  get clusterStatusEffectModel(): ClusterStatusEffectModel {  
    return this.clusterStatusEffectModelList[0];
  }

  get typeDescription(): string {
    return `${ StatusEffectType[this.type] } Status`;
  }

  descriptionComponent(stack?: number): React.ReactNode {
  
    console.log(this.effectName);
    const currentStack = stack ?? this.stack;
    switch (StatusEffectType[this.type])
    {
      case 'Basic':     return this.basicStatusEffectModel    !.description;
      case 'Attribute': return this.attributeStatusEffectModel!.description(currentStack);
      case 'Ability':   return this.abilityStatusEffectModel  !.descriptionComponent(currentStack);
      case 'Aura':      return this.auraStatusEffectModel     !.descriptionComponent(currentStack);
      case 'Repeat':    return this.repeatStatusEffectModel   !.descriptionComponent(currentStack);
      case 'Resist':    return this.resistStatusEffectModel   !.descriptionComponent(currentStack);
      case 'Disable':   return this.disableStatusEffectModel  !.description();
      case 'Morph':     return this.morphStatusEffectModel    !.description();
      case 'Size':      return this.sizeStatusEffectModel     !.description(currentStack);
      case 'Sensor':    return this.sensorStatusEffectModel   !.description(currentStack);
      case 'Standing':  return this.standingStatusEffectModel !.descriptionComponent(currentStack);
      case 'Cluster':   return this.clusterStatusEffectModel  !.description;
    }
  }
};