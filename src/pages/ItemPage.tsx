import axios from 'axios';
import * as React from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { DropDownList } from '../components/DropdownList/DropdownList';

const ItemPageFlexBox = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

const StyledItemImage = styled.img`
  width: 100%;
  max-width: 600px;
  max-height: 300px;
  height: auto;
  border-radius: 5px;
  margin: 0 auto;
`;

const DropDownWrapper = styled.div`
  display: flex;
  flex-direction: row-reverse;
`;

export const ItemPage: React.FC = () => {
  const { id } = useParams();
  const [itemInfo, SetItemInfo] = React.useState<any | null>(null);
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  
  React.useEffect(() => {
    const fetchItemInfo = async () => {
      const { data } = await axios.get(process.env.REACT_APP_BASE_URL + `/item/${id}`)
      console.log(data);
      SetItemInfo(data);
    }
    fetchItemInfo();
  }, [])

  return (
    <ItemPageFlexBox>
      {itemInfo && <>
        <StyledItemImage src={itemInfo.images[selectedIndex].url} />
        <DropDownWrapper>
          <DropDownList onSelect={setSelectedIndex} variants={itemInfo.images.map((elem: any) => elem.name)}/>
        </DropDownWrapper>
      </>}
      {itemInfo && itemInfo.description}
    </ItemPageFlexBox>
  )
}