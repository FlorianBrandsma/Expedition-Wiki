import { Link } from "react-router-dom";

import { useGameContext } from "../../context/gameContext";

import { getPath } from "../../services/pathManager";

interface ExLinkProps {
  name: string;
  params: string[];
  optionalParams?: Record<string, string>;
}

export default function ExLink({ name, params, optionalParams }: ExLinkProps) {

  const { gameModel } = useGameContext();

  const path = getPath(gameModel.name, params, optionalParams);

  return (
    <Link 
      className='link'
      to={path}
    >
      {name}
    </Link>
  )
}