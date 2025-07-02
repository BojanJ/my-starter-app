// src/utils/date.ts
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import localizedFormat from 'dayjs/plugin/localizedFormat';
import 'dayjs/locale/en'; // Import English locale
import 'dayjs/locale/es'; // Import Spanish locale
// Add other locales as needed

// Extend Day.js with necessary plugins
dayjs.extend(relativeTime);
dayjs.extend(localizedFormat);

// Function to set the global Day.js locale
export const setDayjsLocale = (locale: string) => {
  dayjs.locale(locale);
};

// Export dayjs instance for direct use or further extension
export { dayjs };
