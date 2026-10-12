import { useState } from 'react';

import Avatar from '@mui/material/Avatar';

interface ExIconProps {
  resourceName: string;
  size: number;
}

export default function ExIcon({ resourceName, size}:ExIconProps) {

  const highResSrc = `/images/icons/objects/${resourceName}/${resourceName}_256.webp`;
  const lowResSrc  = `/images/icons/objects/${resourceName}/${resourceName}_128.webp`;

  const [src, setSrc] = useState<string>(highResSrc);

  return (
    <Avatar 
      src={src}
      variant='rounded'
      sx={{ 
        width: size, 
        height: size, 
        backgroundColor: 'white'
      }}
      slotProps={{
        img: { 
          onError: () => {
            if (src !== lowResSrc)
              setSrc(lowResSrc);
          }
        }
      }}
    />
  );
}