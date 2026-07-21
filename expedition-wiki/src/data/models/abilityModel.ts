export class AbilityModel {
  id!: number;
  type!: number;

  name!: string;
  description!: string;
  
  energy!: number;
  enmity!: number;

  coooldownDuration!: number;

  executions!: number;

  iconResourceName!: string;

  constructor(init:Partial<AbilityModel>) {  
    Object.assign(this, init);

    this.coooldownDuration = Number(init.coooldownDuration!.toFixed(2));
  }
};