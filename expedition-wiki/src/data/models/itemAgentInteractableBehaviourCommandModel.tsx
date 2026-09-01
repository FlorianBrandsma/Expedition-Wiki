import ExIcon from "../../components/exIcon/exIcon";
import ExLink from "../../components/exLink/exLink";
import { Box } from "@mui/material";

export class ItemAgentInteractableBehaviourCommandModel {

  itemName!: string;
  itemAssetIconResourceName!: string;

  constructor(init:Partial<ItemAgentInteractableBehaviourCommandModel>) {  
    Object.assign(this, init);
  }

  get descriptionComponent(): React.ReactNode {

    return (
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
        <ExIcon resourceName={this.itemAssetIconResourceName} size={20} />
        <ExLink pageName={'item'} name={this.itemName} />
      </Box>
    )
  }
}