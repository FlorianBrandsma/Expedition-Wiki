import { useMemo } from 'react';

import type { CaseConditionModel } from '../../../../../data/models/caseConditionModel';

import BasicTable, { type HeadCell } from '../../../../../components/basicTable/basicTable';
import CellTable from '../../../../../components/cellTable/cellTable';
import ExIcon from '../../../../../components/exIcon/exIcon';
import ExLink from '../../../../../components/exLink/exLink';
import { Box } from '@mui/material';

interface UtilityConditionLootSegmentProps {
  caseConditionModelList: CaseConditionModel[];
}

export default function GeneralUtilityConditionLootSegment({ caseConditionModelList }: UtilityConditionLootSegmentProps) {

  const headers = useMemo<HeadCell<CaseConditionModel>[]>(() => [
    {
      label: 'Agent',
      align: 'left',
      render: (row) => (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
          <ExIcon resourceName={row.agentInteractableLootTableModel.agentInteractableAssetIconResourceName} size={20} />
          <ExLink name={row.agentInteractableLootTableModel.agentInteractableName} params={['interactable', row.agentInteractableLootTableModel.agentInteractableName]} />
        </Box>
      )
    },
    {
      label: 'Table',
      align: 'left',
      render: (row) => (
        <ExLink name={row.agentInteractableLootTableModel.name} params={['interactable', row.agentInteractableLootTableModel.agentInteractableName, row.agentInteractableLootTableModel.name]} />
      )
    },
    {
      label: 'Conditions',
      align: 'left',
      sx: { whiteSpace: 'normal' },
      render: (row) => (
        <Box sx={{ maxWidth:'200px'}}>
          <CellTable 
            bulleted
            list={row.agentInteractableLootTableModel.caseConditionModelList} 
            highlited={(caseConditionModel) => caseConditionModel.id === row.id}
            component={(caseConditionModel) => caseConditionModel.descriptionComponent}
          />
        </Box>
      )
    }
  ], [caseConditionModelList]);

  return (
    <BasicTable rowKey='id' rows={caseConditionModelList} headCells={headers} />
  )
}