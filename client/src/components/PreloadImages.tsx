import { useEffect, useState } from 'react';
import { brandOptions, cropOptions, productOptions, machineOptions } from '@/lib/image-options';

interface Props {
  onLoadComplete: () => void;
}

export function PreloadImages({ onLoadComplete }: Props) {
  useEffect(() => {
    const allImages = [
      ...brandOptions,
      ...cropOptions,
      ...productOptions,
      ...machineOptions,
      { image: '/images/Dukaan Final Logo-01.png' }
    ].map(option => option.image);

    let loadedCount = 0;
    const totalImages = allImages.filter(src => src.startsWith('/')).length;

    allImages.forEach(imageSrc => {
      if (imageSrc.startsWith('/')) {
        const img = new Image();
        img.onload = () => {
          loadedCount++;
          if (loadedCount === totalImages) {
            onLoadComplete();
          }
        };
        img.src = imageSrc;
      }
    });
  }, [onLoadComplete]);

  return null;
} 