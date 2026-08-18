import { ResourceEffectModel } from "./resourceEffectModel";
import { DamageResourceEffectModel } from "./damageResourceEffectModel";
import { Box } from "@mui/material";
import { ResourceType } from "../../types/enums";

export class AbsorbResourceEffectModel {

  resourceEffectModel!: ResourceEffectModel;

  damageResourceEffectModelList!: DamageResourceEffectModel[];

  damageResourceEffectModel?: DamageResourceEffectModel;

  constructor(init:Partial<AbsorbResourceEffectModel>, resourceEffectModel: ResourceEffectModel) {  
    Object.assign(this, init);

    this.resourceEffectModel = resourceEffectModel;

    this.damageResourceEffectModelList = this.damageResourceEffectModelList.map((model) => new DamageResourceEffectModel(model));

    this.damageResourceEffectModel  = this.damageResourceEffectModelList[0];
  }

  descriptionComponent(stack: number): React.ReactNode {

    const amount = this.resourceEffectModel.amount * stack;

    const damageResourceEffectDescription = this.damageResourceEffectModel?.descriptionComponent(stack);

    return (
      <Box sx={{ display: 'inline'}}>
        {damageResourceEffectDescription}{`${damageResourceEffectDescription ? ' and restore' : 'Restore'} user's ${ResourceType[this.resourceEffectModel.resourceType].toLowerCase()} by ${amount}% of damage dealt`}
      </Box>
    )
  }
}