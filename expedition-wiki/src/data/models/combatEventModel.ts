import { CombatState } from "../../types/enums";

export class CombatEventModel {

  combatState!: number;

  enmity!: number;

  resetAttributes!: boolean;

  constructor(init:Partial<CombatEventModel>) {  
    Object.assign(this, init);
  }

  get typeDescription(): string {
    return 'Combat';
  }

  get combatStateDescription(): CombatState {
    return CombatState[this.combatState];
  }
}