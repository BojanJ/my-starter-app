import React from 'react';
import { dayjs } from '@/utils/date'; // Import the configured dayjs instance
import { Card, CardContent } from '@/components/ui/card';

interface ExampleDateDisplayProps {
  isoDateString: string; // e.g., "2025-07-02T10:00:00Z"
}

const ExampleDateDisplay: React.FC<ExampleDateDisplayProps> = ({ isoDateString }) => {
  const date = dayjs(isoDateString); // Parse the ISO date string

  return (
    <Card className='p-4'>
      <CardContent>
        <p>Original Date String: {isoDateString}</p>
        <p>Formatted (L): {date.format('L')}</p>{' '}
        {/* e.g., 07/02/2025 or 02.07.2025 based on locale */}
        <p>Formatted (LL): {date.format('LL')}</p> {/* e.g., July 2, 2025 or 2 de julio de 2025 */}
        <p>Relative Time: {date.fromNow()}</p> {/* e.g., "2 hours ago" */}
        <p>Add 5 days: {date.add(5, 'day').format('LL')}</p>
        <p>Is today? {date.isSame(new Date(), 'day') ? 'Yes' : 'No'}</p>
      </CardContent>
    </Card>
  );
};

export default ExampleDateDisplay;
