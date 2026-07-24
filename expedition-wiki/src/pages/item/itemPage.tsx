import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';

import { useGameContext } from '../../context/gameContext';
import { ItemContext } from './itemContext';

import { ItemModel } from '../../data/models/itemModel';
import { ItemParameters } from '../../data/parameters/itemParameters';
import { getData } from '../../services/dataManager';

import { Divider, Box, Typography } from '@mui/material';

import ItemPropertyCard from './itemPropertyCard';
import ItemClassSegment from './segments/itemClassSegment';

import type { ContentSegment } from '../../components/contentTable/contentTable';
import ContentTable from '../../components/contentTable/contentTable';
import Segment from '../../components/segment/segment';

export default function ItemPage() {

  const params = useParams<{ name: string }>();
  
  const { gameModel } = useGameContext();

  const contentSegments: ContentSegment[] = [];

  const parameters = new ItemParameters({
    includeDependencies: true,
    includeClasses: true,
    gameId:[gameModel.id],
    name: params.name?.replaceAll('_', ' ')
  });

  const itemQuery = useQuery<ItemModel[]>({
    queryKey: ["parameters", parameters],
    queryFn: () => getData<ItemModel>(parameters, ItemModel),
    initialData: []
  });

  const itemModel = itemQuery.data[0];

  const classSegment = {
    label: 'Classes',
    id: 'Classes',
    component: <ItemClassSegment/>
  }

  if (itemModel?.supplyItemModel) {

    const supplySegment = {
      label: 'Supply',
      id: 'Supply',
      children: []
    } as ContentSegment;

    if (itemModel.classModelList.length > 0) {
      supplySegment.children!.push(classSegment);
    }

    if (supplySegment.children?.length !== 0)
      contentSegments.push(supplySegment);
  }

  if (itemModel?.equipmentItemModel) {

    const equipmentSegment = {
      label: 'Equipment',
      id: 'Equipment',
      children: []
    } as ContentSegment;

    if (itemModel.classModelList.length > 0) {
      equipmentSegment.children!.push(classSegment);
    }

    if (equipmentSegment.children?.length !== 0)
      contentSegments.push(equipmentSegment);
  }

  return (
    <Box sx={{ justifyContent: "left"}}>
      <Box sx={{ display: "flex", flexDirection: "column"}}>
      { !itemModel ? (
        <Typography variant="h5">Loading...</Typography>
      ) : (
        <ItemContext.Provider value={ itemModel }>
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
        </ItemContext.Provider>
      )}
      </Box>
    </Box>
  )
}