// src/hooks/useIsMobile.ts
import { useMediaQuery } from 'react-responsive';

// Define your mobile breakpoint. This should align with your Tailwind CSS 'md' breakpoint typically.
const MOBILE_BREAKPOINT = 768; // Anything less than 768px wide will be considered mobile.

export const useIsMobile = () => {
  // isMobile will be true if the screen width is less than MOBILE_BREAKPOINT
  const isMobile = useMediaQuery({ maxWidth: MOBILE_BREAKPOINT - 1 });
  return isMobile;
};
