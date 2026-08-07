import { useState, useEffect, useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useDebounce } from '../../hooks/useDebounce';

import { useGameContext } from '../../context/gameContext';

import { ClassModel } from '../../data/models/classModel';
import { ClassRequestType, ClassParameters } from '../../data/parameters/classParameters';
import { getData } from '../../services/dataManager';

import { Box, Button, Stack, Typography } from '@mui/material';

import ExTextField from '../../components/exTextField/exTextField';
import EnhancedTable, { type HeadCell } from '../../components/enhancedTable/enhancedTable';

import ExLink from '../../components/exLink/exLink';

export default function ClassesPage() {

  const { gameModel } = useGameContext();

  const [name, setName] = useState<string>('');

  const [nameInput, setNameInput] = useState<string>('');
  
  const debouncedName = useDebounce<string>(nameInput, 500);

  /* Get classs of the selected game */
  const parameters = new ClassParameters({
    requestType: ClassRequestType.GetFilterClasses,
    gameId: [gameModel.id],
    name: name
  });

  const classQuery = useQuery<ClassModel[]>({
    queryKey: ["parameters", parameters],
    queryFn: () => getData(parameters, ClassModel),
    initialData: []
  });

  useEffect(() => {
    setName(debouncedName);
  }, [debouncedName])

  const classHeaders = useMemo<HeadCell<ClassModel>[]>(() => [
    { 
      id: 'name', 
      label: 'Name', 
      align: 'left',
      render: (row) => (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
          <ExLink pageName={'class'} name={row.name} />
        </Box>
      )
    }
  ], [gameModel]);

  return (
    <Box sx={{ display: "flex", flexDirection: "column"}}>
      <Typography variant="h5">Classes</Typography>
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
      { classQuery.isLoading ? (
        <Typography variant="h5">Loading...</Typography>
      ) : (
        <Stack spacing={1} direction="column" sx={{ width: '750px', maxWidth: '100%' }}>
          <EnhancedTable rowKey="id" rows={classQuery.data} headCells={classHeaders} enableOrder enablePagination />
          <Button 
            variant="contained" 
            onClick={() => classQuery.refetch()}
          >
            Reload
          </Button>
        </Stack>
      )}
    </Box>
  )
}