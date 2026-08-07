import { useState, useEffect, useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useDebounce } from '../../hooks/useDebounce';

import { useGameContext } from '../../context/gameContext';

import { FactionModel } from '../../data/models/factionModel';
import { FactionRequestType, FactionParameters } from '../../data/parameters/factionParameters';
import { getData } from '../../services/dataManager';

import { Box, Button, Stack, Typography } from '@mui/material';

import ExTextField from '../../components/exTextField/exTextField';
import ExIcon from '../../components/exIcon/exIcon';
import EnhancedTable, { type HeadCell } from '../../components/enhancedTable/enhancedTable';

import ExLink from '../../components/exLink/exLink';

export default function FactionsPage() {

  const { gameModel } = useGameContext();

  const [name, setName] = useState<string>('');

  const [nameInput, setNameInput] = useState<string>('');
  
  const debouncedName = useDebounce<string>(nameInput, 500);

  /* Get factions of the selected game */
  const parameters = new FactionParameters({
    requestType: FactionRequestType.GetFilterFactions,
    gameId: [gameModel.id],
    name: name
  });

  const factionQuery = useQuery<FactionModel[]>({
    queryKey: ["parameters", parameters],
    queryFn: () => getData(parameters, FactionModel),
    initialData: []
  });

  useEffect(() => {
    setName(debouncedName);
  }, [debouncedName])

  const factionHeaders = useMemo<HeadCell<FactionModel>[]>(() => [
    { 
      id: 'name', 
      label: 'Name', 
      align: 'left',
      render: (row) => (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
          <ExIcon resourceName={row.iconResourceName} size={20} />
          <ExLink pageName={'faction'} name={row.name} />
        </Box>
      )
    }
  ], [gameModel]);

  return (
    <Box sx={{ display: "flex", flexDirection: "column"}}>
      <Typography variant="h5">Factions</Typography>
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
      { factionQuery.isLoading ? (
        <Typography variant="h5">Loading...</Typography>
      ) : (
        <Stack spacing={1} direction="column" sx={{ width: '750px', maxWidth: '100%' }}>
          <EnhancedTable rowKey="id" rows={factionQuery.data} headCells={factionHeaders} enableOrder enablePagination />
          <Button 
            variant="contained" 
            onClick={() => factionQuery.refetch()}
          >
            Reload
          </Button>
        </Stack>
      )}
    </Box>
  )
}