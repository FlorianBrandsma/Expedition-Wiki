import { useGameContext } from '../context/gameContext';

import { Typography } from '@mui/material';

export default function GamePage() {

  const { gameModel } = useGameContext();

	return (
    <>
		  <Typography variant="h5">{ gameModel.name }</Typography>
    </>
	)
}