import { ResourceEffectModel } from "./resourceEffectModel";
import { DamageResourceEffectModel } from "./damageResourceEffectModel";
import { Box } from "@mui/material";
import { ResourceType } from "../../types/enums";

export class AbsorbResourceEffectModel {

  id!: number;

  resourceEffectName!: string;
  resourceEffectIconResourceName!: string;

  resourceEffectModel: ResourceEffectModel;

  damageResourceEffectModelList!: DamageResourceEffectModel[];

  constructor(init:Partial<AbsorbResourceEffectModel>, resourceEffectModel: ResourceEffectModel) {  
    Object.assign(this, init);

    this.resourceEffectModel = resourceEffectModel;

    this.damageResourceEffectModelList = this.damageResourceEffectModelList.map((model) => new DamageResourceEffectModel(model));
  }

  get damageResourceEffectModel(): DamageResourceEffectModel {  
    return this.damageResourceEffectModelList[0];
  }

  descriptionComponent(stack: number): React.ReactNode {

    const amount = this.resourceEffectModel.amount * stack;

    const damageResourceEffectDescription = this.damageResourceEffectModel?.descriptionComponent(stack);

    return (
      <Box 
        component='span' 
        sx={{ display: 'inline'}}
      >
        {damageResourceEffectDescription}{`${damageResourceEffectDescription ? ' and restore' : 'Restore'} user's ${ResourceType[this.resourceEffectModel.resourceType].toLowerCase()} by ${amount}% of damage dealt`}
      </Box>
    )
  }
}