import { useMemo } from 'react';

import { useAbilityPageContext } from '../abilityPageContext';

import { ClassModel } from '../../../data/models/classModel';

import EnhancedTable, { type HeadCell } from '../../../components/enhancedTable/enhancedTable';
import ExLink from '../../../components/exLink/exLink';
import { Box } from '@mui/material';

export default function AbilityClassSegment() {

  const abilityPageModel = useAbilityPageContext();
  const { classModelList } = abilityPageModel;

  const headers = useMemo<HeadCell<ClassModel>[]>(() => [
    { 
      id: 'name', 
      label: 'Name', 
      align: 'left',
      render: (row) => (
        <ExLink pageName={'class'} name={row.name} />
      )
    }
  ], [abilityPageModel]);

  return (
    <Box sx={{ mt: 1 }}>
      <EnhancedTable rowKey="id" rows={classModelList} headCells={headers} />
    </Box>
  )
}