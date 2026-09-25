import { useMemo } from 'react';

import type { CaseConditionModel } from '../../../../../data/models/caseConditionModel';

import { Box } from '@mui/material';

import BasicTable, { type HeadCell } from '../../../../../components/basicTable/basicTable';
import CellTable from '../../../../../components/cellTable/cellTable';
import ExLink from '../../../../../components/exLink/exLink';

interface UtilityConditionTriggerSegmentProps {
  caseConditionModelList: CaseConditionModel[];
}

export default function GeneralUtilityConditionTriggerSegment({ caseConditionModelList }: UtilityConditionTriggerSegmentProps) {

  const headers = useMemo<HeadCell<CaseConditionModel>[]>(() => [
    {
      label: 'Event',
      align: 'left',
      render: (row) => (
        <ExLink name={row.interactionTriggerModel.eventModel.name} params={row.interactionTriggerModel.eventModel.params}/>
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
            list={row.interactionTriggerModel.caseConditionModelList} 
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