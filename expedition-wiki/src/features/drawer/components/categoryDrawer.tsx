import * as React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { useGameContext } from '../../../context/gameContext';

import { EffectType, ResourceEffectType, StatusEffectType, 
         AbilityType, ChargeAbilityType, DischargeAbilityType, 
         ItemType, SupplyItemType, EquipmentItemType,
         InteractableType, AgentInteractableType, CharacterAgentInteractableType 
        } from '../../../types/enums';

import { styled, alpha } from '@mui/material/styles';
import { Box, Typography, Drawer, List, ListItem, ListItemText, Button, Collapse, ListSubheader } from '@mui/material';
import { ExpandLess, ExpandMore } from '@mui/icons-material';

interface DrawerOptions
{
    label: string,
    page: string,
    state?: {}
    children: DrawerOptions[]
}

const DrawerOptions: DrawerOptions[] = [
  /* Effects */
  { 
    label: 'Effects', 
    page: 'effect',
    children: [
      {
        label: 'Resource', 
        page: 'effect',
        state: { effectType: EffectType[0] }, 
        children: [
          {
            label: 'Damage', 
            page: 'effect',
            state: { 
              effectType: EffectType[0], 
              resourceEffectType: ResourceEffectType[0] 
            }, 
            children: []
          },
          {
            label: 'Restore', 
            page: 'effect',
            state: { 
              effectType: EffectType[0], 
              resourceEffectType: ResourceEffectType[1] 
            }, 
            children: []
          },
          {
            label: 'Absorb', 
            page: 'effect',
            state: { 
              effectType: EffectType[0], 
              resourceEffectType: ResourceEffectType[2] 
            }, 
            children: []
          }
        ]
      },
      {
        label: 'Event', 
        page: 'event',
        state: { effectType: EffectType[1] }, 
        children: []
      },
      {
        label: 'Status', 
        page: 'status',
        state: { effectType: EffectType[2] }, 
        children: [
          {
            label: 'Basic', 
            page: 'effect',
            state: { 
              effectType: EffectType[2], 
              statusEffectType: StatusEffectType[0] 
            }, 
            children: []
          },
          {
            label: 'Attribute', 
            page: 'effect',
            state: { 
              effectType: EffectType[2], 
              statusEffectType: StatusEffectType[1] 
            }, 
            children: []
          },
          {
            label: 'Ability', 
            page: 'effect',
            state: { 
              effectType: EffectType[2], 
              statusEffectType: StatusEffectType[2] 
            }, 
            children: []
          },
          {
            label: 'Aura', 
            page: 'effect',
            state: { 
              effectType: EffectType[2], 
              statusEffectType: StatusEffectType[3] 
            }, 
            children: []
          },
          {
            label: 'Repeat', 
            page: 'effect',
            state: { 
              effectType: EffectType[2], 
              statusEffectType: StatusEffectType[4] 
            }, 
            children: []
          },
          {
            label: 'Resist', 
            page: 'effect',
            state: { 
              effectType: EffectType[2], 
              statusEffectType: StatusEffectType[5] 
            }, 
            children: []
          },
          {
            label: 'Disable', 
            page: 'effect',
            state: { 
              effectType: EffectType[2], 
              statusEffectType: StatusEffectType[6] 
            }, 
            children: []
          },
          {
            label: 'Morph', 
            page: 'effect',
            state: { 
              effectType: EffectType[2], 
              statusEffectType: StatusEffectType[7] 
            }, 
            children: []
          },
          {
            label: 'Size', 
            page: 'effect',
            state: { 
              effectType: EffectType[2], 
              statusEffectType: StatusEffectType[8] 
            }, 
            children: []
          },
          {
            label: 'Sensor', 
            page: 'effect',
            state: { 
              effectType: EffectType[2], 
              statusEffectType: StatusEffectType[9] 
            }, 
            children: []
          },
          {
            label: 'Standing', 
            page: 'effect',
            state: { 
              effectType: EffectType[2], 
              statusEffectType: StatusEffectType[10] 
            }, 
            children: []
          },
          {
            label: 'Cluster', 
            page: 'effect',
            state: { 
              effectType: EffectType[2], 
              statusEffectType: StatusEffectType[11] 
            }, 
            children: []
          }
        ]
      }  
    ]
  },
  /* Abilities */
  {
    label: 'Abilities', 
    page: 'ability',
    children: [
      {
        label: 'Charge', 
        page: 'ability',
        state: { abilityType: AbilityType[0] }, 
        children: [
          {
            label: 'Primary', 
            page: 'ability',
            state: { 
              abilityType: AbilityType[0], 
              chargeAbilityType: ChargeAbilityType[0] 
            }, 
            children: []
          },
          {
            label: 'Secondary', 
            page: 'ability',
            state: { 
              abilityType: AbilityType[0], 
              chargeAbilityType: ChargeAbilityType[1] 
            }, 
            children: []
          }
        ]
      },
      {
        label: 'Discharge', 
        page: 'ability',
        state: { abilityType: AbilityType[1] }, 
        children: [
          {
            label: 'Arm', 
            page: 'ability',
            state: { 
              abilityType: AbilityType[1], 
              dischargeAbilityType: DischargeAbilityType[0] 
            }, 
            children: []
          },
          {
            label: 'Spell', 
            page: 'ability',
            state: { 
              abilityType: AbilityType[1], 
              dischargeAbilityType: ChargeAbilityType[1] 
            }, 
            children: []
          }
        ]
      }
    ]
  },
  /* Items */
  { 
    label: 'Items',
    page: 'item',
    children: [
      {
        label: 'Supplies', 
        page: 'item',
        state: { itemType: ItemType[0] }, 
        children: [
          {
            label: 'Usable', 
            page: 'item',
            state: { 
              itemType: ItemType[0], 
              supplyItemType: SupplyItemType[0] 
            }, 
            children: []
          },
          {
            label: 'Consumable', 
            page: 'item',
            state: { 
              itemType: ItemType[0], 
              supplyItemType: SupplyItemType[1] 
            }, 
            children: []
          }
        ]
      },
      {
        label: 'Equipment', 
        page: 'item',
        state: { itemType: ItemType[1] }, 
        children: [
          {
            label: 'Arm', 
            page: 'item',
            state: { 
              itemType: ItemType[1], 
              equipmentItemType: EquipmentItemType[0] 
            }, 
            children: []
          },
          {
            label: 'Gear', 
            page: 'item',
            state: { 
              itemType: ItemType[1], 
              equipmentItemType: EquipmentItemType[1] 
            }, 
            children: []
          },
          {
            label: 'Trinket', 
            page: 'item',
            state: { 
              itemType: ItemType[1], 
              equipmentItemType: EquipmentItemType[2] 
            }, 
            children: []
          }
        ]
      }
    ]
  },
  /* Interactables */
  { 
    label: 'Interactables', 
    page: 'interactable',
    children: [
      {
        label: 'Agents', 
        page: 'interactable',
        state: { interactableType: InteractableType[0] }, 
        children: [
          {
            label: 'Characters', 
            page: 'interactable',
            state: { 
              interactableType: InteractableType[0], 
              agentInteractableType: AgentInteractableType[0] 
            }, 
            children: [
              {
                label: 'Non-playable', 
                page: 'interactable',
                state: { 
                  interactableType: InteractableType[0], 
                  agentInteractableType: AgentInteractableType[0],
                  characterAgentInteractableType: CharacterAgentInteractableType[0]
                }, 
                children: []
              },
              {
                label: 'Playable', 
                page: 'interactable',
                state: { 
                  interactableType: InteractableType[0], 
                  agentInteractableType: AgentInteractableType[0],
                  characterAgentInteractableType: CharacterAgentInteractableType[1]
                }, 
                children: []
              }
            ]
          },
          {
            label: 'Static', 
            page: 'interactable',
            state: { 
              interactableType: InteractableType[0], 
              agentInteractableType: AgentInteractableType[1] 
            },
            children: []
          }
        ]
      },
      {
        label: 'Obstacles', 
        page: 'interactable',
        state: { interactableType: InteractableType[1] }, 
        children: []
      }
    ]
  },
  /* Classes */
  {
    label: 'Classes', 
    page: 'class',
    children: []
  },
  /* Factions */
  {
    label: 'Factions', 
    page: 'faction',
    children: []
  }
]

