import { useClimatePageContext } from './climatePageContext';

import { CardContent } from '@mui/material';

import ExCard from '../../components/exCard/exCard';
import ExCardHeader from '../../components/exCard/exCardHeader';
import ExCardTableRow from '../../components/exCard/exCardTableRow';
import ExCardTable from '../../components/exCard/exCardTable';
import ExLink from '../../components/exLink/exLink';
import ExIconThumbnail from '../../components/exIconThumbnail/exIconThumbnail';
import ExMap from '../../components/exMap/exMap';

export default function ClimatePropertyCard() {

  const { climateModel, terrainModel } = useClimatePageContext();

  const coordinates = climateModel.chunkModelList.flatMap(x => x.centerCoordinates);

  return (
    <ExCard sx={{ 
      float: 'right', 
      width: '250px',
      maxWidth: '50%',
      ml: 1, mb: 1
    }}>
      {climateModel.iconResourceName && (
        <>
          <ExCardHeader title={climateModel.name} />
          <CardContent 
            sx={{ 
              height: '100%', 
              padding: 1, 
              '&:last-child': { paddingBottom: 1 }
            }}
          >
            <ExIconThumbnail resourceName={climateModel.iconResourceName} />
          </CardContent>
        </>
      )}

      {/* Properties */}
      <ExCardHeader title='Properties' /> 
      <ExCardTable>
        <ExCardTableRow 
          label='Terrain' 
          value={<ExLink name={climateModel.terrainName} params={['terrain', climateModel.regionName, climateModel.terrainName]} />}
        />
      </ExCardTable>
      
      {/* Map */}
        <ExCardHeader title='Map' /> 
        <ExMap 
          terrainModel={terrainModel}
          chunkModelList={climateModel.chunkModelList}
          {...(coordinates.length > 0 ? {
            position: {
              x: coordinates.reduce((sum, pin) => sum + pin.x, 0) / coordinates.length, 
              z: coordinates.reduce((sum, pin) => sum + pin.z, 0) / coordinates.length
            }
          } : {})}
          focusMapCoordinates={coordinates}
          sx={{
            height: 200,
            width: '100%'
          }} 
        />
    </ExCard>
  )
}