export class GameModel {
  
  id!: number;
  
  name!: string;
  description!: string;

  constructor(init:Partial<GameModel>) {  
    Object.assign(this, init);
	}
};