import { useQuery } from '@tanstack/react-query';

import { useGameContext } from '../context/gameContext';

import type { Item } from '../data/types/types';
import { ItemParameters } from '../data/parameters/parameters';
import { getData } from '../services/dataManager';

import { Box, Button, Stack, Typography } from '@mui/material';
import ExTable from '../components/exTable/exTable';

export default function GamePage() {

	const { game } = useGameContext();

  /* Get items of the selected game */
	const parameters = new ItemParameters({
		gameId:[game.id]
	});

	const itemQuery = useQuery<Item[]>({
		queryKey: ["parameters", parameters],
		queryFn: () => getData<Item>(parameters),
		initialData: []
	});

	return (
		<Box sx={{ display: "flex", flexDirection: "column"}}>
			<Typography variant="h5">Items</Typography>
			{ itemQuery.isLoading ? (
				<Typography variant="h4">Loading...</Typography>
			) : (
				<Stack spacing={1} direction="column" sx={{ width: 750, maxWidth: '100%'}}>
					<ExTable data={itemQuery.data} columns={["Id", "Type", "Slot", "Source"]}/>
					<Button 
						variant="contained" 
						onClick={() => itemQuery.refetch()}
					>
						Reload
					</Button>
				</Stack>
			)}
		</Box>
	)
}