import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, FreeMode } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/free-mode';
import { Card } from '../../pages';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import {basePath} from '../../../next.config';

// формы слайдов 1 - лепесток, 2 - лепесток в другую сторону, 3 - круг, 4 - скргугленные углы
const circleShapeNumber = 3;

const randomIntFromInterval = (min: number, max: number, prev: number): number => { 
  let randomVal = Math.floor(Math.random() * (max - min + 1) + min);
  // два круга не должны идти друг за другом
  while (randomVal === circleShapeNumber && prev === circleShapeNumber) {
    randomVal = Math.floor(Math.random() * (max - min + 1) + min);
  }
  return randomVal;
};

const Slider = ({cardList}: {cardList: Card[]}) => {
  const [shapes, setShapes] = useState<number[]>([]);

  useEffect(() => {
    let prevRandomValue = 0;
    cardList.forEach(() => {
      const randomVal = randomIntFromInterval(1, 4, prevRandomValue);
      prevRandomValue = randomVal;
      setShapes(shape => [...shape, randomVal]);
    });
  },[cardList]);
  
  return (
    <div className="slider">
      <Swiper
        slidesPerView={'auto'}
        spaceBetween={0}
        freeMode={true}
        modules={[FreeMode, Navigation]}
        navigation={{
          nextEl: '#next',
          prevEl: '#prev',
        }}
      >
        {cardList.map((el: Card, index) => {
          return (
            <SwiperSlide key={el.id} className={`card type${shapes[index]} ${el.title.length > 35 ? 'big' : ''}`}>
              <img src={el.img} alt={el.title} className="card__img"/>
              <span className="card__title">{el.title}</span>
              <span className="card__date">{el.date}</span>
            </SwiperSlide>
          );
        })}
      </Swiper>
      <button className="swiper-button-prev" id="prev">
        <picture>
          <source srcSet={`${basePath}/images/arrow_s.svg`} media="(max-width: 420px)" />
          <Image 
            fill={true}
            src={`${basePath}/images/arrow.svg`}
            alt="arrow" />
        </picture>
      </button>
      <button className="swiper-button-next" id="next">
        <picture>
          <source srcSet={`${basePath}/images/arrow_s.svg`} media="(max-width: 420px)" />
          <Image 
            fill={true}
            src={`${basePath}/images/arrow.svg`}
            alt="arrow" />
        </picture>
      </button>
    </div>
  );
};
export default Slider;