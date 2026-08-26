import { useTerrainPageContext } from './terrainPageContext';

import ExCard from '../../components/exCard/exCard';
import ExCardHeader from '../../components/exCard/exCardHeader';
import ExCardTableRow from '../../components/exCard/exCardTableRow';
import ExCardTable from '../../components/exCard/exCardTable';

export default function TerrainPropertyCard() {

  const { terrainModel } = useTerrainPageContext();

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
          label='Region' 
          value={terrainModel.regionName}
        />
      </ExCardTable>
    </ExCard>
  )
}