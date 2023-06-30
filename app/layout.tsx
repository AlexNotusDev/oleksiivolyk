import React from 'react';
import Header from '@/components/organisms/header';
import '@/styles/globals.css';
import { getCurrentUser } from '@/сlients/userClient';

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const currentUser = await getCurrentUser();

  return (
    <html lang='en'>
      <body className='h-screen'>
        <div className='h-34 py-4 sticky'>
          <Header currentUser={currentUser} />
        </div>
        <div className='h-[calc(100%-10rem)]'>{children}</div>
      </body>
    </html>
  );
}
