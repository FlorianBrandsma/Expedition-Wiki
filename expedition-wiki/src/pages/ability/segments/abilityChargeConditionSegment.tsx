import { useMemo } from 'react';

import { useAbilityPageContext } from '../abilityPageContext';

import type { CaseConditionModel } from '../../../data/models/caseConditionModel';

import EnhancedTable, { type HeadCell } from '../../../components/enhancedTable/enhancedTable';
import { Box } from '@mui/material';

export default function AbilityChargeConditionSegment() {

  const abilityPageModel = useAbilityPageContext();
  const caseConditionModelList = abilityPageModel.abilityModel?.chargeAbilityModel?.caseConditionModelList ?? [];

  if (caseConditionModelList.length === 0) return;

  const headers = useMemo<HeadCell<CaseConditionModel>[]>(() => [
    { 
      id: 'descriptionComponent', 
      label: 'Description',
      align: 'left',
      sx: { whiteSpace: 'normal' },
      render: (row) => (
        <Box sx={{ maxWidth:'200px'}}>
          {row.descriptionComponent()}
        </Box>
      )
    }
  ], [abilityPageModel]);

  return (
    <Box>
      <EnhancedTable rowKey='id' rows={caseConditionModelList} headCells={headers} />
    </Box>
  )
}