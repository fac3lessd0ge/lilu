import * as React from 'react';
import styled from 'styled-components';
import { Slide } from 'react-slideshow-image';
import { GrFormPreviousLink, GrFormNextLink } from 'react-icons/gr';
import 'react-slideshow-image/dist/styles.css';
import { IconWrapper } from "../Header/NavButton";

const StyledImageDiv = styled.img`
  width: 100%;
  max-width: 350px;
  aspect-ratio: 1 / 1;
  margin: auto;
  background-repeat: no-repeat;
  background-position: center;
  border-radius: 5px;
`;

const SliderContainer = styled.div`
  width: 100%;
  max-width: 600px;
  max-height: 350px;
  min-height: 350px;
  height: auto;
  border-radius: 5px;
  margin: 0 auto;
`;

const StyledArrowButton = styled.button<{ right?: boolean; left?: boolean }>`
  width: 30px;
  height: 30px;
  padding: 0;
  border: none;
  background-color: var(--buttonColor);
  border-radius: 50%;
  display: grid;
  place-items: center;
  position: absolute;
  z-index: 10;
  cursor: pointer;
`;

const EachSlide = styled.div`
  display: flex;
  justify-content: center;
`

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
            <IconWrapper>
              <GrFormPreviousLink size={30} />
            </IconWrapper>
          </StyledArrowButton>
        }
        nextArrow={
          <StyledArrowButton right>
            <IconWrapper>
              <GrFormNextLink size={30} />
            </IconWrapper>
          </StyledArrowButton>
        }
        autoplay={false}
        canSwipe={false}
        duration={100}
        easing="ease-in"
        transitionDuration={300}
      >
        {images?.map((slideImage, index) => (
          <EachSlide className="each-slide" key={index}>
            <StyledImageDiv src={slideImage} />
          </EachSlide>
        ))}
      </Slide>
    </SliderContainer>
  );
};
