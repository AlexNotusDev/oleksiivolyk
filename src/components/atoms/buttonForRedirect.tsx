'use client';

import Button from '@/src/components/atoms/button';
import { useRouter } from 'next/navigation';

type ButtonForRedirectProps = {
  text: string;
  styles: string;
  redirectUrl: string;
};

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
