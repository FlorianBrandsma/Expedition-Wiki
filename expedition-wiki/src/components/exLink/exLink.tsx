import { Link } from "react-router-dom";
import { useGameContext } from "../../context/gameContext";

interface ExLinkProps {
  name: string;
  params: string[];
}

export default function ExLink(props: ExLinkProps) {

  const { gameModel } = useGameContext();

  const { name, params } = props;

  const gameName = gameModel.name.replaceAll(' ', '_');

  const urlParams = params.map(x => `/${x.replaceAll(' ', '_')}`).join('');

  const path = `/${gameName}/${urlParams}`;

  return (
    <Link 
      className='link'
      to={path}
    >
      {name}
    </Link>
  )
}