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

const DropDownWrapper = styled.div`
  display: flex;
  flex-direction: row-reverse;
`;

export const ItemPage: React.FC = () => {
  const { id } = useParams();
  const { data, isLoading } = useGetItemQuery(id || '');
  const [selectedIndex, setSelectedIndex] = React.useState(0);

  return (
    <ItemPageFlexBox>
      {!isLoading && <>
        <ImageSlider images={data?.images[selectedIndex].urls}/>
        <DropDownWrapper>
          <DropDownList onSelect={setSelectedIndex} variants={ data?.images.map((elem) => elem.name) || [''] }/>
        </DropDownWrapper>
      </>}
      {!isLoading && data?.description}
    </ItemPageFlexBox>
  )
}