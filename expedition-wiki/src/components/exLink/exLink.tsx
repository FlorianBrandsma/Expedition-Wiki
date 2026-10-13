import { Link } from "react-router-dom";
import { useGameContext } from "../../context/gameContext";

interface ExLinkProps {
  name: string;
  params: string[];
  optionalParams?: Record<string, string>;
}

export default function ExLink(props: ExLinkProps) {

  const { gameModel } = useGameContext();

  const { name, params, optionalParams } = props;

  const gameName = gameModel.name.replaceAll(' ', '_');

  const urlParams = params.map(x => `/${x.replaceAll(' ', '_')}`).join('');
  
  const searchParams = optionalParams ? `?${new URLSearchParams(optionalParams).toString()}` : '';

  const path = `/${gameName}/${urlParams}${searchParams}`;

  return (
    <Link 
      className='link'
      to={path}
    >
      {name}
    </Link>
  )
}