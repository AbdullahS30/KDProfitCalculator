import { useEffect } from 'react';
import { brandOptions, cropOptions, productOptions, machineOptions } from '@/lib/image-options';

export function PreloadImages() {
  useEffect(() => {
    const allImages = [
      ...brandOptions,
      ...cropOptions,
      ...productOptions,
      ...machineOptions,
      { image: '/images/Dukaan Final Logo-01.png' }
    ].map(option => option.image);

    allImages.forEach(imageSrc => {
      if (imageSrc.startsWith('/')) {  // Only preload actual images, not SVGs
        const img = new Image();
        img.src = imageSrc;
      }
    });
  }, []);

  return null;
} 