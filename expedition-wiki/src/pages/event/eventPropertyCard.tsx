import { useEventPageContext } from './eventPageContext';

import { WorldInteractableParentType, WorldInteractableType } from '../../types/enums';

import { Box } from '@mui/material';

import ExCard from '../../components/exCard/exCard';
import ExCardHeader from '../../components/exCard/exCardHeader';
import ExCardTableRow from '../../components/exCard/exCardTableRow';
import ExCardTable from '../../components/exCard/exCardTable';
import ExLink from '../../components/exLink/exLink';
import ExIcon from '../../components/exIcon/exIcon';

export default function EventPropertyCard() {

  const { eventModel } = useEventPageContext();

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
        {/* <ExCardTableRow 
          label='Progression'
          value={eventModel.completeObjective ? 'Yes' : 'No' }
        /> */}
      </ExCardTable>
    </ExCard>
  )
}