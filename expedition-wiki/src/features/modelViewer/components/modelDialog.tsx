import { useState, useRef } from 'react'
import { Dialog, Box } from '@mui/material'
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from '@react-three/drei';
import type { OrbitControls as OrbitControlsImpl } from 'three-stdlib';

import { AssetList } from '../../../services/typeManager';

import { Button } from '@mui/material';

import Model from "./model";

interface ModelDialogProps {
  url: string;
  assetType: number;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function ModelDialog(props: ModelDialogProps) {

  const orbitControlsRef = useRef<OrbitControlsImpl>(null);
  const [orbitControlsKey, setOrbitControlsKey] = useState<number>(0);

  const handleOrbitControlsReset = () => {

    if (!orbitControlsRef.current) return;
    
    orbitControlsRef.current.reset();

    /* Reset component to stop active physics */
    setOrbitControlsKey((prev) => prev + 1);
  };

  /* Can be updated with other pivot types when needed */
  const positionY: number = (() => {
    switch (AssetList[props.assetType]?.pivotType)
    {
      case 'Bottom': return -10;
      
      default: return 0;
    }
  })();

  return (
    <Dialog 
      open={props.open} 
      onClose={() => props.setOpen(false)}
      slotProps={{
        paper: {
          sx: {
            borderRadius: 0,
            backgroundColor: 'primary.light',
            width: '100%',
            maxWidth: '500px'
          }
        }
      }}
    >
      <Box 
        sx={{ 
          display: 'flex', 
          flexDirection: 'column', 
          width: '100%',
          maxWidth: 'min(500px, 90vh)',
          padding: 1,
          aspectRatio: '1 / 1.5',
          maxHeight: '85vh',
          boxSizing: 'border-box'
        }}
      >
        <Box sx={{ flexGrow: 1, minHeight: 0, width: '100%' }}>
          <Canvas camera={{ position: [0, 0, 35], fov: 45, far: 1000 }}>
            <ambientLight intensity={0.75} />
            <directionalLight position={[5, 5, 5]} intensity={2} castShadow />
            <Model 
              position={[0, positionY, 0]}
              scale={15}
              url={props.url}
              />
            <OrbitControls 
              key={orbitControlsKey} 
              ref={orbitControlsRef} 
              target={[0, 0, 0]} 
              enablePan={false} 
              />
          </Canvas>
        </Box>
        <Button 
          variant="contained"
          sx={{ marginTop: 1 }}
          onClick={() => handleOrbitControlsReset()}
        > 
          Reset 
        </Button>
      </Box> 
    </Dialog>
  )
}