import { useMemo } from 'react';

import { useEventPageContext } from '../eventPageContext';

import type { WorldInteractableReflectionModel } from '../../../data/models/worldInteractableReflectionModel';

import BasicTable, { type HeadCell } from '../../../components/basicTable/basicTable';
import ExLink from '../../../components/exLink/exLink';
import { Box } from '@mui/material';
import ExIcon from '../../../components/exIcon/exIcon';

export default function EventSignalReflectionSegment() {

  const eventPageModel = useEventPageContext();
  const { worldInteractableReflectionModelList } = eventPageModel;

  const headers = useMemo<HeadCell<WorldInteractableReflectionModel>[]>(() => {
    
    const headers: HeadCell<WorldInteractableReflectionModel>[] = [
      {
        label: 'Name', 
        align: 'left',
        render: (row) => (
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
            {row.worldInteractableModel.iconResourceName && (
              <ExIcon resourceName={row.worldInteractableModel.iconResourceName} size={20} />
            )}
            <ExLink name={row.name} params={row.worldInteractableModel.params}
            />
          </Box>
        )
      }
    ]

    return headers;

  }, [eventPageModel]);

  return (
    <BasicTable rowKey="id" rows={worldInteractableReflectionModelList} headCells={headers} />
  )
}