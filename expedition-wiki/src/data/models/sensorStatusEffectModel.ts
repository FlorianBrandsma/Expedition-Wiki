import { SensorStatusEffectType } from "../../types/enums";

export class SensorStatusEffectModel {

  type!: number;

  sensorRange!: number;

  constructor(init:Partial<SensorStatusEffectModel>) {  
    Object.assign(this, init);

    this.sensorRange = Number(init.sensorRange!.toFixed(2));
  }

  description(stack: number): string {
    return `${ this.sensorRange >= 0 ? 'Increase' : 'Reduce'} ${SensorStatusEffectType[this.type].toLowerCase()} range by ${Math.abs(this.sensorRange) * stack}m`;
  }
}