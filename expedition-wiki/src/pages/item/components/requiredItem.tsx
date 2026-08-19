import { useItemPageContext } from "../itemPageContext";

import type { ItemModel } from "../../../data/models/itemModel";

import ExLink from "../../../components/exLink/exLink";
import ExIcon from "../../../components/exIcon/exIcon";

import { Box, Typography } from "@mui/material";

interface RequiredItemProps {
  itemModel: ItemModel
}

export default function RequiredItem({ itemModel }: RequiredItemProps) {

  const itemPageModel = useItemPageContext();

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5}}>
      <Typography variant='body2'>{itemModel.quantity} x</Typography>

      <ExIcon resourceName={itemModel.assetIconResourceName} size={20} />
      
      {itemModel.id !== itemPageModel.itemModel.id ? (
        <ExLink pageName={'item'} name={itemModel.name} />
      ) : (
        <Typography variant='body2'>{itemModel.name}</Typography>
      )}
    </Box>
  )
}