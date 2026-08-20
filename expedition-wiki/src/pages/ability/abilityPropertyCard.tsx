import { useAbilityPageContext } from './abilityPageContext';

import { CardContent, CardMedia } from '@mui/material';

import ExCard from '../../components/exCard/exCard';
import ExCardHeader from '../../components/exCard/exCardHeader';
import ExCardTableRow from '../../components/exCard/exCardTableRow';
import ExCardTable from '../../components/exCard/exCardTable';
import ExIconLabel from '../../components/exIconLabel/exIconLabel';
import { ActionDelayType } from '../../types/enums';

export default function AbilityPropertyCard() {

  const { abilityModel } = useAbilityPageContext();
  //const { chargeAbilityModel, dischargeAbilityModel } = abilityModel;

  return (
    <ExCard sx={{ 
        float: 'right', 
        width: '250px',
        ml: 1, mb: 1
      }}
    >
      <ExCardHeader title={abilityModel.name} />
      <CardContent 
        sx={{ 
          height: '100%', 
          padding: 1, 
          '&:last-child': { paddingBottom: 1 }
        }}>
        <CardMedia 
          component='img'
          image={`/images/icons/objects/${abilityModel.iconResourceName}.png`}
          alt={abilityModel.iconResourceName}
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
          label='Ability Type' 
          value={abilityModel.typeDescription}
        />
        {abilityModel.armEquipmentItemTypeDescription && (
          <ExCardTableRow 
            label='Arm Type' 
            value={`${abilityModel.armEquipmentItemTypeDescription}`}
          />
        )}
        {abilityModel.targetTypeDescription && (
          <ExCardTableRow 
            label='Target' 
            value={abilityModel.targetTypeDescription}
          />
        )}
        
        <ExCardTableRow 
          label='Affected' 
          value={abilityModel.affectedTypeDescription}
        />
        <ExCardTableRow 
          label='Executions' 
          value={abilityModel.executions}
        />
        {abilityModel.cooldownDuration > 0 && (
          <ExCardTableRow 
            label='Cooldown' 
            value={`${abilityModel.cooldownDuration.toFixed(2)}s`}
          />
        )}
      </ExCardTable>

      {/* Delays */}
      {(abilityModel.actionDelayModelList.map((actionDelayModel) => (
        <>
          <ExCardHeader title={`${ActionDelayType[actionDelayModel.type]}`} />
          <ExCardTable>
            <ExCardTableRow 
              label='Cooldown' 
              value={`${actionDelayModel.durationDescription}`}
            />
            {actionDelayModel.cancelDescription && (
              <ExCardTableRow 
                label='Cancel' 
                value={`${actionDelayModel.cancelDescription}`}
              />
            )}
          </ExCardTable>
        </>
      )))}
      
      {/* Resources */}
      {(abilityModel.enmity > 0 || abilityModel.energy > 0 || abilityModel.mana > 0) && (
        <>
          <ExCardHeader title='Resources' />
          <ExCardTable>
            {abilityModel.enmity > 0 && (
              <ExCardTableRow 
                label='Enmity' 
                value={abilityModel.enmity}
              />
            )}
            {abilityModel.energy > 0 && (
              <ExCardTableRow 
                label={
                  <ExIconLabel 
                    label='Energy'
                    url='/images/icons/general/ResourceBox_Energy.png'
                    size={20}
                    alignment='flex-end'
                  />
                }
                value={abilityModel.energy}
              />
            )}
            {abilityModel.mana > 0 && (
              <ExCardTableRow 
                label={
                  <ExIconLabel 
                    label='Mana'
                    url='/images/icons/general/ResourceBox_Mana.png'
                    size={20}
                    alignment='flex-end'
                  />
                }
                value={abilityModel.mana}
              />
            )}
          </ExCardTable>
        </>
      )}

    </ExCard>
  )
}