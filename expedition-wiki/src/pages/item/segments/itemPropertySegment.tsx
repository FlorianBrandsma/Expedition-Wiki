import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';

import { useGameContext } from '../../../context/gameContext';
import { useItemContext } from '../itemContext';

import { ItemModel } from '../../../data/models/itemModel';
import { ItemRequestType, ItemParameters } from '../../../data/parameters/itemParameters';
import { getData } from '../../../services/dataManager';

import { CardContent, CardMedia, TableBody, TableRow, TableCell, Box } from '@mui/material';

import ModelButton from '../../../features/modelViewer/components/modelButton';
import ExTable from '../../../components/exTable/exTable';
import ExCard from '../../../components/exCard/exCard';
import ExCardHeader from '../../../components/exCard/exCardHeader';
import ExCardTableRow from '../../../components/exCard/exCardTableRow';
import ExCardTable from '../../../components/exCard/exCardTable';
import ExIcon from '../../../components/exIcon/exIcon';
import ExIconLabel from '../../../components/exIconLabel/exIconLabel';
import ElementTable from '../../../components/elementTable/elementTable';
import { ElementType } from '../../../types/enums';
import ExCollapse from '../../../components/exCollapse/exCollapse';

interface CurrencyTableProps {
  itemModelList: ItemModel[];
}

function CurrencyTable(props:CurrencyTableProps) {

  const { gameModel } = useGameContext();
  const itemModel = useItemContext();

  return (
    <ExTable size='small'>
      <TableBody>
        {props.itemModelList.map((row) => (
          <TableRow key={row.id}>
            <TableCell>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start', gap: 0.5 }}>
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
            <TableCell align='right'>
              {Number((itemModel.baseValue / row.baseValue).toFixed(2))}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </ExTable>
  )
}

export default function PropertySegment() {

  const itemModel = useItemContext();
  const { equipmentItemModel } = itemModel;

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
          component='img'
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
        {equipmentItemModel?.armEquipmentItemModel && (
          <ExCardTableRow 
            label='Arm Type' 
            value={`${equipmentItemModel.armEquipmentItemModel.typeDescription()}, ${equipmentItemModel.armEquipmentItemModel.gripTypeDescription()}`}
          />
        )}
        {equipmentItemModel?.gearEquipmentItemModel &&( 
          <ExCardTableRow 
            label='Gear Type' 
            value={`${equipmentItemModel.gearEquipmentItemModel.materialTypeDescription()}, ${equipmentItemModel.gearEquipmentItemModel.typeDescription()}`}
          />
        )}
        {equipmentItemModel?.trinketEquipmentItemModel && (
          <ExCardTableRow 
            label='Trinket Type' 
            value={equipmentItemModel.trinketEquipmentItemModel.typeDescription()}
          />
        )}
        {equipmentItemModel && (
          <ExCardTableRow 
            label='Element' 
            value={
              <ExIconLabel 
                label={ElementType[equipmentItemModel.elementType]}
                url={`/images/icons/elements/${ElementType[equipmentItemModel.elementType]}.png`}
                size={20}
                alignment='flex-start'
              />
            }
          />
        )}
        <ExCardTableRow 
          label='Limit' 
          value={itemModel.quantityLimit}
        />
      </ExCardTable>

      {/* Value */}
      <ExCardHeader title='Value' />
      <ExCardTable>
        <ExCardTableRow 
          label='Base' 
          value={itemModel.baseValue}
        />
        {itemQuery.data.length > 0 && (
          <TableRow sx={{ '& > .MuiTableCell-root': { borderBottom: 'unset' } }}>
            <TableCell colSpan={2} sx={{ padding: 0 }}>
              <ExCollapse 
                label='Currencies'
                collapseComponent={
                  <CurrencyTable itemModelList={itemQuery.data} />
                }/>
            </TableCell>
          </TableRow>
        )}  
      </ExCardTable>

      {/* Resources */}
      {equipmentItemModel && (
      <>
        <ExCardHeader title='Resources' />
        <ExCardTable>
          <ExCardTableRow 
            label={
              <ExIconLabel 
                label='Health'
                url= '/images/icons/general/ResourceBox_Health.png'
                size={20}
                alignment='flex-end'
              />
            }
            value={equipmentItemModel.health}
          />
          <ExCardTableRow 
            label={
              <ExIconLabel 
                label='Mana'
                url= '/images/icons/general/ResourceBox_Mana.png'
                size={20}
                alignment='flex-end'
              />
            }
            value={equipmentItemModel.mana}
          />
        </ExCardTable>
      </>
      )}

      {/* Attack */}
      {equipmentItemModel && (
      <>
        <ExCardHeader title='Attack' />
        <ExCardTable>
          <ExCardTableRow 
            label={
              <ExIconLabel 
                label='Physical'
                url= '/images/icons/general/Physical.png'
                size={20}
                alignment='flex-end'
              />
            }
            value={equipmentItemModel.physicalAttack}
          />
          <ExCardTableRow 
            label={
              <ExIconLabel 
                label='Magical'
                url= '/images/icons/general/Magical.png'
                size={20}
                alignment='flex-end'
              />
            }
            value={equipmentItemModel.magicalAttack}
          />
          <TableRow sx={{ '& > .MuiTableCell-root': { borderBottom: 'unset' } }}>
            <TableCell colSpan={2} sx={{ padding: 0 }}>
              <ExCollapse 
                label='Elements'
                collapseComponent={
                  <ElementTable normalAttributeType='Attack' model={equipmentItemModel} />
                }/>
            </TableCell>
          </TableRow> 
        </ExCardTable>
      </>
      )}

      {/* Defence */}
      {equipmentItemModel && (
      <>
        <ExCardHeader title='Defence' />
        <ExCardTable>
          <ExCardTableRow 
            label={
              <ExIconLabel 
                label='Physical'
                url= '/images/icons/general/Physical.png'
                size={20}
                alignment='flex-end'
              />
            }
            value={equipmentItemModel.physicalDefence}
          />
          <ExCardTableRow 
            label={
              <ExIconLabel 
                label='Magical'
                url= '/images/icons/general/Magical.png'
                size={20}
                alignment='flex-end'
              />
            }
            value={equipmentItemModel.magicalDefence}
          />
          <TableRow sx={{ '& > .MuiTableCell-root': { borderBottom: 'unset' } }}>
            <TableCell colSpan={2} sx={{ padding: 0 }}>
              <ExCollapse 
                label='Elements'
                collapseComponent={
                  <ElementTable normalAttributeType='Defence' model={equipmentItemModel} />
                }/>
            </TableCell>
          </TableRow>
        </ExCardTable>
      </>
      )}

    </ExCard>
  </>
  )
}