interface CategoryDrawerProps
{
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function CategoryDrawer(props: CategoryDrawerProps) 
{ 
  const closeDrawer = () => {
    props.setOpen(false);
  }

  return (
    <Drawer 
      open={props.open} 
      onClose={closeDrawer}
      slotProps={{ paper: { sx: { backgroundColor: 'primary.main' } } }} 
    >
      <Box sx={{ width: 250 }} role='presentation' >
      <List 
        disablePadding 
          subheader={
          <ListSubheader sx={{ color: 'white', backgroundColor: 'primary.dark'}}>
            <Typography variant='body1' sx={{ display: 'flex', alignItems: 'center', height: '45px'}}>
            Categories
            </Typography>
          </ListSubheader> 
        }
      >
      {DrawerOptions.map(options => (
        <CustomListItem key={options.label} depth={0} options={options} closeDrawer={closeDrawer} />
      ))}
      </List>
    </Box>
    </Drawer>
  )
}

const CustomButton = styled(Button)(({ theme }) => ({
  borderRadius: 0,
  margin: '1px',
  background: theme.palette.primary.light,
  textTransform: 'none',
  color: 'black',
  textAlign: 'left',
  '&:hover': {
    background: alpha(theme.palette.common.white, 0.25),
  }
}));

interface CustomListItemProps
{
  depth: number,
  options: DrawerOptions
  closeDrawer: () => void
}

function CustomListItem(props: CustomListItemProps) {

  const [open, setOpen] = React.useState(false);

  const { gameModel } = useGameContext();

  const handleClick = () => {
      setOpen(!open);
  };

  const navigate = useNavigate();
  const location = useLocation();

  const handleSelectOption = (options: DrawerOptions) => {

    props.closeDrawer();

    const mask =`/${ gameModel.name.replaceAll(' ', '_')}/${ options.page }`;
    
    navigate(`${ gameModel.name }/${ options.page }`, {
        mask: mask,
        state: options.state,
        replace: mask === location.mask?.pathname
      })
  }

  return (
    <div key={props.options.label}>
      <ListItem disablePadding sx={{ display: 'flex', alignItems: 'stretch', height: '45px'}}>
        <CustomButton sx={{ flex: 1, pl: 2 + props.depth * 2 }} onClick={() => { handleSelectOption(props.options) }}>
          <ListItemText primary={props.options.label} />
        </CustomButton>
        { props.options.children.length > 0 && (
          <CustomButton sx={{ minWidth: '45px' }} onClick={handleClick}>
            { open ? <ExpandLess /> : <ExpandMore />}
          </CustomButton>
        )}
      </ListItem>
      { props.options.children.length > 0 && (
        <Collapse in={open}>
          <List disablePadding>
            {props.options.children.map(options => (
              <CustomListItem key={options.label} depth={props.depth + 1} options={options} closeDrawer={props.closeDrawer} />
            ))}
          </List>
        </Collapse>
      )}
    </div>
  )
}