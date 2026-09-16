import { useMemo } from 'react';

import type { CaseConditionModel } from '../../../../../data/models/caseConditionModel';

import BasicTable, { type HeadCell } from '../../../../../components/basicTable/basicTable';
import CellTable from '../../../../../components/cellTable/cellTable';
import { Box } from '@mui/material';

interface UtilityConditionEventSegmentProps {
  caseConditionModelList: CaseConditionModel[];
}

export default function GeneralUtilityConditionEventSegment({ caseConditionModelList }: UtilityConditionEventSegmentProps) {

  const headers = useMemo<HeadCell<CaseConditionModel>[]>(() => {

    const headers: HeadCell<CaseConditionModel>[] = [
      {
        label: 'Event',
        align: 'left',
        render: (row) => (
          row.eventContinuationModel.eventName
        )
      },
      {
        label: 'Continuation',
        align: 'left',
        render: (row) => (
          row.eventContinuationModel.continuationEventName
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
              list={row.eventContinuationModel.caseConditionModelList} 
              highlited={(caseConditionModel) => caseConditionModel.id === row.id}
              component={(caseConditionModel) => caseConditionModel.descriptionComponent}
            />
          </Box>
        )
      }
    ]

    return headers;

  }, [caseConditionModelList]);

  return (
    <BasicTable rowKey='id' rows={caseConditionModelList} headCells={headers} />
  )
}