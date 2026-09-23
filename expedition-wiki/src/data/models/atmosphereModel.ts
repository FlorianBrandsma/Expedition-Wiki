import { FormatTime } from "../../services/timeManager";
import { StatusEffectState } from "../../types/enums";

export class AtmosphereModel {

  id!: number;

  isDefault!: boolean;

  startTime!: number;
  endTime!: number;

  climateName!: string;
  terrainName!: string;
  regionName!: string;

  iconResourceName!: string;

  statusEffectState!: number;

  statusEffectStack!: number;

  activeStatusEffectRepetitionTime!: number;

  constructor(init:Partial<AtmosphereModel>) {  
    Object.assign(this, init);

    this.activeStatusEffectRepetitionTime = Number(init.activeStatusEffectRepetitionTime!.toFixed(2));
  }

  get timeDescription(): string {
    return this.isDefault ? 'Default' : `${FormatTime(this.startTime)}-${FormatTime(this.endTime)}`;
  }

  get statusEffectStateDescription(): string {
    return StatusEffectState[this.statusEffectState];
  }

  get activeStatusEffectRepetitionTimeDescription(): string {
    return this.activeStatusEffectRepetitionTime > 0 ? `${this.activeStatusEffectRepetitionTime.toFixed(2)}s` : '';
  }
}