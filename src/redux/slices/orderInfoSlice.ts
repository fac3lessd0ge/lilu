import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface IOrderState {
  shippingVariant: string
  telephone: string 
  email:     string,
  formIsValid: boolean,

  name?:     string,
  address?:  string,
}

const initialState: IOrderState = {
  telephone: '',
  email: '',
  name: '',
  address: '',
  shippingVariant: 'Самовывоз из магазина',
  formIsValid: false
}

export const OrderInfoSlice = createSlice({
  name: 'orderInfo',
  initialState,
  reducers: {
    setTelephone (state, action: PayloadAction<string>) {
      state.telephone = action.payload
    },
    setEmail (state, action: PayloadAction<string>) {
      state.email = action.payload
    },
    setName (state, action: PayloadAction<string>) {
      state.name = action.payload
    },
    setAddress (state, action: PayloadAction<string>) {
      state.address = action.payload
    },
    setShippingVariant (state, action: PayloadAction<string>) {
      state.shippingVariant = action.payload
    },
    setFormIsValid (state, action: PayloadAction<boolean>) {
      state.formIsValid = action.payload
    }
  }
})

export const { 
  setTelephone, 
  setEmail, 
  setName, 
  setAddress, 
  setShippingVariant, 
  setFormIsValid 
} = OrderInfoSlice.actions

export default OrderInfoSlice.reducer