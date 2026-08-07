import { Link } from "react-router-dom";
import { useGameContext } from "../../context/gameContext";

interface ExLinkProps {
  pageName: string;
  name: string;
}

export default function ExLink(props: ExLinkProps) {

  const { gameModel } = useGameContext();

  const { pageName, name } = props;

  return (
    <Link 
      className='link'
      to={`/${gameModel.name}/${pageName}/${name}`} 
      mask={`/${gameModel.name.replaceAll(' ', '_')}/${pageName}/${name.replaceAll(' ', '_')}`}
    >
      {name}
    </Link>
  )
}