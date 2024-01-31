import { BsFillArrowUpCircleFill } from 'react-icons/bs';
import { useState, useEffect } from 'react';
import styles from './ScrollToTop.module.css';
import useWindowSize from '../../hooks/useWindowSize';

export default function ScrollToTop() {
  const [showTopBtn, setShowTopBtn] = useState(false);
  const windowSize = useWindowSize();

  useEffect(() => {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 350) {
        setShowTopBtn(true);
      } else {
        setShowTopBtn(false);
      }
    });
  }, [windowSize.width]);

  const goToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <div className={styles['btn-div']}>
      {windowSize.width < 640 ? null : showTopBtn ? (
        <BsFillArrowUpCircleFill
          className={`${styles['btn-position']} ${styles['btn-style']} ${styles.active}`}
          onClick={goToTop}
        />
      ) : (
        <BsFillArrowUpCircleFill
          className={`${styles['btn-position']} ${styles['btn-style']} ${styles.hidden}`}
        />
      )}
    </div>
  );
}
