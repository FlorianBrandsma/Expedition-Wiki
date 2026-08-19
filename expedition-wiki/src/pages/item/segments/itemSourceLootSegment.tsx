import { useMemo } from 'react';

import { useItemPageContext } from '../itemPageContext';

import type { AgentInteractableLootTableModel } from '../../../data/models/agentInteractableLootTableModel';

import EnhancedTable, { type HeadCell } from '../../../components/enhancedTable/enhancedTable';
import CellTable from '../../../components/cellTable/cellTable';
import ExIcon from '../../../components/exIcon/exIcon';
import ExLink from '../../../components/exLink/exLink';
import { Box } from '@mui/material';

export default function ItemSourceLootSegment() {

  const itemPageModel = useItemPageContext();
  const { agentInteractableLootTableModelList } = itemPageModel;

  const headers = useMemo<HeadCell<AgentInteractableLootTableModel>[]>(() => {

    const headers: HeadCell<AgentInteractableLootTableModel>[] = [
      { 
        id: 'agentInteractableName', 
        label: 'Agent', 
        align: 'left',
        render: (row) => (
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
            <ExIcon resourceName={row.agentInteractableAssetIconResourceName} size={20} />
            <ExLink pageName={'interactable'} name={row.agentInteractableName} />
          </Box>
        )
      },
      { 
        id: 'name', 
        label: 'Table', 
        align: 'left'
      },
      {
        id: 'quantityDescription',
        label: 'Quantity',
        align: 'center'
      },
      {
        id: 'rarityDescription',
        label: 'Rarity',
        align: 'left'
      }
    ]

    if (agentInteractableLootTableModelList.some(model => model.caseConditionModelList.length > 0)) {
      headers.push({
        id: 'caseConditionModelList',
        label: 'Conditions',
        align: 'left',
        sx: { whiteSpace: 'normal' },
        render: (row) => (
          <CellTable 
            bulleted
            list={row.caseConditionModelList} 
            component={(caseConditionModel) => caseConditionModel.descriptionComponent()}
          />
        )
      })
    }

    return headers;

  }, [itemPageModel]);

  return (
    <Box sx={{ minWidth: '200px' }}>
      <EnhancedTable rowKey="id" rows={agentInteractableLootTableModelList} headCells={headers} />
    </Box>
  )
}