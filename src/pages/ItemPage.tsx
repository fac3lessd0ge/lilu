import * as React from 'react';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import { DropDownList } from '../components/DropdownList/DropdownList';
import { ImageSlider } from '../components/ImageSlider/ImageSlider';
import { useGetItemQuery } from '../redux/api/item';
import { AmountMeter } from '../components/AmountMeter/AmountMeter';
import { toast } from 'react-toastify';
import 'react-slideshow-image/dist/styles.css';
import { useAddCartItemMutation } from '../redux/api/cart';

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
  padding: 5px 5px 0px 5px;
`;

const ItemsPrice = styled.h3`
  margin: 0;
  font-size: 26px;
  &::after {
    content: ' руб.';
  }
  &::before {
    content: 'Цена: ';
  }
`;

const DropDownWrapper = styled.div`
  display: flex;
  padding: 0px 5px 5px 5px;
  align-items: center;
  flex-direction: column;
`;

export const BuyButton = styled.button`
  display: grid;
  place-items: center;
  border: none;
  border-radius: 5px;
  background-color: #99cc84;
  color: #eee;
  font-weight: 700;
  height: 40px;
  cursor: pointer;
  font-size: 20px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  transition: transform 0.05s ease;

  &:active {
    transform: translateY(4px);
  }

  &:disabled {
    transform: scale(0.7);
    background-color: #ccc;
    cursor: unset;
  }
`;

export const ItemPage: React.FC = () => {
  const { id = '', type_id } = useParams<{
    id: string;
    type_id: string | undefined;
  }>();
  const RequestParams = React.useMemo(
    () => ({
      id: id,
      type_id: type_id ?? null,
    }),
    [id, type_id]
  );
  const { data, isLoading } = useGetItemQuery(RequestParams);
  const [amount, setAmount] = React.useState(1);
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const [addItem, result] = useAddCartItemMutation();

  const BuyButtonRef = React.useRef<HTMLButtonElement>(null);

  const notify = () => toast(`В корзину добавлено ${amount} шт. товара`);

  console.log(data);

  const buyHandler = () => {
    if (data)
      addItem({
        product_id: data[selectedIndex].product_id,
        product_count: amount,
      });
    notify();

    if (BuyButtonRef.current) {
      BuyButtonRef.current.disabled = true;

      setTimeout(() => {
        BuyButtonRef.current!.disabled = false;
      }, 2700);
    }
  };

  const isAvaliable = data && !!data[selectedIndex].am;

  return (
    <ItemPageFlexBox>
      {!isLoading && data && (
        <>
          <ImageSlider images={data[selectedIndex]?.image} />
          <ItemTitle>{data[selectedIndex]?.product_name}</ItemTitle>
          <DropDownWrapper>
            <DropDownList
              onSelect={setSelectedIndex}
              variants={data?.map((elem) => elem.name) || ['']}
              additionalThumbnailString={' товара'}
            />
            <ItemsPrice>{data[selectedIndex]?.price}</ItemsPrice>
          </DropDownWrapper>
          {isAvaliable ? (
            <>
              <AmountMeter
                initValue={amount}
                max={data[selectedIndex]?.am || 0}
                onChange={setAmount}
              />
              <BuyButton
                disabled={amount === 0}
                ref={BuyButtonRef}
                onClick={buyHandler}
              >
                Добавить в корзину
              </BuyButton>
            </>
          ) : (
            <ItemTitle> К сожалению, товар закончился </ItemTitle>
          )}
          {data[selectedIndex]?.desc}
        </>
      )}
    </ItemPageFlexBox>
  );
};
