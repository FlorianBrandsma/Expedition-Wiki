import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';

import { useGameContext } from '../../context/gameContext';
import { ItemContext } from './itemContext';

import { ItemModel } from '../../data/models/itemModel';
import { ItemParameters } from '../../data/parameters/itemParameters';
import { getData } from '../../services/dataManager';

import { Divider, Box, Typography } from '@mui/material';

import ItemPropertyCard from './itemPropertyCard';
import ItemEquipmentClassSegment from './segments/itemEquipmentClassSegment';

import type { ContentSegment } from '../../components/contentTable/contentTable';
import ContentTable from '../../components/contentTable/contentTable';
import Segment from '../../components/segment/segment';

export default function ItemPage() {

  const params = useParams<{ name: string }>();
  
  const { gameModel } = useGameContext();

  const contentSegments: ContentSegment[] = [];

  const parameters = new ItemParameters({
    includeDependencies: true,
    gameId:[gameModel.id],
    name: params.name?.replaceAll('_', ' ')
  });

  const itemQuery = useQuery<ItemModel[]>({
    queryKey: ["parameters", parameters],
    queryFn: () => getData<ItemModel>(parameters, ItemModel),
    initialData: []
  });

  const itemModel = itemQuery.data[0];

  if (itemModel?.equipmentItemModel) {
    contentSegments.push(
      {
        label: 'Equipment',
        id: 'Equipment',
        children: [
          {
            label: 'Classes',
            id: 'Classes',
            component: <ItemEquipmentClassSegment/>
          }
        ]
      }
    );
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
              <Segment segment={segment}/>     
            ))}

          </Box>
        </ItemContext.Provider>
      )}
      </Box>
    </Box>
  )
}