import { useMemo } from 'react';

import { useInteractablePageContext } from '../interactablePageContext';

import { StatusEffectType } from '../../../types/enums';

import type { StatusEffectModel } from '../../../data/models/statusEffectModel';

import { Box } from '@mui/material';

import BasicTable, { type HeadCell } from '../../../components/basicTable/basicTable';
import ExIcon from '../../../components/exIcon/exIcon';
import ExLink from '../../../components/exLink/exLink';
import CellTable from '../../../components/cellTable/cellTable';

export default function InteractableEffectTaskSegment() {

  const interactablePageModel = useInteractablePageContext();
  const { interactionStatusEffectModelList } = interactablePageModel;

  const headers = useMemo<HeadCell<StatusEffectModel>[]>(() => {

    const headers: HeadCell<StatusEffectModel>[] = [
      {
        label: 'Task', 
        align: 'left',
        render: (row) => (
          <ExLink name={row.interactionModel.taskModel.name} params={row.interactionModel.taskModel.params} />
        )
      },
      {
        label: 'Time',
        align: 'left',
        render: row => row.interactionModel.timeDescription
      }, 
      { 
        label: 'Effect', 
        align: 'left',
        render: (row) => {
          return (
            <Box sx={{ display: 'flex', alignInteractables: 'center', gap: 0.5 }}>
              <ExIcon resourceName={row.effectIconResourceName} size={20} />
              <ExLink name={row.effectName} params={['effect', row.effectName]} />
            </Box>
          )
        }
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
    ];

    if (interactionStatusEffectModelList.some(model => StatusEffectType[model.type] === 'Cluster')) {
      
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

    headers.push(
      {
        label: 'State',
        align: 'left',
        render: row => row.interactionModel.statusEffectStateDescription
      },
      {
        id: 'stack',
        label: 'Stack',
        align: 'center'
      }
    );

    if (interactionStatusEffectModelList.some(model => model.activeStatusEffectRepetitionTime > 0)) {
      headers.push({
        id: 'activeStatusEffectRepetitionTimeDescription',
        label: 'Repetition',
        align: 'center'
      })
    }

    return headers;

  }, [interactablePageModel]);

  return (
    <Box>
      <BasicTable rowKey='interactionStatusEffectId' rows={interactionStatusEffectModelList} headCells={headers} />
    </Box>
  )
}