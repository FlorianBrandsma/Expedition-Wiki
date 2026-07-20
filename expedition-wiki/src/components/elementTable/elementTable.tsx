import { TableBody, TableRow, TableCell, Typography } from '@mui/material';

import ExTable from '../../components/exTable/exTable';
import ExIconLabel from '../../components/exIconLabel/exIconLabel';

import { NormalAttributeType, ElementType } from '../../types/enums';

import { AttackValue, DefenceValue } from '../../services/attributeManager';
import type { EquipmentItemModel } from '../../data/models/equipmentItemModel';
import { AgentInteractableModel } from '../../data/models/agentInteractableModel';

interface ElementTableProps {
  normalAttributeType: NormalAttributeType;
  model: EquipmentItemModel | AgentInteractableModel;
}

export default function ElementTable(props:ElementTableProps) {

  const { normalAttributeType, model } = props;

  const elementType = ElementType[model.elementType];

  const physicalValue = {
    'Attack':  model.physicalAttack,
    'Defence': model.physicalDefence
  }[normalAttributeType];

  const magicalValue = {
    'Attack':  model.magicalAttack,
    'Defence': model.magicalDefence
  }[normalAttributeType];

  const totalValue = physicalValue + magicalValue;

  return (
    <ExTable size='small'>
      <TableBody>
        {ElementType.map((type) => { 

          const value = {
            'Attack':  AttackValue (type, elementType, physicalValue, magicalValue),
            'Defence': DefenceValue(type, elementType, physicalValue, magicalValue)
          }[normalAttributeType];

          const percentageValue = value !== 0 ? Math.round((value / totalValue) * 100) : 0;

          return (
            <TableRow key={type}>
              <TableCell>
                <ExIconLabel 
                  label={type}
                  url={`/images/icons/elements/${type}.png`}
                  size={20}
                  alignment='flex-start'
                />
              </TableCell>
              <TableCell width='50%' align='right'>
                <Typography 
                  variant='inherit'
                  sx={{
                    color: percentageValue > 0 ? 'green' : 
                           percentageValue < 0 ? 'red'   : 
                                                 'text.primary'
                  }}>
                  {`${percentageValue}%`}
                </Typography>
              </TableCell>
            </TableRow>
          )}
        )}
      </TableBody>
    </ExTable>
  )
}