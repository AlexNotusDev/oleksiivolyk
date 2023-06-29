import React from 'react';
import Header from '@/components/organisms/header';
import '@/styles/globals.css';
import { getCurrentUser } from '@/сlients/userClient';

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const currentUser = await getCurrentUser();

  return (
    <html
      lang='en'
      className='bg-gray-200'
    >
      <body>
        <div className='h-[14%] py-4'>
          <Header currentUser={currentUser} />
        </div>
        <div className='h-[86%]'>{children}</div>
      </body>
    </html>
  );
}
