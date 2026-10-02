import { useEventPageContext } from './eventPageContext';

import ExCard from '../../components/exCard/exCard';
import ExCardHeader from '../../components/exCard/exCardHeader';
import ExCardTableRow from '../../components/exCard/exCardTableRow';
import ExCardTable from '../../components/exCard/exCardTable';
import ExLink from '../../components/exLink/exLink';
import { Box } from '@mui/material';
import ExIcon from '../../components/exIcon/exIcon';

export default function EventPropertyCard() {

  const { eventModel } = useEventPageContext();

  const {
    interactableModel,
    interactionModel,
    speechEventModel, 
    transportEventModel,
    restEventModel,
    mailEventModel,
    itemEventModel,
    combatEventModel,
    signalEventModel
  } = eventModel;

  return (
    <ExCard sx={{ 
        float: 'right', 
        width: '250px',
        ml: 1, mb: 1
      }}
    >
      {/* Properties */}
      <ExCardHeader title='Properties' /> 
      <ExCardTable>
        <ExCardTableRow 
          label='Type'
          value={eventModel.typeDescription}
        />
        {interactableModel && (
          <ExCardTableRow 
            label='Interactable'
            value={
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                <ExIcon resourceName={interactableModel.assetIconResourceName} size={20} />
                <ExLink name={interactableModel.name} params={['interactable', interactableModel.name]} />
              </Box>
            }
          />
        )}
        {interactionModel && (
          <ExCardTableRow 
            label='Task'
            value={
              <ExLink name={interactionModel.taskModel.name} params={interactionModel.taskModel.params} />
            }
          />
        )}
        <ExCardTableRow 
          label='Completion'
          value={eventModel.completeTask ? 'Yes' : 'No' }
        />
      </ExCardTable>
      {/* Speech */}
      {speechEventModel && (
        <>
          <ExCardHeader title='Speech' /> 
          <ExCardTable>
            <ExCardTableRow 
              label='Type'
              value={speechEventModel.speechTypeDescription}
            />
            {speechEventModel.duration > 0 && (
              <ExCardTableRow 
                label='Duration'
                value={speechEventModel.durationDescription}
              />
            )}
          </ExCardTable>
        </>
      )}
      {/* Transport */}
      {transportEventModel && (
        <>
          <ExCardHeader title='Transport' /> 
          <ExCardTable>
            <ExCardTableRow 
              label='Terrain'
              value={
                <ExLink name={transportEventModel.terrainName} params={['terrain', transportEventModel.regionName, transportEventModel.terrainName]} />
              }
            />
          </ExCardTable>
        </>
      )}
      {/* Rest */}
      {restEventModel && (
        <>
          <ExCardHeader title='Rest' /> 
          <ExCardTable>
            <ExCardTableRow 
              label='Cost'
              value={
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                  <ExIcon resourceName={restEventModel.itemAssetIconResourceName} size={20} />
                  <ExLink name={restEventModel.itemName} params={['item', restEventModel.itemName]} />
                </Box>
              }
            />
            <ExCardTableRow 
              label='Quantity'
              value={restEventModel.quantityDescription}
            />
          </ExCardTable>
        </>
      )}
      {/* Mail */}
      {mailEventModel && (
        <>
          <ExCardHeader title='Mail' /> 
          <ExCardTable>
            <ExCardTableRow 
              label='Sender'
              value={
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                  <ExIcon resourceName={mailEventModel.interactableIconResourceName} size={20} />
                  <ExLink name={mailEventModel.interactableName} params={['interactable', mailEventModel.interactableName]} />
                </Box>
              }
            />
            <ExCardTableRow 
              label='Subject'
              value={mailEventModel.subjectText}
            />
          </ExCardTable>
        </>
      )}
      {/* Steal item */}
      {itemEventModel?.stealItemEventModel && (
        <>
          <ExCardHeader title='Steal' /> 
          <ExCardTable>
            <ExCardTableRow 
              label='Failure'
              value={
                <ExLink name={itemEventModel?.stealItemEventModel.eventModel.name} params={itemEventModel?.stealItemEventModel.eventModel.params} />
              }
            />
          </ExCardTable>
        </>
      )}
      {/* Shop item */}
      {itemEventModel?.shopItemEventModel && (
        <>
          <ExCardHeader title='Shop' /> 
          <ExCardTable>
            <ExCardTableRow 
              label='Currency'
              value={
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                  <ExIcon resourceName={itemEventModel?.shopItemEventModel.currencyItemAssetIconResourceName} size={20} />
                  <ExLink name={itemEventModel?.shopItemEventModel.currencyItemName} params={['item', itemEventModel?.shopItemEventModel.currencyItemName]} />
                </Box>
              }
            />
          </ExCardTable>
        </>
      )}
      {/* Combat */}
      {combatEventModel && (
        <>
          <ExCardHeader title='Combat' /> 
          <ExCardTable>
            <ExCardTableRow 
              label='State'
              value={combatEventModel.combatStateDescription}
            />
            {combatEventModel.combatStateDescription === 'Active' && (
              <ExCardTableRow 
                label='Enmity'
                value={combatEventModel.enmity}
              />
            )}
            <ExCardTableRow 
              label='Reset Attributes'
              value={combatEventModel.resetAttributes ? 'Yes' : 'No'}
            />
          </ExCardTable>
        </>
      )}
      {/* Signal */}
      {signalEventModel && (
        <>
          <ExCardHeader title='Signal' /> 
          <ExCardTable>
            <ExCardTableRow 
              label='Response'
              value={
                <ExLink name={signalEventModel.responseEventModel.name} params={signalEventModel.responseEventModel.params} />
              }
            />
          </ExCardTable>
        </>
      )}
    </ExCard>
  )
}