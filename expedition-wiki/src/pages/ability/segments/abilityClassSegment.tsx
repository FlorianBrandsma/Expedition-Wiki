import { useMemo } from 'react';

import { useAbilityPageContext } from '../abilityPageContext';

import { ClassModel } from '../../../data/models/classModel';

import BasicTable, { type HeadCell } from '../../../components/basicTable/basicTable';
import ExLink from '../../../components/exLink/exLink';
import { Box } from '@mui/material';

export default function AbilityClassSegment() {

  const abilityPageModel = useAbilityPageContext();
  const { classModelList } = abilityPageModel;

  const headers = useMemo<HeadCell<ClassModel>[]>(() => [
    { 
      label: 'Name', 
      align: 'left',
      render: (row) => (
        <ExLink pageName={'class'} name={row.name} />
      )
    }
  ], [abilityPageModel]);

  return (
    <Box sx={{ mt: 1 }}>
      <BasicTable rowKey="id" rows={classModelList} headCells={headers} />
    </Box>
  )
}