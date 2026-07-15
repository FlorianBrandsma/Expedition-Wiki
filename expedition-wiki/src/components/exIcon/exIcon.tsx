import Avatar from '@mui/material/Avatar';

interface ExIconProps {
  resourceName: string;
  size: number;
}

export default function ExIcon(props:ExIconProps) {
  return (
    <Avatar 
      src={`/images/icons/objects/${props.resourceName}.png`}
      variant='rounded'
      sx={{ width: props.size, height: props.size, backgroundColor: 'white'}}
    />
  );
}