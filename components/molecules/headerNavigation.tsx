import ButtonNavigation from '@/components/atoms/buttonNavigation';
import { usePathname } from 'next/navigation';
import { HeaderButtons } from '@/components/organisms/header';

export default function HeaderNavigation({
  buttons,
  clickEvent,
}: {
  buttons: HeaderButtons[];
  clickEvent: (r: string) => void;
}) {
  const path = usePathname();

  function redirect(route: string) {
    clickEvent(route);
  }

  return (
    <div className='h-full flex flex-row'>
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
