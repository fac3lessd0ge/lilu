import { openConfirmModal } from '@mantine/modals';
import * as React from 'react';
import styled from 'styled-components';
import { Block } from '../components/Block/Block';
import { DeliveryForms } from '../components/Forms/DeliveryForms';
import { usePostOrderMutation } from '../redux/api/cart';
import { useGetShippingInfoQuery } from '../redux/api/shipping';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { selectOrderInfo } from '../redux/selectors';
import {
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

const OrderRequestBody: React.FC = () => {
  const { email, telephone, address, name, pickupLocation, shippingVariant } =
    useAppSelector((store) => store.orderInfoSlice);

  return (
    <code>
      {JSON.stringify({
        email,
        telephone,
        address,
        name,
        pickupLocation,
        shippingVariant,
      })}
    </code>
  );
};

export const OrderPage: React.FC = () => {
  const { shippingVariant, pickupLocation, formIsValid } =
    useAppSelector(selectOrderInfo);
  const dispatch = useAppDispatch();

  const [postShipment, { data }] = usePostOrderMutation();

  const shipping = useGetShippingInfoQuery();

  console.log(shipping.data);

  const isButtonDisabled = (): boolean => {
    if (shippingVariant === 'Самовывоз из магазина') {
      return !(formIsValid && !!pickupLocation);
    }

    return !formIsValid;
  };

  const submitHandler = () => {
    // postShipment({
    //   bill_info: {
    //     user_info: 409093991,
    //   },
    //   user_info: {
    //     user_id: 409093991,
    //   },
    // });
    console.log('asd');

    openConfirmModal({
      title: 'Ошибка!',
      centered: true,
      children: <OrderRequestBody />,
      labels: { confirm: 'Delete account', cancel: "No don't delete it" },
      confirmProps: { color: 'red' },
      onCancel: () => console.log('Cancel'),
      onConfirm: () => console.log('Confirmed'),
    });
  };

  return (
    <PageWrapper>
      <Block>
        <StyledOrderPageTitle>Оформление заказа</StyledOrderPageTitle>
        <DeliveryFormsWrapper>
          <h3>Контактная информация</h3>
          <DeliveryForms
            variant={shippingVariant === 'Самовывоз' ? 'pickup' : 'post'}
          />
        </DeliveryFormsWrapper>
        <StyledOrderPageVariantsWrapper>
          <h3>Способ доставки: </h3>
          {shipping?.data?.shipping_methods.map(({ title }) => (
            <StyledOrderVariant
              key={title}
              onClick={(e) => {
                dispatch(setShippingVariant(title));
                dispatch(setPickupLocation(''));
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
                    dispatch(
                      setPickupLocation(`${point_city} ${point_adress}`)
                    );
                  }}
                  disabled={pickupLocation === `${point_city} ${point_adress}`}
                >
                  {`${point_city} ${point_adress}`}
                </StyledPickupAddressVariant>
              )
            )}
          </StyledOrderPageVariantsWrapper>
        ) : null}

        <SubmitButton onClick={submitHandler} disabled={isButtonDisabled()}>
          Продолжить
        </SubmitButton>
      </Block>
    </PageWrapper>
  );
};
