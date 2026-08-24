import { useFactionPageContext } from './factionPageContext';

import { CardContent, CardMedia } from '@mui/material';

import ExCard from '../../components/exCard/exCard';
import ExCardHeader from '../../components/exCard/exCardHeader';
import ExCardTableRow from '../../components/exCard/exCardTableRow';
import ExCardTable from '../../components/exCard/exCardTable';

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
        }}>
        <CardMedia 
          component='img'
          image={`/images/icons/objects/${factionModel.iconResourceName}.png`}
          alt={factionModel.iconResourceName}
          sx={{
            width: '66%',
            display: 'block',
            margin: 'auto'
          }}
        />
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