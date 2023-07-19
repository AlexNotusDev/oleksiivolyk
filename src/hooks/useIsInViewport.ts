'use client';

import { useRef, useEffect, useState } from 'react';
import debounce from 'lodash/debounce';

export default function useIsInViewport<Element extends HTMLElement>(
  offset = 100,
  debounceMilliseconds = 500,
): [boolean, React.MutableRefObject<Element | undefined>] {
  const [isVisible, setIsVisible] = useState(false);
  const currentElement = useRef<Element>();

  const onScroll = debounce(() => {
    if (!currentElement.current) {
      setIsVisible(false);
      return;
    }
    let top = 0;
    if (currentElement.current) {
      top = currentElement.current.getBoundingClientRect().top;
    }
    setIsVisible(top + offset >= 0 && top - offset <= window.innerHeight);
  }, debounceMilliseconds);

  useEffect(() => {
    document.addEventListener('scroll', onScroll, true);
    return () => document.removeEventListener('scroll', onScroll, true);
  });

  return [isVisible, currentElement];
}
