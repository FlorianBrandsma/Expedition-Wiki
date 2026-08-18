import ExLink from "../../components/exLink/exLink";

export class StandingStatusEffectModel {

  factionRank!: number;

  factionName!: string;

  constructor(init:Partial<StandingStatusEffectModel>) {  
    Object.assign(this, init);
  }

  descriptionComponent(stack: number): React.ReactNode {

    const faction = (
      <ExLink pageName={'faction'} name={this.factionName} />
    );

    return (
      <>
        {`${this.factionRank >= 0 ? 'Increase' : 'Reduce'} `}{faction}{` rank by ${Math.abs(this.factionRank) * stack}`}
      </>
    )
  }
}