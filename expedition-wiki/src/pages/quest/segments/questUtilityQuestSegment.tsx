import { useMemo } from 'react';

import { useQuestPageContext } from '../questPageContext';

import type { MainQuestModel } from '../../../data/models/mainQuestModel';

import BasicTable, { type HeadCell } from '../../../components/basicTable/basicTable';
import CellTable from '../../../components/cellTable/cellTable';
import ExLink from '../../../components/exLink/exLink';
import { Box } from '@mui/material';

export default function QuestUtilityQuestSegment() {

  const questPageModel = useQuestPageContext();
  const { questModel, mainQuestModelList } = questPageModel;

  const headers = useMemo<HeadCell<MainQuestModel>[]>(() => [      
      {
        label: 'Name',
        align: 'left',
        render: (row) => (
          <ExLink pageName={'quest'} name={row.questName} />
        )
      },
      {
        label: 'Requirements',
        align: 'left',
        sx: { whiteSpace: 'normal' },
        render: (row) => (
          <Box sx={{ maxWidth:'200px'}}>
            <CellTable 
              bulleted
              list={row.mainQuestModelList} 
              highlited={(mainQuestModel) => mainQuestModel.id === questModel.mainQuestModel.id}
              component={(mainQuestModel) => (
                <ExLink pageName={'quest'} name={mainQuestModel.questName} />
              )}
            />
          </Box>
        )
      }
    ], [mainQuestModelList]);

  return (
    <BasicTable rowKey='id' rows={mainQuestModelList} headCells={headers} />
  )
}