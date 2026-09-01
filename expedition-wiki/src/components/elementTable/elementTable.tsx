import { TableBody, TableRow, TableCell, Typography } from '@mui/material';

import ExTable from '../../components/exTable/exTable';
import ExIconLabel from '../../components/exIconLabel/exIconLabel';

import { NormalAttributeType, ElementType } from '../../types/enums';

import { AttackValue, DefenceValue, type AttributeProperty } from '../../services/attributeManager';
import type { EquipmentItemModel } from '../../data/models/equipmentItemModel';
import { AgentInteractableModel } from '../../data/models/agentInteractableModel';

interface ElementTableProps {
  normalAttributeType: NormalAttributeType;
  model: EquipmentItemModel | AgentInteractableModel;
  equipmentItemModelList?: EquipmentItemModel[];
}

export default function ElementTable(props: ElementTableProps) {

  const { normalAttributeType, model, equipmentItemModelList } = props;

  const elementType = ElementType[model.elementType];

  const physicalKeys: Record<string, keyof AttributeProperty> = { 'Attack': 'physicalAttack', 'Defence': 'physicalDefence' };
  const magicalKeys:  Record<string, keyof AttributeProperty> = { 'Attack': 'magicalAttack',  'Defence': 'magicalDefence'  };

  const physicalKey = physicalKeys[normalAttributeType];
  const magicalKey  = magicalKeys [normalAttributeType];

  const physicalValue = model[physicalKey];
  const magicalValue  = model[magicalKey];

  const totalPhysicalValue = physicalValue + (equipmentItemModelList?.reduce((accumlator, equipmentItemModel) => accumlator + equipmentItemModel[physicalKey], 0) ?? 0);
  const totalMagicalValue  = magicalValue  + (equipmentItemModelList?.reduce((accumlator, equipmentItemModel) => accumlator + equipmentItemModel[magicalKey],  0) ?? 0);

  const totalValue = totalPhysicalValue + totalMagicalValue;

  return (
    <ExTable size='small'>
      <TableBody>
        {ElementType.map((type) => { 

          const value = {
            'Attack':  AttackValue (type, elementType, physicalValue, magicalValue) + (equipmentItemModelList?.reduce((accumlator, equipmentItemModel) => accumlator + AttackValue (type, ElementType[equipmentItemModel.elementType], equipmentItemModel.physicalAttack,  equipmentItemModel.magicalAttack),  0) ?? 0),
            'Defence': DefenceValue(type, elementType, physicalValue, magicalValue) + (equipmentItemModelList?.reduce((accumlator, equipmentItemModel) => accumlator + DefenceValue(type, ElementType[equipmentItemModel.elementType], equipmentItemModel.physicalDefence, equipmentItemModel.magicalDefence), 0) ?? 0)
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