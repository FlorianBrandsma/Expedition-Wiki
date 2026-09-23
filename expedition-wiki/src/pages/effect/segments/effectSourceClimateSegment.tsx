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

  const headers = useMemo<HeadCell<AtmosphereModel>[]>(() => {

    const headers: HeadCell<AtmosphereModel>[] = [
      { 
        label: 'Climate', 
        align: 'left',
        render: (row) => (
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
            {row.iconResourceName && <ExIcon resourceName={row.iconResourceName} size={20} />}
            <ExLink name={row.climateName} params={['climate', row.regionName, row.terrainName, row.climateName]}/>
          </Box>
        )
      },
      { 
        label: 'Terrain', 
        align: 'left',
        render: (row) => (
          <ExLink name={row.terrainName} params={['terrain', row.regionName, row.terrainName]} />
        )
      },
      { 
        id: 'timeDescription', 
        label: 'Time', 
        align: 'left'
      },
      {
        id: 'statusEffectStateDescription',
        label: 'State',
        align: 'left'
      },
      {
        id: 'statusEffectStack',
        label: 'Stack',
        align: 'center'
      }
    ]

    if (atmosphereModelList.some(model => model.activeStatusEffectRepetitionTime > 0)) {
      headers.push({
        id: 'activeStatusEffectRepetitionTimeDescription',
        label: 'Repetition',
        align: 'center'
      })
    }

    return headers;

  }, [effectPageModel]);

  return (
    <Box>
      <BasicTable rowKey='id' rows={atmosphereModelList} headCells={headers} />
    </Box>
  )
}