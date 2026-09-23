import { useMemo } from 'react';

import { useTaskPageContext } from '../taskPageContext';

import { StatusEffectType } from '../../../types/enums';

import type { StatusEffectModel } from '../../../data/models/statusEffectModel';

import { Box } from '@mui/material';

import BasicTable, { type HeadCell } from '../../../components/basicTable/basicTable';
import CellTable from '../../../components/cellTable/cellTable';
import ExIcon from '../../../components/exIcon/exIcon';
import ExLink from '../../../components/exLink/exLink';

export default function TaskInteractableEffectSegment() {

  const taskPageModel = useTaskPageContext();
  const { statusEffectModelList } = taskPageModel;

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

  }, [taskPageModel]);

  return (
    <BasicTable rowKey='interactionStatusEffectId' rows={statusEffectModelList} headCells={headers} />
  )
}