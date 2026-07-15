import * as React from 'react';

import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';

import { useGameContext } from '../../../context/gameContext';
import { useItemContext } from '../itemContext';

import { ItemModel } from '../../../data/models/itemModel';
import { ItemRequestType, ItemParameters } from '../../../data/parameters/itemParameters';
import { getData } from '../../../services/dataManager';

import { CardContent, CardMedia, TableRow, TableCell, IconButton, Box, Typography, Collapse, TableBody, Table } from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

import ModelButton from '../../../features/modelViewer/components/modelButton';
import ExCard from '../../../components/exCard/exCard';
import ExCardHeader from '../../../components/exCard/exCardHeader';
import ExCardTableRow from '../../../components/exCard/exCardTableRow';
import ExCardTable from '../../../components/exCard/exCardTable';
import ExIcon from '../../../components/exIcon/exIcon';

interface CurrencyTableProps {
  itemModelList: ItemModel[];
}

function CurrencyTable(props:CurrencyTableProps) {

  const { gameModel } = useGameContext();
  const itemModel = useItemContext();

  return (
    <Table 
      size='small' 
      sx={{ 
        border: '1px solid',
        borderColor: 'primary.dark',
        '& .MuiTableCell-root': {
          border: '1px solid',
          borderColor:'primary.dark'
        }
      }}
    >
      <TableBody>
        {props.itemModelList.map((row) => (
          <TableRow key={row.id}>
            <TableCell>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                <ExIcon resourceName={row.assetIconResourceName} size={20} />
                <Link 
                  className='link'
                  to={`/${gameModel.name}/item/${row.name}`} 
                  mask={`/${gameModel.name.replaceAll(' ', '_')}/item/${row.name.replaceAll(' ', '_')}`}
                >
                  {row.name}
                </Link>
              </Box>
            </TableCell>
            <TableCell>
              {Number((itemModel.baseValue / row.baseValue).toFixed(2))}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

export default function PropertySegment() {

  const itemModel = useItemContext();
  
  const [openCurrencies, setOpenCurrencies] = React.useState(false);

  const parameters = new ItemParameters({
    requestType: ItemRequestType.GetItemCurrencyItems,
    id: [itemModel.id]
  });

  const itemQuery = useQuery<ItemModel[]>({
    queryKey: ["parameters", parameters],
    queryFn: () => getData<ItemModel>(parameters, ItemModel),
    initialData: []
  });

  return (
  <>
    <ExCard sx={{ 
        float: 'right', 
        width: '250px'
      }}
    >
      <ExCardHeader title={itemModel.name} />
      <CardContent 
        sx={{ 
          height: '100%', 
          padding: 1, 
          '&:last-child': { paddingBottom: 1 }
        }}>
        <CardMedia 
          component="img"
          image={`/images/thumbnails/assets/${itemModel.assetResourceName}.png`}
          alt={itemModel.assetResourceName}
        />
        <ModelButton assetType={itemModel.assetType} assetResourceName={itemModel.assetResourceName} />
      </CardContent>

      <ExCardHeader title='Properties' /> 
      <ExCardTable>
        <ExCardTableRow 
          label='Item Type' 
          value={itemModel.typeDescription}
        />
        {itemModel.equipmentItemModel?.armEquipmentItemModel && 
          <ExCardTableRow 
            label='Arm Type' 
            value={`${itemModel.equipmentItemModel.armEquipmentItemModel.typeDescription()}, ${itemModel.equipmentItemModel.armEquipmentItemModel.gripTypeDescription()}`}
          />
        }
        {itemModel.equipmentItemModel?.gearEquipmentItemModel && 
          <ExCardTableRow 
            label='Gear Type' 
            value={`${itemModel.equipmentItemModel.gearEquipmentItemModel.materialTypeDescription()}, ${itemModel.equipmentItemModel.gearEquipmentItemModel.typeDescription()}`}
          />
        }
        {itemModel.equipmentItemModel?.trinketEquipmentItemModel && 
          <ExCardTableRow 
            label='Trinket Type' 
            value={itemModel.equipmentItemModel.trinketEquipmentItemModel.typeDescription()}
          />
        }
        <ExCardTableRow 
          label='Limit' 
          value={itemModel.quantityLimit}
        />
      </ExCardTable>

      <ExCardHeader title='Value' />
      <ExCardTable>
        <ExCardTableRow 
          label='Base' 
          value={itemModel.baseValue}
        />
        {itemQuery.data.length > 0 && (
          <TableRow sx={{ '& > .MuiTableCell-root': { borderBottom: 'unset' } }}>
            <TableCell colSpan={2} sx={{ padding: 0 }}>
              <IconButton
                size="small"
                onClick={() => setOpenCurrencies(!openCurrencies)}
                sx={{
                  marginTop: 1,
                  padding: 0,
                  borderRadius: 0,
                  width: '100%',
                  position: 'relative',
                  justifyContent: 'center',
                  backgroundColor: 'primary.dark'
                }}
              >
                <Box sx={{ position: 'absolute', right: 8, display: 'flex'}}>
                  {openCurrencies ? <KeyboardArrowUpIcon sx={{ color: 'primary.contrastText'}} /> : <KeyboardArrowDownIcon sx={{ color: 'primary.contrastText'}} />}
                </Box>
                <Typography sx={{ color: 'primary.contrastText' }}>Currencies</Typography>
              </IconButton>
              <Collapse in={openCurrencies} unmountOnExit>
                <CurrencyTable itemModelList={itemQuery.data} />
              </Collapse>
            </TableCell>
          </TableRow>
        )}  
      </ExCardTable>
    </ExCard>
  </>
  )
}