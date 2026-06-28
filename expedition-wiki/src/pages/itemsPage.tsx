import { useState, useEffect, useRef } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useLocation } from 'react-router-dom';
import { useDebounce } from '../hooks/useDebounce';

import { useGameContext } from '../context/gameContext';

import { ItemModel } from '../data/models/itemModel';
import { ItemRequestType, ItemParameters } from '../data/parameters/itemParameters';
import { getData } from '../services/dataManager';

import { ItemType, SupplyItemType, EquipmentItemType } from '../types/enums'

import { TextField, Avatar, Box, Button, Stack, Typography } from '@mui/material';
import ExFilterSelection from '../components/exFilterSelection/exFilterSelection';
import ExTextField from '../components/exTextField/exTextField';
import EnhancedTable, { type HeadCell } from '../components/enhancedTable/enhancedTable';

const itemHeaders: HeadCell<ItemModel>[] = [
  { 
    id: 'id', 
    label: 'Id', 
    numeric: true
  },
  { 
    id: 'name', 
    label: "Name", 
    numeric: false,

    render: (row) => (
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
        <Avatar 
          src={`/images/icons/objects/${row.assetIconResourceName}.png`}
          alt={row.name}
          variant='rounded'
          sx={{ width: 30, height: 30, backgroundColor: 'white'}}
        />
        {row.name}
      </Box>
    )
  },
  {
    id: 'typeDescription',
    label: 'Type',
    numeric: false
  }
]

export default function ItemsPage() {

	const { gameModel } = useGameContext();

  const [name,              setName]              = useState<string>('');
  const [itemType,          setItemType]          = useState<number[]>([]);
  const [supplyItemType,    setSupplyItemType]    = useState<number[]>([]);
  const [equipmentItemType, setEquipmentItemType] = useState<number[]>([]);

  const [nameInput, setNameInput] = useState<string>('');
  
  const debouncedName = useDebounce<string>(nameInput, 500);

  const stateItemType          = useLocation().state?.itemType;
  const stateSupplyItemType    = useLocation().state?.supplyItemType;
  const stateEquipmentItemType = useLocation().state?.equipmentItemType;

  const itemTypeIndex          = ItemType         .findIndex(itemType          => itemType          == stateItemType);
  const supplyItemTypeIndex    = SupplyItemType   .findIndex(supplyItemType    => supplyItemType    == stateSupplyItemType);
  const equipmentItemTypeIndex = EquipmentItemType.findIndex(equipmentItemType => equipmentItemType == stateEquipmentItemType);

  useEffect(() => {
    setItemType(itemTypeIndex >= 0 ? [itemTypeIndex] : [])
  }, [itemTypeIndex])

  useEffect(() => {
    setSupplyItemType(supplyItemTypeIndex >= 0 ? [supplyItemTypeIndex] : [])
  }, [supplyItemTypeIndex])

  useEffect(() => {
    setEquipmentItemType(equipmentItemTypeIndex >= 0 ? [equipmentItemTypeIndex] : [])
  }, [equipmentItemTypeIndex])

  /* Get items of the selected game */
	const parameters = new ItemParameters({
    requestType: ItemRequestType.GetFilterItems,
		gameId: [gameModel.id],
    itemType: itemType,
    supplyItemType: supplyItemType,
    equipmentItemType: equipmentItemType,
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

	return (
		<Box sx={{ display: "flex", flexDirection: "column"}}>
			<Typography variant="h5">Items</Typography>
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
          setType={setItemType} 
        />
        { itemType.includes(ItemType.indexOf('Supply')) && (
          <ExFilterSelection 
            label={"Supply Type"}
            types={SupplyItemType} 
            type={supplyItemType}
            setType={setSupplyItemType}
          />
        )}
        { itemType.includes(ItemType.indexOf('Equipment')) && (
          <ExFilterSelection 
            label={"Equipment Type"}
            types={EquipmentItemType} 
            type={equipmentItemType}
            setType={setEquipmentItemType}
          />
        )}
      </Stack>

			{ itemQuery.isLoading ? (
				<Typography variant="h4">Loading...</Typography>
			) : (
				<Stack spacing={1} direction="column" sx={{ width: '750px', maxWidth: '100%'}}>
          <EnhancedTable rows={itemQuery.data} headCells={itemHeaders} rowKey="id" />
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