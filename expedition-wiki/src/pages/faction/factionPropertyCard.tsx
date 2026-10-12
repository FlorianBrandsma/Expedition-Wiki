import { useFactionPageContext } from './factionPageContext';

import { CardContent } from '@mui/material';

import ExCard from '../../components/exCard/exCard';
import ExCardHeader from '../../components/exCard/exCardHeader';
import ExCardTableRow from '../../components/exCard/exCardTableRow';
import ExCardTable from '../../components/exCard/exCardTable';
import ExIconThumbnail from '../../components/exIconThumbnail/exIconThumbnail';

export default function FactionPropertyCard() {

  const { factionModel } = useFactionPageContext();

  return (
    <ExCard sx={{ 
        float: 'right', 
        width: '250px',
        ml: 1, mb: 1
      }}
    >
      <ExCardHeader title={factionModel.name} />
      <CardContent 
        sx={{ 
          height: '100%', 
          padding: 1, 
          '&:last-child': { paddingBottom: 1 }
        }}
      >
        <ExIconThumbnail resourceName={factionModel.iconResourceName} />
      </CardContent>

      {/* Properties */}
      <ExCardHeader title='Properties' /> 
      <ExCardTable>
        <ExCardTableRow 
          label='Ally Rank' 
          value={factionModel.allyRank}
        />
        <ExCardTableRow 
          label='Rank Limit' 
          value={factionModel.rankLimit}
        />
      </ExCardTable>
    </ExCard>
  )
}