'use client';

import { useRef, useEffect, useState } from 'react';
import throttle from 'lodash/throttle';

export default function useIsInViewport<Element extends HTMLElement>(
  offset = 0,
  throttleMilliseconds = 100,
): [boolean, React.MutableRefObject<Element | undefined>] {
  const [isVisible, setIsVisible] = useState(false);
  const currentElement = useRef<Element>();

  const onScroll = throttle(() => {
    if (!currentElement.current) {
      setIsVisible(false);
      return;
    }
    let top = 0;
    if (currentElement.current) {
      top = currentElement.current.getBoundingClientRect().top;
    }
    setIsVisible(top + offset >= 0 && top - offset <= window.innerHeight);
  }, throttleMilliseconds);

  useEffect(() => {
    document.addEventListener('scroll', onScroll, true);
    return () => document.removeEventListener('scroll', onScroll, true);
  });

  return [isVisible, currentElement];
}
