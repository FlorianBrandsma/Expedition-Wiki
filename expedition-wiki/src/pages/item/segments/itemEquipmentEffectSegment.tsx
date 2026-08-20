import { useMemo } from 'react';

import { useItemPageContext } from '../itemPageContext';

import { StatusEffectType } from '../../../types/enums';

import { StatusEffectModel } from '../../../data/models/statusEffectModel';

import EnhancedTable, { type HeadCell } from '../../../components/enhancedTable/enhancedTable';
import CellTable from '../../../components/cellTable/cellTable';
import ExIcon from '../../../components/exIcon/exIcon';
import ExLink from '../../../components/exLink/exLink';
import { Box } from '@mui/material';

export default function ItemEquipmentEffectSegment() {

  const itemPageModel = useItemPageContext();
  const { statusEffectModelList } = itemPageModel;

  const headers = useMemo<HeadCell<StatusEffectModel>[]>(() => {
  
    const headers: HeadCell<StatusEffectModel>[] = [
      { 
        id: 'effectName', 
        label: 'Name', 
        align: 'left',
        render: (row) => (
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
            <ExIcon resourceName={row.effectIconResourceName} size={20} />
            <ExLink pageName={'effect'} name={row.effectName} />
          </Box>
        )
      },
      {
        id: 'type',
        label: 'Description',
        align: 'left',
        sx: { whiteSpace: 'normal' },
        render: (row) => (
          <Box sx={{ maxWidth:'200px'}}>
            {row.descriptionComponent()}
          </Box>
        )
      }
    ]

    if (statusEffectModelList.some(model => StatusEffectType[model.type] === 'Cluster')) {
      headers.push({
        id: 'clusterStatusEffecStatusEffectModelList',
        label: 'Cluster',
        align: 'left',
        sx: { whiteSpace: 'normal' },
        render: (row) => (
          <Box sx={{ maxWidth:'200px'}}>
            <CellTable 
              list={row.clusterStatusEffecStatusEffectModelList} 
              component={(statusEffectModel) => statusEffectModel.descriptionComponent(row.stack)}
              bulleted
            />
          </Box>
        )
      })
    }

    headers.push({
      id: 'stack',
      label: 'Stack',
      align: 'center'
    })

    return headers;

  }, [itemPageModel]);

  return (
    <Box>
      <EnhancedTable rowKey='id' rows={statusEffectModelList} headCells={headers} />
    </Box>
  )
}