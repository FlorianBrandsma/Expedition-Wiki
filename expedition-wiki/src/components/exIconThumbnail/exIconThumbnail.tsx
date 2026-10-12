import { CardMedia } from "@mui/material";

interface ExIconThumbnailProps {
  resourceName: string;
}

export default function ExIconThumbnail({ resourceName }: ExIconThumbnailProps) {

  const highResSrc = `/images/icons/objects/${resourceName}/${resourceName}_256.webp`;
  const lowResSrc  = `/images/icons/objects/${resourceName}/${resourceName}_128.webp`;

  return (
    <CardMedia 
      component='img'
      image={highResSrc}
      alt={resourceName}
      onError={(e) => {
        const target = e.currentTarget;

        if (target.src !== lowResSrc)
          target.src = lowResSrc;
      }}
      sx={{
        width: '66%',
        display: 'block',
        margin: 'auto'
      }}
    />
  )
}