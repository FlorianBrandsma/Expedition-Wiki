import { useMemo } from 'react';

import { useQuestPageContext } from '../questPageContext';

import type { TaskModel } from '../../../data/models/taskModel';

import BasicTable, { type HeadCell } from '../../../components/basicTable/basicTable';
import ExLink from '../../../components/exLink/exLink';

export default function QuestRequirementTaskSegment() {

  const questPageModel = useQuestPageContext();
  const { questModel } = questPageModel;

  const headers = useMemo<HeadCell<TaskModel>[]>(() => [
    {
      label: 'Name', 
      align: 'left',
      render: (row) => (
        <ExLink name={row.name} params={['task', row.name]} />
      )
    }
  ], [questPageModel]);

  return (
    <BasicTable rowKey="id" rows={questModel.sideQuestModel.taskModelList} headCells={headers} />
  )
}