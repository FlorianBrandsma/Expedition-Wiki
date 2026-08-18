import { useState, useEffect, useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import { useDebounce } from '../../hooks/useDebounce';

import { useGameContext } from '../../context/gameContext';

import { InteractableModel } from '../../data/models/interactableModel';
import { InteractableRequestType, InteractableParameters } from '../../data/parameters/interactableParameters';
import { getData } from '../../services/dataManager';

import { InteractableType, AgentInteractableType, CharacterAgentInteractableType, ElementType } from '../../types/enums'

import { Box, Button, Divider, Stack, Typography } from '@mui/material';
import ExFilterSelection from '../../components/exFilterSelection/exFilterSelection';
import ExTextField from '../../components/exTextField/exTextField';
import ExIcon from '../../components/exIcon/exIcon';
import EnhancedTable, { type HeadCell } from '../../components/enhancedTable/enhancedTable';
import ExIconLabel from '../../components/exIconLabel/exIconLabel';
import ExLink from '../../components/exLink/exLink';

export default function InteractablesPage() {

  document.title = 'Interactables - Expedition Wiki';

  const { gameModel } = useGameContext();

  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const location = useLocation();

  const [name,              setName]              = useState<string>('');
  const [interactableType,          setInteractableType]          = useState<number[]>([]);
  const [agentInteractableType,    setAgentInteractableType]    = useState<number[]>([]);
  const [characterAgentInteractableType, setCharacterAgentInteractableType] = useState<number[]>([]);

  const [nameInput, setNameInput] = useState<string>('');
  
  const debouncedName = useDebounce<string>(nameInput, 500);

  /* Save parameters from URL */
  const [routeParams, setRouteParams] = useState(() => 
    Object.fromEntries(searchParams)
  );

  useEffect(() => {
    /* Reset parameters when the page has been opened */
    if (searchParams.size > 0) {
      setRouteParams(Object.fromEntries(searchParams));

      /* Remove parameters from URL */
      const cleanPath = location.mask?.pathname ?? location.pathname;
      navigate(cleanPath, { replace: true, mask: cleanPath });
    }
  }, [searchParams, navigate, location.pathname]);

  /* Set default filters */
  useEffect(() => {

    const interactableTypeIndex               = InteractableType              .findIndex(type => type == routeParams.interactableType);
    const agentInteractableTypeIndex          = AgentInteractableType         .findIndex(type => type == routeParams.agentInteractableType);
    const characterAgentInteractableTypeIndex = CharacterAgentInteractableType.findIndex(type => type == routeParams.characterAgentInteractableType);

    setInteractableType              (interactableTypeIndex               >= 0 ? [interactableTypeIndex]               : [])
    setAgentInteractableType         (agentInteractableTypeIndex          >= 0 ? [agentInteractableTypeIndex]          : [])
    setCharacterAgentInteractableType(characterAgentInteractableTypeIndex >= 0 ? [characterAgentInteractableTypeIndex] : [])

  }, [routeParams])

  const handleInteractableTypeChange = (interactableType: number[]) => {
    setInteractableType(interactableType);

    if (!interactableType.includes(InteractableType.indexOf('Agent'))) {
      setAgentInteractableType([]);
      setCharacterAgentInteractableType([]);
    }
  }

  const handleAgentInteractableTypeChange = (agentInteractableType: number[]) => {
    setAgentInteractableType(agentInteractableType);

    if (!agentInteractableType.includes(AgentInteractableType.indexOf('Character'))) {
      setCharacterAgentInteractableType([]);
    }
  }

  const handleCharacterAgentInteractableTypeChange = (characterAgentInteractableType: number[]) => {
    setCharacterAgentInteractableType(characterAgentInteractableType);
  }

  /* Get interactables of the selected game */
  const parameters = new InteractableParameters({
    requestType: InteractableRequestType.GetFilterInteractables,
    gameId: [gameModel.id],
    interactableType: interactableType,
    agentInteractableType: agentInteractableType,
    characterAgentInteractableType: characterAgentInteractableType,
    name: name
  });

  const interactableQuery = useQuery<InteractableModel[]>({
    queryKey: ["parameters", parameters],
    queryFn: () => getData(parameters, InteractableModel),
    initialData: []
  });

  useEffect(() => {
    setName(debouncedName);
  }, [debouncedName])

  const interactableHeaders = useMemo<HeadCell<InteractableModel>[]>(() => [
    { 
      id: 'name', 
      label: 'Name', 
      align: 'left',
      render: (row) => (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
          <ExIcon resourceName={row.assetIconResourceName} size={20} />
          <ExLink pageName={'interactable'} name={row.name} />
        </Box>
      )
    },
    {
      id: 'typeDescription',
      label: 'Type',
      align: 'left'
    },
    {
      id: 'elementType',
      label: 'Element',
      align: 'left',
      render: (row) => (
        row.agentInteractableModel && (
          <ExIconLabel 
            label={ElementType[row.elementType]}
            url={`/images/icons/elements/${ElementType[row.elementType]}.png`}
            size={20}
            alignment='flex-start'
          />
        )
      )
    },
    {
      id: 'className',
      label: 'Class',
      align: 'left',
      render: (row) => (
        <ExLink pageName={'class'} name={row.className} />
      )
    },
    {
      id: 'playableDescription',
      label: 'Playable',
      align: 'center'
    }
  ], [gameModel]);

  return (
    <Box sx={{ display: "flex", flexDirection: "column"}}>
      <Typography variant="h5">Interactables</Typography>
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
        <ExFilterSelection 
          label={"Type"}
          types={InteractableType} 
          type={interactableType}
          setType={handleInteractableTypeChange} 
        />
        { interactableType.includes(InteractableType.indexOf('Agent')) && (
          <ExFilterSelection 
            label={"Agent Type"}
            types={AgentInteractableType} 
            type={agentInteractableType}
            setType={handleAgentInteractableTypeChange}
          />
        )}
        { agentInteractableType.includes(AgentInteractableType.indexOf('Character')) && (
          <ExFilterSelection 
            label={"Character Type"}
            types={CharacterAgentInteractableType} 
            type={characterAgentInteractableType}
            setType={handleCharacterAgentInteractableTypeChange}
          />
        )}
      </Stack>
      { interactableQuery.isLoading ? (
        <Typography variant="h5">Loading...</Typography>
      ) : (
        <Stack spacing={1} direction="column" sx={{ width: '750px', maxWidth: '100%' }}>
          <EnhancedTable rowKey="id" rows={interactableQuery.data} headCells={interactableHeaders} enableOrder enablePagination />
          <Button 
            variant="contained" 
            onClick={() => interactableQuery.refetch()}
          >
            Reload
          </Button>
        </Stack>
      )}
    </Box>
  )
}