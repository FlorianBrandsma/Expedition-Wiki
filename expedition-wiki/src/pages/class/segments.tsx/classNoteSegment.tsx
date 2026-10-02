import { useMemo } from 'react';

import { useClassPageContext } from '../classPageContext';

import type { NoteModel } from '../../../data/models/noteModel';

import { Box } from '@mui/material';

import BasicTable, { type HeadCell } from '../../../components/basicTable/basicTable';

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
          {row.textComponent}
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