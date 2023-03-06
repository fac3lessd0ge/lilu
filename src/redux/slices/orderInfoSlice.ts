import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface IOrderState {
  shippingVariant: string;
  telephone: string;
  email: string;
  formIsValid: boolean;

  name?: string;
  address?: string;

  pickupLocation?: string;

  postCode?: string;
}

const initialState: IOrderState = {
  telephone: '',
  email: '',
  name: '',
  address: '',
  shippingVariant: 'Самовывоз',
  formIsValid: false,
  pickupLocation: 'local_pickup',
  postCode: '',
};

export const OrderInfoSlice = createSlice({
  name: 'orderInfo',
  initialState,
  reducers: {
    setTelephone(state, action: PayloadAction<string>) {
      state.telephone = action.payload;
    },
    setEmail(state, action: PayloadAction<string>) {
      state.email = action.payload;
    },
    setName(state, action: PayloadAction<string>) {
      state.name = action.payload;
    },
    setAddress(state, action: PayloadAction<string>) {
      state.address = action.payload;
    },
    setShippingVariant(state, action: PayloadAction<string>) {
      state.shippingVariant = action.payload;
    },
    setFormIsValid(state, action: PayloadAction<boolean>) {
      state.formIsValid = action.payload;
    },
    setPickupLocation(state, action: PayloadAction<string>) {
      state.pickupLocation = action.payload;
    },
    setPostCode(state, action: PayloadAction<string>) {
      state.postCode = action.payload;
    },
  },
});

export const {
  setTelephone,
  setEmail,
  setName,
  setAddress,
  setShippingVariant,
  setFormIsValid,
  setPickupLocation,
  setPostCode,
} = OrderInfoSlice.actions;

export default OrderInfoSlice.reducer;
