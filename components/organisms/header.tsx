'use client';

import Image from 'next/image';
import HeaderNavigation from '@/components/molecules/headerNavigation';
import { signIn, signOut } from 'next-auth/react';
import { useContext, useState } from 'react';
import { UserContext } from '@/utils/userProvideComponent';
import { User } from '@prisma/client';
import { useRouter } from 'next/navigation';
import useMediaQuery from '@/hooks/useMediaQuery';
import NavigationMobile from '@/components/organisms/navigationMobile';
import ButtonWithIcon from '@/components/atoms/buttonWithIcon';

export type HeaderButtons = { name: string; route: string };

const headerNavButtons: HeaderButtons[] = [{ name: 'BLOG', route: '/blog' }];

export default function Header() {
  const user = useContext<User | null>(UserContext);
  const isMobile = useMediaQuery('(max-width: 640px)');
  const [isMobileMenuToggle, setIsMobileMenuActive] = useState<boolean>(false);
  const router = useRouter();

  function handleSignIn() {
    signIn('google');
  }

  function handleSignOut() {
    signOut();
  }

  function routeToHome() {
    router.push('/');
  }

  function mobileMenuToggle() {
    setIsMobileMenuActive((prev) => !prev);
  }

  function redirect(route: string) {
    router.push(route);
    setIsMobileMenuActive(false);
  }

  return (
    <div className='flex h-full items-center w-full bg-white sm:rounded-md drop-shadow-lg'>
      <div className='flex-none border-white h-full'>
        <div
          className='w-16 h-full relative cursor-pointer hover:scale-105'
          onClick={routeToHome}
        >
          <Image
            src='/HeaderPhoto.png'
            className='sm:rounded-l-md'
            fill={true}
            alt='avatar'
          />
        </div>
      </div>
      <div className='h-full w-full flex justify-between'>
        <div className='flex flex-row'>
          <div className='flex flex-col h-full justify-center ml-4 w-36 border-r-1 border-gray-300 '>
            <span>Oleksii Volyk</span>
            <span>Software Engineer</span>
          </div>
          {isMobile ? (
            <div className='h-full flex items-center mx-2'>
              <ButtonWithIcon
                clickEvent={mobileMenuToggle}
                iconUrl={isMobileMenuToggle ? '/icons/close.svg' : '/icons/menu.svg'}
                styles='h-8 w-8 border-0 filter-none'
                imgStyles='h-8 w-8'
              />
            </div>
          ) : (
            <HeaderNavigation
              buttons={headerNavButtons}
              clickEvent={redirect}
            />
          )}
        </div>
        <div className='h-full w-16 flex justify-center items-center border-l-1 border-gray-300'>
          <button
            className='h-full w-full rounded-r-md cursor-pointer flex flex-col justify-center items-center hover:bg-gray-100 text-sm'
            onClick={user ? handleSignOut : handleSignIn}
          >
            <Image
              alt='img'
              src={user ? user.image : '/google-logo.png'}
              height={30}
              width={30}
              className='rounded-full mt-1'
            />
            <span>{user ? 'Sign out' : 'Sign in'}</span>
          </button>
        </div>
      </div>

      {isMobileMenuToggle && (
        <NavigationMobile
          buttons={headerNavButtons}
          clickEvent={redirect}
        />
      )}
    </div>
  );
}
