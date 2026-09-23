import { useMemo } from 'react';

import { useClimatePageContext } from '../climatePageContext';

import { StatusEffectType } from '../../../types/enums';

import type { StatusEffectModel } from '../../../data/models/statusEffectModel';

import BasicTable, { type HeadCell } from '../../../components/basicTable/basicTable';
import CellTable from '../../../components/cellTable/cellTable';
import ExIcon from '../../../components/exIcon/exIcon';
import ExLink from '../../../components/exLink/exLink';
import { Box } from '@mui/material';

export default function ClimateEffectSegment() {

  const climatePageModel = useClimatePageContext();
  const { statusEffectModelList } = climatePageModel;

  const headers = useMemo<HeadCell<StatusEffectModel>[]>(() => {

    const headers: HeadCell<StatusEffectModel>[] = [
      {
        id: 'timeDescription',
        label: 'Time',
        align: 'center'
      },
      {
        id: 'stateDescription',
        label: 'State',
        align: 'left'
      },
      { 
        label: 'Effect', 
        align: 'left',
        render: (row) => (
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
            <ExIcon resourceName={row.effectIconResourceName} size={20} />
            <ExLink name={row.effectName} params={['effect', row.effectName]} />
          </Box>
        )
      },
      {
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
        label: 'Cluster',
        align: 'left',
        sx: { whiteSpace: 'normal' },
        render: (row) => (
          <Box sx={{ maxWidth:'200px'}}>
            <CellTable 
              bulleted
              list={row.clusterStatusEffecStatusEffectModelList} 
              component={(statusEffectModel) => statusEffectModel.descriptionComponent(row.stack)}
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

    if (statusEffectModelList.some(model => model.activeStatusEffectRepetitionTime > 0)) {
      headers.push({
        id: 'activeStatusEffectRepetitionTimeDescription',
        label: 'Repetition',
        align: 'center'
      })
    }

    return headers;

  }, [climatePageModel]);

  return (
    <Box sx={{ mt: 1 }}>
      <BasicTable rowKey='atmosphereStatusEffectId' rows={statusEffectModelList} headCells={headers} />
    </Box>
  )
}