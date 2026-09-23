import ExLink from "../../components/exLink/exLink";
import ExIcon from "../../components/exIcon/exIcon";
import { Box } from "@mui/material";

export class AbilityAgentInteractableBehaviourCommandModel {

  abilityName!: string;
  abilityIconResourceName!: string;

  constructor(init:Partial<AbilityAgentInteractableBehaviourCommandModel>) {  
    Object.assign(this, init);
  }

  get descriptionComponent(): React.ReactNode {

    return (
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
        <ExIcon resourceName={this.abilityIconResourceName} size={20} />
        <ExLink name={this.abilityName} params={['ability', this.abilityName]} />
      </Box>
    )
  }
}