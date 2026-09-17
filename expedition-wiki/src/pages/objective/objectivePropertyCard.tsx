import { useObjectivePageContext } from './objectivePageContext';

import ExCard from '../../components/exCard/exCard';
import ExCardHeader from '../../components/exCard/exCardHeader';
import ExCardTableRow from '../../components/exCard/exCardTableRow';
import ExCardTable from '../../components/exCard/exCardTable';
import ExLink from '../../components/exLink/exLink';

export default function ObjectivePropertyCard() {

  const { objectiveModel, objectiveModelList } = useObjectivePageContext();

  const previousObjectiveModel = objectiveModelList.find(x => x.orderNumber === (objectiveModel.orderNumber - 1));
  const nextObjectiveModel     = objectiveModelList.find(x => x.orderNumber === (objectiveModel.orderNumber + 1));

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
          label='Quest' 
          value={<ExLink pageName={'quest'} name={objectiveModel.questName} />}
        />
      </ExCardTable>

      {/* Objectives */}
      {objectiveModelList.length > 0 && (
        <>
          <ExCardHeader title='Objectives' /> 
          <ExCardTable>
            {previousObjectiveModel && (
              <ExCardTableRow 
                label='Previous' 
                value={<ExLink pageName={'objective'} name={previousObjectiveModel.name} params={[previousObjectiveModel.questName, previousObjectiveModel.name]} />}
              />
            )}
            {nextObjectiveModel && (
              <ExCardTableRow 
                label='Next' 
                value={<ExLink pageName={'objective'} name={nextObjectiveModel.name} params={[nextObjectiveModel.questName, nextObjectiveModel.name]}/>}
              />
            )}
          </ExCardTable>
        </>
      )}
      
    </ExCard>
  )
}