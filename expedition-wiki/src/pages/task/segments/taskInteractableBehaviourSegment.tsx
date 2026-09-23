import { useMemo } from 'react';

import { useTaskPageContext } from '../taskPageContext';

import type { BehaviourInteractionModel } from '../../../data/models/behaviourInteractionModel';

import BasicTable, { type HeadCell } from '../../../components/basicTable/basicTable';

export default function TaskInteractableBehaviourSegment() {

  const taskPageModel = useTaskPageContext();
  const { behaviourInteractionModelList } = taskPageModel;

  const headers = useMemo<HeadCell<BehaviourInteractionModel>[]>(() => {

    const headers: HeadCell<BehaviourInteractionModel>[] = [
      {
        id: 'interactionTimeDescription',
        label: 'Time',
        align: 'center'
      },
      {
        label: 'Affiliation',
        align: 'left',
        render: row => row.affiliationComponent
      },
      {
        id: 'combatStateDescription',
        label: 'Combat',
        align: 'left'
      }
    ];

    return headers;

  }, [taskPageModel]);

  return (
    <BasicTable rowKey='id' rows={behaviourInteractionModelList} headCells={headers} />
  )
}