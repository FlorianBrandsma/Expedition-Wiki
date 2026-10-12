import { CardMedia } from "@mui/material";

interface ExAssetThumbnailProps {
  resourceName: string;
}

export default function ExAssetThumbnail({ resourceName }: ExAssetThumbnailProps) {
  return (
    <CardMedia 
      component='img'
      image={`/images/thumbnails/assets/${resourceName}/${resourceName}.webp`}
      alt={resourceName}
      sx={{
        width: '66%',
        display: 'block',
        margin: 'auto'
      }}
    />
  )
}