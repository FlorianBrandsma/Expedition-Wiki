import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';

import { useGameContext } from '../../context/gameContext';
import { ItemPageContext } from './itemPageContext';

import { ItemPageModel } from '../../data/models/pages/itemPageModel';
import { ItemPageParameters } from '../../data/parameters/itemPageParameters';
import { getData } from '../../services/dataManager';

import { ItemComponentType } from '../../types/enums';

import { Divider, Box, Typography } from '@mui/material';

import ItemPropertyCard from './itemPropertyCard';
import ItemClassSegment from './segments/itemClassSegment';
import ItemSupplyAbilitySegment from './segments/itemSupplyAbilitySegment';

import type { ContentSegment } from '../../components/contentTable/contentTable';
import ContentTable from '../../components/contentTable/contentTable';
import Segment from '../../components/segment/segment';
import ItemEquipmentAbilitySegment from './segments/itemEquipmentAbilitySegment';
import ItemEquipmentEffectSegment from './segments/itemEquipmentEffectSegment';
import ItemEquipmentSetSegment from './segments/itemEquipmentSetSegment';
import ItemCraftSegment from './segments/itemCraftSegment';
import ItemCraftComponentSegment from './segments/itemCraftComponentSegment';

export default function ItemPage() {

  const params = useParams<{ name: string }>();
  
  const { gameModel } = useGameContext();

  const contentSegments: ContentSegment[] = [];

  const parameters = new ItemPageParameters({
    gameId:[gameModel.id],
    name: params.name?.replaceAll('_', ' ')
  });

  const itemPageQuery = useQuery<ItemPageModel[]>({
    queryKey: ['parameters', parameters],
    queryFn: () => getData<ItemPageModel>(parameters, ItemPageModel),
    initialData: []
  });

  if (itemPageQuery.data?.length === 0) return;

  const itemPageModel = itemPageQuery.data[0];
  
  const { 
    itemModel,       
    classModelList, 
    statusEffectModelList, 
    dischargeAbilityModelList, 
    equipmentSetModelList, 
    itemComponentModelList, 
    componentItemModelList
  } = itemPageModel;

  const classSegment = {
    label: 'Classes',
    id: 'Classes',
    component: <ItemClassSegment/>
  }

  if (itemModel?.supplyItemModel) {

    const supplySegment = {
      label: 'Supply',
      id: 'Supply',
      children: [
        {
          label: 'Ability',
          id: 'Ability',
          component: <ItemSupplyAbilitySegment/>
        }
      ]
    } as ContentSegment;

    if (classModelList.length > 0) 
      supplySegment.children!.push(classSegment);
    
    if (supplySegment.children?.length !== 0)
      contentSegments.push(supplySegment);
  }

  if (itemModel?.equipmentItemModel) {

    const equipmentSegment = {
      label: 'Equipment',
      id: 'Equipment',
      children: []
    } as ContentSegment;

    if (classModelList.length > 0) 
      equipmentSegment.children!.push(classSegment);

    if (statusEffectModelList.length > 0) {
      
      equipmentSegment.children!.push({
        label: 'Effects',
        id: 'Effects',
        component: <ItemEquipmentEffectSegment/>
      });
    }

    if (dischargeAbilityModelList.length > 0) {

      equipmentSegment.children!.push({
        label: 'Abilities',
        id: 'Abilities',
        component: <ItemEquipmentAbilitySegment/>
      });
    }

    if (equipmentSetModelList.length > 0) {

      equipmentSegment.children!.push({
        label: 'Sets',
        id: 'Sets',
        component: <ItemEquipmentSetSegment/>
      });
    }

    if (equipmentSegment.children?.length !== 0)
      contentSegments.push(equipmentSegment);
  }

  if (itemModel) {

    const craftSegment = {
      label: 'Crafting',
      id: 'Crafting',
      children: []
    } as ContentSegment

    ItemComponentType.forEach((type) => {
      
      const list = itemComponentModelList.filter(x => ItemComponentType[x.type] == type);

      if (list.length > 0) {

        craftSegment.children!.push({
          label: type,
          id: type,
          component: <ItemCraftSegment itemComponentModelList={list}/>
        })
      }
    })

    if (componentItemModelList.length > 0) {
      craftSegment.children!.push({
        label: 'Component',
        id: 'Component',
        component: <ItemCraftComponentSegment />
      })
    }

    if (craftSegment.children?.length !== 0)
      contentSegments.push(craftSegment);
  }
  
  return (
    <Box sx={{ justifyContent: "left"}}>
      <Box sx={{ display: "flex", flexDirection: "column"}}>
        <ItemPageContext.Provider value={ itemPageModel }>
          <Typography variant="h5">{itemModel.name}</Typography>
          <Divider/>
          <Box sx={{ mt: 1 }}>
            <ItemPropertyCard />
            <Typography variant="body1">{itemModel.description}</Typography>

            {contentSegments.length > 0 && (
              <ContentTable segments={contentSegments} />
            )}

            {contentSegments.map((segment) => (
              <Segment key={segment.id} segment={segment}/>
            ))}

          </Box>
        </ItemPageContext.Provider>
      </Box>
    </Box>
  )
}