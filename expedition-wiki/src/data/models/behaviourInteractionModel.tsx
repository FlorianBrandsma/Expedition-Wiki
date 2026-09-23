import type React from "react";
import { FormatTime } from "../../services/timeManager";
import { AffiliationType, CombatState } from "../../types/enums";
import ExLink from "../../components/exLink/exLink";

export class BehaviourInteractionModel {

  id!: number;

  affiliationType!: number;
  combatState!: number;

  interactionIsDefault!: boolean;
  interactionStartTime!: number;
  interactionEndTime!: number;

  factionName!: string;
  factionIconResourceName!: string;
  
  constructor(init:Partial<BehaviourInteractionModel>) {  
    Object.assign(this, init);
  }

  get affiliationComponent(): React.ReactNode {

    switch (AffiliationType[this.affiliationType])
    {
      case 'Faction': return <ExLink name={'Faction'} params={['faction', this.factionName]} />
      
      default: return AffiliationType[this.affiliationType];
    }
  }

  get combatStateDescription(): string {
    return CombatState[this.combatState];
  }

  get interactionTimeDescription(): string {
    return this.interactionIsDefault ? 'Default' : `${FormatTime(this.interactionStartTime)}-${FormatTime(this.interactionEndTime)}`;
  }
}