import { useEffect } from 'react';
import { useMap} from 'react-leaflet';

export default function PseudoFullscreenEscapeHandler() {
  const map = useMap();

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && map._isFullscreen) {
        map.toggleFullscreen();
      }
    };

    window.addEventListener('keydown', handleKeyDown, { capture: true });
    
    return () => window.removeEventListener('keydown', handleKeyDown, { capture: true });
    
  }, [map]);

  return null;
};