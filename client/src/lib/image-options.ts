import { SiJohndeere } from "react-icons/si";

// Generate SVG images for each type using react-icons or basic shapes
function generateSvgImage(color: string, Icon?: React.ComponentType) {
  const svg = Icon 
    ? `data:image/svg+xml,${encodeURIComponent(`
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="${color}">
        <rect width="24" height="24" fill="${color}" opacity="0.1"/>
        ${Icon ? '<g transform="translate(4,4) scale(0.66)">' + Icon + '</g>' : ''}
      </svg>
    `)}`
    : `data:image/svg+xml,${encodeURIComponent(`
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
        <rect width="24" height="24" fill="${color}" opacity="0.1"/>
        <circle cx="12" cy="12" r="6" fill="${color}"/>
      </svg>
    `)}`;
  
  return svg;
}

export const fertilizerOptions = [
  { id: 'Urea', label: 'Urea', image: generateSvgImage('#34d399') },
  { id: 'DAP', label: 'DAP', image: generateSvgImage('#60a5fa') },
  { id: 'SOP', label: 'SOP', image: generateSvgImage('#f59e0b') },
  { id: 'NP', label: 'NP', image: generateSvgImage('#8b5cf6') },
];

export const brandOptions = [
  { id: 'Engro', label: 'Engro', image: "/images/engro.png" },
  { id: 'FFC', label: 'FFC', image: "/images/ffc.png" },
  { id: 'Fatima', label: 'Fatima', image: "/images/fatima.png" },
];

export const directInputOptions = [
  { id: 'Seeds', label: 'Seeds', image: generateSvgImage('#84cc16') },
  { id: 'Pesticide', label: 'Pesticide', image: generateSvgImage('#ef4444') },
  { id: 'Bio Chemicals', label: 'Bio Chemicals', image: generateSvgImage('#06b6d4') },
];

export const productOptions = [
  { id: 'Wanda', label: 'Wanda', image: generateSvgImage('#8b5cf6') },
  { id: 'Silage', label: 'Silage', image: generateSvgImage('#f59e0b') },
  { id: 'Chaukar', label: 'Chaukar', image: generateSvgImage('#84cc16') },
  { id: 'Solar Panels', label: 'Solar Panels', image: generateSvgImage('#0ea5e9') },
  { id: 'Tractor', label: 'Tractor', image: generateSvgImage('#dc2626') },
];

export const cropOptions = [
  { id: 'Wheat', label: 'Wheat', image: generateSvgImage('#f59e0b') },
  { id: 'Rice', label: 'Rice', image: generateSvgImage('#84cc16') },
  { id: 'Maize', label: 'Maize', image: generateSvgImage('#fbbf24') },
  { id: 'Cotton', label: 'Cotton', image: generateSvgImage('#f9fafb') },
];

export const machineOptions = [
  { id: 'Harvester', label: 'Harvester', image: generateSvgImage('#dc2626') },
  { id: 'Thresher', label: 'Thresher', image: generateSvgImage('#2563eb') },
  { id: 'Trolley', label: 'Trolley', image: generateSvgImage('#059669') },
  { id: 'Rice Planter', label: 'Rice Planter', image: generateSvgImage('#7c3aed') },
];
