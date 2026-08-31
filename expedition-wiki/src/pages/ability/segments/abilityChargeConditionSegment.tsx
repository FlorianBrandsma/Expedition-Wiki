import { useMemo } from 'react';

import { useAbilityPageContext } from '../abilityPageContext';

import type { CaseConditionModel } from '../../../data/models/caseConditionModel';
import BasicTable, { type HeadCell } from '../../../components/basicTable/basicTable';
import { Box } from '@mui/material';

export default function AbilityChargeConditionSegment() {

  const abilityPageModel = useAbilityPageContext();
  const caseConditionModelList = abilityPageModel.abilityModel?.chargeAbilityModel?.caseConditionModelList ?? [];

  if (caseConditionModelList.length === 0) return;

  const headers = useMemo<HeadCell<CaseConditionModel>[]>(() => [
    { 
      label: 'Description',
      align: 'left',
      sx: { whiteSpace: 'normal' },
      render: (row) => (
        <Box sx={{ maxWidth:'200px'}}>
          {row.descriptionComponent}
        </Box>
      )
    }
  ], [abilityPageModel]);

  return (
    <Box>
      <BasicTable rowKey='id' rows={caseConditionModelList} headCells={headers} />
    </Box>
  )
}