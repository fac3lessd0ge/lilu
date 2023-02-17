import * as React from 'react';
import styled from 'styled-components';
import { Slide } from 'react-slideshow-image';
import { GrFormPreviousLink, GrFormNextLink } from 'react-icons/gr';
import 'react-slideshow-image/dist/styles.css';

const StyledImageDiv = styled.img`
  height: 350px;
  width: 100%;
  max-width: 600px;
  background-repeat: no-repeat;
  background-position: center;
  border-radius: 5px;
`;

const SliderContainer = styled.div`
  width: 100%;
  max-width: 600px;
  max-height: 350px;
  height: auto;
  border-radius: 5px;
  margin: 0 auto;
`;

const StyledArrowButton = styled.button<{ right?: boolean; left?: boolean }>`
  width: 30px;
  height: 30px;
  padding: 0;
  border: none;
  background-color: #e8dfab;
  border-radius: 50%;
  display: grid;
  place-items: center;
  position: absolute;
  z-index: 10;
  cursor: pointer;
`;

interface ISliderList {
  images?: string[];
}

export const ImageSlider: React.FC<ISliderList> = ({ images }) => {
  const SliderRef = React.useRef<any>(null);

  React.useEffect(() => {
    SliderRef.current?.goTo(0);
  }, [images]);

  return (
    <SliderContainer>
      <Slide
        ref={SliderRef}
        defaultIndex={0}
        prevArrow={
          <StyledArrowButton left>
            {' '}
            <GrFormPreviousLink size={25} />{' '}
          </StyledArrowButton>
        }
        nextArrow={
          <StyledArrowButton right>
            {' '}
            <GrFormNextLink size={25} />{' '}
          </StyledArrowButton>
        }
        autoplay={false}
        canSwipe={false}
        duration={100}
        easing="ease-in"
        transitionDuration={300}
      >
        {images?.map((slideImage, index) => (
          <div className="each-slide" key={index}>
            <StyledImageDiv src={slideImage} />
          </div>
        ))}
      </Slide>
    </SliderContainer>
  );
};
