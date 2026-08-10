import { useState, useEffect, useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import { useDebounce } from '../../hooks/useDebounce';

import { useGameContext } from '../../context/gameContext';

import { EffectModel } from '../../data/models/effectModel';
import { EffectRequestType, EffectParameters } from '../../data/parameters/effectParameters';
import { getData } from '../../services/dataManager';

import { EffectType, ResourceEffectType, StatusEffectType } from '../../types/enums'

import { Box, Button, Divider, Stack, Typography } from '@mui/material';
import ExFilterSelection from '../../components/exFilterSelection/exFilterSelection';
import ExTextField from '../../components/exTextField/exTextField';
import ExIcon from '../../components/exIcon/exIcon';
import EnhancedTable, { type HeadCell } from '../../components/enhancedTable/enhancedTable';
import ExLink from '../../components/exLink/exLink';

export default function EffectsPage() {

  const { gameModel } = useGameContext();

  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const location = useLocation();

  const [name,               setName]               = useState<string>('');
  const [effectType,         setEffectType]         = useState<number[]>([]);
  const [resourceEffectType, setResourceEffectType] = useState<number[]>([]);
  const [statusEffectType,   setStatusEffectType]   = useState<number[]>([]);

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

    const effectTypeIndex         = EffectType        .findIndex(type => type == routeParams.effectType);
    const resourceEffectTypeIndex = ResourceEffectType.findIndex(type => type == routeParams.resourceEffectType);
    const statusEffectTypeIndex   = StatusEffectType  .findIndex(type => type == routeParams.statusEffectType);

    setEffectType         (effectTypeIndex          >= 0 ? [effectTypeIndex]          : [])
    setResourceEffectType   (resourceEffectTypeIndex    >= 0 ? [resourceEffectTypeIndex]    : [])
    setStatusEffectType(statusEffectTypeIndex >= 0 ? [statusEffectTypeIndex] : [])

  }, [routeParams])

  const handleEffectTypeChange = (effectType: number[]) => {
    setEffectType(effectType);

    if (!effectType.includes(EffectType.indexOf('Resource'))) {
      setResourceEffectType([]);
    }

    if (!effectType.includes(EffectType.indexOf('Status'))) {
      setStatusEffectType([]);
    }
  }

  const handleResourceEffectTypeChange = (resourceEffectType: number[]) => {
    setResourceEffectType(resourceEffectType);
  }

  const handleStatusEffectTypeChange = (statusEffectType: number[]) => {
    setStatusEffectType(statusEffectType);
  }

  /* Get effects of the selected game */
	const parameters = new EffectParameters({
    requestType: EffectRequestType.GetFilterEffects,
		gameId: [gameModel.id],
    effectType: effectType,
    resourceEffectType: resourceEffectType,
    statusEffectType: statusEffectType,
    name: name
	});

	const effectQuery = useQuery<EffectModel[]>({
		queryKey: ["parameters", parameters],
		queryFn: () => getData(parameters, EffectModel),
		initialData: []
	});

  useEffect(() => {
    setName(debouncedName);
  }, [debouncedName])

  const effectHeaders = useMemo<HeadCell<EffectModel>[]>(() => [
    { 
      id: 'name', 
      label: 'Name', 
      align: 'left',
      render: (row) => (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
          <ExIcon resourceName={row.iconResourceName} size={20} />
          <ExLink pageName={'effect'} name={row.name} />
        </Box>
      )
    },
    {
      id: 'typeDescription',
      label: 'Type',
      align: 'left'
    }
  ], [gameModel]);

	return (
		<Box sx={{ display: "flex", flexDirection: "column"}}>
			<Typography variant="h5">Effects</Typography>
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
          types={EffectType} 
          type={effectType}
          setType={handleEffectTypeChange} 
        />
        { effectType.includes(EffectType.indexOf('Resource')) && (
          <ExFilterSelection 
            label={"Resource Type"}
            types={ResourceEffectType} 
            type={resourceEffectType}
            setType={handleResourceEffectTypeChange}
          />
        )}
        { effectType.includes(EffectType.indexOf('Status')) && (
          <ExFilterSelection 
            label={"Status Type"}
            types={StatusEffectType} 
            type={statusEffectType}
            setType={handleStatusEffectTypeChange}
          />
        )}
      </Stack>
			{ effectQuery.isLoading ? (
				<Typography variant="h5">Loading...</Typography>
			) : (
				<Stack spacing={1} direction="column" sx={{ width: '750px', maxWidth: '100%' }}>
          <EnhancedTable rowKey="id" rows={effectQuery.data} headCells={effectHeaders} enableOrder enablePagination />
					<Button 
						variant="contained" 
						onClick={() => effectQuery.refetch()}
					>
						Reload
					</Button>
				</Stack>
			)}
		</Box>
	)
}