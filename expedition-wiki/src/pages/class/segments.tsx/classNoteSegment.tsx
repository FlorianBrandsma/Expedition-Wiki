import { useMemo } from 'react';

import { useClassPageContext } from '../classPageContext';

import EnhancedTable, { type HeadCell } from '../../../components/enhancedTable/enhancedTable';
import { Box } from '@mui/material';
import type { NoteModel } from '../../../data/models/noteModel';

export default function ClassNoteSegment() {

  const classPageModel = useClassPageContext();
  const { noteModelList } = classPageModel;

  const headers = useMemo<HeadCell<NoteModel>[]>(() => [
    {
      id: 'textComponent',
      label: 'Text',
      align: 'left',
      sx: { whiteSpace: 'normal' },
      render: (row) => (
        <Box sx={{ maxWidth:'300px'}}>
          {row.textComponent()}
        </Box>
      )
    }
  ], [classPageModel]);

  return (
    <Box sx={{ mt: 1 }}>
      <EnhancedTable rowKey='id' rows={noteModelList} headCells={headers} />
    </Box>
  )
}