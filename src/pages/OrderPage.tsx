import * as React from 'react';
import styled from 'styled-components';
import { Block } from '../components/Block/Block';
import { DeliveryForms } from '../components/Forms/DeliveryForms';
import { usePostOrderMutation } from '../redux/api/cart';
import { useGetShippingInfoQuery } from '../redux/api/shipping';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import {
  setAddress,
  setPickupLocation,
  setShippingVariant,
} from '../redux/slices/orderInfoSlice';
import { PageWrapper } from './CartPage';
import { BuyButton } from './ItemPage';

const StyledOrderPageTitle = styled.h2`
  margin: 0;
  padding: 5px;
`;

const StyledOrderPageVariantsWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 10px;
`;

const StyledOrderVariant = styled.button`
  width: 100%;
  height: 60px;
  font-size: 18px;
  font-weight: 700;
  padding: 10px;
  background-color: #fff;
  border-radius: 5px;
  border: 1px solid #ccc3;
  color: #000;
  display: flex;
  gap: 12px;
  align-items: center;
  transition: all 0.1s ease;

  &:active {
    transform: translateY(4px);
    border: 2px solid rgba(0, 0, 0, 0.1);
  }

  &:disabled {
    background-color: #fbe1ea;
    color: #111;
  }
`;

const StyledPickupAddressVariant = styled(StyledOrderVariant)`
  font-size: 13px;
  padding: 15px;
  height: auto;
  line-height: 1.5;
  justify-content: center;
`;

const DeliveryFormsWrapper = styled.div`
  margin-bottom: 1rem;
`;

const SubmitButton = styled(BuyButton)`
  width: 100%;
  background-color: var(--footerColor);
  margin-top: 15px;

  &:disabled {
    transform: scale(0.7);
    background-color: #ccc;
  }

  &:disabled:active {
    transform: none;
  }
`;

const ContactInfoTitle = styled.h3`
  padding: 0px 5px 5px 5px;
`

export const OrderPage: React.FC = () => {
  const {
    email,
    telephone,
    address,
    name,
    pickupLocation,
    shippingVariant,
    postCode,
    formIsValid,
  } = useAppSelector((store) => store.orderInfoSlice);

  const { username, tgid } = useAppSelector((store) => store.userSlice);

  const isPickup = shippingVariant === 'Самовывоз';

  const dispatch = useAppDispatch();

  const shipping = useGetShippingInfoQuery();

  const [sendOrderRequest] = usePostOrderMutation();

  const isButtonDisabled = ((): boolean => {
    if (shippingVariant === 'Самовывоз') {
      return !(formIsValid && !!pickupLocation && !!address);
    }

    return !formIsValid;
  })();

  const submitHandler = () => {
    sendOrderRequest({
      user_info: {
        user_id: tgid,
        phone_number: telephone,
        mail: email,
        first_name: name?.split(' ')[0] || 'Не заполнено',
        last_name: name?.split(' ')[1] || 'Не заполнено',
        username,
        device_type: 'phone',
      },
      bill_info: {
        user_info: tgid,
        need_shipment: !isPickup,
        delivery_type: pickupLocation,
        state: 'Россия',
        city: isPickup
          ? pickupLocation?.split(' ')[0] || 'Broken city'
          : (address && address?.split(' ')[0]) || 'Broken city',
        address_1: address,
        post_code: isPickup ? '000000' : postCode,
      },
    })
      .unwrap()
      .then((res) => {
        window.location.href = res.data;
      });
  };

  return (
    <PageWrapper>
      <Block>
        <StyledOrderPageTitle>Оформление заказа</StyledOrderPageTitle>
        <DeliveryFormsWrapper>
          <ContactInfoTitle>Контактная информация</ContactInfoTitle>
          <DeliveryForms
            variant={shippingVariant === 'Самовывоз' ? 'pickup' : 'post'}
          />
        </DeliveryFormsWrapper>
        <StyledOrderPageVariantsWrapper>
          <h3>Способ доставки: </h3>
          {shipping?.data?.shipping_methods.map(({ title, id }) => (
            <StyledOrderVariant
              key={title}
              onClick={(e) => {
                dispatch(setShippingVariant(title));
                dispatch(setAddress(''));
                dispatch(setPickupLocation(id));
              }}
              disabled={shippingVariant === title}
            >
              {title}
            </StyledOrderVariant>
          ))}
        </StyledOrderPageVariantsWrapper>

        {shippingVariant === 'Самовывоз' ? (
          <StyledOrderPageVariantsWrapper>
            <h3>Точки самовывоза:</h3>
            {shipping?.data?.pick_points.map(
              ({ point_adress, point_city, point_id }) => (
                <StyledPickupAddressVariant
                  key={point_id}
                  onClick={(e) => {
                    dispatch(setAddress(`${point_city} ${point_adress}`));
                  }}
                  disabled={address === `${point_city} ${point_adress}`}
                >
                  {`${point_city} ${point_adress}`}
                </StyledPickupAddressVariant>
              )
            )}
          </StyledOrderPageVariantsWrapper>
        ) : null}

        <SubmitButton onClick={submitHandler} disabled={isButtonDisabled}>
          Продолжить
        </SubmitButton>
      </Block>
    </PageWrapper>
  );
};
