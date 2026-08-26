import { Link } from "react-router-dom";
import { useGameContext } from "../../context/gameContext";

interface ExLinkProps {
  pageName: string;
  name: string;
  params?: string[];
}

export default function ExLink(props: ExLinkProps) {

  const { gameModel } = useGameContext();

  const { pageName, name, params } = props;

  const gameName = gameModel.name.replaceAll(' ', '_');

  const rawParams = params ?? [name];
  const urlParams = rawParams.map(x => `/${x.replaceAll(' ', '_')}`).join('');

  const path = `/${gameName}/${pageName}${urlParams}`;

  return (
    <Link 
      className='link'
      to={path}
    >
      {name}
    </Link>
  )
}