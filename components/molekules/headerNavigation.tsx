import ButtonNavigation from '@/components/atoms/buttonNavigation';
import { useRouter, usePathname } from 'next/navigation';

export default function HeaderNavigation({ buttons }) {
  const router = useRouter();
  const path = usePathname();

  function redirect(route) {
    router.push(route);
  }

  return (
    <div className='h-full flex flex-row  border-x-1 border-gray-200 divide-x divide-gray-200 '>
      {buttons.map(({ name, route }) => (
        <ButtonNavigation
          key={name}
          name={name}
          activeRoute={path}
          redirectAction={redirect}
          redirectUrl={route}
        />
      ))}
    </div>
  );
}
