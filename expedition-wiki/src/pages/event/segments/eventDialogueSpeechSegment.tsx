import { useMemo } from 'react';

import { useEventPageContext } from '../eventPageContext';

import type { DialogueEventSpeechModel } from '../../../data/models/dialogueEventSpeech';

import { Box } from '@mui/material';

import BasicTable, { type HeadCell } from '../../../components/basicTable/basicTable';
import ExIcon from '../../../components/exIcon/exIcon';
import ExLink from '../../../components/exLink/exLink';

export default function EventDialogueSpeechSegment() {

  const eventPageModel = useEventPageContext();
  const { dialogueEventSpeechModelList } = eventPageModel;

  const headers = useMemo<HeadCell<DialogueEventSpeechModel>[]>(() => {
    
    const headers: HeadCell<DialogueEventSpeechModel>[] = [
      {
        id: 'speechTypeDescription',
        label: 'Type',
        align: 'left'
      },
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
    ]

    if (dialogueEventSpeechModelList.some(x => x.name)) {
      headers.unshift({
        label: 'Interactable',
        align: 'left',
        render: (row) => (
          row.worldInteractableModel.typeDescription !== 'Party' ? (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
              {row.worldInteractableModel.iconResourceName && (
                <ExIcon resourceName={row.worldInteractableModel.iconResourceName} size={20} />
              )}
              <ExLink 
                name={row.worldInteractableModel.name} 
                params={row.worldInteractableModel.params}
              />
            </Box>
          ) : row.name
        )
      })
    }

    return headers;

  }, [eventPageModel]);

  return (
    <BasicTable rowKey='id' rows={dialogueEventSpeechModelList} headCells={headers} />
  )
}