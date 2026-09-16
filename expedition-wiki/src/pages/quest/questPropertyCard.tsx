import { useQuestPageContext } from './questPageContext';

import ExCard from '../../components/exCard/exCard';
import ExCardHeader from '../../components/exCard/exCardHeader';
import ExCardTableRow from '../../components/exCard/exCardTableRow';
import ExCardTable from '../../components/exCard/exCardTable';

export default function QuestPropertyCard() {

  const { questModel } = useQuestPageContext();

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
          value={questModel.typeDescription}
        />
        <ExCardTableRow 
          label='Expansion' 
          value={questModel.expansionName}
        />
      </ExCardTable>
    </ExCard>
  )
}