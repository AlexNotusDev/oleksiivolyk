'use client';

import Button from '@/components/atoms/button';
import { useRouter } from 'next/navigation';

export function ButtonForRedirect({ text, styles, redirectUrl }: ButtonForRedirectProps) {
  const router = useRouter();

  function handleClick(): void {
    router.push(redirectUrl);
  }

  return (
    <Button
      text={text}
      styles={styles}
      clickEvent={handleClick}
    />
  );
}

type ButtonForRedirectProps = {
  text: string;
  styles: string;
  redirectUrl: string;
};
