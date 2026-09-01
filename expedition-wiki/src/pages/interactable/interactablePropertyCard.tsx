import { useInteractablePageContext } from './interactablePageContext';

import { ElementType } from '../../types/enums';

import { CardContent, CardMedia, TableRow, TableCell, Box, Stack } from '@mui/material';

import ModelButton from '../../features/modelViewer/components/modelButton';
import ExCard from '../../components/exCard/exCard';
import ExCardHeader from '../../components/exCard/exCardHeader';
import ExCardTableRow from '../../components/exCard/exCardTableRow';
import ExCardTable from '../../components/exCard/exCardTable';
import ExIcon from '../../components/exIcon/exIcon';
import ExIconLabel from '../../components/exIconLabel/exIconLabel';
import ElementTable from '../../components/elementTable/elementTable';
import ExCollapse from '../../components/exCollapse/exCollapse';
import ExLink from '../../components/exLink/exLink';
import CellTable from '../../components/cellTable/cellTable';

export default function InteractablePropertyCard() {

  const { 
    interactableModel, 
    factionModel, 
    classModel, 
    interactableProximityAreaModel, 
    equipmentItemModelList 
  } = useInteractablePageContext();

  const { agentInteractableModel } = interactableModel;

  return (
    <ExCard sx={{ 
        float: 'right', 
        width: '250px',
        ml: 1, mb: 1
      }}
    >
      <ExCardHeader title={interactableModel.name} />
      <CardContent 
        sx={{ 
          height: '100%', 
          padding: 1, 
          '&:last-child': { paddingBottom: 1 }
        }}>
        <CardMedia 
          component='img'
          image={`/images/thumbnails/assets/${interactableModel.assetResourceName}.png`}
          alt={interactableModel.assetResourceName}
          sx={{
            width: '66%',
            display: 'block',
            margin: 'auto'
          }}
        />
        <ModelButton assetType={interactableModel.assetType} assetResourceName={interactableModel.assetResourceName} />
      </CardContent>

      <ExCardHeader title='Properties' /> 
      <ExCardTable>
        <ExCardTableRow 
          label='Interactable Type' 
          value={interactableModel.typeDescription}
        />
        {agentInteractableModel?.characterAgentInteractableModel && (
          <ExCardTableRow 
            label='Character Type' 
            value={`${agentInteractableModel.characterAgentInteractableModel.typeDescription}`}
          />
        )}
        {factionModel && (
          <ExCardTableRow 
            label='Faction' 
            value={
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                <ExIcon resourceName={factionModel.iconResourceName} size={20} />
                <ExLink pageName={'faction'} name={factionModel.name} />
              </Box>
            }
          />
        )}
        {agentInteractableModel && (
          <ExCardTableRow 
            label='Element' 
            value={
              <ExIconLabel 
                label={ElementType[agentInteractableModel.elementType]}
                url={`/images/icons/elements/${ElementType[agentInteractableModel.elementType]}.png`}
                size={20}
                alignment='flex-start'
              />
            }
          />
        )}
        {classModel && (
          <ExCardTableRow 
            label='Class' 
            value={
              <ExLink pageName={'class'} name={classModel.name} />
            }
          />
        )}
      </ExCardTable>

      {/* Sensors */}
      {(interactableModel.sightRange > 0 || interactableModel.hearingRange > 0 || interactableProximityAreaModel) && (
        <>
          <ExCardHeader title='Sensors' />
          <ExCardTable>
            {interactableModel.sightRange > 0 && (
              <ExCardTableRow 
                label='Sight'
                value={`${interactableModel.sightRange}m`}
              />
            )}
            {interactableModel.hearingRange > 0 && (
              <ExCardTableRow 
                label='Hearing'
                value={`${interactableModel.hearingRange}m`}
              />
            )}
            {interactableProximityAreaModel && (
              <ExCardTableRow 
                label='Proximity' 
                value={
                  <CellTable 
                    bulleted
                    list={interactableProximityAreaModel.dimensionList} 
                    component={(dimension) => (
                      <Box sx={{ display: 'flex', flexDirection: 'row', paddingRight: 1 }}>
                        <Box sx={{ flexGrow: 1, textAlign: 'left' }}>{dimension.label}</Box>
                        <Box sx={{ flexGrow: 1, textAlign: 'right'}}>{`${dimension.value}m`}</Box>
                      </Box>
                    )}
                  />
                }
              />
            )}
          </ExCardTable>
        </>
      )}

      {/* Resources */}
      {agentInteractableModel && (
      <>
        <ExCardHeader title='Resources' />
        <ExCardTable>
          <ExCardTableRow 
            label={
              <ExIconLabel 
                label='Health'
                url='/images/icons/general/ResourceBox_Health.png'
                size={20}
                alignment='flex-end'
              />
            }
            value={agentInteractableModel.health + equipmentItemModelList.reduce((accumlator, equipmentItemModel) => accumlator + equipmentItemModel.health, 0)}
          />
          <ExCardTableRow 
            label={
              <ExIconLabel 
                label='Mana'
                url='/images/icons/general/ResourceBox_Mana.png'
                size={20}
                alignment='flex-end'
              />
            }
            value={agentInteractableModel.mana + equipmentItemModelList.reduce((accumlator, equipmentItemModel) => accumlator + equipmentItemModel.mana, 0)}
          />
        </ExCardTable>
      </>
      )}

      {/* Attack */}
      {agentInteractableModel && (
      <>
        <ExCardHeader title='Attack' />
        <ExCardTable>
          <ExCardTableRow 
            label={
              <ExIconLabel 
                label='Physical'
                url= '/images/icons/general/Physical.png'
                size={20}
                alignment='flex-end'
              />
            }
            value={agentInteractableModel.physicalAttack + equipmentItemModelList.reduce((accumlator, equipmentItemModel) => accumlator + equipmentItemModel.physicalAttack, 0)}
          />
          <ExCardTableRow 
            label={
              <ExIconLabel 
                label='Magical'
                url= '/images/icons/general/Magical.png'
                size={20}
                alignment='flex-end'
              />
            }
            value={agentInteractableModel.magicalAttack + equipmentItemModelList.reduce((accumlator, equipmentItemModel) => accumlator + equipmentItemModel.magicalAttack, 0)}
          />
          <TableRow sx={{ '& > .MuiTableCell-root': { borderBottom: 'unset' } }}>
            <TableCell colSpan={2} sx={{ padding: 0 }}>
              <ExCollapse 
                label='Elements'
                collapseComponent={
                  <ElementTable normalAttributeType='Attack' model={agentInteractableModel} equipmentItemModelList={equipmentItemModelList} />
                }/>
            </TableCell>
          </TableRow> 
        </ExCardTable>
      </>
      )}

      {/* Defence */}
      {agentInteractableModel && (
      <>
        <ExCardHeader title='Defence' />
        <ExCardTable>
          <ExCardTableRow 
            label={
              <ExIconLabel 
                label='Physical'
                url= '/images/icons/general/Physical.png'
                size={20}
                alignment='flex-end'
              />
            }
            value={agentInteractableModel.physicalDefence + equipmentItemModelList.reduce((accumlator, equipmentItemModel) => accumlator + equipmentItemModel.physicalDefence, 0)}
          />
          <ExCardTableRow 
            label={
              <ExIconLabel 
                label='Magical'
                url= '/images/icons/general/Magical.png'
                size={20}
                alignment='flex-end'
              />
            }
            value={agentInteractableModel.magicalDefence + equipmentItemModelList.reduce((accumlator, equipmentItemModel) => accumlator + equipmentItemModel.magicalDefence, 0)}
          />
          <TableRow sx={{ '& > .MuiTableCell-root': { borderBottom: 'unset' } }}>
            <TableCell colSpan={2} sx={{ padding: 0 }}>
              <ExCollapse 
                label='Elements'
                collapseComponent={
                  <ElementTable normalAttributeType='Defence' model={agentInteractableModel} equipmentItemModelList={equipmentItemModelList} />
                }/>
            </TableCell>
          </TableRow>
        </ExCardTable>
      </>
      )}
    </ExCard>
  )
}