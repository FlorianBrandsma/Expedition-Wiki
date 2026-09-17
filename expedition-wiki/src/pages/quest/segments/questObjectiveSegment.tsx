import { useMemo } from 'react';

import { useQuestPageContext } from '../questPageContext';

import type { ObjectiveModel } from '../../../data/models/objectiveModel';

import BasicTable, { type HeadCell } from '../../../components/basicTable/basicTable';
import ExLink from '../../../components/exLink/exLink';
import { Box } from '@mui/material';

export default function QuestObjectiveSegment() {

  const questPageModel = useQuestPageContext();
  const { objectiveModelList } = questPageModel;

  const headers = useMemo<HeadCell<ObjectiveModel>[]>(() => [
    {
      label: 'Name', 
      align: 'left',
      render: (row) => (
        <ExLink pageName={'objective'} name={row.name} params={[row.questName, row.name]} />
      )
    },
    {
      label: 'Description', 
      align: 'left',
      sx: { whiteSpace: 'normal' },
      render: (row) => (
        <Box sx={{ maxWidth:'300px'}}>
          {row.descriptionComponent}
        </Box>
      )
    }
  ], [questPageModel]);

  return (
    <Box sx={{ mt: 1 }}>
      <BasicTable rowKey="id" rows={objectiveModelList} headCells={headers} />
    </Box>
  )
}