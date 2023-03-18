import classNames from 'classnames';
import { useEffect, useState } from 'react';

export const Carousel = () => {
  const [targetImgId, setTargetImgId] = useState(1);
  const [isAuto, setIsAuto] = useState(true);

  const images = [
    { link: 'img/banner-phones.png', id: 1 },
    { link: 'img/banner-accessories.png', id: 2 },
    { link: 'img/banner-tablets.png', id: 3 },
  ];

  const changeImg = (num: number) => {
    if (num < 0) {
      if (targetImgId === 1) {
        setTargetImgId(images.length);
        return;
      }

      setTargetImgId(prev => prev - 1);
      return;
    }

    if (targetImgId === images.length) {
      setTargetImgId(1);
      return;
    }

    setTargetImgId(prev => prev + 1);
    return;
  }

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (isAuto) {
        changeImg(1);
      }
    }, 4000);

    return () => clearTimeout(timeout);
  });

  return (
    <>
      <div
        className="carousel"
      >
        <button
          type="button"
          className="carousel_button carousel_button-left"
          onClick={() => {
            changeImg(-1);
            setIsAuto(false);
          }}
        >
          {'<'}
        </button>

        <div
          className="carousel_window"
        >
          {images.map(img => (
            <img
              key={img.id}
              src={img.link}
              alt={`img${img.id}`}
              className={classNames(
                'carousel_window_img',
                {'carousel_window_img-not-hidden': targetImgId === img.id}
              )}
            />
          ))}
        </div>

        <button
          type="button"
          className="carousel_button carousel_button-right"
          onClick={() => {
            changeImg(1);
            setIsAuto(false);
          }}
        >
          {'>'}
        </button>
      </div>

      <div className='conteiner'>
        {images.map(img => (
          <div
            className={classNames('conteiner_item', {
              'conteiner_item-active': targetImgId === img.id,
            })}
            key={img.id}
            onClick={() => {
              setTargetImgId(img.id);
              setIsAuto(false);
            }}
          />
        ))}
      </div>
    </>
  );
};
