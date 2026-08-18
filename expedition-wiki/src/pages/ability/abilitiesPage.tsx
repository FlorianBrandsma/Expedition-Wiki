import { useState, useEffect, useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import { useDebounce } from '../../hooks/useDebounce';

import { useGameContext } from '../../context/gameContext';

import { AbilityModel } from '../../data/models/abilityModel';
import { AbilityRequestType, AbilityParameters } from '../../data/parameters/abilityParameters';
import { getData } from '../../services/dataManager';

import { AbilityType, ChargeAbilityType, DischargeAbilityType } from '../../types/enums'

import { Box, Button, Divider, Stack, Typography } from '@mui/material';
import ExFilterSelection from '../../components/exFilterSelection/exFilterSelection';
import ExTextField from '../../components/exTextField/exTextField';
import ExIcon from '../../components/exIcon/exIcon';
import EnhancedTable, { type HeadCell } from '../../components/enhancedTable/enhancedTable';
import ExLink from '../../components/exLink/exLink';

export default function AbilitiesPage() {

  document.title = 'Abilities - Expedition Wiki';

  const { gameModel } = useGameContext();

  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const location = useLocation();

  const [name,                 setName]                 = useState<string>('');
  const [abilityType,          setAbilityType]          = useState<number[]>([]);
  const [chargeAbilityType,    setChargeAbilityType]    = useState<number[]>([]);
  const [dischargeAbilityType, setDischargeAbilityType] = useState<number[]>([]);

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

    const abilityTypeIndex          = AbilityType         .findIndex(type => type == routeParams.abilityType);
    const chargeAbilityTypeIndex    = ChargeAbilityType   .findIndex(type => type == routeParams.chargeAbilityType);
    const dischargeAbilityTypeIndex = DischargeAbilityType.findIndex(type => type == routeParams.dischargeAbilityType);

    setAbilityType         (abilityTypeIndex          >= 0 ? [abilityTypeIndex]          : [])
    setChargeAbilityType   (chargeAbilityTypeIndex    >= 0 ? [chargeAbilityTypeIndex]    : [])
    setDischargeAbilityType(dischargeAbilityTypeIndex >= 0 ? [dischargeAbilityTypeIndex] : [])

  }, [routeParams])

  const handleAbilityTypeChange = (abilityType: number[]) => {
    setAbilityType(abilityType);

    if (!abilityType.includes(AbilityType.indexOf('Charge'))) {
      setChargeAbilityType([]);
    }

    if (!abilityType.includes(AbilityType.indexOf('Discharge'))) {
      setDischargeAbilityType([]);
    }
  }

  const handleChargeAbilityTypeChange = (chargeAbilityType: number[]) => {
    setChargeAbilityType(chargeAbilityType);
  }

  const handleDischargeAbilityTypeChange = (dischargeAbilityType: number[]) => {
    setDischargeAbilityType(dischargeAbilityType);
  }

  /* Get abilities of the selected game */
	const parameters = new AbilityParameters({
    requestType: AbilityRequestType.GetFilterAbilities,
		gameId: [gameModel.id],
    abilityType: abilityType,
    chargeAbilityType: chargeAbilityType,
    dischargeAbilityType: dischargeAbilityType,
    name: name
	});

	const abilityQuery = useQuery<AbilityModel[]>({
		queryKey: ["parameters", parameters],
		queryFn: () => getData(parameters, AbilityModel),
		initialData: []
	});

  useEffect(() => {
    setName(debouncedName);
  }, [debouncedName])

  const abilityHeaders = useMemo<HeadCell<AbilityModel>[]>(() => [
    { 
      id: 'name', 
      label: 'Name', 
      align: 'left',
      render: (row) => (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
          <ExIcon resourceName={row.iconResourceName} size={20} />
          <ExLink pageName={'ability'} name={row.name} />
        </Box>
      )
    },
    {
      id: 'typeDescription',
      label: 'Type',
      align: 'left'
    },
    {
      id: 'armEquipmentItemTypeDescription',
      label: 'Arm',
      align: 'left'
    }
  ], [gameModel]);

	return (
		<Box sx={{ display: "flex", flexDirection: "column"}}>
			<Typography variant="h5">Abilities</Typography>
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
          types={AbilityType} 
          type={abilityType}
          setType={handleAbilityTypeChange} 
        />
        { abilityType.includes(AbilityType.indexOf('Charge')) && (
          <ExFilterSelection 
            label={"Charge Type"}
            types={ChargeAbilityType} 
            type={chargeAbilityType}
            setType={handleChargeAbilityTypeChange}
          />
        )}
        { abilityType.includes(AbilityType.indexOf('Discharge')) && (
          <ExFilterSelection 
            label={"Discharge Type"}
            types={DischargeAbilityType} 
            type={dischargeAbilityType}
            setType={handleDischargeAbilityTypeChange}
          />
        )}
      </Stack>
			{ abilityQuery.isLoading ? (
				<Typography variant="h5">Loading...</Typography>
			) : (
				<Stack spacing={1} direction="column" sx={{ width: '750px', maxWidth: '100%' }}>
          <EnhancedTable rowKey="id" rows={abilityQuery.data} headCells={abilityHeaders} enableOrder enablePagination />
					<Button 
						variant="contained" 
						onClick={() => abilityQuery.refetch()}
					>
						Reload
					</Button>
				</Stack>
			)}
		</Box>
	)
}