import { useWorldInteractablePageContext } from './worldInteractablePageContext';

import { WorldInteractableParentType } from '../../types/enums';

import { Box, CardContent } from '@mui/material';

import ModelButton from '../../features/modelViewer/components/modelButton';
import ExCard from '../../components/exCard/exCard';
import ExCardHeader from '../../components/exCard/exCardHeader';
import ExCardTableRow from '../../components/exCard/exCardTableRow';
import ExCardTable from '../../components/exCard/exCardTable';
import ExLink from '../../components/exLink/exLink';
import ExIcon from '../../components/exIcon/exIcon';
import ExAssetThumbnail from '../../components/exAssetThumbnail/exAssetThumbnail';

interface WorldInteractablePropertyCardProps {
  questName?: string;
  objectiveName?: string;
}

export default function WorldInteractablePropertyCard({ questName, objectiveName }: WorldInteractablePropertyCardProps) {

  const { 
    worldInteractableModel
  } = useWorldInteractablePageContext();

  const { entityWorldInteractableModel } = worldInteractableModel;

  const isObjectiveWorldInteractable = questName && objectiveName;

  return (
    <ExCard 
      sx={{ 
        float: 'right', 
        width: '250px',
        ml: 1, mb: 1
      }}
    >
      {entityWorldInteractableModel && (
        <>
          <ExCardHeader title={entityWorldInteractableModel.interactableName} />
          <CardContent 
            sx={{ 
              height: '100%', 
              padding: 1, 
              '&:last-child': { paddingBottom: 1 }
            }}
          >
            <ExAssetThumbnail resourceName={entityWorldInteractableModel.interactableAssetResourceName} />
            <ModelButton assetType={entityWorldInteractableModel.interactableAssetType} assetResourceName={entityWorldInteractableModel.interactableAssetResourceName} />
          </CardContent>
        </>
      )}
      {/* Properties */}
      <ExCardHeader title='Properties' /> 
      <ExCardTable>
        <ExCardTableRow 
          label='Type' 
          value={worldInteractableModel.typeDescription}
        />
        {worldInteractableModel && (
          <ExCardTableRow 
            label='Interactable' 
            value={
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                {entityWorldInteractableModel && (
                  <ExIcon resourceName={entityWorldInteractableModel.interactableIconResourceName} size={20} />
                )}
                <ExLink 
                  name={worldInteractableModel.name} 
                  params={isObjectiveWorldInteractable && worldInteractableModel.originType === 'terrain' ? worldInteractableModel.params : ['interactable', worldInteractableModel.name]} />
              </Box>
            }
          />
        )}
        {isObjectiveWorldInteractable && (
          <ExCardTableRow 
            label='Objective'
            value={
              <ExLink name={objectiveName} params={['objective', questName, objectiveName]} />
            }
          />
        )}
        {WorldInteractableParentType[worldInteractableModel.worldInteractableParentType] === 'Terrain' && (
          <ExCardTableRow 
            label='Terrain'
            value={
              <ExLink name={worldInteractableModel.terrainName} params={['terrain', worldInteractableModel.regionName, worldInteractableModel.terrainName]} />
            }
          />
        )}
      </ExCardTable>
    </ExCard>
  )
}