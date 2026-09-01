import { useMemo } from 'react';

import type { CaseConditionModel } from '../../../data/models/caseConditionModel';

import BasicTable, { type HeadCell } from '../../../components/basicTable/basicTable';

interface InteractableLootTableConditionSegmentProps {
  caseConditionModelList: CaseConditionModel[];
}

export default function InteractableLootTableConditionSegment({ caseConditionModelList }: InteractableLootTableConditionSegmentProps) {

  const headers = useMemo<HeadCell<CaseConditionModel>[]>(() => [
      {
        label: 'Description',
        align: 'left',
        sx: { whiteSpace: 'normal' },
        render: (row) => row.descriptionComponent
      }
    ], [caseConditionModelList]);

  return (
    <BasicTable rowKey='id' rows={caseConditionModelList} headCells={headers} />
  )
}