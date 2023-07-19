import ButtonNavigation from '@/src/components/atoms/buttonNavigation';
import { useRouter, usePathname } from 'next/navigation';
import { HeaderButtons } from '@/src/components/organisms/header';

export default function HeaderNavigation({ buttons }: { buttons: HeaderButtons[] }) {
  const router = useRouter();
  const path = usePathname();

  function redirect(route: string) {
    router.push(route);
  }

  return (
    <div className='h-full flex flex-row  border-x-1 border-gray-200 divide-x divide-gray-200 '>
      {buttons.map(({ name, route }: HeaderButtons) => (
        <ButtonNavigation
          key={name}
          name={name}
          activeRoute={path || ''}
          redirectAction={redirect}
          redirectUrl={route}
        />
      ))}
    </div>
  );
}
