import { useMemo } from 'react';

import { useEffectPageContext } from '../effectPageContext';

import type { AtmosphereModel } from '../../../data/models/atmosphereModel';

import BasicTable, { type HeadCell } from '../../../components/basicTable/basicTable';
import { Box } from '@mui/material';
import ExIcon from '../../../components/exIcon/exIcon';
import ExLink from '../../../components/exLink/exLink';

export default function EffectSourceClimateSegment() {

  const effectPageModel = useEffectPageContext();
  const { atmosphereModelList } = effectPageModel;

  const headers = useMemo<HeadCell<AtmosphereModel>[]>(() => [
    { 
      label: 'Name', 
      align: 'left',
      render: (row) => (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
          {row.iconResourceName && <ExIcon resourceName={row.iconResourceName} size={20} />}
          <ExLink pageName={'climate'} name={row.climateName} params={[row.regionName, row.terrainName, row.climateName]}/>
        </Box>
      )
    },
    { 
      label: 'Terrain', 
      align: 'left',
      render: (row) => (
        <ExLink pageName={'terrain'} name={row.terrainName} params={[row.regionName, row.terrainName]} />
      )
    },
    { 
      id: 'timeDescription', 
      label: 'Time', 
      align: 'left'
    },
    {
      id: 'statusEffectStack',
      label: 'Stack',
      align: 'center'
    }
  ], [effectPageModel]);

  return (
    <Box>
      <BasicTable rowKey='id' rows={atmosphereModelList} headCells={headers} />
    </Box>
  )
}