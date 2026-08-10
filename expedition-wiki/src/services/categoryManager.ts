import { EffectType, ResourceEffectType, StatusEffectType, 
         AbilityType, ChargeAbilityType, DischargeAbilityType, 
         ItemType, SupplyItemType, EquipmentItemType,
         InteractableType, AgentInteractableType, CharacterAgentInteractableType 
        } from '../types/enums';

export interface Category
{
    label: string,
    page: string,
    state?: {}
    children: Category[]
}

export const Categories: Category[] = [
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
        page: 'effect',
        state: { effectType: EffectType[1] }, 
        children: []
      },
      {
        label: 'Status', 
        page: 'effect',
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
      },
      {
        label: 'Goods', 
        page: 'item',
        state: { itemType: ItemType[2] }, 
        children: []
      },
      {
        label: 'Currencies', 
        page: 'item',
        state: { itemType: ItemType[3] }, 
        children: []
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
  /* Sets */
  {
    label: 'Sets', 
    page: 'set',
    children: []
  },
  /* Factions */
  {
    label: 'Factions', 
    page: 'faction',
    children: []
  },
  /* Classes */
  {
    label: 'Classes', 
    page: 'class',
    children: []
  }
]