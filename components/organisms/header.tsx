'use client';

import Image from 'next/image';
import { HeaderNavButton } from '@/models/HeaderNavButton';
import HeaderNavigation from '@/components/molekules/headerNavigation';
import { useRouter } from 'next/navigation';
import ButtonOutlined from '@/components/atoms/buttonOutlined';
import { signIn, signOut } from 'next-auth/react';

export const headerNavButtons: HeaderNavButton[] = [{ name: 'BLOG', route: '/blog' }];

export default function Header({ currentUser }) {
  const router = useRouter();

  function routeToHome() {
    router.push('/');
  }

  function handleSignIn() {
    signIn('google');
  }

  function handleSignOut() {
    signOut();
  }

  return (
    <div className='flex items-center w-full '>
      <div
        className='bg-white flex-none h-16 rounded-md w-16 drop-shadow-lg cursor-pointer '
        onClick={routeToHome}
      ></div>
      <div className='border-8 flex-none border-white rounded-md mx-4 drop-shadow-lg'>
        <Image
          src='/HeaderPhoto.png'
          className='rounded-md'
          width={84}
          height={84}
          alt='avatar'
        />
      </div>
      <div className='bg-white h-16 w-full flex justify-between rounded-md drop-shadow-lg'>
        <div className='flex flex-col h-full justify-center ml-4 w-36 '>
          <span>Oleksii Volyk</span>
          <span>Software Engineer</span>
        </div>
        <div className='h-full w-fit flex flex-row'>
          <HeaderNavigation buttons={headerNavButtons} />
          <div className='h-full w-28 flex justify-center items-center'>
            {currentUser ? (
              <ButtonOutlined
                imageUrl={currentUser.image}
                text='Sign out'
                clickEvent={handleSignOut}
              />
            ) : (
              <ButtonOutlined
                imageUrl='/google-logo-9808.png'
                text='Sign in'
                clickEvent={handleSignIn}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
