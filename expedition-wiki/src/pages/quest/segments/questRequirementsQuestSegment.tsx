import { useMemo } from 'react';

import { useQuestPageContext } from '../questPageContext';

import type { MainQuestModel } from '../../../data/models/mainQuestModel';

import BasicTable, { type HeadCell } from '../../../components/basicTable/basicTable';
import ExLink from '../../../components/exLink/exLink';

export default function QuestRequirementQuestSegment() {

  const questPageModel = useQuestPageContext();
  const { questModel } = questPageModel;

  const headers = useMemo<HeadCell<MainQuestModel>[]>(() => [
    {
      label: 'Name', 
      align: 'left',
      render: (row) => (
        <ExLink name={row.questName} params={['quest', row.questName]} />
      )
    }
  ], [questPageModel]);

  return (
    <BasicTable rowKey="id" rows={questModel.mainQuestModel.mainQuestModelList} headCells={headers} />
  )
}