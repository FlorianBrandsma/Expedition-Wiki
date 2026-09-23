import { useState, useEffect, useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useDebounce } from '../../hooks/useDebounce';

import { useGameContext } from '../../context/gameContext';

import { QuestModel } from '../../data/models/questModel';
import { QuestRequestType, QuestParameters } from '../../data/parameters/questParameters';
import { getData } from '../../services/dataManager';

import { Box, Button, Divider, Stack, Typography } from '@mui/material';
import ExTextField from '../../components/exTextField/exTextField';
import EnhancedTable, { type HeadCell } from '../../components/enhancedTable/enhancedTable';
import ExLink from '../../components/exLink/exLink';

export default function QuestsPage() {

  document.title = 'Quests - Expedition Wiki';

  const { gameModel } = useGameContext();

  const [name, setName] = useState<string>('');

  const [nameInput, setNameInput] = useState<string>('');
  
  const debouncedName = useDebounce<string>(nameInput, 500);

  /* Get quests of the selected game */
	const parameters = new QuestParameters({
    requestType: QuestRequestType.GetFilterQuests,
		gameId: [gameModel.id],
    name: name
	});

	const questQuery = useQuery<QuestModel[]>({
		queryKey: ["parameters", parameters],
		queryFn: () => getData(parameters, QuestModel),
		initialData: []
	});

  useEffect(() => {
    setName(debouncedName);
  }, [debouncedName])

  const questHeaders = useMemo<HeadCell<QuestModel>[]>(() => [
    { 
      id: 'name', 
      label: 'Name', 
      align: 'left',
      render: (row) => (
        <ExLink name={row.name} params={['quest', row.name]} />
      )
    },
    {
      id: 'typeDescription',
      label: 'Type',
      align: 'left'
    },
    {
      id: 'expansionName',
      label: 'Expansion',
      align: 'left'
    }
  ], [gameModel]);

	return (
		<Box sx={{ display: "flex", flexDirection: "column"}}>
			<Typography variant="h5">Quests</Typography>
      <Divider/>
      <Stack sx={{ pt: 1, pb: 1, width: '750px', maxWidth: '100%' }} >
        <ExTextField
          label={"Name"}
          setValue={setNameInput}
        />
      </Stack>
			{ questQuery.isLoading ? (
				<Typography variant="h5">Loading...</Typography>
			) : (
				<Stack spacing={1} direction="column" sx={{ width: '750px', maxWidth: '100%' }}>
          <EnhancedTable rowKey="id" rows={questQuery.data} headCells={questHeaders} enableOrder enablePagination />
					<Button 
						variant="contained" 
						onClick={() => questQuery.refetch()}
					>
						Reload
					</Button>
				</Stack>
			)}
		</Box>
	)
}