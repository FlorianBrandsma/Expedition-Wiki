import { ResourceEffectType } from "../../types/enums";
import { AbsorbResourceEffectModel } from "./absorbResourceEffectModel";
import { DamageResourceEffectModel } from "./damageResourceEffectModel";
import { RestoreResourceEffectModel } from "./restoreResourceEffectModel";

export class ResourceEffectModel {

  type!: number;
  resourceType!: number;

  amount!: number;

  damageResourceEffectModelList!:  DamageResourceEffectModel[];
  restoreResourceEffectModelList!: RestoreResourceEffectModel[];
  absorbResourceEffectModelList!:  AbsorbResourceEffectModel[];

  constructor(init:Partial<ResourceEffectModel>) {  
    Object.assign(this, init);

    this.damageResourceEffectModelList  = this.damageResourceEffectModelList .map((model) => new DamageResourceEffectModel (model, this));
    this.restoreResourceEffectModelList = this.restoreResourceEffectModelList.map((model) => new RestoreResourceEffectModel(model, this));
    this.absorbResourceEffectModelList  = this.absorbResourceEffectModelList .map((model) => new AbsorbResourceEffectModel (model, this));
  }

  get damageResourceEffectModel(): DamageResourceEffectModel {  
    return this.damageResourceEffectModelList[0];
  }

  get restoreResourceEffectModel(): RestoreResourceEffectModel {  
    return this.restoreResourceEffectModelList[0];
  }

  get absorbResourceEffectModel(): AbsorbResourceEffectModel {  
    return this.absorbResourceEffectModelList[0];
  }

  get typeDescription(): string {
    return `${ ResourceEffectType[this.type] } Resource`;
  }

  description(stack: number): React.ReactNode {

    switch (ResourceEffectType[this.type])
    {
      case 'Damage':  return this.damageResourceEffectModel !.descriptionComponent(stack);
      case 'Restore': return this.restoreResourceEffectModel!.description(stack);
      case 'Absorb':  return this.absorbResourceEffectModel !.descriptionComponent(stack);
    }
  }
}