import { twMerge } from 'tailwind-merge';

export default function ButtonNavigation({ name, redirectAction, redirectUrl, activeRoute }: ButtonNavigationProps) {
  function redirect() {
    redirectAction(redirectUrl);
  }

  return (
    <div
      className={twMerge(
        `p-4 hover:text-indigo-950 cursor-pointer flex justify-center items-center hover:underline underline-offset-4`,
        activeRoute == redirectUrl && 'underline',
      )}
      onClick={redirect}
    >
      <span>{name}</span>
    </div>
  );
}

type ButtonNavigationProps = {
  name: string;
  redirectAction: (url: string) => void;
  redirectUrl: string;
  activeRoute: string;
};
