import { FormatTime } from "../../services/timeManager";

export class AtmosphereModel {

  id!: number;

  isDefault!: boolean;

  startTime!: number;
  endTime!: number;

  climateName!: string;
  terrainName!: string;
  regionName!: string;

  iconResourceName!: string;

  statusEffectStack!: number;

  constructor(init:Partial<AtmosphereModel>) {  
    Object.assign(this, init);
  }

  get timeDescription(): string {
    return this.isDefault ? 'Default' : `${FormatTime(this.startTime)}-${FormatTime(this.endTime)}`;
  }
}