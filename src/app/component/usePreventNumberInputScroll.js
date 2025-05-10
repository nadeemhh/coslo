// hooks/usePreventNumberInputScroll.js
import { useEffect } from 'react';

const usePreventNumberInputScroll = () => {
useEffect(() => {
  const handleWheel = (e) => {
    if (document.activeElement.type === 'number') {
      document.activeElement.blur();
    }
  };

  window.addEventListener('wheel', handleWheel, { passive: true });
  return () => window.removeEventListener('wheel', handleWheel);
}, []);
};


export default usePreventNumberInputScroll;
