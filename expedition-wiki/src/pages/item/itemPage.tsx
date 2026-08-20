import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';

import { useGameContext } from '../../context/gameContext';
import { ItemPageContext } from './itemPageContext';

import { ItemPageModel } from '../../data/models/pages/itemPageModel';
import { ItemPageParameters } from '../../data/parameters/pages/itemPageParameters';
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
import ItemUtilityComponentSegment from './segments/itemUtilityComponentSegment';
import ItemEquipmentEquippedSegment from './segments/itemEquipmentEquippedSegment';
import ItemUtilityRestSegment from './segments/itemUtilityRestSegment';
import ItemUtilityTradeSegment from './segments/itemUtilityTradeSegment';
import ItemUtilityBuySegment from './segments/itemUtilityBuySegment';
import ItemUtilityCraftSegment from './segments/itemUtilityCraftSegment';
import ItemUtilityRelinquishSegment from './segments/itemUtilityRelinquishSegment';
import ItemSourceLootSegment from './segments/itemSourceLootSegment';
import ItemSourceMailSegment from './segments/itemSourceMailSegment';
import ItemSourceStealSegment from './segments/itemSourceStealSegment';
import ItemSourceClaimSegment from './segments/itemSourceClaimSegment';
import ItemSourceTradeSegment from './segments/itemSourceTradeSegment';
import ItemSourceBuySegment from './segments/itemSourceBuySegment';
import ItemSourceCraftSegment from './segments/itemSourceCraftSegment';
import ItemSourceDistributeSegment from './segments/itemSourceDistributeSegment';
import ItemSourceScrapSegment from './segments/itemSourceScrapSegment';
import ItemUtilitySellSegment from './segments/itemUtilitySellSegment';
import ItemSourceSellSegment from './segments/itemSourceSellSegment';

export default function ItemPage() {

  const params = useParams<{ name: string }>();
  
  const itemName = params.name?.replaceAll('_', ' ');
  document.title = `${itemName} - Expedition Wiki`;

  const { gameModel } = useGameContext();

  const contentSegments: ContentSegment[] = [];

  const parameters = new ItemPageParameters({
    gameId:[gameModel.id],
    name: itemName
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
    characterAgentInteractableModelList,
    itemComponentModelList, 
    createComponentItemModelList,
    scrapComponentItemModelList,
    restEventModelList,
    shopItemEventModelList,
    tradeItemEventItemModelList,
    shopItemEventItemModelList,
    craftItemEventItemModelList,
    relinquishItemEventItemModelList,
    agentInteractableLootTableModelList,
    mailEventModelList,
    sourceStealItemEventItemModelList,
    sourceClaimItemEventItemModelList,
    sourceTradeItemEventItemModelList,
    sourceShopItemEventItemModelList,
    sourceCraftItemEventItemModelList,
    sourceDistributeItemEventItemModelList,
    itemModelList
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

    if (characterAgentInteractableModelList.length > 0) {
      equipmentSegment.children!.push({
        label: 'Equipped',
        id: 'Equipped',
        component: <ItemEquipmentEquippedSegment />
      });
    }

    if (equipmentSegment.children?.length !== 0)
      contentSegments.push(equipmentSegment);
  }

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

  if (craftSegment.children?.length !== 0)
    contentSegments.push(craftSegment);
  
  const utilitySegment = {
    label: 'Utility',
    id: 'Utility',
    children: []
  } as ContentSegment;

  if (createComponentItemModelList.length > 0) {
    utilitySegment.children!.push({
      label: 'Component',
      id: 'Component',
      component: <ItemUtilityComponentSegment />
    })
  }

  if (restEventModelList.length > 0) {
    utilitySegment.children!.push({
      label: 'Rest',
      id: 'Rest',
      component: <ItemUtilityRestSegment />
    })
  }

  if (shopItemEventItemModelList.length > 0) {
    utilitySegment.children!.push({
      label: 'Buy',
      id: 'Buy',
      component: <ItemUtilityBuySegment />
    })
  }

  if (shopItemEventModelList.length > 0) {
    utilitySegment.children!.push({
      label: 'Sell',
      id: 'Sell',
      component: <ItemUtilitySellSegment />
    })
  }

  if (tradeItemEventItemModelList.length > 0) {
    utilitySegment.children!.push({
      label: 'Trade',
      id: 'Trade',
      component: <ItemUtilityTradeSegment />
    })
  }

  if (craftItemEventItemModelList.length > 0) {
    utilitySegment.children!.push({
      label: 'Craft',
      id: 'Craft',
      component: <ItemUtilityCraftSegment />
    })
  }

  if (relinquishItemEventItemModelList.length > 0) {
    utilitySegment.children!.push({
      label: 'Relinquish',
      id: 'Relinquish',
      component: <ItemUtilityRelinquishSegment />
    })
  }

  if (utilitySegment.children?.length !== 0)
    contentSegments.push(utilitySegment);

  const sourceSegment = {
    label: 'Source',
    id: 'Source',
    children: []
  } as ContentSegment;

  if (scrapComponentItemModelList.length > 0) {
    sourceSegment.children!.push({
      label: 'Scrap',
      id: 'Scrap',
      component: <ItemSourceScrapSegment />
    })
  }

  if (agentInteractableLootTableModelList.length > 0) {
    sourceSegment.children!.push({
      label: 'Loot',
      id: 'Loot',
      component: <ItemSourceLootSegment />
    })
  }

  if (mailEventModelList.length > 0) {
    sourceSegment.children!.push({
      label: 'Mail',
      id: 'Mail',
      component: <ItemSourceMailSegment />
    })
  }

  if (sourceStealItemEventItemModelList.length > 0) {
    sourceSegment.children!.push({
      label: 'Steal',
      id: 'Steal',
      component: <ItemSourceStealSegment />
    })
  }

  if (sourceClaimItemEventItemModelList.length > 0) {
    sourceSegment.children!.push({
      label: 'Claim',
      id: 'Claim',
      component: <ItemSourceClaimSegment />
    })
  }

  if (sourceTradeItemEventItemModelList.length > 0) {
    sourceSegment.children!.push({
      label: 'Trade',
      id: 'Trade',
      component: <ItemSourceTradeSegment />
    })
  }

  if (sourceShopItemEventItemModelList.length > 0) {
    sourceSegment.children!.push({
      label: 'Buy',
      id: 'Buy',
      component: <ItemSourceBuySegment />
    })
  }

  if (itemModelList.length > 0) {
    sourceSegment.children!.push({
      label: 'Sell',
      id: 'Sell',
      component: <ItemSourceSellSegment />
    })
  }

  if (sourceCraftItemEventItemModelList.length > 0) {
    sourceSegment.children!.push({
      label: 'Craft',
      id: 'Craft',
      component: <ItemSourceCraftSegment />
    })
  }

  if (sourceDistributeItemEventItemModelList.length > 0) {
    sourceSegment.children!.push({
      label: 'Distribute',
      id: 'Distribute',
      component: <ItemSourceDistributeSegment />
    })
  }

  if (sourceSegment.children?.length !== 0)
    contentSegments.push(sourceSegment);

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