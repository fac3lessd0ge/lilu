import { createSlice } from "@reduxjs/toolkit";

interface IUserState {
  _auth: string
}

const initialState: IUserState = {
  /*global Telegram*/
  // @ts-ignore
  _auth: Telegram.WebApp.initData || ''
}

export const UserSlice = createSlice({
  name: 'userState',
  initialState,
  reducers: {}
})

export default UserSlice.reducer;