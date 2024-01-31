import { useEffect, useRef } from 'react';

const useOnClickOutside = (handler) => {
  const ref = useRef();

  useEffect(() => {
    const handleClick = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        handler();
      }
    };

    document.addEventListener('click', handleClick);

    return () => document.removeEventListener('click', handleClick);
  }, [ref]);

  return ref;
};

export default useOnClickOutside;
