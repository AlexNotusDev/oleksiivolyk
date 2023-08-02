import Header from '@/components/organisms/header';
import '@/styles/globals.css';
import { getCurrentUser } from '@/сlients/userClient';
import ProviderComponent from '@/utils/userProvideComponent';
import React from 'react';

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const user = await getCurrentUser();

  return (
    <html lang='en'>
      <body className='box-border'>
        <ProviderComponent value={user}>
          <>
            <div className='sticky h-16 sm:top-4 container mx-auto xl:max-w-5xl 2xl:max-w-5xl sm:px-2 z-10'>
              <Header />
            </div>
            <div className='h-[calc(100%-5rem)] sm:h-[calc(100%-7rem)] sm:mt-8 mt-4 container mx-auto xl:max-w-5xl 2xl:max-w-5xl sm:px-2 overflow-scroll'>
              {children}
            </div>
          </>
        </ProviderComponent>
      </body>
    </html>
  );
}
