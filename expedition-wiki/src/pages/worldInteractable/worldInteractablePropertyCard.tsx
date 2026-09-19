import { useWorldInteractablePageContext } from './worldInteractablePageContext';

import { CardContent, CardMedia } from '@mui/material';

import ModelButton from '../../features/modelViewer/components/modelButton';
import ExCard from '../../components/exCard/exCard';
import ExCardHeader from '../../components/exCard/exCardHeader';
import ExCardTableRow from '../../components/exCard/exCardTableRow';
import ExCardTable from '../../components/exCard/exCardTable';
import ExLink from '../../components/exLink/exLink';
import { WorldInteractableParentType } from '../../types/enums';

interface WorldInteractablePropertyCardProps {
  questName?: string;
  objectiveName?: string;
}

export default function WorldInteractablePropertyCard({ questName, objectiveName }: WorldInteractablePropertyCardProps) {

  const { 
    worldInteractableModel
  } = useWorldInteractablePageContext();

  const { entityWorldInteractableModel } = worldInteractableModel;

  return (
    <ExCard sx={{ 
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
            }}>
            <CardMedia 
              component='img'
              image={`/images/thumbnails/assets/${entityWorldInteractableModel.interactableAssetResourceName}.png`}
              alt={entityWorldInteractableModel.interactableAssetResourceName}
              sx={{
                width: '66%',
                display: 'block',
                margin: 'auto'
              }}
            />
            <ModelButton assetType={entityWorldInteractableModel.interactableAssetType} assetResourceName={entityWorldInteractableModel.interactableAssetResourceName} />
          </CardContent>
        </>
      )}
      {/* Properties */}
      <ExCardHeader title='Properties' /> 
      <ExCardTable>
        {entityWorldInteractableModel && (
          <ExCardTableRow 
            label='Interactable' 
            value={<ExLink pageName={'interactable'} name={entityWorldInteractableModel.interactableName} />}
          />
        )}
        {questName && objectiveName && (
          <ExCardTableRow 
            label='Objective'
            value={<ExLink pageName={'objective'} name={objectiveName} params={[questName, objectiveName]} />}
          />
        )}
        {worldInteractableModel.worldInteractableParentType === WorldInteractableParentType.indexOf('Terrain') && (
          <ExCardTableRow 
            label='Terrain'
            value={<ExLink pageName={'terrain'} name={worldInteractableModel.terrainName} params={[worldInteractableModel.regionName, worldInteractableModel.terrainName]} />}
          />
        )}
      </ExCardTable>
    </ExCard>
  )
}