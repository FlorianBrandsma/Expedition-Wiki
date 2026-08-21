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

  descriptionComponent(stack: number): React.ReactNode {

    const amount = (this.damageResourceEffectModel.resourceEffectModel?.amount ?? this.damageResourceEffectModel.resourceEffectAmount) * stack;
    
    const element = ElementType[this.elementType] !== 'Normal' && (
      <Box 
        component='span'
        sx={{ display: 'inline-flex', verticalAlign: 'bottom', ml: 0.5 }}
      >
        <ExIconLabel 
          label={ElementType[this.elementType]}
          url={`/images/icons/elements/${ElementType[this.elementType]}.png`}
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