import { Link } from "react-router-dom";

import { useGameContext } from "../../context/gameContext";

export class StandingStatusEffectModel {

  factionRank!: number;

  factionName!: string;

  constructor(init:Partial<StandingStatusEffectModel>) {  
    Object.assign(this, init);
  }

  descriptionComponent(stack: number): React.ReactNode {
    
  const { gameModel } = useGameContext();

    const faction = (
      <>
        <Link
          className='link'
          to={`/${gameModel.name}/faction/${this.factionName}`} 
          mask={`/${gameModel.name.replaceAll(' ', '_')}/faction/${this.factionName.replaceAll(' ', '_')}`}
          >
            {this.factionName}
        </Link>
      </>
    );

    return (
      <>
        {`${this.factionRank >= 0 ? 'Increase' : 'Reduce'} `}{faction}{` rank by ${Math.abs(this.factionRank) * stack}`}
      </>
    )
  }
};