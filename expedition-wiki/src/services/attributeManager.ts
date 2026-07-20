import { ElementType } from '../types/enums';

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
    elementType: 'Lightning',
    strength: ['Wind', 'Machine'],
    weakness: ['Lightning', 'Ground']
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
    strength: ['Lightning'],
    weakness: ['Wind']
  },
  {
    elementType: 'Nature',
    strength: ['Water', 'Lightning'],
    weakness: ['Ice', 'Nature']
  },
  {
    elementType: 'Machine',
    strength: ['Nature'],
    weakness: ['Lightning']
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
                 element?.weakness.includes(entityElementType) ? totalDefence  : 0;

  return result;
}