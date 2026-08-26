import { useState, useEffect, useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useDebounce } from '../../hooks/useDebounce';

import { useGameContext } from '../../context/gameContext';

import { TerrainModel } from '../../data/models/terrainModel';
import { TerrainRequestType, TerrainParameters } from '../../data/parameters/terrainParameters';
import { getData } from '../../services/dataManager';

import { Box, Button, Divider, Stack, Typography } from '@mui/material';
import ExTextField from '../../components/exTextField/exTextField';
import EnhancedTable, { type HeadCell } from '../../components/enhancedTable/enhancedTable';
import ExLink from '../../components/exLink/exLink';

export default function TerrainsPage() {

  document.title = 'Terrains - Expedition Wiki';

  const { gameModel } = useGameContext();

  const [name, setName] = useState<string>('');

  const [nameInput, setNameInput] = useState<string>('');
  
  const debouncedName = useDebounce<string>(nameInput, 500);

  /* Get terrains of the selected game */
	const parameters = new TerrainParameters({
    requestType: TerrainRequestType.GetFilterTerrains,
		gameId: [gameModel.id],
    name: name
	});

	const terrainQuery = useQuery<TerrainModel[]>({
		queryKey: ["parameters", parameters],
		queryFn: () => getData(parameters, TerrainModel),
		initialData: []
	});

  useEffect(() => {
    setName(debouncedName);
  }, [debouncedName])

  const terrainHeaders = useMemo<HeadCell<TerrainModel>[]>(() => [
    { 
      id: 'name', 
      label: 'Name', 
      align: 'left',
      render: (row) => (
        <ExLink pageName={'terrain'} name={row.name} params={[row.regionName, row.name]} />
      )
    },
    {
      id: 'regionName',
      label: 'Region',
      align: 'left'
    }
  ], [gameModel]);

	return (
		<Box sx={{ display: "flex", flexDirection: "column"}}>
			<Typography variant="h5">Terrains</Typography>
      <Divider/>
      <Stack sx={{ pt: 1, pb: 1, width: '750px', maxWidth: '100%' }} >
        <ExTextField
          label={"Name"}
          setValue={setNameInput}
        />
      </Stack>
			{ terrainQuery.isLoading ? (
				<Typography variant="h5">Loading...</Typography>
			) : (
				<Stack spacing={1} direction="column" sx={{ width: '750px', maxWidth: '100%' }}>
          <EnhancedTable rowKey="id" rows={terrainQuery.data} headCells={terrainHeaders} enableOrder enablePagination />
					<Button 
						variant="contained" 
						onClick={() => terrainQuery.refetch()}
					>
						Reload
					</Button>
				</Stack>
			)}
		</Box>
	)
}