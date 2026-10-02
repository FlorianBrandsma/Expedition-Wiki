import { useMemo } from 'react';

import { useEventPageContext } from '../eventPageContext';

import type { EffectModel } from '../../../data/models/effectModel';

import { Box } from '@mui/material';

import BasicTable, { type HeadCell } from '../../../components/basicTable/basicTable';
import ExIcon from '../../../components/exIcon/exIcon';
import ExLink from '../../../components/exLink/exLink';

export default function EventEffectEffectSegment() {

  const eventPageModel = useEventPageContext();
  const { effectModelList } = eventPageModel;

  const headers = useMemo<HeadCell<EffectModel>[]>(() => [
    { 
      label: 'Name', 
      align: 'left',
      render: (row) => (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
          <ExIcon resourceName={row.iconResourceName} size={20} />
          <ExLink name={row.name} params={['effect', row.name]} />
        </Box>
      )
    },
    {
      label: 'Description',
      align: 'left',
      sx: { whiteSpace: 'normal' },
      render: (row) => (
        <Box sx={{ maxWidth:'200px'}}>
          {row.descriptionComponent()}
        </Box>
      )
    },
    {
      id: 'stack',
      label: 'Stack',
      align: 'center'
    }
  ], [eventPageModel]);

  return (
    <BasicTable rowKey='id' rows={effectModelList} headCells={headers} />
  )
}