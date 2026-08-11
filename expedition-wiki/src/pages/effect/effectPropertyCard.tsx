import { useEffectContext } from './effectContext';

import { CardContent, CardMedia } from '@mui/material';

import ExCard from '../../components/exCard/exCard';
import ExCardHeader from '../../components/exCard/exCardHeader';
import ExCardTableRow from '../../components/exCard/exCardTableRow';
import ExCardTable from '../../components/exCard/exCardTable';

export default function EffectPropertyCard() {

  const effectModel = useEffectContext();

  return (
    <ExCard sx={{ 
        float: 'right', 
        width: '250px',
        ml: 1, mb: 1
      }}
    >
      <ExCardHeader title={effectModel.name} />
      <CardContent 
        sx={{ 
          height: '100%', 
          padding: 1, 
          '&:last-child': { paddingBottom: 1 }
        }}>
        <CardMedia 
          component='img'
          image={`/images/icons/objects/${effectModel.iconResourceName}.png`}
          alt={effectModel.iconResourceName}
          sx={{
            width: '66%',
            display: 'block',
            margin: 'auto'
          }}
        />
      </CardContent>

      <ExCardHeader title='Properties' /> 
      <ExCardTable>
        <ExCardTableRow 
          label='Effect Type' 
          value={effectModel.typeDescription}
        />
      </ExCardTable>
    </ExCard>
  )
}