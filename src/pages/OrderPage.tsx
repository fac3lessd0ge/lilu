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

export const OrderRequestBody: React.FC = () => {
  const {
    email,
    telephone,
    address,
    name,
    pickupLocation,
    shippingVariant,
    postCode,
  } = useAppSelector((store) => store.orderInfoSlice);

  const { username, tgid } = useAppSelector((store) => store.userSlice);

  const isPickup = shippingVariant === '?????????????????? ???? ????????????????';

  return (
    <code>
      {JSON.stringify({
        user_info: {
          user_id: tgid,
          phone_number: telephone,
          mail: email,
          first_name: name?.split(' ')[0] || '???? ??????????????????',
          last_name: name?.split(' ')[1] || '???? ??????????????????',
          username,
          device_type: 'phone',
        },
        bill_info: {
          user_info: tgid,
          need_shipment: !isPickup,
          deliveryType: isPickup ? '' : '',
          state: '????????????',
          city: isPickup
            ? pickupLocation?.split(' ')[0] || 'Broken city'
            : (address && address?.split(' ')[0]) || 'Broken city',
          address_1: isPickup ? pickupLocation : address,
          post_code: isPickup ? '000000' : postCode,
        },
      })}
    </code>
  );
};

export const OrderPage: React.FC = () => {
  const { shippingVariant, pickupLocation, formIsValid } =
    useAppSelector(selectOrderInfo);
  const dispatch = useAppDispatch();

  const shipping = useGetShippingInfoQuery();

  console.log(shipping.data);

  const isButtonDisabled = (): boolean => {
    if (shippingVariant === '?????????????????? ???? ????????????????') {
      return !(formIsValid && !!pickupLocation);
    }

    return !formIsValid;
  };

  const submitHandler = () => {
    openConfirmModal({
      title: '????????????!',
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
        <StyledOrderPageTitle>???????????????????? ????????????</StyledOrderPageTitle>
        <DeliveryFormsWrapper>
          <h3>???????????????????? ????????????????????</h3>
          <DeliveryForms
            variant={
              shippingVariant === '?????????????????? ???? ????????????????' ? 'pickup' : 'post'
            }
          />
        </DeliveryFormsWrapper>
        <StyledOrderPageVariantsWrapper>
          <h3>???????????? ????????????????: </h3>
          {shipping?.data?.shipping_methods.map(({ title, id }) => (
            <StyledOrderVariant
              key={title}
              onClick={(e) => {
                dispatch(setShippingVariant(title));
                dispatch(setPickupLocation(id));
              }}
              disabled={shippingVariant === title}
            >
              {title}
            </StyledOrderVariant>
          ))}
        </StyledOrderPageVariantsWrapper>

        {shippingVariant === '?????????????????? ???? ????????????????' ? (
          <StyledOrderPageVariantsWrapper>
            <h3>?????????? ????????????????????:</h3>
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
          ????????????????????
        </SubmitButton>
      </Block>
    </PageWrapper>
  );
};
