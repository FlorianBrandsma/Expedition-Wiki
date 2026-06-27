export class GameModel {
  id!: number;
  name!: string;

  constructor(init:Partial<GameModel>) {  
    Object.assign(this, init);
	}
};