import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';

import { useGameContext } from '../../context/gameContext';
import { ClassPageContext } from './classPageContext';

import { ClassPageModel } from '../../data/models/pages/classPageModel';
import { ClassPageParameters } from '../../data/parameters/pages/classPageParameters';
import { getData } from '../../services/dataManager';

import type { Category } from '../../services/categoryManager';

import { ArmEquipmentItemType, GearEquipmentItemMaterialType } from '../../types/enums';

import type { ContentSegment } from '../../components/contentTable/contentTable';
import ContentTable from '../../components/contentTable/contentTable';
import Segment from '../../components/segment/segment';
import { Divider, Box, Typography } from '@mui/material';
import ClassAbilitySegment from './segments.tsx/classAbilitySegment';
import ClassNoteSegment from './segments.tsx/classNoteSegment';
import ClassEquipmentSegment from './segments.tsx/classEquipmentSegment';

export default function ClassPage() {

  const params = useParams<{ name: string }>();
  
  const className = params.name?.replaceAll('_', ' ');
  document.title = `${className} - Expedition Wiki`;

  const { gameModel } = useGameContext();

  const contentSegments: ContentSegment[] = [];
  
  const parameters = new ClassPageParameters({
    gameId:[gameModel.id],
    name: className
  });

  const classPageQuery = useQuery<ClassPageModel[]>({
    queryKey: ["parameters", parameters],
    queryFn: () => getData<ClassPageModel>(parameters, ClassPageModel),
    initialData: []
  });

  if (classPageQuery.data?.length === 0) return;

  const classPageModel = classPageQuery.data[0];

  const { 
    classModel,
    armEquipmentItemTypeList,
    gearEquipmentItemMaterialTypeList,
    dischargeAbilityModelList,
    noteModelList
  } = classPageModel;

  const equipmentSegment = {
    label: 'Equipment',
    id: 'Equipment',
    children: []
  } as ContentSegment;

  if (armEquipmentItemTypeList.length > 0) {

    const category: Category = {
      label: 'Type',
      page: 'item',
      state: {
        itemType: 'Equipment',
        equipmentItemType: 'Arm',
      }
    };

    const typeList = armEquipmentItemTypeList.map(type => ArmEquipmentItemType[type]);
  
    equipmentSegment.children!.push({
      label: 'Arms',
      id: 'Arms',
      component: 
        <ClassEquipmentSegment 
          category={category}
          typeList={typeList} 
          enumKey='armEquipmentItemType'
        />
    });
  }

  if (gearEquipmentItemMaterialTypeList.length > 0) {

    const category: Category = {
      label: 'Material',
      page: 'item',
      state: {
        itemType: 'Equipment',
        equipmentItemType: 'Gear',
      }
    };

    const typeList = gearEquipmentItemMaterialTypeList.map(type => GearEquipmentItemMaterialType[type]);

    equipmentSegment.children!.push({
      label: 'Gear',
      id: 'Gear',
      component: 
        <ClassEquipmentSegment 
          category={category}
          typeList={typeList} 
          enumKey='gearEquipmentItemMaterialType'
        />
    });
  }

  if (equipmentSegment.children?.length !== 0)
    contentSegments.push(equipmentSegment);

  if (dischargeAbilityModelList.length > 0) {
    contentSegments.push({
      label: 'Abilities',
      id: 'Abilities',
      component: <ClassAbilitySegment />
    })
  }

  if (noteModelList.length > 0) {
    contentSegments.push({
      label: 'Notes',
      id: 'Notes',
      component: <ClassNoteSegment />
    })
  }

  return (
    <Box sx={{ justifyContent: "left"}}>
      <Box sx={{ display: "flex", flexDirection: "column"}}>
        <ClassPageContext.Provider value={ classPageModel }>
          <Typography variant="h5">{classModel.name}</Typography>
          <Divider/>
          <Box>

            {contentSegments.length > 0 && (
              <ContentTable segments={contentSegments} />
            )}

            {contentSegments.map((segment) => (
              <Segment key={segment.id} segment={segment}/>
            ))}

          </Box>
        </ClassPageContext.Provider>
      </Box>
    </Box>
  )
}