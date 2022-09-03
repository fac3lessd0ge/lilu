import * as React from 'react';
import styled from 'styled-components';
import { Block } from '../components/Block/Block';
import { DeliveryForms } from '../components/Forms/DeliveryForms';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { selectOrderInfo } from '../redux/selectors';
import { setShippingVariant } from '../redux/slices/orderInfoSlice';
import { PageWrapper } from './CartPage';
import { ReactComponent as SBPLogo } from '../assets/SBP_Logo.svg';
import { ReactComponent as VisaLogo } from '../assets/Visa_Logo.svg';
import { ReactComponent as MasterCardLogo } from '../assets/Mastercard_Logo.svg';
import { ReactComponent as MirLogo } from '../assets/Mir_Logo.svg';
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
  justify-content: center;
`;

const DeliveryFormsWrapper = styled.div`
  margin-bottom: 1rem;
`;

const StyledCardPaymentVariant = styled(StyledOrderVariant)`
  justify-content: center;
`;

const StyledSBPLogo = styled(SBPLogo)`
  width: 55px;
  height: 40px;
`;

const StyledVisaLogo = styled(VisaLogo)`
  width: 55px;
  height: 40px;
`;

const StyledMasterCardLogo = styled(MasterCardLogo)`
  width: 55px;
  height: 40px;
`;

const StyledMirLogo = styled(MirLogo)`
  width: 70px;
  height: 40px;
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

const OrderVariants = ['Самовывоз из магазина', 'Почта России', 'ЕМС Почта России']
const AddressesVariants = [
  'м. Юго-Западная, ул. Покрышкина, д. 3.',
  'м. Дубровка, ТК Дубровка, ул. Шарикоподшипниковская, д.13.',
  'м. Жулебино, г. Люберцы, ул.Кирова д.2.',
  'м. Новокосино, ТРЦ «Реутов Парк», Носовихинское шоссе, д. 45.',
  'м. Теплый Стан, ТРЦ «Принц Плаза», ул. Профсоюзная, д. 129А.',
  'г. Санкт-Петербург, м. Чернышевская, Манежный пер, д. 19.',
]

export const OrderPage: React.FC = () => {
  const { 
    shippingVariant,
    email,
    name,
    telephone,
    formIsValid
  } = useAppSelector(selectOrderInfo);
  const dispatch = useAppDispatch();


  return (
		<PageWrapper>
			<Block>
				<StyledOrderPageTitle>Оформление заказа</StyledOrderPageTitle>
				<DeliveryFormsWrapper>
					<h3>Контактная информация</h3>
					<DeliveryForms
						variant={
							shippingVariant === 'Самовывоз из магазина'
								? 'pickup'
								: 'post'
						}
					/>
				</DeliveryFormsWrapper>
				<StyledOrderPageVariantsWrapper>
					<h3>Способ доставки: </h3>
					{OrderVariants.map((elem) => (
						<StyledOrderVariant
							key={elem}
							onClick={(e) => dispatch(setShippingVariant(elem))}
							disabled={shippingVariant === elem}
						>
							{elem}
						</StyledOrderVariant>
					))}
				</StyledOrderPageVariantsWrapper>

				{shippingVariant === 'Самовывоз из магазина' ? (
					<StyledOrderPageVariantsWrapper>
						<h3>Точки самовывоза:</h3>
						{AddressesVariants.map((elem) => (
							<StyledPickupAddressVariant
								key={elem}
								onClick={(e) => {}}
								disabled={shippingVariant === elem}
							>
								{elem}
							</StyledPickupAddressVariant>
						))}
					</StyledOrderPageVariantsWrapper>
				) : null}

        <StyledOrderPageVariantsWrapper>
					<h3>Способ оплаты: </h3>
          <StyledCardPaymentVariant
            onClick={(e) => {}}
            disabled={false}
          >
            <StyledVisaLogo  viewBox= "0 0 1000 300" />
            <StyledMasterCardLogo viewBox="0 0 1000 800"/>
            <StyledMirLogo viewBox="0 0 400 110" />
            <StyledSBPLogo viewBox= "0 -40 200 200"/>
          </StyledCardPaymentVariant>
          <StyledCardPaymentVariant
            onClick={(e) => {}}
            disabled={false}
          >
            Оплата при доставке
          </StyledCardPaymentVariant>
				</StyledOrderPageVariantsWrapper>

        <SubmitButton disabled={!formIsValid}>Продолжить</SubmitButton>
			</Block>
		</PageWrapper>
  );
}