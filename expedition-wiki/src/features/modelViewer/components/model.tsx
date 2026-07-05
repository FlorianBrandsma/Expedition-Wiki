import { useRef, useEffect, useState } from 'react'
import { useAnimations  } from '@react-three/drei'
import { Group } from "three";
import { GLTFLoader } from 'three-stdlib';
import type { GLTF } from 'three-stdlib'

import { useAlert } from '../../../context/alertContext';

interface ModelProps {
  position?: [number, number, number];
  scale?: number | [number, number, number];
  rotation?: [number, number, number];
  url: string;
}

export default function Model({url, ...props }: ModelProps) {
const showAlert = useAlert(); 
  const group = useRef<Group>(null);

  const [gltf, setGltf] = useState<GLTF | null>(null);
  const { actions } = useAnimations(gltf?.animations ?? [], group);

  /* Load GLTF in useEffect to catch potential errors, e.g. missing asset */
  useEffect(() => {
    const loader = new GLTFLoader();

    loader.load(url, (gltf) => setGltf(gltf), undefined, () => {
      showAlert(`${ 500 }: Failed to load model`, 'error')
    });

  }, [url])

  useEffect(() => {
    const currentAction = actions['Take 001'];
    
    /* Play animation */
    if (currentAction) {
      currentAction.play();
    }
    
    /* Stop active animation on component dismount */
    return () => {
      currentAction?.stop();
    }
  }, [actions]);

  return (
    <>
      {gltf && (
        <group ref={group} {...props} dispose={null}>
          <primitive object={gltf.scene} />
        </group>
      )}
    </>
  );
}