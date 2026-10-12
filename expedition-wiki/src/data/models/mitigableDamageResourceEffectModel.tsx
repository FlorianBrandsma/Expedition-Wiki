import { ElementType, ResourceDamageType, ResourceType } from "../../types/enums";

import { DamageResourceEffectModel } from "./damageResourceEffectModel";

import { Box } from "@mui/material";
import ExIconLabel from "../../components/exIconLabel/exIconLabel";

export class MitigableDamageResourceEffectModel {

  damageType!: number;
  elementType!: number;

  damageResourceEffectModel!: DamageResourceEffectModel;
  
  constructor(init:Partial<MitigableDamageResourceEffectModel>, damageResourceEffectModel: DamageResourceEffectModel) {  
    Object.assign(this, init);

    this.damageResourceEffectModel = damageResourceEffectModel;
  }

  get elementTypeDescription(): ElementType {
    return ElementType[this.elementType];
  }

  descriptionComponent(stack: number): React.ReactNode {

    const amount = (this.damageResourceEffectModel.resourceEffectModel?.amount ?? this.damageResourceEffectModel.resourceEffectAmount) * stack;
    
    const element = this.elementTypeDescription !== 'Normal' && (
      <Box 
        component='span'
        sx={{ display: 'inline-flex', verticalAlign: 'bottom', ml: 0.5 }}
      >
        <ExIconLabel 
          label={this.elementTypeDescription}
          url={`/images/icons/elements/${this.elementTypeDescription}/${this.elementTypeDescription}_64.webp`}
          size={15}
          alignment='flex-start'
        />
      </Box>
    )

    return (
      <Box 
        component='span' 
        sx={{ display: 'inline'}}
      >
        {`Deal ${amount} ${ResourceDamageType[this.damageType].toLowerCase()}`}{element}{` damage to ${ResourceType[this.damageResourceEffectModel.resourceEffectResourceType].toLowerCase()}`}
      </Box>
    )
  }
}