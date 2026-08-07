import { useMemo } from 'react';

import { useItemContext } from '../itemContext';

import { ClassModel } from '../../../data/models/classModel';

import EnhancedTable, { type HeadCell } from '../../../components/enhancedTable/enhancedTable';
import ExLink from '../../../components/exLink/exLink';
import { Box } from '@mui/material';

export default function ItemClassSegment() {

  const itemModel = useItemContext();

  if (!itemModel) return;

  const headers = useMemo<HeadCell<ClassModel>[]>(() => [
    { 
      id: 'name', 
      label: 'Name', 
      align: 'left',
      render: (row) => (
        <ExLink pageName={'class'} name={row.name} />
      )
    }
  ], [itemModel]);

  return (
    <Box sx={{ display:'inline-block', minWidth: '200px' }}>
      <EnhancedTable rowKey="id" rows={itemModel.classModelList} headCells={headers} />
    </Box>
  )
}