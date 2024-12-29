'use client';

import { useRouter } from 'next/navigation';

const BackButton = () => {
  const router = useRouter();

  const handleGoBack = () => {
    router.back(); // Navigate to the previous URL
  };

  return (
    <i
      className="fas fa-arrow-left"
      onClick={handleGoBack}
      style={{ cursor: 'pointer' }} // Ensure it's visually clickable
    />
  );
};

export default BackButton;
