import * as React from 'react';
import { useState, useEffect } from 'react'

import Button from '@mui/material/Button';

import ModelDialog from './modelDialog';

interface ModelCardProps {
  assetType: number;
  assetResourceName: string;
}

export default function ModelButton(props: ModelCardProps) {

  const [fileExists, setFileExists] = useState<boolean | null>(null);
  const [openModelViewer, setOpenModelViewer] = React.useState(false);

  const url = `/models/assets/${ props.assetResourceName }.glb`;

  /* Check if file exists */
  useEffect(() => {
    fetch(url, { method: 'HEAD' }).then((res) => {
      const contentType = res.headers.get('content-type') || '';
      setFileExists(res.ok && !contentType.includes('text/html'));
    });
  }, [url]);

  return (
  <>
    <ModelDialog 
      url={url}
      assetType={props.assetType} 
      open={openModelViewer}
      setOpen={setOpenModelViewer}
    />
    <Button 
      variant="contained"
      disabled={fileExists == false}
      onClick={() => setOpenModelViewer(true)}
      sx={{ width:'100%' }}
    >
      View in 3D
    </Button>
  </>
  )
}