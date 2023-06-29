'use client';

import Button from '@/components/atoms/button';
import { useRouter } from 'next/navigation';

export function ButtonForRedirect({ text, styles, redirectUrl }) {
  const router = useRouter();

  function handleClick() {
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
