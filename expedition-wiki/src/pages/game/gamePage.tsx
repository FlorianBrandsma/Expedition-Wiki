import type { ContentSegment } from '../../components/contentTable/contentTable';

import { useGameContext } from '../../context/gameContext';

import Segment from '../../components/segment/segment';
import GameCategorySegment from './gameCategorySegment';
import { Box, Divider, Typography } from '@mui/material';

export default function GamePage() {

  const { gameModel } = useGameContext();

  const contentSegments: ContentSegment[] = [
  {
    label: 'Categories',
    id: 'Categories',
    component: <GameCategorySegment/>
  }];

	return (
    <>
      <Typography variant="h5">{gameModel.name}</Typography>
      <Divider/>
      <Box sx={{ mt: 1 }}>
        <Typography variant="body1">{gameModel.description}</Typography>

        {contentSegments.map((segment) => (
          <Segment key={segment.id} segment={segment}/>
        ))}

      </Box>
    </>
	)
}