import type { ContentSegment } from '../../components/contentTable/contentTable';

import { useGameContext } from '../../context/gameContext';

import { Box, Typography } from '@mui/material';

import PageHeader from '../general/components/pageHeader';
import Segment from '../../components/segment/segment';

import GameCategorySegment from './gameCategorySegment';

export default function GamePage() {

  const { gameModel } = useGameContext();

  document.title = `${gameModel.name} - Expedition Wiki`;

  const contentSegments: ContentSegment[] = [
  {
    label: 'Categories',
    id: 'Categories',
    component: <GameCategorySegment/>
  }];

	return (
    <>
      <PageHeader primaryName={gameModel.name} />
      <Box sx={{ mt: 1 }}>
        <Typography variant="body1">{gameModel.description}</Typography>

        {contentSegments.map((segment) => (
          <Segment key={segment.id} segment={segment}/>
        ))}

      </Box>
    </>
	)
}