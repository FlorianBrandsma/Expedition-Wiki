import { DamageResourceEffectType } from "../../types/enums";

import type { ResourceEffectModel } from "./resourceEffectModel";

import { MitigableDamageResourceEffectModel } from "./mitigableDamageResourceEffectModel";
import { UnmitigableDamageResourceEffectModel } from "./unmitigableDamageResourceEffectModel";

export class DamageResourceEffectModel {

  id!: number;

  type!: number;

  resourceEffectAmount!: number;
  resourceEffectResourceType!: number;

  resourceEffectName!: string;
  resourceEffectIconResourceName!: string;

  resourceEffectModel?: ResourceEffectModel;

  mitigableDamageResourceEffectModelList!:   MitigableDamageResourceEffectModel[];
  unmitigableDamageResourceEffectModelList!: UnmitigableDamageResourceEffectModel[];

  constructor(init:Partial<DamageResourceEffectModel>, resourceEffectModel?: ResourceEffectModel) {  
    Object.assign(this, init);

    this.resourceEffectModel = resourceEffectModel;

    this.mitigableDamageResourceEffectModelList   = this.mitigableDamageResourceEffectModelList  .map((model) => new MitigableDamageResourceEffectModel  (model, this));
    this.unmitigableDamageResourceEffectModelList = this.unmitigableDamageResourceEffectModelList.map((model) => new UnmitigableDamageResourceEffectModel(model, this));
  }

  get mitigableDamageResourceEffectModel(): MitigableDamageResourceEffectModel {  
    return this.mitigableDamageResourceEffectModelList[0];
  }

  get unmitigableDamageResourceEffectModel(): UnmitigableDamageResourceEffectModel {  
    return this.unmitigableDamageResourceEffectModelList[0];
  }

  descriptionComponent(stack: number): React.ReactNode {

    switch (DamageResourceEffectType[this.type])
    {
      case 'Mitigable':   return this.mitigableDamageResourceEffectModel  !.descriptionComponent(stack);
      case 'Unmitigable': return this.unmitigableDamageResourceEffectModel!.description(stack);
    }
  }
}