import { createSlice } from '@reduxjs/toolkit';

interface IUserState {
  _auth: string;
  tgid: number;
  hash: string;
  username: string;
}

const initialState: IUserState = {
  /*global Telegram*/
  // @ts-ignore
  hash: Telegram.WebApp.initDataUnsafe.hash || 'broken hash',
  tgid: Telegram.WebApp.initDataUnsafe.user?.id || 409093991,
  _auth: Telegram.WebApp.initData || 'broken initData',
  username: Telegram.WebApp.initDataUnsafe.user?.usernames || 'broken username',
};

export const UserSlice = createSlice({
  name: 'userState',
  initialState,
  reducers: {},
});

export default UserSlice.reducer;
