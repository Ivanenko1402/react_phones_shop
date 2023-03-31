import React, { useEffect, useRef, useState } from 'react';

import { Phone } from '../../types/Phone';
import { ProductCard } from '../ProductCard';

type Props = {
  phoneList: Phone[],
  title: string,
};

export const ProductsSlider: React.FC<Props> = ({
  phoneList,
  title,
}) => {
  const container = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(0);
  const [position, setPosition] = useState(0);

  useEffect(() => {
    if (container.current) {
      setWidth(container.current.offsetWidth);
    }
  }, [container]);

  const showNext = () => {
    const itemWidth = 270;
    const gap = 15;
    const maxPosition = -((phoneList.length) * itemWidth + (phoneList.length - 1) * gap) + width;
    const minPosition = 0;
    let step = 0;

    if (width >= 4 * itemWidth + 3 * gap) {
      step = 4 * itemWidth + 4 * gap;
    }

    if (width >= 3 * itemWidth + 2 * gap) {
      step = 3 * itemWidth + 3 * gap;
    }

    if (width >= 2 * itemWidth + gap) {
      step = 2 * itemWidth + 2 * gap;
    }

    if (width < 2 * itemWidth + gap) {
      step = itemWidth + gap;
    }

    setPosition(prev => {
      if (prev === maxPosition) {
        return minPosition;
      }

      if (prev - step < maxPosition) {
        return maxPosition;
      }

      return prev - step;
    })
  };

  const showPrev = () => {
    const itemWidth = 270;
    const gap = 15;
    const maxPosition = -((phoneList.length) * itemWidth + (phoneList.length - 1) * gap) + width;
    const minPosition = 0;
    let step = 0;

    if (width >= 4 * itemWidth + 3 * gap) {
      step = 4 * itemWidth + 4 * gap;
    }

    if (width >= 3 * itemWidth + 2 * gap) {
      step = 3 * itemWidth + 3 * gap;
    }

    if (width >= 2 * itemWidth + gap) {
      step = 2 * itemWidth + 2 * gap;
    }

    if (width < 2 * itemWidth + gap) {
      step = itemWidth + gap;
    }

    setPosition(prev => {
      if (prev === minPosition) {
        return maxPosition;
      }

      if (prev + step > minPosition) {
        return minPosition;
      }

      return prev + step;
    })
  };

  const swipe = (event: React.TouchEvent<HTMLDivElement>) => {
    const startTouchX = event.touches[0].clientX;
    const touchMoveHandler = (event: TouchEvent) => {
      const currentPosition = event.touches[0].clientX;
      const diff = startTouchX - currentPosition;

      if (diff > 0) {
        const itemWidth = 270;
        const gap = 15;
        const maxPosition = -((phoneList.length) * itemWidth + (phoneList.length - 1) * gap) + width;
        const minPosition = 0;
        let step = 10;
    
        setPosition(prev => {
          if (prev === maxPosition) {
            return minPosition;
          }
    
          if (prev - step < maxPosition) {
            return maxPosition;
          }
    
          return prev - step;
        })
      } else if (diff < 0) {
        const itemWidth = 270;
        const gap = 15;
        const maxPosition = -((phoneList.length) * itemWidth + (phoneList.length - 1) * gap) + width;
        const minPosition = 0;
        let step = 10;
    
        setPosition(prev => {
          if (prev === minPosition) {
            return maxPosition;
          }
    
          if (prev + step > minPosition) {
            return minPosition;
          }
    
          return prev + step;
        })
      }
    }

    const touchEndHandler = () => {
      document.removeEventListener('touchmove', touchMoveHandler);
      document.removeEventListener('touchend', touchEndHandler);
    }
    document.addEventListener('touchmove', touchMoveHandler);
    document.addEventListener('touchend', touchEndHandler);
  }

  return (
    <div ref={container} className="productSlider">
      <div className="productSlider_top">
        <h1 className="productSlider_top_title">
          {title}
        </h1>

        <div className="productSlider_top_conteiner">
          <button
            className="productSlider_top_conteiner_button"
            type="button"
            onClick={showPrev}
          >
            {'>'}
          </button>

          <button
            className="productSlider_top_conteiner_button"
            type="button"
            onClick={showNext}
          >
            {'<'}
          </button>
        </div>
      </div>
      <div
        style={{ 'left': `-${position}` }}
        className='productSlider_conteiner_content'
        onTouchMove={(event) => swipe(event)}
        >
        {phoneList.map(phone => (
          <ProductCard
            phone={phone}
            key={phone.id}
            position={position}
          />
        ))}
      </div>
    </div>
  );
};
