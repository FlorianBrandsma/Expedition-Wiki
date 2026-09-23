import { useMemo } from 'react';

import { useItemPageContext } from '../itemPageContext';

import { ClassModel } from '../../../data/models/classModel';

import BasicTable, { type HeadCell } from '../../../components/basicTable/basicTable';
import ExLink from '../../../components/exLink/exLink';
import { Box } from '@mui/material';

export default function ItemClassSegment() {

  const itemPageModel = useItemPageContext();
  const { classModelList } = itemPageModel;

  const headers = useMemo<HeadCell<ClassModel>[]>(() => [
    {
      label: 'Name', 
      align: 'left',
      render: (row) => (
        <ExLink name={row.name} params={['class', row.name]} />
      )
    }
  ], [itemPageModel]);

  return (
    <Box>
      <BasicTable rowKey="id" rows={classModelList} headCells={headers} />
    </Box>
  )
}