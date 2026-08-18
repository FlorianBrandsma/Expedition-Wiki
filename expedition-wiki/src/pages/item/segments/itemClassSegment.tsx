import { useMemo } from 'react';

import { useItemPageContext } from '../itemPageContext';

import { ClassModel } from '../../../data/models/classModel';

import EnhancedTable, { type HeadCell } from '../../../components/enhancedTable/enhancedTable';
import ExLink from '../../../components/exLink/exLink';
import { Box } from '@mui/material';

export default function ItemClassSegment() {

  const itemPageModel = useItemPageContext();
  const { classModelList } = itemPageModel;

  const headers = useMemo<HeadCell<ClassModel>[]>(() => [
    { 
      id: 'name', 
      label: 'Name', 
      align: 'left',
      render: (row) => (
        <ExLink pageName={'class'} name={row.name} />
      )
    }
  ], [itemPageModel]);

  return (
    <Box sx={{ minWidth: '200px' }}>
      <EnhancedTable rowKey="id" rows={classModelList} headCells={headers} />
    </Box>
  )
}