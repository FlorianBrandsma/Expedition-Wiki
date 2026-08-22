import { useState, useEffect, useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import { useDebounce } from '../../hooks/useDebounce';

import { useGameContext } from '../../context/gameContext';

import { ItemModel } from '../../data/models/itemModel';
import { ItemRequestType, ItemParameters } from '../../data/parameters/itemParameters';
import { getData } from '../../services/dataManager';

import { ItemType, SupplyItemType, EquipmentItemType, ElementType, ArmEquipmentItemType, GearEquipmentItemMaterialType, TrinketEquipmentItemType } from '../../types/enums'

import { Box, Button, Divider, Stack, Typography } from '@mui/material';
import ExFilterSelection from '../../components/exFilterSelection/exFilterSelection';
import ExTextField from '../../components/exTextField/exTextField';
import ExIcon from '../../components/exIcon/exIcon';
import EnhancedTable, { type HeadCell } from '../../components/enhancedTable/enhancedTable';
import ExIconLabel from '../../components/exIconLabel/exIconLabel';
import ExLink from '../../components/exLink/exLink';

export default function ItemsPage() {

  document.title = 'Items - Expedition Wiki';

  const { gameModel } = useGameContext();

  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const location = useLocation();

  const [name,                          setName]                          = useState<string>('');
  const [itemType,                      setItemType]                      = useState<number[]>([]);
  const [supplyItemType,                setSupplyItemType]                = useState<number[]>([]);
  const [equipmentItemType,             setEquipmentItemType]             = useState<number[]>([]);
  const [armEquipmentItemType,          setArmEquipmentItemType]          = useState<number[]>([]);
  const [gearEquipmentItemMaterialType, setGearEquipmentItemMaterialType] = useState<number[]>([]);
  const [trinketEquipmentItemType,      setTrinketEquipmentItemType]      = useState<number[]>([]);

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

    const itemTypeIndex          = ItemType         .findIndex(type => type == routeParams.itemType);
    const supplyItemTypeIndex    = SupplyItemType   .findIndex(type => type == routeParams.supplyItemType);
    const equipmentItemTypeIndex = EquipmentItemType.findIndex(type => type == routeParams.equipmentItemType);

    setItemType         (itemTypeIndex          >= 0 ? [itemTypeIndex]          : [])
    setSupplyItemType   (supplyItemTypeIndex    >= 0 ? [supplyItemTypeIndex]    : [])
    setEquipmentItemType(equipmentItemTypeIndex >= 0 ? [equipmentItemTypeIndex] : [])

  }, [routeParams])

  const handleItemTypeChange = (itemType: number[]) => {
    setItemType(itemType);

    if (!itemType.includes(ItemType.indexOf('Supply'))) {
      handleSupplyItemTypeChange([]);
    }

    if (!itemType.includes(ItemType.indexOf('Equipment'))) {
      handleEquipmentItemTypeChange([]);
    }
  }

  const handleSupplyItemTypeChange = (supplyItemType: number[]) => {
    setSupplyItemType(supplyItemType);
  }

  const handleEquipmentItemTypeChange = (equipmentItemType: number[]) => {
    setEquipmentItemType(equipmentItemType);

    if (!equipmentItemType.includes(EquipmentItemType.indexOf('Arm'))) {
      handleArmEquipmentItemTypeChange([]);
    }

    if (!equipmentItemType.includes(EquipmentItemType.indexOf('Gear'))) {
      handleGearEquipmentItemMaterialTypeChange([]);
    }

    if (!equipmentItemType.includes(EquipmentItemType.indexOf('Trinket'))) {
      handleTrinketEquipmentItemTypeChange([]);
    }
  }

  const handleArmEquipmentItemTypeChange = (armEquipmentItemType: number[]) => {
    setArmEquipmentItemType(armEquipmentItemType);
  }

  const handleGearEquipmentItemMaterialTypeChange = (gearEquipmentItemMaterialType: number[]) => {
    setGearEquipmentItemMaterialType(gearEquipmentItemMaterialType);
  }

  const handleTrinketEquipmentItemTypeChange = (trinketEquipmentItemType: number[]) => {
    setTrinketEquipmentItemType(trinketEquipmentItemType);
  }

  /* Get items of the selected game */
	const parameters = new ItemParameters({
    requestType: ItemRequestType.GetFilterItems,
		gameId: [gameModel.id],
    itemType: itemType,
    supplyItemType: supplyItemType,
    equipmentItemType: equipmentItemType,
    armEquipmentItemType: armEquipmentItemType,
    gearEquipmentItemMaterialType: gearEquipmentItemMaterialType,
    trinketEquipmentItemType: trinketEquipmentItemType,
    name: name
	});

	const itemQuery = useQuery<ItemModel[]>({
		queryKey: ["parameters", parameters],
		queryFn: () => getData(parameters, ItemModel),
		initialData: []
	});

  useEffect(() => {
    setName(debouncedName);
  }, [debouncedName])

  const itemHeaders = useMemo<HeadCell<ItemModel>[]>(() => [
    { 
      id: 'name', 
      label: 'Name', 
      align: 'left',
      render: (row) => (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
          <ExIcon resourceName={row.assetIconResourceName} size={20} />
          <ExLink pageName={'item'} name={row.name} />
        </Box>
      )
    },
    {
      id: 'typeDescription',
      label: 'Type',
      align: 'left'
    },
    {
      id: 'equipmentTypeDescription',
      label: 'Equipment',
      align: 'left'
    },
    {
      id: 'elementType',
      label: 'Element',
      align: 'left',
      render: (row) => (
        row.equipmentItemModel && (
          <ExIconLabel 
            label={ElementType[row.elementType]}
            url={`/images/icons/elements/${ElementType[row.elementType]}.png`}
            size={20}
            alignment='flex-start'
          />
        )
      )
    }
  ], [gameModel]);

	return (
		<Box sx={{ display: "flex", flexDirection: "column"}}>
			<Typography variant="h5">Items</Typography>
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
          types={ItemType} 
          type={itemType}
          setType={handleItemTypeChange} 
        />
        {itemType.includes(ItemType.indexOf('Supply')) && (
          <ExFilterSelection 
            label={"Supply Type"}
            types={SupplyItemType} 
            type={supplyItemType}
            setType={handleSupplyItemTypeChange}
          />
        )}
        {itemType.includes(ItemType.indexOf('Equipment')) && (
          <ExFilterSelection 
            label={"Equipment Type"}
            types={EquipmentItemType} 
            type={equipmentItemType}
            setType={handleEquipmentItemTypeChange}
          />
        )}
        {equipmentItemType.includes(EquipmentItemType.indexOf('Arm')) && (
          <ExFilterSelection 
            label={"Arm Equipment Type"}
            types={ArmEquipmentItemType} 
            type={armEquipmentItemType}
            setType={handleArmEquipmentItemTypeChange}
          />
        )}
        {equipmentItemType.includes(EquipmentItemType.indexOf('Gear')) && (
          <ExFilterSelection 
            label={"Gear Equipment Material Type"}
            types={GearEquipmentItemMaterialType} 
            type={gearEquipmentItemMaterialType}
            setType={handleGearEquipmentItemMaterialTypeChange}
          />
        )}
        {equipmentItemType.includes(EquipmentItemType.indexOf('Trinket')) && (
          <ExFilterSelection 
            label={"Trinket Equipment Type"}
            types={TrinketEquipmentItemType} 
            type={trinketEquipmentItemType}
            setType={handleTrinketEquipmentItemTypeChange}
          />
        )}
      </Stack>
			{ itemQuery.isLoading ? (
				<Typography variant="h5">Loading...</Typography>
			) : (
				<Stack spacing={1} direction="column" sx={{ width: '750px', maxWidth: '100%' }}>
          <EnhancedTable rowKey="id" rows={itemQuery.data} headCells={itemHeaders} enableOrder enablePagination />
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