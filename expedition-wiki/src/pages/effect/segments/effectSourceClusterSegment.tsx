import { useMemo } from 'react';

import { useEffectPageContext } from '../effectPageContext';

import type { ClusterStatusEffectModel } from '../../../data/models/clusterStatusEffectModel';

import EnhancedTable, { type HeadCell } from '../../../components/enhancedTable/enhancedTable';
import CellTable from '../../../components/cellTable/cellTable';
import ExIcon from '../../../components/exIcon/exIcon';
import ExLink from '../../../components/exLink/exLink';
import { Box } from '@mui/material';

export default function EffectSourceClusterSegment() {

  const effectPageModel = useEffectPageContext();
  const { clusterStatusEffectModelList } = effectPageModel;

  const headers = useMemo<HeadCell<ClusterStatusEffectModel>[]>(() => [
    { 
      id: 'statusEffectName', 
      label: 'Name', 
      align: 'left',
      render: (row) => (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
          <ExIcon resourceName={row.statusEffectIconResourceName} size={20} />
          <ExLink pageName={'effect'} name={row.statusEffectName} />
        </Box>
      )
    },
    {
      id: 'description',
      label: 'Description',
      align: 'left'
    },
    {
      id: 'statusEffectModelList',
      label: 'Cluster',
      align: 'left',
      sx: { whiteSpace: 'normal' },
      render: (row) => (
        <Box sx={{ maxWidth:'200px'}}>
          <CellTable 
            list={row.statusEffectModelList} 
            component={(statusEffectModel) => statusEffectModel.descriptionComponent()}
            bulleted
          />
        </Box>
      )
    }
  ], [effectPageModel]);

  return (
    <Box>
      <EnhancedTable rowKey='id' rows={clusterStatusEffectModelList} headCells={headers} />
    </Box>
  )
}