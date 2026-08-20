import { useMemo } from 'react';

import { useAbilityPageContext } from '../abilityPageContext';

import type { EffectModel } from '../../../data/models/effectModel';

import EnhancedTable, { type HeadCell } from '../../../components/enhancedTable/enhancedTable';
import ExIcon from '../../../components/exIcon/exIcon';
import ExLink from '../../../components/exLink/exLink';
import { Box } from '@mui/material';

export default function AbilityEffectSegment() {

  const abilityPageModel = useAbilityPageContext();
  const { abilityModel } = abilityPageModel;

  const headers = useMemo<HeadCell<EffectModel>[]>(() => {

    const headers: HeadCell<EffectModel>[] =[
      { 
        id: 'name', 
        label: 'Name', 
        align: 'left',
        render: (row) => (
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
            <ExIcon resourceName={row.iconResourceName} size={20} />
            <ExLink pageName={'effect'} name={row.name} />
          </Box>
        )
      },
      {
        id: 'targetTypeDescription',
        label: 'Apply',
        align: 'left'
      },
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
      },
      {
        id: 'stack',
        label: 'Stack',
        align: 'center'
      }
    ]

    if (abilityModel.effectModelList.some(model => model.successChance < 100)) {
        headers.push({
          id: 'successChanceDescription',
          label: 'Success',
          align: 'right'
        })
      }

    return headers;

  }, [abilityPageModel]);

  return (
    <Box sx={{ mt: 1 }}>
      <EnhancedTable rowKey='id' rows={abilityModel.effectModelList} headCells={headers} />
    </Box>
  )
}