import { useGameContext } from '../context/gameContext';

import { Typography } from '@mui/material';

export default function GamePage() {

  const { game } = useGameContext();

	return (
		<Typography variant="h5">{game.name}</Typography>
	)
}