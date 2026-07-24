import { useMemo } from 'react';
import { Link } from 'react-router-dom';

import { useGameContext } from '../../../context/gameContext';
import { useItemContext } from '../itemContext';

import { ClassModel } from '../../../data/models/classModel';

import EnhancedTable, { type HeadCell } from '../../../components/enhancedTable/enhancedTable';
import { Box } from '@mui/material';

export default function ItemClassSegment() {

  const { gameModel } = useGameContext();
  const itemModel = useItemContext();

  if (!itemModel) return;

  const headers = useMemo<HeadCell<ClassModel>[]>(() => [
    { 
      id: 'name', 
      label: "Name", 
      numeric: false,
      render: (row) => (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
          <Link 
            className='link'
            to={`/${gameModel.name}/class/${row.name}`} 
            mask={`/${gameModel.name.replaceAll(' ', '_')}/class/${row.name.replaceAll(' ', '_')}`}
          >
            {row.name}
          </Link>
        </Box>
      )
    }
  ], [itemModel]);

  return (
    <Box sx={{ display:'inline-block', minWidth: '200px' }}>
      <EnhancedTable rowKey="id" rows={itemModel.classModelList} headCells={headers} />
    </Box>
  )
}