
import { ElementType } from '../types/enums';

export type AttributeProperty = { 
  physicalAttack: number; 
  physicalDefence: number; 
  magicalAttack: number; 
  magicalDefence: number;
}

interface Element {
  elementType: ElementType,
  strength: ElementType[],
  weakness: ElementType[]
}

export const ElementList: Element[] = [
  {
    elementType: 'Normal',
    strength: [],
    weakness: []
  },
  {
    elementType: 'Fire',
    strength: ['Ice', 'Nature'],
    weakness: ['Fire', 'Water']
  },
  {
    elementType: 'Ice',
    strength: ['Wind'],
    weakness: ['Fire']
  },
  {
    elementType: 'Electric',
    strength: ['Wind', 'Machine'],
    weakness: ['Electric', 'Ground']
  },
  {
    elementType: 'Water',
    strength: ['Fire'],
    weakness: ['Nature']
  },
  {
    elementType: 'Wind',
    strength: ['Ground', 'Fire'],
    weakness: ['Wind', 'Machine']
  },
  {
    elementType: 'Ground',
    strength: ['Electric'],
    weakness: ['Wind']
  },
  {
    elementType: 'Nature',
    strength: ['Water', 'Electric'],
    weakness: ['Ice', 'Nature']
  },
  {
    elementType: 'Machine',
    strength: ['Nature'],
    weakness: ['Electric']
  },
  {
    elementType: 'Light',
    strength: ['Dark'],
    weakness: ['Light']
  },
  {
    elementType: 'Dark',
    strength: ['Light'],
    weakness: ['Dark']
  }
]

export function AttackValue(elementType: ElementType, entityElementType: ElementType, physicalAttack: number, magicalAttack: number): number
{
    if (elementType !== entityElementType) return 0;

    const result = physicalAttack + magicalAttack;

    return result;
}

export function DefenceValue(elementType: ElementType, entityElementType: ElementType, physicalDefence: number, magicalDefence: number): number {

  const element = ElementList.find(x => x.elementType === elementType);

  const totalDefence = physicalDefence + magicalDefence;

  const result = element?.strength.includes(entityElementType) ? -totalDefence :
                 element?.weakness.includes(entityElementType) ?  totalDefence : 0;

  return result;
}