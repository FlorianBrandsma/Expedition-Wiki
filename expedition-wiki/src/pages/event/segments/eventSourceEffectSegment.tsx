import { useMemo } from 'react';

import { useEventPageContext } from '../eventPageContext';

import type { EventEffectModel } from '../../../data/models/eventEffectModel';

import { Box } from '@mui/material';

import BasicTable, { type HeadCell } from '../../../components/basicTable/basicTable';
import ExLink from '../../../components/exLink/exLink';
import ExIcon from '../../../components/exIcon/exIcon';

export default function EventSourceEffectSegment() {

  const eventPageModel = useEventPageContext();
  const { sourceEventEffectModelList } = eventPageModel;

  const headers = useMemo<HeadCell<EventEffectModel>[]>(() => [
    { 
      label: 'Effect', 
      align: 'left',
      render: (row) => (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
          <ExIcon resourceName={row.effectIconResourceName} size={20} />
          <ExLink name={row.effectName} params={['effect', row.effectName]} />
        </Box>
      )
    },
    {
      label: 'Description',
      align: 'left',
      sx: { whiteSpace: 'normal' },
      render: (row) => (
        <Box sx={{ maxWidth:'200px'}}>
          {row.descriptionComponent}
        </Box>
      )
    }
  ], [eventPageModel]);

  return (
    <BasicTable rowKey="id" rows={sourceEventEffectModelList} headCells={headers} />
  )
}