import { useMemo } from 'react';

import type { CaseConditionModel } from '../../../../../data/models/caseConditionModel';

import BasicTable, { type HeadCell } from '../../../../../components/basicTable/basicTable';
import CellTable from '../../../../../components/cellTable/cellTable';
import ExIcon from '../../../../../components/exIcon/exIcon';
import ExLink from '../../../../../components/exLink/exLink';
import { Box } from '@mui/material';

interface UtilityConditionAbilitySegmentProps {
  caseConditionModelList: CaseConditionModel[];
}

export default function GeneralUtilityConditionAbilitySegment({ caseConditionModelList }: UtilityConditionAbilitySegmentProps) {

  const headers = useMemo<HeadCell<CaseConditionModel>[]>(() => {

    const headers: HeadCell<CaseConditionModel>[] = [
      {
        label: 'Name',
        align: 'left',
        sx: { whiteSpace: 'normal' },
        render: (row) => (
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
            <ExIcon resourceName={row.chargeAbilityModel.abilityIconResourceName} size={20} />
            <ExLink pageName={'ability'} name={row.chargeAbilityModel.abilityName} />
          </Box>
        )
      },
      {
        label: 'Description',
        align: 'left',
        sx: { whiteSpace: 'normal' },
        render: (row) => (
          <Box sx={{ maxWidth:'200px' }}>
            {row.chargeAbilityModel.abilityDescription}
          </Box>
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
              list={row.chargeAbilityModel.caseConditionModelList} 
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
    <Box>
      <BasicTable rowKey='id' rows={caseConditionModelList} headCells={headers} />
    </Box>
  )
}