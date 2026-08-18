import { useState, useEffect, useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useDebounce } from '../../hooks/useDebounce';

import { useGameContext } from '../../context/gameContext';

import { EquipmentSetModel } from '../../data/models/equipmentSetModel';
import { EquipmentSetRequestType, EquipmentSetParameters } from '../../data/parameters/equipmentSetParameters';
import { getData } from '../../services/dataManager';

import { Box, Button, Divider, Stack, Typography } from '@mui/material';

import ExTextField from '../../components/exTextField/exTextField';
import ExIcon from '../../components/exIcon/exIcon';
import EnhancedTable, { type HeadCell } from '../../components/enhancedTable/enhancedTable';

import ExLink from '../../components/exLink/exLink';

export default function EquipmentSetsPage() {

  document.title = 'Sets - Expedition Wiki';

  const { gameModel } = useGameContext();

  const [name, setName] = useState<string>('');

  const [nameInput, setNameInput] = useState<string>('');
  
  const debouncedName = useDebounce<string>(nameInput, 500);

  /* Get equipmentsets of the selected game */
	const parameters = new EquipmentSetParameters({
    requestType: EquipmentSetRequestType.GetFilterEquipmentSets,
		gameId: [gameModel.id],
    includeItems: true,
    name: name
	});

	const equipmentsetQuery = useQuery<EquipmentSetModel[]>({
		queryKey: ["parameters", parameters],
		queryFn: () => getData(parameters, EquipmentSetModel),
		initialData: []
	});

  useEffect(() => {
    setName(debouncedName);
  }, [debouncedName])

  const equipmentsetHeaders = useMemo<HeadCell<EquipmentSetModel>[]>(() => [
    { 
      id: 'name', 
      label: 'Name', 
      align: 'left',
      render: (row) => (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
          <ExIcon resourceName={row.iconResourceName} size={20} />
          <ExLink pageName={'set'} name={row.name} />
        </Box>
      )
    }
  ], [gameModel]);

	return (
		<Box sx={{ display: "flex", flexDirection: "column"}}>
			<Typography variant="h5">Sets</Typography>
      <Divider/>
      <Stack 
        spacing={2} 
        direction="column" 
        sx={{ pt: 1, pb: 1, width: '750px', maxWidth: '100%' }}
      >
        <ExTextField
          label={"Name"}
          setValue={setNameInput}
        />
        
      </Stack>
			{ equipmentsetQuery.isLoading ? (
				<Typography variant="h5">Loading...</Typography>
			) : (
				<Stack spacing={1} direction="column" sx={{ width: '750px', maxWidth: '100%' }}>
          <EnhancedTable rowKey="id" rows={equipmentsetQuery.data} headCells={equipmentsetHeaders} enableOrder enablePagination />
					<Button 
						variant="contained" 
						onClick={() => equipmentsetQuery.refetch()}
					>
						Reload
					</Button>
				</Stack>
			)}
		</Box>
	)
}