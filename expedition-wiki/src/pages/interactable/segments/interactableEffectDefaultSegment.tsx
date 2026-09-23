import { useMemo } from 'react';

import { useInteractablePageContext } from '../interactablePageContext';

import { StatusEffectType } from '../../../types/enums';

import { StatusEffectModel } from '../../../data/models/statusEffectModel';

import { Box } from '@mui/material';

import BasicTable, { type HeadCell } from '../../../components/basicTable/basicTable';
import CellTable from '../../../components/cellTable/cellTable';
import ExIcon from '../../../components/exIcon/exIcon';
import ExLink from '../../../components/exLink/exLink';

export default function InteractableEffectDefaultSegment() {

  const interactablePageModel = useInteractablePageContext();
  const { agentInteractableStatusEffectModelList: statusEffectModelList } = interactablePageModel;

  const headers = useMemo<HeadCell<StatusEffectModel>[]>(() => {
  
    const headers: HeadCell<StatusEffectModel>[] = [
      { 
        label: 'Effect', 
        align: 'left',
        render: (row) => (
          <Box sx={{ display: 'flex', alignInteractables: 'center', gap: 0.5 }}>
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

    return headers;

  }, [interactablePageModel]);

  return (
    <Box sx={{ mt: 1 }}>
      <BasicTable rowKey='id' rows={statusEffectModelList} headCells={headers} />
    </Box>
  )
}