import * as React from 'react';
import { useState, useEffect } from 'react'

import { Button, Card, CardHeader, CardContent, CardMedia } from '@mui/material';

import ModelDialog from './modelDialog';

interface ModelCardProps {
  name: string;
  assetType: number;
  assetResourceName: string;
}

export default function ModelCard(props: ModelCardProps) {

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
    <Card 
      sx={{ 
        float: 'right', 
        backgroundColor: 'primary.light', 
        borderRadius: 0, 
        width: '250px'
      }}
    >
      <CardHeader
        title={props.name}
        slotProps={{
          title: {
            variant: 'body1',
            align: 'center',
            sx: { color: 'primary.contrastText' }
          }
        }}
        sx={{
          backgroundColor: 'primary.dark',
          padding: 1
        }}>
      </CardHeader>
      <CardContent 
        sx={{ 
          height: '100%', 
          padding: 1, 
          '&:last-child': { paddingBottom: 1 }
        }}>
        <CardMedia 
          component="img"
          image={`/images/thumbnails/assets/${props.assetResourceName}.png`}
          alt={props.assetResourceName}
        />
        <Button 
          variant="contained"
          disabled={fileExists == false}
          onClick={() => setOpenModelViewer(true)}
          sx={{ width:'100%' }}
        >
          View in 3D
        </Button>         
      </CardContent>
    </Card>
  </>
  )
}