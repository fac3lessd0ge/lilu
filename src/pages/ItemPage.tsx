import * as React from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { DropDownList } from '../components/DropdownList/DropdownList';
import 'react-slideshow-image/dist/styles.css';
import { ImageSlider } from '../components/ImageSlider/ImageSlider';
import { useGetItemQuery } from '../redux/api/item';

const ItemPageFlexBox = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

const ItemTitle = styled.h2`
  text-align: center;
  text-decoration: ellipsis;
  word-wrap: break-word;
  overflow: hidden;
  margin: 0;
  padding: 5px;
`;

const ItemsPrice = styled.h3`
  margin: 0;
  &::after {
    content: ' руб.'
  }
  &::before {
    content: 'Цена: '
  }
`;

const DropDownWrapper = styled.div`
  display: flex;
  padding: 5px;
  align-items: center;
  flex-direction: column;
`;

const BuyButton = styled.button`
  display: grid;
  place-items: center;
  border: none;
  border-radius: 5px;
  background-color: #eee;

  font-weight: 700;
  height: 40px;
  font-size: 20px;
`;

export const ItemPage: React.FC = () => {
  const { id } = useParams();
  const { data, isLoading } = useGetItemQuery(id || '');
  const [selectedIndex, setSelectedIndex] = React.useState(0);

  return (
    <ItemPageFlexBox>
      {!isLoading && <>
        <ImageSlider images={data?.images[selectedIndex].urls}/>
        <ItemTitle>{data?.title}</ItemTitle>
        <DropDownWrapper>
          <ItemsPrice>{data?.price}</ItemsPrice>
          <DropDownList onSelect={setSelectedIndex} variants={ data?.images.map((elem) => elem.name) || [''] }/>
        </DropDownWrapper>
        <BuyButton>Добавить в корзину</BuyButton>
        {data?.description}
      </>}
    </ItemPageFlexBox>
  )
}