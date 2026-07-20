import { Box } from '@mui/material';

type Alignment = 'flex-start' | 'flex-end';

interface ExIconLabelProps {
  label:string;
  url:string;
  size: number;
  alignment: Alignment;
}

export default function ExIconLabel(props:ExIconLabelProps) {

  const {url, size, alignment, label} = props;

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: alignment, gap: 0.5 }}>
      <Box
        component="img"
        src={url}
        sx={{ width: size, height: size }}
      />
      {label}
    </Box>
  )
}