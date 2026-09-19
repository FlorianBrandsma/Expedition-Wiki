import { useMemo } from 'react';

import type { CaseConditionModel } from '../../../../../data/models/caseConditionModel';

import BasicTable, { type HeadCell } from '../../../../../components/basicTable/basicTable';
import CellTable from '../../../../../components/cellTable/cellTable';
import { Box } from '@mui/material';
import ExIcon from '../../../../../components/exIcon/exIcon';
import ExLink from '../../../../../components/exLink/exLink';

interface UtilityConditionReactionSegmentProps {
  caseConditionModelList: CaseConditionModel[];
}

export default function GeneralUtilityConditionReactionSegment({ caseConditionModelList }: UtilityConditionReactionSegmentProps) {

  const headers = useMemo<HeadCell<CaseConditionModel>[]>(() => [
    {
      label: 'Agent',
      align: 'left',
      render: (row) => (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
          <ExIcon resourceName={row.agentInteractableReactionModel.agentInteractableAssetIconResourceName} size={20} />
          <ExLink pageName={'interactable'} name={row.agentInteractableReactionModel.agentInteractableName} />
        </Box>
      )
    },
    {
      label: 'Event',
      align: 'left',
      render: (row) => (
        row.agentInteractableReactionModel.eventName
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
            list={row.agentInteractableReactionModel.caseConditionModelList} 
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