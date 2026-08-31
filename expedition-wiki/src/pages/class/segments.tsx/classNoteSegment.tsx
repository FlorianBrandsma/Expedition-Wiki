import { useMemo } from 'react';

import { useClassPageContext } from '../classPageContext';

import BasicTable, { type HeadCell } from '../../../components/basicTable/basicTable';
import { Box } from '@mui/material';
import type { NoteModel } from '../../../data/models/noteModel';

export default function ClassNoteSegment() {

  const classPageModel = useClassPageContext();
  const { noteModelList } = classPageModel;

  const headers = useMemo<HeadCell<NoteModel>[]>(() => [
    {
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
      <BasicTable rowKey='id' rows={noteModelList} headCells={headers} />
    </Box>
  )
}