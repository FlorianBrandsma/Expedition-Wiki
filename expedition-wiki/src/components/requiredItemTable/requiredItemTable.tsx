import { Box, Table, TableBody, TableCell, TableRow, Typography } from "@mui/material";
import type { ItemModel } from "../../data/models/itemModel";
import ExIcon from "../exIcon/exIcon";
import ExLink from "../exLink/exLink";
import { useItemPageContext } from "../../pages/item/itemPageContext";

interface RequiredItemTableItemProps {
  itemModel: ItemModel;
}

function RequiredItemTableItem({ itemModel }: RequiredItemTableItemProps) {

  const itemPageModel = useItemPageContext();

  return (
    <TableRow >
      <TableCell sx={{ padding: 0 }}>
        <Box sx={{ maxWidth: '200px' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
            <Typography variant='body2'>{itemModel.quantity} x</Typography>
            <ExIcon resourceName={itemModel.assetIconResourceName} size={20} />
            {itemModel.id !== itemPageModel.itemModel.id ? (
              <ExLink pageName={'item'} name={itemModel.name} />
            ) : (
              <Typography variant='body2'>{itemModel.name}</Typography>
            )}
          </Box>
        </Box>
      </TableCell>        
    </TableRow>
  )
}

interface RequiredItemTableProps {
  itemModelList: ItemModel[];
}

export default function RequiredItemTable({ itemModelList }: RequiredItemTableProps) {

  return (
    <>
      {itemModelList.length > 0 && (
        <Table 
          size='small' 
          sx={{
            borderCollapse: 'separate',
            borderSpacing: '0 2px',
            '& .MuiTableCell-root': { border: 'none' }
          }}
        >
          <TableBody>
            {itemModelList.map((itemModel) => { 
              return (
                <RequiredItemTableItem key={itemModel.id} itemModel={itemModel}/>
              )}
            )}
          </TableBody>
        </Table>
      )}
    </>
  )
}