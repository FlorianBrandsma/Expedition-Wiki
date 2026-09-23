import { useMemo } from 'react';

import { useEffectPageContext } from '../effectPageContext';

import type { ClusterStatusEffectModel } from '../../../data/models/clusterStatusEffectModel';

import BasicTable, { type HeadCell } from '../../../components/basicTable/basicTable';
import CellTable from '../../../components/cellTable/cellTable';
import ExIcon from '../../../components/exIcon/exIcon';
import ExLink from '../../../components/exLink/exLink';
import { Box } from '@mui/material';

export default function EffectSourceEffectClusterSegment() {

  const effectPageModel = useEffectPageContext();
  const { clusterStatusEffectModelList } = effectPageModel;

  const headers = useMemo<HeadCell<ClusterStatusEffectModel>[]>(() => [
    { 
      label: 'Name', 
      align: 'left',
      render: (row) => (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
          <ExIcon resourceName={row.statusEffectIconResourceName} size={20} />
          <ExLink name={row.statusEffectName} params={['effect', row.statusEffectName]} />
        </Box>
      )
    },
    {
      id: 'description',
      label: 'Description',
      align: 'left'
    },
    {
      label: 'Cluster',
      align: 'left',
      sx: { whiteSpace: 'normal' },
      render: (row) => (
        <Box sx={{ maxWidth:'200px'}}>
          <CellTable 
            bulleted
            list={row.statusEffectModelList} 
            component={(statusEffectModel) => statusEffectModel.descriptionComponent()}
          />
        </Box>
      )
    }
  ], [effectPageModel]);

  return (
    <Box>
      <BasicTable rowKey='id' rows={clusterStatusEffectModelList} headCells={headers} />
    </Box>
  )
}