import {PayloadAction, createSlice} from '@reduxjs/toolkit';
import {RootState} from '../store';

interface UserState {
  nickname: string;
  avatar: string;
  coins: number;
  isLogin: boolean;
}

// 使用该类型定义初始 state
const initialState: UserState = {
  nickname: '',
  avatar: '',
  coins: 0,
  isLogin: false,
};

export const userSlice = createSlice({
  name: 'user',
  // `createSlice` 将从 `initialState` 参数推断 state 类型
  initialState,
  reducers: {
    reset: () => {
      return initialState;
    },
    // 使用 PayloadAction 类型声明 `action.payload` 的内容
    login: (state, action: PayloadAction<API.Sign>) => {
      let payload = action.payload;
      state.avatar = payload.ts;
      state.nickname = payload.nickname;
      state.coins = payload.jf;
      state.isLogin = true;
    },
  },
});

export const {reset, login} = userSlice.actions;
// 选择器等其他代码可以使用导入的 `RootState` 类型
export const selectUser = (state: RootState) => state.user;

export default userSlice.reducer;
