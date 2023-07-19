import Header from '@/src/components/organisms/header';
import '@/styles/globals.css';
import { getCurrentUser } from '@/src/сlients/userClient';
import ProviderComponent from '@/src/utils/userProvideComponent';
import React from 'react';

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const user = await getCurrentUser();

  return (
    <html lang='en'>
      <body className='h-screen'>
        <ProviderComponent value={user}>
          <>
            <div className='h-34 py-4 sticky'>
              <Header />
            </div>
            <div className='h-[calc(100%-10rem)]'>{children}</div>
          </>
        </ProviderComponent>
      </body>
    </html>
  );
}
